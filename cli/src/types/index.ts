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

export interface EvalConfig {
  id: string;
  artifact_type: ArtifactType;
  input_file: string;
  expected_tags: string[];
  expected_score_band: ScoreBand;
  expected_score?: string;
  expected_score_caps?: ScoreCap[];
  required_validators: string[];
  forbidden_behaviors: string[];
  required_output_fields: string[];
  notes?: string;
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
}