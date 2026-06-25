# Error Analysis Loop

## The loop

```text
run evals
→ inspect failed cases
→ classify failures using error taxonomy
→ cluster repeated failure patterns
→ update validators, prompts, rubrics, or eval cases
→ rerun regression
```

## Why this matters

Without systematic error analysis:

- **Quality drift:** Validator changes that improve one case can silently regress others
- **Unknown weaknesses:** We don't know what types of errors the system is prone to
- **Unmeasurable improvement:** "Better validation" is subjective without error taxonomy
- **False confidence:** Polished output can hide systematic problems

## Step-by-step process

### 1. Run evals

```bash
shokunin eval
```

This generates reports in `harness/reports/latest.md` and `harness/reports/latest.json`.

### 2. Inspect failed cases

Open the report and identify:
- Cases that scored incorrectly (score band mismatch)
- Expected findings that were missed
- False positives that were flagged
- Critical blockers that were not detected

### 3. Classify failures

For each failure, assign an error type from `harness/error_analysis/error_taxonomy.yaml`:

```text
Error type: missed_expected_finding
Case: weak-prd-no-metrics
Expected: missing-primary-metric
Actual: (not detected)
```

### 4. Cluster repeated patterns

Group failures by error_type:

```text
missed_blocker (3 cases):
  - weak-prd-no-metrics
  - weak-rfc-no-rollback
  - weak-strategy-no-segment

false_positive (2 cases):
  - valid-metric-flagged
  - clear-decision-questioned
```

### 5. Determine root cause

For each cluster, ask:
- **Validator bug:** Logic error in detection rule?
- **Prompt issue:** Validator prompt not specific enough?
- **Rubric gap:** Scoring rubric incomplete?
- **Eval case issue:** Expected finding wrong or must_not_flag missing?
- **Threshold issue:** Sensitivity too high or too low?

### 6. Apply fix

Choose the appropriate action:

| Root cause | Action |
|------------|--------|
| Validator bug | Fix validator logic or template |
| Prompt issue | Improve validator prompt specificity |
| Rubric gap | Add rubric criteria or adjust weights |
| Eval case issue | Update expected findings or must_not_flag rules |
| Threshold issue | Adjust detection sensitivity |

### 7. Rerun regression

```bash
shokunin eval --regression
```

This compares against baseline to detect:
- Fixed cases (now passing)
- New regressions (previously passing, now failing)
- Unchanged failures (need different approach)

## Example error analysis

### Case: weak-prd-no-metrics

**Expected:**
- missing-primary-metric (critical blocker)
- evidence-gap (high)

**Actual:**
- evidence-gap only

**Error type:** missed_expected_finding

**Likely cause:** Metric Reviewer accepts vague business goals as metrics.

**Suggested fix:** Add rubric distinction between business goal, KPI, and primary success metric. Update Metric Reviewer prompt to require quantifiable target.

### Case: valid-metric-flagged

**Expected:**
- No findings (metric is well-defined)

**Actual:**
- metric-fog (false positive)

**Error type:** false_positive

**Likely cause:** Metric Reviewer too sensitive to missing context.

**Suggested fix:** Add must_not_flag rule for well-formed metrics. Adjust validator threshold.

## Prioritization

Fix failures in this order:

1. **missed_blocker** (critical) — Can lead to bad decisions
2. **score_band_mismatch** (high) — Wrong go/no-go decision
3. **unsupported_claim** (high) — Undermines trust
4. **false_positive** (high) — Erodes trust
5. **missed_expected_finding** (high) — Incomplete coverage
6. **must_not_flag_violation** (high) — Validation bug
7. **wrong_severity** (medium) — Misleads prioritization
8. **vague_recommendation** (medium) — Not actionable
9. **toxic_or_dismissive_tone** (medium) — Damages collaboration
10. **missing_evidence_quote** (high) — Cannot verify
11. **duplicate_finding** (low) — Bloat
12. **missing_recommended_action** (low) — Incomplete
13. **generic_recommendation** (medium) — Not helpful
14. **document_bloat** (low) — TL;DR
15. **hallucinated_gap** (high) — False positive

## Tracking improvements

Track these metrics over time:

- **Error type frequency:** Which errors occur most often?
- **Fix success rate:** What percentage of attempted fixes succeed?
- **Regression rate:** How often do changes break previously passing cases?
- **Overall eval pass rate:** Is quality improving?

## Tools

### Error analysis script

```bash
bash scripts/analyze-eval-errors.sh
```

This script:
- Checks that error taxonomy and rubrics exist
- Shows current status of error analysis infrastructure
- Lists next steps for improvement

### Verification script

```bash
bash scripts/verify-eval-operating-system.sh
```

This script verifies that all Eval Operating System components exist and are properly configured.

## Documentation

- [Eval Operating System](./eval-operating-system.md) — Overall system
- [Eval Quality Definition](./eval-quality-definition.md) — Quality dimensions
- [Error Taxonomy](../harness/error_analysis/error_taxonomy.yaml) — Error types
- [Finding Quality Rubric](../harness/rubrics/finding-quality-rubric.yaml) — Finding criteria
- [Review Quality Rubric](../harness/rubrics/review-quality-rubric.yaml) — Review criteria
