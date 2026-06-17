# Claude Code Prompt: Build Shokunin Review MVP 1

Copy this whole prompt into Claude Code from the root of the `shokunin-review` repository.

Recommended first message to Claude Code:

```text
First, do not write files. Show me the implementation plan and the first-pass file list. Wait for approval.
```

---

## Role

You are Claude Code acting as a senior AI systems engineer, validation-harness architect, product-minded open-source maintainer, technical writer, and strict MVP editor.

We are building a repository called `shokunin-review`.

Your goal is to create the MVP 1 foundation for Shokunin Review: documentation, Claude Code commands, skills, agents, eval harness, examples, schemas, safety docs, and a lightweight CLI skeleton.

Before writing files, first show:

1. proposed repository structure
2. implementation plan
3. what will be created in Pass 1
4. what will be intentionally deferred
5. risks of overengineering

Wait for my approval before creating files.

---

# Product definition

## Name

Shokunin Review

## Repository

`shokunin-review`

## One-line positioning

Shokunin Review is a terminal-first review skill and validation harness for AI-assisted work artifacts.

## Tagline

Stops weak work documents before they waste human reviewer time.

## Motto

Remove noise. Restore clarity.

## Short description

Shokunin Review checks whether product, technical, experiment, and strategy documents are ready for serious human review.

It is not an AI detector.

It does not accuse authors of using AI.

It does not optimize for more comments.

It optimizes for higher decision readiness with the smallest useful revision.

## Philosophy

Shokunin means craftsperson.

In this project, Shokunin represents disciplined review, clarity, and respect for human reviewer time.

Shokunin does not shame the author.

Shokunin does not generate more documentation by default.

Shokunin removes noise, exposes weak reasoning, asks for evidence, and helps the user reach a review-ready artifact.

Core principle:

```text
If the reviewer has to find the problem, define the decision, invent the metric, and rewrite the requirement, the artifact is not ready.
```

Another principle:

