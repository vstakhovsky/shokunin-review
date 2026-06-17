# Experiment Plan Requirements

**Requirements for Experiment Plan documents in Shokunin Review MVP 1.**

---

## Overview

Experiment Plan is a **pre-launch decision document**.

It answers: **What hypothesis are we testing, who is included, what is control and treatment, what metric proves success, what guardrails protect us, what decision follows?**

---

## Main Question

**How will we test and decide?**

---

## Primary Layer

**Product / data**

---

## Main Risk

**Learning nothing or misreading results**

---

## Common Experiment Plan Types

### Classic A/B Test Plan

Traditional A/B test with control and treatment groups.

**Structure**: Hypothesis, metrics, randomization, duration, decision rule.

**When to use**: Feature launches, UI changes, pricing tests.

### Feature Flag Rollout Plan

Gradual rollout with feature flags.

**Structure**: Rollout stages, monitoring, rollback criteria.

**When to use**: Infrastructure changes, backend features, high-risk changes.

### Pricing / Monetization Experiment

Pricing or monetization experiment.

**Structure**: Pricing variants, revenue impact, guardrail metrics.

**When to use**: Price changes, monetization features, payment flows.

### Growth Experiment Brief

Growth-focused experiment brief.

**Structure**: Funnel impact, user acquisition, retention metrics.

**When to use**: Onboarding changes, activation improvements, retention features.

### Search / Ranking Experiment

Search or ranking algorithm experiment.

**Structure**: Relevance metrics, user satisfaction, business metrics.

**When to use**: Search algorithms, ranking changes, recommendation systems.

### AI / ML Experiment Plan

AI/ML model experiment.

**Structure**: Model performance, user impact, business metrics.

**When to use**: ML model deployment, algorithm changes, AI features.

### Holdout / Long-term Experiment

Long-term holdout experiment.

**Structure**: Holdout group, long-term metrics, delayed effects.

**When to use**: Network effects, long-term retention, ecosystem changes.

### Agent-Readable Experiment Spec

Experiment plan optimized for automation.

**Structure**: Structured fields, parseable metrics, automation-ready.

**When to use**: CI/CD integration, automated experiment tracking.

---

## Required Sections

### 1. Hypothesis

**Purpose**: What are we testing?

**Requirements**:

- Clear, testable hypothesis
- Predicted outcome
- Rationale for hypothesis

**Common Issues**:

- `[experiment-gap]` — Hypothesis unclear or not testable
- `[logic-drift]` — Hypothesis doesn't align with metrics

**Good Example**:

```markdown
## Hypothesis

**Primary Hypothesis**:
Adding real-time order tracking to the food delivery app will reduce
order cancellations by 40% (from 15% to 9%) by increasing user
confidence in delivery timing.

**Rationale**:
- 60% of cancellations cite "late delivery" as reason
- Real-time tracking reduced cancellations in similar apps
- Pilot study showed 35% reduction in cancellations

**Predicted Outcome**:
- Treatment group (with tracking): 9% cancellation rate
- Control group (without tracking): 15% cancellation rate
- Statistical significance: 95% confidence, power 80%
```

**Weak Example**:

```markdown
## Hypothesis

We think real-time tracking will help.
```

---

### 2. Background / Context

**Purpose**: What is the context?

**Requirements**:

- Current state
- Why this experiment is needed
- Previous learnings (if any)

**Common Issues**:

- `[evidence-gap]` — Context not provided

**Good Example**:

```markdown
## Background

**Current State**:
- 15% of food delivery orders are cancelled
- Top cancellation reason: "late delivery" (60%)
- Current ETA accuracy: ±45 minutes

**Problem**:
- Users lose confidence when ETAs are inaccurate
- No visibility into order progress
- Customer support costs high due to cancellation complaints

**Previous Learnings**:
- Email notification of order status reduced cancellations by 10%
- Competitor apps with real-time tracking show 8% cancellation rate
```

**Weak Example**:

```markdown
## Background

Orders get cancelled a lot.
```

---

### 3. Target Population

**Purpose**: Who is in the experiment?

**Requirements**:

- Inclusion criteria
- Exclusion criteria
- Population size

**Common Issues**:

