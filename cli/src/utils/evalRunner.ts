import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import * as crypto from 'crypto';
import { EvalConfig, EvalResult, ScoreBand, EvalTrace, RegressionThresholds } from '../types';
import { FileProcessor } from './fileProcessor';
import { ReviewEngine } from './reviewEngine';

export interface EvalOptions {
  filter?: string;
  verbose?: boolean;
  updateGolden?: boolean;
  strict?: boolean;
  report?: boolean;
  trace?: boolean;
  repeat?: number;
}

export interface EvalMetrics {
  critical_recall?: number;
  finding_recall?: number;
  hallucination_count?: number;
  hallucination_rate?: number;
  score_calibration_error?: number;
  recommendation_specificity_pass?: boolean;
  tone_pass?: boolean;
  required_fields_pass?: boolean;
  score_caps_pass?: boolean;
  missed_critical_findings?: string[];
  hallucinated_findings?: string[];
}

export class EvalRunner {
  private evalsDir: string;
  private tracesDir: string;
  private reportsDir: string;
  private rubricsDir: string;

  constructor() {
    // Determine harness directory location
    let basePath: string;

    const currentHarness = path.join(process.cwd(), 'harness', 'evals');
    const parentHarness = path.join(process.cwd(), '..', 'harness', 'evals');

    if (fs.existsSync(currentHarness)) {
      basePath = process.cwd();
    } else if (fs.existsSync(parentHarness)) {
      basePath = path.resolve(process.cwd(), '..');
    } else {
      throw new Error(
        `Harness directory not found. Looked for:\n` +
        `  - ${currentHarness}\n` +
        `  - ${parentHarness}\n\n` +
        `Please run from the repository root or CLI directory.`
      );
    }

    this.evalsDir = path.join(basePath, 'harness', 'evals');
    this.tracesDir = path.join(basePath, 'harness', 'traces');
    this.reportsDir = path.join(basePath, 'harness', 'reports');
    this.rubricsDir = path.join(basePath, 'harness', 'rubrics');
  }

  /**
   * Run all evals or filtered subset
   */
  async runEvals(options: EvalOptions): Promise<EvalResult[]> {
    const evalConfigs = await this.loadEvalConfigs(options.filter);
    const results: EvalResult[] = [];
    const repeatCount = options.repeat || 1;

    for (const config of evalConfigs) {
      const caseResults: EvalResult[] = [];

      for (let i = 0; i < repeatCount; i++) {
        const result = await this.runSingleEval(config, options);
        caseResults.push(result);
      }

      // If repeat mode, aggregate results
      if (repeatCount > 1) {
        results.push(this.aggregateResults(caseResults));
      } else {
        results.push(caseResults[0]);
      }
    }

    // Generate report if requested
    if (options.report) {
      await this.generateReport(results, options);
    }

    return results;
  }

