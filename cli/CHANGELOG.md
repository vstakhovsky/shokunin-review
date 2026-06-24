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

### Added - Eval Harness Enhancement (2026-06-24)
- Comprehensive regression baseline system with `--update-baseline` flag
- Baseline comparison to detect score drift and metric changes
- Finding taxonomy with 30+ finding types and severity calibration
- Score calibration rubric with explicit dimensions and criteria
- Expected findings aggregation across all eval cases
- Regression testing with configurable thresholds (default/strict)
- JSON and Markdown report generation with metric summaries
- Trace JSON files for per-case execution debugging
- Support for repeated eval runs for stability testing

### Eval Harness Features
- **Dataset**: 16 eval cases covering PRD, RFC, Experiment, and Strategy artifacts
- **Rubric**: Score bands (blocked, needs_major_revision, nearly_ready, ready)
- **Expected Findings**: must_detect, should_not_detect, and critical_misses
- **Score Calibration**: Explicit dimensions, weights, and score caps
- **Regression Checks**: Baseline comparison and drift detection
- **Metrics**: Critical recall, finding recall, hallucination rate, calibration error
- **Reports**: Terminal output, JSON, and Markdown reports
- **Traceability**: Per-case trace JSON files for debugging

### CLI Commands
```bash
shokunin eval                          # Run all evals
shokunin eval --filter <pattern>       # Filter evals by pattern
shokunin eval --strict                 # Use strict regression thresholds
shokunin eval --report                 # Generate markdown report
shokunin eval --trace                  # Save per-case trace JSON files
shokunin eval --repeat <n>             # Run each eval N times for stability
shokunin eval --update-baseline        # Update regression baseline
shokunin eval --verbose                # Show detailed eval output
```

### Eval Metrics
- **Critical Recall**: % of critical findings detected
- **Finding Recall**: % of expected findings detected
- **Hallucination Rate**: % of false positive findings
- **Score Calibration Error**: Distance from expected score range
- **Tone Pass**: Binary check for professional, non-toxic output
- **Recommendation Specificity**: % of actionable recommendations

### Regression Thresholds
**Default Mode:**
- Critical recall: ≥ 90%
- Finding recall: ≥ 75%
- Hallucination rate: ≤ 10%
- Avg score calibration error: ≤ 8 points
- Tone pass rate: 100%
- Recommendation specificity: ≥ 75%

**Strict Mode:**
- Critical recall: 100%
- Finding recall: ≥ 85%
- Hallucination rate: ≤ 5%
- Avg score calibration error: ≤ 5 points

### New Files
- `harness/regression/baseline.json` - Regression baseline storage
- `harness/expected_findings/taxonomy.yaml` - Finding type definitions
- `harness/expected_findings/README.md` - Finding taxonomy documentation
- `harness/score_calibration/rubric.yaml` - Score bands and dimensions
- `harness/score_calibration/README.md` - Calibration guidance

### Planned for MVP 2
- Richer improvement suggestions
- Interactive Q&A mode
- GitHub PR export
- Secret redaction
- More evals
- Performance improvements