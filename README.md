<img width="1840" height="1228" alt="image" src="https://github.com/user-attachments/assets/c5ce0bc6-d978-4eab-a754-89487f02a964" />




# Shokunin Review

**Review documents before people do.**

Shokunin Review is a terminal-first review skill and validation harness for AI-assisted work artifacts.

It checks whether PRDs, RFCs, Experiment Plans, and Product Strategy documents are ready for serious human review.

It is not an AI detector.

It does not shame authors.

It does not generate more documentation by default.

It removes noise, exposes weak reasoning, asks for evidence, and helps you reach a review-ready artifact.

---

## Problem

AI tools can generate polished documents quickly, but many of those documents are not review-ready.

They may have:
- Structure without decisions
- Impact claims without evidence
- Vague requirements
- Weak metrics
- Technical handwaving

These documents waste human reviewer time and slow down decision-making.

---

## What Shokunin Review Does

Shokunin Review catches weak reasoning, missing evidence, unclear decisions, and reviewer-unfriendly artifacts **before** they reach stakeholders.

It provides:
- A **Readiness Score** (0–100)
- **Blocker gaps** with specific fixes
- **Score caps** that prevent polished-but-incomplete docs from scoring high
- **Concrete next actions**, not generic feedback

---

## Who It's For

- Product Managers
- Technical Product Managers
- Engineering Managers
- Tech Leads
- Data / ML teams
- Founders
- AI-assisted builders using Claude Code, Cursor, Codex, or similar tools

---

## Quick Start

```bash
git clone https://github.com/vstakhovsky/shokunin-review.git
cd shokunin-review
./bin/install
shokunin review examples/prd/weak-ai-food-agent.before.md
```

For Claude Code users, skills are installed to your project-local `.claude/skills/` directory.

---

## MVP 1 Scope

MVP 1 supports **four artifact types**:

1. **PRD** — Product Requirements documents
2. **RFC** — Technical Design documents
3. **Experiment Plan** — Pre-A/B-test decision documents
4. **Product Strategy** — Strategic choice documents

MVP 1 is **text-based review only**. It does not deeply analyze:
- Visual layout
- Embedded images
- Screenshots
- Complex diagrams
- Charts without extracted text
- Slide design

---

## Supported Formats

MVP 1 supports:

- Markdown files: `.md`
- Plain text files: `.txt`
- Text extracted from docs: `.docx` / Google Docs export (best-effort)
- Text extracted from PDFs: `.pdf` (best-effort)
- Text extracted from presentations: `.pptx` (best-effort)

If reliable extraction is not available, export as Markdown or plain text.

---

## Not Supported in MVP 1

MVP 1 does **not** support:

- Image-only diagrams
- Visual architecture diagram reasoning
- Screenshots
- Video
- Spreadsheet model validation
- Board decks as visual presentations
- Full market research validation
- Legal/compliance certification
- Automatic full document rewrite by default
- Web UI
- Domain packs
- Production data verification
- Persistent memory
- MCP server
- Market research agents
- Board / CEO / CPO simulation

---

## What Shokunin Catches

Shokunin Review identifies:

- **Missing decisions** — What are we actually deciding?
- **Evidence gaps** — Claims without supporting data
- **Metric fog** — Success metrics that are unclear or missing
- **Requirement fog** — Requirements that aren't testable or verifiable
- **Technical handwaving** — "We'll figure it out later" architecture
- **AI guardrail gaps** — AI features without safety boundaries
- **Strategy fog** — Vague strategic language without clear choices
- **Opportunity fog** — Market sizing without business logic
- **Simpler alternative gaps** — AI proposals when non-AI solutions would suffice
- **Cost/ROI gaps** — Financial claims without unit economics or baseline

---

## Document Types

### PRD vs RFC vs Experiment Plan vs Product Strategy

