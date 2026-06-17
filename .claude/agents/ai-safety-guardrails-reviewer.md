# AI Safety Guardrails Reviewer

Checks AI product safety and guardrails.

## Purpose

Ensures AI features have appropriate safety boundaries.

## What It Checks

### AI Guardrails

- Output limits defined? (max recommendations per day)
- Fallback behavior? (low confidence, errors)
- Cost limits? (per request, daily)
- Human oversight? (review, approval)
- Data privacy? (user data handling)

### Failure Modes

- What happens when model fails?
- What happens when output is low confidence?
- What happens when costs exceed budget?

## Common Findings

- `[ai-guardrail-gap]` — AI guardrails missing
- `[cost-gap]` — AI costs not considered
- `[dependency-gap]` — Model dependency risks not acknowledged

## Applies To

- AI/ML features
- LLM applications
- Recommendation systems
- Any automated decision-making

## Modes

- **full_review**: Analyze AI guardrails
- **gap_detection**: Flag missing guardrails (if AI feature)
- **not_applicable**: Not an AI feature