- `[segment-fog]` — Target population unclear
- `[experiment-gap]` — Selection bias not addressed

**Good Example**:

```markdown
## Target Population

**Inclusion Criteria**:
- Active food delivery users (ordered 3+ times in past 30 days)
- Age 25-45
- Urban areas (top 10 metros)
- iOS or Android app users

**Exclusion Criteria**:
- New users (first order < 7 days ago)
- Business accounts
- Guest orders (not logged in)

**Population Size**:
- Eligible users: 12,000
- Expected exposure: 10,000 (accounting for opt-out)
- Duration: 4 weeks
```

**Weak Example**:

```markdown
## Target Population

All food delivery users.
```

---

### 4. Control / Treatment Definition

**Purpose**: What are we comparing?

**Requirements**:

- Control group definition
- Treatment group definition
- Randomization method

**Common Issues**:

- `[experiment-gap]` — Control/treatment not clearly defined
- `[logic-drift]` — Treatment doesn't test hypothesis

**Good Example**:

```markdown
## Control / Treatment

**Control Group**:
- Current app experience (no real-time tracking)
- ETA notification at order + checkout + delivery
- No order progress visibility

**Treatment Group**:
- Real-time order tracking enabled
- Live map view of driver location
- Real-time ETA updates every 30 seconds
- Order status notifications (preparing, picked up, on way)

**Randomization**:
- Random assignment at user level
- 50% control, 50% treatment
- Stratified by city (ensure balanced city distribution)
- Assignment persistent for 4 weeks
```

**Weak Example**：

```markdown
## Control / Treatment

Control: Current app
Treatment: New tracking feature
```

---

### 5. Primary Metric

**Purpose**: How do we measure success?

**Requirements**:

- Single primary metric
- Clear definition
- Calculation formula
- Success threshold

**Common Issues**:

- `[metric-fog]` — Primary metric unclear
- `[experiment-gap]` — Metric doesn't test hypothesis

**Good Example**:

```markdown
## Primary Metric

**Order Cancellation Rate**

**Definition**:
Percentage of orders cancelled after placement but before delivery.

**Calculation**:
```
cancellation_rate = orders_cancelled / orders_placed
```

**Measurement**:
- Measured at order level
- Aggregated per user
- Excluded: Restaurant cancellations, system errors

**Success Threshold**:
- Target: 9% cancellation rate (treatment) vs 15% (control)
- Minimum Detectable Effect (MDE): 40% relative reduction
- Statistical significance: p < 0.05 (two-tailed)
- Power: 80%
```

**Weak Example**:

```markdown
## Primary Metric

We'll measure if orders are cancelled less.
```

---

### 6. Secondary Metrics

**Purpose**: What else might change?

**Requirements**:

- List of secondary metrics
- Clear definitions
- Expected direction (if known)

**Common Issues**:

- `[metric-fog]` — Secondary metrics undefined
- `[experiment-gap]` — Too many metrics (multiple testing risk)

**Good Example**:

```markdown
## Secondary Metrics

**User Engagement**:
- App opens per day (expected: +15%)
- Session duration (expected: +10%)
- Order frequency (expected: no change)

**Business Metrics**:
- Order value (expected: no change)
- Repeat order rate (expected: +5%)
- Support tickets related to ETAs (expected: -30%)

**Technical Metrics**:
- API latency for tracking (expected: < 200ms p95)
- Push notification delivery rate (expected: > 98%)
```

**Weak Example**:

```markdown
## Secondary Metrics

We'll track engagement and other stuff.
```

---

### 7. Guardrail Metrics

**Purpose**: What protects us from harm?

**Requirements**:

- List of guardrail metrics
- Failure thresholds
- Rollback triggers

**Common Issues**:

- `[experiment-gap]` — Guardrail metrics missing

**Good Example**:

```markdown
## Guardrail Metrics

**User Experience**:
- App crash rate: < 0.1% (rollback if exceeded)
- App load time: < 3 seconds (rollback if exceeded)
- Battery drain: < 5% increase (rollback if exceeded)

**Business**:
- Order value: No decrease > 5% (rollback if exceeded)
- Restaurant rating: No decrease > 0.2 points (rollback if exceeded)
- Customer support contacts: No increase > 20% (rollback if exceeded)

**Operational**:
- API error rate: < 0.5% (rollback if exceeded)
- Push notification failure rate: < 2% (rollback if exceeded)
```