```text
Shokunin Review does not generate more documentation.
It reduces uncertainty until the document becomes decision-ready.
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

Do not use legacy Japanese process terms from earlier ideation in:

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

Create a `bin/check-terminology` script that checks for banned legacy process terms and fails if they appear in public files.

The banlist must be stored in one internal script/config location only, not repeated across README or public-facing docs.

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

# Best-practice principles

Apply these principles.

## 1. Skills are workflows, not reference docs

A skill must force a repeatable process:

1. intake
2. checks
3. findings
4. verification
5. exit criteria

A skill is not a passive explanation of a framework.

Each `SKILL.md` must include:

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

1. grounded findings
2. calibrated severity
3. concrete fixes
4. exit criteria
5. a readiness decision

## 2. Verification is mandatory

Every skill must end with a verification pass.

Before returning output, verify:

- every finding is grounded in the artifact
- every finding references a line, section, or quoted claim
- every finding has a concrete suggested fix
- severity is calibrated
- no fake metrics, research, logs, company strategy, or internal context were invented
- no generic advice remains
- no duplicate findings remain
- output includes exit criteria
- readiness score matches findings and verdict
- tone is calm, direct, and non-toxic

If verification fails, revise the output before final response.

## 3. Evals are the executable PRD

Behavior must be defined through:

- weak and strong examples
- expected findings
- score bands
- guardrails
- golden outputs
- anti-overcriticism cases
- unsupported format cases
- security warning cases

## 4. Anti-bloat by default

Default output should be short.

Full reports require `--full`.

Do not create 25+ agents.

Do not create board-level simulation or market research agents in MVP 1.

## 5. Terminal-first

No web UI in MVP 1.

## 6. Mascot as status indicator

The mascot is not decoration.

The mascot indicates:

- current review state
- progress
- whether issues were found
- whether user action is needed

Mascot behavior must be configurable through `DESIGN.md`.

## 7. Security-first

Warn users not to paste confidential, NDA-protected, personal, customer, financial, security, or production secrets unless they understand their local setup and data handling.

---

# Required repository structure

Create or update this structure.

```text
shokunin-review/
  README.md
  DESIGN.md
  AGENTS.md
  CLAUDE.md
  FUNCTIONAL_REQUIREMENTS.md
  NON_FUNCTIONAL_REQUIREMENTS.md
  REVIEW_SPEC.md
  EVALS.md
  GUARDRAILS.md
  SECURITY.md
  ROADMAP.md
  TRACE_SCHEMA.md
  CHANGELOG.md
  CONTRIBUTING.md
  LICENSE

  bin/
    install
    sync-commands
    sync-skills
    sync-agents
    check-terminology
    run-evals
    validate-skills

  install/
    claude-code.md
    cursor.md
    codex.md
    local-cli.md

  assets/
    README-hero.png
    README-hero.gif
    mascot/
      ascii.txt
      pixel.png
      states/
        idle.txt
        reading.txt
        classifying.txt
        scoping.txt
        routing.txt
        checking.txt
        auditing.txt
        scoring.txt
        verifying.txt
        blocked.txt
        done.txt
        unsupported.txt

  .claude/
    commands/
      shokunin-review.md
      shokunin-review-prd.md
      shokunin-review-rfc.md
      shokunin-review-experiment.md
      shokunin-review-strategy.md
      shokunin-improve.md
      shokunin-rerun.md
      shokunin-score.md
      shokunin-eval.md

    agents/
      review-orchestrator.md
      document-intake-agent.md
      review-spec-builder.md
      validator-router.md
      decision-reviewer.md
      evidence-reviewer.md
      metric-reviewer.md
      requirement-reviewer.md
      technical-feasibility-reviewer.md
      strategy-reviewer.md
      opportunity-sizing-reviewer.md
      simpler-alternative-reviewer.md
      ai-safety-guardrails-reviewer.md
      cost-roi-sanity-reviewer.md
      finding-quality-auditor.md
      severity-calibrator.md
      output-guard.md

    skills/
      shokunin-review/
        SKILL.md
        references/
          workflow.md
          tags.md
          output-format.md
          verification.md
          exit-criteria.md
          score-caps.md
          supported-artifacts.md
          supported-formats.md

      shokunin-score/
        SKILL.md
        references/
          readiness-score.md
          score-calibration.md
          verdict-logic.md

      shokunin-gherkin/
        SKILL.md
        references/
          gherkin-patterns.md
          acceptance-criteria.md
          verification.md

      shokunin-strategy/
        SKILL.md
        references/
          strategy-checklist.md
          segmentation.md
          opportunity-sizing.md
          tradeoffs.md
          strategy-exit-criteria.md

      shokunin-verify/
        SKILL.md
        references/
          finding-quality.md
          output-guardrails.md
          exit-criteria.md

    hooks/
      settings.example.json
      pre-review-hook.md
      validator-selection-hook.md
      finding-quality-hook.md
      verdict-consistency-hook.md
      security-warning-hook.md

  docs/
    getting-started.md
    catalog.md
    compatibility.md
    anti-overengineering.md
    mvp-scope.md
    onboarding.md
    statuses.md
    terminal-ux.md
    design-system.md
    architecture.md
    validation-harness.md
    loop-engineering.md
    evals-as-prd.md
    privacy.md
    ai-security.md
    limitations.md
    roadmap.md

    document-requirements/
      README.md
      prd-requirements.md
      rfc-requirements.md
      experiment-plan-requirements.md
      product-strategy-requirements.md
      prd-vs-rfc.md
      supported-formats.md
      unsupported-formats.md
      agent-readable-artifacts.md

    scenarios/
      README.md
      onboarding-flow.md
      prd-review-flow.md
      rfc-review-flow.md
      experiment-plan-review-flow.md
      product-strategy-review-flow.md
      unsupported-format-flow.md
      unsupported-artifact-flow.md
      security-warning-flow.md
      improve-flow.md
      re-review-flow.md

  templates/
    review-output.schema.json
    finding.schema.json
    review-spec.schema.json
    prd-template.md
    rfc-template.md
    experiment-plan-template.md
    product-strategy-template.md

  harness/
    README.md
    evals/
      prd-low-readiness.yaml
      prd-good-minimal.yaml
      rfc-vague.yaml
      rfc-good-minimal.yaml
      experiment-plan-weak.yaml
      experiment-plan-good-minimal.yaml
      product-strategy-vague.yaml
      product-strategy-good-minimal.yaml
      ai-prd-overclaimed.yaml
      unsupported-format.yaml
      anti-overcriticism.yaml
      security-warning.yaml
    rubrics/
      readiness-score.yaml
      score-caps.yaml
      finding-quality.yaml
      validator-coverage.yaml
      hallucination-check.yaml
      tone-safety.yaml
      anti-bloat.yaml
      security-safety.yaml
    golden/
      prd-low-readiness.expected.json
      ai-prd-overclaimed.expected.json
      product-strategy-vague.expected.json
      unsupported-format.expected.json
      anti-overcriticism.expected.json
    traces/
      .gitkeep

  examples/
    prd/
      weak-ai-food-agent.before.md
      weak-ai-food-agent.review.md
      weak-ai-food-agent.after.md
    rfc/
      vague-risk-engine.before.md
      vague-risk-engine.review.md
      vague-risk-engine.after.md
    experiments/
      checkout-ab-test.before.md
      checkout-ab-test.review.md
      checkout-ab-test.after.md
    strategy/
      ai-growth-strategy.before.md
      ai-growth-strategy.review.md
      ai-growth-strategy.after.md

  cli/
    package.json
    tsconfig.json
    src/
      index.ts
      commands/
        review.ts
        improve.ts
        rerun.ts
        score.ts
        eval.ts
      core/
        artifact-classifier.ts
        format-detector.ts
        text-extractor.ts
        review-spec.ts
        validator-router.ts
        scoring.ts
        score-caps.ts
        findings.ts
        output-schema.ts
        trace.ts
        security-scan.ts
      ui/
        colors.ts
        reporter.ts
        mascot-state.ts
        status-line.ts
      exporters/
        markdown.ts
        json.ts
