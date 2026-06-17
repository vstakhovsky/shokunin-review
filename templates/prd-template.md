# PRD Template

Template for Product Requirements documents.

## Structure

```markdown
# [Feature Name] PRD

## Problem Statement

**Current Problem**:
[Describe current state and problem]

**Affected Users**:
[Who experiences this problem?]
- Segment size: [number or percentage]
- Impact: [quantified if possible]

**Current Solution**:
[How do users solve this now?]

**Problem Impact**:
[Quantify impact: revenue, time, frustration]

---

## Proposed Solution

**Solution Overview**:
[What are we building?]

**Key Features**:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

**How It Addresses Problem**:
[Explain causal logic]

---

## Target Users

**Primary Segment**:
- Description: [Who]
- Size: [number or percentage]
- Characteristics: [key traits]

**Secondary Segments** (if applicable):
- [Segment 2]
- [Segment 3]

**Not Targeting**:
- [Who we're not focusing on]

---

## Success Metrics

**Primary Metric**:
- Name: [metric name]
- Current: [baseline]
- Target: [goal]
- Measurement: [how measured]
- Threshold: [success criteria]

**Secondary Metrics**:
- [Metric 1]: [target]
- [Metric 2]: [target]

**Guardrail Metrics** (if applicable):
- [Metric 3]: [max acceptable]

---

## Requirements

### Functional Requirements

**FR-1**: [Requirement description]
- Acceptance: [Given/When/Then]

**FR-2**: [Requirement description]
- Acceptance: [Given/When/Then]

### Non-Functional Requirements

**NFR-1**: [Performance requirement]
- [NFR-2]: [Security requirement]
- [NFR-3**: [Reliability requirement]

---

## MVP Scope

**Included in MVP**:
- [Feature 1]
- [Feature 2]

**Excluded from MVP** (Phase 2):
- [Feature 3]
- [Feature 4]

**Success Criteria for MVP**:
[What defines MVP success?]

---

## Non-Goals

What we're explicitly not doing:
- [Non-goal 1]: [Why]
- [Non-goal 2]: [Why]

---

## Dependencies

**Technical**:
- [Dependency 1]
- [Dependency 2]

**Team**:
- [Team 1]: [responsibility]
- [Team 2]: [responsibility]

---

## Risks

**Risk**: [What could go wrong]
- Probability: [High/Medium/Low]
- Impact: [High/Medium/Low]
- Mitigation: [How we'll handle it]

---

## Timeline

**MVP**: [duration]

**Phases**:
- Phase 1: [duration, deliverables]
- Phase 2: [duration, deliverables]

---

## Decision Ask

**Request**: [What decision needed?]

**Decision Maker**: [Who decides?]

**Timeline**: [When decision needed?]

**Decision Options**:
1. [Option 1]
2. [Option 2]
3. [Option 3]
```

---

## AI Features (if applicable)

Add section for AI features:

```markdown
## AI Guardrails

**Output Limits**:
- Max [output type]: [limit]
- Fallback behavior: [what happens when model fails]

**Cost Limits**:
- Max cost per [unit]: [amount]
- Daily budget cap: [amount]

**Human Oversight**:
- [Condition]: [when human review required]
```
