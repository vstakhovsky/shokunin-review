import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { EvalConfig, EvalResult, ScoreBand } from '../types';
import { FileProcessor } from './fileProcessor';
import { ReviewEngine } from './reviewEngine';

export interface EvalOptions {
  filter?: string;
  verbose?: boolean;
  updateGolden?: boolean;
}

export class EvalRunner {
  private evalsDir: string;
  private goldenDir: string;

  constructor() {
    this.evalsDir = path.join(process.cwd(), 'harness', 'evals');
    this.goldenDir = path.join(process.cwd(), 'harness', 'golden');
  }

  /**
   * Run all evals or filtered subset
   */
  async runEvals(options: EvalOptions): Promise<EvalResult[]> {
    const evalConfigs = await this.loadEvalConfigs(options.filter);
    const results: EvalResult[] = [];

    for (const config of evalConfigs) {
      const result = await this.runSingleEval(config, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Load eval configurations
   */
  private async loadEvalConfigs(filter?: string): Promise<EvalConfig[]> {
    const configs: EvalConfig[] = [];
    const files = await fs.readdir(this.evalsDir);

    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;

      if (filter && !file.includes(filter)) {
        continue;
      }

      const filePath = path.join(this.evalsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const config = yaml.parse(content) as EvalConfig;

      configs.push(config);
    }

    return configs;
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
          duration_ms: Date.now() - startTime
        };
      }

      // Process file
      const fileProcessor = new FileProcessor();
      const artifact = await fileProcessor.processFile(inputPath);

      // Run review
      const reviewEngine = new ReviewEngine();
      const review = await reviewEngine.review(artifact, { mode: 'full' as any });

      // Check if score band matches expected
      const bandMatches = this.checkBandMatch(review.score.total, config.expected_score);

      // Check findings
      const findingsMatch = this.checkFindings(review.findings, config.expected_tags);

      // Check for forbidden behaviors (basic check)
      const forbiddenBehaviors = this.checkForbiddenBehaviors(review, config.forbidden_behaviors);

      // Check required fields
      const missingFields = this.checkRequiredFields(review, config.required_output_fields);

      const passed = bandMatches && findingsMatch &&
                     forbiddenBehaviors.length === 0 &&
                     missingFields.length === 0;

      return {
        eval_id: config.id,
        passed,
        actual_score: review.score.total,
        expected_band: config.expected_score_band,
        actual_band: review.verdict.band,
        findings_match: findingsMatch,
        forbidden_behaviors: forbiddenBehaviors,
        missing_fields: missingFields,
        duration_ms: Date.now() - startTime
      };

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
        duration_ms: Date.now() - startTime
      };
    }
  }

  /**
   * Check if score matches expected band
   */
  private checkBandMatch(actualScore: number, expectedScoreStr: string): boolean {
    if (!expectedScoreStr) return true;

    // Parse expected score range (e.g., "25-40")
    const match = expectedScoreStr.match(/(\d+)-(\d+)/);
    if (!match) return true;

    const [_, min, max] = match;
    return actualScore >= parseInt(min) && actualScore <= parseInt(max);
  }

  /**
   * Check if findings contain expected tags
   */
  private checkFindings(findings: any[], expectedTags: string[]): boolean {
    const actualTags = findings.map(f => f.tag);

    // Check that all expected tags are present
    for (const expectedTag of expectedTags) {
      if (!actualTags.includes(expectedTag)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check for forbidden behaviors
   */
  private checkForbiddenBehaviors(review: any, forbiddenBehaviors: string[]): string[] {
    const found: string[] = [];

    for (const behavior of forbiddenBehaviors) {
      switch (behavior) {
        case 'accuse_ai_use':
          if (JSON.stringify(review).includes('AI-generated') ||
              JSON.stringify(review).includes('ChatGPT')) {
            found.push('accuse_ai_use');
          }
          break;
        case 'shame_author':
          if (JSON.stringify(review).includes('poor') ||
              JSON.stringify(review).includes('terrible') ||
              JSON.stringify(review).includes('lazy')) {
            found.push('shame_author');
          }
          break;
        case 'generic_praise':
          if (JSON.stringify(review).includes('great') ||
              JSON.stringify(review).includes('excellent') &&
              review.findings.length > 0) {
            found.push('generic_praise');
          }
          break;
        case 'omit_readiness_score':
          if (!review.score) {
            found.push('omit_readiness_score');
          }
          break;
        case 'recommend_full_rewrite':
          const rewrites = review.findings.filter((f: any) =>
            f.recommended_fix && f.recommended_fix.includes('rewrite')
          );
          if (rewrites.length > 2) {
            found.push('recommend_full_rewrite');
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
}