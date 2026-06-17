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
    // MVP 1 validators - will be implemented
    // For now, return empty array as placeholders
    this.validators = [];
  }
}

/**
 * Example validator implementations (to be completed in MVP 1)
 */

export class EvidenceReviewer implements Validator {
  name = 'evidence-reviewer';
  applicableTypes = [ArtifactType.PRD, ArtifactType.PRODUCT_STRATEGY];

  async validate(content: string, artifactType: ArtifactType): Promise<Finding[]> {
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

  async validate(content: string, artifactType: ArtifactType): Promise<Finding[]> {
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

  async validate(content: string, artifactType: ArtifactType): Promise<Finding[]> {
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