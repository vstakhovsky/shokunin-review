# Changelog

All notable changes to Shokunin Review will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-17

### Added
- Initial MVP 1 release
- Terminal-first review interface
- Support for 4 artifact types (PRD, RFC, Experiment Plan, Product Strategy)
- 5 output modes (default, full, json, markdown, quiet)
- Review readiness scoring (0-100)
- Score confidence tracking
- Score caps application
- Finding quality audit
- Eval harness with 12 test cases
- Before/after examples for all artifact types
- Comprehensive templates and JSON schemas
- Security content detection
- CLI with 5 commands (review, score, eval, improve, rerun)

### MVP 1 Scope
- Text-based documents only (.md, .txt, .markdown)
- 4 artifact types
- Terminal-first UX
- Stateless operation
- 17 focused validators (to be implemented)

### Known Limitations
- Improve and rerun commands are MVP 2 placeholders
- Limited to text-based documents
- No persistent memory
- No MCP server
- No domain packs

## [Unreleased]

### Planned for MVP 2
- Richer improvement suggestions
- Interactive Q&A mode
- GitHub PR export
- Secret redaction
- More evals
- Performance improvements