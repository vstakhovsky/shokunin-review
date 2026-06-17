# Limitations

**Known limitations of Shokunin Review MVP 1.**

---

## Overview

This document documents the known limitations of MVP 1 to set clear expectations and prevent misunderstanding.

---

## Core Limitations

### 1. Text-Based Review Only

**Limitation**: MVP 1 reviews extracted text only.

**What this means**:
- No visual layout analysis
- No embedded image analysis
- No screenshot analysis
- No complex diagram analysis
- No chart analysis (without extracted text)
- No slide design analysis

**Workaround**: Export documents as Markdown or plain text.

**Future**: Diagram support planned for MVP 4.

---

### 2. Limited Format Support

**Limitation**: DOCX, PDF, PPTX support is best-effort only.

**What this means**:
- Text extraction may be incomplete
- Formatting may be lost
- Structure may not be preserved
- Tables may not extract correctly
- Images/diagrams are skipped

**Workaround**: Export as Markdown or plain text for best results.

**Future**: Improved extraction planned for MVP 3-4.

---

### 3. No Visual Diagram Analysis

**Limitation**: MVP 1 cannot analyze image-only diagrams.

**What this means**:
- Architecture diagrams (images) are not analyzed
- Flowcharts (images) are not analyzed
- Wireframes (images) are not analyzed
- Screenshots are not analyzed

**Workaround**: Include text descriptions of diagrams in documents.

**Future**: Image-based diagram review planned for MVP 4.

---

### 4. No Spreadsheet Validation

**Limitation**: MVP 1 cannot validate spreadsheet models.

**What this means**:
- Financial models in spreadsheets are not validated
- Unit economics calculations are not checked
- Formula logic is not verified
- Data integrity is not checked

**Workaround**: Extract key assumptions and logic into text form.

**Future**: Spreadsheet validation not planned.

---

### 5. No Market Data Verification

**Limitation**: MVP 1 cannot verify external market data.

**What this means**:
- Market size claims are not fact-checked
- Competitor claims are not verified
- Industry trends are not validated
- Financial projections are not audited

**Workaround**: Provide sources and citations for market claims.

**Future**: Market research agents not planned for MVP 1-5.

---

### 6. No Legal/Compliance Certification

**Limitation**: MVP 1 does not provide legal or compliance review.

**What this means**:
- No legal compliance checking
- No regulatory review
- No privacy compliance checking
- No IP review
- No contract review

**Workaround**: Consult legal/compliance teams for these needs.

**Future**: Legal/compliance support not planned.

---

### 7. No Automatic Full Rewrite

**Limitation**: MVP 1 does not rewrite full documents by default.

**What this means**:
- Default behavior is review-first
- Full rewrites require explicit user request
- Improve mode suggests, not rewrites

**Workaround**: Use `shokunin improve` for suggestions, apply manually.

**Future**: Interactive improvement mode planned for MVP 2.

---

### 8. Terminal-First Only (No Web UI)

**Limitation**: MVP 1 has no web UI.

**What this means**:
- No browser interface
- No visual dashboards
- No web-based sharing
- Terminal-only experience

**Workaround**: Use terminal or integrate with existing tools.

**Future**: Optional web UI planned for MVP 5.

---

### 9. No Persistent Memory

**Limitation**: MVP 1 has no persistent memory.

**What this means**:
- No learning from past reviews
- No user preference storage
- No review history
- Each review is independent

**Workaround**: Save outputs manually if needed.

**Future**: Optional persistent memory planned for MVP 5.

---

### 10. No MCP Server

**Limitation**: MVP 1 has no MCP server.

**What this means**:
- No external tool integration
- No plugin system
- No API for other tools
- Standalone operation only

**Workaround**: Use CLI or Claude Code integration.

**Future**: MCP server planned for MVP 5.

---

## Artifact Type Limitations

### PRD Limitations

- Limited to product/business documents
- Cannot validate technical feasibility deeply
- Cannot verify market assumptions
- Cannot validate financial models

### RFC Limitations

- Limited to technical design documents
- Cannot validate against implementation (code)
- Cannot check actual system performance
- Cannot verify deployment feasibility

### Experiment Plan Limitations

- Limited to pre-launch review
- Cannot validate experimental design statistically
- Cannot verify instrumentation is working
- Cannot check actual data quality

### Product Strategy Limitations

- Limited to strategic documents
- Cannot validate market opportunity
- Cannot verify competitive landscape
- Cannot validate financial assumptions

---

## Technical Limitations

### Model Dependency

**Limitation**: Quality depends on underlying model.

**What this means**:
- Output may vary between models
- Model biases may affect results
- Model knowledge cutoff applies
- Model limitations apply

**Workaround**: Use recommended models for best results.

### Context Window

**Limitation**: Large documents may exceed model context.

**What this means**:
- Documents over ~100K tokens may be truncated
- Very long documents may not process correctly
- Context may be lost in very long documents

**Workaround**: Split large documents into smaller files.

### False Positives/Negatives

**Limitation**: Review may produce false positives or negatives.

**What this means**:
- May flag non-issues as issues (false positive)
- May miss real issues (false negative)
- Score may not always reflect true quality

**Workaround**: Review findings with human judgment.

---

## Security Limitations

### No Guaranteed Privacy

**Limitation**: Privacy depends on user's setup.

