# Catalog

**Catalog of Shokunin Review commands, skills, agents, hooks, and evals.**

---

## Overview

This document catalogs all major components of Shokunin Review MVP 1.

---

## Commands

### Claude Code Commands

| Command | Purpose | Usage |
|---------|---------|-------|
| `/shokunin-review` | Generic review | Reviews any supported artifact type |
| `/shokunin-review-prd` | PRD review | Reviews Product Requirements documents |
| `/shokunin-review-rfc` | RFC review | Reviews Technical Design documents |
| `/shokunin-review-experiment` | Experiment review | Reviews Experiment Plan documents |
| `/shokunin-review-strategy` | Strategy review | Reviews Product Strategy documents |
| `/shokunin-improve` | Suggest improvements | Suggests specific improvements |
| `/shokunin-rerun` | Re-review | Re-reviews and compares changes |
| `/shokunin-score` | Score breakdown | Shows detailed readiness score |
| `/shokunin-eval` | Run evals | Runs evaluation harness |

### CLI Commands

| Command | Purpose | Options |
|---------|---------|---------|
| `shokunin review <file>` | Review a document | `--mode`, `--type`, output options |
| `shokunin improve <file>` | Suggest improvements | `--focus` |
| `shokunin rerun <file>` | Re-review | `--compare <original>` |
| `shokunin score <file>` | Score breakdown | `--json`, `--markdown` |
| `shokunin eval` | Run evals | `--filter`, `--verbose` |

### Command Options

| Option | Purpose | Values |
|--------|---------|--------|
| `--mode` | Review mode | `fast`, `deep`, `draft` |
| `--type` | Artifact type override | `prd`, `rfc`, `experiment`, `strategy` |
| `--focus` | Improve focus area | `structure`, `evidence`, `metrics`, etc. |
| `--full` | Full output | Flag |
| `--quiet` | Minimal output | Flag |
| `--json` | JSON output | Flag |
| `--markdown` | Markdown output | Flag |
| `--no-color` | Disable colors | Flag |
| `--no-animation` | Disable animations | Flag |
| `--no-trace` | Disable traces | Flag |
| `--local-only` | Local processing only | Flag |
| `--mascot` | Mascot mode | `ascii`, `pixel`, `off` |

---

## Skills

### Core Skills

| Skill | Purpose | When to Use |
|------|---------|-------------|
| `shokunin-review` | Main review skill | Review any supported artifact |
| `shokunin-score` | Score explanation | Understand readiness score |
| `shokunin-gherkin` | Gherkin/acceptance criteria | Improve testable requirements |
| `shokunin-strategy` | Strategy review | Review strategic documents |
| `shokunin-verify` | Verification | Verify output quality |

### Skill Structure

Each skill includes:

- `SKILL.md` — Main skill definition
- `references/` — Reference documentation
  - `workflow.md` — Workflow steps
  - `output-format.md` — Output structure
  - `verification.md` — Verification steps
  - `exit-criteria.md` — Exit criteria

### Skill Behavior

Every skill:

1. Takes defined inputs
2. Follows repeatable workflow
3. Runs specific checks
4. Produces grounded findings
5. Verifies output quality
6. States exit criteria

---

## Agents

### Core Agents

| Agent | Purpose | Type |
|-------|---------|------|
| `review-orchestrator` | Orchestrates review process | Orchestrator |
| `document-intake-agent` | Handles artifact intake | Intake |
| `review-spec-builder` | Builds review spec | Builder |
| `validator-router` | Routes validators | Router |
| `decision-reviewer` | Checks decision clarity | Validator |
| `evidence-reviewer` | Checks evidence quality | Validator |
| `metric-reviewer` | Checks metric quality | Validator |
| `requirement-reviewer` | Checks requirement quality | Validator |
| `technical-feasibility-reviewer` | Checks technical approach | Validator |
| `strategy-reviewer` | Checks strategic clarity | Validator |
| `opportunity-sizing-reviewer` | Checks opportunity sizing | Validator |
| `simpler-alternative-reviewer` | Checks simpler alternatives | Validator |
| `ai-safety-guardrails-reviewer` | Checks AI guardrails | Validator |
| `cost-roi-sanity-reviewer` | Checks cost/ROI logic | Validator |
| `finding-quality-auditor` | Audits finding quality | Auditor |
| `severity-calibrator` | Calibrates severity | Calibrator |
| `output-guard` | Guards output quality | Guard |

