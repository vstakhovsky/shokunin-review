# ROADMAP.md

**Shokunin Review development roadmap.**

---

## Overview

Shokunin Review is developed in phases (MVP 1-5), each adding specific capabilities while maintaining focus on review readiness and terminal-first UX.

---

## MVP 1 — Review Readiness Foundation

**Status**: ✅ In Development

**Release Target**: 2026 Q2

### What MVP 1 Includes

MVP 1 supports **text-based review readiness** for four artifact types:

1. **PRD** — Product Requirements documents
2. **RFC** — Technical Design documents
3. **Experiment Plan** — Pre-A/B-test decision documents
4. **Product Strategy** — Strategic choice documents

### MVP 1 Features

- ✅ Terminal-first review UX
- ✅ Readiness Score (0-100)
- ✅ Score confidence
- ✅ Score caps
- ✅ 17 focused validators (not personas)
- ✅ Finding quality audit
- ✅ JSON / Markdown output
- ✅ Eval harness
- ✅ Before/after examples
- ✅ Security guidance
- ✅ Configurable mascot states
- ✅ CLI skeleton (TypeScript)

### MVP 1 Commands

```bash
shokunin review <file>              # Review a document
shokunin improve <file>             # Suggest improvements
shokunin rerun <file> --compare <original-file>  # Re-review and compare
shokunin score <file>               # Show readiness score breakdown
shokunin eval                       # Run eval harness
```

### MVP 1 Artifact Types

- ✅ PRD (all common types)
- ✅ RFC / Technical Design (all common types)
- ✅ Experiment Plan (all common types)
- ✅ Product Strategy (all common types)

### MVP 1 Output Modes

- ✅ Default (short, verdict + score + blockers)
- ✅ Full (all findings, detailed)
- ✅ JSON (structured, automation)
- ✅ Markdown (human-readable report)
- ✅ Quiet (minimal output)

### MVP 1 Documentation

- ✅ README.md (comprehensive landing page)
- ✅ DESIGN.md (terminal UX, mascot, design system)
- ✅ FUNCTIONAL_REQUIREMENTS.md (FR-1 through FR-12)
- ✅ NON_FUNCTIONAL_REQUIREMENTS.md (reliability, usability, safety)
- ✅ SECURITY.md (security requirements and warnings)
- ✅ docs/mvp-scope.md (what MVP 1 supports/excludes)
- ✅ docs/limitations.md (known limitations)
- ✅ docs/anti-overengineering.md (guardrails)
- ✅ docs/compatibility.md (Claude Code, Cursor, Codex)
- ✅ docs/catalog.md (commands, skills, agents, hooks, evals)

### What MVP 1 Does NOT Include

- ❌ Web UI
- ❌ Persistent memory
- ❌ MCP server
- ❌ Board simulation
- ❌ Domain packs
- ❌ Visual diagram analysis
- ❌ Spreadsheet model validation
- ❌ Full market research validation
- ❌ Legal/compliance certification
- ❌ Automatic full document rewrite by default
- ❌ Production data verification
- ❌ Market research agents

---

## MVP 2 — Richer Improvement & CI Integration

**Status**: 🔄 Planned

**Release Target**: 2026 Q3

### What MVP 2 Adds

- Richer section-level patch suggestions
- Interactive Q&A improvement mode
- GitHub PR comment export
- Basic secret redaction
- More evals
- Improved CLI error handling
- Better performance (caching, parallelization)

### MVP 2 New Commands

```bash
shokunin patch <file>              # Generate section-level patches
shokunin qa <file>                  # Interactive Q&A improvement mode
shokunin export-pr <file>           # Export for GitHub PR
shokunin redact <file>              # Redact secrets
```

### MVP 2 Features

- Section-level patch suggestions
- Interactive improvement workflow
- GitHub PR integration
- Secret detection and redaction
- Performance improvements
- Better error messages
- More comprehensive evals

---

## MVP 3 — More Artifact Types & Presentation Support

**Status**: 📋 Planned

**Release Target**: 2026 Q4

### What MVP 3 Adds

- ADR (Architecture Decision Record) review
- Executive memo review
- Architecture note review
- ML / DS feature doc review
- Presentation text exports (PPTX speaker notes)

