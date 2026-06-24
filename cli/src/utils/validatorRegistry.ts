import { ArtifactType, Finding } from '../types';

export interface Validator {
  name: string;
  applicableTypes: ArtifactType[];
  validate(content: string, artifactType: ArtifactType): Promise<Finding[]> | Finding[];
}

export class ValidatorRegistry {
  private validators: Validator[] = [];

  constructor() {
    this.registerValidators();
  }

  /**
   * Get validators applicable to artifact type
   */
  getValidators(artifactType: ArtifactType): Validator[] {
    return this.validators.filter(v =>
      v.applicableTypes.includes(artifactType) || v.applicableTypes.includes(ArtifactType.UNKNOWN)
    );
  }

  /**
   * Register all validators
   */
  private registerValidators(): void {
    // Register MVP 1 validators
    this.validators = [
      new EvidenceReviewer(),
      new MetricReviewer(),
      new DecisionReviewer(),
      new OverclaimReviewer(),
      new AISafetyReviewer(),
      new SimplicityReviewer(),
      new CostROIReviewer(),
      new PrivacyReviewer(),
      new MVPReviewer(),
      new ExperimentReviewer(),
      new BloatReviewer()
    ];
  }
}

/**
 * Example validator implementations (to be completed in MVP 1)
 */

export class EvidenceReviewer implements Validator {
  name = 'evidence-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.PRODUCT_STRATEGY];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];
    const contentLower = content.toLowerCase();