```

---

# README requirements

Create a strong README.

Use this structure:

1. Hero image
2. What is Shokunin Review?
3. Problem
4. Who it is for
5. Quick start
6. Install
7. MVP 1 scope
8. Supported formats
9. Not supported in MVP 1
10. What Shokunin catches
11. Supported document types
12. PRD vs RFC vs Experiment Plan vs Product Strategy
13. Human-readable and agent-readable quality
14. How it works
15. Commands
16. Default output
17. Readiness Score
18. Score confidence
19. Score caps
20. Finding tags
21. Validators
22. Skills are workflows, not reference docs
23. Verification is mandatory
24. Terminal UX
25. Statuses and colors
26. Mascot configuration through DESIGN.md
27. Onboarding
28. Unsupported format behavior
29. Security and privacy
30. Non-functional requirements
31. Architecture
32. Evals
33. FAQ
34. Roadmap
35. Limitations
36. Contributing

README hero:

```markdown
<p align="center">
  <img src="./assets/README-hero.png" alt="Shokunin Review" width="100%">
</p>
```

Opening copy:

```markdown
# Shokunin Review

**Review documents before people do.**

Shokunin Review is a terminal-first review skill and validation harness for AI-assisted work artifacts.

It checks whether PRDs, RFCs, Experiment Plans, and Product Strategy documents are ready for serious human review.

It is not an AI detector.

It does not shame authors.

It does not generate more documentation by default.