| Document | Main question | Primary layer | Main risk |
|----------|---------------|---------------|-----------|
| PRD | What should we build and why? | Product / business | Building the wrong thing |
| RFC | How should we build it? | Technical design | Building it wrong |
| Experiment Plan | How will we test and decide? | Product / data | Learning nothing or misreading results |
| Product Strategy | What strategic choice should we make? | Product / business strategy | Choosing a vague direction without evidence |

### PRD

Answers: What should we build, for whom, why now, what problem does it solve, how is success measured?

Common types: Classic PRD, One-pager, PR/FAQ-style, Feature Spec, Technical/Platform PRD, AI-native PRD, Experiment-oriented PRD, Agent-readable PRD.

### RFC

Answers: How should we build it, what alternatives exist, what trade-offs do we accept, what are system boundaries, dependencies, failure modes, rollout, and ownership?

Common types: RFC, Technical Design Doc, API Design Spec, Migration/Rollout Design, Security/Privacy Design, AI/LLM System Design, Agent-readable Tech Spec.

### Experiment Plan

Answers: What hypothesis are we testing, who is included, what is control and treatment, what metric proves success, what guardrails protect us, what decision follows?

Common types: Classic A/B Test Plan, Feature Flag Rollout Plan, Pricing/Monetization Experiment, Growth Experiment Brief, Search/Ranking Experiment, AI/ML Experiment Plan, Holdout/Long-term Experiment, Agent-readable Experiment Spec.

### Product Strategy

Answers: What strategic thesis are we proposing, which segment matters, what pain do we address, what opportunity exists, why now, what options were considered, what trade-offs do we make, what will we not do, how should work be sequenced, what metrics prove progress, what decision is needed?

Common types: Product Strategy Memo, Narrative Strategy Doc, Opportunity Solution Tree, Product Bet Brief, Platform Strategy, AI Product Strategy, Fintech Strategy Doc, B2B SaaS Strategy, Agent-readable Strategy Spec.

---

## Human-Readable and Agent-Readable Quality

A document should work for both human reviewers **and** AI agents.

Human-readable quality means: clear, concise, well-structured, decision-oriented.

Agent-readable quality means: structured sections, explicit fields, machine-parseable requirements, testable acceptance criteria.

Shokunin Review helps you achieve both.

---

## How It Works

Shokunin follows a review harness flow:

1. **Read the artifact**
2. **Detect format and artifact type**
3. **Build a review spec** (maturity, audience, mode, expected state)
4. **Select relevant validators**
5. **Run checks** (decision, evidence, metric, requirement, technical, strategy, etc.)
6. **Audit findings** (remove vague, duplicate, unsupported findings)
7. **Calculate Readiness Score** (with score caps)
8. **Verify output quality** (grounding, tone, completeness)
9. **Recommend the smallest useful next action**

---

## Commands

### CLI Commands

```bash
shokunin review <file>              # Review a document
shokunin improve <file>             # Suggest improvements
shokunin rerun <file> --compare <original-file>  # Re-review and compare
shokunin score <file>               # Show readiness score breakdown
shokunin eval                       # Run eval harness
```

### Modes

```bash
--mode fast      # Fast review mode
--mode deep      # Deep review mode
--mode draft     # Draft document mode
```

### Output Options

```bash
--json           # JSON output for automation
--markdown       # Markdown report
--quiet          # Minimal output
--full           # Full detailed report
--no-color       # Disable colors
--no-animation   # Disable animations
--no-trace       # Disable trace logging
--local-only     # Local processing only
```

### Mascot Options

```bash
--mascot ascii   # ASCII mascot
--mascot pixel   # Pixel mascot
--mascot off     # Disable mascot
```

### Claude Code Commands

```text
/shokunin-review              # Generic review
/shokunin-review-prd          # PRD review
/shokunin-review-rfc          # RFC review
/shokunin-review-experiment   # Experiment Plan review
/shokunin-review-strategy     # Product Strategy review
/shokunin-improve              # Suggest improvements
/shokunin-rerun                # Re-review
/shokunin-score               # Explain readiness score
/shokunin-eval                # Run evals
```