### Agent Types

**Orchestrator**:
- Coordinates entire review workflow
- Manages agent execution
- Ensures workflow completion

**Intake**:
- Reads artifact
- Detects format
- Classifies artifact type

**Builder**:
- Constructs review spec
- Selects dimensions
- Applies mode settings

**Router**:
- Selects validators
- Routes based on artifact type
- Applies validator budgets

**Validator**:
- Runs specific checks
- Produces findings
- Runs in mode (full_review, gap_detection, not_applicable)

**Auditor**:
- Reviews findings
- Removes low-quality findings
- Ensures grounding and actionability

**Calibrator**:
- Adjusts severity
- Ensures consistency
- Prevents overcriticism

**Guard**:
- Validates output
- Prevents toxic language
- Prevents invented evidence

---

## Hooks

### Lifecycle Hooks

| Hook | Purpose | When |
|------|---------|------|
| `pre-review-hook` | Before review starts | Pre-intake |
| `validator-selection-hook` | During validator routing | Pre-validation |
| `finding-quality-hook` | During finding audit | Post-validation |
| `verdict-consistency-hook` | During verdict generation | Pre-output |
| `security-warning-hook` | On sensitive content detection | During intake |

### Hook Behavior

**Pre-Review Hook**:
- Validates environment
- Checks configuration
- Validates inputs

**Validator Selection Hook**:
- Customizes validator routing
- Applies custom budgets
- Filters validators

**Finding Quality Hook**:
- Customizes finding audit
- Applies custom filters
- Adjusts finding thresholds

**Verdict Consistency Hook**:
- Validates verdict consistency
- Checks score alignment
- Ensures findings support verdict

**Security Warning Hook**:
- Detects sensitive content
- Warns user
- Recommends safe modes

### Hook Configuration

Hooks can be configured via:

- `.claude/hooks/settings.json` — Hook settings
- Environment variables — Hook behavior
- Command flags — Hook override

---

## Evals

### Artifact Type Evals

| Eval | Artifact | Quality Level |
|------|----------|---------------|
| `prd-low-readiness.yaml` | PRD | Low readiness |
| `prd-good-minimal.yaml` | PRD | Good, minimal |
| `rfc-vague.yaml` | RFC | Vague |
| `rfc-good-minimal.yaml` | RFC | Good, minimal |
| `experiment-plan-weak.yaml` | Experiment Plan | Weak |
| `experiment-plan-good-minimal.yaml` | Experiment Plan | Good, minimal |
| `product-strategy-vague.yaml` | Product Strategy | Vague |
| `product-strategy-good-minimal.yaml` | Product Strategy | Good, minimal |

### Special Case Evals

| Eval | Purpose | Tests |
|------|---------|-------|
| `ai-prd-overclaimed.yaml` | Overclaimed AI PRD | Prevents overhyping |
| `unsupported-format.yaml` | Unsupported format | Error handling |
| `anti-overcriticism.yaml` | Anti-overcriticism | Prevents nitpicking |
| `security-warning.yaml` | Security warning | Sensitive content detection |

### Eval Structure

Each eval includes:

```yaml
id: unique-eval-id
artifact_type: PRD | RFC | EXPERIMENT_PLAN | PRODUCT_STRATEGY
input_file: path/to/input.md
expected_tags: [tag1, tag2, ...]
expected_score_band: Review-ready | Ready with minor fixes | ...
expected_score_caps: [cap1, cap2, ...]
required_validators: [validator1, validator2, ...]
forbidden_behaviors: [behavior1, behavior2, ...]
required_output_fields: [field1, field2, ...]
notes: Additional context
```

### Running Evals

```bash
# Run all evals
shokunin eval

# Run specific eval
shokunin eval --filter prd-low-readiness

# Run with verbose output
shokunin eval --verbose
```

