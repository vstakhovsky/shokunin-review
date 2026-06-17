# MVP 1 Scope

**What Shokunin Review MVP 1 supports and explicitly excludes.**

---

## Overview

MVP 1 is focused on **text-based review readiness** for four artifact types.

This document defines the boundaries of MVP 1 to prevent scope creep and ensure quality.

---

## What MVP 1 Supports

### Artifact Types (4 only)

MVP 1 supports exactly four artifact types:

1. **PRD** — Product Requirements documents
2. **RFC** — Technical Design documents
3. **Experiment Plan** — Pre-A/B-test decision documents
4. **Product Strategy** — Strategic choice documents

**No other artifact types are supported in MVP 1.**

### Input Formats (5 supported)

MVP 1 supports text-based review from:

1. `.md` — Markdown files
2. `.txt` — Plain text files
3. `.docx` — Text extracted from documents (best-effort)
4. `.pdf` — Text extracted from PDFs (best-effort)
5. `.pptx` — Text extracted from presentations (best-effort)

### Extraction Quality

- **Markdown / Plain text** — Full support
- **DOCX** — Best-effort (text extraction only)
- **PDF** — Best-effort (text extraction only)
- **PPTX** — Best-effort (text extraction only)

If extraction is unreliable, users are advised to export as Markdown or plain text.

### Output Modes (5 modes)

MVP 1 supports five output modes:

1. **Default** — Short, verdict + score + blockers
2. **Full** — All findings, detailed report
3. **JSON** — Structured, automation-friendly
4. **Markdown** — Human-readable report
5. **Quiet** — Minimal output

### Review Modes (3 modes)

MVP 1 supports three review modes:

1. **Fast** — Reduced validator budget, critical validators only
2. **Deep** — Full validator budget, all applicable validators
3. **Draft** — Adjusted expectations for draft state

### Commands (5 commands)

MVP 1 supports five CLI commands:

```bash
shokunin review <file>              # Review a document
shokunin improve <file>             # Suggest improvements
shokunin rerun <file> --compare <original-file>  # Re-review and compare
shokunin score <file>               # Show readiness score breakdown
shokunin eval                       # Run eval harness
```

### Validators (17 focused validators)

MVP 1 includes 17 validators, not 25+:

- **decision-reviewer** — Checks decision clarity
- **evidence-reviewer** — Checks evidence quality
- **metric-reviewer** — Checks metric quality
- **requirement-reviewer** — Checks requirement quality
- **technical-feasibility-reviewer** — Checks technical approach
- **strategy-reviewer** — Checks strategic clarity
- **opportunity-sizing-reviewer** — Checks opportunity sizing
- **simpler-alternative-reviewer** — Checks for simpler alternatives
- **ai-safety-guardrails-reviewer** — Checks AI guardrails
- **cost-roi-sanity-reviewer** — Checks cost/ROI logic
- Plus 7 supporting validators (orchestrator, intake, router, auditor, etc.)

**No additional validators in MVP 1.**

### Skills (5 skills)

MVP 1 includes 5 skills:

- **shokunin-review** — Main review skill
- **shokunin-score** — Score explanation skill
- **shokunin-gherkin** — Gherkin/acceptance criteria skill
- **shokunin-strategy** — Strategy review skill
- **shokunin-verify** — Verification skill

**No additional skills in MVP 1.**

### Score Bands (5 bands)

MVP 1 uses 5 score bands:

| Score | Band |
|-------|------|
| 90–100 | Review-ready |
| 75–89 | Ready with minor fixes |
| 60–74 | Needs major fixes |
| 40–59 | Needs revision |
| 0–39 | Not review-ready |

### Score Caps (11 caps)

MVP 1 includes 11 score caps:

- No problem evidence → max score 60
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

### Finding Tags (20 tags)

MVP 1 uses 20 finding tags:

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

### Terminal UX

MVP 1 includes:

- Mascot with 12 states
- Color-coded statuses
- Progress indicators
- Short default output
- `--full` for detailed output
- `--quiet` for minimal output
- `--no-color` for accessibility
- `--no-animation` for accessibility

### Compatibility

**Primary target**:
- ✅ Claude Code (full support)

**Best-effort**:
- 🔄 Cursor (best-effort)
- 🔄 Codex CLI (best-effort)
- 🔄 Gemini CLI (best-effort)

### Eval Coverage

MVP 1 includes 12 evals:

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

---

## What MVP 1 Does NOT Include

### Artifact Types NOT Supported

MVP 1 does **not** support:

- ❌ ADR (Architecture Decision Records)
- ❌ Executive memos
- ❌ Architecture notes
- ❌ ML / DS feature documents
- ❌ Research papers
- ❌ Legal documents
- ❌ Compliance documents

### Formats NOT Supported

MVP 1 does **not** deeply analyze:

- ❌ Image-only content
- ❌ Complex diagrams
- ❌ Screenshots
- ❌ Video
- ❌ Audio
- ❌ Spreadsheets

### Features NOT Included

MVP 1 does **not** include:

- ❌ Web UI
- ❌ Persistent memory
- ❌ MCP server
- ❌ Board simulation
- ❌ Market research agents
- ❌ Domain packs
- ❌ Visual diagram analysis

---

## MVP 1 Boundaries

### Strict Boundaries

1. **4 artifact types only**
2. **17 validators only**
3. **5 skills only**
4. **Text-based only**
5. **Terminal-first**
6. **No persistent memory**
7. **No MCP server**
8. **No domain packs**
9. **No board simulation**

### Why These Boundaries?

1. **Focus** — Limited scope ensures quality
2. **Velocity** — Smaller scope ships faster
3. **Quality** — Eval coverage for every feature
4. **Clarity** — Clear value proposition
5. **Maintainability** — Smaller codebase

---

## Success Criteria

MVP 1 is successful when:

- ✅ All 12 evals pass
- ✅ All 4 artifact types supported
- ✅ Terminal UX working
- ✅ Examples working
- ✅ Documentation complete
- ✅ No scope creep

---

**docs/mvp-scope.md defines MVP 1 boundaries.**
