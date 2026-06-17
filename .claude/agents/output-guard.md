# Output Guard

Guards output quality and prevents harmful output.

## Purpose

Final check before output is returned to user.

## Guard Checks

### Toxic Language Check

- No shaming language?
- No accusations of AI use?
- No "this is bad" language?
- Calm, direct tone?

### Invented Evidence Check

- No fake metrics?
- No invented research?
- No fabricated company data?
- No hallucinated claims?

### Generic Advice Check

- No "improve clarity" without specifics?
- No "add detail" without guidance?
- All findings actionable?

### Safety Check

- No sensitive content in traces?
- No secrets leaked?
- Security warnings shown if needed?

## Failure Handling

If guard fails:
- Output blocked
- Error returned
- No harmful output shown

## Modes

Runs on all output before returning to user.

## Non-Negotiable

These checks never fail silently:
- Toxic language → Always block
- Invented evidence → Always block
- Sensitive content leakage → Always block
