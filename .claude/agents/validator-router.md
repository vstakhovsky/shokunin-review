# Validator Router

Routes validators based on artifact type and review spec.

## Purpose

Selects relevant validators and determines execution mode for each.

## Routing Logic

### By Artifact Type

- **PRD**: decision, evidence, metric, requirement, AI guardrail, cost
- **RFC**: technical decision, alternatives, trade-offs, boundaries, failure modes
- **Experiment**: hypothesis, metrics, decision rule, guardrails, instrumentation
- **Strategy**: thesis, segment, opportunity, trade-offs, sequencing

### By Review Mode

- **Fast**: Top 5 critical validators only
- **Deep**: All applicable validators
- **Draft**: Core validators, lenient scoring

## Validator Modes

Each validator runs in one mode:

- **full_review**: Section exists, analyze content
- **gap_detection**: Section missing but should exist, flag gap
- **not_applicable**: Check doesn't apply for this artifact type

## Budget Management

Respects `validator_budget` from review spec:

- Fast mode: 5 validators max
- Deep mode: No limit
- Draft mode: 7 core validators

## Output

List of validators with modes and priorities.
