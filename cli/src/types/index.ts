// Core Types for Shokunin Review CLI

export interface Artifact {
  type: ArtifactType;
  content: string;
  filePath: string;
  fileName: string;
  size: number;
  lines: number;
}

export enum ArtifactType {
  PRD = 'PRD',
  RFC = 'RFC',
  EXPERIMENT_PLAN = 'EXPERIMENT_PLAN',
  PRODUCT_STRATEGY = 'PRODUCT_STRATEGY',
  UNKNOWN = 'UNKNOWN'
}

export enum ReviewMode {
  DEFAULT = 'default',
  FULL = 'full',
  JSON = 'json',
  MARKDOWN = 'markdown',
  QUIET = 'quiet'
}

export enum ScoreBand {
  REVIEW_READY = 'Review-ready',
  READY_WITH_MINOR_FIXES = 'Ready with minor fixes',
  NEEDS_MAJOR_FIXES = 'Needs major fixes',
  NEEDS_REVISION = 'Needs revision',
  NOT_REVIEW_READY = 'Not review-ready',
  UNSUPPORTED = 'Unsupported'
}

export enum VerdictEmoji {
  REVIEW_READY = '🟢',
  READY_WITH_MINOR_FIXES = '🟡',
  NEEDS_MAJOR_FIXES = '🟠',
  NEEDS_REVISION = '🔴',
  NOT_REVIEW_READY = '🔴',
  UNSUPPORTED = '⛔'
}

export interface Verdict {
  emoji: VerdictEmoji;
  text: string;
  band: ScoreBand;
}

export interface ScoreBreakdown {
  [dimension: string]: number;
}

export interface ScoreCap {
  cap: string;
  max_score: number;
}

export interface Score {
  total: number;
  confidence: 'high' | 'medium' | 'low';
  dimension_breakdown?: ScoreBreakdown;
  score_caps_applied?: ScoreCap[];
}

export interface Finding {
  id: string;
  validator: string;
  tag: string;
  severity: 'blocker' | 'high' | 'medium' | 'low';
  confidence: 'high' | 'medium' | 'low';
  category?: string;
  location?: string;
  issue: string;
  evidence_from_artifact?: string;
  why_it_matters?: string;
  recommended_fix: string;
  example_fix?: string;
  acceptance_test?: string;
  needs_human_judgment?: boolean;
}

export interface ReviewOutput {
  verdict: Verdict;
  score: Score;
  findings: Finding[];
  recommended_action?: string;
  suggested_command?: string;
  rationale?: string;
  missing_context?: string[];
  metadata?: {
    artifact_type: ArtifactType;
    classification_confidence: string;
    review_mode: ReviewMode;
    duration_seconds: number;
    timestamp: string;
    review_run_id?: string;
  };
  trace?: any; // ScoringTrace - will be defined in reviewEngine
}

export interface ReviewOptions {
  mode: ReviewMode;
  verbose?: boolean;
  local_only?: boolean;
  no_trace?: boolean;
  focus_validator?: string;
  output_file?: string;
}

// Extended eval types with backward compatibility

export interface ExpectedFinding {
  id: string;
  severity?: 'blocker' | 'high' | 'medium' | 'low';
  category?: string;
  evidence_hint?: string;
}

export interface ScoreRange {
  min: number;
  max: number;
}

export interface RecommendationExpectation {
  must_be?: string[];
  must_include_patterns?: string[];
  must_not_be?: string[];
}

export interface ToneExpectation {
  must_be?: string[];
  must_not_be?: string[];
}

export interface EvalConfig {
  id: string;
  artifact_type: ArtifactType;
  input_file: string;
  // Legacy field - backward compatibility
  expected_tags?: string[];
  // New structured expected findings
  expected_findings?: {
    must_detect?: ExpectedFinding[];
    nice_to_have?: ExpectedFinding[];
    should_not_detect?: Array<{ id: string; reason?: string }>;
    critical_misses?: string[];
  };
  expected_score_band: ScoreBand;
  // Legacy format - string like "25-45"
  expected_score?: string;
  // New structured score range
  expected_score_range?: ScoreRange;
  expected_score_caps?: ScoreCap[];
  required_validators?: string[];
  forbidden_behaviors?: string[];
  required_output_fields?: string[];
  recommendation_expectation?: RecommendationExpectation;
  tone_expectation?: ToneExpectation;
  notes?: string;
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

export interface EvalResult {
  eval_id: string;
  passed: boolean;
  actual_score: number;
  expected_band: ScoreBand;
  actual_band: ScoreBand;
  findings_match: boolean;
  forbidden_behaviors: string[];
  missing_fields: string[];
  duration_ms: number;
  metrics?: EvalMetrics;
  missed_critical_findings?: string[];
  hallucinated_findings?: string[];
  score_calibration_label?: 'too_strict' | 'too_lenient' | 'calibrated';
  fail_reasons?: string[];
}

export interface RegressionThresholds {
  critical_recall_min: number;
  finding_recall_min: number;
  hallucination_rate_max: number;
  average_score_calibration_error_max: number;
  tone_pass_rate_min: number;
  recommendation_specificity_min: number;
}

export interface EvalTrace {
  run_id: string;
  timestamp: string;
  case_id: string;
  artifact_type: ArtifactType;
  input_file: string;
  input_hash: string;
  prompt_version?: string;
  rubric_version?: string;
  review_output: {
    score: number;
    band: ScoreBand;
    findings: any[];
  };
  expected: any;
  metrics: any;
  pass: boolean;
  fail_reasons: string[];
}

export interface EvalReport {
  run_id: string;
  timestamp: string;
  summary: {
    total_cases: number;
    passed_cases: number;
    failed_cases: number;
    critical_recall: number;
    finding_recall: number;
    hallucination_rate: number;
    avg_score_calibration_error: number;
    tone_pass_rate: number;
    recommendation_specificity: number;
  };
  failed_cases: any[];
  score_calibration_outliers: any[];
  missed_critical_findings: any[];
  false_positives: any[];
  recommended_improvements: string[];
}

export interface CLIOptions {
  command: 'review' | 'improve' | 'rerun' | 'score' | 'eval' | 'help';
  input?: string;
  output?: string;
  mode?: string;
  verbose?: boolean;
  filter?: string;
  compare?: string;
  focus?: string;
  localOnly?: boolean;
  noTrace?: boolean;
  // New eval options
  strict?: boolean;
  report?: boolean;
  trace?: boolean;
  updateGolden?: boolean;
  repeat?: number;
}