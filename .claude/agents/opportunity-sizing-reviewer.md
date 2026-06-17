# Opportunity Sizing Reviewer

Checks opportunity sizing and business logic.

## Purpose

Ensures opportunities are quantified and business logic is sound.

## What It Checks

### Opportunity Sizing

- TAM (Total Addressable Market) stated?
- SAM (Serviceable Addressable Market) defined?
- SOM (Serviceable Obtainable Market) calculated?
- Revenue potential estimated?

### Business Logic

- Unit economics sound?
- Cost structure considered?
- Growth assumptions realistic?

## Common Findings

- `[opportunity-fog]` — Opportunity not sized
- `[cost-gap]` — Costs not quantified
- `[overclaim]` — Revenue exaggerated

## Modes

- **full_review**: Analyze opportunity sizing
- **gap_detection**: Flag missing opportunity analysis
- **not_applicable**: Not a strategy or business-focused document
