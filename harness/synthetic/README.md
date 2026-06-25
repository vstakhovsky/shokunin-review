# Synthetic Eval Cases

## Purpose

Synthetic eval cases are needed when real-world data is limited or when we need to test specific edge cases that don't appear frequently in real documents.

## What synthetic cases are

Artificially constructed test cases that exercise specific validation dimensions:

- **Metric fog:** PRDs that mention "success" without defining metrics
- **Evidence gaps:** Claims without supporting data
- **Missing decisions:** Documents that describe but don't decide
- **Trade-off gaps:** Technical choices without alternatives analysis
- **AI guardrail gaps:** AI features without safety boundaries

## Why synthetic cases matter

1. **Coverage:** Test edge cases before they appear in real reviews
2. **Safety:** Validate validators catch dangerous patterns
3. **Speed:** Don't wait for real-world failures to find gaps
4. **Control:** Know exactly what should be detected

## What each synthetic case must include

### Required structure

```yaml
case_id: synthetic-metric-fog-001
artifact_type: prd
description: PRD mentions growth and success without defining metrics.

expected_findings:
  - finding_type: metric_fog
    severity: high
    evidence: "Success metrics mentioned but not defined"

must_not_flag:
  - finding_type: hallucinated_gap
    reason: "The document genuinely has no metrics, this is accurate detection"

expected_score_band: not-review-ready
expected_score_range: 0-39
```

### Validation rules

1. **Ground in real problems:** Synthetic cases must represent patterns seen in real reviews or plausible real-world documents
2. **Clear expected findings:** Every synthetic case must specify what should be detected
3. **Must-not-flag rules:** Explicitly list what should NOT be flagged to prevent false positives
4. **Expected score:** What score band should this case receive?

## Generation approach

### From rubrics

Synthetic cases should be generated from rubrics:

1. **Pick a rubric criterion:** e.g., "evidence_grounding"
2. **Create minimal example:** Document that violates just this criterion
3. **Specify expected findings:** What should be detected?
4. **Add must_not_flag:** What should NOT be detected?

### From real failures

When real eval cases fail:

1. **Extract the failure pattern:** What went wrong?
2. **Create synthetic test case:** Minimal reproduction
3. **Validate fix:** Does the fix catch the synthetic case?

## Examples

### Example: Metric fog synthetic case

**Document:** "We will build an AI Food Delivery Agent to increase sales and improve retention."

**Expected findings:**
- primary_metric_missing (critical)
- metric_fog (high)
- overclaim (medium) - claims increase/improve without baseline

**Must not flag:**
- hallucinated_gap (the document genuinely has no metrics)

**Expected score:** Not review-ready (0-39)

### Example: Evidence gap synthetic case

**Document:** "Users are demanding AI-powered ordering. We need to launch quickly."

**Expected findings:**
- evidence_gap (high)
- no_baseline (high)
- customer_problem_weak (medium)

**Must not flag:**
- unsupported_claim (if we're testing evidence detection, not hallucination)

**Expected score:** Not review-ready (0-39)

## Current status

### Implemented

- Directory structure for synthetic cases
- Documentation for synthetic case structure

### Roadmap

- Synthetic case generator script
- Automated validation of synthetic cases against rubrics
- Synthetic case coverage tracking
- Integration with main eval harness

## How to use

1. **Create synthetic case:** Add YAML file in this directory
2. **Include expected findings:** Specify what should be detected
3. **Add must_not_flag rules:** Specify what should NOT be detected
4. **Run eval:** Test against synthetic cases
5. **Validate results:** Check if expected findings are detected

## Documentation

- [Eval Operating System](../../docs/eval-operating-system.html) — Overall system
- [Error Analysis Loop](../../docs/error-analysis-loop.md) — How to analyze failures
- [Error Taxonomy](../error_analysis/error_taxonomy.yaml) — Error types