It removes noise, exposes weak reasoning, asks for evidence, and helps you reach a review-ready artifact.
```

Quick start:

```bash
git clone https://github.com/<your-org>/shokunin-review.git
cd shokunin-review
./bin/install
shokunin review examples/prd/weak-ai-food-agent.before.md
```

The user should understand in 60 seconds:

1. what Shokunin does
2. what it does not do
3. how to install it
4. how to run first review
5. why the output is trustworthy

---

# FAQ section for README

Add this FAQ section to README.md.

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

1. read the artifact
2. detect format and artifact type
3. build a review spec
4. select relevant validators
5. run checks
6. audit findings
7. calculate Readiness Score
8. apply score caps
9. verify output quality
10. recommend the smallest useful next action

### What is the Readiness Score?

Readiness Score is a 0–100 signal that shows whether a document is ready for human review.

It includes:

- total score
- score band
- score confidence
- dimension breakdown
- score caps applied
- missing context
- rationale

### What are score caps?

Score caps prevent polished but incomplete documents from receiving misleadingly high scores.

For example:

- no evidence → max score 60
- no primary metric → max score 55
- no MVP scope → max score 55
- no decision ask → max score 65
- no AI guardrails for AI feature → max score 70

If multiple caps apply, the strictest cap wins.

### What makes Shokunin Review different from generic AI feedback?

Generic AI feedback often gives broad suggestions like “improve clarity” or “add more detail.”

Shokunin Review uses:

- artifact-specific criteria
- validator routing
- grounded findings
- finding quality audit
- score caps
- evals
- non-toxic tone
- explicit exit criteria

It is designed to reduce review noise, not create more of it.

### How is it different from other skills or agents?

Most skills help generate content.

Shokunin Review focuses on validation.

It treats skills as workflows, not reference docs. Each skill must run checks, produce grounded findings, verify output quality, and state exit criteria.

### Does Shokunin Review rewrite my document?

Not by default.

The default behavior is review-first: score, blockers, and smallest useful improvement.

Full rewrites are intentionally avoided unless the user asks for them.

### What does “non-toxic review” mean?

Shokunin Review does not shame the author.

It avoids language like “this is bad.”

It says things like:

- this claim needs evidence
- this decision is missing
- this requirement is not testable
- this artifact is not ready for review yet

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

- customer personal data
- financial secrets
- production credentials
- API keys
- security architecture details
- NDA-protected strategy
- confidential roadmap or pricing details
- unreleased legal or compliance information

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
- terminal-first UX
- Readiness Score
- score confidence
- score caps
- validator routing
- finding quality audit
- JSON / Markdown output
- eval harness
- examples
- security guidance
- configurable mascot states

### What is not included in MVP 1?

MVP 1 does not include:

- web UI
- persistent memory
- MCP server
- board simulation
- full domain packs
- visual diagram analysis
- spreadsheet model validation
- legal/compliance certification
- automatic full rewrite by default

### What is planned next?

Future versions may add:

- richer section-level patch suggestions
- interactive Q&A improvement mode
- GitHub PR comment export
- basic secret redaction
- ADR review
- executive memo review
- architecture note review
- ML / DS document review
- Mermaid / PlantUML review
- PDF/PPTX structure extraction
- domain packs for AI products, fintech/risk, marketplaces, internal platforms, and ML systems

---

# Functional requirements

Create `FUNCTIONAL_REQUIREMENTS.md`.

Include:

## FR-1 Artifact intake

The system must accept a file path and identify whether the input is supported.

Supported input:

- `.md`
- `.txt`
- extracted text from `.docx`
- extracted text from `.pdf`
- extracted text from `.pptx`

If full extraction is not implemented, mark docx/pdf/pptx as best-effort or planned partial support.

## FR-2 Artifact classification

The system must classify the artifact as one of:

- PRD
- RFC
- EXPERIMENT_PLAN
- PRODUCT_STRATEGY
- UNKNOWN

## FR-3 Review spec generation

The system must build a review spec before validators run.

Review spec must include:

- artifact type
- detected maturity
- audience
- review mode
- expected state
- selected scoring dimensions
- validator budget
- finding budget
- score cap rules

## FR-4 Validator routing

The system must select only relevant validators.

Validators must run in one of three modes:

- full_review
- gap_detection
- not_applicable

Do not skip a validator only because a section is missing.

If the section should exist, use gap_detection mode.

## FR-5 Findings

Each finding must include:

- id
- validator
- validator_mode
- severity
- confidence
- tag
- category
- location
- issue
- evidence_from_artifact
- why_it_matters
- recommended_fix
- example_fix
- acceptance_test
- needs_human_judgment

## FR-6 Finding quality audit

The system must remove or reject findings that are:

- vague
- duplicated
- unsupported by artifact text
- not actionable
- only style nits
- too broad
- not useful for review readiness

## FR-7 Readiness Score

The system must calculate:

- total readiness score
- score band
- score confidence
- dimension breakdown
- score caps applied
- missing context
- rationale

## FR-8 Output

Default output must be short.

It must include:

- verdict
- score
- confidence
- top blockers
- score caps
- recommended next action
- suggested command

Full output only with `--full`.

## FR-9 Improve mode

The system must support:

```bash
shokunin improve <file>
```

Improve mode should recommend the smallest useful improvement path.

It must not rewrite the full document by default.

## FR-10 Re-review mode

The system must support:

```bash
shokunin rerun <file> --compare <original-file>
```

It must show:

- before score
- after score
- delta
- what improved
- remaining blockers

## FR-11 Unsupported format behavior

The system must clearly explain unsupported formats or limitations.

## FR-12 Security warning

The system must warn when the document may contain sensitive, NDA-protected, personal, customer, financial, security, or production information.

---

# Document requirements docs

Create files under:

```text
docs/document-requirements/
```

## PRD requirements

PRD is primarily a product and business-layer document.

It answers:

- what should we build
- for whom
- why now
- what problem it solves
- what is in scope and out of scope
- how success is measured
- what requirements matter
- what dependencies and risks exist

Common PRD types:

- Classic PRD
- One-pager / Lightweight PRD
- PR/FAQ-style PRD
- Feature Spec PRD
- Technical / Platform PRD
- AI-native PRD
- Experiment-oriented PRD
- Agent-readable PRD

Checks:

- problem clarity
- user / segment clarity
- evidence
- MVP scope
- non-goals
- requirements quality
- acceptance criteria
- metrics
- guardrails
- dependencies
- risks
- decision ask
- agent-readability

## RFC requirements

RFC is primarily a technical design document.

It answers:

- how should we build it
- what alternatives exist
- what trade-offs we accept
- what system boundaries, dependencies, failure modes, rollout, and ownership exist

Common types:

- RFC / Request for Comments
- Technical Design Doc
- API Design Spec
- Migration / Rollout Design
- Security / Privacy Design
- AI / LLM System Design
- Agent-readable Tech Spec

Checks:

- technical decision
- context
- goals / non-goals
- alternatives
- trade-offs
- API / data contracts
- system boundaries
- dependencies
- security / privacy
- failure modes
- observability
- rollout / rollback
- test plan
- open questions

## Experiment Plan requirements

Experiment Plan is a pre-launch decision document.

It answers:

- what hypothesis are we testing
- who is included
- what is control and treatment
- what metric proves success
- what guardrails protect us
- what decision follows

Common types:

- Classic A/B Test Plan
- Feature Flag Rollout Plan
- Pricing / Monetization Experiment
- Growth Experiment Brief
- Search / Ranking Experiment
- AI / ML Experiment Plan
- Holdout / Long-term Experiment
- Agent-readable Experiment Spec

Checks:

- hypothesis
- target population
- control / treatment
- primary metric
- secondary metrics
- guardrail metrics
- randomization unit
- sample / duration assumptions
- minimum detectable effect if available
- instrumentation
- sample ratio mismatch risk
- stopping rule
- decision rule
- rollback
- interpretation risk

## Product Strategy requirements

Product Strategy is a strategic choice document.

It answers:

- what strategic thesis are we proposing
- which segment matters
- what pain we address
- what opportunity exists
- why now
- what options were considered
- what trade-offs we make
- what we will not do
- how work should be sequenced
- what metrics prove progress
- what decision is needed

Common types:

- Product Strategy Memo
- Narrative Strategy Doc
- Opportunity Solution Tree
- Product Bet Brief
- Platform Strategy
- AI Product Strategy
- Fintech Strategy Doc
- B2B SaaS Strategy
- Agent-readable Strategy Spec

Checks:

- strategic thesis
- target customer / ICP
- pain
- evidence
- opportunity sizing
- business logic
- options
- trade-offs
- resource logic
- risks
- sequencing
- GTM / adoption logic
- success metrics
- decision ask

## PRD vs RFC distinction

Create `docs/document-requirements/prd-vs-rfc.md`.

Include this table:

| Document | Main question | Primary layer | Main risk |
|---|---|---|---|
| PRD | What should we build and why? | Product / business | Building the wrong thing |
| RFC | How should we build it? | Technical design | Building it wrong |
| Experiment Plan | How will we test and decide? | Product / data | Learning nothing or misreading results |
| Product Strategy | What strategic choice should we make? | Product / business strategy | Choosing a vague direction without evidence |

Rules:

```text
A PRD should not pretend to be an RFC.
An RFC should not pretend to be a business strategy.
An experiment plan should not launch without a decision rule.
A strategy document should not hide missing choices behind vision language.
```

---

# Non-functional requirements

Create `NON_FUNCTIONAL_REQUIREMENTS.md` and `docs/non-functional-requirements.md`.

Include:

## Reliability

- deterministic output schema
- stable score bands
- explicit score caps
- graceful unsupported format handling
- no hidden validator execution

## Usability

- short default output
- `--full` for detailed report
- `--json` for automation
- `--markdown` for human report
- clear next command
- no forced long onboarding

## Safety

- no AI-use accusations
- no invented evidence
- no confidential data stored by default
- privacy warning for sensitive docs
- no full rewrite by default

## Maintainability

- skills are workflows
- validators are small and focused
- evals cover each artifact type
- score caps are explicit
- each finding has one schema

## Extensibility

- artifact types are modular
- validators support full_review / gap_detection / not_applicable
- future PDF/PPTX/diagram support should not break MVP 1
- future domain packs are optional extensions

## Accessibility

- `--no-color`
- `--no-animation`
- text-only output
- no critical information conveyed by color alone

---

# Security requirements

Create or update:

- SECURITY.md
- docs/ai-security.md
- docs/privacy.md
- GUARDRAILS.md

Include this warning:

```text
Do not paste confidential, NDA-protected, personal, customer, financial, security, or production secrets into Shokunin Review unless you understand your local setup and data handling.
```

For sensitive documents:

```bash
shokunin review file.md --local-only --no-trace
```

Security requirements:

- do not store raw document text by default
- do not write sensitive input into traces by default
- warn before reviewing documents that may contain secrets
- support `--no-trace`
- document `--local-only`
- mark `--redact-secrets` as roadmap if not implemented
- never invent company metrics, customer data, research, or strategy
- never accuse the author of using AI

Security warning flow:

```text
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

