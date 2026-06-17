# Review: Risk Engine RFC

## Verdict
🟠 Needs revision — 52/100

## Score Breakdown
- Technical decision: 60/100 — Vague technical approach
- Alternatives: 30/100 — Only one alternative mentioned
- Trade-offs: 20/100 — Trade-offs not acknowledged
- System boundaries: 40/100 — Boundaries unclear
- Failure modes: 10/100 — Failure modes not addressed
- Rollout plan: 50/100 — Plan too vague
- Test plan: 60/100 — Test plan not specific

## Top Blockers

1. **[tech-handwave]** Technical details vague
   - "We'll use machine learning" without specifics
   - Fix: Describe model architecture, training approach

2. **[simpler-alternative-gap]** Alternatives not analyzed
   - Only "rule-based system" mentioned
   - Fix: Add 2-3 alternatives with analysis

3. **[tradeoff-gap]** Trade-offs not acknowledged
   - "ML is more complex but more accurate" without specifics
   - Fix: Quantify complexity vs accuracy trade-off

4. **[architecture-gap]** System boundaries unclear
   - No clear system boundaries or integration points
   - Fix: Define system boundaries and interfaces

5. **[dependency-gap]** Dependencies not acknowledged
   - Data sources not mentioned
   - Fix: List required data sources and dependencies

## Recommended Next Action
Add technical details, analyze alternatives, define system boundaries, address failure modes.

## Suggested Command
```bash
shokunin improve examples/rfc/vague-risk-engine.before.md --focus technical
```
