
<<<<<<< HEAD
## Product Architecture Roadmap

### What changed

Added documentation for the next stage of Shokunin Review architecture: skills, evals, review loops, MCP roadmap, decision logs, trace review, and human gates.

### Why this matters

This clarifies that Shokunin Review is not a generic AI assistant. It is becoming a validation harness for product and technical artifacts, with explicit review loops, traceability, and human decision gates.

### Current status

Some parts already exist, such as eval harness, security routing, verification scripts, and agent workflows.

Other parts, such as MCP integrations, decision logs, trace review UX, and full human approval flow, are roadmap items.

### New documentation

This update adds:

```
docs/product-architecture-roadmap.md
docs/decision-log.md
docs/trace-review.md
docs/human-gate.md
docs/integrations-roadmap.md
scripts/verify-product-architecture-roadmap.sh
```

### Updated documentation

This update updates:

```
README.md - Added Product Architecture Direction section
ROADMAP.md - Added Product Architecture Roadmap section
CHANGELOG.md - This entry
```

### Architecture components

**Implemented:**
- Skills (PRD, RFC, Experiment, Strategy review)
- Evals (weak/strong cases, regression testing)
- Security routing layer
- Verification loop and multi-agent orchestration

**Partially implemented:**
- Trace/reports generation
- Review delta reporting

**Roadmap:**
- MCP integrations (GitHub, Notion/Obsidian, Google Drive, Linear/Jira)
- Decision log schema and persistence
- Human-readable trace review UX
- Full human gate workflow

### Key principles

The product architecture documentation emphasizes:

1. **AI recommends, humans decide** - Final authority always with humans
2. **Transparency** - Trace review explains why findings were produced
3. **Accountability** - Decision log tracks accepted/rejected/deferred recommendations
4. **Validation over generation** - Focus on reviewing, not rewriting
5. **No overclaiming** - Clear distinction between implemented and roadmap features

### Verification

Run `scripts/verify-product-architecture-roadmap.sh` to verify the product architecture documentation implementation.

### Product impact

This update improves Shokunin Review from a simple review tool to a comprehensive validation harness with:

- Clear architecture direction
- Documented human decision gates
- Traceability and accountability
- Roadmap for integrations
- Transparency into AI reasoning

It creates the foundation for:
- Better product positioning
- Clearer differentiation from generic AI assistants
- Structured approach to future features
- Maintainable architecture as the system grows

---

=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/main
## Meta Agents: Documentation Curator, Release Manager, and Competitive Analyst

### What changed

Added three repository-aware meta agents that help maintain Shokunin Review as the project grows.

### Problem solved

As Shokunin Review adds more validators, evals, security routes, docs, scripts, and agent definitions, it becomes easy for documentation, roadmap, release notes, and positioning to drift apart.

### Why this matters

The Documentation Curator helps keep project documentation consistent across README, ROADMAP, CHANGELOG, docs, skills, scripts, and agents.

The Release Manager helps prepare clear PR summaries, changelog entries, release notes, version recommendations, and release readiness checks.

The Competitive Analyst helps compare Shokunin Review with adjacent tools while avoiding unsupported market claims.

### Safety and accuracy

All three agents are source-grounded. They must clearly separate:

- Implemented functionality
- Documented design
- WIP work
- Roadmap ideas
- Assumptions
- Missing external evidence

### New files and areas

This update adds:

```
.claude/agents/shokunin-docs-curator.md
.claude/agents/shokunin-release-manager.md
.claude/agents/shokunin-competitive-analyst.md
scripts/verify-meta-agents.sh
```

### Updated files

This update updates:

```
docs/agent-directory.md - Added meta agents to directory
README.md - Added Meta Agents section
CHANGELOG.md - This entry
```

### Meta agent responsibilities

**Documentation Curator:**
- Checks README, ROADMAP, CHANGELOG consistency
- Identifies outdated claims and missing documentation
- Validates file references in docs and agents
- Recommends targeted documentation updates
- Prevents documentation drift

**Release Manager:**
- Prepares PR summaries and descriptions
- Writes release notes and changelog entries
- Recommends version bumps (patch/minor/major)
- Produces release readiness reports
- Ensures verification commands are documented

