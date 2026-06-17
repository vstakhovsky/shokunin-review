# PRD vs RFC

**Comparison of PRD and RFC document types.**

---

## Overview

PRD and RFC are often confused, but they serve different purposes and answer different questions.

---

## Quick Comparison

| Document | Main question | Primary layer | Main risk | Success criteria |
|----------|---------------|---------------|-----------|-----------------|
| **PRD** | What should we build and why? | Product / business | Building the wrong thing | Clear requirements, metrics, MVP scope |
| **RFC** | How should we build it? | Technical design | Building it wrong | Clear technical approach, alternatives, trade-offs |
| **Experiment Plan** | How will we test and decide? | Product / data | Learning nothing or misreading results | Clear hypothesis, metrics, decision rule |
| **Product Strategy** | What strategic choice should we make? | Product / business strategy | Choosing a vague direction without evidence | Clear thesis, opportunity sizing, trade-offs |

---

## PRD vs RFC

### Key Differences

**PRD (Product Requirements Document)**:

- **Question**: What should we build and why?
- **Focus**: Product and business requirements
- **Audience**: Stakeholders, engineers, designers
- **Content**: Problem, solution, requirements, metrics, scope
- **Success**: Clear requirements, measurable success, defined scope

**RFC (Request for Comments / Technical Design)**:

- **Question**: How should we build it?
- **Focus**: Technical design and implementation
- **Audience**: Engineers, architects, technical stakeholders
- **Content**: Technical proposal, alternatives, trade-offs, architecture
- **Success**: Clear technical approach, sound trade-offs, feasible implementation

---

## When to Use Which

### Use a PRD When

You need to answer:

- What problem are we solving?
- Who is this for?
- What are we building?
- How will we measure success?
- What's in scope vs out of scope?

**Examples**:

- New product feature
- Product improvement
- Customer-facing change
- Business capability

### Use an RFC When

You need to answer:

- How should we build this?
- What are the technical options?
- What trade-offs do we accept?
- What are the system boundaries?
- How do we handle failure?

**Examples**:

- System architecture
- API design
- Infrastructure change
- Data migration
- Security implementation

---

## Common Confusions

### Confusion 1: Technical PRD

**Problem**: PRD focuses on technical implementation details.

**Issue**: This is an RFC, not a PRD.

**Fix**:
- If focus is technical requirements → Split into PRD (product requirements) + RFC (technical design)
- If focus is how to build → Use RFC only

**Example**:

