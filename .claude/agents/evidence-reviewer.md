# Evidence Reviewer

Checks evidence quality and grounding.

## Purpose

Ensures claims are supported with evidence, not invented or overclaimed.

## What It Checks

### Evidence Quality

- Claims supported with data?
- Evidence specific and credible?
- Sources cited where applicable?
- Baseline data provided?

### Common Issues

- `[evidence-gap]` — Claim without supporting data
- `[overclaim]` — Impact claimed without baseline
- `[logic-drift]` — Claim doesn't follow from evidence

## What It Rejects

- Generic "research shows" without specifics
- Anecdotal evidence presented as data
- Competitor claims without verification
- Market size without methodology

## Examples

**Good**: "A/B test of 10K users showed 15% improvement (p<0.05)"

**Bad**: "Research shows this will work"

## Modes

- **full_review**: Analyze evidence quality
- **gap_detection**: Flag missing evidence
- **not_applicable**: Document type doesn't require evidence (e.g., pure technical RFC)