# DESIGN.md requirements

Update `DESIGN.md` as the single source of truth for terminal UX.

Include:

- brand principles
- terminal palette
- status colors
- mascot states
- animation rules
- accessibility rules
- copywriting rules
- quiet/json/no-animation behavior
- public terminology rules
- examples

Palette:

```text
background-dark:     #11181C
background-medium:   #172126
panel:               #22303A
panel-border:        #3E4C55
text-primary:        #D8DEE3
text-secondary:      #B9C0C7
text-muted:          #8A969E
accent-blue:         #6F95A5
accent-orange:       #C97752
warning:             #B7A27A
risk:                #B97868
success:             #8FAE9A
```

Review lifecycle statuses:

- idle
- reading
- classifying
- scoping
- routing
- checking
- auditing
- scoring
- verifying
- done
- blocked
- unsupported

Status colors:

```text
idle          muted gray
reading       muted blue
classifying   steel blue
scoping       slate
routing       muted blue
checking      amber
auditing      orange
scoring       blue-green
verifying     slate
done          muted green
blocked       muted red / risk
unsupported   amber
```

Mascot principle:

```text
The mascot is not decoration.
The mascot indicates review state, progress, and whether user action is needed.
```

Mascot modes:

- ascii
- pixel
- off

MVP 1 mascot behavior:

