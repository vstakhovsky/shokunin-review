# NON_FUNCTIONAL_REQUIREMENTS.md

**Non-functional requirements for Shokunin Review MVP 1.**

---

## Overview

Non-functional requirements define *how* Shokunin Review must behave, rather than *what* it does.

These requirements cover reliability, usability, safety, maintainability, extensibility, and accessibility.

---

## Reliability

### Deterministic Output Schema

- Output must follow defined schema (JSON, markdown, terminal)
- Schema must not change between versions without major version bump
- Optional fields must be clearly marked in schema

### Stable Score Bands

- Score bands (90-100, 75-89, 60-74, 40-59, 0-39) must be stable
- Score calculation logic must be consistent
- Same input should produce same score (within model tolerance)

### Explicit Score Caps

- All score caps must be documented
- Score cap logic must be transparent
- Score caps must be applied consistently

### Graceful Unsupported Format Handling

- Unsupported formats must not crash the system
- Clear, helpful messages must be displayed
- Suggested alternatives must be provided

### No Hidden Validator Execution

- All validators that run must be listed in output
- Validator routing logic must be documented
- No silent background validation

### Error Recovery

- Transient errors (model timeouts, rate limits) must be retried
- Permanent errors (invalid input, missing files) must fail gracefully
- Error messages must be actionable

### Idempotency

- Running same review twice should produce equivalent results
- Re-review should not depend on previous runs (unless using `--compare`)

---

## Usability

### Short Default Output

- Default output must be under 20 lines for most cases
- Focus on verdict, score, top blockers, next action
- Full report only with `--full` flag

### Output Modes

```bash
--full      # Detailed report with all findings
--quiet     # Minimal output: verdict, score, action
--json      # Structured JSON output
--markdown  # Markdown-formatted report
```

### Clear Next Actions

- Every output must include recommended next action
- Next action must include specific command to run
- Actions must be prioritized ( blockers first)

### No Forced Long Onboarding

- First run must work without reading extensive docs
- Quick start must be sufficient for basic use
- Help available via `--help` flag

### Progress Indication

- Long operations must show progress
- Multi-step operations must show current step
- Progress must be non-intrusive

### Clear Error Messages

- Errors must explain what went wrong
- Errors must suggest how to fix
- Errors must avoid technical jargon where possible

### Intuitive Commands

```bash
shokunin review <file>      # Most common operation
shokunin improve <file>     # Next most common
shokunin rerun <file>       # Re-review workflow
shokunin score <file>       # Score breakdown
shokunin eval               # Run evals
```

---

## Safety

### No AI-Use Accusations

- Never accuse author of using AI
- Never imply AI use is negative
- Focus on document quality, not origin

### No Invented Evidence

- Never invent company metrics
- Never invent customer data
- Never invent market research
- Never invent internal context

### No Confidential Data Storage

- Do not store raw document text by default
- Do not write sensitive input into traces by default
- Warn before reviewing sensitive documents

### Privacy Warning for Sensitive Docs

- Warn if document may contain sensitive content
- Recommend `--local-only` for sensitive docs
- Recommend `--no-trace` for sensitive docs
- Offer to review redacted copy

### No Full Rewrite by Default

- Default behavior is review-first
- Full rewrites require explicit user request
- Smallest useful improvement is default

### Output Guard

- All output must pass output guard checks
- Guard must catch: toxic language, shaming, accusations
- Guard must prevent: invented evidence, generic praise

### Non-Toxic Tone

- Output must be calm and direct
- Output must not shame author
- Output must assume good intent
- Output must focus on artifact, not person

---

## Maintainability

### Skills Are Workflows

- Every skill must be a workflow, not reference doc
- Every skill must have clear steps
- Every skill must have verification pass
- Every skill must have exit criteria

### Validators Are Small and Focused

- Each validator must have single responsibility
- Each validator must be under 100 lines (where possible)
- Each validator must be testable independently

### Evals Cover Each Artifact Type

- Each artifact type must have evals
- Evals must cover: weak, good, unsupported, edge cases
- Evals must define success criteria

### Score Caps Are Explicit

- All score caps must be documented in one place
- Score cap logic must be testable
- Score cap application must be verifiable

### Single Finding Schema

- All findings must follow same schema
- Finding schema must be defined in one file
- Finding schema must be versioned

### Documentation

- All public APIs must be documented
- All commands must have help text
- All skills must have SKILL.md
- All agents must have descriptive names

### Code Quality

- Code must follow consistent style
- Code must be modular and composable
- Code must have clear separation of concerns
- Code must be testable

---

## Extensibility

### Artifact Types Are Modular

- New artifact types must be addable without breaking existing types
- Artifact type detection must be extensible
- Artifact type requirements must be clearly documented

### Validator Modes

- Validators must support: full_review, gap_detection, not_applicable
- New validators must fit into same routing framework
- Validator selection logic must be configurable

### Future PDF/PPTX/Diagram Support

- Current architecture must support future format additions
- Adding new formats must not break MVP 1
- Format support must be clearly versioned

### Future Domain Packs

- Domain packs must be optional extensions
- Core must work without any domain pack
- Domain packs must have clear extension points

### Backward Compatibility

- Schema changes must be backward compatible where possible
- Breaking changes must require major version bump
- Deprecation must be clearly documented

