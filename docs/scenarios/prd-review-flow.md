# PRD Review Flow

**Product Requirements document review workflow.**

---

## User Context

**User**: Product Manager
**Goal**: Review PRD before stakeholder meeting
**Document**: `docs/new-feature-prd.md`

---

## Command

```bash
shokunin review docs/new-feature-prd.md
```

---

## Review Process

### Status Flow

```
💤 idle
↓
📖 Reading artifact... (2s)
↓
🔍 Classifying... (1s)
  → Type: PRD (High confidence)
↓
📐 Scoping review... (1s)
  → Maturity: Ready for review
↓
🔀 Routing validators... (1s)
  → 7 validators selected
↓
🔎 Checking... (8s)
  ✓ decision-reviewer
  ✓ evidence-reviewer
  ✓ metric-reviewer
  ✓ requirement-reviewer
  ✓ ai-safety-guardrails-reviewer
  ✓ cost-roi-sanity-reviewer
  ✓ finding-quality-auditor
↓
🔬 Auditing findings... (2s)
  → 8 findings, 2 filtered (quality check)
↓
📊 Scoring... (1s)
  → Score: 72/100
↓
✓ Verifying output... (1s)
↓
✓ Done (15s total)
```

---

## Review Spec

```yaml
artifact_type: PRD
detected_maturity: Ready for review
audience: Technical
review_mode: deep
expected_state: Should pass stakeholder review
selected_dimensions:
  - problem_clarity (20%)
  - evidence_quality (20%)
  - requirements_clarity (15%)
  - metrics_quality (15%)
  - mvp_scope (10%)
  - guardrails (10%)
  - decision_ask (10%)
validator_budget: All applicable
finding_budget: 5 (default output)
score_cap_rules:
  - no_primary_metric: 55
  - no_mvp_scope: 55
  - no_decision_ask: 65
  - no_ai_guardrails_for_ai_feature: 70
```

---

## Output

### Short (Default)

```
🟠 Needs major fixes — 72/100
Confidence: High

Why:
Strong problem statement and requirements, but missing
evidence and unclear metrics.

Top blockers:
1. [metric-fog] Primary success metric not clearly defined.
2. [evidence-gap] Problem size not quantified.
3. [requirement-fog] Some requirements not testable.
4. [cost-gap] Implementation costs not estimated.
5. [overclaim] Revenue impact claimed without baseline.

Score caps applied:
- No primary metric → max score 55

Recommended next action:
Define primary metric with clear threshold and measurement method.
Quantify problem size with affected users and impact.

Run:
shokunin improve docs/new-feature-prd.md --focus metrics
```

### Full (--full)

Includes everything above plus:

- All 8 findings (not just top 5)
- Dimension breakdown:
  - Problem clarity: 80/100
  - Evidence quality: 50/100
  - Requirements clarity: 75/100
  - Metrics quality: 45/100
  - MVP scope: 85/100
  - Guardrails: N/A (not AI feature)
  - Decision ask: 90/100
- Missing context:
  - User segment size
  - Baseline metrics
  - Cost estimates
- Rationale (2-3 sentences)

---

## Key Findings Explained

### Finding 1: [metric-fog]

```
Primary success metric is not clearly defined.

Location: Success Metrics section

Issue:
"User engagement will increase" is not measurable.

Recommended fix:
"Primary metric: Healthy food selection rate
Definition: Healthy selections / Total selections
Current: 30%
Target: 50%
Measurement: In-app event tracking
Threshold: +20% relative lift at 95% confidence"

Acceptance test:
Metric can be measured from event logs
Target threshold is specific
Success criteria is binary (pass/fail)
```

---

## Decision Guidance

### Should This Go to Stakeholders?

**Current State**: No
**Reason**: Missing metrics and evidence

**After Fixes**:
1. Define primary metric → Score: ~82
2. Add evidence for problem → Score: ~88
3. Add cost estimate → Score: ~90

**Then**: Ready for stakeholder review

---

## Alternative Actions

### Option 1: Improve First

```bash
shokunin improve docs/new-feature-prd.md --focus metrics
# Make changes
shokunin review docs/new-feature-prd.md
```

### Option 2: Full Review

```bash
shokunin review docs/new-feature-prd.md --full
# See all findings
# Prioritize fixes
```

### Option 3: Quick Score Check

```bash
shokunin score docs/new-feature-prd.md
# See score breakdown without findings
```

---

## Common PRD Issues Found

### Evidence Gaps

**Pattern**: Claims without data

```
❌ "This will increase engagement"
✅ "This will increase engagement from 30% to 50%
   based on A/B test of 10K users"
```

### Metric Fog

**Pattern**: Unclear metrics

```
❌ "Measure user happiness"
✅ "Measure: CSAT score, Target: 4.5/5,
   Method: Post-interaction survey"
```

### Requirement Fog

**Pattern**: Untestable requirements

```
❌ "System shall be fast"
✅ "System shall respond within 200ms (p95)
   for 10K concurrent users"
```

---

## Tips for PRD Authors

### Before Review

1. Quantify problem (affected users, impact)
2. Define primary metric with threshold
3. Make requirements testable
4. Add evidence for claims
5. Define MVP scope clearly
6. Include guardrails (if AI feature)

### After Review

1. Address blockers first
2. Re-run review after fixes
3. Use re-review to compare progress
4. Ready for stakeholders at 85+

---

## Score Interpretation

### PRD Score Ranges

| Score | Meaning | Stakeholder Ready? |
|-------|---------|-------------------|
| 90-100 | Review-ready | Yes |
| 75-89 | Minor fixes | Yes (after fixes) |
| 60-74 | Major fixes | No |
| 40-59 | Needs revision | No |
| 0-39 | Not review-ready | No |

### Common Score Caps

- No evidence → Max 60
- No primary metric → Max 55
- No MVP scope → Max 55
- No decision ask → Max 65

---

## Time Estimates

### Typical PRD Review

- Short PRD (< 5 pages): 15-30 seconds
- Medium PRD (5-10 pages): 30-60 seconds
- Long PRD (10+ pages): 60-90 seconds

### Deep vs Fast Mode

```bash
# Deep mode (default, comprehensive)
shokunin review prd.md
# Time: 30-60 seconds

# Fast mode (critical validators only)
shokunin review prd.md --mode fast
# Time: 15-30 seconds
```

---

**docs/scenarios/prd-review-flow.md — PRD review workflow.**
