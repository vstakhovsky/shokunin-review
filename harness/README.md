# Harness

Evaluation harness for Shokunin Review.

## Purpose

Executable test suite that validates Shokunin Review behavior and **output quality**. This is not just "testing commands" — it's evaluation of subjective review quality.

## Eval Philosophy

Shokunin evals measure **subjective review quality**, not only command execution. The eval harness answers:

1. **Detection Quality**: Did Shokunin detect the real gaps?
2. **Completeness**: Did it miss critical gaps?
3. **Precision**: Did it hallucinate non-existing problems?
4. **Actionability**: Did it give specific actionable recommendations?
5. **Tone**: Did it preserve calm, professional, non-toxic tone?
6. **Scoring**: Did it calculate a reasonable Readiness Score?
7. **Stability**: Did score/finding quality remain stable after changes?
8. **Traceability**: Did every eval run leave an inspectable trace?

## What It Does

- Tests weak and strong examples
- Validates expected findings (must_detect, should_not_detect)
- Checks score bands and calibration
- Verifies score caps
- Tests forbidden behaviors (AI accusations, toxic language)
- Evaluates recommendation specificity
- Validates tone quality
- Provides regression testing with thresholds

## Structure

```
harness/
├── README.md
├── evals/                    # Test cases (flat + nested)
│   ├── prd/                  # PRD eval configs
│   ├── rfc/                  # RFC eval configs
│   ├── experiment/           # Experiment eval configs
│   └── strategy/             # Strategy eval configs
├── rubrics/                  # Scoring criteria
│   ├── finding_taxonomy.yaml
│   ├── scoring_rubric.yaml
│   └── regression_thresholds.yaml
├── judges/                   # Judge prompts for LLM-as-judge
│   ├── decision_traceability_judge.md
│   ├── risk_coverage_judge.md
│   ├── tradeoff_quality_judge.md
│   ├── recommendation_specificity_judge.md
│   ├── non_toxic_tone_judge.md
│   └── score_calibration_judge.md
├── expected/                 # Aggregated expected findings
│   └── expected_findings.yaml
├── reports/                  # Generated markdown reports
│   └── latest_eval_report.md
└── traces/                   # Per-case execution traces
    └── {timestamp}-{case_id}.json
```

## Running Evals

```bash
# From repository root
cd cli
npm install
npm run build
node dist/cli.js eval

# Or if globally linked
shokunin eval

# Run specific eval
shokunin eval --filter prd

# Run with strict thresholds
shokunin eval --strict

# Generate markdown report
shokunin eval --report

# Save per-case traces
shokunin eval --trace

# Run each eval 3 times for stability testing
shokunin eval --repeat 3

# Combined options
shokunin eval --report --trace --strict
```

## Eval Categories

### Artifact Type Evals

#### PRD (7 cases)
- `weak-prd-missing-decisions` — Missing decision log and metrics
- `weak-prd-no-metrics` — Vague metrics, no baseline
- `weak-prd-no-risks` — No risk section
- `medium-prd-good-context-weak-tradeoffs` — Good context, missing trade-offs
- `strong-prd-with-decision-log` — Comprehensive PRD should score high
- `polished-bad-prd-ai-slop` — Polished language without substance
- `good-prd-should-not-be-overcriticized` — Simple, good PRD (anti-overcriticism test)

#### RFC (3 cases)
- `weak-rfc-no-tradeoffs` — Missing trade-off analysis
- `weak-rfc-no-failure-modes` — No failure mode analysis
- `strong-rfc-api-change-with-adr` — Comprehensive RFC with ADR

#### Experiment (3 cases)
- `weak-experiment-no-guardrails` — Missing guardrail metrics
- `weak-experiment-no-sample-size` — No sample size analysis
- `strong-experiment-with-decision-rule` — Complete experiment design

#### Strategy (3 cases)
- `weak-strategy-no-segment` — No target segment
- `weak-strategy-no-constraints` — Missing constraint discussion
- `strong-strategy-with-tradeoffs` — Comprehensive strategy with trade-offs

