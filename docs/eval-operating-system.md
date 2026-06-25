# Eval Operating System

## Why this matters

Shokunin Review should not only run evals. It should use evals to continuously improve review quality.

The target loop is:

```text
run evals
→ inspect failures
→ cluster recurring error patterns
→ update validators and rubrics
→ mine few-shot examples
→ rerun regression
→ publish trust report
```

This prevents false confidence from AI-generated reviews and makes quality improvements measurable.

## Core components

| Component         | Purpose                                                    | Current status                                    | Next step                                      |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Synthetic cases   | Create test cases before enough real-world artifacts exist | Partially implemented through existing eval cases | Add generator docs and seeds                   |
| Expected findings | Define what the reviewer must detect                       | Implemented / WIP                                 | Improve coverage and consistency               |
| Judge rubrics     | Define what counts as a good finding and a good review     | Roadmap / new docs                                | Add finding-quality and review-quality rubrics |
| Error analysis    | Understand why evals fail                                  | New MVP layer                                     | Add error taxonomy and report format           |
| Trace clustering  | Group repeated failures across eval traces                 | Roadmap                                           | Add trace clustering script later              |
| Few-shot mining   | Turn failures into examples for validators and judges      | Roadmap                                           | Add few-shot folder and examples later         |
| Regression        | Detect quality drift after changes                         | Partially implemented                             | Add stronger baseline governance               |
| Trust report      | Explain to stakeholders why evals are credible             | Roadmap                                           | Add report template later                      |

## What this prevents

**False confidence:** AI reviewers can generate polished but incorrect findings. Without systematic error analysis, these errors accumulate silently.

**Quality drift:** Validator changes that improve one case can regress others. Regression detection prevents this.

**Unmeasurable improvement:** Without rubrics and error taxonomies, "improved review quality" is subjective. The Eval Operating System makes it measurable.

## Current implementation

### Implemented

- Error taxonomy (`harness/error_analysis/error_taxonomy.yaml`)
- Finding quality rubric (`harness/rubrics/finding-quality-rubric.yaml`)
- Review quality rubric (`harness/rubrics/review-quality-rubric.yaml`)
- Error analysis loop documentation (`docs/error-analysis-loop.md`)
- Initial error analysis script (`scripts/analyze-eval-errors.sh`)
- Synthetic and few-shot roadmap structure (`harness/synthetic/`, `harness/few_shot/`)

### Partially implemented

- Expected findings (exists in eval cases, needs consistency improvements)
- Regression testing (basic structure exists, needs stronger governance)

### Roadmap

- Trace clustering automation
- Few-shot mining automation
- Synthetic eval generation
- Stakeholder trust reports
- Automated rubric updates based on error patterns

## How to use

1. Run evals: `shokunin eval`
2. Inspect failures in `harness/reports/latest.md`
3. Run error analysis: `bash scripts/analyze-eval-errors.sh`
4. Classify failures using error taxonomy
5. Update validators or rubrics based on patterns
6. Rerun regression to confirm improvements
7. Document changes in CHANGELOG.md

## Documentation

- [Eval Quality Definition](./eval-quality-definition.md) — What "good review output" means
- [Error Analysis Loop](./error-analysis-loop.md) — How to analyze and fix eval failures
- [Finding Quality Rubric](../harness/rubrics/finding-quality-rubric.yaml) — Criteria for good findings
- [Review Quality Rubric](../harness/rubrics/review-quality-rubric.yaml) — Criteria for good reviews
- [Error Taxonomy](../harness/error_analysis/error_taxonomy.yaml) — Error types for classification