---

## Default Output

Default output is **short by design**. It includes:

- Verdict
- Readiness Score
- Score confidence
- Short reason
- Top blockers
- Score caps applied
- Recommended next action
- Suggested next command

Example:

```
🔴 Not review-ready — 36/100
Confidence: Medium

Why:
This PRD describes an attractive AI idea, but not a decision-ready MVP.

Top blockers:
1. [evidence-gap] Problem is not quantified.
2. [missing-decision] MVP scope is not defined.
3. [overclaim] Business impact is claimed without baseline or causal logic.
4. [simpler-alternative-gap] No simpler alternative to AI Agent is considered.
5. [ai-guardrail-gap] AI product guardrails are missing.

Score caps applied:
- No evidence → max score 60
- No MVP scope → max score 55
- No primary metric → max score 55

Recommended next action:
Do not expand the PRD.
Narrow it into a decision-ready MVP proposal.

Run:
shokunin improve docs/ai-food-agent-prd.md --focus structure
```

Use `--full` for detailed reports.

---

## Readiness Score

Readiness Score is a 0–100 signal indicating whether a document is ready for human review.

It includes:

- **Total score** — 0–100 readiness score
- **Score band** — Review-ready, Ready with minor fixes, Needs major fixes, Needs revision, Not review-ready
- **Score confidence** — High, Medium, Low
- **Dimension breakdown** — Scores per dimension (decisions, evidence, metrics, requirements, technical, strategy)
- **Score caps applied** — Which caps limited the score
- **Missing context** — What information is missing
- **Rationale** — Why this score was given

---

## Score Confidence

### High
Enough context to score reliably.

### Medium
Some missing context, score is still useful.

### Low
Important context missing, score is directional only.

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

Score caps prevent polished but incomplete documents from receiving misleadingly high scores.

If multiple caps apply, the **strictest cap wins**.

Examples:

- No evidence → max score 60
- No primary metric → max score 55
- No MVP scope → max score 55
- No decision ask → max score 65
- No AI guardrails for AI feature → max score 70
- Critical placeholders present → max score 68
- Unknown artifact type → max score 70
- Low context confidence → max score 75
- Generic strategy language only → max score 55
- No target segment → max score 60
- No tradeoffs → max score 70

---

## Finding Tags

Shokunin uses these tags to categorize findings:

- `[noise-bloat]` — Verbose without adding signal
- `[overclaim]` — Claim without evidence
- `[logic-drift]` — Inconsistent reasoning
- `[missing-decision]` — Decision not stated
- `[evidence-gap]` — Claim without supporting data
- `[metric-fog]` — Unclear or missing success metric
- `[requirement-fog]` — Requirement not testable
- `[tech-handwave]` — Technical detail deferred without plan
- `[dependency-gap]` — Dependency not acknowledged
- `[architecture-gap]` — System boundary unclear
- `[experiment-gap]` — Experimental design issue
- `[duplicate-risk]` — Duplicate work or conflict risk
- `[review-blocker]` — Blocks review progress
- `[simpler-alternative-gap]` — Simpler solution not considered
- `[cost-gap]` — Cost/ROI unclear
- `[ai-guardrail-gap]` — AI safety missing
- `[strategy-fog]` — Strategy unclear
- `[segment-fog]` — Target segment unclear
- `[opportunity-fog]` — Opportunity sizing unclear
- `[tradeoff-gap]` — Tradeoffs not stated

---

## Validators

Validators are focused review dimensions, not personas.

MVP 1 includes 17 validators:

- **decision-reviewer** — Are decisions clear?
- **evidence-reviewer** — Are claims supported?
- **metric-reviewer** — Are metrics defined and measurable?
- **requirement-reviewer** — Are requirements testable?
- **technical-feasibility-reviewer** — Is technical approach sound?
- **strategy-reviewer** — Is strategy clear and grounded?
- **opportunity-sizing-reviewer** — Is opportunity sized realistically?
- **simpler-alternative-reviewer** — Were simpler alternatives considered?
- **ai-safety-guardrails-reviewer** — Are AI guardrails in place?
- **cost-roi-sanity-reviewer** — Does the math make sense?
- **finding-quality-auditor** — Are findings grounded and actionable?
- **severity-calibrator** — Is severity appropriate?
- **output-guard** — Is output safe and complete?

Each validator runs in one of three modes:

- **full_review** — Section exists and needs analysis
- **gap_detection** — Section is missing but should exist
- **not_applicable** — Check does not apply

---

## Skills Are Workflows, Not Reference Docs

A skill must force a repeatable process:

1. Intake
2. Checks
3. Findings
4. Verification
5. Exit criteria

Each `SKILL.md` includes:

- Purpose
- When to use
- Inputs
- Workflow
- Checks
- Output contract
- Verification
- Exit criteria
- Boundaries

A skill is complete only when it produces:

1. Grounded findings
2. Calibrated severity
3. Concrete fixes
4. Exit criteria
5. A readiness decision

---

## Verification Is Mandatory

Every skill must end with a verification pass.

Before returning output, verify:

- Every finding is grounded in the artifact
- Every finding references a line, section, or quoted claim
- Every finding has a concrete suggested fix
- Severity is calibrated
- No fake metrics, research, logs, company strategy, or internal context were invented
- No generic advice remains
- No duplicate findings remain
- Output includes exit criteria
- Readiness score matches findings and verdict
- Tone is calm, direct, and non-toxic

If verification fails, revise the output before final response.

---

## Terminal UX

Shokunin is terminal-first.

### Statuses and Colors

- **idle** — Muted gray
- **reading** — Muted blue
- **classifying** — Steel blue
- **scoping** — Slate
- **routing** — Muted blue
- **checking** — Amber
- **auditing** — Orange
- **scoring** — Blue-green
- **verifying** — Slate
- **done** — Muted green
- **blocked** — Muted red / risk
- **unsupported** — Amber

### Mascot

The Shokunin mascot is a **terminal status indicator**, not decoration.

It shows the current review state: reading, classifying, checking, auditing, scoring, blocked, done, or unsupported.

Mascot states and colors are defined in `DESIGN.md`.

Options:

```bash
--mascot ascii   # ASCII/Unicode mascot (default)
--mascot pixel   # Pixel mascot
--mascot off     # Disable mascot
```

---

## Onboarding

```bash
# Clone and install
git clone https://github.com/vstakhovsky/shokunin-review.git
cd shokunin-review
./bin/install

# Review your first document
shokunin review path/to/prd.md

# Get improvement suggestions
shokunin improve path/to/prd.md

# Run eval harness
shokunin eval
```

See `docs/onboarding.md` for detailed onboarding guide.

---

## Unsupported Format Behavior

If unsupported or limited format:

```
Unsupported or limited input format.

MVP 1 can review extracted text from:
- Markdown
- plain text
- docs
- PDFs
- presentations

But MVP 1 does not analyze:
- image-only content
- complex diagrams
- embedded screenshots
- charts without extracted text
- slide visual design

Recommended action:
Export the document as Markdown or plain text and run:

shokunin review exported-document.md
```

If unknown artifact:

```
Unsupported or unknown artifact type.

I could not confidently classify this artifact as:
- PRD
- RFC / Technical Design
- Experiment Plan
- Product Strategy

You can:
1. choose artifact type manually
2. run generic draft review
3. wait for future artifact support

Command:
shokunin review file.md --type prd
```

---

## Security and Privacy

**Do not paste confidential, NDA-protected, personal, customer, financial, security, or production secrets into Shokunin Review unless you understand your local setup and data handling.**

