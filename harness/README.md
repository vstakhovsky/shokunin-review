# Harness

Evaluation harness for Shokunin Review.

## Purpose

Executable test suite that validates Shokunin Review behavior and output quality.

## What It Does

- Tests weak and strong examples
- Validates expected findings
- Checks score bands
- Verifies score caps
- Tests forbidden behaviors
- Provides regression testing

## Structure

```
harness/
├── README.md
├── evals/          # Test cases
├── rubrics/        # Scoring criteria
├── golden/         # Expected outputs
└── traces/         # Review execution traces
```

## Running Evals

```bash
# Run all evals
shokunin eval

# Run specific eval
shokunin eval --filter prd-low-readiness

# Run with verbose output
shokunin eval --verbose
```

## Eval Categories

### Artifact Type Evals
- `prd-low-readiness` — Weak PRD should score low
- `prd-good-minimal` — Good PRD should score high
- `rfc-vague` — Vague RFC should score low
- `rfc-good-minimal` — Good RFC should score high
- `experiment-plan-weak` — Weak experiment plan should score low
- `experiment-plan-good-minimal` — Good experiment plan should score high
- `product-strategy-vague` — Vague strategy should score low
- `product-strategy-good-minimal` — Good strategy should score high

### Special Case Evals
- `ai-prd-overclaimed` — Overclaimed AI PRD should be caught
- `unsupported-format` — Unsupported format handled correctly
- `anti-overcriticism` — Good documents not overcriticized
- `security-warning` — Sensitive content triggers warning

## Using Evals

### For Development

Run evals before committing changes:
```bash
shokunin eval
```

### For Validation

Validate changes pass all evals:
```bash
shokunin eval --verbose
```

### For Debugging

Run specific eval to debug issue:
```bash
shokunin eval --filter prd-low-readiness --verbose
```

## Adding New Evals

1. Create YAML file in `harness/evals/`
2. Define input, expected tags, score band
3. Add forbidden behaviors
4. Test with `shokunin eval`

## Golden Outputs

Expected outputs stored in `harness/golden/`.

Used for regression testing to ensure output quality doesn't degrade.

## Rubrics

Scoring rubrics in `harness/rubrics/` define:
- Readiness score calculation
- Score cap rules
- Finding quality criteria
- Validator coverage requirements

## Traces

Execution traces stored in `harness/traces/` (if enabled).

Used for debugging and analysis.
