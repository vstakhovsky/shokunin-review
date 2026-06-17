import { Artifact, ReviewOutput, ReviewOptions, ArtifactType, Verdict, Score, Finding, ScoreBand, VerdictEmoji } from '../types';
import { ValidatorRegistry } from './validatorRegistry';

interface DimensionScore {
  name: string;
  weight: number;
  score: number;
  reason?: string;
}

interface ScoringTrace {
  weighted_base_score: number;
  blocker_penalties: number;
  major_penalties: number;
  minor_penalties: number;
  bloat_penalty: number;
  subtotal_before_caps: number;
  score_caps: Array<{cap: string; max_score: number}>;
  confidence_adjustment: number;
  final_score: number;
  dimension_scores: DimensionScore[];
  penalty_breakdown: Array<{severity: string; count: number; total: number}>;
}

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

    // Calculate score with trace
    const { score, trace } = this.calculateScoreWithTrace(findings, artifact);

    // Determine verdict
    const verdict = this.determineVerdict(score.total);

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
      },
      trace: trace
    };
  }

  /**
   * Calculate score with full trace
   */
  private calculateScoreWithTrace(findings: Finding[], artifact: Artifact): { score: Score; trace: ScoringTrace } {
    // Step 1: Calculate dimension scores
    const dimensionScores = this.calculateDimensionScores(findings, artifact);

    // Step 2: Calculate weighted base score
    const weightedBaseScore = this.calculateWeightedBaseScore(dimensionScores);

    // Step 3: Calculate penalties by severity
    const penalties = this.calculatePenalties(findings);
    const blockerPenalties = penalties.blocker * 12;  // -12 each
    const majorPenalties = penalties.major * 5;     // -5 each
    const minorPenalties = penalties.minor * 2;     // -2 each

    // Step 3.5: Anti-bloat penalty
    const bloatPenalty = this.calculateBloatPenalty(findings, artifact);

    // Step 4: Subtotal before caps
    const subtotalBeforeCaps = weightedBaseScore + blockerPenalties + majorPenalties + minorPenalties + bloatPenalty;

    // Step 5: Apply score caps
    const scoreCaps = this.determineScoreCaps(findings);
    let cappedScore = Math.min(subtotalBeforeCaps, this.getStrictestCap(scoreCaps));

    // Step 6: Confidence adjustment
    const confidence = this.calculateConfidence(findings, artifact);
    const confidenceAdjustment = this.getConfidenceAdjustment(confidence);
    const adjustedScore = cappedScore + confidenceAdjustment;

    // Step 7: Final score (ensure 0-100 range)
    const finalScore = Math.max(0, Math.min(100, Math.round(adjustedScore)));

    const trace: ScoringTrace = {
      weighted_base_score: Math.round(weightedBaseScore),
      blocker_penalties: blockerPenalties,
      major_penalties: majorPenalties,
      minor_penalties: minorPenalties,
      bloat_penalty: bloatPenalty,
      subtotal_before_caps: Math.round(subtotalBeforeCaps),
      score_caps: scoreCaps,
      confidence_adjustment: confidenceAdjustment,
      final_score: finalScore,
      dimension_scores: dimensionScores,
      penalty_breakdown: [
        { severity: 'blocker', count: penalties.blocker, total: blockerPenalties },
        { severity: 'major', count: penalties.major, total: majorPenalties },
        { severity: 'minor', count: penalties.minor, total: minorPenalties }
      ]
    };

    return {
      score: {
        total: finalScore,
        confidence: confidence.level,
        dimension_breakdown: this.dimensionScoresToBreakdown(dimensionScores),
        score_caps_applied: scoreCaps.length > 0 ? scoreCaps : undefined
      },
      trace
    };
  }

  /**
   * Calculate dimension scores based on artifact type
   */
  private calculateDimensionScores(findings: Finding[], artifact: Artifact): DimensionScore[] {
    const dimensions = this.getDimensionsForArtifactType(artifact.type);

    return dimensions.map(dim => {
      const dimensionFindings = findings.filter(f => f.category === dim.name || f.validator === dim.name);
      let score = 100;

      // Apply penalties for findings in this dimension
      for (const finding of dimensionFindings) {
        switch (finding.severity) {
          case 'blocker':
            score -= 15;
            break;
          case 'high':
            score -= 7;
            break;
          case 'medium':
            score -= 3;
            break;
          case 'low':
            score -= 1;
            break;
        }
      }

      return {
        name: dim.name,
        weight: dim.weight,
        score: Math.max(0, score),
        reason: dimensionFindings.length > 0 ? `${dimensionFindings.length} findings` : undefined
      };
    });
  }

  /**
   * Get dimensions for artifact type
   */
  private getDimensionsForArtifactType(artifactType: ArtifactType): Array<{name: string; weight: number}> {
    if (artifactType === ArtifactType.PRD) {
      return [
        { name: 'Problem Clarity', weight: 15 },
        { name: 'Evidence', weight: 15 },
        { name: 'Target Segment', weight: 10 },
        { name: 'MVP Scope', weight: 15 },
        { name: 'Metrics', weight: 15 },
        { name: 'Requirements', weight: 10 },
        { name: 'Technical Feasibility', weight: 10 },
        { name: 'Risks & Guardrails', weight: 5 },
        { name: 'Decision Readiness', weight: 5 }
      ];
    }

    // Default dimensions for other types
    return [
      { name: 'Clarity', weight: 20 },
      { name: 'Completeness', weight: 20 },
      { name: 'Evidence Quality', weight: 20 },
      { name: 'Technical Quality', weight: 20 },
      { name: 'Decision Readiness', weight: 20 }
    ];
  }

  /**
   * Calculate weighted base score
   */
  private calculateWeightedBaseScore(dimensionScores: DimensionScore[]): number {
    let totalWeight = 0;
    let weightedSum = 0;

    for (const dim of dimensionScores) {
      totalWeight += dim.weight;
      weightedSum += dim.score * (dim.weight / 100);
    }

    return totalWeight > 0 ? weightedSum : 0;
  }

  /**
   * Calculate penalties by severity
   */
  private calculatePenalties(findings: Finding[]): { blocker: number; major: number; minor: number; nit: number } {
    return {
      blocker: findings.filter(f => f.severity === 'blocker').length,
      major: findings.filter(f => f.severity === 'high').length,
      minor: findings.filter(f => f.severity === 'medium').length,
      nit: findings.filter(f => f.severity === 'low').length
    };
  }

  /**
   * Determine applicable score caps
   */
  private determineScoreCaps(findings: Finding[]): Array<{cap: string; max_score: number}> {
    const caps: Array<{cap: string; max_score: number}> = [];

    // Score caps based on findings - stricter caps for missing critical elements
    const scoreCapRules = [
      { tags: ['metric-fog', 'no-primary-metric'], cap: 'no_primary_metric', max: 55 },
      { tags: ['evidence-gap', 'no-problem-evidence'], cap: 'no_problem_evidence', max: 60 },
      { tags: ['segment-fog', 'no-target-segment'], cap: 'no_clear_target_segment', max: 60 },
      { tags: ['mvp-fog', 'no-mvp-scope'], cap: 'no_mvp_scope', max: 55 },
      { tags: ['ai-guardrail-gap', 'no-ai-guardrails'], cap: 'missing_ai_guardrails_for_ai_feature', max: 70 },
      { tags: ['tech-handwave', 'no-technical-feasibility'], cap: 'missing_technical_feasibility_for_technical_feature', max: 70 },
      { tags: ['experiment-gap', 'no-experiment-rule'], cap: 'missing_experiment_or_decision_rule', max: 70 },
      { tags: ['missing-decision', 'no-decision-ask'], cap: 'missing_decision_ask', max: 65 },
      { tags: ['placeholder', 'tbd', 'to-do', 'critical-placeholders'], cap: 'critical_placeholders_present', max: 68 },
      { tags: ['simpler-alternative-gap', 'no-simpler-alternative'], cap: 'missing_simpler_alternative_analysis', max: 75 },
      { tags: ['cost-roi-gap', 'no-cost-model'], cap: 'missing_cost_roi_analysis', max: 75 },
      { tags: ['privacy-gap', 'no-privacy-rules'], cap: 'missing_privacy_rules_for_personalization', max: 75 },
      { tags: ['overclaim', 'unsupported-claims'], cap: 'unsupported_business_impact_claims', max: 60 }
    ];

    for (const rule of scoreCapRules) {
      if (rule.tags.some(tag => findings.some(f => f.tag === tag))) {
        // Avoid duplicate caps
        if (!caps.some(c => c.cap === rule.cap)) {
          caps.push({ cap: rule.cap, max_score: rule.max });
        }
      }
    }

    return caps;
  }

  /**
   * Get strictest score cap
   */
  private getStrictestCap(caps: Array<{cap: string; max_score: number}>): number {
    if (caps.length === 0) return 100;
    return Math.min(...caps.map(c => c.max_score));
  }

  /**
   * Calculate anti-bloat penalty
   * Detects documents that are long but lack decision value
   */
  private calculateBloatPenalty(findings: Finding[], artifact: Artifact): number {
    // Check for bloat indicators
    const content = artifact.content.toLowerCase();
    const lines = artifact.lines;
    const avgCharsPerLine = content.length / lines;

    // Bloat indicators
    const hasManySections = (content.match(/#{1,2}\s+/g) || []).length > 15;
    const hasRepetitiveContent = this.detectRepetitiveContent(content);
    const hasManyFeatureLists = (content.match(/[-*]\s+/g) || []).length > 50;
    const lacksMvp = findings.some(f => f.tag === 'mvp-fog' || f.tag === 'no-mvp-scope');
    const lacksEvidence = findings.some(f => f.tag === 'evidence-gap' || f.tag === 'no-problem-evidence');

    // Calculate bloat score
    let bloatScore = 0;
    if (hasManySections && lacksMvp) bloatScore += 3;
    if (hasRepetitiveContent) bloatScore += 3;
    if (hasManyFeatureLists && lacksEvidence) bloatScore += 2;
    if (lines > 300 && avgCharsPerLine < 80) bloatScore += 2; // Long document with short lines = padding

    // Max bloat penalty is -10
    return -Math.min(10, bloatScore);
  }

  /**
   * Detect repetitive content in document
   */
  private detectRepetitiveContent(content: string): boolean {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const uniqueSentences = new Set(sentences.map(s => s.trim().toLowerCase()));

    // If less than 70% unique sentences, consider it repetitive
    return sentences.length > 10 && (uniqueSentences.size / sentences.length) < 0.7;
  }

  /**
   * Calculate confidence based on document characteristics
   */
  private calculateConfidence(findings: Finding[], artifact: Artifact): { level: 'low' | 'medium' | 'high'; reasons: string[] } {
    const reasons: string[] = [];

    // Check for vague claims
    const vagueFindings = findings.filter(f =>
      f.tag === 'metric-fog' || f.tag === 'evidence-gap' || f.tag === 'strategy-fog'
    );
    if (vagueFindings.length >= 3) reasons.push('Many vague claims without evidence');

    // Check for placeholders
    const hasPlaceholders = /\b(tbd|to[- ]?do|placeholder|xxx|pending|coming[- ]?soon|not[- ]?specified)/i.test(artifact.content);
    if (hasPlaceholders) reasons.push('Document contains placeholders');

    // Check for unsupported business impact
    const overclaimFindings = findings.filter(f => f.tag === 'overclaim');
    if (overclaimFindings.length > 0) reasons.push('Business impact claims are unsupported');

    // Check for untestable requirements
    const untestableFindings = findings.filter(f =>
      f.tag === 'requirement-fog' && f.issue.toLowerCase().includes('not testable')
    );
    if (untestableFindings.length >= 2) reasons.push('Many requirements are not testable');

    let level: 'low' | 'medium' | 'high' = 'high';
    if (reasons.length >= 3) {
      level = 'low';
    } else if (reasons.length >= 1) {
      level = 'medium';
    }

    return { level, reasons };
  }

  /**
   * Get confidence adjustment
   */
  private getConfidenceAdjustment(confidence: { level: 'low' | 'medium' | 'high' }): number {
    switch (confidence.level) {
      case 'low':
        return -5;
      case 'medium':
        return -2;
      case 'high':
        return 0;
    }
  }

  /**
   * Convert dimension scores to breakdown format
   */
  private dimensionScoresToBreakdown(dimensionScores: DimensionScore[]): Score['dimension_breakdown'] {
    const breakdown: Score['dimension_breakdown'] = {};

    for (const dim of dimensionScores) {
      breakdown[dim.name] = dim.score;
    }

    return breakdown;
  }

  /**
   * Determine verdict from score
   */
  private determineVerdict(score: number): Verdict {
    let band: ScoreBand;
    let emoji: VerdictEmoji;
    let text: string;

    if (score >= 85) {
      band = ScoreBand.REVIEW_READY;
      emoji = VerdictEmoji.REVIEW_READY;
      text = 'Review-ready';
    } else if (score >= 70) {
      band = ScoreBand.READY_WITH_MINOR_FIXES;
      emoji = VerdictEmoji.READY_WITH_MINOR_FIXES;
      text = 'Ready with minor fixes';
    } else if (score >= 55) {
      band = ScoreBand.NEEDS_MAJOR_FIXES;
      emoji = VerdictEmoji.NEEDS_MAJOR_FIXES;
      text = 'Needs major fixes';
    } else if (score >= 35) {
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
}