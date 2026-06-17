# SECURITY.md

**Security requirements and guidance for Shokunin Review MVP 1.**

---

## Critical Security Warning

```text
Do not paste confidential, NDA-protected, personal, customer, financial, security, or production secrets into Shokunin Review unless you understand your local setup and data handling.
```

---

## Security Principles

### 1. No Storage by Default

- Do not store raw document text by default
- Do not write sensitive input into traces by default
- No cloud processing by default
- No telemetry by default

### 2. User-Controlled Data

- User controls what files are reviewed
- User controls whether traces are enabled
- User controls whether processing is local-only

### 3. Clear Warnings

- Warn before reviewing sensitive documents
- Warn about potential sensitive content
- Recommend safe modes for sensitive content

### 4. No Invented Data

- Never invent company metrics
- Never invent customer data
- Never invent market research
- Never invent internal context

### 5. Non-Accusatory

- Never accuse author of using AI
- Never imply AI use is negative
- Focus on document quality, not origin

---

## Sensitive Content Detection

### What May Be Sensitive

Shokunin Review may detect potential sensitive content:

- Customer personal data (names, emails, IDs)
- Financial secrets (revenue, profitability, unit economics)
- Production credentials (API keys, passwords, tokens)
- Security architecture details
- NDA-protected strategy
- Confidential roadmap or pricing details
- Unreleased legal or compliance information

### Detection Method

Detection is pattern-based and heuristic:

- Keywords: "confidential", "secret", "internal only", "do not share"
- Patterns: email addresses, API keys, financial figures
- Context: sections marked "internal" or "confidential"

**Detection is not guaranteed.** User is responsible for identifying sensitive content.

---

## Security Warning Flow

### Warning Message

```text
Potential sensitive content detected.

This document may contain confidential business, customer, financial, security, or production data.

Recommended:
- remove secrets
- anonymize customer names
- replace exact numbers if needed
- use --local-only
- use --no-trace

Continue?
[Y] continue  [R] review redacted copy  [C] cancel
```

### User Options

**[Y] continue** — Proceed with review

**[R] review redacted copy** — Offer to help redact (future feature)

**[C] cancel** — Cancel review

### Default Behavior

- Warning is shown by default
- User must explicitly choose to continue
- Choice is not remembered (must confirm each time)

---

## Safe Usage Modes

### `--local-only`

Ensures all processing is local:

```bash
shokunin review file.md --local-only
```

Behavior:

- No cloud processing
- No network calls (except for model inference if configured)
- No data sent to external services

### `--no-trace`

Disables trace logging:

```bash
shokunin review file.md --no-trace
```

Behavior:

- No trace files written
- No audit trail stored
- No artifact content in logs

### Combined Safe Mode

For maximum safety:

```bash
shokunin review file.md --local-only --no-trace
```

---

## What Data Should You Avoid Sharing?

### Avoid Sharing

- Customer personal data (names, emails, addresses, IDs)
- Financial secrets (revenue, profitability, unit economics)
- Production credentials (API keys, passwords, tokens)
- Security architecture details
- NDA-protected strategy
- Confidential roadmap or pricing details
- Unreleased legal or compliance information
- Employee personal data
- Proprietary algorithms or code

### Best Practices

- Anonymize customer names (use Customer A, B, C)
- Replace exact financial figures (use "~$100K", not "$98,432.12")
- Remove API keys and credentials
- Use generic names for internal systems
- Redact confidential details

---

## Data Handling

### No Storage by Default

MVP 1 behavior:

- No raw document text stored
- No artifact content in traces by default
- No cloud storage by default
- No database by default

### Trace Logging

If `--no-trace` is **not** set:

- Log review execution steps
- Log validator execution
- Log finding audit trail
- **Do not** log sensitive artifact content

### Future Features (Not in MVP 1)

- `--redact-secrets` flag (roadmap)
- Automatic secret detection and redaction (roadmap)
- Secure cloud storage option (roadmap)

---

## Output Guard

### Guard Checks

All output must pass output guard:

- No toxic language
- No shaming or accusations
- No invented evidence
- No sensitive data leakage

### Guard Failure

If guard fails:

- Block output
- Log guard failure
- Return safe error message

### Guard Coverage

Guard must check:

- Toxic language patterns
- Accusatory language patterns
- Invented evidence patterns
- Sensitive data patterns

