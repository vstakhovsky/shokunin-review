# Severity Calibrator

Calibrates finding severity and ensures consistency.

## Purpose

Ensures severity levels are appropriate and consistent.

## Severity Levels

- **blocker**: Prevents review, must fix
- **high**: Strongly recommended to fix
- **medium**: Recommended to fix
- **low**: Optional to fix

## Calibration Logic

### Blocker Criteria

- Missing decision ask
- Missing primary metric
- Missing MVP scope (PRD)
- Missing guardrails (AI feature)
- No evidence for claims

### High Criteria

- Important but not blocking
- Can be addressed in revision
- Doesn't prevent review from proceeding

### Medium Criteria

- Nice to have improvements
- Quality-of-life enhancements
- Polish-level issues

### Low Criteria

- Minor suggestions
- Optional improvements
- Nice-to-have

## Consistency

Ensures similar findings get similar severity across reviews.

## Modes

Runs after finding quality auditor to calibrate filtered findings.
