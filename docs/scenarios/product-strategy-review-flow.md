# Product Strategy Review Flow

**Product Strategy document review workflow.**

---

## User Context

**User**: Product Lead
**Goal**: Review strategy before exec presentation
**Document**: `docs/ai-growth-strategy.md`

---

## Command

```bash
shokunin review docs/ai-growth-strategy.md
```

---

## Output

```
🟠 Needs major fixes — 64/100
Confidence: Medium

Why:
Clear strategic thesis but missing evidence for opportunity
size and no acknowledgment of trade-offs.

Top blockers:
1. [opportunity-fog] Market opportunity not quantified.
2. [tradeoff-gap] No trade-offs acknowledged.
3. [segment-fog] Target segment not clearly defined.
4. [evidence-gap] Strategic claims lack supporting data.
5. [strategy-fog] Success metrics not tied to thesis.

Score caps applied:
- No opportunity sizing → max score 65
- No trade-offs → max score 70
- Generic strategy language → max score 55

Recommended next action:
Quantify opportunity (TAM, SAM, SOM).
Acknowledge strategic trade-offs.
Define target segment with characteristics.

Run:
shokunin improve docs/ai-growth-strategy.md --focus opportunity
```

---

## Key Strategy Findings

### Opportunity Fog

```
Market opportunity not quantified.

Issue:
"This is a large market opportunity" without numbers.

Recommended fix:
Add opportunity sizing:
- TAM: $12B (US food delivery)
- SAM: $2B (our 5 markets)
- SOM: $48M (urban millennials, high-frequency)
- Revenue potential: $1.5M/year
```

### Trade-off Gap

```
No strategic trade-offs acknowledged.

Issue:
Strategy presented as all upside, no downsides.

Recommended fix:
Acknowledge trade-offs:
- Focus on reliability vs growth speed
- Invest in infrastructure vs new features
- Accept short-term costs for long-term positioning
```

### Segment Fog

```
Target segment not clearly defined.

Issue:
"We're targeting food delivery users" too broad.

Recommended fix:
Define specific segment:
- Urban millennials (ages 25-40)
- High-frequency users (3+ orders/week)
- Current spend: $48/month/user
- Pain point: Unreliable delivery times
```

---

## Strategy Score Ranges

| Score | Meaning | Exec Ready? |
|-------|---------|------------|
| 90-100 | Ready to present | Yes |
| 75-89 | Minor gaps | Yes (after fixes) |
| 60-74 | Major gaps | No |
| 40-59 | Needs revision | No |
| 0-39 | Not a strategy | No |

---

## Common Strategy Issues

### Vague Thesis

**❌ Bad**: "We'll grow by innovating"

**✅ Good**:
```
Strategic Thesis:
Focus on urban millennials (25-40) with real-time tracking
to reduce cancellations 40%, capturing $2.4M annually.
```

### Missing Evidence

**❌ Bad**: "Research shows this is a good opportunity"

**✅ Good**:
```
Evidence:
- Market: $12B US food delivery, 15% YoY growth
- Customer: 78% want tracking (survey n=1,200)
- Competitive: Competitor A cancellations 15%→8% with tracking
- Internal: A/B test showed 10% cancellation reduction
```

### No Trade-offs

**❌ Bad**: "This strategy has no downsides"

**✅ Good**:
```
Trade-offs:
- Reliability vs speed: Accept 3-month delay for quality
- Infrastructure vs features: Pause new features for tracking
- Short-term vs long-term: Accept $200K Q2 cost for $1.5M annual
```

---

**docs/scenarios/product-strategy-review-flow.md — Strategy review workflow.**
