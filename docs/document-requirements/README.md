# Document Requirements

**Requirements for each supported artifact type in Shokunin Review MVP 1.**

---

## Overview

This directory defines the requirements for each artifact type supported by MVP 1.

These requirements guide:

- Validator routing
- Score calculation
- Finding generation
- Expected sections
- Quality criteria

---

## Supported Artifact Types

MVP 1 supports exactly **four artifact types**:

1. **PRD** — Product Requirements documents
2. **RFC** — Technical Design documents
3. **Experiment Plan** — Pre-A/B-test decision documents
4. **Product Strategy** — Strategic choice documents

---

## Document Requirements

### PRD Requirements

**File**: `prd-requirements.md`

**Main Question**: What should we build and why?

**Primary Layer**: Product / business

**Main Risk**: Building the wrong thing

**Common Types**:

- Classic PRD
- One-pager / Lightweight PRD
- PR/FAQ-style PRD
- Feature Spec PRD
- Technical / Platform PRD
- AI-native PRD
- Experiment-oriented PRD
- Agent-readable PRD

**Key Checks**:

- Problem clarity
- User / segment clarity
- Evidence
- MVP scope
- Non-goals
- Requirements quality
- Acceptance criteria
- Metrics
- Guardrails
- Dependencies
- Risks
- Decision ask

---

### RFC Requirements

**File**: `rfc-requirements.md`

**Main Question**: How should we build it?

**Primary Layer**: Technical design

**Main Risk**: Building it wrong

**Common Types**:

- RFC / Request for Comments
- Technical Design Doc
- API Design Spec
- Migration / Rollout Design
- Security / Privacy Design
- AI / LLM System Design
- Agent-readable Tech Spec

**Key Checks**:

- Technical decision
- Context
- Goals / non-goals
- Alternatives
- Trade-offs
- API / data contracts
- System boundaries
- Dependencies
- Security / privacy
- Failure modes
- Observability
- Rollout / rollback
- Test plan
- Open questions

---

### Experiment Plan Requirements

**File**: `experiment-plan-requirements.md`

**Main Question**: How will we test and decide?

**Primary Layer**: Product / data

**Main Risk**: Learning nothing or misreading results

**Common Types**:

- Classic A/B Test Plan
- Feature Flag Rollout Plan
- Pricing / Monetization Experiment
- Growth Experiment Brief
- Search / Ranking Experiment
- AI / ML Experiment Plan
- Holdout / Long-term Experiment
- Agent-readable Experiment Spec

**Key Checks**:

- Hypothesis
- Target population
- Control / treatment
- Primary metric
- Secondary metrics
- Guardrail metrics
- Randomization unit
- Sample / duration assumptions
- Minimum detectable effect
- Instrumentation
- Sample ratio mismatch risk
- Stopping rule
- Decision rule
- Rollback
- Interpretation risk

---

### Product Strategy Requirements

**File**: `product-strategy-requirements.md`

**Main Question**: What strategic choice should we make?

**Primary Layer**: Product / business strategy

**Main Risk**: Choosing a vague direction without evidence

**Common Types**:

- Product Strategy Memo
- Narrative Strategy Doc
- Opportunity Solution Tree
- Product Bet Brief
- Platform Strategy
- AI Product Strategy
- Fintech Strategy Doc
- B2B SaaS Strategy
- Agent-readable Strategy Spec

**Key Checks**:

- Strategic thesis
- Target customer / ICP
- Pain
- Evidence
- Opportunity sizing
- Business logic
- Options
- Trade-offs
- Resource logic
- Risks
- Sequencing
- GTM / adoption logic
- Success metrics
- Decision ask

---

## Document Comparisons

### PRD vs RFC

**File**: `prd-vs-rfc.md`

| Document | Main question | Primary layer | Main risk |
|----------|---------------|---------------|-----------|
| PRD | What should we build and why? | Product / business | Building the wrong thing |
| RFC | How should we build it? | Technical design | Building it wrong |
| Experiment Plan | How will we test and decide? | Product / data | Learning nothing or misreading results |
| Product Strategy | What strategic choice should we make? | Product / business strategy | Choosing a vague direction without evidence |

**Key Principle**:

```text
A PRD should not pretend to be an RFC.
An RFC should not pretend to be a business strategy.
An experiment plan should not launch without a decision rule.
A strategy document should not hide missing choices behind vision language.
```

---

## Format Support

### Supported Formats

**File**: `supported-formats.md`

**Fully Supported**:

- `.md` — Markdown files
- `.txt` — Plain text files

**Best-Effort Support**:

- `.docx` — Text extraction only
- `.pdf` — Text extraction only
- `.pptx` — Text extraction only

**Not Supported**:

- Image-only content
- Complex diagrams
- Screenshots
- Video
- Audio
- Spreadsheets

---

## Agent-Readable Artifacts

**Concept**: Documents that are both human-readable and machine-readable.

**Characteristics**:

- Structured sections
- Explicit fields
- Machine-parseable requirements
- Testable acceptance criteria
- Clear schemas

**Benefits**:

- Human-readable for stakeholders
- Machine-readable for automation
- Testable by CI/CD
- Version-controllable
- Diff-able

**Examples**:

- Agent-readable PRD
- Agent-readable Tech Spec
- Agent-readable Experiment Spec
- Agent-readable Strategy Spec

---

## Document Quality Dimensions

Each artifact type is evaluated across multiple dimensions:

### PRD Dimensions

- Problem clarity (20%)
- Evidence quality (20%)
- Requirements clarity (15%)
- Metrics quality (15%)
- MVP scope (10%)
- Guardrails (10%)
- Decision ask (10%)

### RFC Dimensions

