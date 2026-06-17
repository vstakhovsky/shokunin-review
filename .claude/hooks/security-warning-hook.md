# Security Warning Hook

Detects sensitive content and warns user.

## Purpose

Protect users from accidentally reviewing sensitive documents.

## When It Runs

During document intake, if sensitive patterns detected.

## Patterns Detected

### Technical Secrets
- API keys (`api_key`, `apikey`)
- Secret tokens (`secret`, `token`)
- Service keys (`sk_`, `AIza`)
- Passwords (`password`, `passwd`)

### Personal Data
- Email addresses
- Phone numbers
- Customer names (if pattern matches)
- Personal IDs

### Business Sensitive
- Financial figures (large numbers)
- Revenue data
- Customer counts
- Strategic plans (if keywords present)

## Warning Levels

### Low
Few patterns, likely examples or test data.

**Action**: Informational warning only.

### Medium
Multiple patterns, could be real data.

**Action**: Warning, recommend safe modes.

### High
Many patterns, likely sensitive content.

**Action**: Strong warning, require confirmation.

## Response

```
⚠️ Potential sensitive content detected

This document may contain:
- API keys or credentials
- Customer personal data
- Financial figures

Recommended:
- Remove secrets before review
- Anonymize customer data
- Use --local-only --no-trace

Continue? [Y] continue  [N] cancel
```

## Modes

### Safe Mode
If `--local-only --no-trace` used:
- Warning still shown
- But emphasizes safety measures

### Cancel
If user cancels:
- Review aborted
- No data processed
- Safe exit