### Special Case Evals
- Anti-overcriticism tests — Good documents not overcriticized
- Tone quality tests — Professional, non-toxic output
- Recommendation specificity tests — Actionable recommendations

## Eval Metrics

The eval harness calculates the following metrics per case:

### Core Metrics

- **Critical Recall**: % of critical findings (from `critical_misses`) that are detected
- **Finding Recall**: % of expected findings (from `must_detect`) that are detected
- **Hallucination Rate**: % of findings that should NOT have been detected (`should_not_detect`)
- **Score Calibration Error**: Distance of actual score from expected range (0 if within range)
- **Tone Pass**: Binary check for toxic, sarcastic, or accusatory language
- **Recommendation Specificity**: % of recommendations that include concrete action verbs + objects

### Regression Thresholds

Defined in `harness/rubrics/regression_thresholds.yaml`:

**Default Mode:**
- Critical recall: ≥ 90%
- Finding recall: ≥ 75%
- Hallucination rate: ≤ 10%
- Avg score calibration error: ≤ 8 points
- Tone pass rate: 100%
- Recommendation specificity: ≥ 75%

**Strict Mode:**
- Critical recall: 100%
- Finding recall: ≥ 85%
- Hallucination rate: ≤ 5%
- Avg score calibration error: ≤ 5 points
- Tone pass rate: 100%
- Recommendation specificity: ≥ 85%

## Adding New Evals

### Step 1: Create Input Document

Create a realistic artifact in `examples/eval-cases/{artifact_type}/`:

```bash
# Example: PRD
touch examples/eval-cases/prd/weak-prd-missing-x.md
```

Write realistic content with intentional gaps.

### Step 2: Create Eval Config

Create corresponding YAML in `harness/evals/{artifact_type}/`:

```bash
# Example: PRD
touch harness/evals/prd/weak-prd-missing-x.yaml
```

```yaml
id: weak-prd-missing-x
artifact_type: PRD
input_file: examples/eval-cases/prd/weak-prd-missing-x.md

expected_score_band: Not review-ready
expected_score_range:
  min: 25
  max: 45

expected_findings:
  must_detect:
    - id: finding_id
      severity: high
      category: category_name
      evidence_hint: "What to look for"

  should_not_detect:
    - id: security_vulnerability
      reason: "Why this should not be detected"

  critical_misses:
    - finding_id

recommendation_expectation:
  must_include_patterns:
    - "specific pattern"
  must_not_be:
    - generic
    - vague

tone_expectation:
  must_be:
    - professional
    - non-toxic
  must_not_be:
    - sarcastic
    - accusatory

notes: >
  What this eval tests and why it matters.
```

### Step 3: Run Eval

```bash
shokunin eval --filter weak-prd-missing-x --trace
```

### Step 4: Review Trace

Inspect the trace JSON in `harness/traces/`:

```bash
cat harness/traces/*-weak-prd-missing-x.json | jq .
```

### Step 5: Adjust if Needed

If results don't match expectations:
- Check if findings are correct
- Update expected findings in YAML
- Adjust prompt/rubric/validator if needed
- Re-run evals

## Calibration Loop

### 1. Add Weak/Medium/Strong Document
Create artifacts representing different quality levels.

### 2. Define Expected Findings
Specify what Shokunin should and should not detect.

### 3. Run Shokunin
Execute evals with `--trace` and `--report`.

### 4. Compare Output with Expected
Review traces and report for:
- Missed critical findings
- Hallucinated findings
- Score drift
- Generic recommendations
- Tone issues

### 5. Identify Issues
- **False Negatives**: What did Shokunin miss?
- **False Positives**: What did Shokunin invent?
- **Score Issues**: Too strict or too lenient?
- **Quality Issues**: Generic recommendations, toxic tone?

### 6. Update Prompt/Rubric/Validator
Fix the identified issues at the source:
- Adjust validator logic
- Update scoring rubric
- Refine prompt instructions
- Fix score caps

### 7. Re-run Evals
Always run full eval suite after changes:
```bash
shokunin eval --strict --report --trace
```

### 8. Accept Change Only if Regression Thresholds Pass
- If strict mode passes → Change is good
- If regression detected → Investigate and fix
- Document trade-offs if accepting some regression