**Weak Example**:

```markdown
## Guardrail Metrics

We'll watch for bad stuff.
```

---

### 8. Randomization Unit

**Purpose**: What is the unit of randomization?

**Requirements**:

- Randomization unit (user, order, session)
- Rationale for choice
- Potential biases addressed

**Common Issues**:

- `[experiment-gap]` — Randomization unit unclear

**Good Example**:

```markdown
## Randomization Unit

**Unit**: User-level randomization

**Rationale**:
- Cancellation behavior is per-user
- Avoids order-level learning effects
- Enables persistent assignment

**Potential Biases**:
- Network effects: Users in same household may be different groups
  → Mitigation: Exclude household orders from analysis
- Time-of-day: Users may order at different times
  → Mitigation: Stratify by time-of-day in analysis
```

**Weak Example**：

```markdown
## Randomization Unit

We'll randomize by user.
```

---

### 9. Sample Size / Duration Assumptions

**Purpose**: How long and how many?

**Requirements**:

- Sample size calculation
- Duration estimate
- Power analysis

**Common Issues**:

- `[experiment-gap]` — Sample size not calculated
- `[overclaim]` — Duration unrealistic

**Good Example**:

```markdown
## Sample Size / Duration

**Sample Size Calculation**:
- Baseline cancellation rate: 15%
- Target cancellation rate: 9%
- Minimum Detectable Effect: 40% relative reduction
- Statistical power: 80%
- Significance level: 0.05
- Required sample: 4,600 orders per group

**Duration Estimate**:
- Average orders per user per week: 1.2
- Required users: ~4,000 per group
- Eligible population: 12,000 users
- Expected exposure: 10,000 users
- Estimated duration: 4 weeks

**Power Analysis**:
- With 10,000 users exposed for 4 weeks
- We can detect 35% relative reduction with 80% power
- We can detect 25% relative reduction with 60% power
```

**Weak Example**:

```markdown
## Sample Size / Duration

We'll run it for a month with enough users.
```

---

### 10. Minimum Detectable Effect

**Purpose**: What's the smallest effect we can detect?

**Requirements**:

- MDE calculation
- Practical significance
- Business relevance

**Common Issues**:

- `[experiment-gap]` — MDE not calculated

**Good Example**:

```markdown
## Minimum Detectable Effect (MDE)

**Statistical MDE**:
- With 80% power and 95% confidence
- We can detect 35% relative reduction in cancellation rate
- From 15% baseline to 9.75% treatment

**Practical Significance**:
- 35% reduction = 5.25 percentage points
- Translates to $12K/month in savings (at $48K/month baseline)
- Business-relevant effect size

**Smaller Effects**:
- If true effect is 25% reduction (15% → 11.25%)
- We have 60% power to detect this
- May need extended duration for conclusive results
```

**Weak Example**:

```markdown
## Minimum Detectable Effect

We'll be able to detect meaningful changes.
```

---

### 11. Instrumentation Plan

**Purpose**: How do we collect data?

**Requirements**:

- Data collection method
- Event tracking
- Quality checks

**Common Issues**:

- `[experiment-gap]` — Instrumentation not planned

**Good Example**:

```markdown
## Instrumentation

**Event Tracking**:
- `order_placed`: User places order
- `order_cancelled`: User cancels order (with reason)
- `tracking_viewed`: User views tracking screen
- `notification_sent`: Push notification sent
- `notification_opened`: User opens notification
- `app_error`: App error or crash

**Data Quality Checks**:
- Tracking coverage: > 99% of orders
- Event timestamp accuracy: ±1 second
- User ID persistence: 100% (no ID changes)

**Verification**:
- Smoke test: 1% traffic for 24 hours before full rollout
- Dashboard: Real-time monitoring of key metrics
- Alerts: Anomaly detection on metric deviations
```

**Weak Example**:

```markdown
## Instrumentation

We'll track everything we need.
```

---

### 12. Sample Ratio Mismatch Risk

**Purpose**: What if groups aren't balanced?

**Requirements**:

- SRM check plan
- Mitigation strategies

**Common Issues**:

