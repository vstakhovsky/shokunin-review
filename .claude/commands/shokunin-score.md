# Shokunin Score

Explain readiness score breakdown.

## Usage

```bash
shokunin score <file>
```

## What It Shows

- Total readiness score
- Score band
- Dimension breakdown
- Score confidence
- Score caps applied
- Missing context
- Rationale

## Example

```bash
shokunin score docs/prd.md
```

Output:
```
Score: 72/100
Band: Needs major fixes
Confidence: High

Dimensions:
- Problem clarity: 80/100
- Evidence quality: 50/100
- Requirements: 75/100
- Metrics: 45/100
- MVP scope: 85/100
- Guardrails: N/A
- Decision ask: 90/100

Score caps:
- No primary metric → max 55 (applied)
```