For sensitive documents:

```bash
shokunin review file.md --local-only --no-trace
```

### Security Principles

- Do not store raw document text by default
- Do not write sensitive input into traces by default
- Warn before reviewing documents that may contain secrets
- Support `--no-trace`
- Document `--local-only`
- Mark `--redact-secrets` as roadmap if not implemented
- Never invent company metrics, customer data, research, or strategy
- Never accuse the author of using AI

### Security Warning Flow

```
Potential sensitive content detected.

This document may contain confidential business, customer, financial, security, or production data.

Recommended:
- remove secrets
- anonymize customer names
- replace exact numbers if needed
- use --local-only
- use --no-trace

Continue?
[Y] continue  [R] review redacted copy  [C] cancel
```

---

## Non-Functional Requirements

### Reliability

- Deterministic output schema
- Stable score bands
- Explicit score caps
- Graceful unsupported format handling
- No hidden validator execution

### Usability

- Short default output
- `--full` for detailed report
- `--json` for automation
- `--markdown` for human report
- Clear next command
- No forced long onboarding

### Safety

- No AI-use accusations
- No invented evidence
- No confidential data stored by default
- Privacy warning for sensitive docs
- No full rewrite by default

### Maintainability

- Skills are workflows
- Validators are small and focused
- Evals cover each artifact type
- Score caps are explicit
- Each finding has one schema

### Extensibility

- Artifact types are modular
- Validators support full_review / gap_detection / not_applicable
- Future PDF/PPTX/diagram support should not break MVP 1
- Future domain packs are optional extensions

### Accessibility

- `--no-color`
- `--no-animation`
- Text-only output
- No critical information conveyed by color alone

---

## Architecture

```
CLI / Claude command
→ Artifact Intake
→ Format Detector
→ Text Extractor
→ Artifact Classifier
→ Review Spec Builder
→ Validator Router
→ Validators (17 focused validators, not personas)
→ Finding Quality Auditor
→ Severity Calibrator
→ Score Engine
→ Output Guard
→ Report Exporter
→ Eval Harness
```

See `docs/architecture.md` for detailed architecture.

---

## Evals

Evals are the executable PRD for Shokunin Review.

Behavior is defined through:

- Weak and strong examples
- Expected findings
- Score bands
- Guardrails
- Golden outputs
- Anti-overcriticism cases
- Unsupported format cases
- Security warning cases

MVP 1 evals:

- `prd-low-readiness.yaml`
- `prd-good-minimal.yaml`
- `rfc-vague.yaml`
- `rfc-good-minimal.yaml`
- `experiment-plan-weak.yaml`
- `experiment-plan-good-minimal.yaml`
- `product-strategy-vague.yaml`
- `product-strategy-good-minimal.yaml`
- `ai-prd-overclaimed.yaml`
- `unsupported-format.yaml`
- `anti-overcriticism.yaml`
- `security-warning.yaml`

See `harness/evals/` and `docs/evals-as-prd.md`.

---

## FAQ

### What is Shokunin Review?

Shokunin Review is a terminal-first review skill and validation harness for AI-assisted work artifacts.

It reviews PRDs, RFCs, Experiment Plans, and Product Strategy documents before stakeholder review.

It gives a Readiness Score, highlights blocker gaps, and suggests respectful, actionable improvements.

### Is Shokunin Review an AI detector?

No.

Shokunin Review does not try to prove whether a document was written by AI.

It checks whether the document is ready for serious human review.

The focus is quality, clarity, evidence, decisions, and reviewer usefulness.

### What problem does it solve?

AI tools can generate polished documents quickly, but many of those documents are not review-ready.

They may have structure without decisions, impact claims without evidence, vague requirements, weak metrics, or technical handwaving.

Shokunin Review catches those issues before they waste reviewer time.

### Who is it for?