  /**
   * Load eval configurations recursively
   */
  private async loadEvalConfigs(filter?: string): Promise<EvalConfig[]> {
    const configs: EvalConfig[] = [];

    const loadFromDirectory = async (dir: string, parentPath: string = ''): Promise<void> => {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          await loadFromDirectory(filePath, path.join(parentPath, file));
        } else if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          const relativePath = path.join(parentPath, file);

          if (filter && !relativePath.includes(filter)) {
            continue;
          }

          try {
            const content = await fs.readFile(filePath, 'utf-8');
            const config = this.normalizeEvalConfig(yaml.parse(content), relativePath);
            configs.push(config);
          } catch (error) {
            console.error(`Error loading ${relativePath}:`, error);
          }
        }
      }
    };

    await loadFromDirectory(this.evalsDir);
    return configs;
  }

  /**
   * Normalize eval config to support both old and new schema
   */
  private normalizeEvalConfig(config: any, _relativePath: string): EvalConfig {
    // Handle backward compatibility for expected_score
    let expected_score_range = config.expected_score_range;
    if (!expected_score_range && config.expected_score && typeof config.expected_score === 'string') {
      const match = config.expected_score.match(/(\d+)-(\d+)/);
      if (match) {
        expected_score_range = {
          min: parseInt(match[1]),
          max: parseInt(match[2])
        };
      }
    }

    // Handle backward compatibility for expected_tags
    const expected_findings = config.expected_findings || {};
    if (!expected_findings.must_detect && config.expected_tags) {
      expected_findings.must_detect = config.expected_tags.map((tag: string) => ({
        id: tag,
        severity: 'medium' // Default severity for legacy tags
      }));
    }

    return {
      id: config.id,
      artifact_type: config.artifact_type,
      input_file: config.input_file,
      expected_tags: config.expected_tags || [],
      expected_findings,
      expected_score_band: config.expected_score_band,
      expected_score: config.expected_score,
      expected_score_range,
      expected_score_caps: config.expected_score_caps,
      required_validators: config.required_validators || [],
      forbidden_behaviors: config.forbidden_behaviors || [],
      required_output_fields: config.required_output_fields || [],
      recommendation_expectation: config.recommendation_expectation,
      tone_expectation: config.tone_expectation,
      notes: config.notes
    };
  }

  /**
   * Run a single eval
   */
  private async runSingleEval(config: EvalConfig, options: EvalOptions): Promise<EvalResult> {
    const startTime = Date.now();

    try {
      // Get input file path
      const inputPath = path.join(process.cwd(), config.input_file);

      // Check if input file exists
      if (!await fs.pathExists(inputPath)) {
        return {
          eval_id: config.id,
          passed: false,
          actual_score: 0,
          expected_band: config.expected_score_band,
          actual_band: ScoreBand.UNSUPPORTED,
          findings_match: false,
          forbidden_behaviors: ['Input file not found'],
          missing_fields: [],
          duration_ms: Date.now() - startTime,
          metrics: { tone_pass: false }
        };
      }

      // Read input file for hash
      const inputContent = await fs.readFile(inputPath, 'utf-8');
      const inputHash = crypto.createHash('sha256').update(inputContent).digest('hex');

      // Process file
      const fileProcessor = new FileProcessor();
      const artifact = await fileProcessor.processFile(inputPath);

      // Run review
      const reviewEngine = new ReviewEngine();
      const review = await reviewEngine.review(artifact, { mode: 'full' as any });

      // Calculate metrics
      const metrics = this.calculateMetrics(review, config);

      // Check if score band matches expected
      const bandMatches = this.checkBandMatch(review.score.total, config.expected_score_range);

      // Check findings
      const findingsMatch = this.checkFindings(review.findings, config);

      // Check for forbidden behaviors
      const forbiddenBehaviors = this.checkForbiddenBehaviors(review, config.forbidden_behaviors || []);

      // Check required fields
      const missingFields = this.checkRequiredFields(review, config.required_output_fields || []);

      // Score calibration check
      const scoreCalibration = this.checkScoreCalibration(review.score.total, config.expected_score_range);

      // Determine pass/fail
      const passed = bandMatches && findingsMatch &&
                     forbiddenBehaviors.length === 0 &&
                     missingFields.length === 0 &&
                     (metrics.tone_pass ?? true) &&
                     (metrics.recommendation_specificity_pass ?? true);

      const failReasons: string[] = [];
      if (!bandMatches) failReasons.push('Score band mismatch');
      if (!findingsMatch) failReasons.push('Findings mismatch');
      if (forbiddenBehaviors.length > 0) failReasons.push(`Forbidden behaviors: ${forbiddenBehaviors.join(', ')}`);
      if (missingFields.length > 0) failReasons.push(`Missing fields: ${missingFields.join(', ')}`);
      if (!metrics.tone_pass) failReasons.push('Tone check failed');
      if (metrics.recommendation_specificity_pass === false) failReasons.push('Recommendations too generic');

      const result: EvalResult = {
        eval_id: config.id,
        passed,
        actual_score: review.score.total,
        expected_band: config.expected_score_band,
        actual_band: review.verdict.band,
        findings_match: findingsMatch,
        forbidden_behaviors: forbiddenBehaviors,
        missing_fields: missingFields,
        duration_ms: Date.now() - startTime,
        metrics,
        missed_critical_findings: metrics.missed_critical_findings || [],
        hallucinated_findings: metrics.hallucinated_findings || [],
        score_calibration_label: scoreCalibration.label as 'too_strict' | 'too_lenient' | 'calibrated',
        fail_reasons: failReasons
      };

      // Save trace if requested
      if (options.trace) {
        await this.saveTrace(config, review, metrics, passed, failReasons, inputHash);
      }

      return result;

    } catch (error) {
      return {
        eval_id: config.id,
        passed: false,
        actual_score: 0,
        expected_band: config.expected_score_band,
        actual_band: ScoreBand.UNSUPPORTED,
        findings_match: false,
        forbidden_behaviors: [`Error: ${error}`],
        missing_fields: [],
        duration_ms: Date.now() - startTime,
        metrics: { tone_pass: false }
      };
    }
  }

  /**
   * Calculate metrics for a single eval
   */
  private calculateMetrics(review: any, config: EvalConfig): EvalMetrics {
    const metrics: EvalMetrics = {};

    // Calculate finding recall
    if (config.expected_findings?.must_detect) {
      const expectedFindings = config.expected_findings.must_detect;
      const criticalMisses = config.expected_findings.critical_misses || [];
      const actualTags = review.findings.map((f: any) => f.tag || f.id);

      const detectedExpected = expectedFindings.filter(f => actualTags.includes(f.id)).length;
      const missedCritical = criticalMisses.filter(id => !actualTags.includes(id)).length;

      metrics.finding_recall = expectedFindings.length > 0 ? detectedExpected / expectedFindings.length : 1;
      metrics.critical_recall = criticalMisses.length > 0 ? (criticalMisses.length - missedCritical) / criticalMisses.length : 1;
      metrics.missed_critical_findings = criticalMisses.filter(id => !actualTags.includes(id));

      // Check hallucinations
      if (config.expected_findings.should_not_detect) {
        const shouldNotDetect = config.expected_findings.should_not_detect.map((f: any) => f.id);
        const hallucinated = shouldNotDetect.filter(id => actualTags.includes(id));
        metrics.hallucination_count = hallucinated.length;
        metrics.hallucination_rate = hallucinated.length / Math.max(1, review.findings.length);
        metrics.hallucinated_findings = hallucinated;
      }
    }

    // Score calibration
    if (config.expected_score_range) {
      const { min, max } = config.expected_score_range;
      if (review.score.total < min) {
        metrics.score_calibration_error = min - review.score.total;
      } else if (review.score.total > max) {
        metrics.score_calibration_error = review.score.total - max;
      } else {
        metrics.score_calibration_error = 0;
      }
    }

    // Recommendation specificity check
    if (config.recommendation_expectation) {
      metrics.recommendation_specificity_pass = this.checkRecommendationSpecificity(review.findings, config.recommendation_expectation);
    }

    // Tone check
    if (config.tone_expectation) {
      metrics.tone_pass = this.checkTone(review, config.tone_expectation);
    } else {
      // Default tone check - always pass unless toxic language detected
      metrics.tone_pass = this.checkDefaultTone(review);
    }

    // Required fields check
    metrics.required_fields_pass = this.checkRequiredFields(review, config.required_output_fields || []).length === 0;

    // Score caps check
    if (config.expected_score_caps) {
      metrics.score_caps_pass = this.checkScoreCaps(review.score.score_caps_applied, config.expected_score_caps);
    }

    return metrics;
  }

  /**
   * Check score band match
   */
  private checkBandMatch(actualScore: number, expectedRange?: { min: number; max: number }): boolean {
    if (!expectedRange) return true;
    return actualScore >= expectedRange.min && actualScore <= expectedRange.max;
  }

  /**
   * Check if findings match expected
   */
  private checkFindings(findings: any[], config: EvalConfig): boolean {
    if (!config.expected_findings?.must_detect && !config.expected_tags) return true;

    const actualTags = findings.map(f => f.tag || f.id);
    const expectedFindings = config.expected_findings?.must_detect || (config.expected_tags || []).map((tag: string) => ({ id: tag }));

    // Check that all expected findings are present
    for (const expected of expectedFindings) {
      const expectedId = typeof expected === 'string' ? expected : expected.id;
      if (!actualTags.includes(expectedId)) {
        return false;
      }
    }

    // Check critical misses
    if (config.expected_findings?.critical_misses) {
      for (const criticalId of config.expected_findings.critical_misses) {
        if (!actualTags.includes(criticalId)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Check score calibration
   */
  private checkScoreCalibration(actualScore: number, expectedRange?: { min: number; max: number }): { label: string; error: number } {
    if (!expectedRange) return { label: 'calibrated', error: 0 };

    if (actualScore < expectedRange.min) {
      return { label: 'too_strict', error: expectedRange.min - actualScore };
    } else if (actualScore > expectedRange.max) {
      return { label: 'too_lenient', error: actualScore - expectedRange.max };
    }

    return { label: 'calibrated', error: 0 };
  }

  /**
   * Check recommendation specificity
   */
  private checkRecommendationSpecificity(findings: any[], expectation: any): boolean {
    const actionVerbs = ['add', 'define', 'specify', 'include', 'compare', 'quantify', 'split', 'narrow', 'document', 'create', 'set', 'replace', 'remove', 'restructure'];
    const concreteObjects = ['decision log', 'primary metric', 'proxy metric', 'guardrail metric', 'owner', 'rollout plan', 'rollback plan', 'trade-off', 'alternative', 'baseline', 'evidence', 'sample size', 'decision rule', 'risk', 'acceptance criteria', 'target segment', 'constraint', 'dependency', 'api contract'];

    let specificCount = 0;
    let totalCount = 0;

    for (const finding of findings) {
      const rec = finding.recommended_fix?.toLowerCase() || '';
      totalCount++;

      const hasActionVerb = actionVerbs.some(verb => rec.includes(verb));
      const hasConcreteObject = concreteObjects.some(obj => rec.includes(obj));

      if (hasActionVerb && hasConcreteObject) {
        specificCount++;
      }
    }

    return totalCount === 0 || specificCount / totalCount >= 0.75;
  }

  /**
   * Check tone
   */
  private checkTone(review: any, expectation: any): boolean {
    const reviewText = JSON.stringify(review).toLowerCase();

    // Check forbidden tone elements
    if (expectation?.must_not_be) {
      for (const forbidden of expectation.must_not_be) {
        if (reviewText.includes(forbidden.toLowerCase())) {
          return false;
        }
      }
    }

    // Check required tone elements
    if (expectation?.must_be) {
      for (const required of expectation.must_be) {
        if (!reviewText.includes(required.toLowerCase())) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Default tone check - detect toxic language
   */
  private checkDefaultTone(review: any): boolean {
    const toxicPhrases = ['terrible', 'nonsense', 'joke', 'lazy', 'incompetent', 'ai-generated', 'chatgpt'];
    const reviewText = JSON.stringify(review).toLowerCase();

    for (const phrase of toxicPhrases) {
      if (reviewText.includes(phrase)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check score caps
   */
  private checkScoreCaps(appliedCaps: any[] | undefined, expectedCaps: any[]): boolean {
    if (!expectedCaps || expectedCaps.length === 0) return true;
    if (!appliedCaps) return false;

    const appliedCapNames = appliedCaps.map(c => c.cap);
    return expectedCaps.every(cap => appliedCapNames.includes(cap.cap));
  }

  /**
   * Check forbidden behaviors
   */
  private checkForbiddenBehaviors(review: any, forbiddenBehaviors: string[]): string[] {
    const found: string[] = [];

    for (const behavior of forbiddenBehaviors) {
      switch (behavior) {
        case 'accuse_ai_use':
          if (JSON.stringify(review).toLowerCase().includes('ai-generated') ||
              JSON.stringify(review).toLowerCase().includes('chatgpt')) {
            found.push('accuse_ai_use');
          }
          break;
        case 'shame_author':
          if (JSON.stringify(review).toLowerCase().includes('poor') ||
              JSON.stringify(review).toLowerCase().includes('terrible') ||
              JSON.stringify(review).toLowerCase().includes('lazy')) {
            found.push('shame_author');
          }
          break;
        case 'generic_praise':
          if (JSON.stringify(review).toLowerCase().includes('great') ||
              JSON.stringify(review).toLowerCase().includes('excellent') &&
              review.findings.length > 0) {
            found.push('generic_praise');
          }
          break;
        case 'omit_readiness_score':
          if (!review.score) {
            found.push('omit_readiness_score');
          }
          break;
        case 'recommend_full_rewrite_without_reason':
          const rewrites = review.findings.filter((f: any) =>
            f.recommended_fix && f.recommended_fix.toLowerCase().includes('rewrite')
          );
          if (rewrites.length > 2) {
            found.push('recommend_full_rewrite_without_reason');
          }
          break;
      }
    }

    return found;
  }

  /**
   * Check required fields
   */
  private checkRequiredFields(review: any, requiredFields: string[]): string[] {
    const missing: string[] = [];

    for (const field of requiredFields) {
      const keys = field.split('.');
      let current = review;

      for (const key of keys) {
        if (!current || !current.hasOwnProperty(key)) {
          missing.push(field);
          break;
        }
        current = current[key];
      }
    }

    return missing;
  }

  /**
   * Save trace JSON
   */
  private async saveTrace(config: EvalConfig, review: any, metrics: EvalMetrics, passed: boolean, failReasons: string[], inputHash: string): Promise<void> {
    await fs.ensureDir(this.tracesDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const tracePath = path.join(this.tracesDir, `${timestamp}-${config.id}.json`);

    const trace: EvalTrace = {
      run_id: timestamp,
      timestamp: new Date().toISOString(),
      case_id: config.id,
      artifact_type: config.artifact_type,
      input_file: config.input_file,
      input_hash: inputHash,
      review_output: {
        score: review.score.total,
        band: review.verdict.band,
        findings: review.findings
      },
      expected: config,
      metrics,
      pass: passed,
      fail_reasons: failReasons
    };

    await fs.writeJSON(tracePath, trace, { spaces: 2 });
  }

  /**
   * Aggregate results from repeated runs
   */
  private aggregateResults(results: EvalResult[]): EvalResult {
    if (results.length === 1) return results[0];

    // Calculate average metrics
    const avgScore = results.reduce((sum, r) => sum + r.actual_score, 0) / results.length;
    const allPassed = results.every(r => r.passed);
    const allFindingsMatch = results.every(r => r.findings_match);
    const allForbiddenBehaviors = results.flatMap(r => r.forbidden_behaviors);
    const allMissingFields = results.flatMap(r => r.missing_fields);
    const totalDuration = results.reduce((sum, r) => sum + r.duration_ms, 0);

    return {
      eval_id: results[0].eval_id,
      passed: allPassed,
      actual_score: Math.round(avgScore),
      expected_band: results[0].expected_band,
      actual_band: results[0].actual_band, // Use first run's band
      findings_match: allFindingsMatch,
      forbidden_behaviors: [...new Set(allForbiddenBehaviors)],
      missing_fields: [...new Set(allMissingFields)],
      duration_ms: totalDuration,
      metrics: results[0].metrics // Use first run's metrics
    };
  }

  /**
   * Generate markdown report
   */
  private async generateReport(results: EvalResult[], options: EvalOptions): Promise<void> {
    await fs.ensureDir(this.reportsDir);

    const timestamp = new Date().toISOString();
    const reportPath = path.join(this.reportsDir, 'latest_eval_report.md');

    // Load thresholds
    const thresholds = await this.loadThresholds(options.strict ? 'strict' : 'default');

    // Calculate summary metrics
    const totalCases = results.length;
    const passedCases = results.filter(r => r.passed).length;
    const failedCases = totalCases - passedCases;

    const criticalRecall = results.reduce((sum, r) => sum + (r.metrics?.critical_recall ?? 1), 0) / totalCases;
    const findingRecall = results.reduce((sum, r) => sum + (r.metrics?.finding_recall ?? 1), 0) / totalCases;
    const hallucinationRate = results.reduce((sum, r) => sum + (r.metrics?.hallucination_rate ?? 0), 0) / totalCases;
    const avgScoreCalibrationError = results.reduce((sum, r) => sum + (r.metrics?.score_calibration_error ?? 0), 0) / totalCases;
    const tonePassRate = results.filter(r => r.metrics?.tone_pass).length / totalCases;
    const recommendationSpecificity = results.filter(r => r.metrics?.recommendation_specificity_pass).length / totalCases;

    // Check against thresholds
    const criticalRecallPass = criticalRecall >= (thresholds.critical_recall_min || 0.9);
    const findingRecallPass = findingRecall >= (thresholds.finding_recall_min || 0.75);
    const hallucinationRatePass = hallucinationRate <= (thresholds.hallucination_rate_max || 0.1);
    const scoreCalibrationPass = avgScoreCalibrationError <= (thresholds.average_score_calibration_error_max || 8);
    const tonePassRateCheck = tonePassRate >= (thresholds.tone_pass_rate_min || 1.0);
    const recommendationSpecificityPass = recommendationSpecificity >= (thresholds.recommendation_specificity_min || 0.75);

    // Generate report
    let report = `# Shokunin Review Eval Report

**Generated:** ${timestamp}
**Mode:** ${options.strict ? 'Strict' : 'Default'}
**Total Cases:** ${totalCases}

## Summary

| Metric                      | Result | Threshold | Status    |
| --------------------------- | -----: | --------: | --------- |
| Critical recall             | ${(criticalRecall * 100).toFixed(1)}% | ${(thresholds.critical_recall_min! * 100).toFixed(0)}% | ${criticalRecallPass ? '✅ PASS' : '❌ FAIL'} |
| Finding recall              | ${(findingRecall * 100).toFixed(1)}% | ${(thresholds.finding_recall_min! * 100).toFixed(0)}% | ${findingRecallPass ? '✅ PASS' : '❌ FAIL'} |
| Hallucination rate          | ${(hallucinationRate * 100).toFixed(1)}% | ≤${(thresholds.hallucination_rate_max! * 100).toFixed(0)}% | ${hallucinationRatePass ? '✅ PASS' : '❌ FAIL'} |
| Avg score calibration error | ${avgScoreCalibrationError.toFixed(1)} | ≤${thresholds.average_score_calibration_error_max} | ${scoreCalibrationPass ? '✅ PASS' : '❌ FAIL'} |
| Tone pass rate              | ${(tonePassRate * 100).toFixed(1)}% | ${(thresholds.tone_pass_rate_min! * 100).toFixed(0)}% | ${tonePassRateCheck ? '✅ PASS' : '❌ FAIL'} |
| Recommendation specificity  | ${(recommendationSpecificity * 100).toFixed(1)}% | ${(thresholds.recommendation_specificity_min! * 100).toFixed(0)}% | ${recommendationSpecificityPass ? '✅ PASS' : '❌ FAIL'} |

## Cases Summary

- **Total:** ${totalCases}
- **Passed:** ${passedCases} (${(passedCases / totalCases * 100).toFixed(1)}%)
- **Failed:** ${failedCases} (${(failedCases / totalCases * 100).toFixed(1)}%)

`;

    // Add failed cases section
    const failedResults = results.filter(r => !r.passed);
    if (failedResults.length > 0) {
      report += `## Failed Cases\n\n`;
      for (const result of failedResults) {
        report += `### ${result.eval_id}\n\n`;
        report += `- **Expected Band:** ${result.expected_band}\n`;
        report += `- **Actual Score:** ${result.actual_score} (${result.actual_band})\n`;
        report += `- **Calibration:** ${result.score_calibration_label || 'unknown'}\n`;
        if (result.missed_critical_findings && result.missed_critical_findings.length > 0) {
          report += `- **Missed Critical Findings:** ${result.missed_critical_findings.join(', ')}\n`;
        }
        if (result.hallucinated_findings && result.hallucinated_findings.length > 0) {
          report += `- **Hallucinated Findings:** ${result.hallucinated_findings.join(', ')}\n`;
        }
        if (result.fail_reasons && result.fail_reasons.length > 0) {
          report += `- **Fail Reasons:** ${result.fail_reasons.join(', ')}\n`;
        }
        report += `\n`;
      }
    }

    // Add score calibration outliers
    const outliers = results.filter(r => r.metrics?.score_calibration_error && r.metrics.score_calibration_error > 0);
    if (outliers.length > 0) {
      report += `## Score Calibration Outliers\n\n`;
      for (const result of outliers) {
        report += `### ${result.eval_id}\n\n`;
        report += `- **Calibration Error:** ${result.metrics?.score_calibration_error?.toFixed(1)} points\n`;
        report += `- **Label:** ${result.score_calibration_label}\n`;
        report += `- **Actual Score:** ${result.actual_score}\n`;
        report += `\n`;
      }
    }

    await fs.writeFile(reportPath, report);
    console.log(`Report written to ${reportPath}`);
  }

  /**
   * Load regression thresholds
   */
  private async loadThresholds(mode: 'default' | 'strict' | 'relaxed' = 'default'): Promise<RegressionThresholds> {
    const thresholdsPath = path.join(this.rubricsDir, 'regression_thresholds.yaml');

    if (!await fs.pathExists(thresholdsPath)) {
      // Return default thresholds if file doesn't exist
      return {
        critical_recall_min: 0.90,
        finding_recall_min: 0.75,
        hallucination_rate_max: 0.10,
        average_score_calibration_error_max: 8,
        tone_pass_rate_min: 1.00,
        recommendation_specificity_min: 0.75
      };
    }

    const content = await fs.readFile(thresholdsPath, 'utf-8');
    const yamlContent = yaml.parse(content);
    return yamlContent[mode] || yamlContent.default;
  }
}
