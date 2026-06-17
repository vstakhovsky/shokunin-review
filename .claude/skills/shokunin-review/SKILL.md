# Shokunin Review Skill

Reviews documents for readiness before stakeholder review.

## Purpose

Review PRDs, RFCs, Experiment Plans, and Product Strategy documents to ensure they're ready for serious human review.

## When to Use

Use this skill when you have a document that needs review before:
- Stakeholder review
- Leadership review
- Implementation decision
- Investment decision
- Go/no-go decision

## Workflow

1. **Intake** — Read and classify artifact
2. **Spec** — Build review specification
3. **Route** — Select relevant validators
4. **Check** — Run validators and generate findings
5. **Audit** — Audit findings for quality
6. **Score** — Calculate readiness score
7. **Verify** — Verify output quality
8. **Exit** — Return verdict with next actions

## Inputs

- Document file path
- Optional: artifact type override
- Optional: review mode (fast/deep/draft)

## Checks

Validates across multiple dimensions:
- Decisions (clarity, completeness)
- Evidence (quality, grounding)
- Metrics (clarity, measurability)
- Requirements (testability)
- Technical approach (for RFCs)
- Strategy (for strategies)
- AI guardrails (for AI features)

## Output Contract

Returns structured review output with:
- Verdict (emoji + text)
- Readiness score (0-100)
- Score confidence (high/medium/low)
- Top blockers (max 3 in default output)
- Score caps applied
- Recommended next action
- Suggested follow-up command

## Verification

Before returning output, verifies:
- All findings grounded in artifact
- All findings have concrete fixes
- No generic advice remains
- No duplicate findings remain
- Tone is calm and direct
- No toxic language
- No invented evidence
- Score matches findings and verdict

## Exit Criteria

Skill complete when:
- All validators run
- Findings audited and filtered
- Score calculated and caps applied
- Output verified and guarded
- Next action recommended
- Exit criteria stated

## Boundaries

- **Scope**: PRD, RFC, Experiment Plan, Product Strategy only
- **Formats**: Text-based only (md, txt, docx, pdf, pptx best-effort)
- **Output**: Short by default, `--full` for detailed
- **Language**: English only
- **Review type**: Validation only, not generation

## Example

```bash
# Input: docs/prd.md

# Output:
🔴 Not review-ready — 36/100
Confidence: Medium

Top blockers:
1. [evidence-gap] Problem not quantified
2. [missing-decision] MVP scope undefined
3. [metric-fog] Primary metric unclear

Recommended: shokunin improve docs/prd.md --focus evidence
```

## Dependencies

Requires:
- Document intake agent
- Review spec builder
- Validator router
- 17 focused validators
- Finding quality auditor
- Severity calibrator
- Output guard