- Technical decision clarity (20%)
- Alternatives analysis (15%)
- Trade-offs acknowledgment (15%)
- System boundaries (10%)
- Failure modes (10%)
- Rollout plan (10%)
- Test plan (10%)
- Open questions (10%)

### Experiment Plan Dimensions

- Hypothesis clarity (20%)
- Metric quality (20%)
- Experimental design (15%)
- Decision rule (15%)
- Guardrail metrics (10%)
- Instrumentation (10%)
- Sample assumptions (10%)

### Product Strategy Dimensions

- Strategic thesis clarity (20%)
- Evidence quality (15%)
- Opportunity sizing (15%)
- Target segment clarity (10%)
- Trade-offs acknowledgment (15%)
- Sequencing logic (10%)
- Success metrics (15%)

---

## Common Sections

### Sections PRD Should Have

- Problem Statement
- Target Users / Segments
- Current Solution (if any)
- Proposed Solution
- MVP Scope
- Non-Goals
- Requirements
- Acceptance Criteria
- Success Metrics
- Guardrails (if AI feature)
- Dependencies
- Risks
- Timeline (optional)
- Decision Ask

### Sections RFC Should Have

- Context / Background
- Goals
- Non-Goals
- Technical Proposal
- Alternatives Considered
- Trade-offs
- System Boundaries
- API / Data Contracts (if applicable)
- Dependencies
- Security / Privacy (if applicable)
- Failure Modes
- Observability
- Rollout / Rollback Plan
- Test Plan
- Open Questions
- Decision Ask

### Sections Experiment Plan Should Have

- Hypothesis
- Background / Context
- Target Population
- Control / Treatment Definition
- Primary Metric
- Secondary Metrics
- Guardrail Metrics
- Randomization Unit
- Sample Size / Duration Assumptions
- Minimum Detectable Effect (if applicable)
- Instrumentation Plan
- Sample Ratio Mismatch Risk
- Stopping Rule
- Decision Rule
- Rollback Plan
- Interpretation Risks
- Decision Ask

### Sections Product Strategy Should Have

- Strategic Thesis
- Target Customer / ICP
- Pain Points
- Evidence
- Opportunity Sizing
- Business Logic
- Options Considered
- Trade-offs
- Resource Requirements
- Risks
- Sequencing / Phasing
- GTM / Adoption Strategy
- Success Metrics
- Decision Ask

---

## Missing Section Handling

### Gap Detection Mode

When a required section is missing:

- Validator runs in `gap_detection` mode
- Finding tagged appropriately
- Score cap applied (if applicable)
- Clear explanation of why section matters

### Example

```text
[missing-decision] "Decision Ask" section is missing.

Location: End of document

Why it matters:
Without a clear decision ask, reviewers don't know what
they're deciding on. This delays review and decision-making.

Recommended fix:
Add a "Decision Ask" section stating:
- What decision is needed
- Who needs to decide
- When decision is needed
- What information is needed for decision

Example:
"Decision Ask: Approval to proceed with MVP development.
Target decision: Product Leadership Council.
Timeline: Decision needed by EOD Friday."
```

---

## Score Caps by Artifact Type

### PRD Score Caps

- No problem evidence → max 60
- No primary metric → max 55
- No MVP scope → max 55
- No decision ask → max 65
- No AI guardrails for AI feature → max 70

### RFC Score Caps

- No technical decision → max 60
- No alternatives considered → max 65
- No trade-offs acknowledged → max 70
- No failure modes → max 70

### Experiment Plan Score Caps

- No hypothesis → max 55
- No primary metric → max 50
- No decision rule → max 55
- No guardrail metrics → max 70

### Product Strategy Score Caps

- No strategic thesis → max 60
- No target segment → max 60
- No opportunity sizing → max 65
- No trade-offs → max 70
- Generic strategy language only → max 55

---

## Usage

### For Validators

Validators use these requirements to:

- Determine what to check
- Set scoring thresholds
- Apply appropriate score caps
- Generate relevant findings

### For Users

Users use these requirements to:

- Understand what each artifact type needs
- Write better documents
- Prepare for review
- Understand review findings

### For Reviewers

Reviewers use these requirements to:

- Understand review criteria
- Validate review findings
- Calibrate expectations
- Provide consistent feedback

---

## FAQ

### What if my document doesn't fit these types?

If your document doesn't fit PRD, RFC, Experiment Plan, or Product Strategy:

- It's not supported in MVP 1
- You can try `--type` override to force classification
- Consider if it fits one of the types with adjustment
- Wait for future MVP support (ADR, executive memo, etc.)

### What if my PRD is also an RFC?

If your document combines PRD and RFC:

- Choose primary type based on main focus
- If product-focused, classify as PRD
- If technical-focused, classify as RFC
- Consider splitting into two documents

### What if my document is a "one-pager"?

One-pagers are supported:

- PRD one-pager supported
- Adjust expectations for length
- Focus on key sections only
- Score caps may apply differently

### What if my document is for an AI feature?

AI features have additional requirements:

- AI guardrails section required
- Safety considerations required
- Cost/impact estimation required
- Failure mode analysis required

---

## Summary

### Artifact Types (4)

1. PRD — What should we build and why?
2. RFC — How should we build it?
3. Experiment Plan — How will we test and decide?
4. Product Strategy — What strategic choice should we make?

### Key Requirements

Each type has:

- Clear purpose and scope
- Common variants
- Required sections
- Quality dimensions
- Score caps
- Common issues

### Usage

- Validators use requirements to guide review
- Users use requirements to write better docs
- Reviewers use requirements to understand findings

---

**docs/document-requirements/ defines what each artifact type needs.**

**Use these requirements to guide document creation and review.**
