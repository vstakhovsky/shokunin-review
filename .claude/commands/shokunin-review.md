# Shokunin Review

Review documents for readiness before stakeholder review.

## When to Use

Use this command when you have a document that needs review before stakeholder review, leadership review, or implementation decision.

## How It Works

1. Reads the artifact
2. Detects format and artifact type
3. Builds review spec
4. Routes relevant validators
5. Runs checks and generates findings
6. Calculates readiness score
7. Provides verdict and next actions

## Usage

```bash
shokunin review <file>
```

## Options

```bash
# Specific artifact type
shokunin review <file> --type prd|rfc|experiment|strategy

# Review mode
shokunin review <file> --mode fast|deep|draft

# Output options
shokunin review <file> --full
shokunin review <file> --json
shokunin review <file> --quiet
shokunin review <file> --no-color

# Security options
shokunin review <file> --local-only
shokunin review <file> --no-trace

# Mascot options
shokunin review <file> --mascot ascii|pixel|off
```

## Output

Default output includes:
- Verdict (emoji + text)
- Readiness score (0-100)
- Score confidence
- Top blockers (max 3)
- Score caps applied
- Recommended next action
- Suggested command

## Score Bands

- 90-100: Review-ready
- 75-89: Ready with minor fixes
- 60-74: Needs major fixes
- 40-59: Needs revision
- 0-39: Not review-ready

## Supported Formats

- `.md` — Markdown (full support)
- `.txt` — Plain text (full support)
- `.docx` — Best-effort text extraction
- `.pdf` — Best-effort text extraction
- `.pptx` — Best-effort text extraction

## Supported Artifact Types

- PRD — Product Requirements documents
- RFC — Technical Design documents
- Experiment Plan — Pre-A/B-test decision documents
- Product Strategy — Strategic choice documents

## Example

```bash
shokunin review docs/prd.md
```

Output:
```
🔴 Not review-ready — 36/100
Confidence: Medium

Top blockers:
1. [evidence-gap] Problem is not quantified.
2. [missing-decision] MVP scope is not defined.
3. [metric-fog] Primary metric unclear.

Recommended next action:
shokunin improve docs/prd.md --focus evidence
```

## See Also

- `shokunin-improve` — Suggest improvements
- `shokunin-rerun` — Re-review and compare
- `shokunin-score` — Explain score breakdown
