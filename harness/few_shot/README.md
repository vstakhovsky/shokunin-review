# Few-Shot Examples

## Purpose

Failed eval cases can become few-shot examples to improve validators and judges. This directory stores those examples.

## What few-shot examples are

Concrete examples of:

- **Good findings:** Well-grounded, specific, severity-calibrated findings
- **Bad findings:** Vague, unsupported, or miscalibrated findings
- **Corrected findings:** Before/after showing improvement

## Why few-shot examples matter

1. **Validator training:** Show validators what "good" looks like
2. **Judge calibration:** Train judges on quality assessment
3. **Few-shot prompting:** Use examples in prompts to improve output
4. **Regression testing:** Ensure quality doesn't drift

## What each few-shot example must include

### Structure

```yaml
example_id: few_shot_finding_001
type: good_finding | bad_finding | corrected_finding

# For corrected_finding, include before/after
before: |
  [Bad finding text]

after: |
  [Good finding text]

# Context
artifact_type: prd
finding_type: metric_fog
error_type: vague_recommendation

# Why this matters
lesson: "Findings must suggest specific metrics, not generic 'add metrics'"
rubric_dimension: "recommendation_specificity"
```

### Categories

#### Good findings

Examples of strong findings that:
- Include artifact-grounded evidence
- Have appropriate severity
- Provide specific recommendations
- Indicate ownership and next steps

#### Bad findings

Examples of weak findings that:
- Are vague or generic
- Lack evidence quotes
- Have miscalibrated severity
- Provide unactionable recommendations

#### Corrected findings

Before/after pairs showing:
- What the validator originally produced
- What a good finding should look like
- What dimension was improved

## Usage patterns

### For validator improvement

1. **Collect bad findings:** Gather weak outputs from eval failures
2. **Identify pattern:** What dimension is failing? (e.g., recommendation_specificity)
3. **Create corrected example:** Show before/after
4. **Update validator prompt:** Include few-shot example
5. **Rerun eval:** Verify improvement

### For judge training

1. **Collect edge cases:** Findings where quality is unclear
2. **Create good/bad examples:** Show what passes/fails each rubric dimension
3. **Train judge:** Use examples to calibrate judge output
4. **Validate consistency:** Ensure judge ratings align with examples

### For few-shot prompting

1. **Select relevant examples:** Pick examples similar to current case
2. **Format for prompt:** Include in validator or judge prompt
3. **Run inference:** Generate output with few-shot guidance
4. **Evaluate results:** Check if output quality improves

## Examples

### Example: Good finding

```yaml
example_id: few_shot_good_001
type: good_finding
artifact_type: prd
finding_type: metric_fog

finding: |
  [evidence-gap] Primary success metric is not defined. Page 3 mentions "user growth" and "retention" but does not specify:
  - What metric to track (e.g., DAU, WAU, retention rate)
  - Baseline values (current performance)
  - Target values (what counts as success)
  - Measurement method (how metric is calculated)
  
  Severity: High. Impact: Cannot validate problem size or success criteria.
  Suggested fix: Define primary metric (e.g., "Increase 7-day retention from 15% to 25%").
  Owner: PM.

lesson: "Good findings include specific missing elements, suggest concrete fixes, and reference artifact sections."
rubric_dimension: "recommendation_specificity"
```

### Example: Bad finding

```yaml
example_id: few_shot_bad_001
type: bad_finding
artifact_type: prd
finding_type: metric_fog

finding: |
  The document needs better metrics.

lesson: "Bad findings are vague and provide no actionable guidance."
rubric_dimension: "recommendation_specificity"
error_type: "vague_recommendation"
```

### Example: Corrected finding

```yaml
example_id: few_shot_corrected_001
type: corrected_finding
artifact_type: prd
finding_type: metric_fog

before: |
  The document needs better metrics.

after: |
  [evidence-gap] Primary success metric is not defined. Page 3 mentions "user growth" but does not specify:
  - What metric to track (e.g., DAU, WAU, retention rate)
  - Baseline values (current performance)
  - Target values (what counts as success)
  
  Suggested fix: Define primary metric (e.g., "Increase 7-day retention from 15% to 25%").
  Owner: PM.

lesson: "Transform vague feedback into specific, actionable recommendations."
rubric_dimension: "recommendation_specificity"
error_type: "vague_recommendation"
```

## Mining from failures

### Process

1. **Run eval:** `shokunin eval`
2. **Identify failures:** Check `harness/reports/latest.md`
3. **Classify errors:** Use error taxonomy
4. **Extract examples:** Save bad findings as few-shot examples
5. **Create corrections:** Write what good finding should be
6. **Update prompts:** Add to validator or judge prompts
7. **Rerun regression:** Verify improvement

### Priority

Mine few-shot examples in this order:

1. **missed_blocker** — Critical failures first
2. **false_positive** — Trust-eroding failures
3. **vague_recommendation** — Most common weak output
4. **unsupported_claim** — Hallucination risks
5. **wrong_severity** — Calibration issues

## Current status

### Implemented

- Directory structure for few-shot examples
- Documentation for few-shot example structure
- Example formats for good/bad/corrected findings

### Roadmap

- Automated few-shot mining from eval failures
- Few-shot example management script
- Integration with validator and judge prompts
- Few-shot coverage tracking
- Automated few-shot selection for similar cases

## Documentation

- [Eval Operating System](../../docs/eval-operating-system.md) — Overall system
- [Error Analysis Loop](../../docs/error-analysis-loop.md) — How to analyze failures
- [Error Taxonomy](../error_analysis/error_taxonomy.yaml) — Error types
- [Finding Quality Rubric](../rubrics/finding-quality-rubric.yaml) — Finding criteria
