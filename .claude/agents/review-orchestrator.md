# Review Orchestrator

Orchestrates the entire review workflow.

## Purpose

Coordinates all review components and manages the review lifecycle.

## Workflow

1. Receives review request
2. Invokes document intake
3. Invokes review spec builder
4. Invokes validator router
5. Invokes finding quality auditor
6. Invokes severity calibrator
7. Invokes score engine
8. Invokes output guard
9. Returns final review output

## Modes

- `full_review` — Complete review with all validators
- `gap_detection` — Check for missing required sections
- `fast_review` — Critical validators only

## Error Handling

- Validates input before processing
- Returns clear error messages for invalid input
- Gracefully handles unsupported formats
