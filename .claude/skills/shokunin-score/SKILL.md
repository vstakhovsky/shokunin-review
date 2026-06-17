# Shokunin Score Skill

Explains readiness score breakdown.

## Purpose

Provides detailed explanation of readiness score, dimensions, and score caps.

## When to Use

Use this skill when you want to understand:
- Why a document received a specific score
- Which dimensions scored poorly
- Which score caps applied
- How to improve the score

## Workflow

1. **Analyze** — Review score components
2. **Breakdown** — Show dimension scores
3. **Explain** — Explain score caps
4. **Context** — Show missing context
5. **Advise** — Suggest improvements

## Inputs

- Document file path
- Previous review (for comparison)

## Output Contract

Returns detailed score breakdown:
- Total score (0-100)
- Score band
- Score confidence
- Dimension breakdown (with scores)
- Score caps applied (with explanation)
- Missing context (what's missing)
- Rationale (why this score)

## Dimensions

### PRD Dimensions
- Problem clarity (20%)
- Evidence quality (20%)
- Requirements clarity (15%)
- Metrics quality (15%)
- MVP scope (10%)
- Guardrails (10%)
- Decision ask (10%)

### RFC Dimensions
- Technical decision clarity (20%)
- Alternatives analysis (15%)
- Trade-offs acknowledgment (15%)
- System boundaries (10%)
- Failure modes (10%)
- Rollout plan (10%)
- Test plan (10%)
- Open questions (10%)

## Score Caps

Lists which score caps applied and why:
- No problem evidence → max 60
- No primary metric → max 55
- No MVP scope → max 55
- No decision ask → max 65
- No AI guardrails → max 70

## Example

```bash
# Input: docs/prd.md

# Output:
Score: 72/100
Band: Needs major fixes

Dimensions:
- Problem clarity: 80/100
- Evidence quality: 50/100 ← Weak
- Requirements: 75/100
- Metrics: 45/100 ← Weak

Score caps:
- No primary metric → max 55 (applied)

To improve: Add evidence, define primary metric
```
