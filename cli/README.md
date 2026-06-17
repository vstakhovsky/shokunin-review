# Shokunin Review CLI

Terminal-first review readiness tool for product documents.

## Installation

```bash
npm install -g shokunin-review
```

## Quick Start

```bash
# Review a document
shokunin review document.md

# Show detailed score
shokunin score document.md

# Run evaluation harness
shokunin eval
```

## Commands

### review
Review a document for readiness.

```bash
shokunin review <file> [options]
```

**Options:**
- `-m, --mode <mode>` - Output mode (default|full|json|markdown|quiet)
- `-o, --output <file>` - Write output to file
- `-f, --focus <validator>` - Focus on specific validator

**Examples:**
```bash
shokunin review prd.md
shokunin review prd.md --mode json --output review.json
shokunin review prd.md --focus evidence-reviewer
```

### score
Show detailed score breakdown.

```bash
shokunin score <file> [options]
```

**Options:**
- `-v, --verbose` - Show detailed dimension breakdown
- `-j, --json` - Output score as JSON

**Examples:**
```bash
shokunin score prd.md
shokunin score prd.md --verbose
shokunin score prd.md --json
```

### eval
Run evaluation harness.

```bash
shokunin eval [options]
```

**Options:**
- `--filter <pattern>` - Filter evals by pattern
- `--verbose` - Show detailed eval output
- `--golden` - Update golden outputs

**Examples:**
```bash
shokunin eval
shokunin eval --filter prd
shokunin eval --verbose
```

### improve
Suggest improvements for a document (MVP 2).

```bash
shokunin improve <file> [options]
```

### rerun
Re-review a document and compare with original (MVP 2).

```bash
shokunin rerun <file> --compare <original>
```

## Output Modes

### default
Short, terminal-friendly output showing verdict and top blockers.

```
🔴 Not review-ready — 36/100

Top Blockers:
1. [evidence-gap] Problem is not quantified
   Fix: Add "15,000 urban users (25-40) spend 45min/day searching"
```

### full
Detailed output with all findings and score breakdown.

### json
Structured JSON output for automation and integration.

### markdown
Human-readable report format for documentation.

### quiet
Minimal output: score and verdict band only.

## Exit Codes

- `0` - Review-ready or Ready with minor fixes
- `1` - Needs major fixes
- `2` - Needs revision
- `3` - Not review-ready
- `4` - Unsupported format

## Artifact Types

- **PRD** - Product Requirements documents
- **RFC** - Technical Design documents
- **EXPERIMENT_PLAN** - Pre-A/B-test decision documents
- **PRODUCT_STRATEGY** - Strategic choice documents

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev -- review examples/prd/weak-ai-food-agent.before.md

# Run tests
npm test

# Lint
npm run lint
```

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0

## License

MIT