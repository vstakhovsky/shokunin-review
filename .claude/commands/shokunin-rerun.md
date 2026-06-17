# Shokunin Rerun

Re-review document and compare with original.

## Usage

```bash
shokunin rerun <revised-file> --compare <original-file>
```

## What It Shows

- Before/after scores
- Score delta
- What improved
- Remaining blockers
- Recommended next action

## Example

```bash
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
```

Output:
```
Before: 36/100
After:  79/100
Delta:  +43 points

Improvements:
✓ Problem quantified
✓ MVP scope defined
✓ Primary metric added

Remaining:
- Competitor evidence (nice-to-have)
- Cost estimation (nice-to-have)
```

## Use When

- Made changes based on review
- Want to show progress
- Need to verify fixes worked