**Competitive Analyst:**
- Compares Shokunin Review to adjacent tools
- Identifies differentiation and gaps
- Labels claims with confidence levels
- Avoids unsupported competitor claims
- Recommends missing competitor research

### Competitive analysis caution

The Competitive Analyst includes explicit guardrails:

```text
Current competitor data is not available in the repository.
Add sources before making strong claims.
```

This prevents overconfident positioning without external sources.

### Verification

Run `scripts/verify-meta-agents.sh` to verify the meta agents implementation.

### Product impact

This update improves Shokunin Review from a codebase with agents to a self-maintaining system that can:

- Keep documentation consistent as features grow
- Produce clear release communication
- Position itself accurately vs adjacent tools
- Avoid documentation drift and overconfident claims

It creates the foundation for:
- Easier contributor onboarding
- Better release discipline
- More accurate product positioning
- Sustainable repository growth

## Onboarding Agents: Product Manager and Architect

### What changed

Added two repository-aware onboarding agents for product and technical understanding.

### Problem solved

As Shokunin Review grows, new contributors and reviewers need a fast way to understand what the project does, which features exist, how the architecture works, and what is still WIP.

### Why this matters

The Product Manager Agent explains product value, features, roadmap, positioning, user scenarios, and current limitations.

The Architect Agent explains implementation, architecture, evals, security routing, traces, verification scripts, limitations, and technical trade-offs.

Together, they make the repository easier to review, onboard into, and extend.

### Safety and accuracy

Both agents must ground answers in repository files and clearly separate:
- Implemented features
- Documented designs
- WIP work
- Roadmap ideas
- Missing documentation

They must not:
- Invent product capabilities
- Invent competitor claims
- Overstate maturity
- Claim production readiness unless verified

### New files and areas

This update adds:

```
.claude/agents/shokunin-product-manager.md
.claude/agents/shokunin-architect.md
docs/product-overview.md
docs/architecture-overview.md
docs/agent-directory.md
scripts/verify-onboarding-agents.sh
```

### Updated files

This update updates:

```
README.md - Added Onboarding Agents section
CHANGELOG.md - This entry
```

### Agent responsibilities

**Product Manager Agent:**
- Explain all current product features
- Explain user flows and review scenarios
- Explain why each feature exists
- Explain roadmap and future plans
- Explain product differentiation
- Explain onboarding path for new users
- Identify missing product docs
- Suggest product improvements

**Architect Agent:**
- Explain system architecture
- Explain CLI structure and command flow
- Explain review engine and validator execution
- Explain eval harness architecture
- Explain security routing and safety judge flow
- Explain generated reports and traces
- Explain limitations and technical debt
- Explain future architecture options
- Identify missing technical docs

### Verification

Run `scripts/verify-onboarding-agents.sh` to verify the onboarding agents implementation.

### Product impact

This update improves Shokunin Review from a codebase to a self-documenting system that can onboard new contributors and AI coding agents more effectively.

It creates the foundation for:
- Faster contributor onboarding
- Better AI-assisted development
- Clearer product and technical boundaries
- Easier stakeholder understanding
- Better hiring and candidate evaluation

<<<<<<< HEAD
---

=======
=======
>>>>>>> origin/main
>>>>>>> origin/main
## Defensive Security Routing

### What changed

Shokunin Review now includes a defensive security routing layer for security-sensitive review tasks.

The routing layer classifies security tasks and routes them to the appropriate defensive validator or agent before producing findings.

### Problem solved

Before this update, security-sensitive review tasks could be handled inconsistently or potentially produce unsafe guidance.

The new routing layer ensures that all security tasks are:
- Properly classified before handling
- Routed to appropriate defensive workflows
- Kept within defensive-only boundaries
- Reviewed for human approval when needed

### Why this matters

AI-powered code review can encounter security-sensitive content that requires special handling.

The defensive security routing helps prevent:
- Unsafe agent behavior
- Prompt injection risks
- Accidental secret leakage
- Unsafe shell execution
- Baseline poisoning
- Report and trace data leaks
- False confidence in AI-generated security reviews

### Main scenarios

