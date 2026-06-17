# Supported Formats

**Input format support for Shokunin Review MVP 1.**

---

## Overview

MVP 1 supports text-based review from multiple formats, with varying levels of support.

---

## Format Support Levels

### Full Support

**Definition**: Reliable text extraction, full review capability.

**Formats**:
- `.md` — Markdown
- `.txt` — Plain text

**Behavior**:
- Full artifact text available
- All sections accessible
- Line-level referencing possible
- Best review experience

---

### Best-Effort Support

**Definition**: Text extraction attempted, but may be incomplete.

**Formats**:
- `.docx` — Microsoft Word
- `.pdf` — PDF documents
- `.pptx` — PowerPoint presentations

**Behavior**:
- Text extraction attempted
- May lose formatting
- Structure may not be preserved
- Images/diagrams skipped
- Review based on extracted text only

**Limitations**:
- Tables may not extract correctly
- Headers/footers may be lost
- Layout information lost
- Embedded images/diagrams skipped
- Complex formatting may not preserve

---

### Not Supported

**Definition**: Review not available or extremely limited.

**Formats**:
- Image-only files (`.png`, `.jpg`, `.gif`)
- Video files (`.mp4`, `.mov`, `.avi`)
- Audio files (`.mp3`, `.wav`)
- Spreadsheets (`.xlsx`, `.csv`)
- Databases
- Code repositories
- Whiteboard files (`.fig`, `.miro`)
- Raw binary files

**Behavior**:
- Unsupported format message displayed
- Suggestion to export as text
- No review performed

---

## Format-Specific Guidance

### Markdown (`.md`) — Full Support ✅

**Recommended**: Yes

**Why**:
- Native format for Shokunin Review
- Best review experience
- Full structure preservation
- Line-level referencing

**Best Practices**:
- Use clear headings (`##`, `###`)
- Use lists for requirements
- Use code blocks for technical content
- Keep documents < 100KB for best performance

**Example**:

```markdown
# PRD: Food Delivery Tracking

## Problem Statement

Food delivery users cancel 15% of orders due to late delivery.

## Proposed Solution

Real-time ETA prediction using GPS tracking.
```

---

### Plain Text (`.txt`) — Full Support ✅

**Recommended**: Yes

**Why**:
- Full text available
- Simple structure
- Compatible with all tools

**Best Practices**:
- Use clear section headers (ALL CAPS or === underlines)
- Use indentation for structure
- Keep documents < 100KB

**Example**:

```
PROBLEM STATEMENT
Food delivery users cancel 15% of orders due to late delivery.

PROPOSED SOLUTION
Real-time ETA prediction using GPS tracking.
```

---

### DOCX (`.docx`) — Best-Effort 🔄

**Recommended**: Export as Markdown if possible

**Why Best-Effort**:
- Text extraction may lose structure
- Tables may not preserve formatting
- Headers/footers may be lost
- Images/diagrams skipped

**If You Must Use DOCX**:
- Use simple formatting
- Avoid complex tables
- Avoid embedded images/diagrams
- Use styles for headers (not manual formatting)

**Known Limitations**:
- Nested lists may flatten
- Table structure may be lost
- Footnotes/endnotes may be lost
- Track changes may confuse extraction

**Better Alternative**:
Export from Word as Markdown or plain text.

---

### PDF (`.pdf`) — Best-Effort 🔄

**Recommended**: Export as Markdown if possible

**Why Best-Effort**:
- PDF structure varies widely
- Multi-column PDFs may extract incorrectly
- Tables may not preserve structure
- Images/diagrams not analyzed
- Scanned PDFs require OCR (not implemented)

**If You Must Use PDF**:
- Use text-based PDFs (not scanned)
- Use single-column layout
- Avoid complex tables
- Avoid watermarks/headers

**Known Limitations**:
- Multi-column layouts may extract poorly
- Tables may lose structure
- Headers/footers may repeat in extraction
- Scanned PDFs not supported (MVP 1)