### MVP 3 New Artifact Types

- ADR
- Executive memo
- Architecture notes
- ML / DS feature documents
- Presentations (text extraction)

### MVP 3 Features

- New artifact type support
- Better text extraction from presentations
- Improved ML/DS document validation
- New validators for executive communication

---

## MVP 4 — Diagram & Visual Support

**Status**: 📋 Planned

**Release Target**: 2027 Q1

### What MVP 4 Adds

- Mermaid / PlantUML review
- Excalidraw JSON review
- PDF structure extraction
- PPTX speaker notes and slide text extraction
- Image-based architecture diagram review

### MVP 4 Features

- Diagram text review
- Better PDF parsing
- Better presentation parsing
- Basic image-based diagram review (OCR + analysis)

---

## MVP 5 — Domain Packs & Advanced Features

**Status**: 📋 Planned

**Release Target**: 2027 Q2

### What MVP 5 Adds

- Domain packs for specialized industries
- MCP server support
- Persistent memory (optional)
- Web UI (optional)

### MVP 5 Domain Packs

- AI product pack
- Fintech / risk pack
- Marketplace pack
- Internal platform pack
- ML systems pack
- Ecommerce pack

### MVP 5 Features

- Domain-specific validators
- Domain-specific score caps
- Domain-specific terminology
- Domain-specific examples
- MCP server for integration
- Optional persistent memory
- Optional web UI

---

## Future Beyond MVP 5

### Potential Features

- Board simulation (CEO, CPO, CTO perspectives)
- Market research agents
- Full market data validation
- Legal/compliance certification
- Spreadsheet model validation
- Advanced secret redaction
- Enterprise features (SSO, RBAC, audit logs)
- Cloud deployment options
- Multi-language support

### Not Prioritized

These features are not currently prioritized:

- Video analysis
- Audio analysis
- Real-time collaboration
- Mobile app
- Browser extension

---

## MVP Boundaries

### MVP 1 Boundaries

- **4 artifact types only** — No expansion until MVP 2
- **Text-based only** — No visual/diagram analysis until MVP 4
- **Terminal-first** — No web UI until MVP 5 (optional)
- **No persistent memory** — Stateless review only
- **No MCP server** — Until MVP 5
- **No domain packs** — Until MVP 5
- **17 validators only** — Not 25+
- **No board simulation** — Not in MVP 1-5
- **No market research agents** — Not in MVP 1-5

### Why These Boundaries?

1. **Focus** — Limited scope ensures quality
2. **Velocity** — Smaller scope ships faster
3. **Quality** — Eval coverage for every feature
4. **Clarity** — Clear value proposition
5. **Maintainability** — Smaller codebase is easier to maintain

---

## Release Process

### Pre-Release Checklist

Before each MVP release:

- ✅ All evals passing
- ✅ Golden outputs match
- ✅ Documentation complete
- ✅ README updated
- ✅ SECURITY.md updated
- ✅ ROADMAP.md updated
- ✅ CHANGELOG.md updated
- ✅ Examples tested
- ✅ CLI tested
- ✅ Installation tested
- ✅ Terminology check passes
- ✅ Security review done

### Versioning

- MVP 1: v0.1.x
- MVP 2: v0.2.x
- MVP 3: v0.3.x
- MVP 4: v0.4.x
- MVP 5: v0.5.x

### v1.0 Criteria

v1.0 requires:

- All MVP 1-5 features complete
- Stable APIs
- Comprehensive evals
- Production-ready security
- Comprehensive documentation
- Active community

---

## Current Status

### MVP 1 (Current Phase)

**Progress**: 🔄 In Development

**Completed**:
- ✅ README.md
- ✅ DESIGN.md
- ✅ FUNCTIONAL_REQUIREMENTS.md
- ✅ NON_FUNCTIONAL_REQUIREMENTS.md
- ✅ SECURITY.md

**In Progress**:
- 🔄 ROADMAP.md
- 🔄 docs/mvp-scope.md
- 🔄 docs/limitations.md
- 🔄 docs/anti-overengineering.md
- 🔄 docs/compatibility.md
- 🔄 docs/catalog.md

