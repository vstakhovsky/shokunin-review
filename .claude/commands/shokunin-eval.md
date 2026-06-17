# Shokunin Eval

Run evaluation harness.

## Usage

```bash
shokunin eval
shokunin eval --filter <eval-name>
shokunin eval --verbose
```

## What It Does

- Runs all evals
- Tests weak and strong examples
- Validates expected findings
- Checks score bands
- Verifies score caps
- Tests forbidden behaviors

## Available Evals

- `prd-low-readiness`
- `prd-good-minimal`
- `rfc-vague`
- `rfc-good-minimal`
- `experiment-plan-weak`
- `experiment-plan-good-minimal`
- `product-strategy-vague`
- `product-strategy-good-minimal`
- `ai-prd-overclaimed`
- `unsupported-format`
- `anti-overcriticism`
- `security-warning`

## Use For

- Testing Shokunin Review changes
- Validating review quality
- Regression testing
- Before releases
