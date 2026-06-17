# Cost ROI Sanity Reviewer

Checks cost and ROI logic.

## Purpose

Ensures financial claims are sound and costs are considered.

## What It Checks

### Cost Analysis

- Implementation costs estimated?
- Ongoing costs considered?
- Unit economics sound?
- ROI period reasonable?

### Business Impact

- Revenue claims realistic?
- Baseline provided?
- Causal logic sound?
- Not overly optimistic?

## Common Findings

- `[cost-gap]` — Costs not estimated
- `[overclaim]` — Business impact claimed without baseline
- `[logic-drift]` — ROI logic flawed

## Modes

- **full_review**: Analyze cost/ROI logic
- **gap_detection**: Flag missing cost analysis
- **not_applicable**: Cost analysis not applicable (e.g., pure technical RFC)