Shokunin Review is for Product Managers, Technical Product Managers, Engineering Managers, Tech Leads, Data / ML teams, founders, and AI-assisted builders using Claude Code, Cursor, Codex, Gemini, or similar tools.

### What document types does MVP 1 support?

MVP 1 supports four artifact types:

1. PRD / Product Requirements documents
2. RFC / Technical Design documents
3. Experiment Plans before A/B test launch
4. Product Strategy documents

### What formats does MVP 1 support?

MVP 1 supports text-based review:

- Markdown
- Plain text
- Text extracted from docs
- Text extracted from PDFs
- Text extracted from presentations

MVP 1 does not deeply analyze visual layout, embedded images, screenshots, complex diagrams, charts without extracted text, or slide design.

### How does Shokunin Review work?

Shokunin follows a review harness flow:

1. Read the artifact
2. Detect format and artifact type
3. Build a review spec
4. Select relevant validators
5. Run checks
6. Audit findings
7. Calculate Readiness Score
8. Apply score caps
9. Verify output quality
10. Recommend the smallest useful next action

### What is the Readiness Score?

Readiness Score is a 0–100 signal that shows whether a document is ready for human review.

It includes:

- Total score
- Score band
- Score confidence
- Dimension breakdown
- Score caps applied
- Missing context
- Rationale

### What are score caps?

Score caps prevent polished but incomplete documents from receiving misleadingly high scores.

For example:

- No evidence → max score 60
- No primary metric → max score 55
- No MVP scope → max score 55
- No decision ask → max score 65
- No AI guardrails for AI feature → max score 70

If multiple caps apply, the strictest cap wins.

### What makes Shokunin Review different from generic AI feedback?

Generic AI feedback often gives broad suggestions like "improve clarity" or "add more detail."

Shokunin Review uses:

- Artifact-specific criteria
- Validator routing
- Grounded findings
- Finding quality audit
- Score caps
- Evals
- Non-toxic tone
- Explicit exit criteria

It is designed to reduce review noise, not create more of it.

### How is it different from other skills or agents?

Most skills help generate content.

Shokunin Review focuses on validation.

It treats skills as workflows, not reference docs. Each skill must run checks, produce grounded findings, verify output quality, and state exit criteria.

### Does Shokunin Review rewrite my document?

Not by default.

The default behavior is review-first: score, blockers, and smallest useful improvement.

Full rewrites are intentionally avoided unless the user asks for them.

### What does "non-toxic review" mean?

Shokunin Review does not shame the author.

It avoids language like "this is bad."

It says things like:

- This claim needs evidence
- This decision is missing
- This requirement is not testable
- This artifact is not ready for review yet

### What about security and confidential documents?

Do not paste confidential, NDA-protected, personal, customer, financial, security, or production secrets into Shokunin Review unless you understand your local setup and data handling.

For sensitive documents, use:

```bash
shokunin review file.md --local-only --no-trace
```

MVP 1 should not store raw document text by default.

### Does Shokunin Review store my documents?

MVP 1 should not store raw document text by default.

Traces, if enabled, should avoid writing sensitive source content.

Use `--no-trace` for sensitive reviews.

### What data should I avoid sharing?

Avoid sharing:

- Customer personal data
- Financial secrets
- Production credentials
- API keys
- Security architecture details
- NDA-protected strategy
- Confidential roadmap or pricing details
- Unreleased legal or compliance information

Use anonymized or redacted documents when possible.

### Can Shokunin Review validate real market data or financial models?

No.

MVP 1 can flag missing evidence, unclear assumptions, and weak opportunity logic.

It cannot verify external market truth or validate spreadsheet models unless the relevant data is provided in text form.

### Does MVP 1 support diagrams?

Not deeply.

MVP 1 can review text descriptions of architecture and diagrams, but it does not analyze image-only diagrams, screenshots, visual flows, or complex charts.

Diagram support is planned for future versions.

### Can it run in CI or GitHub Actions?