## LLM-as-Judge Note

Judge prompts in `harness/judges/` define the evaluation contract. They:

1. Specify what to check for each dimension
2. Define pass/fail rules
3. Provide examples of good/bad outputs
4. Include instructions to avoid inventing issues
5. Require "unknown" return when evidence is insufficient

**Do not blindly trust LLM judges.** Use them as:
- Structured evaluation contracts
- Guidelines for human calibration
- Documentation of quality standards

For every new artifact type, manually calibrate 5-10 cases before relying on automated evaluation.

## Report Interpretation

### Summary Section

Shows overall metrics against thresholds:
- ✅ PASS: Metric meets threshold
- ❌ FAIL: Metric misses threshold

### Failed Cases Section

For each failed case:
- Expected vs. actual score and band
- Calibration error and label (too_strict/too_lenient)
- Missed critical findings
- Hallucinated findings
- Fail reasons

### Score Calibration Outliers

Cases with significant score drift:
- Calibration error magnitude
- Calibration direction (too strict vs. too lenient)

### Recommended Improvements

Generated suggestions based on failure patterns:
- Prompt improvements
- Rubric adjustments
- Validator fixes
- Score cap changes

## CI Integration

### PR Checks (Fast)
```yaml
# .github/workflows/pr.yml
- name: Run schema tests
  run: npm test

- name: Build
  run: npm run build
```

### Manual Workflow (Full Evals)
```yaml
# .github/workflows/eval.yml
- name: Run evals
  run: shokunin eval --strict --report --trace

- name: Upload traces
  uses: actions/upload-artifact@v3
  with:
    name: eval-traces
    path: harness/traces/

- name: Upload report
  uses: actions/upload-artifact@v3
  with:
    name: eval-report
    path: harness/reports/
```

## Golden Outputs

Expected outputs can be stored in `harness/golden/` for comparison. Use `--update-golden` only when you're certain the new output is correct.

## Known Limitations

1. **Subjectivity**: Review quality is inherently subjective. Evals capture our best judgment.
2. **Finding ID Mapping**: Exact finding ID matching may miss semantic equivalents.
3. **Context Dependency**: Expected findings depend on artifact type and context.
4. **Calibration Drift**: Models and prompts change over time, requiring recalibration.
5. **Resource Constraints**: Running full eval suite on every change is expensive.

## Best Practices

1. **Start Simple**: Add basic evals before complex ones.
2. **Calibrate Gradually**: Build intuition by adding cases incrementally.
3. **Review Traces**: Always inspect traces for unexpected behavior.
4. **Document Decisions**: Explain why expected findings are what they are.
5. **Balance Coverage**: Don't over-optimize for edge cases.
6. **Version Control**: Commit eval configs and traces to track changes.
7. **Human-in-the-Loop**: Manually review a sample of cases regularly.

## Troubleshooting

### Evals Not Loading
- Check YAML syntax
- Verify file paths are correct
- Ensure artifact_type matches enum values

### Metrics Not Calculating
- Check if review output has expected fields
- Verify findings have `tag` or `id` fields
- Inspect trace JSON for debugging

### Regression Detected
- Review what changed in prompt/rubric/validator
- Compare traces before and after change
- Run individual evals to isolate issue
- Consider if regression is acceptable trade-off

### Tone Fails
- Check for toxic phrases in output
- Review forbidden behaviors list
- Inspect finding text for sarcasm or accusations

## Contributing

When adding new evals:

1. Follow existing naming conventions
2. Include comprehensive notes in YAML
3. Add to expected_findings.yaml if case represents new pattern
4. Update this README if adding new artifact type
5. Get review from maintainers before committing

## Resources

- [Finding Taxonomy](rubrics/finding_taxonomy.yaml) - All normalized finding IDs
- [Scoring Rubric](rubrics/scoring_rubric.yaml) - Score bands and dimensions
- [Regression Thresholds](rubrics/regression_thresholds.yaml) - Quality thresholds
- [Expected Findings](expected/expected_findings.yaml) - Aggregated expectations
- [Judge Prompts](judges/) - Evaluation contracts for LLM-as-judge