❌ **Bad** (PRD that's actually an RFC):

```markdown
## PRD: Authentication System

We'll use JWT tokens with Redis storage.
Access tokens expire in 15 minutes.
Refresh tokens last 7 days.
```

✅ **Good** (Split PRD + RFC):

**PRD**:
```markdown
## PRD: Improved Authentication

Problem: Users re-authenticate too often (30% daily)
Solution: Token-based authentication with longer sessions
Metric: Re-auth rate < 6% of daily active users
```

**RFC**:
```markdown
## RFC: JWT-Based Authentication

Technical proposal: JWT tokens with Redis storage
Alternatives: Session cookies, OAuth 2.0
Trade-offs: Token revocation complexity vs security
```

---

### Confusion 2: RFC That's Actually a PRD

**Problem**: RFC focuses on product requirements instead of technical design.

**Issue**: This is a PRD, not an RFC.

**Fix**:
- If focus is product requirements → Use PRD
- If technical design is needed → Add separate RFC

**Example**:

❌ **Bad** (RFC that's actually a PRD):

```markdown
## RFC: Food Delivery Tracking

Problem: Orders are cancelled due to late delivery
Solution: Real-time order tracking
Users: Urban millennials 25-40
```

✅ **Good** (PRD):

```markdown
## PRD: Food Delivery Tracking

Problem: 15% order cancellation rate
Target users: Urban millennials 25-40
Solution: Real-time order tracking
Metric: Cancellation rate < 9%
```

✅ **Good** (RFC):

```markdown
## RFC: Real-Time Tracking Architecture

Technical proposal: WebSocket-based tracking
Alternatives: Polling, server-sent events
Trade-offs: Real-time vs infrastructure cost
```

---

### Confusion 3: Combined Document

**Problem**: Single document tries to be both PRD and RFC.

**Issue**: Confusing, hard to review, misses audience needs.

**Fix**: Split into separate PRD and RFC documents.

**Example**:

❌ **Bad** (Combined):

```markdown
## Food Delivery Tracking PRD/RFC

Problem: Users cancel due to late delivery
Solution: Real-time tracking with WebSockets
Architecture: React Native + WebSocket + Redis
Alternatives: Polling, SMS notifications
```

✅ **Good** (Split):

**PRD**:
```markdown
## PRD: Food Delivery Tracking

Problem: 15% cancellation rate
Solution: Real-time order tracking
Users: Urban millennials 25-40
Metric: Cancellation rate < 9%
```

**RFC**:
```markdown
## RFC: Real-Time Tracking Architecture

Technical proposal: WebSocket-based tracking
Alternatives: Polling, server-sent events
Trade-offs: Real-time vs infrastructure cost
```

---

## PRD and RFC Together

### When You Need Both

Large initiatives often require both:

1. **PRD first** — Define what and why
2. **RFC second** — Define how

**Example Flow**:

1. **PRD** approved → Clear requirements and scope
2. **RFC** created → Technical design for approved PRD
3. **RFC** approved → Implementation begins

### Dependencies

**PRD → RFC**:
- PRD defines requirements
- RFC designs technical solution for requirements
- RFC cannot change PRD requirements (only how they're implemented)

**RFC → PRD**:
- RFC may identify technical constraints
- PRD may need adjustment based on technical feasibility
- PRD and RFC should be aligned

---

## Other Document Types

### Experiment Plan

**Question**: How will we test and decide?

**Use when**: You need to run an experiment before committing.

**Relationship to PRD/RFC**:
- Experiment Plan may follow PRD (test hypothesis)
- Experiment Plan may precede PRD (validate before building)
- RFC may follow Experiment Plan (implement winning variant)

### Product Strategy

**Question**: What strategic choice should we make?

**Use when**: You need to make a strategic decision.

**Relationship to PRD/RFC**:
- Product Strategy → PRD (strategy informs requirements)
- Product Strategy → RFC (strategy informs technical choices)
- Multiple PRDs may fulfill one Product Strategy

---

## Decision Tree

```
Start
│
├─ What to build?
│  └─ Use PRD
│
├─ How to build it?
│  └─ Use RFC
│
├─ How to test and decide?
│  └─ Use Experiment Plan
│
└─ What strategic choice?
   └─ Use Product Strategy
```

---

## Common Mistakes

### Mistake 1: Wrong Document Type

**Problem**: Using PRD for technical design, or RFC for product requirements.

**Solution**: Use decision tree to choose correct type.

### Mistake 2: Missing Document

**Problem**: Only PRD, no RFC (or vice versa) when both needed.

**Solution**: Assess whether both PRD and RFC are needed.

### Mistake 3: Confused Document

**Problem**: Document mixes PRD and RFC content.

**Solution**: Split into separate documents.

### Mistake 4: Wrong Audience

**Problem**: Technical RFC sent to business stakeholders (or vice versa).

**Solution**: Match document to audience.

---

## Quick Reference

### PRD Checklist

- Problem clearly defined
- Target users identified
- Requirements testable
- Success metrics defined
- MVP scope clear
- Non-goals stated
- Decision ask included

### RFC Checklist

- Technical proposal clear
- Alternatives analyzed
- Trade-offs acknowledged
- System boundaries defined
- Failure modes addressed
- Rollout plan defined
- Decision ask included

### Experiment Plan Checklist

- Hypothesis testable
- Control/treatment defined
- Primary metric clear
- Decision rule defined
- Guardrail metrics included
- Rollback plan defined

### Product Strategy Checklist

- Strategic thesis clear
- Target segment defined
- Opportunity sized
- Trade-offs acknowledged
- Sequencing defined
- Success metrics defined

---

## Summary

### Key Principle

```text
A PRD should not pretend to be an RFC.
An RFC should not pretend to be a business strategy.
An experiment plan should not launch without a decision rule.
A strategy document should not hide missing choices behind vision language.
```

### Document Purposes

- **PRD**: What and why
- **RFC**: How
- **Experiment Plan**: Test and decide
- **Product Strategy**: Strategic choice

### Choosing the Right Type

Use the decision tree:

1. **What to build?** → PRD
2. **How to build it?** → RFC
3. **How to test and decide?** → Experiment Plan
4. **What strategic choice?** → Product Strategy

### When in Doubt

- Focus on product/business → PRD
- Focus on technical design → RFC
- Focus on learning → Experiment Plan
- Focus on strategic direction → Product Strategy

---

**docs/document-requirements/prd-vs-rfc.md clarifies document type differences.**

**Use this guide to choose the right document type and avoid confusion.**
