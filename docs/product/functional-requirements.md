# FUNCTIONAL_REQUIREMENTS.md

**Functional requirements for Shokunin Review MVP 1.**

---

## FR-1: Artifact Intake

The system must accept a file path and identify whether the input is supported.

### Supported Input

- `.md` — Markdown files
- `.txt` — Plain text files
- `.docx` — Text extracted from documents (best-effort)
- `.pdf` — Text extracted from PDFs (best-effort)
- `.pptx` — Text extracted from presentations (best-effort)

### Behavior

If full extraction is not implemented for `.docx`, `.pdf`, or `.pptx`:

- Mark as best-effort support
- Document limitations in output
- Recommend export as Markdown or plain text

### Unsupported Input

If input format is not supported:

- Display clear unsupported format message
- Explain supported formats
- Suggest export to supported format
- Exit gracefully without error

### Interface

```bash
shokunin review <file-path>
```

---

## FR-2: Artifact Classification

The system must classify the artifact as one of:

- `PRD`
- `RFC`
- `EXPERIMENT_PLAN`
- `PRODUCT_STRATEGY`
- `UNKNOWN`

### Classification Method

Classification must be based on:

- Document structure and headings
- Content patterns (e.g., "hypothesis" → experiment, "alternatives" → RFC)
- Filename hints (if available)
- User override via `--type` flag

### Classification Confidence

Classification must include confidence level:

- **High** — Clear structural and content signals
- **Medium** — Some signals present, ambiguous
- **Low** — Weak or conflicting signals

### UNKNOWN Behavior

If classification result is `UNKNOWN`:

- Display classification uncertainty
- Offer manual artifact type selection
- Allow generic draft review mode
- Document in findings

### User Override

User must be able to override classification:

```bash
shokunin review file.md --type prd
shokunin review file.md --type rfc
shokunin review file.md --type experiment
shokunin review file.md --type strategy
```

---

## FR-3: Review Spec Generation

The system must build a review spec before validators run.

### Review Spec Contents

Review spec must include:

```yaml
artifact_type: PRD | RFC | EXPERIMENT_PLAN | PRODUCT_STRATEGY
detected_maturity: draft | proposal | ready_for_review | unknown
audience: internal | external | technical | executive | mixed
review_mode: fast | deep | draft
expected_state: what state the artifact should be in
selected_dimensions: list of scoring dimensions to apply
validator_budget: max validators to run (for mode=fast)
finding_budget: max findings to output (default: 5 for short, all for --full)
score_cap_rules: list of applicable score cap rules
```

### Maturity Detection

Maturity must be detected from:

- Presence of key sections
- Completeness of required fields
- Evidence and specificity level
- Placeholder density

### Review Modes

**fast** mode:

- Reduced validator budget
- Focus on critical validators only
- Faster execution

**deep** mode:

- Full validator budget
- All applicable validators
- Comprehensive analysis

**draft** mode:

- Adjusted expectations for draft state
- Focus on structure and direction
- Lenient scoring on completeness

---

## FR-4: Validator Routing

The system must select only relevant validators.

### Routing Logic

Validators must be routed based on:

- Artifact type (PRD, RFC, EXPERIMENT_PLAN, PRODUCT_STRATEGY)
- Artifact maturity (draft, proposal, ready)
- Review mode (fast, deep, draft)
- Detected sections and content

### Validator Modes

Each validator must run in one of three modes:

```yaml
full_review:
  description: Relevant section exists and needs analysis
  behavior: Run full validator checks on existing content

gap_detection:
  description: Relevant section is missing but should exist
  behavior: Flag missing section as gap, explain why it matters

not_applicable:
  description: Check truly does not apply to this artifact type
  behavior: Skip validator, no output
```

### Routing Rule

```text
Do not skip a validator only because a section is missing.
If the section should exist, use gap_detection mode.
```

### Validator Budget

In `fast` mode:

- Limit to top N critical validators
- Prioritize: decision, evidence, metric, requirement validators
- Skip optional validators

In `deep` mode:

- Run all applicable validators
- No validator budget limit

---

## FR-5: Findings

Each finding must include all required fields.

### Finding Schema

