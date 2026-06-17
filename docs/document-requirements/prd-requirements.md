# PRD Requirements

**Requirements for Product Requirements documents in Shokunin Review MVP 1.**

---

## Overview

PRD is primarily a **product and business-layer document**.

It answers: **What should we build, for whom, why now, what problem does it solve, how is success measured?**

---

## Main Question

**What should we build and why?**

---

## Primary Layer

**Product / business**

---

## Main Risk

**Building the wrong thing**

---

## Common PRD Types

### Classic PRD

Traditional comprehensive PRD with all major sections.

**Structure**: Full PRD structure with problem, solution, requirements, metrics, timeline.

**When to use**: Major features, products, initiatives.

### One-Pager / Lightweight PRD

Concise, focused PRD for smaller features or quick decisions.

**Structure**: Essential sections only, condensed format.

**When to use**: Small features, quick iterations, internal tools.

### PR/FAQ-Style PRD

Amazon-style press-release Frequently Asked Questions.

**Structure**: Press release + FAQ format, customer-first perspective.

**When to use**: Customer-facing features, user experience changes.

### Feature Spec PRD

Technical-leaning PRD for feature specifications.

**Structure**: Requirements-focused, technical details included.

**When to use**: Technical features, platform changes, API features.

### Technical / Platform PRD

PRD for technical or platform capabilities.

**Structure**: Technical requirements, system implications, developer experience.

**When to use**: Developer tools, platform features, infrastructure.

### AI-Native PRD

PRD for AI/ML features and products.

**Structure**: Additional sections for AI guardrails, cost, failure modes.

**When to use**: AI features, ML models, LLM applications.

### Experiment-Oriented PRD

PRD framed around learning and experimentation.

**Structure**: Hypothesis-driven, experiment-focused, learning goals.

**When to use**: New initiatives, market exploration, MVP validation.

### Agent-Readable PRD

PRD optimized for both human and machine reading.

**Structure**: Structured sections, explicit fields, parseable requirements.

**When to use**: Automation, CI/CD integration, documentation-as-code.

---

## Required Sections

### 1. Problem Statement

**Purpose**: What problem are we solving?

**Requirements**:

- Clear problem description
- Who experiences the problem
- How often it occurs
- Current impact (quantified if possible)

**Common Issues**:

- `[evidence-gap]` — Problem not quantified
- `[segment-fog]` — Affected users unclear
- `[overclaim]` — Problem impact exaggerated

**Good Example**:

```markdown
## Problem Statement

Food delivery users cancel 15% of orders due to late delivery,
resulting in $48K/month in lost revenue and customer churn.
Current ETA accuracy is ±45 minutes, causing user frustration.
```

**Weak Example**:

```markdown
## Problem Statement

Food delivery is hard and users are unhappy.
We need to fix this.
```

---

### 2. Target Users / Segments

**Purpose**: Who is this for?

**Requirements**:

- Specific user segments or personas
- Segment size (if applicable)
- Segment characteristics
- User goals and pain points

**Common Issues**:

- `[segment-fog]` — Target segment unclear
- `[evidence-gap]` — Segment size not provided
- `[overclaim]` — Segment size exaggerated

**Good Example**:

```markdown
## Target Users

**Primary**: Urban food delivery users, ages 25-45, ordering 3+ times/week
- Segment size: 12,000 users (15% of active users)
- Pain point: Late deliveries, poor ETA accuracy
- Goal: Reliable delivery times

**Secondary**: Restaurant partners
- Segment size: 450 restaurants
- Pain point: Order cancellations, poor routing
- Goal: Efficient order fulfillment
```

**Weak Example**:

```markdown
## Target Users

Everyone who orders food.
```

---

### 3. Current Solution (if any)

**Purpose**: What do we do now?

**Requirements**:

- Description of current state
- Why current solution is insufficient
- Quantified gaps (if applicable)

**Common Issues**:

- `[evidence-gap]` — Current gaps not quantified
- `[overclaim]` — Current solution unfairly criticized

**Good Example**:

```markdown
## Current Solution

Users receive ETAs based on restaurant preparation time estimates.
Current ETA accuracy is ±45 minutes, causing 15% order cancellations.
No real-time driver location tracking.
```

**Weak Example**:

```markdown
## Current Solution

Current system is terrible and doesn't work at all.
```

---

### 4. Proposed Solution

**Purpose**: What will we build?

**Requirements**:

- Clear solution description
- How it addresses the problem
- Key features or capabilities

**Common Issues**:

- `[logic-drift]` — Solution doesn't address problem
- `[noise-bloat]` — Solution description verbose

**Good Example**:

```markdown
## Proposed Solution

Real-time ETA prediction using:
- GPS-based driver location tracking
- Historical delivery time data
- Machine learning model for traffic patterns
- Real-time updates to users

Reduces ETA accuracy from ±45 min to ±10 min.
```

**Weak Example**:

```markdown
## Proposed Solution

We'll build an amazing AI system that uses cutting-edge technology
and machine learning and big data to revolutionize food delivery.
```

---

### 5. MVP Scope

