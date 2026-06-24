# Eval Harness

Shokunin Review includes a real evaluation harness for testing review quality across PRDs, RFCs, experiment plans, and product strategies.

## What is the Eval Harness?

The eval harness is a **test suite for review quality**, not just command testing. It measures whether Shokunin Review:

1. **Detects real gaps** - Does it find the problems that actually exist?
2. **Avoids hallucinations** - Does it invent problems that don't exist?
3. **Calibrates scores** - Are scores reasonable for the document quality?
4. **Maintains tone** - Is output professional and non-toxic?
5. **Provides value** - Are recommendations specific and actionable?

## Why It Matters

AI-assisted review tools can sound confident while missing important gaps or flagging irrelevant risks. The eval harness makes review quality **measurable** and **trustworthy** by:

- Validating against known-good and known-bad examples
- Testing for specific finding types (metrics, evidence, decisions, etc.)
- Checking for false positives (flagging issues that shouldn't exist)
- Detecting score drift over time
- Ensuring recommendations are actionable, not generic

## Architecture

```
┌─────────────────┐
│  Eval Case YAML │
│  (expectations) │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Input Artifact │
│  (.md document) │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Shokunin Review │
│  (actual output)│
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Comparison     │
│  (expected vs   │
│   actual)       │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Report         │
│  (metrics +     │
│   regressions)  │
└─────────────────┘
```

## Running Evals

### Basic Usage

```bash
# Run all evals
shokunin eval

# Run with report generation
shokunin eval --report

# Run with strict thresholds
shokunin eval --strict --report

# Filter to specific evals
shokunin eval --filter prd

# Save trace files for debugging
shokunin eval --trace --report

# Run each eval multiple times for stability testing
shokunin eval --repeat 3

# Update regression baseline
shokunin eval --update-baseline
```

### Output

```
職 Shokunin is running eval harness...

Eval Results: 14/16 passed

Failed Evals:
  weak-prd-missing-decisions
    Expected: Not review-ready
    Actual: 45 (NEEDS_REVISION)
    Reasons: Score band mismatch

Metrics Summary:
  Avg Critical Recall: 92.3%
  Avg Finding Recall: 78.5%
  Avg Hallucination Rate: 3.2%
  Avg Score Calibration Error: 6.2

Total time: 15234ms
Report written to harness/reports/latest_eval_report.md
```

## Eval Case Format

Each eval case is a YAML file that defines expectations:

```yaml
id: weak-prd-missing-decisions
artifact_type: PRD
input_file: examples/eval-cases/prd/weak-prd-missing-decisions.md

expected_score_range:
  min: 20
  max: 35

expected_findings:
  must_detect:
    - id: decision_traceability_missing
      severity: high
      category: decision_quality
    - id: success_metrics_missing
      severity: high
      category: metrics

  should_not_detect:
    - id: security_vulnerability
      reason: "No security-sensitive design"

  critical_misses:
    - decision_traceability_missing

forbidden_behaviors:
  - accuse_ai_use
  - shame_author

notes: "Tests detection of missing decision log and metrics"
```

### Fields

- `id` - Unique identifier for the eval case
- `artifact_type` - PRD, RFC, EXPERIMENT, STRATEGY
- `input_file` - Path to the input artifact
- `expected_score_range` - Reasonable score range for this quality level
- `expected_findings` - What should and shouldn't be detected
- `forbidden_behaviors` - Behaviors that must not occur
- `notes` - What this eval tests and why it matters

## Expected Findings

### must_detect

Findings that **must be present** for the eval to pass:

```yaml
must_detect:
  - id: decision_traceability_missing
    severity: high
    category: decision_quality
```

### should_not_detect

Findings that **must NOT be present** (false positive check):

```yaml
should_not_detect:
  - id: legal-risk
    reason: "This document doesn't involve legal issues"
```

### critical_misses

Findings that, if missed, cause immediate failure:

```yaml
critical_misses:
  - decision_traceability_missing
  - success_metrics_missing
```

## Score Calibration

### Score Bands

- **Blocked (0-39)** - Not ready for stakeholder review
- **Needs Major Revision (40-69)** - Serious gaps but recoverable
- **Nearly Ready (70-84)** - Mostly solid, minor improvements needed
- **Ready (85-100)** - Ready for leadership or implementation review

### Dimensions

Six dimensions contribute to the score:

1. **Clarity (15%)** - Problem, goals, scope
2. **Evidence (20%)** - Data, research, examples
3. **Decisions (15%)** - Decision log, alternatives
4. **Metrics (20%)** - Primary, proxy, guardrails
5. **Risks and Tradeoffs (15%)** - Risk analysis
6. **Implementation Readiness (15%)** - Rollout plan

### Score Caps

Missing critical elements cap the maximum score:

- No problem evidence → Max 60
- No primary metric → Max 55
- No MVP scope → Max 55
- Overclaim without evidence → Max 50

## Metrics

### Core Metrics

- **Critical Recall** - % of critical findings detected
- **Finding Recall** - % of expected findings detected
- **Hallucination Rate** - % of false positive findings
- **Score Calibration Error** - Distance from expected score range
- **Tone Pass** - Binary check for professional tone
- **Recommendation Specificity** - % of actionable recommendations

### Thresholds

**Default Mode:**
- Critical recall: ≥ 90%
- Finding recall: ≥ 75%
- Hallucination rate: ≤ 10%
- Score calibration error: ≤ 8 points

**Strict Mode:**
- Critical recall: 100%
- Finding recall: ≥ 85%
- Hallucination rate: ≤ 5%
- Score calibration error: ≤ 5 points

## Regression Testing

### Baseline

The baseline stores expected metrics for comparison:

```bash
# Create baseline
shokunin eval --update-baseline

# Compare with baseline
shokunin eval --report

# Output shows regressions and improvements
```

### Regression Detection

```
📊 Baseline Comparison:
  Baseline: 2026-06-20T10:30:00Z
  Mode: default

⚠️  Regressions detected:
  - Critical recall dropped from 94.0% to 89.5%
  - Finding recall dropped from 82.0% to 76.5%

✅ Improvements:
  - Score calibration error decreased from 8.5 to 6.2
```

## Reports

### Markdown Report

Generated at `harness/reports/latest_eval_report.md`:

```markdown
# Shokunin Review Eval Report

## Summary

| Metric              | Result | Threshold | Status    |
| ------------------- | -----: | --------: | --------- |
| Critical recall     | 92.3%  | 90%       | ✅ PASS    |
| Finding recall      | 78.5%  | 75%       | ✅ PASS    |
| Hallucination rate  | 3.2%   | ≤10%      | ✅ PASS    |

## Failed Cases

### weak-prd-missing-decisions
- **Expected Band:** Not review-ready
- **Actual Score:** 45 (NEEDS_REVISION)
- **Calibration:** too_lenient
- **Missed Critical Findings:** decision_traceability_missing
```

### JSON Report

Generated at `harness/reports/latest.json` for machine-readable output.

### Trace Files

Per-case execution traces saved to `harness/traces/{timestamp}-{case_id}.json`:

```json
{
  "run_id": "2026-06-23T15:30:00Z",
  "case_id": "weak-prd-missing-decisions",
  "input_hash": "abc123...",
  "review_output": { ... },
  "expected": { ... },
  "metrics": { ... },
  "pass": true,
  "fail_reasons": []
}
```

## Adding New Eval Cases

### 1. Create Input Artifact

Create a realistic document with intentional gaps:

```bash
touch examples/eval-cases/prd/my-test-case.md
```

### 2. Create Eval Config

Define expectations in YAML:

```bash
touch harness/evals/prd/my-test-case.yaml
```

```yaml
id: my-test-case
artifact_type: PRD
input_file: examples/eval-cases/prd/my-test-case.md

expected_score_range:
  min: 25
  max: 40

expected_findings:
  must_detect:
    - id: evidence_missing
      severity: high
  should_not_detect:
    - id: security_vulnerability
      reason: "No security implications"

notes: "Tests detection of missing evidence"
```

### 3. Run and Debug

```bash
# Run with trace
shokunin eval --filter my-test-case --trace

# Inspect trace
cat harness/traces/*-my-test-case.json | jq .
```

### 4. Adjust if Needed

- Update expected findings in YAML
- Adjust scoring rubric if needed
- Re-run evals to verify

## Calibration Loop

1. **Add weak/medium/strong documents** covering quality spectrum
2. **Define expected findings** for each case
3. **Run Shokunin** with `--trace` and `--report`
4. **Compare output with expectations**
5. **Identify issues** (missed findings, hallucinations, score drift)
6. **Fix at source** (prompts, rubrics, validators)
7. **Re-run evals** to verify fixes
8. **Update baseline** if changes are intentional

## Best Practices

1. **Start Simple** - Add basic evals before complex ones
2. **Calibrate Gradually** - Build intuition by adding cases incrementally
3. **Review Traces** - Always inspect traces for unexpected behavior
4. **Document Decisions** - Explain why expectations are what they are
5. **Balance Coverage** - Don't over-optimize for edge cases
6. **Version Control** - Commit eval configs and traces
7. **Human-in-the-Loop** - Manually review samples regularly

## Troubleshooting

### Evals Not Loading
- Check YAML syntax
- Verify file paths
- Ensure artifact_type matches enum values

### Metrics Not Calculating
- Check review output has expected fields
- Verify findings have `tag` or `id` fields
- Inspect trace JSON for debugging

### Regression Detected
- Review what changed in prompts/rubrics
- Compare traces before/after change
- Run individual evals to isolate issue
- Consider if regression is acceptable trade-off

### Unexpected Findings
- Review finding taxonomy definitions
- Check if finding IDs are consistent
- Adjust validator prompts if needed
- Update expected findings if appropriate

## Further Reading

- [Finding Taxonomy](../harness/expected_findings/taxonomy.yaml) - All finding types
- [Score Calibration](../harness/score_calibration/README.md) - Scoring details
- [Regression Thresholds](../harness/rubrics/regression_thresholds.yaml) - Quality thresholds
- [Harness README](../harness/README.md) - Implementation details
