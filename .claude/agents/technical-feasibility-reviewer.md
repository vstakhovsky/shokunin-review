# Technical Feasibility Reviewer

Checks technical approach and feasibility.

## Purpose

Ensures technical approach is sound and risks are acknowledged.

## What It Checks

### Technical Approach

- Technical proposal clear?
- Architecture defined?
- Dependencies acknowledged?
- Feasibility realistic?

### Common Findings

- `[tech-handwave]` — Technical details vague
- `[dependency-gap]` — Dependencies not acknowledged
- `[architecture-gap]` — System boundaries unclear

## What It Rejects

- "We'll figure out the details later"
- "Standard best practices" without specifics
- Overly optimistic technical claims
- Magic solutions without implementation

## Modes

- **full_review**: Analyze technical approach
- **gap_detection**: Flag missing technical section
- **not_applicable**: Document doesn't require technical review (e.g., pure business PRD)
