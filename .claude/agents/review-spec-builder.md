# Review Spec Builder

Builds review specification for validators.

## Purpose

Creates structured review spec that guides validator routing and scoring.

## Review Spec Contents

```yaml
artifact_type: PRD|RFC|EXPERIMENT_PLAN|PRODUCT_STRATEGY
detected_maturity: draft|proposal|ready_for_review
audience: internal|external|technical|executive
review_mode: fast|deep|draft
expected_state: what state artifact should be in
selected_dimensions: list of scoring dimensions
validator_budget: max validators to run
finding_budget: max findings to output
score_cap_rules: list of applicable score caps
```

## Maturity Detection

Analyzes artifact for:

- Section completeness
- Evidence quality
- Specificity level
- Placeholder density

## Mode Settings

**Fast mode**: Reduced validator budget, critical validators only

**Deep mode**: Full validator budget, all applicable validators

**Draft mode**: Adjusted expectations, lenient scoring

## Output

Structured review spec passed to validator router.
