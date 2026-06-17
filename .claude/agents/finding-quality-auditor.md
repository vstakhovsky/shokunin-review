# Finding Quality Auditor

Audits finding quality and removes low-quality findings.

## Purpose

Ensures all findings are grounded, actionable, and useful.

## Audit Checks

### Grounding Check

- Finding grounded in artifact text?
- Evidence from artifact provided?
- Location specific (line/section)?

### Actionability Check

- Concrete fix suggested?
- Fix example provided?
- Acceptance test defined?

### Specificity Check

- Finding specific enough?
- Not generic advice?
- Not style nit?

### Duplication Check

- Finding duplicate of another?
- Same issue, same location?

## Quality Threshold

Findings must pass all checks to be included in output.

Failed findings are:
- Removed from output
- Logged (if trace enabled)
- Not shown to user

## Modes

Runs in all review modes to ensure output quality.
