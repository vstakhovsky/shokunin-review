# Shokunin Agent Directory

Central directory of all Shokunin agents and their responsibilities.

## Overview

Shokunin Review uses multiple specialized agents for different aspects of the system:

- **Onboarding agents** - Help with product and technical understanding
- **Meta agents** - Maintain repository quality, releases, and positioning
- **Review validators** - Analyze specific aspects of artifacts
- **Security agents** - Handle security-sensitive tasks
- **Verification agents** - Ensure quality and prevent false success
- **Utility agents** - Support specific workflows

## Agent catalog

| Agent | File | Purpose | Main inputs | Output |
|---|---|---|---|---|
| **Product Manager** | `.claude/agents/shokunin-product-manager.md` | Explains features, roadmap, positioning, user scenarios | README, ROADMAP, CHANGELOG, docs | Product Q&A, onboarding help |
| **Architect** | `.claude/agents/shokunin-architect.md` | Explains architecture, implementation, evals, security routing | cli/src, harness, skills, docs | Technical Q&A, implementation guidance |
| **Documentation Curator** | `.claude/agents/shokunin-docs-curator.md` | Prevents documentation drift across README, ROADMAP, CHANGELOG, docs, skills, and agents | README, ROADMAP, CHANGELOG, docs, agents | Documentation consistency review |
| **Release Manager** | `.claude/agents/shokunin-release-manager.md` | Prepares PR summaries, release notes, changelog entries, version recommendations, and release checks | git status, git log, CHANGELOG, README, docs, verification scripts | Release readiness report |
| **Competitive Analyst** | `.claude/agents/shokunin-competitive-analyst.md` | Compares Shokunin Review with adjacent tools and identifies positioning gaps | README, ROADMAP, references, docs | Competitive analysis with confidence labels |
| **Builder** | `.claude/agents/shokunin-builder.md` | Implements code and documentation changes | Feature requests, bug reports | Code changes, tests, docs |
| **Test Guardian** | `.claude/agents/shokunin-test-guardian.md` | Verifies real commands and blocks false success reports | scripts, eval output | Pass/fail report, honest assessment |
| **Eval Calibrator** | `.claude/agents/shokunin-eval-calibrator.md` | Improves eval quality through calibration | harness/evals, rubric, reports | Calibration recommendations |
| **Judge** | `.claude/agents/shokunin-judge.md` | Decides PASS/RETRY/BLOCKED for verification | Test Guardian report, eval results | Final decision with reasoning |
| **Security Router** | `.claude/agents/shokunin-security-router.md` | Routes security-sensitive tasks to defensive workflows | security-routing.md, artifacts | Defensive route selection |
| **Security Reviewer** | `.claude/agents/shokunin-security-reviewer.md` | Reviews defensive security risks in artifacts | Artifacts, configs, docs | Security findings with safe remediation |
| **Safety Judge** | `.claude/agents/shokunin-safety-judge.md` | Enforces defensive-only boundaries for security output | Security review output | PASS / RETRY / BLOCKED |

## Review validators

These agents analyze specific aspects of artifacts during review:

| Agent | File | Purpose | Focus area |
|---|---|---|---|
| **Evidence Reviewer** | `.claude/agents/evidence-reviewer.md` | Validates claims and supporting data | Evidence gaps, missing data |
| **Decision Reviewer** | `.claude/agents/decision-reviewer.md` | Checks for clear decisions | Missing decisions, unclear asks |
| **Metric Reviewer** | `.claude/agents/metric-reviewer.md` | Validates primary and guardrail metrics | Metric definition, baseline |
| **Requirement Reviewer** | `.claude/agents/requirement-reviewer.md` | Checks for testable requirements | Vague requirements, acceptance criteria |
| **Technical Feasibility Reviewer** | `.claude/agents/technical-feasibility-reviewer.md` | Assesses implementation feasibility | Technical risks, dependencies |
| **Strategy Reviewer** | `.claude/agents/strategy-reviewer.md` | Validates product strategy logic | Segment, pain, opportunity, sequencing |
| **Severity Calibrator** | `.claude/agents/severity-calibrator.md` | Assigns consistent severity levels | Finding severity classification |
| **Finding Quality Auditor** | `.claude/agents/finding-quality-auditor.md` | Audits finding quality and specificity | Vague findings, missing evidence |

## Utility agents

These agents support specific workflows or tasks:

| Agent | File | Purpose | Use case |
|---|---|---|---|
| **Output Guard** | `.claude/agents/output-guard.md` | Validates output for safety and quality | Final output check before display |
| **Document Intake Agent** | `.claude/agents/document-intake-agent.md` | Handles document parsing and classification | Initial artifact processing |
| **Review Orchestrator** | `.claude/agents/review-orchestrator.md` | Coordinates review workflow | Validator routing and orchestration |
| **Review Spec Builder** | `.claude/agents/review-spec-builder.md` | Builds review specifications | Structuring review requests |
| **Validator Router** | `.claude/agents/validator-router.md` | Routes to appropriate validators | Validator selection based on artifact type |
| **Simpler Alternative Reviewer** | `.claude/agents/simpler-alternative-reviewer.md` | Suggests simpler approaches | Over-engineering detection |
| **Opportunity Sizing Reviewer** | `.claude/agents/opportunity-sizing-reviewer.md` | Validates opportunity sizing | Market sizing, TAM analysis |
| **Cost/ROI Sanity Reviewer** | `.claude/agents/cost-roi-sanity-reviewer.md` | Validates cost and ROI claims | Business case validation |
| **AI Safety Guardrails Reviewer** | `.claude/agents/ai-safety-guardrails-reviewer.md` | Checks for AI safety considerations | Safety boundaries and guardrails |

## Verification workflow agents

The verification loop uses a specific sequence of agents:

```
Builder → Test Guardian → Judge → PASS / RETRY / BLOCKED
```

1. **Builder** implements changes but never declares success based only on build/unit tests
2. **Test Guardian** runs real eval harness and provides honest assessment
3. **Judge** decides whether to accept, retry, or block based on actual quality

## Security routing agents

Security-sensitive tasks flow through these agents:

```
Security Router → Security Reviewer → Safety Judge → Findings or BLOCKED
```

1. **Security Router** classifies and routes security tasks
2. **Security Reviewer** performs defensive security analysis
3. **Safety Judge** enforces defensive-only boundaries

## Onboarding agents

These agents help new contributors understand the system:

- **Product Manager** - For product, features, roadmap, and positioning questions
- **Architect** - For architecture, implementation, and technical questions

Both agents are source-grounded and reference repository files rather than inventing answers.

## Agent conventions

All Shokunin agents follow these conventions:

- **Role statement** - Clear purpose and responsibilities
- **Primary sources** - Files to read before answering
- **Guardrails** - What the agent should and should not do
- **Output style** - How to structure responses
- **When uncertain** - How to handle missing information

## Related documentation

- `docs/agent-orchestration.md` - Multi-agent workflow architecture
- `docs/eval-harness.md` - Eval harness and verification
- `docs/test-guardian.md` - Test Guardian workflow
- `docs/security-routing.md` - Security routing architecture
- `.claude/agents/` - Agent implementation files
