# Shokunin Review — Claude Code Prompt v2 (UPDATED)

> Use this prompt in Claude Code from the root of the `shokunin-review` repository.
> Goal: extend MVP 1 methodology so Shokunin evaluates documents as **decision artifacts**, not just text.

## Document Status (June 17, 2026)

**✅ Methodology v2 Updated for Current Project State**

This document has been updated to reflect the current state of the Shokunin Review project:

- **Foundation Complete**: Pass 1-5 completed (119 files, 15,000+ lines)
- **Infrastructure Ready**: CLI, harness, templates, examples all in place
- **Updated Pass Strategy**: Modified to reflect current completion status
- **Implementation Focus**: Methodology v2 extensions only (no foundation recreation)
- **Anti-Overengineering**: Clear guidance on extending vs. recreating

## What This Methodology v2 Covers

This document now provides:

1. **Current Project Status** - Overview of completed foundation (Pass 1-5)
2. **Methodology Extensions** - Decision-quality focus for existing system
3. **Updated File Strategy** - Clear CREATE vs. MODIFY guidance
4. **Implementation Plan** - Pass 6-10 for methodology integration
5. **Guardrails & Validation** - Extended from existing systems
6. **Success Criteria** - Clear methodology completion metrics

## Key Changes from Original

**Updated Sections:**
- ✅ "Current Project Status" - Shows completed foundation
- ✅ "Repository additions" - Distinguishes CREATE vs. MODIFY vs. EXISTING
- ✅ "Pass strategy" - Updated for current completion status  
- ✅ "After changes" - Specific methodology v2 outcomes
- ✅ "Update schemas" - Shows how to extend existing schemas
- ✅ "Guardrails" - Builds on existing guardrail systems