**Not Started**:
- 📋 Pass 2: Document requirements & scenarios
- 📋 Pass 3: Claude Code assets
- 📋 Pass 4: Harness & evals
- 📋 Pass 5: CLI skeleton

---

## Dependencies

### MVP 1 Dependencies

- Node.js (for CLI)
- TypeScript (for CLI)
- Claude Code (primary target)
- Model API (Anthropic Claude or compatible)

### MVP 2 Dependencies

- MVP 1 complete
- GitHub CLI (for PR export)
- Secret detection library

### MVP 3 Dependencies

- MVP 2 complete
- PDF parsing library
- Presentation parsing library

### MVP 4 Dependencies

- MVP 3 complete
- Diagram parsing library
- OCR library

### MVP 5 Dependencies

- MVP 4 complete
- Database (for persistent memory, optional)
- MCP server library
- Web framework (for web UI, optional)

---

## Risks & Mitigations

### Risk: Scope Creep

**Mitigation**:
- Strict MVP boundaries
- Explicit "not in MVP 1" sections
- Anti-overengineering doc
- Regular roadmap reviews

### Risk: Overengineering

**Mitigation**:
- Limited validator count (17, not 25+)
- Short default output
- No board simulation in MVP 1-5
- Eval-driven development

### Risk: Toxic Output

**Mitigation**:
- Output guard
- Non-toxic tone requirements
- Anti-overcriticism evals
- Verification step mandatory

### Risk: Security Issues

**Mitigation**:
- SECURITY.md requirements
- No storage by default
- `--local-only --no-trace` modes
- Security warnings for sensitive content

### Risk: Performance Issues

**Mitigation**:
- Fast mode option
- Validator budgets
- Caching (MVP 2)
- Parallelization (MVP 2)

---

## Success Metrics

### MVP 1 Success

- All evals passing
- 4 artifact types supported
- Terminal UX working
- Examples working
- Installation working
- Documentation complete

### MVP 2 Success

- MVP 1 complete
- Section-level patches working
- GitHub PR export working
- Secret redaction working
- Performance improved

### MVP 3 Success

- MVP 2 complete
- New artifact types working
- Presentation text extraction working
- Evals for new types passing

### MVP 4 Success

- MVP 3 complete
- Diagram text review working
- PDF/PPTX extraction working
- Image-based diagram review working

### MVP 5 Success

- MVP 4 complete
- Domain packs working
- MCP server working
- Optional persistent memory working
- Optional web UI working

---

## Community & Contributions

### How to Contribute

See `CONTRIBUTING.md` for details.

### Contribution Areas

- New evals
- New validators
- New artifact types (from MVP 3)
- Domain packs (from MVP 5)
- Documentation improvements
- Bug fixes
- Performance improvements

### Contribution Process

1. Check ROADMAP.md for alignment
2. Check `docs/anti-overengineering.md`
3. Check `CONTRIBUTING.md`
4. Open issue or discussion
5. Submit PR
6. Pass evals
7. Code review
8. Merge

---

## FAQ

### When will MVP 1 be released?

Target: 2026 Q2. Progress tracked in this file.

### Can I request features for MVP 2+?

Yes. Open an issue or discussion. We'll prioritize based on:

- Alignment with roadmap
- Community demand
- Effort vs impact
- Anti-overengineering principles

### Why no web UI in MVP 1?

Terminal-first allows us to:

- Ship faster
- Focus on core validation logic
- Avoid UI complexity
- Maintain clarity of purpose

Web UI may come in MVP 5 as optional feature.

### Why only 4 artifact types in MVP 1?

Limited scope ensures:

- Quality over quantity
- Eval coverage for every type
- Clear documentation
- Manageable maintenance

More types come in MVP 2-3.

### Why no board simulation in MVP 1-5?

Board simulation (CEO, CPO, CTO personas) conflicts with:

- Anti-overengineering principles
- Terminal-first UX
- Focus on validation, not theater
- Eval-driven development

May be considered beyond MVP 5 if there's clear demand.

### When will domain packs be available?

MVP 5. Domain packs require:

- Core validation harness stable
- Extensibility mature
- Clear domain requirements
- Community input on priorities

---

**ROADMAP.md is the single source of truth for Shokunin Review development timeline.**

**Updates will be made as progress continues.**
