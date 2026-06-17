# Unsupported Artifact Flow

**Unknown artifact type handling scenario.**

---

## User Context

**User**: Has document that doesn't fit standard types
**Document**: `docs/executive-memo.md`
**Goal**: Get review

---

## Command

```bash
shokunin review docs/executive-memo.md
```

---

## Output

```
⚠️ Unsupported or unknown artifact type.

I could not confidently classify this artifact as:
- PRD (Product Requirements)
- RFC (Technical Design)
- Experiment Plan
- Product Strategy

Classification: UNKNOWN
Confidence: Low

You can:
1. Choose artifact type manually:
   shokunin review docs/executive-memo.md --type prd

2. Run generic draft review:
   shokunin review docs/executive-memo.md --mode draft

3. Wait for future artifact support:
   (Executive memo support planned for MVP 3)
```

---

## Option 1: Force Type

```bash
# Treat as PRD
shokunin review docs/executive-memo.md --type prd

# Treat as Strategy
shokunin review docs/executive-memo.md --type strategy
```

**When to use**:
- Document is close to a standard type
- You know which type fits best

---

## Option 2: Draft Mode

```bash
shokunin review docs/executive-memo.md --mode draft
```

**What draft mode does**:
- Adjusted expectations for draft documents
- Focus on structure and clarity
- Lenient scoring on completeness
- Still provides useful feedback

**When to use**:
- Document is in early stages
- Not sure which type it is
- Want general feedback

---

## Supported vs Unsupported

### Supported (MVP 1)

- ✅ PRD
- ✅ RFC / Technical Design
- ✅ Experiment Plan
- ✅ Product Strategy

### Not Supported (MVP 1)

- ❌ Executive memo
- ❌ ADR (Architecture Decision Record)
- ❌ Research paper
- ❌ Legal document
- ❌ Compliance document
- ❌ Marketing brief
- ❌ Sales proposal
- ❌ Project plan
- ❌ User story
- ❌ Post-mortem
- ❌ Runbook

### Planned (MVP 3)

- 📋 Executive memo
- 📋 ADR
- 📋 Architecture note

---

## Classification Confidence

### High Confidence

Clear signals:
- "Problem Statement" → PRD
- "Technical Proposal" → RFC
- "Hypothesis" → Experiment Plan
- "Strategic Thesis" → Product Strategy

### Medium Confidence

Mixed signals:
- Some structure present
- Content ambiguous
- Multiple type indicators

### Low Confidence

Weak or conflicting signals:
- No clear structure
- Content doesn't match types
- Generic document

---

**docs/scenarios/unsupported-artifact-flow.md — Handling unknown artifact types.**
