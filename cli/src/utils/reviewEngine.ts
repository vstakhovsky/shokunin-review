import { Artifact, ReviewOutput, ReviewOptions, ArtifactType, Verdict, Score, Finding, ScoreBand, VerdictEmoji } from '../types';
import { ValidatorRegistry } from './validatorRegistry';

export class ReviewEngine {
  private validatorRegistry: ValidatorRegistry;

  constructor() {
    this.validatorRegistry = new ValidatorRegistry();
  }

  /**
   * Run review on artifact
   */
  async review(artifact: Artifact, options: ReviewOptions): Promise<ReviewOutput> {
    const startTime = Date.now();

    // Get applicable validators for artifact type
    const validators = this.validatorRegistry.getValidators(artifact.type);

    // Run validators
    const findings: Finding[] = [];
    for (const validator of validators) {
      if (options.focus_validator && validator.name !== options.focus_validator) {
        continue;
      }

      try {
        const validatorFindings = await validator.validate(artifact.content, artifact.type);
        findings.push(...validatorFindings);
      } catch (error) {
        console.error(`Error in validator ${validator.name}:`, error);
      }
    }

    // Calculate score
    const score = this.calculateScore(findings, artifact.type);

    // Determine verdict
    const verdict = this.determineVerdict(score.total, findings);

    // Generate recommended action
    const recommendedAction = this.generateRecommendedAction(verdict.band);

    // Generate suggested command
    const suggestedCommand = this.generateSuggestedCommand(verdict.band, artifact.filePath);

    const duration = Date.now() - startTime;

    return {
      verdict,
      score,
      findings,
      recommended_action: recommendedAction,
      suggested_command: suggestedCommand,
      metadata: {
        artifact_type: artifact.type,
        classification_confidence: 'high',
        review_mode: options.mode,
        duration_seconds: duration / 1000,
        timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Calculate score from findings
   */
  private calculateScore(findings: Finding[], artifactType: ArtifactType): Score {
    // Base score
    let totalScore = 100;

    // Apply penalties for findings
    const severityWeights = {
      blocker: 25,
      high: 15,
      medium: 8,
      low: 3
    };

    const scoreCaps: any[] = [];
    const dimensionBreakdown: any = {};

    // Group findings by validator
    const findingsByValidator = findings.reduce((acc, finding) => {
      if (!acc[finding.validator]) {
        acc[finding.validator] = [];
      }
      acc[finding.validator].push(finding);
      return acc;
    }, {} as Record<string, Finding[]>);

    // Calculate dimension scores
    for (const [validator, validatorFindings] of Object.entries(findingsByValidator)) {
      let dimensionScore = 100;
      for (const finding of validatorFindings) {
        dimensionScore -= severityWeights[finding.severity];
      }
      dimensionBreakdown[validator] = Math.max(0, dimensionScore);

      // Check for score caps
      if (dimensionScore < 50 && validatorFindings.some(f => f.severity === 'blocker')) {
        const capName = this.getScoreCapName(finding.tag);
        const maxScore = this.getScoreCapMax(finding.tag);
        scoreCaps.push({ cap: capName, max_score: maxScore });
      }
    }

    // Calculate total score
    totalScore = Object.values(dimensionBreakdown).reduce((sum, score) => sum + score, 0) /
                 Object.keys(dimensionBreakdown).length || 0;

    // Apply score caps
    for (const cap of scoreCaps) {
      if (totalScore > cap.max_score) {
        totalScore = cap.max_score;
      }
    }

    // Determine confidence
    let confidence: 'high' | 'medium' | 'low' = 'high';
    if (findings.length < 2) {
      confidence = 'low';
    } else if (findings.length < 5) {
      confidence = 'medium';
    }

    return {
      total: Math.round(totalScore),
      confidence,
      dimension_breakdown: dimensionBreakdown,
      score_caps_applied: scoreCaps.length > 0 ? scoreCaps : undefined
    };
  }

  /**
   * Determine verdict from score
   */
  private determineVerdict(score: number, findings: Finding[]): Verdict {
    let band: ScoreBand;
    let emoji: VerdictEmoji;
    let text: string;

    if (score >= 90) {
      band = ScoreBand.REVIEW_READY;
      emoji = VerdictEmoji.REVIEW_READY;
      text = 'Review-ready';
    } else if (score >= 75) {
      band = ScoreBand.READY_WITH_MINOR_FIXES;
      emoji = VerdictEmoji.READY_WITH_MINOR_FIXES;
      text = 'Ready with minor fixes';
    } else if (score >= 60) {
      band = ScoreBand.NEEDS_MAJOR_FIXES;
      emoji = VerdictEmoji.NEEDS_MAJOR_FIXES;
      text = 'Needs major fixes';
    } else if (score >= 40) {
      band = ScoreBand.NEEDS_REVISION;
      emoji = VerdictEmoji.NEEDS_REVISION;
      text = 'Needs revision';
    } else {
      band = ScoreBand.NOT_REVIEW_READY;
      emoji = VerdictEmoji.NOT_REVIEW_READY;
      text = 'Not review-ready';
    }

    return { emoji, text, band };
  }

  /**
   * Generate recommended action
   */
  private generateRecommendedAction(band: ScoreBand): string {
    switch (band) {
      case ScoreBand.REVIEW_READY:
        return 'Document is ready for review and approval.';
      case ScoreBand.READY_WITH_MINOR_FIXES:
        return 'Address minor issues before full review.';
      case ScoreBand.NEEDS_MAJOR_FIXES:
        return 'Major improvements needed before review.';
      case ScoreBand.NEEDS_REVISION:
        return 'Significant revision required.';
      case ScoreBand.NOT_REVIEW_READY:
        return 'Document needs fundamental rework.';
      case ScoreBand.UNSUPPORTED:
        return 'Unsupported file format.';
      default:
        return 'Review required.';
    }
  }

  /**
   * Generate suggested command
   */
  private generateSuggestedCommand(band: ScoreBand, filePath: string): string {
    if (band === ScoreBand.NOT_REVIEW_READY || band === ScoreBand.NEEDS_REVISION) {
      return `shokunin improve ${filePath} --focus evidence`;
    }
    return '';
  }

  /**
   * Get score cap name from tag
   */
  private getScoreCapName(tag: string): string {
    const capMap: Record<string, string> = {
      'evidence-gap': 'no_problem_evidence',
      'missing-decision': 'no_mvp_scope',
      'metric-fog': 'no_primary_metric',
      'ai-guardrail-gap': 'no_ai_guardrails_for_ai_feature'
    };
    return capMap[tag] || tag;
  }

  /**
   * Get score cap maximum from tag
   */
  private getScoreCapMax(tag: string): number {
    const capMaxMap: Record<string, number> = {
      'no_problem_evidence': 60,
      'no_mvp_scope': 55,
      'no_primary_metric': 55,
      'no_ai_guardrails_for_ai_feature': 70
    };
    return capMaxMap[this.getScoreCapName(tag)] || 70;
  }
}