Use defensive security routing when:
- Reviewing CLI tools for command injection risks
- Checking for exposed secrets or credentials
- Analyzing GitHub Actions for excessive permissions
- Reviewing prompt handling for injection risks
- Evaluating YAML parsing for unsafe evaluation
- Checking generated reports for sensitive data
- Reviewing eval baselines for poisoning risks

### Architecture fit

The routing layer sits between the review request and the security reviewer agents.

Flow:
```text
security task
  -> security-router (classify task)
  -> routing table (select route)
  -> security-reviewer (defensive review)
  -> safety-judge (boundary check)
  -> findings or BLOCKED
```

New security routes:

- `secret-leak-review` - Exposed secrets, API keys, tokens, credentials
- `cli-input-review` - Command injection risks in shell usage
- `prompt-injection-review` - Untrusted content influencing agent behavior
- `github-actions-review` - Excessive CI/CD permissions or secret exposure
- `yaml-eval-review` - Unsafe YAML parsing or code execution
- `dependency-review` - Supply-chain risk in dependencies
- `report-sanitization-review` - Sensitive data in generated reports
- `baseline-poisoning-review` - Eval baseline manipulation risks

### Defensive-only scope

Shokunin Review is defensive-only:

✅ **Allowed:** Identify security risks, recommend safe mitigations, suggest secure defaults

❌ **Not allowed:** Provide offensive instructions, demonstrate exploitation techniques, help bypass security controls

### New files and areas

This update adds:

```
skills/security-routing.md
skills/security/BOUNDARIES.md
harness/expected_findings/security-taxonomy.yaml
harness/evals/security/
examples/security/
.claude/agents/shokunin-security-router.md
.claude/agents/shokunin-security-reviewer.md
.claude/agents/shokunin-safety-judge.md
scripts/verify-security-routing.sh
docs/security-routing.md
```

### New security agents

- `shokunin-security-router` - Classifies security tasks and selects routes
- `shokunin-security-reviewer` - Finds defensive security risks in artifacts
- `shokunin-safety-judge` - Ensures output stays within defensive boundaries

### New eval cases

Security eval cases test the routing layer:

- `weak-cli-command-injection` - Command injection risks
- `weak-report-data-leak` - Sensitive data in reports
- `weak-prompt-injection-policy` - Prompt injection risks
- `weak-github-actions-permissions` - Excessive CI permissions
- `weak-untrusted-file-parsing` - Unsafe YAML parsing
- `strong-security-reviewed-cli` - Positive security example

### Product impact

This update improves Shokunin Review from a general document reviewer into a security-aware review system with proper defensive boundaries.

It creates the foundation for:
- Safer security review workflows
- Proper handling of security-sensitive content
- Prevention of unsafe guidance
- Better integration with eval harness and Test Guardian
- Clear separation of defensive vs offensive security

### Verification

Run `scripts/verify-security-routing.sh` to verify the security routing implementation.

=======
>>>>>>> origin/main
## Eval Harness for Review Quality

### What changed

Shokunin Review now includes a real eval harness instead of only a `shokunin eval` command.

The harness runs structured evaluation cases across PRDs, RFCs, strategy documents, and experiment plans. It compares the actual review output against expected score bands, expected findings, severity expectations, and must-not-flag rules.

### Problem solved

Before this update, the eval command could show that an evaluation flow existed, but it did not prove whether Shokunin Review was actually reliable at finding important product, technical, and experiment-design issues.

The new harness makes review quality measurable and repeatable.

### Why this matters

AI-assisted review tools can sound confident while still missing important gaps or flagging irrelevant risks.

The eval harness helps validate whether Shokunin Review can:

- detect known blockers
- avoid false positives
- keep scores calibrated
- track severity accuracy
- catch regressions after prompt or scoring changes
- produce readable reports for product and engineering review

### Main scenarios

Use the eval harness when:

- changing validator prompts
- adding a new reviewer agent
- changing scoring logic
- adding support for a new artifact type
- preparing a release
- comparing weak and strong artifact examples
- demonstrating review quality to product, engineering, or leadership stakeholders

### Architecture fit

