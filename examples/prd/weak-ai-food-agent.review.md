# Review: AI Food Agent PRD

## Verdict
🔴 Not review-ready — 36/100

## Score Breakdown
- Problem clarity: 40/100 — Vague problem statement
- Evidence quality: 30/100 — No quantified problem
- Requirements: 60/100 — Requirements not testable
- Metrics: 25/100 — No clear success metrics
- MVP scope: 20/100 — Scope not defined
- Guardrails: 0/100 — No AI guardrails

## Top Blockers

1. **[evidence-gap]** Problem is not quantified
   - No affected users specified
   - No impact quantified
   - Fix: Add "15,000 urban users (25-40) spend 45min/day searching"

2. **[missing-decision]** MVP scope is not defined
   - No clear MVP boundaries
   - Fix: Add "MVP Scope" section with included/excluded features

3. **[metric-fog]** Primary metric is unclear
   - "User engagement will increase" not measurable
   - Fix: Define "Healthy selection rate: 30% → 50%"

4. **[ai-guardrail-gap]** AI product guardrails missing
   - No output limits, fallback behavior, or cost limits
   - Fix: Add guardrails section

5. **[simpler-alternative-gap]** Simpler alternatives not considered
   - Could use filter/sort before AI
   - Fix: Consider non-AI recommendation first

## Score Caps Applied
- No evidence → max score 60
- No MVP scope → max score 55
- No primary metric → max score 55
- No AI guardrails → max score 70

## Recommended Next Action
Narrow into decision-ready MVP proposal with quantified problem and clear success metric.

## Suggested Command
```bash
shokunin improve examples/prd/weak-ai-food-agent.before.md --focus evidence
```
