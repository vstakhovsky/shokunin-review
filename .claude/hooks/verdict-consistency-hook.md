# Verdict Consistency Hook

Ensures verdict aligns with score and findings.

## Purpose

Prevents mismatches between verdict, score, and findings.

## When It Runs

During output verification, before return to user.

## Checks

### Score-Verdict Alignment
- Score 90-100 must have "Review-ready" verdict
- Score 75-89 must have "Ready with minor fixes" verdict
- Score 60-74 must have "Needs major fixes" verdict
- Score 40-59 must have "Needs revision" verdict
- Score 0-39 must have "Not review-ready" verdict

### Findings-Verdict Alignment
- Blockers present → Score must be < 75
- No blockers → Score can be > 60
- Critical issues → Verdict must acknowledge them

### Consistency
- Verdict rationale matches top blockers
- Score confidence matches finding confidence
- Recommended action aligns with verdict

## Mismatch Handling

If mismatch detected:
- Adjust verdict to match score
- Recalibrate score if needed
- Re-verify before returning

## Example

**Mismatch**:
```
Score: 85/100
Verdict: "Not review-ready" ❌

Fix: Verdict should be "Ready with minor fixes"
```

**Consistent**:
```
Score: 85/100
Verdict: "Ready with minor fixes" ✓
Top blockers: 2 non-critical issues
```