**Better Alternative**:
Export from PDF tool as Markdown or plain text.

---

### PPTX (`.pptx`) — Best-Effort 🔄

**Recommended**: Export as Markdown if possible

**Why Best-Effort**:
- Only slide text extracted
- Speaker notes may extract
- Design/layout not analyzed
- Images/diagrams on slides not analyzed

**If You Must Use PPTX**:
- Put content in text, not images
- Use speaker notes for detail
- Avoid text in images
- Use clear titles

**Known Limitations**:
- Slide layout not analyzed
- Text in images not extracted
- Graphs/charts not analyzed
- Animations ignored
- Design quality not assessed

**Better Alternative**:
Export speaker notes or slide text as Markdown.

---

## Format Recommendations

### For Best Results

1. **Use Markdown** (`.md`) when possible
2. **Use Plain Text** (`.txt`) if Markdown not available
3. **Export from DOCX/PDF/PPTX** to Markdown before review
4. **Keep documents under 100KB** for best performance

### When to Use Each Format

**Use Markdown (`.md`)**:
- Writing new documents
- Editing existing documents
- Best review experience
- Version control (Git)

**Use Plain Text (`.txt`)**:
- Simple documents
- Compatibility requirements
- No formatting needed

**Use DOCX/PDF/PPTX** (with export):
- Reviewing existing documents
- Stakeholder documents in original format
- Export to Markdown before review for best results

---

## Export Guidance

### Exporting from Word to Markdown

**Word → Markdown**:

1. **Method 1**: Pandoc (recommended)
   ```bash
   pandoc input.docx -t markdown -o output.md
   ```

2. **Method 2**: Copy-paste
   - Copy from Word
   - Paste into Markdown editor
   - Fix formatting

3. **Method 3**: Word plugins
   - Use Markdown plugin for Word
   - Export as Markdown

**Post-Export Cleanup**:
- Fix list formatting
- Restore heading levels
- Fix table structure
- Remove Word artifacts (===, page breaks)

---

### Exporting from PDF to Markdown

**PDF → Markdown**:

1. **Method 1**: Pandoc (for text-based PDFs)
   ```bash
   pandoc input.pdf -t markdown -o output.md
   ```

2. **Method 2**: PDF to Text
   - Use PDF text export
   - Save as `.txt`
   - Convert to Markdown

3. **Method 3**: Manual copy-paste
   - Copy from PDF
   - Paste into Markdown editor
   - Fix formatting

**Post-Export Cleanup**:
- Remove page numbers/headers
- Fix column extraction (if multi-column)
- Restore table structure
- Remove PDF artifacts

---

### Exporting from PPTX to Markdown

**PPTX → Markdown**:

1. **Method 1**: Export speaker notes
   - File → Export → Speaker Notes
   - Save as `.txt`
   - Convert to Markdown

2. **Method 2**: Copy-paste slide text
   - Copy from each slide
   - Paste into Markdown editor
   - Organize by slide

3. **Method 3**: Pandoc (for text extraction)
   ```bash
   pandoc input.pptx -t markdown -o output.md
   ```

**Post-Export Cleanup**:
- Organize by slide/section
- Add structure (headings)
- Remove slide artifacts
- Restore context

---

## File Size Guidelines

### Recommended Sizes

- **Small**: < 50KB — Fast, full quality
- **Medium**: 50KB - 100KB — Normal, full quality
- **Large**: 100KB - 500KB — May be slower, quality OK
- **Very Large**: 500KB - 1MB — May be truncated, quality reduced
- **Too Large**: > 1MB — Not supported (MVP 1)

### If Your Document Is Too Large

**Split into multiple files**:
- By section (Problem, Solution, Requirements)
- By phase (Phase 1, Phase 2, Phase 3)
- By topic (Technical, Business, Operations)

