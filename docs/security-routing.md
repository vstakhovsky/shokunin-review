# Defensive Security Routing

## Overview

Shokunin Review includes a defensive security routing layer that classifies security-sensitive review tasks and routes them to the appropriate defensive workflow before producing findings.

This helps prevent unsafe agent behavior, false confidence in AI-generated security reviews, and accidental exposure of sensitive information.

## Why security routing matters

AI-powered code review can encounter security-sensitive content that requires special handling:

- **Secrets and credentials** - Accidentally exposed API keys, tokens, passwords
- **Command injection risks** - Unsafe shell usage that could be exploited
- **Prompt injection** - Untrusted content attempting to override review instructions
- **CI/CD security** - Excessive permissions or secret exposure in workflows
- **Generated reports** - Sensitive data in eval outputs or traces
- **Eval poisoning** - Manipulation of baseline or expected findings

Without proper routing, these tasks could:
- Produce unsafe or offensive guidance
- Miss critical security risks
- Expose sensitive information in reports
- Provide false confidence in weak security posture

## How routing works

### 1. Classification

The security router agent reads `skills/security-routing.md` and classifies the task based on trigger signals:

```
secret-leak-review → "api_key", "token", "password", "credential"
cli-input-review → "subprocess", "shell=True", user input
prompt-injection-review → "user_input in prompt", template concatenation
```

### 2. Route selection

Based on classification, the router selects the appropriate defensive route from the routing table.

### 3. Safety boundaries

The `skills/security/BOUNDARIES.md` file enforces defensive-only scope:

✅ **Allowed:** Identify risks, recommend safe mitigations
❌ **Not allowed:** Exploit development, bypass techniques, offensive guidance

### 4. Human approval

High-risk findings require human approval before proceeding:

- Command injection (credential risk)
- Secret exposure (credential exposure)
- Baseline poisoning (eval integrity)
- Unsafe requests (safety boundary)

### 5. Findings output

The security reviewer produces structured findings:

```yaml
finding_id: command-injection-risk
severity: critical
evidence: subprocess.run(cmd, shell=True)
why_it_matters: User input reaches shell unsafely
safe_remediation: Use argument arrays instead
human_approval_required: true
```

## Supported scenarios

### CLI input review
Reviews CLI argument handling for command injection risks:
- Identifies `shell=True` usage with user input
- Recommends argument arrays and input validation
- Requires human approval for critical findings

### Secret leak review
Identifies exposed secrets, API keys, tokens, or credentials:
- Scans for hardcoded secrets in code and configs
- Recommends secret scanning and rotation
- Requires human approval for credential exposure

### GitHub Actions review
Reviews CI/CD workflows for permission issues:
- Identifies excessive permissions (write-all)
- Recommends read-only defaults
- Checks for secret exposure in logs

### Report sanitization review
Reviews generated reports for sensitive data:
- Identifies PII in traces or logs
- Recommends .gitignore patterns
- Suggests output sanitization

### Baseline poisoning review
Reviews eval baselines for manipulation risks:
- Identifies unsafe baseline updates
- Recommends version control and approval gates
- Requires human approval for baseline changes

## How it differs from offensive security

Shokunin Review is **defensive only**:

| Aspect | Offensive Security | Shokunin Review |
|--------|-------------------|-----------------|
| Goal | Find and exploit vulnerabilities | Identify and prevent risks |
| Output | Exploit chains, bypass techniques | Safe remediation, hardening |
| Use case | Penetration testing, red team | Secure development, review |
| Boundary | Can enable attacks | Must not enable attacks |

## Human approval workflow

For high-risk findings:

1. Security reviewer produces finding with `human_approval_required: true`
2. Finding includes risk explanation and safe remediation
3. Human reviewer approves or modifies before action
4. Audit trail records approval decision

## Integration with eval harness

Security eval cases in `harness/evals/security/` test the routing:

```yaml
id: security_cli_command_injection_001
expected_score_band: 0-39
expected_blockers:
  - command-injection-risk
  - unsafe-tool-permission
```

The Test Guardian verifies that:
- Weak implementations are blocked with appropriate findings
- Strong implementations pass without blockers
- No offensive content is generated
- Sensitive data is not extracted or exposed

## Adding new routes

To add a new defensive security route:

1. Add route to `skills/security-routing.md`
2. Add finding types to `harness/expected_findings/security-taxonomy.yaml`
3. Create eval cases in `harness/evals/security/`
4. Create example artifacts in `examples/security/`
5. Run `scripts/verify-security-routing.sh` to verify

## Safety first

If a task is unclear or could be offensive:
- Default to defensive interpretation
- Escalate to human review
- Never assume offensive intent

The safety judge agent can BLOCK output that:
- Provides offensive instructions
- Demonstrates bypass techniques
- Enables exploit development
- Reveals sensitive information