---

## Rubrics

### Scoring Rubrics

| Rubric | Purpose |
|--------|---------|
| `readiness-score.yaml` | Score calculation rules |
| `score-caps.yaml` | Score cap definitions |
| `finding-quality.yaml` | Finding quality criteria |
| `validator-coverage.yaml` | Validator coverage requirements |

### Quality Rubrics

| Rubric | Purpose |
|--------|---------|
| `hallucination-check.yaml` | Prevent invented evidence |
| `tone-safety.yaml` | Ensure non-toxic tone |
| `anti-bloat.yaml` | Prevent output bloat |
| `security-safety.yaml` | Ensure security handling |

---

## Finding Tags

### Core Tags

| Tag | Category | When Used |
|-----|----------|-----------|
| `[noise-bloat]` | Quality | Verbose without signal |
| `[overclaim]` | Evidence | Claim without support |
| `[logic-drift]` | Logic | Inconsistent reasoning |
| `[missing-decision]` | Decision | Decision not stated |
| `[evidence-gap]` | Evidence | Evidence missing |
| `[metric-fog]` | Metric | Metric unclear |
| `[requirement-fog]` | Requirement | Requirement not testable |
| `[tech-handwave]` | Technical | Technical detail deferred |
| `[dependency-gap]` | Technical | Dependency not acknowledged |
| `[architecture-gap]` | Technical | System boundary unclear |
| `[experiment-gap]` | Experiment | Experimental design issue |
| `[duplicate-risk]` | Risk | Duplicate work risk |
| `[review-blocker]` | Blocker | Blocks review progress |
| `[simpler-alternative-gap]` | Strategy | Simpler solution not considered |
| `[cost-gap]` | Financial | Cost/ROI unclear |
| `[ai-guardrail-gap]` | Safety | AI guardrails missing |
| `[strategy-fog]` | Strategy | Strategy unclear |
| `[segment-fog]` | Strategy | Target segment unclear |
| `[opportunity-fog]` | Strategy | Opportunity sizing unclear |
| `[tradeoff-gap]` | Strategy | Tradeoffs not stated |

---

## Score Bands

| Score | Band | Meaning |
|-------|------|---------|
| 90–100 | Review-ready | Ready for human review |
| 75–89 | Ready with minor fixes | Minor improvements needed |
| 60–74 | Needs major fixes | Significant improvements needed |
| 40–59 | Needs revision | Major revisions needed |
| 0–39 | Not review-ready | Not ready for review |

---

## Score Caps

| Cap | Max Score | Condition |
|-----|-----------|-----------|
| No problem evidence | 60 | No evidence for problem claims |
| No primary metric | 55 | No primary success metric |
| No MVP scope | 55 | No MVP scope defined |
| No decision ask | 65 | No decision stated |
| No AI guardrails for AI feature | 70 | AI feature without guardrails |
| Critical placeholders present | 68 | TBD/TTR in critical sections |
| Unknown artifact type | 70 | Type not confidently classified |
| Low context confidence | 75 | Important context missing |
| Generic strategy language only | 55 | Strategy only vague language |
| No target segment | 60 | No target customer/ICP |
| No tradeoffs | 70 | No tradeoffs stated |

---

## Artifact Types

### Supported Types

| Type | Description | Common Variants |
|------|-------------|-----------------|
| **PRD** | Product Requirements | Classic, One-pager, PR/FAQ, Feature Spec, AI-native, Agent-readable |
| **RFC** | Technical Design | RFC, Technical Design Doc, API Design, Migration, AI System Design |
| **Experiment Plan** | Pre-A/B-test Plan | A/B Test, Feature Flag, Pricing, Growth, Search/Ranking, ML Experiment |
| **Product Strategy** | Strategic Choice | Strategy Memo, Narrative, Opportunity Solution Tree, Product Bet, AI Strategy |

### Unsupported Types (MVP 1)

- ADR (Architecture Decision Records)
- Executive memos
- Architecture notes
- ML / DS feature documents
- Research papers
- Legal documents
- Compliance documents

---

## Output Modes