- `[experiment-gap]` — SRM not addressed

**Good Example**:

```markdown
## Sample Ratio Mismatch (SRM)

**Risk**:
- If randomization fails, groups may be imbalanced
- Could invalidate experiment results

**Detection**:
- Chi-square test for group balance
- Checked daily during experiment
- Alert if p < 0.01 (significant imbalance)

**Mitigation**:
- If SRM detected:
  1. Investigate randomization logic
  2. Check for technical issues
  3. Re-randomize if needed
  4. Extend duration if data lost

**Expected Balance**:
- Target: 50% control, 50% treatment
- Acceptable range: 48-52%
- Alert threshold: < 45% or > 55%
```

**Weak Example**:

```markdown
## Sample Ratio Mismatch

We'll check if groups are balanced.
```

---

### 13. Stopping Rule

**Purpose**: When do we stop?

**Requirements**:

- Success stopping rule
- Futility stopping rule
- Harm stopping rule

**Common Issues**:

- `[experiment-gap]` — Stopping rule not defined

**Good Example**:

```markdown
## Stopping Rules

**Success Stopping Rule**:
- Stop early if:
  - P-value < 0.01 (strong evidence)
  - AND guardrail metrics not violated
  - AND minimum 2 weeks elapsed
  - Repeated over 3 consecutive days

**Futility Stopping Rule**:
- Stop for futility if:
  - P-value > 0.5 (no effect observed)
  - AND power analysis shows < 30% power to detect MDE
  - AND minimum 3 weeks elapsed
  - Team consensus to stop

**Harm Stopping Rule**:
- Stop immediately if:
  - Guardrail metric violated (crash rate, app load time, etc.)
  - Order value decreases > 5%
  - Restaurant rating decreases > 0.2 points
  - Customer support contacts increase > 20%
```

**Weak Example**：

```markdown
## Stopping Rules

We'll stop when we have enough data.
```

---

### 14. Decision Rule

**Purpose**: How do we decide?

**Requirements**:

- Decision criteria
- Statistical thresholds
- Business criteria

**Common Issues**:

- `[missing-decision]` — Decision rule not defined

**Good Example**:

```markdown
## Decision Rule

**Decision Criteria**:
- **Launch if**:
  - P-value < 0.05 (statistically significant)
  - Cancellation rate ≤ 10% (treatment group)
  - Guardrail metrics not violated
  - Secondary metrics show no negative impact

- **Do Not Launch if**:
  - P-value ≥ 0.05 (not statistically significant)
  - OR Cancellation rate > 12% (treatment group)
  - OR Guardrail metrics violated

- **Extended Test if**:
  - P-value between 0.05 and 0.10 (trend but not significant)
  - AND No guardrail violations
  - AND Business case suggests potential value

**Statistical Threshold**:
- Significance level: α = 0.05 (two-tailed)
- Power: 80%
- Minimum effect: 35% relative reduction

**Business Threshold**:
- Minimum viable reduction: 25% (15% → 11.25%)
- Target reduction: 40% (15% → 9%)
```

**Weak Example**:

```markdown
## Decision Rule

We'll launch if it works.
```

---

### 15. Rollback Plan

**Purpose**: How do we rollback?

**Requirements**:

- Rollback triggers
- Rollback process
- Timeline

**Common Issues**:

- `[experiment-gap]` — Rollback not planned

**Good Example**:

```markdown
## Rollback Plan

**Rollback Triggers**:
- Guardrail metric violated (see Guardrail Metrics)
- Technical issues (API errors, crashes)
- Negative user feedback (support tickets > 20% increase)

**Rollback Process**:
1. Disable feature flag (instant)
2. Notify team (within 5 minutes)
3. Post-mortem (within 24 hours)
4. Fix issues (if technical)
5. Consider re-launch (if business case remains)

**Timeline**:
- Feature flag disable: Instant (< 1 minute)
- Full rollback to control: Complete within 1 hour
- Data preservation: All data saved for analysis

**Communication**:
- Internal: Engineering, product, data science teams
- External: No communication needed (feature not announced)
```

**Weak Example**:

```markdown
## Rollback Plan

We'll turn it off if needed.
```

---

### 16. Interpretation Risks