**What this means**:
- If using cloud models, data may leave your machine
- Local processing not guaranteed by default
- Trace files may contain artifacts if enabled

**Workaround**: Use `--local-only --no-trace` for sensitive docs.

### No Enterprise Security

**Limitation**: MVP 1 has no enterprise security features.

**What this means**:
- No SSO integration
- No RBAC
- No audit logging
- No encryption at rest
- No key management

**Workaround**: Follow security guidance in SECURITY.md.

---

## Usability Limitations

### Learning Curve

**Limitation**: Users must learn CLI and review concepts.

**What this means**:
- Terminal experience helpful
- Understanding of artifact types required
- Score interpretation requires familiarity
- Finding categories require understanding

**Workaround**: Read docs and run examples to learn.

### English Only

**Limitation**: MVP 1 supports English only.

**What this means**:
- No multi-language support
- No localization
- No translation
- English documentation assumed

**Workaround**: Use English documents for best results.

**Future**: Multi-language support not planned for MVP 1-5.

---

## Integration Limitations

### Claude Code Primary

**Limitation**: Full support only for Claude Code.

**What this means**:
- Cursor support is best-effort
- Codex support is best-effort
- Other IDEs may not work

**Workaround**: Use Claude Code for best experience.

### No CI Integration (Yet)

**Limitation**: No built-in CI/CD integration.

**What this means**:
- No GitHub Action
- No GitLab CI
- No Jenkins plugin
- Manual CLI usage only

**Workaround**: Use JSON output to build custom integrations.

**Future**: GitHub Action planned for MVP 2.

---

## Output Limitations

### No Guaranteed Correctness

**Limitation**: Findings are suggestions, not guarantees.

**What this means**:
- May suggest incorrect fixes
- May misunderstand context
- May miss critical issues
- Human judgment required

**Workaround**: Always review findings before applying.

### No Legal/Financial Advice

**Limitation**: Output is not legal or financial advice.

**What this means**:
- Cannot replace legal review
- Cannot replace financial review
- Cannot replace compliance review
- Suggestions are technical/product only

**Workaround**: Consult appropriate professionals.

---

## Platform Limitations

### No Mobile Support

**Limitation**: No mobile app or mobile-optimized interface.

**What this means**:
- Terminal experience assumes desktop
- No iOS/Android app
- Mobile web not optimized

**Workaround**: Use on desktop or laptop.

### No Windows Support (Initially)

**Limitation**: Initial focus on macOS/Linux.

**What this means**:
- Windows support may be limited
- WSL may be required
- Terminal differences may apply

**Workaround**: Use WSL or wait for Windows support.

---

## Performance Limitations

### Speed

**Limitation**: Review speed depends on document size and model.

**What this means**:
- Large documents take longer
- Deep mode takes longer
- Model speed varies
- Network latency matters (for cloud models)

**Workaround**: Use fast mode for quicker reviews.

### Resource Usage

**Limitation**: May use significant CPU/memory.

**What this means**:
- Large documents may require more memory
- Model inference may use significant CPU
- Local models require adequate resources

**Workaround**: Ensure adequate system resources.

---

## Future Limitations (Beyond MVP 1-5)

These limitations may persist even after MVP 5:

- No guaranteed correctness of suggestions
- No legal/financial compliance certification
- No replacement for human judgment
- No substitute for domain expertise
- No guarantee of market success

---

## Summary

### Key Limitations

1. **Text-based only** — No visual/diagram analysis
2. **No web UI** — Terminal-first
3. **No persistent memory** — Stateless
4. **No MCP server** — Standalone
5. **No domain packs** — Generic only
6. **No board simulation** — Validation only
7. **No market verification** — Suggestions only
8. **No legal/compliance** — Not certified
9. **Claude Code primary** — Other tools best-effort
10. **English only** — No i18n

### What MVP 1 Does Well

- ✅ Review readiness assessment
- ✅ Blocker identification
- ✅ Score caps for incomplete docs
- ✅ Grounded, actionable findings
- ✅ Non-toxic, respectful feedback
- ✅ Terminal-first UX
- ✅ Fast/deep/draft modes
- ✅ JSON/Markdown output

### When to Use MVP 1

Use MVP 1 when:

- Reviewing PRDs, RFCs, Experiment Plans, or Strategy docs
- Need readiness assessment before stakeholder review
- Want blocker identification
- Prefer terminal-first workflow
- Use Claude Code

### When NOT to Use MVP 1

Don't use MVP 1 when:

- Need visual diagram analysis
- Need spreadsheet validation
- Need legal/compliance certification
- Need market data verification
- Must have web UI
- Need persistent memory

---

## FAQ

### Is Shokunin Review a replacement for human review?

No. Shokunin Review is a pre-review tool. It catches issues before human review, but does not replace human judgment.

### Can Shokunin Review guarantee my document is good?

No. Findings are suggestions, not guarantees. Always review findings before applying.

### Is Shokunin Review suitable for legal documents?

No. MVP 1 does not provide legal review. Consult legal professionals for legal documents.

### Can Shokunin Review verify market claims?

No. MVP 1 cannot verify external market data. It can only check if claims are supported with evidence.

### Is Shokunin Review secure for confidential documents?

With `--local-only --no-trace`, it's safer than many alternatives, but no system is completely safe. Anonymize sensitive content.

---

**docs/limitations.md sets clear expectations for MVP 1.**

**Understanding limitations prevents disappointment and misuse.**
