# Experiment Plan Review Flow

**Experiment Plan review workflow.**

---

## User Context

**User**: Data Scientist
**Goal**: Review experiment before launch
**Document**: `docs/checkout-ab-test.md`

---

## Command

```bash
shokunin review docs/checkout-ab-test.md
```

---

## Output

```
🟠 Needs major fixes — 68/100
Confidence: High

Why:
Clear hypothesis and primary metric, but missing guardrail
metrics and decision rule not statistically sound.

Top blockers:
1. [experiment-gap] No guardrail metrics defined.
2. [metric-fog] Decision rule lacks statistical threshold.
3. [experiment-gap] Sample size not calculated.
4. [experiment-gap] SRM (sample ratio mismatch) not addressed.
5. [experiment-gap] No stopping rule defined.

Score caps applied:
- No guardrail metrics → max score 70
- No decision rule → max score 55

Recommended next action:
Add guardrail metrics (crash rate, app performance).
Calculate required sample size (power analysis).
Define stopping rule with statistical thresholds.

Run:
shokunin improve docs/checkout-ab-test.md --focus metrics
```

---

## Key Experiment Findings

### Experiment Gap

```
No guardrail metrics defined.

Issue:
Only measuring success metric, no protection against harm.

Recommended fix:
Add guardrail metrics:
- App crash rate: < 0.1% (rollback if exceeded)
- Page load time: < 3 seconds (rollback if exceeded)
- Order value: No decrease > 5% (rollback if exceeded)
- Support tickets: No increase > 20% (rollback if exceeded)
```

### Metric Fog

```
Decision rule lacks statistical threshold.

Issue:
"Launch if checkout rate increases" without criteria.

Recommended fix:
Define decision rule:
- Launch if: p < 0.05 (statistically significant)
  AND treatment checkout rate > control
  AND guardrail metrics not violated
- Sample size: 4,600 per group (80% power, MDE 15%)
- Duration: 4 weeks at current traffic
```

---

## Experiment Score Ranges

| Score | Meaning | Launch? |
|-------|---------|--------|
| 90-100 | Ready to launch | Yes |
| 75-89 | Minor issues | Yes (after fixes) |
| 60-74 | Major issues | No |
| 40-59 | Needs revision | No |
| 0-39 | Not an experiment | No |

---

## Common Experiment Issues

### No Control Group

**❌ Bad**: "Measure before and after"

**✅ Good**: "A/B test with 50/50 randomization"

### No Decision Rule

**❌ Bad**: "Launch if it works"

**✅ Good**:
```
Decision Rule:
Launch if:
- p < 0.05 (two-tailed)
- AND relative lift > 10%
- AND guardrails not violated
- Duration: Minimum 3 weeks
```

### No Guardrails

**❌ Bad**: "Only measure conversion"

**✅ Good**:
```
Guardrails:
- App crash rate: < 0.1%
- Page load time: < 3s
- Order value: No decrease > 5%
```

---

**docs/scenarios/experiment-plan-review-flow.md — Experiment review workflow.**
