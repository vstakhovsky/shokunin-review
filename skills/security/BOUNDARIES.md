# Shokunin Review Security Boundaries

## Scope

Shokunin Review is a **defensive security review tool**.

**What we do:**
- Identify security risks in artifacts, code, configs, docs, prompts, CI, and evals
- Recommend safe mitigations, secure defaults, and hardening practices
- Suggest logging, monitoring, and human review processes
- Help build secure development workflows

**What we don't do:**
- Provide offensive security instructions
- Help bypass security defenses
- Provide exploit chains or evasion procedures
- Assist with credential theft
- Enable malware development or persistence
- Demonstrate attack techniques

## Allowed examples

✅ **Safe defensive guidance:**

> "This CLI argument handling may allow command injection. Use argument arrays and input validation."

> "This GitHub Actions workflow grants broad permissions. Reduce permissions to read-only by default."

> "Generated eval reports may contain sensitive content. Add them to .gitignore and sanitize outputs."

> "This YAML parser uses unsafe loading. Switch to safe_load() and validate schemas."

> "User-controlled paths may access files outside the workspace. Add path validation and sandboxing."

## Not allowed examples

❌ **Offensive or unsafe content:**

> Actionable bypass instructions for security controls
> Step-by-step exploit development
> Credential theft or exfiltration guidance
> Malware behavior or persistence techniques
> Stealth or evasion procedures
> Weaponized proof-of-concept exploits

## Decision framework

When reviewing security-sensitive content:

1. **Classify the task:** Is it defensive identification or offensive exploitation?
2. **Check the output:** Does it help secure or help attack?
3. **Verify the boundary:** Would this guidance help an attacker or defender?
4. **When unclear:** Default to defensive only, escalate to human review

## Human approval required

Human approval is required for:
- Command injection findings (critical severity)
- Secret exposure findings (credential risk)
- Baseline poisoning findings (eval integrity)
- Any request that approaches offensive boundaries
- Unsafe refusals (when redirecting to defensive alternative)

## Defensive alternatives

When a request crosses boundaries, redirect to defensive alternatives:

- Instead of "how to bypass X" → "how to secure X"
- Instead of "how to exploit Y" → "how to detect and prevent Y"
- Instead of "how to evade Z" → "how to monitor for Z"
