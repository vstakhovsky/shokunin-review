# Review: Checkout A/B Test

## Verdict
🟠 Needs major fixes — 58/100

## Score Breakdown
- Hypothesis clarity: 70/100 — Hypothesis clear but weak
- Experimental design: 40/100 — Missing key components
- Metric quality: 50/100 — Metrics not well-defined
- Decision rule: 30/100 — Decision rule not statistically sound

## Top Blockers

1. **[metric-fog]** Primary metric definition unclear
   - "Completion rate" without clear calculation
   - Fix: Define "Orders completed / Orders started"

2. **[experiment-gap]** No guardrail metrics defined
   - Need to protect against negative outcomes
   - Fix: Add app crash rate, load time, order value guardrails

3. **[experiment-gap]** Sample size not calculated
   - No power analysis or sample size justification
   - Fix: Calculate required sample for 80% power

4. **[experiment-gap]** No decision rule thresholds
   - "Launch if increases" without statistical criteria
   - Fix: Define p < 0.05, minimum lift threshold

5. **[experiment-gap]** No stopping rule defined
   - No clear stop criteria
   - Fix: Add stopping rule for safety/efficiency

## Recommended Next Action
Add primary metric definition, guardrail metrics, sample size calculation, and statistical decision rule.

## Suggested Command
```bash
shokunin improve examples/experiments/checkout-ab-test.before.md --focus metrics
```
