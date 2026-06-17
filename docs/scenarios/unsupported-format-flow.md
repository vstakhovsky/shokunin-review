# Unsupported Format Flow

**Unsupported format handling scenario.**

---

## User Context

**User**: Has document in unsupported format
**Document**: `presentation.pptx`
**Goal**: Get review

---

## Command

```bash
shokunin review presentation.pptx
```

---

## Output

```
⚠️ Unsupported or limited input format.

MVP 1 can review extracted text from:
- Markdown (.md)
- Plain text (.txt)
- Docs (.docx) - best-effort
- PDFs (.pdf) - best-effort
- Presentations (.pptx) - best-effort

But MVP 1 does not analyze:
- Image-only content
- Complex diagrams
- Embedded screenshots
- Charts without extracted text
- Slide visual design

Recommended action:
Export as Markdown or plain text, then:

shokunin review exported-document.md

Or try PPTX extraction (best-effort):
shokunin review presentation.pptx
```

---

## What Happens with PPTX

### Best-Effort Extraction

```
📖 Reading artifact...
⚠️ PPTX text extraction (best-effort)
⚠️ Images/diagrams will be skipped
⚠️ Slide design not analyzed
🔍 Classifying...
```

**What Gets Reviewed**:
- Slide titles
- Bullet text
- Speaker notes (if present)

**What Gets Skipped**:
- Images
- Charts/graphs
- Diagrams
- Slide layout
- Design quality

---

## Better Alternative

### Export PPTX to Markdown

**Method 1**: PowerPoint export
1. File → Export → Create Handouts
2. Save as text
3. Convert to Markdown

**Method 2**: Copy-paste
1. Copy text from slides
2. Paste into Markdown editor
3. Add structure

**Method 3**: Pandoc
```bash
pandoc presentation.pptx -t markdown -o exported.md
shokunin review exported.md
```

---

## When to Use Each Format

### PPTX When

- You have speaker notes with detail
- Text is on slides (not in images)
- Quick review needed
- Visual design not important

### Export When

- You need full review
- Structure matters
- Diagrams contain text
- You want accurate results

---

## Format Support Summary

| Format | Support | When to Use |
|--------|---------|-------------|
| `.md` | ✅ Full | Always preferred |
| `.txt` | ✅ Full | Simple documents |
| `.docx` | 🔄 Best-effort | Export first if possible |
| `.pdf` | 🔄 Best-effort | Export first if possible |
| `.pptx` | 🔄 Best-effort | Export first if possible |
| Images | ❌ No | Export text first |
| Spreadsheets | ❌ No | Export text first |

---

**docs/scenarios/unsupported-format-flow.md — Handling unsupported formats.**
