# Shokunin Strategy Skill

Reviews and improves product strategy documents.

## Purpose

Ensures strategy documents have clear thesis, evidence, and trade-offs.

## When to Use

Use this skill when reviewing:
- Product Strategy documents
- Strategic memos
- Strategic bets
- Go-to-market strategies

## Workflow

1. **Analyze thesis** — Is strategic choice clear?
2. **Check segment** — Is target customer defined?
3. **Verify evidence** — Is opportunity sized?
4. **Review trade-offs** — Are trade-offs acknowledged?
5. **Assess sequencing** — Is phasing logical?
6. **Validate metrics** — Are success metrics defined?

## Inputs

- Strategy document
- Market context (optional)

## Output Contract

Returns strategy-specific findings:
- Strategic thesis clarity
- Target segment definition
- Opportunity sizing (TAM, SAM, SOM)
- Trade-offs acknowledgment
- Sequencing logic
- Success metrics

## Strategy-Specific Checks

### Strategic Thesis
- Is choice explicit?
- Is it actionable?
- Is it differentiated?

### Target Segment
- Is ICP defined?
- Is segment size estimated?
- Are characteristics clear?

### Opportunity Sizing
- Is TAM quantified?
- Is SAM defined?
- Is SOM calculated?
- Is revenue potential estimated?

### Trade-offs
- Are trade-offs explicit?
- Is rationale provided?
- Are mitigation strategies included?

## Example

```bash
# Input: docs/strategy.md

# Output:
🟠 Needs major fixes — 64/100

Blockers:
1. [opportunity-fog] Market opportunity not quantified
2. [tradeoff-gap] No trade-offs acknowledged
3. [segment-fog] Target segment not clearly defined

Recommend: Add TAM/SAM/SOM sizing, acknowledge trade-offs
```
