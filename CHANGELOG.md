
## Eval Operating System Foundation

### What changed

Added the first Eval Operating System foundation: quality rubrics, error taxonomy, error analysis documentation, and roadmap structure for synthetic evals and few-shot mining.

### Why this matters

Shokunin Review should improve review quality through an iterative loop, not only through static pass/fail evals. The Eval Operating System treats evals as an evolving quality system that prevents false confidence from AI-generated reviews.

### Current status

**Implemented:**
- Finding quality rubric (`harness/rubrics/finding-quality-rubric.yaml`)
- Review quality rubric (`harness/rubrics/review-quality-rubric.yaml`)
- Error taxonomy (`harness/error_analysis/error_taxonomy.yaml`)
- Error analysis loop documentation (`docs/error-analysis-loop.md`)
- Eval Operating System documentation (`docs/eval-operating-system.md`)
- Eval quality definition documentation (`docs/eval-quality-definition.md`)
- Initial error analysis script (`scripts/analyze-eval-errors.sh`)
- Synthetic eval roadmap (`harness/synthetic/README.md`)
- Few-shot mining roadmap (`harness/few_shot/README.md`)

**Partially implemented:**
- Expected findings (exists in eval cases, needs consistency improvements)
- Regression testing (basic structure exists, needs stronger governance)

**Roadmap:**
- Trace clustering automation
- Few-shot mining automation
- Synthetic eval generation
- Eval trust reports

### New documentation

This update adds:

```
docs/eval-operating-system.md
docs/eval-quality-definition.md
docs/error-analysis-loop.md
harness/rubrics/finding-quality-rubric.yaml
harness/rubrics/review-quality-rubric.yaml
harness/error_analysis/error_taxonomy.yaml
scripts/analyze-eval-errors.sh
harness/synthetic/README.md
harness/few_shot/README.md
```

### Updated documentation

This update updates:

```
README.md - Added Eval Operating System section
ROADMAP.md - Added Eval Operating System Roadmap section
CHANGELOG.md - This entry
```

### Quality dimensions

The Eval Operating System defines 10 quality dimensions:

1. **Critical blocker recall** — ≥95% recall on critical blockers
2. **Expected finding recall** — ≥80% recall on expected findings
3. **False positive rate** — ≤5% false positive rate
4. **Severity calibration** — ≥90% severity alignment
5. **Score calibration** — ≥90% score band accuracy
6. **Evidence grounding** — ≥90% of findings include evidence quotes
7. **Recommendation specificity** — ≥80% pass specificity rubric
8. **Must-not-flag violations** — 0% violations
9. **Regression drift** — No more than 5% regression after changes
10. **Human agreement rate** — ≥85% agreement in studies

### Error taxonomy

The error taxonomy includes 14 error types:

- missed_blocker, missed_expected_finding, false_positive, wrong_severity
- vague_recommendation, unsupported_claim, score_band_mismatch
- missing_evidence_quote, duplicate_finding, must_not_flag_violation
- toxic_or_dismissive_tone, hallucinated_gap, missing_recommended_action
- generic_recommendation, document_bloat

### Key principles

The Eval Operating System emphasizes:

1. **Systematic improvement** — Eval failures drive targeted fixes
2. **Measurable quality** — Rubrics make "good review" objective
3. **Error classification** — Taxonomy enables pattern analysis
4. **Regression prevention** — Detect quality drift early
5. **No overclaiming** — Clear distinction between implemented and roadmap

### Verification

Run `scripts/verify-eval-operating-system.sh` to verify the Eval Operating System implementation.

Run `scripts/analyze-eval-errors.sh` to check error analysis infrastructure status.

### Product impact

This update improves Shokunin Review from static eval tests to an evolving quality system with:

- Systematic error analysis and classification
- Objective quality rubrics for findings and reviews
- Foundation for continuous improvement
- Prevention of quality drift
- Measurable quality metrics

It creates the foundation for:
- Better validator improvement through error analysis
- Objective quality assessment through rubrics
- Systematic regression prevention
- Continuous quality improvement loop
- Stakeholder trust through transparency

---

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