```yaml
id: unique finding identifier
validator: validator name that produced this finding
validator_mode: full_review | gap_detection | not_applicable
severity: blocker | high | medium | low
confidence: high | medium | low
tag: finding category tag
category: decision | evidence | metric | requirement | technical | strategy | cost | safety
location: where in artifact (line, section, heading)
issue: what the issue is (1-2 sentences)
evidence_from_artifact: quoted text or description of what was found
why_it_matters: impact on review readiness or decision quality
recommended_fix: concrete, actionable fix (2-4 sentences)
example_fix: specific example of how to fix (optional but encouraged)
acceptance_test: how to verify the fix was applied
needs_human_judgment: whether this requires human context to fully resolve
```

### Finding Tags

See README.md for full tag list:

- `[noise-bloat]`
- `[overclaim]`
- `[logic-drift]`
- `[missing-decision]`
- `[evidence-gap]`
- `[metric-fog]`
- `[requirement-fog]`
- `[tech-handwave]`
- `[dependency-gap]`
- `[architecture-gap]`
- `[experiment-gap]`
- `[duplicate-risk]`
- `[review-blocker]`
- `[simpler-alternative-gap]`
- `[cost-gap]`
- `[ai-guardrail-gap]`
- `[strategy-fog]`
- `[segment-fog]`
- `[opportunity-fog]`
- `[tradeoff-gap]`

### Severity Levels

**blocker** — Prevents review from proceeding, must be fixed

**high** — Significant issue, strongly recommend fix before review

**medium** — Moderate issue, recommend fix

**low** — Minor issue, optional fix

### Confidence Levels

**high** — Confident this is a real issue

**medium** — Likely an issue, but some ambiguity

**low** — Potential issue, may need human judgment

---

## FR-6: Finding Quality Audit

The system must remove or reject findings that are:

- Vague or generic
- Duplicated
- Unsupported by artifact text
- Not actionable
- Only style nits
- Too broad
- Not useful for review readiness

### Audit Checks

Before output, every finding must pass:

1. **Grounding check** — Is finding grounded in artifact text?
2. **Actionability check** — Is there a concrete fix?
3. **Specificity check** — Is finding specific enough?
4. **Duplication check** — Is this duplicate of another finding?
5. **Relevance check** — Does this affect review readiness?

### Audit Failure

If a finding fails audit:

- Remove from output
- Log audit failure (if trace enabled)
- Do not present to user

### Finding Deduplication

Findings with same issue, location, and category must be merged:

- Keep highest severity
- Keep most specific recommended_fix
- Combine evidence if different sources

---

## FR-7: Readiness Score

The system must calculate a comprehensive readiness score.

### Score Components

```yaml
total_readiness_score: 0-100 overall score
score_band: Review-ready | Ready with minor fixes | Needs major fixes | Needs revision | Not review-ready
score_confidence: high | medium | low
dimension_breakdown:
  decisions: score for decision quality
  evidence: score for evidence quality
  metrics: score for metric quality
  requirements: score for requirement quality
  technical: score for technical quality
  strategy: score for strategic quality (if applicable)
score_caps_applied: list of score caps that were triggered
missing_context: list of key information missing
rationale: explanation of score (2-4 sentences)
```

### Score Bands

| Score | Band |
|-------|------|
| 90–100 | Review-ready |
| 75–89 | Ready with minor fixes |
| 60–74 | Needs major fixes |
| 40–59 | Needs revision |
| 0–39 | Not review-ready |

### Score Confidence

**high** — Enough context to score reliably

**medium** — Some missing context, score still useful

**low** — Important context missing, score is directional only

### Dimension Scoring

Each dimension (decisions, evidence, metrics, requirements, technical, strategy):

- Scored 0-100
- Weighted based on artifact type
- Combined into total score

### Score Rationale

Rationale must explain:

- Why this score was given
- What limited the score (if any)
- What would improve the score

---

## FR-8: Score Caps

The system must apply score caps to prevent misleading high scores.

### Score Cap Logic

```text
If multiple caps apply, use the strictest cap.
```

### Score Cap Rules

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

### Score Cap Display

Score caps must be displayed in output:

```text
Score caps applied:
- No evidence → max score 60
- No MVP scope → max score 55
- No primary metric → max score 55
```