    // Check for quantified problem
    if (!contentLower.includes('users') && !contentLower.includes('customers')) {
      findings.push({
        id: 'evidence-1',
        validator: this.name,
        tag: 'evidence-gap',
        severity: 'blocker',
        confidence: 'high',
        category: 'Evidence',
        issue: 'Problem statement lacks quantified evidence',
        evidence_from_artifact: 'No affected users specified',
        why_it_matters: 'Without quantified evidence, problem impact is unclear',
        recommended_fix: 'Add affected users with quantified impact',
        example_fix: '15,000 urban users spend 45min/day searching for healthy options',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class MetricReviewer implements Validator {
  name = 'metric-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.EXPERIMENT_PLAN];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];
    const contentLower = content.toLowerCase();

    // Check for specific metrics
    const vagueMetrics = ['increase', 'improve', 'grow', 'better'];
    const hasVagueMetrics = vagueMetrics.some(vague => contentLower.includes(vague));
    const hasSpecificMetrics = /\d+%|\d+\s*(percent|points|days|users)/i.test(content);

    if (hasVagueMetrics && !hasSpecificMetrics) {
      findings.push({
        id: 'metric-1',
        validator: this.name,
        tag: 'metric-fog',
        severity: 'high',
        confidence: 'medium',
        category: 'Metrics',
        issue: 'Success metrics are vague and not measurable',
        evidence_from_artifact: 'Contains generic improvement language without specific targets',
        why_it_matters: 'Non-measurable metrics cannot validate success',
        recommended_fix: 'Define specific, measurable success criteria',
        example_fix: 'Healthy selection rate: 30% → 50% (20 percentage point increase)',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class DecisionReviewer implements Validator {
  name = 'decision-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.PRODUCT_STRATEGY];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];
    const contentLower = content.toLowerCase();

    // Check for decision ask
    if (!contentLower.includes('decision') && !contentLower.includes('approval')) {
      findings.push({
        id: 'decision-1',
        validator: this.name,
        tag: 'missing-decision',
        severity: 'high',
        confidence: 'high',
        category: 'Decision',
        issue: 'No clear decision ask or approval request',
        evidence_from_artifact: 'Document lacks explicit decision request',
        why_it_matters: 'Without clear ask, reviewers cannot take action',
        recommended_fix: 'Add explicit decision ask with timeline and decision makers',
        example_fix: 'Decision needed by EOD Friday from CEO and Product VP',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class OverclaimReviewer implements Validator {
  name = 'overclaim-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.EXPERIMENT_PLAN];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for AI/ML claims without baseline or evidence - use word boundaries
    const hasAIClaims = /\bai\b|machine learning|\bml\b|artificial intelligence|\balgorithm\b|\bmodel\b/i.test(content);
    const hasBaseline = /\d+.*%|\d+.*users|\d+.*days|baseline|current/i.test(content);
    const hasEvidence = /evidence|data shows|according to|research|study/i.test(content);

    if (hasAIClaims && !hasBaseline && !hasEvidence) {
      findings.push({
        id: 'overclaim-1',
        validator: this.name,
        tag: 'overclaim',
        severity: 'blocker',
        confidence: 'high',
        category: 'Evidence',
        issue: 'AI/ML claims without baseline evidence or quantified impact',
        evidence_from_artifact: 'Contains AI/ML claims but lacks baseline metrics or supporting evidence',
        why_it_matters: 'AI features require baseline metrics and evidence to validate claims',
        recommended_fix: 'Add baseline metrics and evidence for AI/ML claims',
        example_fix: 'Currently 15% conversion rate, targeting 25% with AI personalization',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class AISafetyReviewer implements Validator {
  name = 'ai-safety-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.RFC];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for AI features - use word boundaries to avoid matching substrings
    const hasAIFeature = /\bai\b|machine learning|ml\b|agent\b|recommendation engine|personalization|chatgpt|gpt|llm/i.test(content);

    // Check for guardrails
    const hasGuardrails = /guardrail|safety|security|limit|boundary|constraint|fallback|rollback|monitor|threshold/i.test(content);

    // Check for hallucination prevention
    const hasHallucinationChecks = /hallucination|invent|factuality|accuracy|confidence|verif/i.test(content);

    // Check for system boundaries
    const hasBoundaries = /system boundary|scope|within|only|restrict|filter|available inventory|real.*time/i.test(content);

    if (hasAIFeature && !hasGuardrails) {
      findings.push({
        id: 'ai-guardrail-1',
        validator: this.name,
        tag: 'ai-guardrail-gap',
        severity: 'blocker',
        confidence: 'high',
        category: 'AI Safety',
        issue: 'AI feature without guardrails, safety boundaries, or failure modes',
        evidence_from_artifact: 'Contains AI/ML features but lacks safety guardrails or failure handling',
        why_it_matters: 'AI features require safety boundaries, monitoring, and failure handling',
        recommended_fix: 'Add AI guardrails, safety boundaries, monitoring triggers, and fallback behavior',
        example_fix: 'Guardrails: max 3 recommendations per query, latency < 200ms, fallback to simple filtering',
        needs_human_judgment: false
      });
    }

    if (hasAIFeature && !hasHallucinationChecks) {
      findings.push({
        id: 'ai-hallucination-1',
        validator: this.name,
        tag: 'ai-guardrail-gap',
        severity: 'blocker',
        confidence: 'high',
        category: 'AI Safety',
        issue: 'AI feature may hallucinate prices, dishes, discounts, or delivery times',
        evidence_from_artifact: 'AI/ML features can generate false information without safeguards',
        why_it_matters: 'AI must not invent unavailable items, prices, or delivery estimates',
        recommended_fix: 'Add verification against database, confidence thresholds, and explicit availability checks',
        example_fix: 'All AI-generated claims must be verified against inventory database. Confidence < 80% triggers fallback.',
        needs_human_judgment: false
      });
    }

    if (hasAIFeature && !hasBoundaries) {
      findings.push({
        id: 'ai-boundary-1',
        validator: this.name,
        tag: 'ai-guardrail-gap',
        severity: 'blocker',
        confidence: 'high',
        category: 'AI Safety',
        issue: 'AI lacks system boundaries or inventory constraints',
        evidence_from_artifact: 'AI may generate recommendations outside available inventory or service area',
        why_it_matters: 'AI must stay within system boundaries (available inventory, geographic scope, service hours)',
        recommended_fix: 'Define clear system boundaries: inventory check, geographic limits, service time constraints',
        example_fix: 'AI only recommends items currently in stock. Filter by user location and restaurant operating hours.',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class SimplicityReviewer implements Validator {
  name = 'simplicity-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.PRODUCT_STRATEGY];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for consideration of simpler alternatives - use word boundaries
    const hasAIFeature = /\bai\b|machine learning|agent\b|personalization|recommendation engine|chatbot|llm|gpt/i.test(content);
    const hasAlternativeAnalysis = /alternative|simpler|instead of|could also|consider using|why not|non-ai|baseline|existing/i.test(content);

    // Check for comparison against search/filters/carousels
    const hasSimpleSolutionComparison = /search|filter|carousel|questionnaire|dropdown|sorting|ranking|recommendation engine/i.test(content);

    if (hasAIFeature && !hasAlternativeAnalysis) {
      findings.push({
        id: 'simplicity-1',
        validator: this.name,
        tag: 'simpler-alternative-gap',
        severity: 'blocker',
        confidence: 'high',
        category: 'Simplicity',
        issue: 'No simpler alternatives considered for proposed AI solution',
        evidence_from_artifact: 'AI solution proposed without comparison to simpler alternatives',
        why_it_matters: 'AI features should be justified against simpler solutions like search, filters, or carousels',
        recommended_fix: 'Add analysis of simpler alternatives and justify why AI is necessary',
        example_fix: 'Consider: improved search filters, recommendation carousel, guided questionnaire before AI agent',
        needs_human_judgment: false
      });
    }

    if (hasAIFeature && !hasSimpleSolutionComparison) {
      findings.push({
        id: 'simplicity-2',
        validator: this.name,
        tag: 'simpler-alternative-gap',
        severity: 'high',
        confidence: 'medium',
        category: 'Simplicity',
        issue: 'AI solution not compared against simple non-AI alternatives',
        evidence_from_artifact: 'Document does not explain why AI is needed instead of standard solutions',
        why_it_matters: 'Simple solutions are often cheaper, faster, and more reliable than AI',
        recommended_fix: 'Compare proposed AI solution against: improved search, filters, sorting, ranking, or recommendation carousels',
        example_fix: 'Why AI Agent instead of: (1) Improved search filters, (2) Recommendation carousel, (3) Guided questionnaire',
        needs_human_judgment: false
      });
    }

    if (hasAIFeature && !hasAlternativeAnalysis) {
      findings.push({
        id: 'simplicity-1',
        validator: this.name,
        tag: 'simpler-alternative-gap',
        severity: 'blocker',
        confidence: 'high',
        category: 'Simplicity',
        issue: 'No simpler alternatives considered for proposed AI solution',
        evidence_from_artifact: 'AI solution proposed without comparison to simpler alternatives',
        why_it_matters: 'AI features should be justified against simpler solutions like search, filters, or carousels',
        recommended_fix: 'Add analysis of simpler alternatives and justify why AI is necessary',
        example_fix: 'Consider: improved search filters, recommendation carousel, guided questionnaire before AI agent',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class CostROIReviewer implements Validator {
  name = 'cost-roi-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.PRODUCT_STRATEGY];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for business impact without cost/ROI analysis
    const hasBusinessClaim = /grow(th|increase|improve|boost|lift|revenue|sales|conversion)/i.test(content);
    const hasCostModel = /cost|roi|margin|uplift|investment|cAC|ltv|payback|budget/i.test(content);
    const hasBaseline = /current|baseline|existing|today|currently|today we/i.test(content);
    const hasAIFeature = /\bai\b|machine learning|llm|gpt|\bagent\b/i.test(content);

    // Check for AI cost model specifically
    if (hasAIFeature && !/cost per|per.*query|token.*cost|api.*cost|model.*cost/i.test(content)) {
      findings.push({
        id: 'cost-roi-2',
        validator: this.name,
        tag: 'cost-roi-gap',
        severity: 'high',
        confidence: 'high',
        category: 'Cost & ROI',
        issue: 'AI feature without cost model or cost per interaction',
        evidence_from_artifact: 'AI features mentioned but no cost analysis provided',
        why_it_matters: 'AI solutions require cost justification: cost per query, cost per conversion, required uplift',
        recommended_fix: 'Add AI cost model: cost per interaction, cost per converted order, required conversion uplift',
        example_fix: 'AI cost: $0.02 per query. Current conversion: 2%. Need 3.5% conversion to justify cost (75% uplift).',
        needs_human_judgment: false
      });
    }

    if (hasBusinessClaim && !hasCostModel && !hasBaseline) {
      findings.push({
        id: 'cost-roi-1',
        validator: this.name,
        tag: 'cost-roi-gap',
        severity: 'high',
        confidence: 'medium',
        category: 'Cost & ROI',
        issue: 'Business impact claimed without cost model or baseline',
        evidence_from_artifact: 'Claims growth or improvement but lacks cost analysis',
        why_it_matters: 'Business cases require cost justification and ROI analysis',
        recommended_fix: 'Add baseline metrics, cost estimates, and ROI calculation',
        example_fix: 'Current: 15K users × $48/year/user, Target: 25% increase, Investment: $150K',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class PrivacyReviewer implements Validator {
  name = 'privacy-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.RFC];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for personalization without privacy rules
    const hasPersonalization = /personalization|user preferences|learn.*user|preference|profile|personalized/i.test(content);
    const hasPrivacyRules = /consent|privacy|data.*protection|gdpr|retention|user.*control|data.*minim|opt.*out|data.*source/i.test(content);

    if (hasPersonalization && !hasPrivacyRules) {
      findings.push({
        id: 'privacy-1',
        validator: this.name,
        tag: 'privacy-gap',
        severity: 'high',
        confidence: 'medium',
        category: 'Privacy',
        issue: 'Personalization features without data sources or privacy constraints',
        evidence_from_artifact: 'Mentions user preferences but lacks data governance',
        why_it_matters: 'Personalization requires clear data sources, consent, and privacy constraints',
        recommended_fix: 'Define data sources, consent mechanism, retention policy, and user controls',
        example_fix: 'Data: order history, preferences. Privacy: user-controlled, 90-day retention, exportable',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class MVPReviewer implements Validator {
  name = 'mvp-reviewer';
  applicableTypes = [ArtifactType.PRD];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check if this is a simple internal feature that doesn't need MVP scope
    // Simple internal features: dashboard updates, internal tools, metric additions
    const isSimpleInternalFeature = /dashboard|internal.*tool|widget.*update|add.*metric.*dashboard|update.*metric.*dashboard/i.test(content);

    // Check for MVP scope definition
    const hasMVP = /mvp|minimum viable product|scope|in scope|out of scope|v1|version 1|phase 1/i.test(content);
    const hasScopeBoundary = /will not|out of scope|excluded|later phase|future|not.*included/i.test(content);

    // Check for clear phase structure (Phase 1, Phase 2, Phase 3, etc.)
    // Match across newlines by replacing newlines temporarily
    const contentSingleLine = content.replace(/\n/g, ' ');
    const hasPhaseStructure = /phase 1.*phase 2.*phase 3|phase 1:.*phase 2:.*phase 3:/i.test(contentSingleLine);

    // Skip MVP check for simple internal features
    if (isSimpleInternalFeature) {
      return findings;
    }

    if (!hasMVP) {
      findings.push({
        id: 'mvp-1',
        validator: this.name,
        tag: 'mvp-fog',
        severity: 'blocker',
        confidence: 'high',
        category: 'MVP Scope',
        issue: 'No MVP scope or phase 1 boundaries defined',
        evidence_from_artifact: 'Document lacks clear MVP definition or scope boundaries',
        why_it_matters: 'Without MVP scope, projects expand indefinitely and delay decision-making',
        recommended_fix: 'Define MVP/Phase 1 scope with clear boundaries and explicit exclusions',
        example_fix: 'MVP: AI food recommendations for lunch in SF only. Excludes: dinner, other cities, reordering.',
        needs_human_judgment: false
      });
    }

    // Only flag missing scope boundaries if there's no clear phase structure
    if (hasMVP && !hasScopeBoundary && !hasPhaseStructure) {
      findings.push({
        id: 'mvp-2',
        validator: this.name,
        tag: 'mvp-fog',
        severity: 'high',
        confidence: 'medium',
        category: 'MVP Scope',
        issue: 'MVP mentioned but scope boundaries or exclusions not defined',
        evidence_from_artifact: 'MVP is mentioned but what is excluded or later phase is unclear',
        why_it_matters: 'MVPs require clear exclusions to prevent scope creep',
        recommended_fix: 'List explicit MVP exclusions: features, user segments, geographic areas, or use cases',
        example_fix: 'Out of scope for MVP: dinner recommendations, reordering, payment, order history',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class ExperimentReviewer implements Validator {
  name = 'experiment-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.EXPERIMENT_PLAN];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for experiment or decision criteria
    const hasExperiment = /experiment|a.*b.*test|hypothesis|variant|control|statistical|significance/i.test(content);
    const hasDecisionCriteria = /decision criteria|go.*no.*go|success metric|pass.*fail|threshold|criteria/i.test(content);
    const hasTimeline = /timeline|weeks|months|duration|when|by.*date|launch/i.test(content);

    if (hasExperiment && !hasDecisionCriteria) {
      findings.push({
        id: 'experiment-1',
        validator: this.name,
        tag: 'experiment-gap',
        severity: 'high',
        confidence: 'high',
        category: 'Experiment',
        issue: 'Experiment mentioned but decision criteria or success threshold not defined',
        evidence_from_artifact: 'Experiment described but no go/no-go criteria specified',
        why_it_matters: 'Experiments require pre-defined success criteria to enable objective decisions',
        recommended_fix: 'Define experiment decision criteria: minimum effect size, confidence level, success threshold',
        example_fix: 'Success criterion: 15% lift in healthy selection rate with 95% confidence. Minimum sample: 10K users.',
        needs_human_judgment: false
      });
    }

    if (hasExperiment && !hasTimeline) {
      findings.push({
        id: 'experiment-2',
        validator: this.name,
        tag: 'experiment-gap',
        severity: 'medium',
        confidence: 'medium',
        category: 'Experiment',
        issue: 'Experiment timeline or duration not specified',
        evidence_from_artifact: 'No experiment duration or decision timeline provided',
        why_it_matters: 'Experiments require clear timelines to enable timely decisions',
        recommended_fix: 'Define experiment duration and when decision will be made',
        example_fix: 'Experiment duration: 4 weeks. Decision by: 2 weeks after experiment completion.',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}

export class BloatReviewer implements Validator {
  name = 'bloat-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.RFC];

  async validate(content: string, _artifactType: ArtifactType): Promise<Finding[]> {
    const findings: Finding[] = [];

    // Check for document bloat indicators
    const lines = content.split('\n').length;
    const sections = (content.match(/#{1,2}\s+/g) || []).length;
    const bulletPoints = (content.match(/[-*]\s+/g) || []).length;

    // Check for repetitive content
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const uniqueSentences = new Set(sentences.map(s => s.trim().toLowerCase()));
    const repetitionRatio = sentences.length > 0 ? uniqueSentences.size / sentences.length : 1;

    // Bloat detection
    if (lines > 400 && sections > 20 && repetitionRatio < 0.6) {
      findings.push({
        id: 'bloat-1',
        validator: this.name,
        tag: 'document-bloat',
        severity: 'medium',
        confidence: 'medium',
        category: 'Clarity',
        issue: 'Document is long and appears repetitive without adding decision value',
        evidence_from_artifact: `Document has ${lines} lines, ${sections} sections, and repetitive content`,
        why_it_matters: 'Long repetitive documents delay decisions and reduce clarity',
        recommended_fix: 'Consolidate sections, remove repetition, focus on decision-critical information',
        example_fix: 'Consider: executive summary memo instead of full document. Group related sections. Delete redundant claims.',
        needs_human_judgment: false
      });
    }

    if (bulletPoints > 80 && sections > 15) {
      findings.push({
        id: 'bloat-2',
        validator: this.name,
        tag: 'document-bloat',
        severity: 'medium',
        confidence: 'low',
        category: 'Clarity',
        issue: 'Document has many bullet points and sections - consider consolidation',
        evidence_from_artifact: `Document has ${bulletPoints} bullet points across ${sections} sections`,
        why_it_matters: 'Excessive structure can indicate padding or lack of focus',
        recommended_fix: 'Group related bullet points, consolidate sections, prioritize decision-critical items',
        example_fix: 'Group 15 feature bullets into 3-5 key themes. Consolidate 20 sections into 5-6 major sections.',
        needs_human_judgment: false
      });
    }

    return findings;
  }
}