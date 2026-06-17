# Experiment Plan Template

Template for Experiment Plan documents.

## Structure

```markdown
# [Feature Name] Experiment Plan

## Hypothesis

**Primary Hypothesis**:
[What do we believe will happen?]

**Rationale**:
[Why do we believe this?]

**Predicted Outcome**:
[What specific outcome do we expect?]

---

## Background

**Current State**:
[What does current state look like?]

**Problem**:
[What problem are we trying to solve?]

---

## Target Population

**Inclusion Criteria**:
- [Who is included in experiment?]
- [Characteristics]:
  - [Trait 1]: [value]
  - [Trait 2]: [value]

**Exclusion Criteria**:
- [Who is excluded?]
- [Why excluded?]

**Population Size**:
- Eligible users: [number]
- Expected exposure: [number]

---

## Control / Treatment

**Control Group**:
- [What control group experiences]

**Treatment Group**:
- [What treatment group experiences]

**Randomization**:
- [Randomization unit: user, order, session]
- [Split: 50/50, etc.]
- [Stratification: if applicable]

---

## Primary Metric

**Metric Name**:
[Clear name of metric]

**Definition**:
[Mathematical formula]

**Measurement**:
[How is it measured?]

**Success Threshold**:
- [Target value]
- [Statistical significance: p < 0.05]
- [Power: 80%]

---

## Secondary Metrics

**Metric 1**: [name]
- Target: [goal]
- Measurement: [how measured]

**Metric 2**: [name]
- Target: [goal]
- Measurement: [how measured]

---

## Guardrail Metrics

**Guardrail 1**: [name]
- Maximum acceptable: [threshold]
- Rollback if exceeded: [yes/no]

**Guardrail 2**: [name]
- Maximum acceptable: [threshold]
- Rollback if exceeded: [yes/no]

---

## Sample Size / Duration

**Sample Size Calculation**:
- Baseline: [current value]
- Target: [desired value]
- MDE: [minimum detectable effect]
- Power: [80%]
- Significance: [p < 0.05]
- Required sample: [number per group]

**Duration Estimate**:
- Estimated duration: [weeks]
- Based on: [traffic, conversion rate]

---

## Minimum Detectable Effect

**Statistical MDE**:
- With 80% power: [effect size]
- With 60% power: [effect size]

**Practical Significance**:
- Is this effect business-relevant?
- [Why/why not]

---

## Instrumentation Plan

**Event Tracking**:
- [Event 1]: [when triggered]
- [Event 2]: [when triggered]

**Data Quality Checks**:
- Tracking coverage: [> 99%]
- Event timestamp accuracy: [±1 second]

**Verification**:
- Smoke test duration: [how long before full rollout]
- Dashboard: [real-time monitoring]

---

## Sample Ratio Mismatch

**Risk**: [What if groups aren't balanced?]

**Detection**:
- Chi-square test for group balance
- Checked: [frequency]
- Alert threshold: [p < 0.01]

**Mitigation**:
- If SRM detected: [what we do]
- Investigation: [how we diagnose]
- Re-randomization: [if needed]

---

## Stopping Rules

**Success Stopping Rule**:
- Stop if: [p < 0.01 AND guardrails OK AND min 2 weeks]
- Verified: [how many consecutive days]

**Futility Stopping Rule**:
- Stop if: [p > 0.5 AND power < 30% AND min 3 weeks]
- Team consensus: [required]

**Harm Stopping Rule**:
- Stop immediately if: [guardrail metric violated]
- Action: [rollback plan]

---

## Decision Rule

**Decision Criteria**:
- **Launch if**:
  - P-value < 0.05 (statistically significant)
  - AND treatment metric > control metric
  - AND guardrail metrics not violated

- **Do Not Launch if**:
  - P-value ≥ 0.05 (not statistically significant)
  - OR guardrail metrics violated

**Statistical Threshold**:
- Significance level: α = 0.05 (two-tailed)
- Power: 80%
- Minimum effect: [specified MDE]

**Business Threshold**:
- Minimum viable: [acceptable improvement]
- Target: [desired improvement]

---

## Rollback Plan

**Rollback Triggers**:
- [Trigger 1]: [threshold]
- [Trigger 2]: [threshold]

**Rollback Process**:
1. [Action 1]
2. [Action 2]

**Timeline**:
- Rollback complete within: [timeframe]

**Communication**:
- Internal: [who to notify]
- External: [if applicable]

---

## Interpretation Risks

**Risk 1**: [What could we misinterpret?]
- Mitigation: [how we'll address]

**Risk 2**: [What could we misinterpret?]
- Mitigation: [how we'll address]

**Limitations**:
- [What are the limitations of this experiment?]
```

---

## Decision Ask

**Request**: [What decision needed?]

**Decision Maker**: [Who decides?]

**Timeline**: [When decision needed?]

**Decision Options**:
1. Launch experiment
2. Request design changes
3. Reject (with rationale)
```