### Plugin Architecture (Future)

- Must support future plugin system
- Must support custom validators
- Must support custom score caps
- Must support custom output formats

---

## Accessibility

### `--no-color` Option

- Must support color-free output
- All information must be conveyed without color
- Must work with color-blind users

### `--no-animation` Option

- Must support animation-free output
- All information must be conveyed without animation
- Must work for users sensitive to motion

### Text-Only Output

- Must support pure text output
- No emoji required for critical information
- ASCII alternatives for all symbols

### No Color-Only Information

- Critical information must never be conveyed by color alone
- Status must always include text label
- Findings must always have text tags

### Screen Reader Compatibility

- Terminal output must be screen-reader friendly
- Status must be announced clearly
- Structure must be logical and navigable

### Font Size Independence

- Output must work at any font size
- No fixed-width assumptions beyond standard terminal
- Line wrapping must be handled gracefully

---

## Performance

### Response Time Targets

- Fast mode: under 10 seconds for typical document
- Deep mode: under 30 seconds for typical document
- Improve mode: under 15 seconds for suggestions
- Score mode: under 5 seconds for score breakdown

### Memory Efficiency

- Must handle documents up to 100KB efficiently
- Must handle documents up to 1MB without crashing
- Memory usage should be proportional to document size

### Concurrent Execution

- Must support multiple reviews running in parallel
- No shared state between review instances
- No file locking issues

### Streaming (Future)

- Architecture must support streaming output
- Streaming must not break output schema
- Streaming must be optional (not default)

---

## Security

### Input Sanitization

- All input must be validated
- All input must be sanitized before processing
- Malicious input must not crash system

### Output Sanitization

- All output must be validated against schema
- All output must pass output guard
- Sensitive information must not leak in output

### Trace Security

- Traces must not contain sensitive content by default
- Traces must be optional via `--no-trace`
- Traces must be clearly marked in output

### Command Injection Prevention

- All file paths must be validated
- All commands must be properly escaped
- No arbitrary code execution

### Dependency Security

- All dependencies must be from trusted sources
- All dependencies must be regularly updated
- All dependencies must be scanned for vulnerabilities

---

## Compatibility

### Claude Code (Primary Target)

- Full support for Claude Code
- Skills install to project-local `.claude/skills/`
- Commands available via `/` prefix
- Full lifecycle hooks supported

### Cursor (Best-Effort)

- Best-effort Cursor support
- May have limited hook support
- Core skills should work

### Codex CLI (Best-Effort)

- Best-effort Codex support
- May have limited integration
- Core CLI should work

### Gemini CLI (Best-Effort)

- Best-effort Gemini support
- May have limited integration
- Core CLI should work

### Portable Assets

- Markdown commands must be portable
- Markdown agents must be portable
- Markdown skills must be portable
- JSON schemas must be portable
- Eval YAML files must be portable

### Not Guaranteed

- Full lifecycle hooks outside Claude Code
- Mascot UI outside local CLI
- Full skill auto-loading outside Claude-compatible environments

---

## Internationalization (Future)

### Architecture Must Support

- Multiple languages
- Locale-specific formatting
- Right-to-left languages
- Locale-specific terminology

### MVP 1 Scope

- English only
- No i18n in MVP 1

---

## Compliance

### License

- MIT License
- All dependencies must be MIT-compatible

### Data Protection

- No user data collection
- No telemetry by default
- No cloud processing by default

### Open Source

- All core code must be open source
- All documentation must be open source
- All evals must be open source

---

## Monitoring (Future)

### Metrics to Collect

- Review execution time
- Validator execution time
- Finding audit pass rate
- Score distribution
- Error rates

### Logging

- Structured logging
- Log levels: DEBUG, INFO, WARN, ERROR
- No sensitive data in logs

### Observability

- Health checks
- Status endpoints
- Diagnostic information

---

## Testing

### Unit Tests

- All validators must have unit tests
- All score cap logic must have unit tests
- All schema validation must have unit tests

### Integration Tests

- All commands must have integration tests
- All skills must have integration tests
- All workflows must have integration tests

### Eval Tests

- All artifact types must have evals
- Evals must pass before release
- Evals must cover edge cases

### Regression Tests

- Golden outputs must be maintained
- Changes must not break golden outputs
- Regression tests must run on every change

---

## Documentation

### User Documentation

- README must be comprehensive
- Quick start must work
- All commands must be documented
- All flags must be documented

### Developer Documentation

- Architecture must be documented
- APIs must be documented
- Contribution guidelines must exist
- Code must be commented where complex

### API Documentation

- All public APIs must be documented
- All schemas must be documented
- All hooks must be documented

---

## Versioning

### Semantic Versioning

- MAJOR version: incompatible changes
- MINOR version: backwards-compatible functionality
- PATCH version: backwards-compatible bug fixes

### Deprecation Policy

- Deprecated features must be marked
- Deprecated features must be documented
- Deprecated features must be removed in next major version

### Release Notes

- All releases must have release notes
- Release notes must document breaking changes
- Release notes must document new features
- Release notes must document bug fixes

---

**NON_FUNCTIONAL_REQUIREMENTS.md defines how Shokunin Review MVP 1 must behave.**