MVP 1 should support JSON and Markdown output so it can later be integrated into CI or GitHub PR comments.

Full GitHub Action support is roadmap.

### What is the mascot for?

The Shokunin mascot is a terminal status indicator, not decoration.

It shows the current review state: reading, classifying, checking, auditing, scoring, blocked, done, or unsupported.

Mascot states and colors are defined in `DESIGN.md`.

### What is the main advantage of Shokunin Review?

Its advantage is focused validation.

It helps teams catch weak reasoning, missing evidence, vague requirements, weak metrics, and unclear decisions before human reviewers spend time on the document.

The goal is not more comments.

The goal is a clearer artifact with a better chance of passing review.

### What is included in MVP 1?

MVP 1 includes:

- PRD review
- RFC / Technical Design review
- Experiment Plan review
- Product Strategy review
- Terminal-first UX
- Readiness Score
- Score confidence
- Score caps
- Validator routing
- Finding quality audit
- JSON / Markdown output
- Eval harness
- Examples
- Security guidance
- Configurable mascot states

### What is not included in MVP 1?

MVP 1 does not include:

- Web UI
- Persistent memory
- MCP server
- Board simulation
- Full domain packs
- Visual diagram analysis
- Spreadsheet model validation
- Legal/compliance certification
- Automatic full rewrite by default

### What is planned next?

Future versions may add:

- Richer section-level patch suggestions
- Interactive Q&A improvement mode
- GitHub PR comment export
- Basic secret redaction
- ADR review
- Executive memo review
- Architecture note review
- ML / DS document review
- Mermaid / PlantUML review
- PDF/PPTX structure extraction
- Domain packs for AI products, fintech/risk, marketplaces, internal platforms, and ML systems

---

## Roadmap

See `ROADMAP.md` for detailed roadmap.

### MVP 1

Text-based review readiness for:

- PRD
- RFC / Technical Design
- Experiment Plan
- Product Strategy

### MVP 2

- Richer section-level patch suggestions
- Interactive Q&A improvement mode
- GitHub PR comment export
- Basic secret redaction
- More evals

### MVP 3

- ADR
- Executive memo
- Architecture notes
- ML / DS feature docs
- Presentation text exports

### MVP 4

- Mermaid / PlantUML review
- Excalidraw JSON review
- PDF structure extraction
- PPTX speaker notes and slide text extraction
- Image-based architecture diagram review

### MVP 5

- AI product pack
- Fintech / risk pack
- Marketplace pack
- Internal platform pack
- ML systems pack
- Ecommerce pack

---

## Limitations

See `docs/limitations.md` for detailed limitations.

Key limitations:

- Text-based review only
- No visual diagram analysis
- No spreadsheet model validation
- No market data verification
- No legal/compliance certification
- Terminal-first (no web UI in MVP 1)
- No persistent memory
- No MCP server
- No domain packs in MVP 1

---

## Contributing

See `CONTRIBUTING.md` for contribution guidelines.

Quick start:

```bash
# Fork and clone
git clone https://github.com/your-username/shokunin-review.git
cd shokunin-review

# Install and test
./bin/install
./bin/run-evals

# Check terminology
./bin/check-terminology

# Validate skills
./bin/validate-skills
```

---

## License

MIT License — see `LICENSE` file for details.

---

## Philosophy

**Shokunin** means craftsperson.

In this project, Shokunin represents disciplined review, clarity, and respect for human reviewer time.

Shokunin does not shame the author.

Shokunin does not generate more documentation by default.

Shokunin removes noise, exposes weak reasoning, asks for evidence, and helps the user reach a review-ready artifact.

### Core Principles

```text
If the reviewer has to find the problem, define the decision, invent the metric, and rewrite the requirement, the artifact is not ready.
```

```text
Shokunin Review does not generate more documentation.
It reduces uncertainty until the document becomes decision-ready.
```

---

**Remove noise. Restore clarity.**
