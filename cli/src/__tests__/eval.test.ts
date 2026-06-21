/**
 * Eval harness tests
 */

import {
  EvalConfig,
  EvalResult,
  ScoreBand,
  EvalMetrics,
  ScoreRange
} from '../types';

// Helper function to normalize eval config (mimicking EvalRunner logic)
function normalizeEvalConfig(config: any): EvalConfig {
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

  const expected_findings = config.expected_findings || {};
  if (!expected_findings.must_detect && config.expected_tags) {
    (expected_findings as any).must_detect = config.expected_tags.map((tag: string) => ({
      id: tag,
      severity: 'medium'
    }));
  }

  return {
    ...config,
    expected_score_range
  };
}

// Helper to check score calibration
function checkScoreCalibration(actualScore: number, expectedRange?: ScoreRange): { label: string; error: number } {
  if (!expectedRange) return { label: 'calibrated', error: 0 };

  if (actualScore < expectedRange.min) {
    return { label: 'too_strict', error: expectedRange.min - actualScore };
  } else if (actualScore > expectedRange.max) {
    return { label: 'too_lenient', error: actualScore - expectedRange.max };
  }

  return { label: 'calibrated', error: 0 };
}

// Helper to check recommendation specificity
function checkRecommendationSpecificity(findings: any[]): boolean {
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

// Helper to check tone
function checkDefaultTone(review: any): boolean {
  const toxicPhrases = ['terrible', 'nonsense', 'joke', 'lazy', 'incompetent', 'ai-generated', 'chatgpt'];
  const reviewText = JSON.stringify(review).toLowerCase();

  for (const phrase of toxicPhrases) {
    if (reviewText.includes(phrase)) {
      return false;
    }
  }

  return true;
}

describe('Eval Schema Compatibility', () => {
  test('should parse old YAML schema with expected_tags', () => {
    const oldConfig = {
      id: 'test-old-schema',
      artifact_type: 'PRD' as any,
      input_file: 'examples/test.md',
      expected_tags: ['metric-fog', 'evidence-gap'],
      expected_score_band: ScoreBand.NOT_REVIEW_READY,
      expected_score: '25-45'
    };

    const normalized = normalizeEvalConfig(oldConfig);

    expect(normalized.expected_findings.must_detect).toBeDefined();
    expect(normalized.expected_findings.must_detect).toHaveLength(2);
    expect(normalized.expected_findings.must_detect![0].id).toBe('metric-fog');
    expect(normalized.expected_score_range).toBeDefined();
    expect(normalized.expected_score_range!.min).toBe(25);
    expect(normalized.expected_score_range!.max).toBe(45);
  });

  test('should parse new YAML schema with expected_findings', () => {
    const newConfig = {
      id: 'test-new-schema',
      artifact_type: 'PRD' as any,
      input_file: 'examples/test.md',
      expected_findings: {
        must_detect: [
          { id: 'decision_traceability_missing', severity: 'high', category: 'decision_quality' }
        ],
        critical_misses: ['decision_traceability_missing']
      },
      expected_score_band: ScoreBand.NOT_REVIEW_READY,
      expected_score_range: { min: 25, max: 45 }
    };

    const normalized = normalizeEvalConfig(newConfig);

    expect(normalized.expected_findings.must_detect).toHaveLength(1);
    expect(normalized.expected_findings.must_detect![0].id).toBe('decision_traceability_missing');
    expect(normalized.expected_score_range!.min).toBe(25);
    expect(normalized.expected_score_range!.max).toBe(45);
  });

  test('should handle backward compatibility for missing optional fields', () => {
    const minimalConfig = {
      id: 'test-minimal',
      artifact_type: 'PRD' as any,
      input_file: 'examples/test.md',
      expected_score_band: ScoreBand.NOT_REVIEW_READY
    };

    const normalized = normalizeEvalConfig(minimalConfig);

    expect(normalized.expected_findings).toEqual({});
    expect(normalized.expected_score_range).toBeUndefined();
    expect(normalized.forbidden_behaviors).toBeUndefined();
  });
});

describe('Score Range Parser', () => {
  test('should parse "25-45" string into min/max', () => {
    const config = { expected_score: '25-45' };
    const normalized = normalizeEvalConfig(config);

    expect(normalized.expected_score_range).toEqual({ min: 25, max: 45 });
  });

  test('should parse "60-74" string into min/max', () => {
    const config = { expected_score: '60-74' };
    const normalized = normalizeEvalConfig(config);

    expect(normalized.expected_score_range).toEqual({ min: 60, max: 74 });
  });

  test('should handle existing score range object', () => {
    const config = {
      expected_score_range: { min: 85, max: 95 }
    };
    const normalized = normalizeEvalConfig(config);

    expect(normalized.expected_score_range).toEqual({ min: 85, max: 95 });
  });

  test('should handle invalid score format gracefully', () => {
    const config = { expected_score: 'invalid' };
    const normalized = normalizeEvalConfig(config);

    expect(normalized.expected_score_range).toBeUndefined();
  });
});

describe('Score Calibration Check', () => {
  test('should return calibrated when score is within range', () => {
    const result = checkScoreCalibration(35, { min: 25, max: 45 });

    expect(result.label).toBe('calibrated');
    expect(result.error).toBe(0);
  });

  test('should return too_strict when score is below min', () => {
    const result = checkScoreCalibration(18, { min: 25, max: 45 });

    expect(result.label).toBe('too_strict');
    expect(result.error).toBe(7);
  });

  test('should return too_lenient when score is above max', () => {
    const result = checkScoreCalibration(82, { min: 60, max: 74 });

    expect(result.label).toBe('too_lenient');
    expect(result.error).toBe(8);
  });

  test('should return calibrated when score equals boundary', () => {
    const result = checkScoreCalibration(25, { min: 25, max: 45 });

    expect(result.label).toBe('calibrated');
    expect(result.error).toBe(0);
  });

  test('should handle undefined expected range', () => {
    const result = checkScoreCalibration(50, undefined);

    expect(result.label).toBe('calibrated');
    expect(result.error).toBe(0);
  });
});

describe('Finding Comparison', () => {
  test('should pass when all expected findings are detected', () => {
    const findings = [
      { tag: 'decision_traceability_missing', id: 'decision_traceability_missing' },
      { tag: 'metric-fog', id: 'metric-fog' }
    ];

    const config: EvalConfig = {
      id: 'test',
      artifact_type: 'PRD',
      input_file: 'test.md',
      expected_findings: {
        must_detect: [
          { id: 'decision_traceability_missing' },
          { id: 'metric-fog' }
        ]
      },
      expected_score_band: ScoreBand.NOT_REVIEW_READY
    };

    const actualTags = findings.map(f => f.tag || f.id);
    const allDetected = config.expected_findings.must_detect!.every(f => actualTags.includes(f.id));

    expect(allDetected).toBe(true);
  });

  test('should fail when critical findings are missed', () => {
    const findings = [
      { tag: 'metric-fog', id: 'metric-fog' }
    ];

    const config: EvalConfig = {
      id: 'test',
      artifact_type: 'PRD',
      input_file: 'test.md',
      expected_findings: {
        must_detect: [
          { id: 'decision_traceability_missing' },
          { id: 'metric-fog' }
        ],
        critical_misses: ['decision_traceability_missing']
      },
      expected_score_band: ScoreBand.NOT_REVIEW_READY
    };

    const actualTags = findings.map(f => f.tag || f.id);
    const missedCritical = config.expected_findings.critical_misses!.filter(id => !actualTags.includes(id));

    expect(missedCritical).toHaveLength(1);
    expect(missedCritical[0]).toBe('decision_traceability_missing');
  });

  test('should detect hallucinated findings', () => {
    const findings = [
      { tag: 'security_vulnerability', id: 'security_vulnerability' },
      { tag: 'metric-fog', id: 'metric-fog' }
    ];

    const config: EvalConfig = {
      id: 'test',
      artifact_type: 'PRD',
      input_file: 'test.md',
      expected_findings: {
        must_detect: [{ id: 'metric-fog' }],
        should_not_detect: [
          { id: 'security_vulnerability', reason: 'No security implications' }
        ]
      },
      expected_score_band: ScoreBand.NOT_REVIEW_READY
    };

    const actualTags = findings.map(f => f.tag || f.id);
    const shouldNotDetect = config.expected_findings.should_not_detect!.map(f => f.id);
    const hallucinated = shouldNotDetect.filter(id => actualTags.includes(id));

    expect(hallucinated).toHaveLength(1);
    expect(hallucinated[0]).toBe('security_vulnerability');
  });
});

describe('Recommendation Specificity Heuristic', () => {
  test('should pass when recommendations are specific', () => {
    const findings = [
      {
        recommended_fix: 'Add a decision log that compares SMS vs push notifications, including cost analysis'
      },
      {
        recommended_fix: 'Define one primary metric (e.g., order value increase) and at least two proxy metrics'
      },
      {
        recommended_fix: 'Document product, technical, and operational risks with mitigation strategies'
      },
      {
        recommended_fix: 'The metrics section needs more detail'
      }
    ];

    const result = checkRecommendationSpecificity(findings);
    expect(result).toBe(true); // 3/4 are specific (75%)
  });

  test('should fail when recommendations are generic', () => {
    const findings = [
      { recommended_fix: 'Improve this section' },
      { recommended_fix: 'Add more detail' },
      { recommended_fix: 'Clarify the approach' },
      { recommended_fix: 'Make it better' }
    ];

    const result = checkRecommendationSpecificity(findings);
    expect(result).toBe(false); // 0/4 are specific
  });

  test('should pass when all recommendations are specific', () => {
    const findings = [
      { recommended_fix: 'Add guardrail metrics for the AI system' },
      { recommended_fix: 'Define primary metric and proxy metrics' },
      { recommended_fix: 'Document the rollout plan' }
    ];

    const result = checkRecommendationSpecificity(findings);
    expect(result).toBe(true); // 3/3 are specific (100%)
  });

  test('should pass when there are no recommendations', () => {
    const findings: any[] = [];
    const result = checkRecommendationSpecificity(findings);
    expect(result).toBe(true); // Empty case passes
  });
});

describe('Tone Heuristic', () => {
  test('should pass when tone is professional', () => {
    const review = {
      findings: [
        {
          issue: 'Missing decision log',
          recommended_fix: 'Add a decision log section to document key decisions'
        }
      ]
    };

    const result = checkDefaultTone(review);
    expect(result).toBe(true);
  });

  test('should fail when tone includes toxic phrases', () => {
    const review = {
      findings: [
        {
          issue: 'This is terrible',
          recommended_fix: 'Fix this nonsense'
        }
      ]
    };

    const result = checkDefaultTone(review);
    expect(result).toBe(false);
  });

  test('should fail when tone accuses AI use', () => {
    const review = {
      findings: [
        {
          issue: 'This looks AI-generated',
          recommended_fix: 'Did ChatGPT write this?'
        }
      ]
    };

    const result = checkDefaultTone(review);
    expect(result).toBe(false);
  });

  test('should pass when tone is direct but not toxic', () => {
    const review = {
      findings: [
        {
          issue: 'Critical gaps in evidence',
          recommended_fix: 'Provide baseline data and customer research to support claims'
        }
      ]
    };

    const result = checkDefaultTone(review);
    expect(result).toBe(true);
  });
});

describe('Report Generation', () => {
  test('should generate summary metrics from results', () => {
    const results: EvalResult[] = [
      {
        eval_id: 'test-1',
        passed: true,
        actual_score: 35,
        expected_band: ScoreBand.NOT_REVIEW_READY,
        actual_band: ScoreBand.NOT_REVIEW_READY,
        findings_match: true,
        forbidden_behaviors: [],
        missing_fields: [],
        duration_ms: 1000,
        metrics: {
          critical_recall: 1.0,
          finding_recall: 0.8,
          hallucination_rate: 0.0,
          score_calibration_error: 0,
          tone_pass: true
        }
      },
      {
        eval_id: 'test-2',
        passed: false,
        actual_score: 50,
        expected_band: ScoreBand.REVIEW_READY,
        actual_band: ScoreBand.NEEDS_REVISION,
        findings_match: false,
        forbidden_behaviors: [],
        missing_fields: [],
        duration_ms: 1200,
        metrics: {
          critical_recall: 0.7,
          finding_recall: 0.6,
          hallucination_rate: 0.1,
          score_calibration_error: 10,
          tone_pass: true
        }
      }
    ];

    const totalCases = results.length;
    const passedCases = results.filter(r => r.passed).length;
    const avgCriticalRecall = results.reduce((sum, r) => sum + (r.metrics?.critical_recall || 0), 0) / totalCases;
    const avgFindingRecall = results.reduce((sum, r) => sum + (r.metrics?.finding_recall || 0), 0) / totalCases;

    expect(totalCases).toBe(2);
    expect(passedCases).toBe(1);
    expect(avgCriticalRecall).toBe(0.85);
    expect(avgFindingRecall).toBe(0.7);
  });
});