**Review separately**:
- Review each part independently
- Combine findings manually
- Or create summary document for review

---

## Character Encoding

### Recommended Encoding

- **UTF-8** — Recommended (universal)
- **ASCII** — Supported (limited to English characters)
- **UTF-16, UTF-32** — May work, but not recommended

### Encoding Issues

**Symptoms**:
- Garbled text
- Question marks (???)
- Missing characters

**Fix**:
- Ensure UTF-8 encoding
- Convert to UTF-8 if needed
- Use text editor with encoding support

---

## Line Endings

### Supported Line Endings

- **LF (`\n`)** — Unix/Linux/macOS (recommended)
- **CRLF (`\r\n`)** — Windows (supported)

### Line Ending Issues

**Symptoms**:
- Single very long line
- Lines don't break properly

**Fix**:
- Convert to LF (Unix style)
- Use text editor with line ending support

---

## What Gets Reviewed

### Reviewed Content

- ✅ All text content
- ✅ Headings and structure
- ✅ Lists (bulleted, numbered)
- ✅ Code blocks
- ✅ Tables (text content)
- ✅ Links and references

### Not Reviewed (MVP 1)

- ❌ Images
- ❌ Diagrams (unless text described)
- ❌ Screenshots
- ❌ Charts/graphs (unless text extracted)
- ❌ Slide design/layout
- ❌ Visual formatting
- ❌ Colors
- ❌ Fonts
- ❌ Animations

---

## Format-Specific Limitations

### DOCX Limitations

- Complex tables may flatten
- Nested lists may lose structure
- Track changes may confuse extraction
- Embedded images not analyzed
- Headers/footers may be lost

### PDF Limitations

- Multi-column layouts may extract poorly
- Scanned PDFs not supported (no OCR in MVP 1)
- Password-protected PDFs not supported
- Forms/fields not analyzed
- Annotations not analyzed

### PPTX Limitations

- Slide layout not analyzed
- Design quality not assessed
- Text in images not extracted
- Charts/graphs not analyzed
- Animations/transitions ignored
- Slide notes may extract (inconsistent)

---

## Unsupported Format Behavior

### When Format Is Unsupported

**Message**:

```
Unsupported or limited input format.

MVP 1 can review extracted text from:
- Markdown
- Plain text
- Docs (.docx)
- PDFs (.pdf)
- Presentations (.pptx)

But MVP 1 does not analyze:
- Image-only content
- Complex diagrams
- Embedded screenshots
- Charts without extracted text
- Slide visual design

Recommended action:
Export the document as Markdown or plain text and run:

shokunin review exported-document.md
```

**Options**:

1. Export as Markdown/Plain text
2. Choose artifact type manually (`--type`)
3. Use generic draft review

---

## Best Practices

### For Document Authors

1. **Use Markdown** when possible
2. **Keep documents < 100KB**
3. **Use clear structure** (headings, lists)
4. **Avoid embedded images** for key content
5. **Test review** before stakeholder review

### For Document Reviewers

1. **Check format** before review
2. **Export if needed** before review
3. **Verify extraction quality** for DOCX/PDF/PPTX
4. **Report extraction issues** if found

---

## Summary

### Full Support (Best Experience)

- ✅ Markdown (`.md`)
- ✅ Plain text (`.txt`)

### Best-Effort (May Work)

- 🔄 DOCX (`.docx`)
- 🔄 PDF (`.pdf`)
- 🔄 PPTX (`.pptx`)

### Not Supported (MVP 1)

- ❌ Images
- ❌ Videos
- ❌ Audio
- ❌ Spreadsheets
- ❌ Databases

### Recommendation

**Use Markdown or Plain Text for best results.**

**Export from DOCX/PDF/PPTX to Markdown before review.**

**Keep documents under 100KB for optimal performance.**

---

**docs/document-requirements/supported-formats.md explains format support.**

**Choose the right format for best review experience.**
