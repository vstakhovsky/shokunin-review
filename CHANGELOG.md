
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

