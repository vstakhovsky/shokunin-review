import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';
import {
  ReviewFeedback,
  EvalCandidate,
  FeedbackSummary,
  FeedbackStorageConfig,
  FeedbackType,
  FeedbackTarget
} from '../types/feedback';

/**
 * Manages feedback storage and retrieval
 */
export class FeedbackManager {
  private config: FeedbackStorageConfig;

  constructor(projectRoot: string = process.cwd()) {
    this.config = {
      feedbackDir: path.join(projectRoot, '.shokunin', 'feedback'),
      feedbackLogPath: path.join(projectRoot, '.shokunin', 'feedback', 'feedback-log.jsonl'),
      evalCandidatesDir: path.join(projectRoot, '.shokunin', 'eval-candidates'),
      tracesDir: path.join(projectRoot, '.shokunin', 'traces')
    };
  }

  /**
   * Initialize feedback storage directories
   */
  async initialize(): Promise<void> {
    await fs.ensureDir(this.config.feedbackDir);
    await fs.ensureDir(this.config.evalCandidatesDir);
    await fs.ensureDir(this.config.tracesDir);
  }

  /**
   * Save feedback to JSONL log
   */
  async saveFeedback(feedback: ReviewFeedback): Promise<void> {
    await this.initialize();

    const feedbackWithTimestamp = {
      ...feedback,
      timestamp: feedback.timestamp || new Date().toISOString()
    };

    const line = JSON.stringify(feedbackWithTimestamp) + '\n';
    await fs.appendFile(this.config.feedbackLogPath, line, 'utf-8');
  }

  /**
   * Load all feedback from log
   */
  async loadFeedback(): Promise<ReviewFeedback[]> {
    try {
      const content = await fs.readFile(this.config.feedbackLogPath, 'utf-8');
      const lines = content.trim().split('\n').filter(line => line.length > 0);

      return lines.map(line => {
        try {
          return JSON.parse(line) as ReviewFeedback;
        } catch (e) {
          console.warn(`Failed to parse feedback line: ${line}`);
          return null;
        }
      }).filter((f): f is ReviewFeedback => f !== null);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return []; // File doesn't exist yet
      }
      throw error;
    }
  }

  /**
   * Create eval candidate from feedback
   */
  async createEvalCandidate(feedback: ReviewFeedback): Promise<EvalCandidate> {
    await this.initialize();

    const candidateId = `eval_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const candidatePath = path.join(this.config.evalCandidatesDir, `${candidateId}.json`);

    const candidate: EvalCandidate = {
      id: candidateId,
      sourceFeedbackId: feedback.id,
      type: this.getCandidateTypeFromFeedback(feedback),
      source: 'user_feedback',
      documentPath: feedback.documentPath,
      expectedBehavior: this.buildExpectedBehavior(feedback),
      candidateEvalStatus: 'new',
      createdAt: new Date().toISOString()
    };

    await fs.writeJSON(candidatePath, candidate, { spaces: 2 });

    return candidate;
  }

  /**
   * Get feedback summary
   */
  async getSummary(): Promise<FeedbackSummary> {
    const allFeedback = await this.loadFeedback();

    const summary: FeedbackSummary = {
      total: allFeedback.length,
      byType: {},
      byTarget: {},
      byValidator: {},
      recentFeedback: allFeedback.slice(-10).reverse(),
      recommendedImprovements: []
    };

    // Count by type
    for (const feedback of allFeedback) {
      summary.byType[feedback.feedbackType] = (summary.byType[feedback.feedbackType] || 0) + 1;
      summary.byTarget[feedback.targetType] = (summary.byTarget[feedback.targetType] || 0) + 1;

      // Extract validator from targetId if it's a finding
      if (feedback.targetType === 'finding' && feedback.targetId) {
        const validator = this.extractValidatorFromFindingId(feedback.targetId);
        if (validator) {
          summary.byValidator[validator] = (summary.byValidator[validator] || 0) + 1;
        }
      }
    }

    // Generate recommendations
    summary.recommendedImprovements = this.generateRecommendations(summary);

    return summary;
  }

  /**
   * Generate feedback ID
   */
  generateFeedbackId(): string {
    return `fb_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  }

  /**
   * Generate review run ID
   */
  generateReviewRunId(): string {
    return `rev_${new Date().toISOString().replace(/[:.]/g, '_').split('T')[0]}_${crypto.randomBytes(4).toString('hex')}`;
  }

  /**
   * Calculate document hash
   */
  async calculateDocumentHash(documentPath: string): Promise<string> {
    try {
      const content = await fs.readFile(documentPath, 'utf-8');
      return crypto.createHash('sha256').update(content).digest('hex');
    } catch (error) {
      return '';
    }
  }

  /**
   * Get candidate type from feedback
   */
  private getCandidateTypeFromFeedback(feedback: ReviewFeedback): string {
    switch (feedback.feedbackType) {
      case 'false_positive':
        return 'finding_false_positive';
      case 'missed_issue':
      case 'false_negative':
        return 'finding_false_negative';
      case 'score_too_high':
      case 'score_too_low':
        return 'score_calibration';
      case 'severity_too_high':
      case 'severity_too_low':
        return 'severity_calibration';
      case 'too_generic':
        return 'finding_specificity';
      default:
        return 'general_improvement';
    }
  }

  /**
   * Build expected behavior description
   */
  private buildExpectedBehavior(feedback: ReviewFeedback): string {
    const parts: string[] = [];

    if (feedback.userReason) {
      parts.push(`Reason: ${feedback.userReason}`);
    }

    if (feedback.userCorrection) {
      parts.push(`Correction: ${feedback.userCorrection}`);
    }

    if (feedback.targetId) {
      parts.push(`Target: ${feedback.targetId}`);
    }

    if (feedback.suggestedValue) {
      parts.push(`Suggested: ${JSON.stringify(feedback.suggestedValue)}`);
    }

    return parts.join('. ') || 'User reported issue with review output';
  }

  /**
   * Extract validator name from finding ID
   */
  private extractValidatorFromFindingId(findingId: string): string | null {
    // Finding IDs are typically like "F-001" or include validator info
    // This is a placeholder - actual implementation depends on finding ID format
    const match = findingId.match(/\[([^\]]+)\]/);
    return match ? match[1] : null;
  }

  /**
   * Generate improvement recommendations
   */
  private generateRecommendations(summary: FeedbackSummary): string[] {
    const recommendations: string[] = [];

    // Check for frequent false positives
    const falsePositives = summary.byType['false_positive'] || 0;
    if (falsePositives >= 3) {
      recommendations.push('Review validator precision - multiple false positives reported');
    }

    // Check for frequent missed issues
    const missedIssues = summary.byType['missed_issue'] || 0;
    if (missedIssues >= 3) {
      recommendations.push('Review validator recall - multiple missed issues reported');
    }

    // Check for score calibration issues
    const scoreIssues = (summary.byType['score_too_high'] || 0) + (summary.byType['score_too_low'] || 0);
    if (scoreIssues >= 3) {
      recommendations.push('Review score calibration formula');
    }

    // Check for generic output issues
    const genericIssues = summary.byType['too_generic'] || 0;
    if (genericIssues >= 2) {
      recommendations.push('Improve finding specificity and actionability');
    }

    // Validator-specific recommendations
    for (const [validator, count] of Object.entries(summary.byValidator)) {
      if (count >= 3) {
        recommendations.push(`Review ${validator} - ${count} feedback events reported`);
      }
    }

    return recommendations;
  }

  /**
   * Get feedback storage configuration
   */
  getConfig(): FeedbackStorageConfig {
    return this.config;
  }
}
