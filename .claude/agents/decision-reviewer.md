# Decision Reviewer

Checks decision clarity and completeness.

## Purpose

Ensures documents have clear decision asks and stakeholders know what to decide.

## What It Checks

### PRD

- Decision ask present?
- Decision maker identified?
- Timeline for decision stated?
- Decision options clear?

### RFC

- Technical decision clear?
- Implementation decision stated?
- Approval requirements defined?

### Experiment Plan

- Decision rule defined?
- Statistical thresholds stated?
- Go/no-go criteria clear?

### Product Strategy

- Strategic choice explicit?
- Commitment required clear?
- Decision timeline stated?

## Common Findings

- `[missing-decision]` — No decision ask
- `[decision-fog]` — Decision unclear
- `[logic-drift]` — Decision doesn't align with content

## Modes

- **full_review**: Analyze decision quality
- **gap_detection**: Flag missing decision section
- **not_applicable**: Document doesn't require decision (informational only)
