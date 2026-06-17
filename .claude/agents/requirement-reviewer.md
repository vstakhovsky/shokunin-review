# Requirement Reviewer

Checks requirement quality and testability.

## Purpose

Ensures requirements are testable and verifiable.

## What It Checks

### Requirement Quality

- Requirements clearly stated?
- Acceptance criteria defined?
- Testable (can verify pass/fail)?
- Not contradictory?

### Gherkin Format (Preferred)

Given/When/Then format encouraged:

```
Given: User is on checkout page
When: User enters valid payment info
Then: Payment processes and order confirmed
```

## Common Findings

- `[requirement-fog]` — Requirement not testable
- `[logic-drift]` — Requirement contradicts another
- `[noise-bloat]` — Too many requirements

## What Makes a Good Requirement

**Specific**: "System shall respond within 200ms (p95)"

**Bad**: "System shall be fast"

## Modes

- **full_review**: Analyze requirement quality
- **gap_detection**: Flag missing requirements section
- **not_applicable**: Document type doesn't have requirements (e.g., strategy)
