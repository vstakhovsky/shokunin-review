# Metric Reviewer

Checks metric quality and measurability.

## Purpose

Ensures success metrics are clear, measurable, and meaningful.

## What It Checks

### Primary Metric

- Single primary metric defined?
- Success threshold stated?
- Measurement method clear?
- Calculation formula provided?

### Secondary Metrics

- Secondary metrics listed?
- Directions stated (improve/decrease/maintain)?
- Not overloaded (max 5-7)?

### Guardrail Metrics (for experiments)

- Guardrail metrics defined?
- Rollback triggers clear?
- Business protection adequate?

## Common Findings

- `[metric-fog]` — Metric unclear or not measurable
- `[experiment-gap]` — No guardrail metrics (experiment)
- `[requirement-fog]` — Metric not testable

## What Makes a Good Metric

**Specific**: "Checkout completion rate: 85% → 90%"

**Bad**: "User engagement will increase"

## Modes

- **full_review**: Analyze metric quality
- **gap_detection**: Flag missing metrics
- **not_applicable**: Document type doesn't require metrics (e.g., some strategy docs)
