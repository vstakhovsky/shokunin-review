# Shokunin Review PRD

Review Product Requirements documents.

## Usage

```bash
shokunin review-prd <file>
```

## What It Checks

- Problem clarity
- User segments
- Evidence quality
- Requirements testability
- Success metrics
- MVP scope
- AI guardrails (if applicable)
- Decision ask

## Score Caps

- No evidence → max 60
- No primary metric → max 55
- No MVP scope → max 55
- No decision ask → max 65
- No AI guardrails → max 70

## Example

```bash
shokunin review-prd docs/feature-prd.md
```
