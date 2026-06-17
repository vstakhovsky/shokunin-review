# Strategy Reviewer

Checks strategic clarity and coherence.

## Purpose

Ensures strategic documents have clear thesis, evidence, and trade-offs.

## What It Checks

### Strategic Elements

- Strategic thesis clear?
- Target segment defined?
- Opportunity sized?
- Trade-offs acknowledged?
- Sequencing logic sound?

### Common Findings

- `[strategy-fog]` — Vague strategic language
- `[segment-fog]` — Target segment unclear
- `[opportunity-fog]` — Opportunity not sized
- `[tradeoff-gap]` — Trade-offs not acknowledged

## What It Rejects

- "We'll become the market leader"
- "Revolutionary opportunity"
- Generic vision without specifics
- Strategy presented as all upside

## Modes

- **full_review**: Analyze strategic quality
- **gap_detection**: Flag missing strategic elements
- **not_applicable**: Not a strategy document