| Mode | Output | When to Use |
|------|--------|-------------|
| **Default** | Short: verdict + score + blockers | Most reviews |
| **Full** | All findings + dimensions | Deep analysis |
| **JSON** | Structured JSON | Automation |
| **Markdown** | Markdown report | Documentation |
| **Quiet** | Minimal: verdict + action | Scripts |

---

## Review Modes

| Mode | Description | When to Use |
|------|-------------|-------------|
| **Fast** | Reduced validator budget | Quick reviews |
| **Deep** | Full validator budget | Comprehensive reviews |
| **Draft** | Adjusted for draft state | Early-stage docs |

---

## Mascot States

| State | Emoji | Description |
|-------|-------|-------------|
| `idle` | 💤 | Waiting for input |
| `reading` | 📖 | Reading artifact |
| `classifying` | 🔍 | Determining artifact type |
| `scoping` | 📐 | Building review spec |
| `routing` | 🔀 | Routing validators |
| `checking` | 🔎 | Running validators |
| `auditing` | 🔬 | Auditing findings |
| `scoring` | 📊 | Calculating score |
| `verifying` | ✓ | Verifying output |
| `done` | ✓ | Review complete |
| `blocked` | 🚫 | Blocker found |
| `unsupported` | ⚠️ | Unsupported format/type |

---

## Status Colors

| Status | Color | Hex |
|--------|-------|-----|
| `idle` | Muted gray | #8A969E |
| `reading` | Muted blue | #6F95A5 |
| `classifying` | Steel blue | #7A95B5 |
| `scoping` | Slate | #8A95A0 |
| `routing` | Muted blue | #6F95A5 |
| `checking` | Amber | #B7A27A |
| `auditing` | Orange | #C97752 |
| `scoring` | Blue-green | #8FAE9A |
| `verifying` | Slate | #8A95A0 |
| `done` | Muted green | #8FAE9A |
| `blocked` | Muted red | #B97868 |
| `unsupported` | Amber | #B7A27A |

---

## Templates

### Schema Templates

| Template | Purpose |
|----------|---------|
| `review-output.schema.json` | Review output structure |
| `finding.schema.json` | Finding structure |
| `review-spec.schema.json` | Review spec structure |

### Document Templates

| Template | Purpose |
|----------|---------|
| `prd-template.md` | PRD structure |
| `rfc-template.md` | RFC structure |
| `experiment-plan-template.md` | Experiment Plan structure |
| `product-strategy-template.md` | Product Strategy structure |

---

## Examples

### PRD Examples

| File | Description |
|------|-------------|
| `weak-ai-food-agent.before.md` | Weak PRD (before) |
| `weak-ai-food-agent.review.md` | Review output |
| `weak-ai-food-agent.after.md` | Improved PRD (after) |

### RFC Examples

| File | Description |
|------|-------------|
| `vague-risk-engine.before.md` | Vague RFC (before) |
| `vague-risk-engine.review.md` | Review output |
| `vague-risk-engine.after.md` | Improved RFC (after) |

### Experiment Examples

| File | Description |
|------|-------------|
| `checkout-ab-test.before.md` | Weak Experiment Plan (before) |
| `checkout-ab-test.review.md` | Review output |
| `checkout-ab-test.after.md` | Improved Experiment Plan (after) |

### Strategy Examples

| File | Description |
|------|-------------|
| `ai-growth-strategy.before.md` | Vague Strategy (before) |
| `ai-growth-strategy.review.md` | Review output |
| `ai-growth-strategy.after.md` | Improved Strategy (after) |

---

## Summary

### Components

- **9 commands** (Claude Code) + 5 CLI commands
- **5 skills**
- **17 agents**
- **5 hooks**
- **12 evals**
- **8 rubrics**
- **20 finding tags**
- **5 score bands**
- **11 score caps**

### Coverage

- ✅ 4 artifact types
- ✅ 5 input formats
- ✅ 5 output modes
- ✅ 3 review modes
- ✅ 12 mascot states

---

**docs/catalog.md catalogs all Shokunin Review components.**

**Use this document to navigate available features and understand component relationships.**
