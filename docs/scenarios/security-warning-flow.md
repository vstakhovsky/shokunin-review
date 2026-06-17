# Security Warning Flow

**Security warning scenario.**

---

## User Context

**User**: Reviewing document with sensitive content
**Document**: `docs/prd-with-secrets.md`
**Content**: Contains API keys, customer data

---

## Command

```bash
shokunin review docs/prd-with-secrets.md
```

---

## Security Detection

```
🔬 Scanning for sensitive content...

⚠️ Potential sensitive content detected.

This document may contain:
- API keys or credentials
- Customer personal data
- Financial figures
- Production configuration
- Internal strategy

Recommended:
- Remove secrets before review
- Anonymize customer names
- Replace exact figures with approximations
- Use --local-only mode
- Use --no-trace mode

Continue?
[Y] continue  [R] review redacted copy  [C] cancel
_
```

---

## User Choices

### Option Y: Continue

```bash
Y
```

**What happens**:
- Review proceeds normally
- Trace may contain sensitive content
- Warning acknowledged

**Best for**:
- Test data
- Non-sensitive approximations
- Local development

---

### Option R: Review Redacted Copy (Future)

```bash
R
```

**What happens** (MVP 2+):
- Shokunin creates redacted copy
- Secrets replaced with placeholders
- Safe to review

**Best for**:
- Documents with real secrets
- Need to preserve structure
- Want safe review

**Current (MVP 1)**:
- Not yet implemented
- Manual redaction required

---

### Option C: Cancel

```bash
C
```

**What happens**:
- Review cancelled
- No data processed
- Safe exit

**Best for**:
- Real secrets present
- Not ready to redact
- Need to review document first

---

## Safe Usage

### For Sensitive Documents

```bash
# Remove secrets manually
# Then review with safe modes
shokunin review docs/prd-sanitized.md --local-only --no-trace
```

**What these flags do**:

- `--local-only`: No cloud processing (if applicable)
- `--no-trace`: No trace files written
- Combined: Maximum privacy

---

## What Gets Flagged

### Patterns Detected

- `api_key` or `apikey`
- `secret` or `password`
- `sk_` (Stripe keys)
- `AIza` (Google keys)
- Customer names (if pattern matches)
- Email addresses
- Phone numbers
- Credit card numbers
- Financial figures (large numbers)

### False Positives

Detection is heuristic and may flag:
- Example API keys in documentation
- Test data
- Placeholder text
- Generic financial figures

---

## Best Practices

### Before Review

1. **Remove secrets**:
   - Replace API keys with `YOUR_API_KEY`
   - Replace passwords with `YOUR_PASSWORD`

2. **Anonymize data**:
   - Customer A, B, C (not real names)
   - ~$100K (not exact $98,432.12)

3. **Use placeholders**:
   - `{{API_KEY}}`
   - `{{DB_PASSWORD}}`

### During Review

```bash
# Use safe modes
shokunin review sensitive.md --local-only --no-trace
```

### After Review

- Delete trace files (if any)
- Don't commit reviewed versions with secrets
- Keep original with secrets secure

---

## Security FAQ

### Q: Is Shokunin Review safe for confidential docs?

**A**: With `--local-only --no-trace`, it's safer than many alternatives, but no system is completely safe. Best to anonymize.

### Q: Does Shokunin Review store my documents?

**A**: No. MVP 1 does not store documents by default. Traces avoid sensitive content by default.

### Q: What data should I avoid sharing?

**A**: API keys, passwords, customer PII, financial secrets, production credentials, security architecture details.

### Q: Can I review after removing secrets?

**A**: Yes. Remove secrets, then review with `--local-only --no-trace`.

---

**docs/scenarios/security-warning-flow.md — Security warning workflow.**