---

## FR-9: Output

The system must provide appropriate output for each mode.

### Default Output (Short)

Must include:

- Verdict (emoji + text)
- Readiness score
- Score confidence
- Short reason (1-2 sentences)
- Top blockers (max 3)
- Score caps applied
- Recommended next action
- Suggested next command

### Full Output (--full)

Must include everything from default plus:

- All findings (not just blockers)
- Dimension breakdown
- Missing context
- Full rationale
- Acceptance criteria
- Exit criteria

### JSON Output (--json)

Must provide:

- Structured JSON per `templates/review-output.schema.json`
- All findings and metadata
- Machine-parseable format
- No mascot or terminal formatting

### Markdown Output (--markdown)

Must provide:

- Markdown-formatted report
- All findings and metadata
- Suitable for documentation
- No mascot or terminal formatting

### Quiet Output (--quiet)

Must provide:

- Verdict, score, and recommended action only
- No detailed findings
- No mascot
- Minimal output

---

## FR-10: Improve Mode

The system must support improvement suggestions.

### Command

```bash
shokunin improve <file> [--focus <area>]
```

### Behavior

Improve mode should:

- Recommend the smallest useful improvement path
- Focus on top blockers first
- Provide concrete, specific suggestions
- Not rewrite the full document by default

### Focus Options

```bash
--focus structure     # Focus on document structure
--focus evidence      # Focus on evidence and data
--focus metrics       # Focus on metrics and measurement
--focus requirements  # Focus on requirements clarity
--focus technical     # Focus on technical approach
--focus strategy      # Focus on strategic clarity (strategy docs)
```

### Improve Output

Improve output must include:

- Prioritized improvement list
- Specific sections to address
- Example text for key improvements
- Estimated effort (small/medium/large)
- Expected score improvement

---

## FR-11: Re-review Mode

The system must support re-review with comparison.

### Command

```bash
shokunin rerun <revised-file> --compare <original-file>
```

### Behavior

Re-review mode must:

- Run full review on revised file
- Compare against original review
- Show before/after scores
- Highlight what improved
- Show remaining blockers

### Re-review Output

Must include:

```yaml
before_score: original readiness score
after_score: revised readiness score
score_delta: point change and percentage change
improvements: list of issues that were fixed
remaining_blockers: list of issues still present
new_issues: any new issues introduced (if any)
overall_assessment: progress summary
recommended_next_action: what to do next
```

### Comparison Display

```text
Before: 36/100 (Not review-ready)
After:  72/100 (Needs major fixes)
Delta:  +36 points (+100%)

Improvements:
✓ Added quantified problem statement
✓ Defined MVP scope
✓ Added primary success metric
✓ Included AI guardrails

Remaining blockers:
1. [evidence-gap] Business impact claim needs baseline
2. [metric-fog] Secondary metrics unclear

Recommended next action:
shokunin improve docs/prd-v2.md --focus evidence
```

---

## FR-12: Unsupported Format Behavior

The system must handle unsupported or limited formats gracefully.

### Unsupported Format Message

If format is not supported:

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

### Unknown Artifact Message

If artifact type is unknown:

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

### Graceful Exit

System must:

- Display clear, helpful message
- Not crash or error
- Suggest next action
- Exit cleanly

---

## Additional Functional Behaviors

## Security Warning

If document may contain sensitive content:

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

## Trace Logging

If `--no-trace` is not set:

- Log review execution steps
- Log validator execution
- Log finding audit trail
- Do not log sensitive artifact content

## Error Handling

All errors must:

- Display clear, actionable error message
- Suggest next action
- Exit gracefully
- Not expose internal stack traces to user

## Version Information

```bash
shokunin --version
```

Must display:

- Version number
- MVP level (1, 2, 3, 4, 5)
- Build info (if available)

## Help Information

```bash
shokunin --help
shokunin review --help
shokunin improve --help
shokunin rerun --help
shokunin score --help
shokunin eval --help
```

Must display:

- Command description
- Usage syntax
- Options and flags
- Examples

---

**FUNCTIONAL_REQUIREMENTS.md defines what Shokunin Review MVP 1 must do.**