**Purpose**: What could we misinterpret?

**Requirements**:

- Potential misinterpretations
- Confounding factors
- Limitations

**Common Issues**:

- `[experiment-gap]` — Interpretation risks not addressed

**Good Example**：

```markdown
## Interpretation Risks

**Risk 1: Novelty Effect**
- Users may engage more because feature is new
- Mitigation: Measure effect over time, look for decay

**Risk 2: Network Effects**
- Users may tell friends in control group about feature
- Mitigation: Exclude users with shared addresses/households

**Risk 3: Seasonality**
- Order patterns may change due to weather, holidays
- Mitigation: Compare against same period last year

**Risk 4: Selection Bias**
- Users who opt out may be different
- Mitigation: Compare opt-outs vs participants

**Limitations**:
- Results apply to urban users 25-45 (not all users)
- Short-term experiment (4 weeks) may miss long-term effects
- iOS/Android only (not web users)
```

**Weak Example**：

```markdown
## Interpretation Risks

We'll try not to misinterpret the results.
```

---

### 17. Decision Ask

**Purpose**: What decision is needed?

**Requirements**:

- Clear decision request
- Who decides
- When decision needed

**Common Issues**:

- `[missing-decision]` — Decision ask not stated

**Good Example**:

```markdown
## Decision Ask

**Request**: Approval to launch A/B test

**Decision Maker**: Product Lead + Data Science Lead

**Timeline**: Decision needed by EOD Friday, June 20

**Information Needed**:
- Experiment design approval
- Resource availability (tracking implementation)
- Risk assessment complete

**Decision Options**:
1. Approve experiment launch
2. Request design changes
3. Reject (with rationale)
```

**Weak Example**：

```markdown
## Decision Ask

Please approve this experiment.
```

---

## Quality Dimensions

### Hypothesis Clarity (20%)

- Hypothesis clear and testable
- Predicted outcome stated
- Rationale provided

### Metric Quality (20%)

- Primary metric well-defined
- Success threshold clear
- Measurement method defined

### Experimental Design (15%)

- Control/treatment well-defined
- Randomization appropriate
- Sample size calculated

### Decision Rule (15%)

- Decision criteria clear
- Statistical thresholds defined
- Business criteria stated

### Guardrail Metrics (10%)

- Guardrail metrics defined
- Rollback triggers clear
- User protection adequate

### Instrumentation (10%)

- Data collection planned
- Quality checks defined
- Verification process clear

### Sample Assumptions (10%)

- Sample size justified
- Duration realistic
- Power analysis provided

---

## Score Caps

- No hypothesis → max score 55
- No primary metric → max score 50
- No decision rule → max score 55
- No guardrail metrics → max score 70

---

## Common Issues

### Experiment Gap

**Pattern**: Experimental design issue

**Example**:

```text
"We'll compare before and after"
[WITHOUT control group, confounding variables addressed]
```

**Finding**: `[experiment-gap]`

**Fix**: Design proper A/B test with control group.

---

### Metric Fog

**Pattern**: Metric unclear

**Example**:

```text
"We'll measure user engagement"
[WITHOUT clear definition or calculation]
```

**Finding**: `[metric-fog]`

**Fix**: Define specific metric with calculation and threshold.

---

## Examples

### Good Experiment Plan

- Clear hypothesis with predicted outcome
- Well-defined control/treatment
- Primary metric with success threshold
- Guardrail metrics with rollback triggers
- Decision rule with statistical thresholds

### Weak Experiment Plan

- Hypothesis unclear
- Control/treatment not defined
- No primary metric
- No guardrail metrics
- No decision rule

---

## Usage

### For Writers

Use this document to:

- Structure your experiment plan
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

### What if my experiment is simple?

Simple experiments are supported. Ensure core sections:

- Hypothesis
- Control/treatment
- Primary metric
- Decision rule

### What if my experiment is for an AI feature?

Add AI-specific sections:

- Model performance metrics
- User experience metrics
- Cost metrics

### What if I don't have all metrics?

Missing metrics triggers findings and score caps. Include all required metrics.

---

**docs/document-requirements/experiment-plan-requirements.md defines Experiment Plan requirements.**

**Use these requirements to write better experiment plans and understand review findings.**