The harness sits between the CLI and the reviewer/scoring layer.

Flow:

```text
eval case YAML
  -> input artifact
  -> Shokunin review runner
  -> actual findings
  -> expected findings comparison
  -> scoring accuracy
  -> regression report

This turns Shokunin Review from a document reviewer into a measurable review system.

New files and areas

This update adds:

harness/evals/
harness/expected_findings/
harness/score_calibration/
harness/regression/
harness/reports/
docs/eval-harness.md
Readiness improvement

This feature creates the foundation for future improvements:

reviewer-level accuracy tracking
prompt regression tests
human calibration sets
model/provider comparison
eval dashboards
release quality gates
stricter confidence and severity calibration


## Shokunin Verification Loop

### What changed

Shokunin Review now includes a stricter verification workflow for AI-assisted development.

This update adds a lightweight multi-agent review structure:

```text
Builder -> Eval Calibrator -> Test Guardian -> Judge -> PASS / RETRY / BLOCKED

The workflow is designed to prevent false success reports where implementation summaries say that everything is complete, while the real eval harness still fails.

Problem solved

Previously, build checks and unit tests could pass while the real eval harness still showed poor product-quality results.

For example, the system could report:

Build passed
Unit tests passed

but the actual eval harness could still fail with a low pass rate.

This update separates technical correctness from review-quality correctness.

Why this matters

Shokunin Review is not only a CLI reviewer. It is becoming a verification system for AI-generated and AI-assisted work.

The new verification loop helps ensure that:

implementation summaries are not trusted blindly
real commands are executed before accepting changes
eval harness results are inspected separately from unit tests
bad eval states block commits honestly
baseline updates are not allowed after failed eval runs
quality regressions are visible before release
New agents

This update adds Claude Code agent definitions:

.claude/agents/shokunin-builder.md
.claude/agents/shokunin-eval-calibrator.md
.claude/agents/shokunin-test-guardian.md
.claude/agents/shokunin-judge.md
New verification script

This update adds:

scripts/verify-eval.sh

The script runs the main quality gates:

build
unit tests
real eval harness
report generation
commit gate

If the eval harness quality is below the configured threshold, the script exits with a failure code and marks the commit as blocked.

Current status

The verification workflow is working as intended: it detects that the current eval harness quality is still below the acceptance threshold.

This is expected for this step. The next step is to use the Eval Calibrator agent to improve score bands, expected findings, fixture quality, and scoring logic until the Judge returns PASS.

Product impact

This update improves Shokunin Review from a simple review CLI into a bounded verification loop for AI-assisted work.

It creates the foundation for:

stricter eval calibration
reviewer quality gates
multi-agent review workflows
judge-based acceptance checks
release readiness verification
safer AI-assisted development


## Shokunin Verification Loop

### What changed

Shokunin Review now includes a stricter verification workflow for AI-assisted development.

This update adds a lightweight multi-agent review structure:

```text
Builder -> Eval Calibrator -> Test Guardian -> Judge -> PASS / RETRY / BLOCKED

The workflow is designed to prevent false success reports where implementation summaries say that everything is complete, while the real eval harness still fails.

Problem solved

Previously, build checks and unit tests could pass while the real eval harness still showed poor product-quality results.

This update separates technical correctness from review-quality correctness.

Why this matters

Shokunin Review is not only a CLI reviewer. It is becoming a verification system for AI-generated and AI-assisted work.

The new verification loop helps ensure that implementation summaries are not trusted blindly, real commands are executed before accepting changes, eval harness results are inspected separately from unit tests, bad eval states block commits honestly, and quality regressions are visible before release.

New agents
.claude/agents/shokunin-builder.md
.claude/agents/shokunin-eval-calibrator.md
.claude/agents/shokunin-test-guardian.md
.claude/agents/shokunin-judge.md
New verification script
scripts/verify-eval.sh

The script runs build checks, unit tests, the real eval harness, report generation, and the commit gate.

Current status

The verification workflow is working as intended: it detects that the current eval harness quality is still below the acceptance threshold.

The next step is to use the Eval Calibrator agent to improve score bands, expected findings, fixture quality, and scoring logic until the Judge returns PASS.