**Purpose**: What's in vs out?

**Requirements**:

- Clear MVP scope
- What's included in MVP
- What's deferred (non-goals)
- Success criteria for MVP

**Common Issues**:

- `[missing-decision]` — MVP scope not defined
- `[logic-drift]` — Scope doesn't align with problem

**Good Example**:

```markdown
## MVP Scope

**Included**:
- GPS-based driver tracking
- Historical data model
- Real-time user notifications
- Accuracy reporting dashboard

**Deferred (Non-Goals)**:
- Traffic prediction model (Phase 2)
- Restaurant preparation time estimation (Phase 2)
- Customer-facing route optimization (Phase 2)
```

**Weak Example**:

```markdown
## MVP Scope

We'll build an ETA system.
```

---

### 6. Non-Goals

**Purpose**: What are we explicitly not doing?

**Requirements**:

- Explicit non-goals
- Rationale for each non-goal
- Future consideration (if applicable)

**Common Issues**:

- `[missing-decision]` — Non-goals not stated

**Good Example**:

```markdown
## Non-Goals

- **Route optimization**: Not in scope for MVP, existing routing sufficient
- **Restaurant preparation time**: Difficult to estimate accurately, deferred
- **Customer-facing maps**: Nice-to-have, not required for MVP
```

**Weak Example**:

```markdown
## Non-Goals

We're not going to over-engineer this.
```

---

### 7. Requirements

**Purpose**: What must this do?

**Requirements**:

- Clear, testable requirements
- Functional requirements
- Non-functional requirements (if applicable)
- Acceptance criteria

**Common Issues**:

- `[requirement-fog]` — Requirements not testable
- `[noise-bloat]` — Too many requirements

**Good Example**:

```markdown
## Requirements

**Functional**:
- F1: System shall provide ETA predictions within ±10 min accuracy
- F2: System shall update ETAs in real-time (every 30 seconds)
- F3: System shall display driver location on map

**Non-Functional**:
- N1: ETA prediction within 5 seconds of request
- N2: Support 10K concurrent users
- N3: 99.9% uptime

**Acceptance Criteria**:
- Given: Driver is en route to restaurant
- When: Customer opens app
- Then: ETA displayed with accuracy ±10 min
```

**Weak Example**:

```markdown
## Requirements

The system should be fast, accurate, and reliable.
Users should be happy.
```

---

### 8. Success Metrics

**Purpose**: How do we measure success?

**Requirements**:

- Primary success metric
- Secondary metrics
- Success thresholds
- Measurement source

**Common Issues**:

- `[metric-fog]` — Metrics unclear or not measurable
- `[overclaim]` — Success thresholds arbitrary

**Good Example**:

```markdown
## Success Metrics

**Primary Metric**:
- ETA accuracy: ±10 minutes (95th percentile)
- Measured: Actual delivery time vs predicted ETA
- Success: 95% of deliveries within ±10 min

**Secondary Metrics**:
- Order cancellation rate: < 5% (from 15%)
- Customer satisfaction: +0.5 points (1-5 scale)
- Delivery time: No increase (ensure speed maintained)
```

**Weak Example**:

```markdown
## Success Metrics

We'll measure if users are happy and if ETAs are better.
```

---

### 9. Guardrails (for AI features)

**Purpose**: What prevents harm?

**Requirements** (if AI feature):

- Safety boundaries
- Failure handling
- Cost limits
- Human oversight

**Common Issues**:

- `[ai-guardrail-gap]` — AI guardrails missing

**Good Example**:

```markdown
## Guardrails

**Safety**:
- Max predicted ETA: 120 minutes (cap extreme predictions)
- Min confidence threshold: 60% (show "ETA unavailable" if lower)
- Fallback to simple model if ML model fails

**Cost**:
- Max inference cost: $0.01 per prediction
- Daily cost cap: $100

**Oversight**:
- Human review of predictions > 90 minutes
- Daily accuracy report to product team
```

**Weak Example**:

```markdown
## Guardrails

We'll be careful not to break anything.
```

---

### 10. Dependencies

**Purpose**: What else does this depend on?

**Requirements**:

- Technical dependencies
- Team dependencies
- External dependencies
- Timeline dependencies

**Common Issues**:

- `[dependency-gap]` — Dependencies not acknowledged

**Good Example**:

```markdown
## Dependencies

**Technical**:
- GPS tracking infrastructure (available)
- Historical data warehouse (available)
- ML model training pipeline (needs setup)

**Team**:
- Data science team: ML model development
- Engineering team: Production integration
- Ops team: Infrastructure setup

**External**:
- Google Maps API (existing contract)
- Twilio for notifications (existing contract)
```

**Weak Example**:

```markdown
## Dependencies

We'll need some help from other teams.
```

---

### 11. Risks

**Purpose**: What could go wrong?

**Requirements**:

- Technical risks
- Product risks
- Business risks
- Mitigation strategies

**Common Issues**:

- `[logic-drift]` — Risks not addressed

**Good Example**:

```markdown
## Risks

**Technical**:
- Risk: ML model accuracy insufficient
- Mitigation: Start with simple model, A/B test before rollout

**Product**:
- Risk: Users don't trust new ETAs
- Mitigation: Show confidence intervals, gradual rollout

**Business**:
- Risk: Increased infrastructure costs
- Mitigation: Cost per delivery analysis, budget cap
```

**Weak Example**:

```markdown
## Risks

Something might go wrong but we'll handle it.
```

---

### 12. Timeline (Optional)

**Purpose**: When will this happen?

**Requirements** (if included):

- Key milestones
- Dependencies
- Buffer time

**Common Issues**:

- `[overclaim]` — Timeline unrealistic

**Good Example**:

```markdown
## Timeline

- Week 1-2: Data collection and model training
- Week 3-4: Integration and testing
- Week 5: Internal beta (100 users)
- Week 6-7: Gradual rollout (10%, 25%, 50%, 100%)
- Week 8: Full launch and monitoring
```

**Weak Example**:

```markdown
## Timeline

We'll launch soon.
```

---

### 13. Decision Ask

**Purpose**: What decision is needed?

**Requirements**:

- Clear decision request
- Who decides
- When decision needed
- What information needed

**Common Issues**:

- `[missing-decision]` — Decision ask not stated

**Good Example**:

```markdown
## Decision Ask

**Request**: Approval to proceed with MVP development

**Decision Maker**: Product Leadership Council

**Timeline**: Decision needed by EOD Friday, June 20

**Information Needed**:
- Alignment with product strategy
- Resource availability (2 engineers, 1 data scientist)
- Budget approval ($50K for infrastructure)

**Decision Options**:
1. Approve MVP development
2. Request more information
3. Defer to next quarter
```

**Weak Example**：

```markdown
## Decision Ask

Please approve this.
```

---

## Quality Dimensions

### Problem Clarity (20%)

- Problem clearly stated
- Affected users identified
- Impact quantified

### Evidence Quality (20%)

- Claims supported with data
- Impact quantified
- Sources cited

### Requirements Clarity (15%)

- Requirements testable
- Acceptance criteria clear
- Functional and non-functional separated

### Metrics Quality (15%)

- Primary metric defined
- Success thresholds stated
- Measurement method clear

### MVP Scope (10%)

- MVP scope defined
- Non-goals stated
- Phase boundaries clear

### Guardrails (10%)

- Safety boundaries defined (if AI)
- Failure handling planned
- Cost limits stated

### Decision Ask (10%)

- Decision clearly requested
- Decision maker identified
- Timeline stated

---

## Score Caps

- No problem evidence → max score 60
- No primary metric → max score 55
- No MVP scope → max score 55
- No decision ask → max score 65
- No AI guardrails for AI feature → max score 70

---

## Common Issues

### Evidence Gaps

**Pattern**: Claims without supporting data

**Example**:

```text
"This will increase user engagement by 50%"
[WITHOUT DATA showing baseline, mechanism, or comparable cases]
```

**Finding**: `[evidence-gap]`

**Fix**: Add baseline data, causal logic, or comparable cases.

---

### Metric Fog

**Pattern**: Unclear or unmeasurable metrics

**Example**:

```text
"We'll measure user happiness"
[WITHOUT CLEAR definition, measurement method, or threshold]
```

**Finding**: `[metric-fog]`

**Fix**: Define specific metric with measurement method and threshold.

---

### Requirement Fog

**Pattern**: Requirements not testable

**Example**:

```text
"System shall be user-friendly"
[WITHOUT clear criteria or test]
```

**Finding**: `[requirement-fog]`

**Fix**: Rewrite as testable requirement or acceptance criteria.

---

### Overclaim

**Pattern**: Impact claimed without evidence

**Example**:

```text
"This will revolutionize the market"
[WITHOUT market analysis, competitive context, or realistic projections]
```

**Finding**: `[overclaim]`

**Fix**: Add evidence, competitive analysis, or realistic projections.

---

## Examples

### Good PRD

- Clear problem with evidence
- Specific target segments
- Testable requirements
- Clear success metrics
- Explicit decision ask

### Weak PRD

- Vague problem statement
- Generic "everyone" as target
- Untestable requirements
- No success metrics
- No decision ask

---

## Usage

### For Writers

Use this document to:

- Structure your PRD
- Ensure all required sections present
- Avoid common issues
- Prepare for review

### For Reviewers

Use this document to:

- Understand review criteria
- Validate findings
- Calibrate expectations

### For Validators

Use this document to:

- Guide validation checks
- Apply score caps appropriately
- Generate relevant findings

---

## FAQ

### What if my PRD is a one-pager?

One-pagers are supported. Focus on essential sections:

- Problem
- Solution
- Requirements
- Metrics
- Decision ask

### What if my PRD is for an AI feature?

Add guardrails section:

- Safety boundaries
- Failure handling
- Cost limits
- Human oversight

### What if I don't have all sections?

Missing sections trigger findings and score caps. Include all sections for best results.

---

**docs/document-requirements/prd-requirements.md defines PRD requirements.**

**Use these requirements to write better PRDs and understand review findings.**