**Implementation Approach:**
- Extend existing CLI (don't recreate)
- Add methodology templates (don't replace existing)
- Enhance existing schemas (don't duplicate)
- Build on existing evals (don't recreate system)

---

## Start instruction for Claude Code

Before editing files, first show:

1. proposed implementation plan
2. files to create/update
3. scope cuts to avoid overengineering
4. methodology changes
5. validation/eval changes

Wait for my approval before editing files.

---

# Current Project Status (UPDATED)

**Foundation Status: ✅ COMPLETE (Pass 1-5)**

The Shokunin Review MVP 1 foundation is **90% complete** with all core infrastructure in place:

## What Has Been Built

### ✅ Documentation (Pass 1-3) - 6 major docs
- `README.md` (29,087 bytes) - Comprehensive project documentation
- `DESIGN.md` (14,075 bytes) - Terminal UX, mascot, design system  
- `FUNCTIONAL_REQUIREMENTS.md` (14,679 bytes) - FR-1 through FR-12
- `NON_FUNCTIONAL_REQUIREMENTS.md` (12,347 bytes) - Reliability, usability, safety
- `SECURITY.md` (9,601 bytes) - Security requirements and warnings
- `ROADMAP.md` (11,621 bytes) - MVP 1-5 development roadmap

### ✅ Additional Documentation (Pass 2)
- `docs/mvp-scope.md` - What MVP 1 supports/excludes
- `docs/limitations.md` - Known limitations
- `docs/anti-overengineering.md` - Guardrails against scope creep
- `docs/compatibility.md` - Claude Code, Cursor, Codex compatibility
- `docs/catalog.md` - Commands, skills, agents, hooks, evals catalog

### ✅ Harness System (Pass 4) - 33 files
- `harness/README.md` - Harness documentation
- **12 eval test cases** covering all artifact types and edge cases
- `harness/evals/` - prd, rfc, experiment, strategy evals
- `harness/golden/` - Expected outputs (to be created)
- `harness/rubrics/` - Scoring rubrics (to be created)
- `harness/traces/` - Review execution traces

### ✅ Templates & Schemas (Pass 4) - 9 files
- `templates/review-output.schema.json` - Main output schema
- `templates/finding.schema.json` - Individual finding schema
- `templates/review-spec.schema.json` - Review specification schema
- `templates/trace.schema.json` - Execution trace schema
- `templates/prd-template.md` (182 lines) - PRD template
- `templates/rfc-template.md` (233 lines) - RFC template
- `templates/experiment-plan-template.md` (252 lines) - Experiment plan template
- `templates/product-strategy-template.md` (281 lines) - Strategy template
- `templates/output-format.md` - Output format documentation

### ✅ Examples (Pass 4) - 12 files
- `examples/prd/` - Before/after/review for AI Food Agent PRD
- `examples/rfc/` - Before/after/review for Risk Engine RFC
- `examples/experiments/` - Before/after/review for Checkout A/B Test
- `examples/strategy/` - Before/after/review for AI Growth Strategy

### ✅ CLI Skeleton (Pass 5) - 21 TypeScript files
- `cli/package.json` - npm package configuration
- `cli/tsconfig.json` - TypeScript configuration
- `cli/README.md` - CLI documentation
- `cli/CHANGELOG.md` - Version history
- `cli/src/cli.ts` - Main CLI entry point
- `cli/src/commands/` - review, score, eval, improve, rerun commands
- `cli/src/utils/` - fileProcessor, reviewEngine, outputFormatter, etc.
- `cli/src/types/` - Complete TypeScript type definitions

## Project Statistics

- **Total Files**: 119 files
- **Total Lines of Code**: 15,000+ lines
- **Documentation**: 6 major docs + 5 additional docs
- **Test Coverage**: 12 eval test cases
- **Templates**: 9 comprehensive templates with schemas
- **Examples**: 12 before/after/review files
- **CLI**: 21 TypeScript files with complete architecture

## What's Missing for MVP 1

### 🔄 Next Steps
1. **Validator Implementation** - Implement the 17 focused validators
2. **Methodology v2 Integration** - Extend system with decision quality focus
3. **Golden Outputs** - Create expected outputs for evals
4. **Testing** - Add unit and integration tests
5. **Documentation** - Complete user guides

### ⏳ To Be Created
- `harness/golden/` - Expected outputs for regression testing
- `harness/rubrics/` - Detailed scoring rubrics
- Methodology v2 templates and documentation
- Unit tests for CLI components

## What This Methodology v2 Document Covers

This document extends the existing MVP 1 foundation to add **decision-quality focus**:

1. **Decision Traceability** - Making decisions visible and explainable
2. **Trade-off Analysis** - Understanding what we give up
3. **Risk Analysis** - Classifying and mitigating risks
4. **Constraints & Resources** - Resource realism and constraints
5. **Change Traceability** - Version history and decision evolution
6. **Artifact Graph** - Connecting related documents
7. **Readiness Score v2** - Extended scoring with methodology dimensions
8. **Tone Rules** - Non-toxic, constructive feedback
9. **Updated Checks** - Enhanced validation per artifact type
10. **Updated Output** - Richer methodology-aware reports

The methodology builds on the **existing foundation** rather than replacing it.

---

# Role

You are Claude Code acting as:

- senior AI systems engineer
- validation-harness architect
- product-minded open-source maintainer
- strict MVP editor
- senior product/technical document reviewer

You are working on the repository:

```text
shokunin-review
```

---

# Product context

## Product name

**Shokunin Review**

## One-line positioning

Shokunin Review is a terminal-first review skill and validation harness for AI-assisted work artifacts.

## Tagline

```text
Stops weak work documents before they waste human reviewer time.
```

## Motto

```text
Remove noise. Restore clarity.
```

## Core principle

Shokunin Review checks whether a work artifact is ready for serious human review.

It is not an AI detector.  
It does not accuse authors of using AI.  
It does not optimize for more comments.  
It optimizes for higher decision readiness with the smallest useful revision.

New v2 positioning:

```text
Shokunin Review reviews documents as decision artifacts, not just text.
```

It helps teams understand:

```text
What are we doing?
Why are we doing it?
What are we not doing?
What did we decide?
Why did we choose this option?
What changed?
What risks remain?
What should happen next?
```

---

# Critical terminology rule

Use only this public language:

- noise
- signal
- clarity
- evidence
- decisions
- readiness
- review blocker
- quality gate
- feedback loop
- decision artifact
- trade-off
- risk
- constraint
- resource realism
- change traceability
- execution readiness

Do not use legacy process terms from earlier ideation in:

- README
- DESIGN.md
- docs
- skills
- agents
- commands
- tags
- statuses
- examples
- terminal UX
- CLI output

Keep or create:

```text
bin/check-terminology
```

It must check public files for banned legacy terms and fail if they appear.

---

# MVP 1 scope

MVP 1 supports exactly four artifact types:

1. PRD / Product Requirements documents
2. RFC / Technical Design documents
3. Experiment Plans before A/B test launch
4. Product Strategy documents

MVP 1 is focused on review readiness.

Do not expand MVP 1 into a broad document-review universe.

---

# Supported input formats

MVP 1 supports text-based review.

Supported:

- Markdown files: `.md`
- Plain text files: `.txt`
- Text extracted from docs: `.docx` / Google Docs export
- Text extracted from PDFs: `.pdf`
- Text extracted from presentations: `.pptx`

Important limitation:

MVP 1 reviews extracted text only.

MVP 1 does not deeply analyze:

- visual layout
- embedded images
- screenshots
- complex diagrams
- charts without extracted text
- slide design
- image-only architecture diagrams

If reliable `.docx`, `.pdf`, and `.pptx` extraction is not implemented yet, document them as best-effort or planned partial support. Do not overclaim.

---

# Not supported in MVP 1

MVP 1 does not support:

- image-only diagrams
- visual architecture diagram reasoning
- screenshots
- video
- spreadsheet model validation
- board decks as visual presentations
- full market research validation
- legal/compliance certification
- automatic full document rewrite by default
- web UI
- domain packs
- production data verification
- persistent memory
- MCP server
- market research agents
- board / CEO / CPO simulation

Document these limits clearly in:

- README.md
- docs/mvp-scope.md
- docs/limitations.md
- ROADMAP.md

---

# v2 methodology update

## Goal

Extend Shokunin Review MVP 1 methodology so it evaluates not only document clarity and completeness, but also:

- decision quality
- trade-offs
- risk coverage
- constraints
- resources
- change traceability
- execution readiness
- stakeholder questions
- artifact graph consistency

A strong document should answer:

```text
What are we trying to achieve?
Why does it matter?
What options were considered?
What decision was made?
Why was this option chosen?
What trade-offs were accepted?
What risks exist?
What constraints limit the solution?
What resources are required?
What changed since the previous version?
What should the team do next?
```

---

# Repository additions for methodology v2 (UPDATED)

## Files to Create (NEW)

```text
docs/methodology/
  README.md                           (NEW)
  readiness-score.md                  (NEW)
  decision-traceability.md            (NEW)
  change-traceability.md              (NEW)
  tradeoff-analysis.md                (NEW)
  risk-analysis.md                    (NEW)
  constraints-and-resources.md        (NEW)
  artifact-graph.md                   (NEW)
  stakeholder-questions.md            (NEW)
  methodology-by-artifact-type.md     (NEW)

templates/
  decision-log-template.md            (NEW)
  decision-record-template.md         (NEW)
  changelog-template.md               (NEW)
  risk-register-template.md           (NEW)
  tradeoff-analysis-template.md       (NEW)
  constraints-resources-template.md   (NEW)

harness/rubrics/
  readiness-score-v2.yaml             (NEW)
  decision-traceability-rubric.yaml   (NEW)
  change-traceability-rubric.yaml     (NEW)
  tradeoff-analysis-rubric.yaml       (NEW)
  risk-analysis-rubric.yaml           (NEW)
  constraints-resources-rubric.yaml   (NEW)
  execution-readiness-rubric.yaml     (NEW)
```

## Files to Modify (EXISTING)

```text
README.md                             (MODIFY - add methodology section)
cli/src/types/index.ts               (MODIFY - add methodology types)
templates/review-output.schema.json   (MODIFY - add methodology fields)
templates/finding.schema.json         (MODIFY - add methodology_dimension)
cli/src/utils/reviewEngine.ts         (MODIFY - add methodology scoring)
cli/src/utils/outputFormatter.ts     (MODIFY - add methodology output)
cli/src/utils/validatorRegistry.ts  (MODIFY - add methodology validators)
```

## Files That Already Exist (DO NOT MODIFY)

```text
✅ DESIGN.md                          (Already complete)
✅ FUNCTIONAL_REQUIREMENTS.md         (Already complete)
✅ NON_FUNCTIONAL_REQUIREMENTS.md     (Already complete)
✅ SECURITY.md                        (Already complete)
✅ ROADMAP.md                         (Already complete)
✅ docs/mvp-scope.md                  (Already complete)
✅ docs/limitations.md                (Already complete)
✅ docs/anti-overengineering.md      (Already complete)
✅ docs/compatibility.md              (Already complete)
✅ docs/catalog.md                    (Already complete)
✅ harness/README.md                  (Already complete)
✅ harness/evals/*.yaml               (12 files already exist)
✅ templates/prd-template.md           (Already complete)
✅ templates/rfc-template.md           (Already complete)
✅ templates/experiment-plan-template.md (Already complete)
✅ templates/product-strategy-template.md (Already complete)
✅ templates/review-output.schema.json (Already complete)
✅ templates/finding.schema.json       (Already complete)
✅ templates/review-spec.schema.json   (Already complete)
✅ examples/prd/*.md                   (3 files already exist)
✅ examples/rfc/*.md                   (3 files already exist)
✅ examples/experiments/*.md           (3 files already exist)
✅ examples/strategy/*.md              (3 files already exist)
✅ cli/package.json                    (Already complete)
✅ cli/tsconfig.json                   (Already complete)
✅ cli/src/cli.ts                     (Already complete)
✅ cli/src/commands/*.ts              (5 commands already exist)
✅ cli/src/utils/*.ts                 (6 utilities already exist)
```

## Implementation Strategy

**Phase 1: Documentation (Pass 6)**
- Create all docs/methodology/ files
- Update README.md with methodology positioning

**Phase 2: Templates & Rubrics (Pass 7)**
- Create 6 new methodology templates
- Create 7 new methodology rubrics

**Phase 3: Integration (Pass 8-9)**
- Modify existing CLI types and schemas
- Extend existing CLI utilities
- Add methodology validators to registry

**Phase 4: Testing (Pass 10)**
- Create 8 new methodology evals
- Create 6 new before/after examples
- Validate against existing evals

**Important: Do Not Recreate Existing Components**

The foundation is solid. Focus on methodology-specific extensions only.

---

# 1. Decision Traceability

## Purpose

A document should make decisions visible.

Shokunin should check:

- what was decided
- why it was decided
- who owns the decision
- when it was decided
- what alternatives were considered
- what was rejected and why
- what consequences follow from the decision
- when the decision should be revisited

## Artifact-specific expectations

### PRD

A PRD should include a short **Decision Summary**:

- product decision
- scope decision
- metric decision
- launch decision
- non-goals
- owner

**Implementation Note:** The existing PRD template (`templates/prd-template.md`) already includes most of these sections. Methodology v2 will enhance it with explicit decision traceability.

### RFC / Technical Design

An RFC should include or link to:

- technical decision record
- ADR if applicable
- alternatives considered
- rejected options
- consequences
- revisit trigger

**Implementation Note:** The existing RFC template (`templates/rfc-template.md`) includes alternatives and trade-offs. Methodology v2 will enhance it with explicit decision records and ADR support.

### Experiment Plan

An Experiment Plan should include:

- launch decision criteria
- ship / no-ship decision rule
- stopping rule
- guardrail decision
- interpretation rule

**Implementation Note:** The existing experiment plan template (`templates/experiment-plan-template.md`) includes hypothesis and metrics. Methodology v2 will enhance it with explicit decision rules and guardrails.

### Product Strategy

A Product Strategy document should include:

- strategic bets
- rejected alternatives
- sequencing decision
- resource allocation logic
- decision ask

**Implementation Note:** The existing product strategy template (`templates/product-strategy-template.md`) includes strategic thesis and options. Methodology v2 will enhance it with explicit strategic bets and resource logic.

## Decision Summary template

Create:

```text
templates/decision-log-template.md
```

Content:

```markdown
# Decision Summary

| Date | Decision | Type | Rationale | Owner | Link |
|---|---|---|---|---|---|
| YYYY-MM-DD |  | Product / Tech / UX / Risk / Legal / Operational |  |  |  |
```

## Decision Record template

Create:

```text
templates/decision-record-template.md
```

Content:

```markdown
# DEC-001: [Decision title]

## Context

What problem, opportunity, or constraint forced this decision?

## Options Considered

### Option A

### Option B

### Option C

## Decision

What did we choose?

## Rationale

Why this option?

## Trade-offs

What did we gain and what did we sacrifice?

## Consequences

What becomes easier, harder, cheaper, riskier, or slower?

## Revisit Trigger

When should we reconsider this decision?
```

## Scoring rubric

Create:

```text
harness/rubrics/decision-traceability-rubric.yaml
```

Use this scale:

```yaml
dimension: decision_traceability
scale:
  0: no decisions visible
  1: decisions implied but not explicit
  2: some decisions stated but rationale or ownership missing
  3: decisions, owners, rationale, and alternatives are mostly clear
  4: decisions, owners, rationale, alternatives, consequences, and revisit triggers are clear
checks:
  - decision_is_explicit
  - rationale_exists
  - owner_exists
  - alternatives_considered
  - rejected_options_explained
  - consequences_explained
  - revisit_trigger_defined
```

---

# 2. Trade-off Analysis

## Purpose

A document should not only describe the chosen solution.

It should explain what the team gives up by choosing it.

## Trade-off categories

Add these categories to:

- docs/methodology/tradeoff-analysis.md
- templates/tradeoff-analysis-template.md
- harness/rubrics/tradeoff-analysis-rubric.yaml

Categories:

- speed vs quality
- short-term delivery vs long-term maintainability
- user experience vs security
- conversion vs fraud/risk
- automation vs human review
- cost vs reliability
- simplicity vs flexibility
- scope vs time-to-market
- custom solution vs external vendor
- platform consistency vs local optimization
- model quality vs latency
- personalization vs privacy
- global standardization vs local market needs

## Checks

For each important decision, Shokunin should check:

- Are alternatives listed?
- Is the chosen option justified?
- Are rejected options explained?
- Are trade-offs explicit?
- Are one-way-door vs two-way-door decisions identified?
- Is the decision reversible?
- Is there a revisit trigger?
- Is the cost of the trade-off visible?

## Template

Create:

```text
templates/tradeoff-analysis-template.md
```

Content:

```markdown
# Trade-off Analysis

| Decision | Option Chosen | Alternatives | What We Gain | What We Give Up | Reversibility | Revisit Trigger |
|---|---|---|---|---|---|---|
|  |  |  |  |  | One-way / Two-way |  |
```

## Scoring rubric

```yaml
dimension: tradeoff_quality
scale:
  0: no trade-offs mentioned
  1: trade-offs mentioned vaguely
  2: some trade-offs explained, but no alternatives
  3: alternatives and trade-offs are clear
  4: alternatives, trade-offs, consequences, reversibility, and revisit trigger are clear
checks:
  - alternatives_listed
  - chosen_option_justified
  - rejected_options_explained
  - gains_and_losses_explicit
  - reversibility_identified
  - revisit_trigger_defined
```

---

# 3. Risk Analysis

## Purpose

Shokunin should classify risks by type and check whether risks are actionable.

Create:

- docs/methodology/risk-analysis.md
- templates/risk-register-template.md
- harness/rubrics/risk-analysis-rubric.yaml

## Risk categories

### Product risks

- wrong user problem
- weak customer evidence
- low adoption
- poor UX
- low retention
- metric does not reflect real value
- unclear target segment

### Business risks

- weak ROI
- revenue impact unclear
- cost increase
- cannibalization
- pricing / monetization risk
- market timing risk
- competitive risk

### Technical risks

- scalability
- performance
- latency
- reliability
- data quality
- integration complexity
- migration complexity
- observability gaps
- security architecture gaps

### Legal / compliance risks

- GDPR / privacy
- data retention
- consent
- auditability
- regulated domain constraints
- KYC / AML / fraud obligations
- model / AI safety requirements

### Operational risks

- support burden
- manual operations
- incident response
- rollback complexity
- on-call impact
- monitoring gaps
- vendor dependency

### Team / resource risks

- not enough engineering capacity
- missing data science / ML support
- missing legal / security support
- unclear ownership
- cross-team dependency
- unrealistic timeline
- knowledge silos

### AI / LLM-specific risks

- hallucination
- prompt injection
- unsafe tool use
- data leakage
- weak evals
- model drift
- cost explosion
- low trust in outputs
- missing human review

## Risk checks

For each risk, Shokunin should check:

- Is the risk named?
- Is risk type clear?
- Is probability described?
- Is impact described?
- Is mitigation proposed?
- Is owner assigned?
- Is monitoring defined?
- Is rollback / fallback defined?
- Is trigger threshold defined?

## Template

Create:

```text
templates/risk-register-template.md
```

Content:

```markdown
# Risk Register

| Risk | Type | Probability | Impact | Mitigation | Owner | Monitoring / Trigger | Rollback / Fallback |
|---|---|---|---|---|---|---|---|
|  | Product / Business / Technical / Legal / Operational / Team / AI | Low / Medium / High | Low / Medium / High |  |  |  |  |
```

## Scoring rubric

```yaml
dimension: risk_coverage
scale:
  0: risks missing
  1: risks listed but not classified
  2: risks classified but weak mitigations
  3: risks classified with owners and mitigations
  4: risks include probability, impact, owner, mitigation, monitoring, and rollback
checks:
  - risks_named
  - risk_types_classified
  - probability_defined
  - impact_defined
  - mitigation_defined
  - owner_defined
  - monitoring_defined
  - rollback_defined
```

---

# 4. Constraints and Resource Analysis

## Purpose

A strong document should explain what limits the solution.

Create:

- docs/methodology/constraints-and-resources.md
- templates/constraints-resources-template.md
- harness/rubrics/constraints-resources-rubric.yaml

## Constraint categories

### Time constraints

- deadline
- launch window
- regulatory deadline
- dependency deadline
- experiment duration

### Resource constraints

- engineering capacity
- design capacity
- data / ML capacity
- legal / compliance support
- QA capacity
- support / operations capacity

### Technical constraints

- legacy system
- API limits
- data availability
- latency budget
- infrastructure cost
- security requirements
- backward compatibility

### Business constraints

- budget
- market pressure
- pricing model
- partner requirements
- contractual obligations

### Organizational constraints

- cross-team dependencies
- ownership gaps
- approval process
- team expertise
- support model

## Checks

Shokunin should check:

- Are constraints explicit?
- Are assumptions separated from facts?
- Are dependencies named?
- Are required resources listed?
- Are capacity risks visible?
- Is the timeline realistic?
- Is there a reduced-scope fallback?
- Are owners visible?
- Are approvals visible?

## Template

Create:

```text
templates/constraints-resources-template.md
```

Content:

```markdown
# Constraints & Resources

## Constraints

| Constraint | Type | Impact | Mitigation / Fallback |
|---|---|---|---|
|  | Time / Resource / Technical / Business / Org |  |  |

## Required Resources

| Role / Team | Needed For | Capacity Assumption | Risk |
|---|---|---|---|
| Engineering |  |  |  |
| Design |  |  |  |
| Data / Analytics |  |  |  |
| Legal / Compliance |  |  |  |
| Support / Operations |  |  |  |
```

## Scoring rubric

```yaml
dimension: constraints_resource_realism
scale:
  0: no constraints or resources
  1: constraints mentioned vaguely
  2: constraints listed, but no impact or mitigation
  3: constraints, resources, and dependencies are clear
  4: constraints, resources, dependencies, fallback, and capacity risks are clear
checks:
  - constraints_explicit
  - assumptions_separated_from_facts
  - dependencies_named
  - required_resources_listed
  - capacity_risks_visible
  - timeline_realistic
  - reduced_scope_fallback_defined
```

---

# 5. Change Traceability

## Purpose

Documents should have version history or changelog when they affect decisions.

Create:

- docs/methodology/change-traceability.md
- templates/changelog-template.md
- harness/rubrics/change-traceability-rubric.yaml

## Artifact-specific expectations

### PRD changes should explain changes in:

- scope
- requirements
- target user
- success metrics
- risks
- launch plan
- dependencies

### RFC changes should explain changes in:

- architecture
- API contract
- data model
- security design
- migration plan
- rollback plan
- observability

### Experiment Plan changes should explain changes in:

- hypothesis
- metric
- segment
- sample size
- duration
- guardrails
- decision rule

### Product Strategy changes should explain changes in:

- strategic bet
- target market
- ICP
- positioning
- success metric
- resource allocation
- roadmap logic

## Template

Create:

```text
templates/changelog-template.md
```

Content:

```markdown
# Changelog

| Version | Date | Change | Reason | Impact | Decision Link |
|---|---|---|---|---|---|
| v0.1 | YYYY-MM-DD |  |  |  |  |
```

## Scoring rubric

```yaml
dimension: change_traceability
scale:
  0: no changelog
  1: version exists but changes unclear
  2: changes listed but no reason
  3: change, reason, and impact are clear
  4: change, reason, impact, and linked decision are clear
checks:
  - version_history_exists
  - change_described
  - reason_described
  - impact_described
  - decision_linked
```

Important guardrail:

Do not penalize first drafts heavily for missing changelog unless the artifact clearly claims to be a revised version or contains version history.

---

# 6. Artifact Graph

## Purpose

Shokunin should help users see whether artifacts are connected.

Create:

```text
docs/methodology/artifact-graph.md
```

## Artifact graph idea

Documents should not live alone.

A strong artifact may link to:

```text
Product Strategy
→ PRD
→ RFC / Technical Design
→ Experiment Plan
→ Decision Log
→ Changelog
→ Re-review Report
```

## Checks

Shokunin should check:

- Does PRD link to strategy or product bet if relevant?
- Does PRD link to RFC when technical complexity is high?
- Does Experiment Plan link to PRD or strategy?
- Does RFC link to PRD and decisions?
- Does Strategy link to product bets, roadmap, or PRDs?
- Are links missing but not required?
- Are linked artifacts referenced without being available?

Important rule:

Do not penalize every document for missing links.

Only flag missing artifact links when the document depends on them for decision quality.

---

# 7. Readiness Score v2

Create or update:

- docs/methodology/readiness-score.md
- harness/rubrics/readiness-score-v2.yaml

## New scoring dimensions

Score each dimension from 0 to 4.

Dimensions:

1. Clarity
2. Completeness
3. Evidence Quality
4. Metrics Quality
5. Risk Coverage
6. Trade-off Quality
7. Decision Traceability
8. Change Traceability
9. Constraints & Resource Realism
10. Execution Readiness
11. Domain-specific Requirements
12. Agent-readability

## Dimension scale

```text
0 = missing
1 = weak
2 = partially ready
3 = ready with minor gaps
4 = strong
```

## Score formula

```text
total_score = sum(dimension_scores) / max_possible_score * 100
```

## Readiness bands

```text
0–39: Not ready
40–59: Needs major work
60–74: Reviewable but risky
75–89: Ready with minor improvements
90–100: Strong / stakeholder-ready
```

## Required score metadata

Each score must include:

- score
- band
- score confidence
- missing context
- score caps applied
- short rationale

## Methodology score caps

Keep existing score caps.

Add or update:

```yaml
score_caps:
  no_decision_traceability_for_decision_doc: 70
  no_tradeoffs_for_major_decision: 70
  no_risk_analysis_for_high_impact_change: 70
  no_constraints_or_resources_for_delivery_plan: 70
  no_changelog_for_revised_artifact: 80
  no_decision_rule_for_experiment: 55
  no_rollback_for_high_risk_rfc: 70
  no_strategic_bet_for_strategy_doc: 60
  no_rejected_options_for_strategy_doc: 70
```

If multiple caps apply, use the strictest cap.

---

# 8. Tone rules

The output should never be toxic.

Use language like:

- “Consider adding...”
- “This would be stronger if...”
- “The main gap is...”
- “A reviewer may ask...”
- “To reduce risk, add...”
- “This is reviewable, but risky because...”
- “This is acceptable as a draft, but not yet decision-ready.”

Avoid language like:

- “This is bad”
- “Poorly written”
- “Wrong”
- “Obviously missing”
- “Unacceptable”
- “AI slop”

---

# 9. Update checks by document type

## PRD checks

Add checks for:

- Product decision summary
- Product trade-offs
- Product / business / legal / operational / team risks
- Constraints and resource assumptions
- PRD changelog
- Links to RFC, Experiment Plan, Strategy, or Decision Log
- Non-goals and scope boundaries
- Decision rationale for key product choices
- Minimal viable scope versus expanded scope

Critical warnings:

- PRD has requirements but no decision rationale
- PRD has scope but no non-goals
- PRD has business goal but no metric
- PRD has launch plan but no resource constraints
- PRD changed but no changelog explains why
- PRD asks for build approval but does not explain rejected options

## RFC / Technical Design checks

Add checks for:

- Alternatives considered
- Architecture trade-offs
- Technical risks
- Security / privacy risks
- Migration and rollback
- Resource constraints
- RFC changelog
- ADR / Decision Record links
- Operational readiness
- Observability / alerting
- Failure modes and fallback

Critical warnings:

- RFC describes architecture but not alternatives
- RFC has a chosen solution but no trade-off analysis
- RFC has no rollout or rollback plan
- RFC changes architecture but does not record why
- RFC introduces risk but has no owner or monitoring trigger

## Experiment Plan checks

Add checks for:

- Experiment decision rule
- Product and business risks
- Legal / ethical risks
- Operational risks
- Guardrail metrics
- Sample size / duration assumptions
- Resource needs
- Experiment changelog
- Rollback / stop rule
- Interpretation limits

Critical warnings:

- Experiment has hypothesis but no decision rule
- Experiment has primary metric but no guardrails
- Experiment has launch plan but no rollback
- Experiment changed metrics or audience but no changelog
- Experiment can create harm but has no monitoring trigger

## Product Strategy checks

Add checks for:

- Strategic bets
- Rejected options
- Business trade-offs
- Resource allocation logic
- Market / competitive risks
- Team / execution constraints
- Strategy changelog
- Links to PRDs, roadmap, or product bets
- Opportunity sizing assumptions
- Sequencing logic
- What the strategy explicitly will not do

Critical warnings:

- Strategy has direction but no trade-offs
- Strategy has ambition but no resource logic
- Strategy has goals but no strategic bets
- Strategy changed priorities but no decision trace
- Strategy claims opportunity but does not explain assumptions
- Strategy has roadmap items but no sequencing logic

---

# 10. Update full output format

Default terminal output remains short.

Full report with `--full` should include:

```markdown
# Shokunin Review Report

## Document Type

PRD / RFC / Experiment Plan / Product Strategy

## Readiness Score

Score: XX / 100  
Band: Not ready / Needs major work / Reviewable but risky / Ready with minor improvements / Strong  
Confidence: High / Medium / Low

## Strong Points

- ...

## Main Gaps

- ...

## Methodology Scores

| Dimension | Score 0–4 | Feedback |
|---|---:|---|
| Clarity |  |  |
| Completeness |  |  |
| Evidence Quality |  |  |
| Metrics Quality |  |  |
| Risk Coverage |  |  |
| Trade-off Quality |  |  |
| Decision Traceability |  |  |
| Change Traceability |  |  |
| Constraints & Resource Realism |  |  |
| Execution Readiness |  |  |
| Domain-specific Requirements |  |  |
| Agent-readability |  |  |

## Decision Traceability

Score: 0–4  
Feedback: ...

## Trade-off Analysis

Score: 0–4  
Feedback: ...

## Risk Coverage

Score: 0–4  
Feedback: ...

## Constraints & Resources

Score: 0–4  
Feedback: ...

## Change Traceability

Score: 0–4  
Feedback: ...

## Top 5 Recommended Improvements

1. ...
2. ...
3. ...
4. ...
5. ...

## Questions Stakeholders May Ask

### Product

### Engineering

### Data

### Legal / Compliance

### Operations

### Leadership

## Suggested Next Step

A respectful and practical recommendation for what to improve first.
```

---

# 11. Update README

Add a section:

```markdown
## What Shokunin Review validates

Shokunin Review does not only check writing quality.

It validates whether a document is:

- clear
- complete
- evidence-backed
- metric-aware
- decision-ready
- risk-aware
- trade-off-aware
- change-traceable
- resource-realistic
- execution-ready
- safe for human and agent use

Shokunin Review reviews documents as decision artifacts, not just text.

It helps teams answer:

- What are we doing?
- Why are we doing it?
- What are we not doing?
- What did we decide?
- Why did we choose this option?
- What changed?
- What risks remain?
- What should happen next?
```

Add concise positioning:

```text
Less noise. Better decisions. Traceable improvement.
```

---

# 12. Update skills

Update these skills:

```text
.claude/skills/shokunin-review/SKILL.md
.claude/skills/shokunin-score/SKILL.md
.claude/skills/shokunin-verify/SKILL.md
.claude/skills/shokunin-strategy/SKILL.md
```

## Skill workflow update

Every review skill should include this workflow:

```text
1. Read artifact.
2. Detect artifact type, audience, maturity, and intent.
3. Build review spec.
4. Extract claims, decisions, metrics, requirements, risks, constraints, resources, trade-offs, and change history.
5. Select relevant validators.
6. Generate grounded findings.
7. Score methodology dimensions.
8. Apply score caps.
9. Verify findings and tone.
10. Recommend smallest useful improvement.
11. Suggest re-review path.
```

## Verification update

Before returning output, verify:

- every finding is grounded in artifact text
- every finding has a concrete suggested fix
- every methodology score has rationale
- no fake metrics, research, logs, company strategy, or internal context were invented
- trade-off gaps are not treated as style issues
- risk gaps include type and impact
- constraints/resource gaps do not invent team capacity
- changelog gaps are only flagged when versioning matters
- output is not too long by default
- tone is calm, direct, and non-toxic

---

# 13. Update agents without overengineering

Do not create many new agents.

Prefer extending existing agents:

- `decision-reviewer.md` handles Decision Traceability
- `evidence-reviewer.md` handles grounding and evidence gaps
- `metric-reviewer.md` handles Metrics Quality
- `technical-feasibility-reviewer.md` handles technical constraints and execution readiness
- `strategy-reviewer.md` handles strategic bets, rejected options, resource logic
- `opportunity-sizing-reviewer.md` handles sizing assumptions and business logic
- `cost-roi-sanity-reviewer.md` handles cost, ROI, resource realism
- `finding-quality-auditor.md` verifies grounding and actionability
- `severity-calibrator.md` calibrates methodology findings
- `output-guard.md` enforces tone and non-toxic language

Add only if necessary:

```text
risk-constraints-reviewer.md
```

But do not add it if existing reviewers can cover risk and constraints.

Do not add:

- CEO/CPO/board personas
- market research agent
- domain packs
- persistent memory
- MCP server

---

# 14. Update schemas (UPDATED)

## Current Schema Status

**Existing schemas (Pass 4):**
- ✅ `templates/review-output.schema.json` - Already complete with verdict, score, findings
- ✅ `templates/finding.schema.json` - Already complete with finding structure
- ✅ `templates/review-spec.schema.json` - Already complete with artifact type and review mode

## Required Schema Extensions

Modify existing schemas to support methodology v2:

### Update `templates/review-output.schema.json`

Add these fields to the existing schema:

```json
{
  "methodology_scores": {
    "type": "object",
    "properties": {
      "clarity": {"type": "integer", "minimum": 0, "maximum": 4},
      "completeness": {"type": "integer", "minimum": 0, "maximum": 4},
      "evidence_quality": {"type": "integer", "minimum": 0, "maximum": 4},
      "metrics_quality": {"type": "integer", "minimum": 0, "maximum": 4},
      "risk_coverage": {"type": "integer", "minimum": 0, "maximum": 4},
      "tradeoff_quality": {"type": "integer", "minimum": 0, "maximum": 4},
      "decision_traceability": {"type": "integer", "minimum": 0, "maximum": 4},
      "change_traceability": {"type": "integer", "minimum": 0, "maximum": 4},
      "constraints_resource_realism": {"type": "integer", "minimum": 0, "maximum": 4},
      "execution_readiness": {"type": "integer", "minimum": 0, "maximum": 4},
      "domain_specific_requirements": {"type": "integer", "minimum": 0, "maximum": 4},
      "agent_readability": {"type": "integer", "minimum": 0, "maximum": 4}
    }
  },
  "methodology_details": {
    "type": "object",
    "properties": {
      "decision_traceability": {
        "type": "object",
        "properties": {
          "score": {"type": "integer", "minimum": 0, "maximum": 4},
          "feedback": {"type": "string"}
        }
      },
      "tradeoff_analysis": {
        "type": "object",
        "properties": {
          "score": {"type": "integer", "minimum": 0, "maximum": 4},
          "feedback": {"type": "string"}
        }
      },
      "risk_coverage": {
        "type": "object",
        "properties": {
          "score": {"type": "integer", "minimum": 0, "maximum": 4},
          "feedback": {"type": "string"}
        }
      },
      "constraints_resources": {
        "type": "object",
        "properties": {
          "score": {"type": "integer", "minimum": 0, "maximum": 4},
          "feedback": {"type": "string"}
        }
      },
      "change_traceability": {
        "type": "object",
        "properties": {
          "score": {"type": "integer", "minimum": 0, "maximum": 4},
          "feedback": {"type": "string"}
        }
      }
    }
  }
}
```

### Update `templates/finding.schema.json`

Add methodology dimension field:

```json
{
  "methodology_dimension": {
    "type": "string",
    "enum": [
      "decision_traceability",
      "tradeoff_quality",
      "risk_coverage",
      "constraints_resource_realism",
      "change_traceability",
      "execution_readiness",
      "clarity",
      "completeness",
      "evidence_quality",
      "metrics_quality",
      "domain_specific_requirements",
      "agent_readability"
    ]
  }
}
```

### Update `cli/src/types/index.ts`

Add TypeScript types for methodology:

```typescript
export enum MethodologyDimension {
  CLARITY = 'clarity',
  COMPLETENESS = 'completeness',
  EVIDENCE_QUALITY = 'evidence_quality',
  METRICS_QUALITY = 'metrics_quality',
  RISK_COVERAGE = 'risk_coverage',
  TRADEOFF_QUALITY = 'tradeoff_quality',
  DECISION_TRACEABILITY = 'decision_traceability',
  CHANGE_TRACEABILITY = 'change_traceability',
  CONSTRAINTS_RESOURCE_REALISM = 'constraints_resource_realism',
  EXECUTION_READINESS = 'execution_readiness',
  DOMAIN_SPECIFIC_REQUIREMENTS = 'domain_specific_requirements',
  AGENT_READABILITY = 'agent_readability'
}

export interface MethodologyScores {
  clarity: number;          // 0-4
  completeness: number;     // 0-4
  evidence_quality: number; // 0-4
  metrics_quality: number;  // 0-4
  risk_coverage: number;    // 0-4
  tradeoff_quality: number; // 0-4
  decision_traceability: number; // 0-4
  change_traceability: number;   // 0-4
  constraints_resource_realism: number; // 0-4
  execution_readiness: number;  // 0-4
  domain_specific_requirements: number; // 0-4
  agent_readability: number;     // 0-4
}

export interface MethodologyDetails {
  decision_traceability: { score: number; feedback: string };
  tradeoff_analysis: { score: number; feedback: string };
  risk_coverage: { score: number; feedback: string };
  constraints_resources: { score: number; feedback: string };
  change_traceability: { score: number; feedback: string };
}
```

## Integration Notes

**Important:** These are **extensions** to existing schemas, not replacements.

- The existing `review-output.schema.json` already has `verdict`, `score`, `findings` structure
- The existing `finding.schema.json` already has finding structure with `id`, `validator`, `tag`, etc.
- Methodology fields are **additive** and optional for backwards compatibility
- The CLI type system in `cli/src/types/index.ts` already has core types; methodology types extend them

Do not recreate existing schemas. Only add methodology-specific fields as optional extensions.

---

# 15. Guardrails (UPDATED)

## Current Guardrails Status

**Existing Guardrails (Pass 4):**
- ✅ `harness/evals/ai-prd-overclaimed.yaml` - AI overclaim detection
- ✅ `harness/evals/anti-overcriticism.yaml` - Anti-overcriticism checks
- ✅ `harness/evals/security-warning.yaml` - Security content detection
- ✅ `harness/evals/unsupported-format.yaml` - Format validation

**Existing Documentation:**
- ✅ `SECURITY.md` - Security requirements and warnings
- ✅ `docs/anti-overengineering.md` - Guardrails against scope creep
- ✅ `docs/limitations.md` - Known limitations

## Required Methodology Guardrails

### Create New Guardrails

```text
docs/methodology/guardrails.md              (NEW)
harness/rubrics/hallucination-check.yaml   (NEW)
harness/rubrics/tone-safety.yaml           (NEW)
harness/rubrics/methodology-hallucination.yaml (NEW)
```

### Add Methodology-Specific Guardrails

**Anti-Hallucination Rules:**
- do not invent decisions not implied in the artifact
- do not invent resource capacity or team sizes
- do not invent risk owners or stakeholders
- do not invent market size or business metrics
- do not invent internal strategy or company context
- do not invent legal obligations or compliance requirements
- do not invent competitive analysis or market research

**Anti-Process-Theater Rules:**
- do not turn every missing template into a blocker
- do not penalize first drafts for missing changelog unless versioning is implied
- do not require enterprise-heavy process for small documents
- do not recommend adding all templates at once
- do not demand ADRs for every technical decision
- do not require risk registers for low-risk changes

**Quality-Over-Quantity Rules:**
- prefer the smallest useful improvement
- recommend one Decision Summary over full decision log
- recommend one risk table over comprehensive register
- recommend one trade-off paragraph over full matrix
- recommend one constraints section over full resource breakdown

**Tone and Toxicity Rules:**
- use constructive, non-judgmental language
- avoid "poor", "terrible", "unacceptable", "slop"
- prefer "consider adding", "this would be stronger if"
- treat methodology gaps as improvement opportunities
- do not shame authors for missing methodology elements

**Context-Aware Rules:**
- adapt rigor to document maturity and impact
- first drafts need less process than revised versions
- low-risk decisions need less documentation than high-risk ones
- small teams need less process than large organizations
- internal tools need less rigor than customer-facing features

## Integration with Existing Guardrails

The existing evals already check for:
- AI overclaims → extends to methodology hallucination prevention
- Anti-overcriticism → extends to methodology tone requirements
- Security warnings → complements methodology risk analysis

Methodology guardrails should **extend** existing systems, not duplicate them.

## Implementation Notes

**Important:** Do not recreate existing guardrail systems.

- The `anti-overcriticism.yaml` eval already checks for toxic language
- The `ai-prd-overclaimed.yaml` eval already checks for unsupported claims
- Methodology guardrails should add specific hallucination prevention for decisions, resources, and risks
- Methodology guardrails should add process-theater prevention for templates and documentation

---

# 16. Anti-overengineering rules

Update:

```text
docs/anti-overengineering.md
harness/rubrics/anti-bloat.yaml
```

Add:

```text
Methodology should improve decision quality, not create process theater.

Do not recommend all of:
- decision log
- ADR
- risk register
- constraints table
- changelog
- trade-off matrix

unless the document truly needs them.

Default recommendation should identify the smallest missing artifact:
- add one Decision Summary
- add one risk table
- add one trade-off paragraph
- add one constraints section
- add one changelog row

Every recommendation must reduce uncertainty, improve decision quality, or make the artifact easier to act on.
```

---

# 17. Update evals

Create methodology evals under:

```text
harness/evals/
```

Add:

```text
prd-missing-decision-traceability.yaml
rfc-no-tradeoffs.yaml
experiment-no-decision-rule.yaml
strategy-no-resource-logic.yaml
risk-register-missing.yaml
constraints-missing.yaml
changelog-missing-for-revised-doc.yaml
anti-overcriticism-methodology.yaml
```

Each eval must include:

```yaml
id:
artifact_type:
input_file:
expected_methodology_gaps:
expected_tags:
expected_score_band:
expected_score_caps:
required_validators:
forbidden_behaviors:
required_output_fields:
notes:
```

Forbidden behaviors:

- invent missing decisions
- invent risks not implied by the artifact
- invent resource capacity
- invent market size
- invent business metrics
- over-demand heavy process for a small draft
- treat missing changelog as blocker for a first draft
- recommend full rewrite when a small decision summary is enough
- use toxic language
- produce a long report by default

---

# 18. Add examples

Create examples:

```text
examples/prd/weak-prd-missing-decisions.md
examples/prd/improved-prd-with-decision-log.md
examples/rfc/weak-rfc-no-tradeoffs.md
examples/rfc/improved-rfc-with-adr.md
examples/experiment/weak-experiment-no-decision-rule.md
examples/strategy/weak-strategy-no-resource-logic.md
```

Each example should demonstrate one clear methodology gap.

Do not make examples huge.

Do not over-polish improved versions.

---

# 19. Pass strategy (UPDATED)

**Current Status: Foundation Complete (Pass 1-5)**

The following passes have been completed:
- ✅ Pass 1: Core Documentation (README.md, DESIGN.md, FUNCTIONAL_REQUIREMENTS.md, etc.)
- ✅ Pass 2: Requirements & Scenarios (docs/ with detailed requirements)
- ✅ Pass 3: Claude Code Assets (skills, agents, hooks configurations)
- ✅ Pass 4: Harness & Examples (complete eval system, templates, schemas)
- ✅ Pass 5: CLI Skeleton (TypeScript CLI with all commands)

**Current Project Structure:**

```text
shokunin-review/
├── README.md                      ✅ Complete
├── DESIGN.md                      ✅ Complete
├── FUNCTIONAL_REQUIREMENTS.md     ✅ Complete
├── NON_FUNCTIONAL_REQUIREMENTS.md ✅ Complete
├── SECURITY.md                    ✅ Complete
├── ROADMAP.md                     ✅ Complete
├── PROJECT_SUMMARY.md             ✅ Complete
│
├── docs/                          ✅ Complete
│   ├── mvp-scope.md              ✅ Complete
│   ├── limitations.md            ✅ Complete
│   ├── anti-overengineering.md   ✅ Complete
│   ├── compatibility.md          ✅ Complete
│   └── catalog.md                ✅ Complete
│
├── harness/                       ✅ Complete
│   ├── README.md                 ✅ Complete
│   ├── evals/                    ✅ 12 test cases
│   ├── golden/                   ⏳ To be created
│   ├── rubrics/                  ⏳ To be created
│   └── traces/                   ⏳ To be created
│
├── templates/                     ✅ Complete
│   ├── review-output.schema.json ✅ Complete
│   ├── finding.schema.json       ✅ Complete
│   ├── review-spec.schema.json   ✅ Complete
│   ├── trace.schema.json         ✅ Complete
│   ├── prd-template.md           ✅ Complete (182 lines)
│   ├── rfc-template.md           ✅ Complete (233 lines)
│   ├── experiment-plan-template.md ✅ Complete (252 lines)
│   ├── product-strategy-template.md ✅ Complete (281 lines)
│   └── output-format.md          ✅ Complete
│
├── examples/                      ✅ Complete
│   ├── prd/                      ✅ Complete
│   ├── rfc/                      ✅ Complete
│   ├── experiments/              ✅ Complete
│   └── strategy/                 ✅ Complete
│
└── cli/                          ✅ Complete
    ├── package.json             ✅ Complete
    ├── tsconfig.json            ✅ Complete
    ├── README.md                ✅ Complete
    ├── CHANGELOG.md             ✅ Complete
    ├── .gitignore               ✅ Complete
    └── src/                     ✅ Complete (21 TypeScript files)
```

## Remaining Passes for Methodology v2

### Pass 6 — Methodology docs (NEW)

Create methodology documentation:

```text
docs/methodology/README.md
docs/methodology/readiness-score.md
docs/methodology/decision-traceability.md
docs/methodology/change-traceability.md
docs/methodology/tradeoff-analysis.md
docs/methodology/risk-analysis.md
docs/methodology/constraints-and-resources.md
docs/methodology/artifact-graph.md
docs/methodology/stakeholder-questions.md
docs/methodology/methodology-by-artifact-type.md
```

### Pass 7 — v2 Templates and rubrics (NEW)

Create methodology-specific templates:

```text
templates/decision-log-template.md
templates/decision-record-template.md
templates/changelog-template.md
templates/risk-register-template.md
templates/tradeoff-analysis-template.md
templates/constraints-resources-template.md

harness/rubrics/readiness-score-v2.yaml
harness/rubrics/decision-traceability-rubric.yaml
harness/rubrics/change-traceability-rubric.yaml
harness/rubrics/tradeoff-analysis-rubric.yaml
harness/rubrics/risk-analysis-rubric.yaml
harness/rubrics/constraints-resources-rubric.yaml
harness/rubrics/execution-readiness-rubric.yaml
```

### Pass 8 — Update existing schemas (MODIFY)

Update existing CLI schemas to support methodology v2:

```text
cli/src/types/index.ts (add methodology score types)
templates/review-output.schema.json (add methodology fields)
templates/finding.schema.json (add methodology_dimension field)
```

### Pass 9 — Update CLI integration (MODIFY)

Extend existing CLI to support methodology v2:

```text
cli/src/utils/reviewEngine.ts (add methodology scoring)
cli/src/utils/outputFormatter.ts (add methodology output)
cli/src/utils/validatorRegistry.ts (add methodology validators)
```

### Pass 10 — Methodology evals and examples (NEW)

Create methodology-specific evals:

```text
harness/evals/prd-missing-decision-traceability.yaml
harness/evals/rfc-no-tradeoffs.yaml
harness/evals/experiment-no-decision-rule.yaml
harness/evals/strategy-no-resource-logic.yaml
harness/evals/risk-register-missing.yaml
harness/evals/constraints-missing.yaml
harness/evals/changelog-missing-for-revised-doc.yaml
harness/evals/anti-overcriticism-methodology.yaml

examples/prd/weak-prd-missing-decisions.md
examples/prd/improved-prd-with-decision-log.md
examples/rfc/weak-rfc-no-tradeoffs.md
examples/rfc/improved-rfc-with-adr.md
examples/experiment/weak-experiment-no-decision-rule.md
examples/strategy/weak-strategy-no-resource-logic.md
```

## Implementation Notes

**Key Changes from Original Plan:**
1. Pass 1-5 are already complete (foundation, harness, CLI)
2. Focus on methodology-specific additions only
3. Extend existing CLI rather than creating new structure
4. Leverage existing templates and schemas
5. Build on existing eval framework

**Anti-Overengineering:**
- Do not recreate existing components
- Extend and modify rather than replace
- Focus on methodology-specific gaps
- Maintain existing architecture patterns

---

# 20. After changes (UPDATED)

## Current Project State

**Already Completed (Pass 1-5):**
- ✅ 119 files created across foundation, harness, templates, examples, CLI
- ✅ 12 eval test cases covering all artifact types
- ✅ 9 comprehensive templates with JSON schemas
- ✅ 21 TypeScript CLI files with complete architecture
- ✅ 15,000+ lines of code and documentation

## What Needs To Be Done for Methodology v2

### Immediate Tasks (Pass 6-10)

1. **Create methodology documentation** (Pass 6)
   - docs/methodology/ with 9 new files
   - Extend README.md with methodology positioning

2. **Create methodology templates** (Pass 7)  
   - 6 new methodology-specific templates
   - 7 new rubrics in harness/rubrics/

3. **Update existing schemas** (Pass 8)
   - Extend CLI types for methodology scores
   - Add methodology fields to existing schemas

4. **Extend CLI integration** (Pass 9)
   - Update reviewEngine.ts for methodology scoring
   - Extend outputFormatter.ts for methodology output
   - Add methodology validators to validatorRegistry.ts

5. **Create methodology evals** (Pass 10)
   - 8 new methodology-specific eval cases
   - 6 new before/after examples

## Validation Commands

Run to validate changes:

```bash
# Build CLI
cd cli && npm run build

# Test methodology evals
cd .. && node cli/dist/cli.js eval --filter methodology

# Check terminology
./bin/check-terminology || true

# Validate skills
./bin/validate-skills || true

# Run full eval suite
node cli/dist/cli.js eval --verbose
```

## Expected Outcomes

Return after implementing methodology v2:

1. **Methodology Documentation** (9 new docs)
   - Decision traceability, trade-offs, risk analysis, etc.
   - Clear methodology-by-artifact-type guidance

2. **Template System** (6 new templates)
   - Decision log, changelog, risk register, trade-off analysis
   - Constraints & resources, decision record

3. **Rubric System** (7 new rubrics)
   - Methodology-specific scoring rubrics
   - Updated readiness score v2

4. **CLI Integration** (extended)
   - Methodology scoring in review engine
   - New output format with methodology dimensions
   - Extended validator system

5. **Eval Coverage** (8 new evals)
   - Decision traceability gaps
   - Trade-off analysis gaps  
   - Risk coverage gaps
   - Constraint/resource realism gaps

6. **Example Coverage** (6 new examples)
   - Clear before/after for each methodology gap
   - Demonstrates smallest useful improvement

## Remaining TODOs After Methodology v2

1. **Golden Outputs**: Create expected outputs for all evals (harness/golden/)
2. **Validator Implementation**: Implement the 17 focused validators
3. **Testing**: Add unit tests for CLI components
4. **Documentation**: Update user guides with methodology features
5. **Performance**: Add caching and optimization
6. **MVP 2 Planning**: Richer improvement, GitHub integration

## What Should Be Reviewed Next

After methodology v2 implementation, review:

1. **Methodology Documentation Quality**
   - Are decision traceability requirements clear?
   - Are trade-off categories well-defined?
   - Is risk classification actionable?

2. **Template Usability**
   - Are templates practical for teams?
   - Are they minimal or over-engineered?
   - Do they integrate well with existing artifact types?

3. **Scoring System**
   - Is 0-4 scale working as expected?
   - Are score caps appropriate?
   - Is methodology scoring integrated well?

4. **CLI Output**
   - Is methodology output clear?
   - Is full report format useful?
   - Are stakeholder questions helpful?

5. **Eval Coverage**
   - Are methodology gaps caught?
   - Are evals realistic?
   - Is anti-overcriticism working?

## Success Criteria for Methodology v2

✅ Documentation is clear and actionable
✅ Templates are minimal and useful
✅ Scoring system is consistent
✅ CLI integration is working
✅ Evals catch methodology gaps
✅ Examples show clear improvement
✅ No overengineering or process theater
✅ Terminology is consistent
✅ Guardrails prevent hallucination
✅ Focus on decision quality, not compliance
