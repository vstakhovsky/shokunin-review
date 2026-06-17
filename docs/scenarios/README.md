# Scenarios

**User flow scenarios for Shokunin Review MVP 1.**

---

## Overview

This directory documents the key user scenarios and workflows for Shokunin Review.

Each scenario shows:

1. User command
2. Shokunin status progression
3. Artifact classification
4. Review spec
5. Selected validators
6. Findings
7. Readiness score
8. Recommended next action
9. Optional improve / re-review loop

---

## Available Scenarios

### Core Scenarios

| Scenario | Description | When to Use |
|----------|-------------|-------------|
| `onboarding-flow.md` | First-time user onboarding | New users getting started |
| `prd-review-flow.md` | PRD review workflow | Reviewing Product Requirements |
| `rfc-review-flow.md` | RFC review workflow | Reviewing Technical Designs |
| `experiment-plan-review-flow.md` | Experiment Plan review workflow | Reviewing Experiment Plans |
| `product-strategy-review-flow.md` | Product Strategy review workflow | Reviewing Product Strategy |

### Edge Cases

| Scenario | Description | When to Use |
|----------|-------------|-------------|
| `unsupported-format-flow.md` | Unsupported format handling | Unsupported file format |
| `unsupported-artifact-flow.md` | Unknown artifact type | Unknown document type |
| `security-warning-flow.md` | Security warning workflow | Sensitive content detected |

### Action Scenarios

| Scenario | Description | When to Use |
|----------|-------------|-------------|
| `improve-flow.md` | Improvement workflow | Suggesting improvements |
| `re-review-flow.md` | Re-review workflow | Comparing before/after |

---

## Scenario Structure

Each scenario follows this structure:

### 1. Context

- User goal
- Document type
- Current state

### 2. User Action

- Command executed
- Options used

### 3. Shokunin Response

- Status progression (with mascot states)
- Artifact classification
- Review spec
- Validator routing
- Findings generated

### 4. Output

- Verdict
- Readiness score
- Top blockers
- Score caps
- Recommended action
- Suggested command

### 5. Follow-up (optional)

- Improve flow
- Re-review flow
- Loop iteration

---

## Using Scenarios

### For Users

Scenarios help you:

- Understand what to expect
- Learn common workflows
- Troubleshoot issues
- Optimize your workflow

### For Developers

Scenarios help you:

- Understand user journeys
- Design features
- Test edge cases
- Improve UX

### For Document Authors

Scenarios help you:

- Understand review process
- Prepare documents for review
- Interpret review findings
- Improve document quality

---

## Quick Reference

### First-Time User

Start here: `onboarding-flow.md`

### Document Reviews

- PRD: `prd-review-flow.md`
- RFC: `rfc-review-flow.md`
- Experiment Plan: `experiment-plan-review-flow.md`
- Product Strategy: `product-strategy-review-flow.md`

### Edge Cases

- Unsupported format: `unsupported-format-flow.md`
- Unknown artifact: `unsupported-artifact-flow.md`
- Security warning: `security-warning-flow.md`

### Actions

- Improve document: `improve-flow.md`
- Re-review changes: `re-review-flow.md`

---

## Scenario Notation

### Status States

```
idle → reading → classifying → scoping → routing → checking → auditing → scoring → verifying → done
```

### Mascot States

```
💤 idle
📖 reading
🔍 classifying
📐 scoping
🔀 routing
🔎 checking
🔬 auditing
📊 scoring
✓ verifying
✓ done
🚫 blocked
⚠️ unsupported
```

### Output Levels

- **Short**: Default output (verdict + score + blockers + action)
- **Full**: All findings, dimensions, rationale (`--full`)
- **Quiet**: Minimal output (`--quiet`)

---

## Common Patterns

### Successful Review

1. User runs review
2. Shokunin processes through states
3. Artifact classified correctly
4. Validators run
5. Findings generated
6. Score calculated
7. Output displayed

### Blocked Review

1. User runs review
2. Security warning triggered
3. User chooses action (continue/cancel/redact)
4. Review proceeds or cancelled

### Unsupported

1. User runs review
2. Format or artifact type not supported
3. Clear message displayed
4. Alternative action suggested

### Improvement Loop

1. Review shows blockers
2. User runs improve
3. User makes changes
4. User runs re-review
5. Before/after compared

---

## Scenario Examples

### Example: Good PRD

**Input**: `examples/prd/good-prd.md`

**Flow**:
1. User runs: `shokunin review examples/prd/good-prd.md`
2. Status: idle → reading → classifying → ... → done
3. Classification: PRD (High confidence)
4. Score: 87/100 (Ready with minor fixes)
5. Output: Minor issues, no blockers

### Example: Weak PRD

**Input**: `examples/prd/weak-prd.md`

**Flow**:
1. User runs: `shokunin review examples/prd/weak-prd.md`
2. Status: idle → reading → classifying → ... → done
3. Classification: PRD (Medium confidence)
4. Score: 36/100 (Not review-ready)
5. Output: 5 blockers, score caps applied
6. Action: Suggests improve command

---

## Troubleshooting

### Review Won't Start

**Check**:
- File exists?
- File is readable?
- File is supported format?

**See**: `unsupported-format-flow.md`

### Artifact Misclassified

**Check**:
- File structure clear?
- Headings present?
- Content matches type?

**Fix**: Use `--type` override

### Score Seems Wrong

**Check**:
- Score caps applied?
- Findings support score?
- Verdict matches score?

**See**: Specific artifact type scenario

---

## FAQ

### How do I get started?

Start with: `onboarding-flow.md`

### What if my document type isn't supported?

See: `unsupported-artifact-flow.md`

### What if my format isn't supported?

See: `unsupported-format-flow.md`

### How do I improve my document?

See: `improve-flow.md`

### How do I re-review after changes?

See: `re-review-flow.md`

---

## Summary

### Scenarios Available

- ✅ 5 core review scenarios (PRD, RFC, Experiment, Strategy, Onboarding)
- ✅ 3 edge case scenarios (format, artifact, security)
- ✅ 2 action scenarios (improve, re-review)

### Scenario Purpose

- Show expected workflows
- Demonstrate features
- Guide troubleshooting
- Set expectations

### Using Scenarios

- Read relevant scenario before use
- Follow scenario steps
- Compare to your experience
- Report deviations

---

**docs/scenarios/ documents all user workflows.**

**Use these scenarios to understand Shokunin Review behavior and troubleshoot issues.**
