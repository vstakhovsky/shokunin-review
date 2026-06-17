# RFC Template

Template for Technical Design documents (RFCs).

## Structure

```markdown
# [Feature Name] RFC

## Context

**Current State**:
[What does the current system look like?]

**Problem**:
[What problem are we solving?]

**Opportunity**:
[Why solve this now?]

---

## Goals

**Primary Goals**:
1. [Goal 1]
2. [Goal 2]

**Non-Goals**:
- [What we're not doing]

**Success Criteria**:
[How will we know we succeeded?]

---

## Technical Proposal

**Architecture Overview**:
[High-level architecture]

**Key Components**:
- [Component 1]: [Responsibility]
- [Component 2]: [Responsibility]
- [Component 3]: [Responsibility]

**Data Flow**:
[Describe data flow]

---

## Alternatives Considered

**Alternative 1**: [Description]
- Pros: [advantages]
- Cons: [disadvantages]
- Rejected: [why]

**Alternative 2**: [Description]
- Pros: [advantages]
- Cons: [disadvantages]
- Chosen: [why]

**Chosen Approach**: [What we're doing and why]

---

## Trade-offs

**Trade-off 1**: [What we're accepting]
- Rationale: [why]
- Mitigation: [how we'll mitigate]

**Trade-off 2**: [What we're accepting]
- Rationale: [why]
- Mitigation: [how we'll mitigate]

---

## System Boundaries

**In Scope**:
- [Capability 1]
- [Capability 2]

**Out of Scope**:
- [Capability 3]
- [Capability 4]

**Integration Points**:
- [System 1]: [integration type]
- [System 2]: [integration type]

---

## API / Data Contracts

**API Endpoints** (if applicable):

### POST /endpoint

**Request**:
```json
{
  "field1": "type"
}
```

**Response** (200):
```json
{
  "field2": "type"
}
```

**Data Models**:
[Describe key data structures]

---

## Dependencies

**Technical Dependencies**:
- [Dependency 1]
- [Dependency 2]

**Team Dependencies**:
- [Team 1]: [responsibility]
- [Team 2]: [responsibility]

---

## Security / Privacy

**Threat Model**:
[What security threats exist?]

**Security Requirements**:
- [Requirement 1]
- [Requirement 2]

**Privacy Considerations**:
- [What user data is handled?]
- [How is it protected?]

---

## Failure Modes

**Failure Mode 1**: [What could fail]
- Impact: [what happens]
- Mitigation: [how we'll handle it]

**Failure Mode 2**: [What could fail]
- Impact: [what happens]
- Mitigation: [how we'll handle it]

---

## Observability

**Metrics**:
- [Metric 1]: [target]
- [Metric 2]: [target]

**Logging**:
- [What we log]

**Alerting**:
- [What triggers alerts]

---

## Rollout / Rollback Plan

**Rollout Strategy**:
- [Phase 1]: [duration, exposure]
- [Phase 2]: [duration, exposure]

**Rollback Plan**:
- Trigger: [what causes rollback]
- Action: [what we do]
- Timeline: [how fast]

**Success Criteria**:
- [What defines successful rollout]

---

## Test Plan

**Unit Tests**:
- [Test 1]
- [Test 2]

**Integration Tests**:
- [Test 1]
- [Test 2]

**Load Tests**:
- [Test 1]
- [Test 2]

---

## Open Questions

1. [Question 1]
   - Owner: [Who owns this]
   - Timeline: [When to decide]

2. [Question 2]
   - Owner: [Who owns this]
   - Timeline: [When to decide]

---

## Decision Ask

**Request**: [What technical decision needed?]

**Decision Maker**: [Who decides?]

**Timeline**: [When decision needed?]

**Information Needed**:
- [What information required for decision]

**Decision Options**:
1. [Approve implementation]
2. [Request design changes]
3. [Reject (with rationale)]
```
