# Shokunin Review Product Overview

## What Shokunin Review is

Shokunin Review is a terminal-first validation harness for reviewing product documents (PRDs, RFCs, strategy docs, experiment plans) and AI-assisted artifacts before they reach human stakeholders.

## Core problem

AI-generated and human-written artifacts can sound polished while still missing:

- Evidence for claims
- Clear decisions
- Baseline metrics
- Testable requirements
- Technical feasibility
- Experiment decision rules
- Real trade-offs and risks
- Security boundaries

This wastes human review time on artifacts that aren't ready for discussion or decision-making.

## Current feature areas

### Document / artifact review
- PRD review for evidence, decisions, requirements, metrics
- RFC / technical design review for architecture and trade-offs
- Experiment plan review for hypothesis, metrics, and decision rules
- Product strategy review for segment, pain, and business logic

### Readiness scoring
- 0-100 score with confidence levels
- Score caps for missing critical elements
- Top blockers and recommended next actions

### Product validators
- Evidence reviewer - validates claims and supporting data
- Decision reviewer - checks for clear decisions
- Metric reviewer - validates primary and guardrail metrics
- Requirement reviewer - checks for testable requirements
- Technical feasibility reviewer - assesses implementation feasibility
- Strategy reviewer - validates product strategy logic
- Severity calibrator - assigns appropriate severity levels

### Eval harness
- Structured test cases for review quality
- Expected findings validation
- Score band calibration
- Regression detection
- Test Guardian verification workflow

### Defensive security routing
- Security task classification and routing
- Defensive-only security review
- Safety Judge boundary enforcement
- Human approval for critical findings

### Agent workflows
- Builder → Test Guardian → Judge verification loop
- Eval Calibrator for review quality improvement
- Multi-agent orchestration for complex tasks

### Terminal-first reports
- Readable output formatting
- Score bands with confidence
- Actionable next steps
- Optional improvement loop

## Key user scenarios

1. **Review a PRD before stakeholder review**
   - Catch missing evidence, decisions, or metrics
   - Identify overclaims or vague requirements
   - Save stakeholder time on unready documents

2. **Review an RFC before engineering discussion**
   - Validate architecture trade-offs
   - Check for failure mode analysis
   - Ensure rollout and migration plans exist

3. **Review an experiment plan before launch**
   - Validate hypothesis and metrics
   - Check sample size assumptions
   - Ensure decision rule is defined

4. **Check AI-generated work for quality**
   - Identify missing evidence or overclaims
   - Validate technical feasibility
   - Check for security or safety issues

5. **Run evals to validate review quality**
   - Test review engine against known cases
   - Detect regressions after changes
   - Calibrate scoring and findings

6. **Route security-sensitive artifacts**
   - Classify security tasks appropriately
   - Apply defensive-only boundaries
   - Require human approval for critical findings

## Roadmap themes

See `ROADMAP.md` for detailed roadmap, but key themes include:

### Better eval calibration
- Improve score band accuracy
- Expand expected findings taxonomy
- Add more weak/strong example pairs
- Calibrate severity levels

### More artifact types
- Support additional document types
- Add code review artifacts
- Support more engineering workflows

### More reliable scoring
- Reduce variance in scores
- Improve confidence calibration
- Better handle edge cases

### Stronger security routing
- Add more security routes
- Improve safety judge accuracy
- Better human approval workflows

### Better reports and dashboards
- Improved output formatting
- Web-based reports
- Historical tracking and trends

### GitHub / CI integration
- PR comment integration
- CI quality gates
- Automated review on document changes

### Web or API surface
- HTTP API for programmatic access
- Web UI for non-terminal users
- Team collaboration features

### Human feedback loop
- Feedback collection from users
- Model improvement from human reviews
- Adaptive learning and calibration

## Current limitations

See `docs/limitations.md` for detailed limitations, but key areas:

- **Eval calibration ongoing** - Score bands and expected findings are still being refined
- **MVP 1 scope** - Some documented features are not yet fully implemented
- **Terminal-first** - No web UI yet (planned)
- **Competitor analysis** - Limited comparative analysis with similar tools
- **Observability** - Basic tracing and reporting (improvements planned)

## Positioning

Shokunin Review is not an AI detector. It does not identify whether a document was written by AI or humans.

Instead, it evaluates document quality regardless of origin: polished documents (AI or human) must demonstrate evidence, decisions, metrics, and readiness to pass review.

## Related documentation

- `README.md` - Quick start and overview
- `ROADMAP.md` - Detailed roadmap
- `CHANGELOG.md` - Recent changes
- `docs/product/product-summary.md` - Product requirements
- `docs/product/functional-requirements.md` - Feature specifications
- `docs/security-routing.md` - Defensive security routing
- `docs/eval-harness.md` - Eval harness documentation
- `docs/limitations.md` - Known limitations
