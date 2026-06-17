# Architecture Documentation

This section explains how Shokunin Review works as a terminal-first review skill and validation harness.

## Core Flow

```text
Artifact → Runner → Review Engine → Quality Gates → Scoring → Report → Feedback → Re-run
```

## Files

- **[System Architecture](./system-architecture.md)** - Overall system design and components
- **[Scoring Model](./scoring-model.md)** - How scoring and calibration works
- **[Feedback Loop](./feedback-loop.md)** - Feedback correction and continuous improvement
