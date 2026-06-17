# Output Format

Shokunin Review output formats and schemas.

## Default Output Format

Short, terminal-friendly output:

```
🔴 Not review-ready — 36/100
Confidence: Medium

Top blockers:
1. [evidence-gap] Problem not quantified
2. [missing-decision] MVP scope undefined
3. [metric-fog] Primary metric unclear

Score caps applied:
- No evidence → max 60
- No MVP scope → max 55

Recommended: shokunin improve docs/prd.md
```

## Full Output Format

Comprehensive output with all findings:

```
🔴 Not review-ready — 36/100
Confidence: Medium

Why:
This PRD describes an attractive AI idea, but not a decision-ready MVP.

Top blockers:
1. [evidence-gap] Problem is not quantified.
2. [missing-decision] MVP scope is not defined.
3. [metric-fog] Primary metric unclear.

All findings:
1. [evidence-gap] Problem not quantified
   Location: Problem Statement section
   Fix: Add affected users, impact quantification
   
2. [missing-decision] MVP scope undefined
   Location: Add "MVP Scope" section
   Fix: Define included/excluded features
   
... (remaining findings)

Dimension breakdown:
- Problem clarity: 40/100
- Evidence quality: 30/100
- Requirements: 60/100
- Metrics: 25/100
- MVP scope: 20/100
- Guardrails: 0/100
- Decision ask: 70/100

Missing context:
- User segment size
- Baseline metrics
- Competitor analysis

Rationale:
Multiple critical gaps (evidence, metrics, scope) and
no AI guardrails for AI feature prevent this PRD from
being review-ready.
```

## JSON Output Format

Structured JSON for automation:

```json
{
  "verdict": {
    "emoji": "🔴",
    "text": "Not review-ready",
    "band": "Not review-ready"
  },
  "score": {
    "total": 36,
    "confidence": "medium",
    "dimension_breakdown": {...},
    "score_caps_applied": [...]
  },
  "findings": [...],
  "recommended_action": "...",
  "suggested_command": "..."
}
```

## Markdown Output Format

Human-readable report:

```markdown
# Review: [File Name]

## Verdict
🔴 Not review-ready — 36/100

## Findings
### 1. Evidence Gap
...

## Dimensions
### Problem Clarity: 40/100
...
```

## Quiet Output Format

Minimal output for scripts:

```
🔴 36/100
Improve: docs/prd.md
```

## Output Components

### Verdict
- Emoji indicator
- Text verdict
- Score band

### Score
- Total score
- Confidence level
- Dimension breakdown
- Score caps

### Findings
- ID
- Tag
- Severity
- Issue
- Recommended fix

### Next Action
- Recommended action
- Suggested command
