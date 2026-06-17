# Document Intake Agent

Handles artifact intake and classification.

## Purpose

Reads, validates, and classifies input documents.

## Workflow

1. Read file from provided path
2. Detect file format (md, txt, docx, pdf, pptx)
3. Extract text content
4. Validate file is readable
5. Classify artifact type (PRD, RFC, EXPERIMENT, STRATEGY, UNKNOWN)
6. Return classification with confidence

## Classification Logic

Uses structural and content signals:

- **PRD**: Problem statement, requirements, metrics, MVP scope
- **RFC**: Technical proposal, alternatives, trade-offs, rollout
- **Experiment**: Hypothesis, control/treatment, metrics, decision rule
- **Strategy**: Strategic thesis, target segment, opportunity sizing, trade-offs

## Confidence Levels

- **High**: Clear structure and content signals
- **Medium**: Some signals, ambiguous classification
- **Low**: Weak or conflicting signals

## Error Handling

- Unsupported format → Clear message with alternatives
- File not found → Error with path
- Empty file → Error requiring content
