# Re-Review Flow

**Before/after comparison workflow.**

---

## User Context

**User**: Made changes based on review
**Goal**: See progress from changes
**Documents**: `docs/prd-v1.md` (original), `docs/prd-v2.md` (revised)

---

## Command

```bash
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
```

---

## Output

```
🔄 Re-Review Comparison

Before: 36/100 (Not review-ready)
After:  79/100 (Ready with minor fixes)
Delta:  +43 points (+119%)
Confidence: High

✓ Improvements:
1. Problem quantified
   Before: "Users have trouble finding healthy food"
   After: "15,000 urban users (25-40) spend 45min/day searching"
   Impact: +15 points (evidence quality)

2. MVP scope defined
   Before: No MVP scope
   After: "AI agent for recommendations only. Excluded: grocery, social"
   Impact: +12 points (scope clarity)

3. Primary metric added
   Before: No success metric
   After: "Healthy selection rate: 30% → 50%"
   Impact: +10 points (metric quality)

4. AI guardrails included
   Before: No guardrails
   After: "Max 10/day, cost limit $0.01/rec"
   Impact: +8 points (safety)

Remaining blockers:
1. [evidence-gap] Competitor analysis missing
2. [cost-gap] Implementation cost not estimated

Score caps removed:
✓ No evidence cap (60) - Evidence added
✓ No MVP scope cap (55) - Scope defined
✓ No primary metric cap (55) - Metric added

Status: Ready for stakeholder review (with minor fixes)
Recommended next action:
Add competitor analysis (1-2 hours)
Add cost estimate (1 hour)
Expected final score: 88-92/100
```

---

## Comparison Details

### Score Breakdown

| Dimension | Before | After | Delta |
|-----------|--------|-------|-------|
| Problem clarity | 40/100 | 85/100 | +45 |
| Evidence quality | 30/100 | 70/100 | +40 |
| Requirements clarity | 60/100 | 75/100 | +15 |
| Metrics quality | 25/100 | 80/100 | +55 |
| MVP scope | 20/100 | 85/100 | +65 |
| Guardrails | 0/100 | 80/100 | +80 |
| Decision ask | 70/100 | 75/100 | +5 |

### Findings Comparison

**Before**: 12 findings (5 blockers, 7 high)
**After**: 3 findings (0 blockers, 2 high, 1 low)

**Resolved**:
- ✓ Evidence gap (problem)
- ✓ Missing decision (MVP scope)
- ✓ Metric fog (primary metric)
- ✓ AI guardrail gap
- ✓ Overclaim (business impact)

**Remaining**:
- ○ Competitor evidence (nice-to-have)
- ○ Cost estimation (nice-to-have)

---

## When to Use Re-Review

### After Making Changes

Use when:
- Made edits based on review
- Want to see progress
- Need to verify fixes worked

### Before Stakeholder Meeting

Use when:
- Need to show improvement
- Score is 75-85 range
- Want to demonstrate readiness

### For Iteration

Use when:
- Multiple revision cycles
- Tracking progress over time
- Learning what improves score

---

## Re-Review Benefits

### Objective Measurement

- Quantifies improvement
- Shows specific progress
- Validates fixes worked

### Priority Guidance

- Identifies remaining blockers
- Estimates effort to completion
- Recommends next actions

### Motivation

- Shows progress visually
- Demonstrates improvement
- Encourages continued iteration

---

## Re-Review vs Simple Review

### Simple Review

```bash
shokunin review docs/prd-v2.md
```

Shows:
- Current score only
- Current findings
- No comparison

### Re-Review

```bash
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
```

Shows:
- Before/after scores
- Delta calculation
- What improved
- What remains
- Score caps removed

---

## Best Practices

### Save Versions

Keep original before revising:

```bash
# Before making changes
cp docs/prd.md docs/prd-v1.md

# Make changes to docs/prd.md

# Compare
shokunin rerun docs/prd.md --compare docs/prd-v1.md
```

### Iterate Quickly

Don't wait for perfect:
1. Review (36/100)
2. Improve (make top 3 fixes)
3. Re-review (65/100)
4. Improve (make next 3 fixes)
5. Re-review (85/100)
6. Ready for stakeholders

### Track Progress

```bash
# Version history
shokunin rerun docs/prd-v3.md --compare docs/prd-v2.md
shokunin rerun docs/prd-v4.md --compare docs/prd-v3.md
```

---

## Example Progression

### Week 1: First Draft

```bash
shokunin review docs/prd.md
# Score: 36/100
```

### Week 1: After Improve

```bash
# Made fixes
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
# Score: 65/100 (+29 points)
```

### Week 2: After More Fixes

```bash
# More fixes
shokunin rerun docs/prd-v3.md --compare docs/prd-v2.md
# Score: 82/100 (+17 points)
```

### Week 2: Final Polish

```bash
# Final polish
shokunin rerun docs/prd-v4.md --compare docs/prd-v3.md
# Score: 91/100 (+9 points)
# Ready for stakeholders
```

---

**docs/scenarios/re-review-flow.md — Before/after comparison workflow.**