- ASCII / Unicode mascot
- status captions
- color changes
- static state changes
- optional no-animation mode

---

# CLI commands

Document or implement:

```bash
shokunin review <file>
shokunin improve <file>
shokunin rerun <file> --compare <original-file>
shokunin score <file>
shokunin eval
```

Artifact-specific Claude commands:

```text
/shokunin-review
/shokunin-review-prd
/shokunin-review-rfc
/shokunin-review-experiment
/shokunin-review-strategy
/shokunin-improve
/shokunin-rerun
/shokunin-score
/shokunin-eval
```

Modes:

```bash
--mode fast
--mode deep
--mode draft
```

Output options:

```bash
--json
--markdown
--quiet
--full
--no-color
--no-animation
--no-trace
--local-only
```

Mascot options:

```bash
--mascot ascii
--mascot pixel
--mascot off
```

---

# Artifact types

Add enum values:

- PRD
- RFC
- EXPERIMENT_PLAN
- PRODUCT_STRATEGY
- UNKNOWN

---

# Finding tags

Use this tag set:

```text
[noise-bloat]
[overclaim]
[logic-drift]
[missing-decision]
[evidence-gap]
[metric-fog]
[requirement-fog]
[tech-handwave]
[dependency-gap]
[architecture-gap]
[experiment-gap]
[duplicate-risk]
[review-blocker]
[simpler-alternative-gap]
[cost-gap]
[ai-guardrail-gap]
[strategy-fog]
[segment-fog]
[opportunity-fog]
[tradeoff-gap]
```

---

# Score bands

```text
90–100: Review-ready
75–89: Ready with minor fixes
60–74: Needs major fixes
40–59: Needs revision
0–39: Not review-ready
```

---

# Score confidence

```yaml
high:
  enough context to score reliably

medium:
  some missing context, score still useful

low:
  important context missing, score is directional only
```

---

# Score caps

Implement or document score caps:

```yaml
no_problem_evidence: 60
no_primary_metric: 55
no_mvp_scope: 55
no_decision_ask: 65
no_ai_guardrails_for_ai_feature: 70
critical_placeholders_present: 68
unknown_artifact_type: 70
low_context_confidence: 75
generic_strategy_language_only: 55
no_target_segment: 60
no_tradeoffs: 70
```

If multiple caps apply, use the strictest cap.

---

# Agents

Create focused MVP 1 agents only:

```text
review-orchestrator.md
document-intake-agent.md
review-spec-builder.md
validator-router.md
decision-reviewer.md
evidence-reviewer.md
metric-reviewer.md
requirement-reviewer.md
technical-feasibility-reviewer.md
strategy-reviewer.md
opportunity-sizing-reviewer.md
simpler-alternative-reviewer.md
ai-safety-guardrails-reviewer.md
cost-roi-sanity-reviewer.md
finding-quality-auditor.md
severity-calibrator.md
output-guard.md
```

Do not create 25+ agents.

Do not add board agents, executive simulation agents, market research agents, or domain packs in MVP 1.

Agents are review dimensions, not theater personas.

---

# Validator modes

Validators must support:

```yaml
full_review:
  relevant section exists and needs analysis

gap_detection:
  relevant section is missing but should exist

not_applicable:
  check truly does not apply
```

Important:

```text
Do not skip a validator only because a section is missing.
```

---

# Skills

Create only these MVP 1 skills:

```text
shokunin-review
shokunin-score
shokunin-gherkin
shokunin-strategy
shokunin-verify
```

Every `SKILL.md` must include:

- Purpose
- When to use
- Inputs
- Workflow
- Checks
- Output contract
- Verification
- Exit criteria
- Boundaries

Every skill must be a workflow, not a reference doc.

---

# Default terminal output

Default output must be short.

Show:

- verdict
- readiness score
- score confidence
- short reason
- top blockers
- score caps applied
- recommended next action
- suggested next command

Full report only with `--full`.

Example:

```text
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

---

# Unsupported format behavior

If unsupported or limited format:

```text
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

```text
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

# Scenario docs

Create docs/scenarios:

- onboarding-flow.md
- prd-review-flow.md
- rfc-review-flow.md
- experiment-plan-review-flow.md
- product-strategy-review-flow.md
- unsupported-format-flow.md
- unsupported-artifact-flow.md
- security-warning-flow.md
- improve-flow.md
- re-review-flow.md

Each scenario should show:

1. user command
2. Shokunin status
3. artifact classification
4. review spec
5. selected validators
6. findings
7. readiness score
8. recommended next action
9. optional improve / re-review loop

---

# Templates

Create templates:

```text
templates/review-output.schema.json
templates/finding.schema.json
templates/review-spec.schema.json
templates/prd-template.md
templates/rfc-template.md
templates/experiment-plan-template.md
templates/product-strategy-template.md
```

Schemas must match the finding and output contracts.

---

# Examples

Create before/review/after examples:

```text
examples/prd/
  weak-ai-food-agent.before.md
  weak-ai-food-agent.review.md
  weak-ai-food-agent.after.md

examples/rfc/
  vague-risk-engine.before.md
  vague-risk-engine.review.md
  vague-risk-engine.after.md

examples/experiments/
  checkout-ab-test.before.md
  checkout-ab-test.review.md
  checkout-ab-test.after.md

examples/strategy/
  ai-growth-strategy.before.md
  ai-growth-strategy.review.md
  ai-growth-strategy.after.md
```

Examples should demonstrate:

- review readiness score
- top blockers
- minimal improvement path
- before/after delta

Do not make the after version unrealistically perfect.

---

# Evals

Evals are the executable PRD for Shokunin Review.

Create MVP 1 evals:

```text
prd-low-readiness.yaml
prd-good-minimal.yaml
rfc-vague.yaml
rfc-good-minimal.yaml
experiment-plan-weak.yaml
experiment-plan-good-minimal.yaml
product-strategy-vague.yaml
product-strategy-good-minimal.yaml
ai-prd-overclaimed.yaml
unsupported-format.yaml
anti-overcriticism.yaml
security-warning.yaml
```

Each eval must include:

```yaml
id:
artifact_type:
input_file:
expected_tags:
expected_score_band:
expected_score_caps:
required_validators:
forbidden_behaviors:
required_output_fields:
notes:
```

Forbidden behaviors:

- accuse author of using AI
- invent evidence
- invent company strategy
- rewrite the whole artifact unless requested
- give generic praise
- omit readiness score
- omit reviewer action
- use banned legacy terminology in public UX
- overcriticize a concise but good document
- recommend full rewrite when minimal patch is enough
- store sensitive content in traces by default

---

# Architecture docs

Create or update:

- docs/architecture.md
- docs/validation-harness.md
- docs/loop-engineering.md
- docs/evals-as-prd.md

MVP 1 architecture:

```text
CLI / Claude command
→ Artifact Intake
→ Format Detector
→ Text Extractor
→ Artifact Classifier
→ Review Spec Builder
→ Validator Router
→ Validators
→ Finding Quality Auditor
→ Severity Calibrator
→ Score Engine
→ Output Guard
→ Report Exporter
→ Eval Harness
```

Loop engineering:

```text
Review
→ Diagnose blockers
→ Recommend smallest useful improvement
→ Improve
→ Re-review
→ Compare delta
→ Update evals if review failed
```

Harness engineering:

The validation harness controls:

- what artifact type is being reviewed
- which validators are allowed to run
- what output schema is valid
- what guardrails must pass
- how readiness score is calculated
- what evals define success
- how findings are filtered and calibrated

---

# Install docs and scripts

Create:

```text
bin/install
bin/sync-commands
bin/sync-skills
bin/sync-agents
bin/check-terminology
bin/run-evals
bin/validate-skills

