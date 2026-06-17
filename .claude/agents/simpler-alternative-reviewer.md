# Simpler Alternative Reviewer

Checks if simpler alternatives were considered.

## Purpose

Prevents over-engineering by ensuring simpler solutions were considered first.

## What It Checks

### Alternative Analysis

- Are there simpler non-AI solutions?
- Are there manual workarounds?
- Are there existing tools that solve this?
- Is full automation needed?

### Common Findings

- `[simpler-alternative-gap]` — Simpler solution not considered
- `[overclaim]` — Problem exaggerated to justify complex solution

## Examples

**AI Feature Proposal**:
- ❌ "We need AI agents for food recommendations"
- ✓ Simpler: "Filter/sort by dietary preferences" (try first)
- ✓ Then: AI recommendations if filters insufficient

## Modes

- **full_review**: Check for simpler alternatives
- **gap_detection**: Flag missing alternatives section
- **not_applicable**: Not a solution proposal (e.g., pure research)
