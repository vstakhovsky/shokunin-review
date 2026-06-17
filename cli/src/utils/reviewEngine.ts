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

    // Step 3: Calculate penalties by severity (stored as positive numbers for display)
    const penalties = this.calculatePenalties(findings);
    const blockerCount = penalties.blocker;
    const majorCount = penalties.major;
    const minorCount = penalties.minor;

    // Step 3.5: Anti-bloat penalty (stored as positive number for display)
    const bloatPenaltyAmount = Math.abs(this.calculateBloatPenalty(findings, artifact));

    // Step 4: Calculate penalty totals (as negative values)
    const blockerPenaltyTotal = -(blockerCount * 12);  // -12 each
    const majorPenaltyTotal = -(majorCount * 5);        // -5 each
    const minorPenaltyTotal = -(minorCount * 2);        // -2 each
    const bloatPenaltyTotal = -bloatPenaltyAmount;     // Already negative

    // Step 5: Subtotal before caps (penalties reduce the score)
    const subtotalBeforeCaps = weightedBaseScore + blockerPenaltyTotal + majorPenaltyTotal + minorPenaltyTotal + bloatPenaltyTotal;

    // Step 6: Clamp subtotal to 0-100 before applying caps
    const clampedSubtotal = Math.max(0, Math.min(100, subtotalBeforeCaps));

    // Step 7: Apply score caps (caps can only lower the score, never increase it)
    const scoreCaps = this.determineScoreCaps(findings);
    const strictestCap = this.getStrictestCap(scoreCaps);
    const cappedScore = Math.min(clampedSubtotal, strictestCap);

    // Step 8: Confidence adjustment (applied after caps)
    const confidence = this.calculateConfidence(findings, artifact);
    const confidenceAdjustment = this.getConfidenceAdjustment(confidence);
    const adjustedScore = cappedScore + confidenceAdjustment;

    // Step 9: Final score (ensure 0-100 range)
    const finalScore = Math.max(0, Math.min(100, Math.round(adjustedScore)));

    const trace: ScoringTrace = {
      weighted_base_score: Math.round(weightedBaseScore),
      blocker_penalties: blockerPenaltyTotal,  // Now negative
      major_penalties: majorPenaltyTotal,      // Now negative
      minor_penalties: minorPenaltyTotal,      // Now negative
      bloat_penalty: bloatPenaltyTotal,        // Already negative
      subtotal_before_caps: Math.round(subtotalBeforeCaps),
      score_caps: scoreCaps,
      confidence_adjustment: confidenceAdjustment,
      final_score: finalScore,
      dimension_scores: dimensionScores,
      penalty_breakdown: [
        { severity: 'blocker', count: blockerCount, total: blockerPenaltyTotal },
        { severity: 'major', count: majorCount, total: majorPenaltyTotal },
        { severity: 'minor', count: minorCount, total: minorPenaltyTotal }
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
    const contentLower = artifact.content.toLowerCase();

    return dimensions.map(dim => {
      const dimensionFindings = findings.filter(f => f.category === dim.name || f.validator === dim.name);

      // Start with a lower base score - content must earn points
      let score = 50;

      // Apply penalties for findings in this dimension
      for (const finding of dimensionFindings) {
        switch (finding.severity) {
          case 'blocker':
            score -= 20;
            break;
          case 'high':
            score -= 10;
            break;
          case 'medium':
            score -= 5;
            break;
          case 'low':
            score -= 2;
            break;
        }
      }

      // Add content quality bonuses based on dimension
      score += this.evaluateDimensionQuality(dim.name, contentLower, artifact);

      return {
        name: dim.name,
        weight: dim.weight,
        score: Math.max(0, Math.min(100, score)),
        reason: dimensionFindings.length > 0 ? `${dimensionFindings.length} findings` : undefined
      };
    });
  }

  /**
   * Evaluate content quality for a specific dimension
   */
  private evaluateDimensionQuality(dimensionName: string, content: string, _artifact: Artifact): number {
    let qualityBonus = 0;

    switch (dimensionName.toLowerCase()) {
      case 'problem clarity':
        // Bonus for quantified problem
        if (/\d+.*users|customers|people|\d+%\s+of|\$\d+/.test(content)) {
          qualityBonus += 15;
        }
        // Bonus for specific problem statement
        if (/struggle|difficulty|challenge|pain|issue|problem/.test(content)) {
          qualityBonus += 10;
        }
        // Penalty for vague problem
        if (/users need|users want|improve|better|enhance/.test(content) &&
            !(/\d+/.test(content))) {
          qualityBonus -= 10;
        }
        break;

      case 'evidence':
        // Bonus for data/evidence mentions
        if (/data shows|according to|research|study|analysis|evidence|baseline/.test(content)) {
          qualityBonus += 20;
        }
        // Bonus for specific numbers
        if (/\d+%|\d+\s*(users|customers|people|days|weeks)/.test(content)) {
          qualityBonus += 10;
        }
        break;

      case 'target segment':
        // Bonus for specific user segment
        if (/target users?|primary segment|customer segment|specific users/.test(content)) {
          qualityBonus += 15;
        }
        // Bonus for demographics
        if (/aged|income|location|region|behavior|pattern/.test(content)) {
          qualityBonus += 10;
        }
        break;

      case 'mvp scope':
        // Bonus for clear MVP definition
        if (/mvp|phase 1|v1|version 1|initial scope/.test(content)) {
          qualityBonus += 15;
        }
        // Bonus for exclusions
        if (/excludes?|out of scope|not in scope|will not|deferred/.test(content)) {
          qualityBonus += 15;
        }
        // Penalty for vague scope
        if (/and more|etc|additional features|future enhancements/.test(content)) {
          qualityBonus -= 10;
        }
        break;

      case 'metrics':
        // Bonus for specific metrics
        if (/\d+%\s*→|\d+%\s+to|conversion|retention|engagement|churn/.test(content)) {
          qualityBonus += 20;
        }
        // Bonus for target/baseline
        if (/baseline|target|goal|objective|kpi/.test(content)) {
          qualityBonus += 10;
        }
        // Penalty for vague metrics
        if (/increase|improve|grow|better|enhance|boost/.test(content) &&
            !(/\d+/.test(content))) {
          qualityBonus -= 15;
        }
        break;

      case 'requirements':
        // Bonus for testable requirements
        if (/must|shall|requirement|spec|criteria|acceptance/.test(content)) {
          qualityBonus += 10;
        }
        // Bonus for specificity
        if (/when|if|then|condition|trigger/.test(content)) {
          qualityBonus += 10;
        }
        break;

      case 'technical feasibility':
        // Bonus for technical approach
        if (/technical|architecture|implementation|api|database|integration/.test(content)) {
          qualityBonus += 15;
        }
        // Bonus for constraints
        if (/limit|constraint|capacity|performance|scalability/.test(content)) {
          qualityBonus += 10;
        }
        // Penalty for hand-waving
        if (/tbd|to be determined|figure out|will consider|later/.test(content)) {
          qualityBonus -= 10;
        }
        break;

      case 'risks & guardrails':
        // Bonus for risk consideration
        if (/risk|mitigation|fallback|contingency|plan b/.test(content)) {
          qualityBonus += 15;
        }
        // Bonus for guardrails
        if (/guardrail|safety|limit|boundary|threshold|monitor/.test(content)) {
          qualityBonus += 15;
        }
        break;

      case 'decision readiness':
        // Bonus for decision ask
        if (/decision|approval|go.?no.?go|proceed|sign.?off|ask/.test(content)) {
          qualityBonus += 20;
        }
        // Bonus for timeline
        if (/timeline|by|deadline|date|week|month/.test(content)) {
          qualityBonus += 10;
        }
        // Bonus for decision makers
        if (/stakeholder|approver|reviewer|sponsor|owner/.test(content)) {
          qualityBonus += 5;
        }
        break;

      default:
        // Generic quality bonus for other dimensions
        if (content.length > 100) {
          qualityBonus += 5;
        }
        break;
    }

    return qualityBonus;
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