install/claude-code.md
install/cursor.md
install/codex.md
install/local-cli.md
```

Install docs must include:

- project-local Claude Code install
- user-level Claude Code install
- direct child skills directory warning
- Cursor/Codex best-effort notes
- local CLI usage

Important:

Skills should be direct children of the skills directory when installed.

Do not nest skills under an extra folder.

---

# Compatibility docs

Create `docs/compatibility.md`.

Include:

MVP 1 primary target:

- Claude Code

Best-effort:

- Cursor
- Codex CLI
- Gemini CLI

Portable assets:

- Markdown commands
- Markdown agents
- Markdown skills
- JSON schemas
- Eval YAML files

Not guaranteed:

- full lifecycle hooks outside Claude Code
- mascot UI outside local CLI
- full skill auto-loading outside Claude-compatible environments

---

# Catalog docs

Create `docs/catalog.md`.

Include tables for:

- commands
- skills
- agents
- hooks
- evals

Example:

```markdown
| Command | Purpose |
|---|---|
| /shokunin-review | Generic review |
| /shokunin-review-prd | PRD review |
| /shokunin-review-rfc | RFC review |
| /shokunin-review-experiment | Experiment Plan review |
| /shokunin-review-strategy | Product Strategy review |
| /shokunin-score | Explain readiness score |
| /shokunin-eval | Run evals |
```

---

# Anti-overengineering docs

Create `docs/anti-overengineering.md`.

Include:

```text
Shokunin Review must not become the thing it reviews against.

It should not produce a huge report when a short blocker list is enough.

Default behavior:
- max 3 blockers
- max 5 high-value findings
- no full rewrite by default
- no 20-agent reviewer board
- no domain packs in MVP 1
- no “generate all documents” behavior

Every recommendation must reduce uncertainty, improve decision quality, or make the artifact easier to act on.
```

---

# Roadmap

Document:

## MVP 1

Text-based review readiness for:

- PRD
- RFC / Technical Design
- Experiment Plan
- Product Strategy

## MVP 2

- richer section-level patch suggestions
- interactive Q&A improvement mode
- GitHub PR comment export
- basic secret redaction
- more evals

## MVP 3

- ADR
- executive memo
- architecture notes
- ML / DS feature docs
- presentation text exports

## MVP 4

- Mermaid / PlantUML review
- Excalidraw JSON review
- PDF structure extraction
- PPTX speaker notes and slide text extraction
- image-based architecture diagram review

## MVP 5

- AI product pack
- fintech / risk pack
- marketplace pack
- internal platform pack
- ML systems pack
- ecommerce pack

---

# Anti-overengineering self-review

Before finalizing, check:

1. Did we keep MVP 1 limited to four artifact types?
2. Did we avoid adding too many agents?
3. Did README clearly state what MVP 1 does and does not do?
4. Did we avoid promising visual diagram analysis?
5. Did we keep default output short?
6. Did every skill include verification and exit criteria?
7. Did every finding require grounding and actionability?
8. Did we include security warnings?
9. Did we remove banned legacy terms from public UX?
10. Did we add evals for weak docs, good docs, unsupported formats, anti-overcriticism, and security warnings?
11. Did we avoid board/executive simulation in MVP 1?
12. Did we avoid persistent memory and MCP server in MVP 1?

---

# Implementation passes

Do not create everything at once.

Use these passes.

## Pass 1 — Product docs

Create:

- README.md
- DESIGN.md
- FUNCTIONAL_REQUIREMENTS.md
- NON_FUNCTIONAL_REQUIREMENTS.md
- SECURITY.md
- ROADMAP.md
- docs/mvp-scope.md
- docs/limitations.md
- docs/anti-overengineering.md
- docs/compatibility.md
- docs/catalog.md

## Pass 2 — Document requirements and scenarios

Create:

- docs/document-requirements/*
- docs/scenarios/*
- docs/statuses.md
- docs/onboarding.md
- docs/terminal-ux.md

## Pass 3 — Claude assets

Create:

- .claude/commands/*
- .claude/agents/*
- .claude/skills/*
- .claude/hooks/*

## Pass 4 — Harness and evals

Create:

- harness/evals/*
- harness/rubrics/*
- harness/golden/*
- templates/*
- examples/*

## Pass 5 — CLI skeleton

Create:

- cli/package.json
- cli/tsconfig.json
- cli/src/*

Keep CLI skeleton simple and deterministic.

---

# After file creation

Run:

```bash
./bin/check-terminology || true
./bin/validate-skills || true
./bin/run-evals || true
npm run test || true
npm run eval || true
```

Return:

1. files created or updated
2. MVP 1 boundaries added
3. functional requirements added
4. non-functional requirements added
5. security section added
6. document requirements added
7. statuses and colors added
8. mascot states added to DESIGN.md
9. FAQ added to README
10. onboarding and scenario docs added
11. supported/unsupported formats documented
12. install and sync scripts added
13. evals added
14. remaining TODOs
15. any scope cuts made to protect MVP quality
16. what I should review next
