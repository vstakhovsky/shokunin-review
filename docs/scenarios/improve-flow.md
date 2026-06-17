# Improve Flow

**Document improvement workflow.**

---

## User Context

**User**: Received review with blockers
**Goal**: Get specific improvement suggestions
**Document**: `docs/prd.md` (scored 36/100)

---

## Command

```bash
shokunin improve docs/prd.md
```

---

## Output

```
📋 Improvement Suggestions

Priority 1 (Blockers) - Fix these first:

1. [evidence-gap] Add quantified problem statement
   Location: Problem Statement section
   
   Current:
   "Users have trouble finding healthy food"
   
   Suggested:
   "15,000 urban users (ages 25-40) struggle to find 
   healthy food options, spending 45min/day searching"
   
   Acceptance test:
   - Affected users quantified
   - Impact quantified (time spent)
   - Segment clearly defined

2. [missing-decision] Define MVP scope
   Location: Add "MVP Scope" section
   
   Suggested structure:
   ## MVP Scope
   
   **Included**:
   - AI agent for food recommendations
   - Basic dietary preferences
   - Top 10 restaurants
   
   **Excluded** (Phase 2):
   - Grocery delivery
   - Meal planning
   - Social features

Priority 2 (High):

3. [metric-fog] Define primary success metric
   "Healthy food selection rate: from 30% to 50%"
   
4. [ai-guardrail-gap] Add AI guardrails
   - Max recommendations per day: 10
   - Fallback for low confidence: Show popular items
   - Cost limit: $0.01 per recommendation

Estimated effort:
- Priority 1 fixes: 2-3 hours
- Priority 2 fixes: 1-2 hours
- Total: 3-5 hours

Expected score after fixes: 75-82/100

Run after making changes:
shokunin review docs/prd.md

Or compare before/after:
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
```

---

## Improve Options

### Focus on Specific Area

```bash
# Focus on structure
shokunin improve docs/prd.md --focus structure

# Focus on evidence
shokunin improve docs/prd.md --focus evidence

# Focus on metrics
shokunin improve docs/prd.md --focus metrics
```

---

## What Improve Does

### Analyzes Findings

1. Groups findings by priority
2. Identifies blockers vs nice-to-haves
3. Provides specific fixes
4. Estimates effort
5. Predicts score improvement

### Provides Examples

- Before/after for each issue
- Concrete text suggestions
- Acceptance criteria
- Location information

### Recommends Next Steps

- Which fixes to prioritize
- Estimated time to complete
- Expected score improvement
- Follow-up commands

---

## After Improve

### User Makes Changes

User edits `docs/prd.md` based on suggestions.

### Re-review

```bash
shokunin review docs/prd.md
```

**New Output**:
```
🟢 Ready with minor fixes — 79/100
Confidence: High

Improvements:
✓ Problem quantified
✓ MVP scope defined
✓ Primary metric added
✓ AI guardrails included

Remaining:
1. [evidence-gap] Competitor analysis needed
2. [cost-gap] Implementation cost not estimated

Progress: 36 → 79 (+43 points)
```

---

## Re-review Comparison

Better yet, compare versions:

```bash
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
```

**Output**:
```
Before: 36/100 (Not review-ready)
After:  79/100 (Ready with minor fixes)
Delta:  +43 points (+119%)

Improvements:
✓ Added quantified problem (affected 15K users)
✓ Defined MVP scope (AI agent only)
✓ Added primary metric (selection rate 30%→50%)
✓ Included AI guardrails (max 10/day)

Remaining blockers:
1. Competitor evidence (nice-to-have)
2. Cost estimation (nice-to-have)

Recommended next action:
Add competitor analysis and cost estimate for full review readiness.
```

---

## Improve Modes

### Default Improve

```bash
shokunin improve docs/prd.md
```

Focuses on all findings, prioritizes blockers.

### Focused Improve

```bash
shokunin improve docs/prd.md --focus metrics
```

Only provides suggestions related to metrics.

---

## When to Use Improve

### After Review

Use improve when:
- Review shows blockers
- Score < 75
- Need specific fix suggestions
- Not sure how to fix issues

### Before Stakeholder Review

Use improve when:
- Score 60-75 range
- Need to get to 85+
- Want to prioritize fixes

### For Learning

Use improve when:
- New to writing PRDs
- Want to understand expectations
- Learning document requirements

---

## Improve vs Manual Review

### Improve Advantages

- Specific fix suggestions
- Priority ordering
- Effort estimates
- Score prediction
- Examples provided

### Manual Review Advantages

- Full context
- Human judgment
- Domain expertise
- Business context

### Best Approach

Combine both:
1. Run improve for suggestions
2. Apply human judgment
3. Re-review to verify

---

**docs/scenarios/improve-flow.md — Improvement workflow.**
