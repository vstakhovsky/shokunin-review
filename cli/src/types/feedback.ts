/**
 * Feedback system types for Shokunin Review
 */

/**
 * Types of feedback users can provide
 */
export type FeedbackType =
  | "false_positive"           // Finding is incorrect, issue doesn't exist
  | "false_negative"           // Issue exists but wasn't detected
  | "missed_issue"             // Shokunin missed an important issue
  | "severity_too_high"        // Finding severity is too severe
  | "severity_too_low"         // Finding severity is not severe enough
  | "score_too_high"           // Overall score is too high
  | "score_too_low"            // Overall score is too low
  | "not_actionable"           // Finding/recommendation is not actionable
  | "too_generic"              // Output is too generic or vague
  | "too_long"                 // Output is too long or verbose
  | "overengineered"           // Solution is over-engineered
  | "wrong_document_type"      // Document type detection is wrong
  | "wrong_audience"           // Audience analysis is wrong
  | "wrong_validator"          // Wrong validator was applied
  | "hallucination"            // System invented something not in document
  | "unsupported_claim"        // Claim made without evidence
  | "other";                   // Other feedback

/**
 * Target of feedback
 */
export type FeedbackTarget =
  | "finding"                 // Specific finding
  | "score"                   // Overall score
  | "verdict"                 // Final verdict
  | "recommendation"          // Specific recommendation
  | "validator_selection"     // Which validators were chosen
  | "document_detection"      // Document type detection
  | "missed_issue"            // Issue that should have been found
  | "overall_output";         // General quality of output

/**
 * Severity levels for findings
 */
export type FindingSeverity = "blocker" | "major" | "minor" | "nit";

/**
 * Feedback status in lifecycle
 */
export type FeedbackStatus =
  | "new"                     // Just created
  | "reviewed"                // Reviewed by maintainers
  | "accepted"                // Accepted as valid feedback
  | "rejected"                // Rejected as invalid
  | "converted_to_eval";      // Converted into eval candidate

/**
 * Structured feedback record
 */
export interface ReviewFeedback {
  id: string;                 // Unique feedback ID
  timestamp: string;          // ISO timestamp
  documentPath: string;      // Path to reviewed document
  documentHash?: string;      // Content hash for change detection
  reviewRunId?: string;       // Link to specific review run
  targetType: FeedbackTarget;// What the feedback targets
  targetId?: string;          // ID of specific finding/item
  feedbackType: FeedbackType; // Type of feedback
  userReason?: string;        // Selected reason from menu
  userCorrection?: string;    // Free-form correction note
  originalValue?: unknown;    // Original value that was wrong
  suggestedValue?: unknown;   // Suggested correct value
  severity?: FindingSeverity;  // If feedback is about severity
  status: FeedbackStatus;      // Status in lifecycle
  tags?: string[];            // Additional tags
}

/**
 * Feedback reason options for different feedback types
 */
export interface FeedbackReasonOptions {
  [key: string]: string[];
}

/**
 * Eval candidate created from feedback
 */
export interface EvalCandidate {
  id: string;                 // Unique candidate ID
  sourceFeedbackId: string;  // Feedback that created this
  type: string;               // Type of eval candidate
  source: "user_feedback";    // Source identifier
  documentPath: string;       // Path to test document
  expectedBehavior: string;   // What should happen
  candidateEvalStatus: "new" | "proposed" | "accepted" | "rejected";
  createdAt: string;          // ISO timestamp
}

/**
 * Feedback summary statistics
 */
export interface FeedbackSummary {
  total: number;             // Total feedback events
  byType: Record<string, number>;  // Count by feedback type
  byTarget: Record<string, number>; // Count by target type
  byValidator: Record<string, number>; // Count by validator
  recentFeedback: ReviewFeedback[];  // Most recent feedback
  recommendedImprovements: string[]; // Suggested improvements
}

/**
 * Feedback storage configuration
 */
export interface FeedbackStorageConfig {
  feedbackDir: string;       // Directory for feedback storage
  feedbackLogPath: string;    // Path to feedback log JSONL
  evalCandidatesDir: string;  // Directory for eval candidates
  tracesDir: string;          // Directory for review traces
}

/**
 * Feedback menu options for different scenarios
 */
export interface FeedbackMenuOptions {
  false_positive: string[];
  false_negative: string[];
  missed_issue: string[];
  score_wrong: string[];
  not_useful: string[];
  severity_wrong: string[];
}