---

## Input Sanitization

### File Path Validation

- All file paths must be validated
- Prevent path traversal attacks
- Prevent command injection

### Content Sanitization

- All input must be validated
- Malicious input must not crash system
- No arbitrary code execution

### Length Limits

- Documents over 1MB may be rejected or truncated
- Protect against memory exhaustion
- Protect against DoS attacks

---

## Model Security

### Model Input

- Artifact content sent to model (if using external model)
- No other sensitive data sent by default

### Model Output

- Model output must be validated
- Model output must pass schema validation
- Model output must pass output guard

### Model Configuration

- Model selection is user-configurable
- Local models supported (where possible)
- Model API keys not stored by default

---

## Dependency Security

### Trusted Sources

- All dependencies from npm (for CLI)
- All dependencies from trusted sources
- Dependencies regularly updated

### Vulnerability Scanning

- Dependencies scanned for vulnerabilities
- Vulnerabilities addressed promptly
- Security updates prioritized

### Supply Chain

- No supply chain attacks
- No typosquatting
- No dependency confusion

---

## Compliance

### Data Protection

- No user data collection
- No telemetry by default
- No GDPR-covered data by default

### Open Source

- All code open source
- All documentation open source
- No proprietary security through obscurity

### Licensing

- MIT License
- All dependencies MIT-compatible

---

## Incident Response

### Security Issues

If you find a security issue:

1. Do not open a public issue
2. Email security contact (to be defined)
3. Wait for confirmation
4. Coordinate disclosure

### Vulnerability Disclosure

- Vulnerabilities disclosed promptly
- Vulnerabilities disclosed responsibly
- Patches released quickly

---

## Security Best Practices for Users

### 1. Review Public Documents

- Best for public documents
- No sensitive data at risk
- Full functionality available

### 2. Review Internal Documents with Care

- Use `--local-only` for internal documents
- Use `--no-trace` for sensitive internal documents
- Anonymize customer data

### 3. Don't Review Sensitive Secrets

- Don't review documents with API keys
- Don't review documents with credentials
- Don't review documents with sensitive financial data
- Redact or remove secrets first

### 4. Understand Your Setup

- Know where your model runs (local vs cloud)
- Know where traces are stored
- Know who has access to your system

---

## Security Limits of MVP 1

### What MVP 1 Does NOT Do

- No automatic secret redaction
- No enterprise key management
- No encrypted storage
- No access control
- No audit logging by default
- No cloud security features

### What MVP 1 DOES Do

- Warns about potential sensitive content
- Provides `--local-only` mode
- Provides `--no-trace` mode
- Validates all output
- Sanitizes all input

---

## Future Security Features (Roadmap)

### MVP 2

- `--redact-secrets` flag
- Improved sensitive content detection
- Better redaction guidance

### MVP 3

- Encrypted trace storage option
- Access control for traces
- Audit log export

### MVP 4

- Enterprise key management integration
- Cloud security options
- Compliance reporting

---

## Security Testing

### Testing Coverage

- Input validation tests
- Output guard tests
- Sanitization tests
- Dependency vulnerability scans

### Security Audits

- Code security audits (future)
- Penetration testing (future)
- Dependency audits (ongoing)

---

## Security FAQ

### Is Shokunin Review safe for confidential documents?

With `--local-only --no-trace`, it's safer than many alternatives, but no system is completely safe. Best practice: anonymize sensitive documents before review.

### Does Shokunin Review store my documents?

No. MVP 1 does not store raw document text by default. Traces avoid sensitive content by default. Use `--no-trace` to be certain.

### Can Shokunin Review access my files?

Shokunin Review only reads files you explicitly provide. It does not scan your filesystem or access other files.

### What if I accidentally review a sensitive document?

Delete trace files (if any). Review your local configuration. If using cloud models, check their data retention policies.

### Is Shokunin Review compliant with GDPR/SOC2/etc?

MVP 1 has no telemetry, no storage, and no data collection. Compliance depends on your setup and model provider.

---

## Security Contact

To report security issues:

- Email: (to be defined)
- GitHub Security: (to be configured)
- PGP Key: (to be provided)

---

**SECURITY.md defines security requirements and safe usage of Shokunin Review.**

**When in doubt, use `--local-only --no-trace` and anonymize sensitive content.**
