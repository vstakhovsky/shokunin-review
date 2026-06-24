# Shokunin Security Routing

**Purpose:** Route security-sensitive review tasks to the correct defensive validator, agent, or safety boundary.

**Core rule:** When a task involves security, always classify it first before giving recommendations.

## Routing stages

1. Classify task type
2. Classify risk level
3. Select defensive reviewer
4. Apply safety boundary
5. Produce findings
6. Escalate to human review when needed

## Routing table

### secret-leak-review
- **description:** Review for exposed secrets, API keys, tokens, credentials, or private values
- **trigger_signals:** `secret`, `api_key`, `token`, `password`, `credential`, `private_key`, `.env`, `credentials.yml`
- **allowed_actions:** Identify secret locations, recommend redaction, suggest secret scanning, recommend rotation
- **disallowed_actions:** Extract actual secret values, demonstrate secret usage, provide working credentials
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** secret-leak
- **human_approval_required:** true
- **output_format:** finding_id, severity, file_location, safe_redaction_guidance

### prompt-injection-review
- **description:** Review for prompt injection risks where untrusted content may influence agent behavior
- **trigger_signals:** `user_input in prompt`, `template concatenation`, `system prompt override`, `instruction injection`
- **allowed_actions:** Identify injection vectors, recommend input sanitization, suggest delimiter strategies, recommend isolation
- **disallowed_actions:** Provide injection payloads, demonstrate bypass techniques, craft exploit prompts
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** prompt-injection-risk
- **human_approval_required:** false
- **output_format:** finding_id, severity, vulnerable_pattern, mitigation_strategy

### tool-permission-review
- **description:** Review agent or script tool permissions for excessive access
- **trigger_signals:** `filesystem.write`, `shell.exec`, `network.request`, broad tool permissions
- **allowed_actions:** Identify excessive permissions, recommend principle of least privilege, suggest sandboxing
- **disallowed_actions:** Recommend permission escalation techniques, provide exploit chains for abuse
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** unsafe-tool-permission
- **human_approval_required:** false
- **output_format:** finding_id, severity, current_permissions, recommended_minimum

### cli-input-review
- **description:** Review CLI argument handling for command injection risks
- **trigger_signals:** `subprocess`, `os.system`, `shell=True`, user-controlled input to commands
- **allowed_actions:** Identify unsafe shell usage, recommend argument arrays, suggest input validation
- **disallowed_actions:** Provide exploit payloads, demonstrate injection techniques, craft working exploits
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** command-injection-risk
- **human_approval_required:** true
- **output_format:** finding_id, severity, vulnerable_code, safe_alternative

### yaml-eval-review
- **description:** Review YAML parsing for unsafe evaluation or code execution risks
- **trigger_signals:** `yaml.load`, `unsafe_load`, implicit type conversion, arbitrary object instantiation
- **allowed_actions:** Identify unsafe parsing, recommend safe loaders, suggest validation
- **disallowed_actions:** Craft malicious YAML payloads, demonstrate deserialization exploits
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** untrusted-file-risk
- **human_approval_required:** true
- **output_format:** finding_id, severity, unsafe_pattern, safe_loader_recommendation

### github-actions-review
- **description:** Review GitHub Actions workflows for excessive permissions or secrets exposure
- **trigger_signals:** `permissions: write-all`, `GITHUB_TOKEN` in logs, untrusted code execution
- **allowed_actions:** Identify broad permissions, recommend read-only defaults, suggest secret handling
- **disallowed_actions:** Provide workflow exploit chains, demonstrate token theft techniques
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** ci-permission-risk
- **human_approval_required:** false
- **output_format:** finding_id, severity, current_permissions, recommended_permissions

### dependency-review
- **description:** Review dependencies for supply-chain risk
- **trigger_signals:** `dependencies`, `package.json`, `requirements.txt`, `go.mod`, untrusted packages
- **allowed_actions:** Identify risky dependencies, recommend pinning, suggest vulnerability scanning
- **disallowed_actions:** Provide malicious package examples, demonstrate dependency confusion exploits
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** dependency-risk
- **human_approval_required:** false
- **output_format:** finding_id, severity, dependency_name, risk_factors, remediation_steps

### report-sanitization-review
- **description:** Review generated reports for sensitive data leakage
- **trigger_signals:** `report output`, `trace files`, `eval results`, `.json` outputs with prompts
- **allowed_actions:** Identify sensitive data in reports, recommend sanitization, suggest .gitignore patterns
- **disallowed_actions:** Extract sensitive data from reports, demonstrate data leakage techniques
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** report-data-leak, pii-exposure
- **human_approval_required:** false
- **output_format:** finding_id, severity, data_type, location, sanitization_recommendation

### baseline-poisoning-review
- **description:** Review eval baselines for poisoning or manipulation risks
- **trigger_signals:** `baseline update`, `expected findings change`, `eval data modification`
- **allowed_actions:** Identify unsafe baseline updates, recommend version control, suggest approval gates
- **disallowed_actions:** Demonstrate poisoning techniques, provide manipulation strategies
- **reviewer_agent:** shokunin-security-reviewer
- **expected_findings:** baseline-poisoning, eval-poisoning
- **human_approval_required:** true
- **output_format:** finding_id, severity, unsafe_pattern, safe_update_process

### unsafe-security-request
- **description:** Catch-all for requests that fall outside defensive security boundaries
- **trigger_signals:** Exploit development, bypass instructions, evasion techniques, offensive tooling
- **allowed_actions:** Safe refusal only, high-level risk explanation, defensive redirection
- **disallowed_actions:** ALL offensive security instructions, exploit guidance, bypass techniques
- **reviewer_agent:** shokunin-safety-judge
- **expected_findings:** unsafe-request
- **human_approval_required:** true
- **output_format:** REFUSAL with explanation, defensive alternative suggestion

## Safety boundary

All routes must:
1. Stay within defensive security scope
2. Never provide offensive instructions
3. Never demonstrate exploitation techniques
4. Never help bypass security controls
5. Always recommend safe mitigations
6. Escalate unclear cases to human review
