# Checkout A/B Test Plan (After)

## Hypothesis

Adding a progress bar to checkout will increase order completion rate by 15 percentage points (relative lift).

**Rationale**:
- Current checkout abandonment: 25%
- User research: 60% cite "don't know how long" as reason
- Competitor A saw 18% reduction with progress bar
- Internal A/B test (email notification) showed 10% reduction

## Background

**Current State**:
- Checkout abandonment rate: 25%
- Current checkout: 3 steps, no progress indication
- User frustration: High support ticket volume

**Problem**:
- Users don't know how long checkout will take
- Users may abandon if they think it will take too long
- No visibility creates anxiety and uncertainty

## Target Population

**Inclusion Criteria**:
- Users who reach checkout page (intent to purchase)
- Age 25-45 (primary demographic)
- Desktop and mobile users

**Exclusion Criteria**:
- Guest checkout
- First-time users (learning curve effect)
- High-risk transactions (security review)

**Population Size**:
- Eligible users: 40,000 per month
- Expected exposure: 35,000 (after opt-out)
- Duration: 4 weeks

## Control / Treatment

**Control Group**:
- Current checkout experience (3 steps, no progress indication)
- Standard processing and validation

**Treatment Group**:
- Current checkout + progress bar
- Progress bar shows: Shipping → Billing → Confirmation
- Real-time updates at each step
- Estimated time remaining displayed

**Randomization**:
- User-level randomization
- 50% control, 50% treatment
- Stratified by platform (iOS, Android)

## Primary Metric

**Metric Name**: Checkout Completion Rate

**Definition**:
```
completion_rate = orders_completed / orders_started
```

**Measurement**:
- Measured at order level
- Aggregated per user
- Excluded: Restaurant cancellations, system errors, fraud

**Success Threshold**:
- Target: 28.75% (from 25%)
- Minimum Detectable Effect (MDE): 10% relative lift
- Statistical significance: p < 0.05 (two-tailed)
- Power: 80%

**Baseline**:
- Current completion rate: 25%
- Standard deviation (historical): 2%

## Secondary Metrics

**Time to Complete**:
- Target: No increase in time
- Threshold: +5% maximum increase

**Cart Abandonment**:
- Target: Maintain current rate or slight decrease
- Threshold: No increase > 2%

**User Satisfaction**:
- Target: CSAT score maintain ≥ 4.0/5
- Threshold: No decrease > 0.2 points

## Guardrail Metrics

**User Experience**:
- App crash rate: < 0.1% (rollback if exceeded)
- Page load time: < 3 seconds (rollback if exceeded)
- Checkout API latency: < 500ms (p95, rollback if exceeded)

**Business**:
- Order value: No decrease > 2% (rollback if exceeded)
- Restaurant ratings: No decrease > 0.2 points (rollback if exceeded)

**Operational**:
- API error rate: < 0.5% (rollback if exceeded)
- Support tickets: No increase > 10% (rollback if exceeded)

## Sample Size / Duration

**Sample Size Calculation**:
- Baseline rate: 25%
- Target rate: 28.75% (10% relative lift)
- MDE: 10% relative lift (conservative)
- Power: 80%
- Significance: p < 0.05 (two-tailed)
- Required sample: 4,600 per group

**Duration Estimate**:
- Average checkout rate: 0.8 transactions/user/week
- Required users: ~4,000 per group
- Eligible population: 40,000/month
- Estimated duration: 4 weeks to reach required sample

**Minimum Detectable Effect**:
- With 80% power: 10% relative lift
- With 60% power: 13% relative lift
- Business relevance: 10% lift is meaningful

## Instrumentation Plan

**Event Tracking**:
- `checkout_started`: User enters checkout
- `step_completed`: Each checkout step completed
- `checkout_completed`: Order confirmed
- `checkout_abandoned`: User exits without completing

**Data Quality Checks**:
- Tracking coverage: > 99% of checkouts
- Event timestamp accuracy: ±1 second
- User ID persistence: 100% (no ID changes during experiment)

**Verification**:
- Smoke test: 1% traffic for 24 hours before full rollout
- Dashboard: Real-time monitoring of key metrics
- Alerts: Anomaly detection on metric deviations

## Sample Ratio Mismatch

**Risk**: Randomization may result in imbalanced groups

**Detection**:
- Chi-square test for group balance
- Checked: Daily
- Alert threshold: p < 0.01 (significant imbalance)

**Mitigation**:
- If SRM detected:
  1. Investigate randomization logic
  2. Check for technical issues
  3. Re-randomize if needed (last resort)

## Stopping Rules

**Success Stopping Rule**:
- Stop early if:
  - p < 0.01 (strong evidence)
  - AND relative lift ≥ 10% (business meaningful)
  - AND guardrail metrics not violated
  - AND minimum 3 weeks elapsed
  - Verified over 3 consecutive days

**Futility Stopping Rule**:
- Stop for futility if:
  - p > 0.5 (no effect detected)
  - AND power analysis shows < 30% power to detect MDE
  - AND minimum 3 weeks elapsed
  - Team consensus to stop

**Harm Stopping Rule**:
- Stop immediately if:
  - Guardrail metric violated (see Guardrail Metrics)
  - Order value decreases > 2%
  - Restaurant ratings decrease > 0.2 points

## Decision Rule

**Decision Criteria**:
- **Launch if**:
  - p-value < 0.05 (statistically significant)
  - AND treatment completion rate > control
  - AND guardrail metrics not violated
  - AND minimum 3 weeks elapsed

- **Do Not Launch if**:
  - p-value ≥ 0.05 (not statistically significant)
  - OR completion rate decreases
  - OR guardrail metrics violated

**Statistical Threshold**:
- Significance level: α = 0.05 (two-tailed)
- Power: 80%
- Minimum effect: 10% relative lift

**Business Threshold**:
- Minimum viable lift: 10% relative lift
- Target lift: 15% relative lift

## Rollback Plan

**Rollback Triggers**:
- App crash rate > 0.1%
- Page load time > 3 seconds
- Order value decreases > 2%
- CSAT decreases > 0.2 points

**Rollback Process**:
1. Disable progress bar feature flag
2. Verify checkout returns to normal
3. Monitor metrics for 24 hours
4. Investigate and fix issues if needed

**Timeline**:
- Complete rollback within 30 minutes
- Full validation within 1 hour

**Communication**:
- Internal: Engineering, Product, Data Science teams
- External: No communication (feature not visible)

## Interpretation Risks

**Risk 1: Novelty Effect**
- Users engage more because feature is new
- Mitigation: Measure effect over time, look for decay

**Risk 2: Selection Bias**
- Users who opt-in may be different
- Mitigation: Compare opted-in vs opted-out users

**Risk 3: Seasonality**
- Order patterns change due to time of year
- Mitigation: Compare against same period last year

**Limitations**:
- Results apply to checkout optimization only
- Does not address other abandonment reasons
- Short-term experiment (4 weeks)
- Desktop and mobile only (not web)

## Decision Ask

**Request**: Approval to launch A/B test

**Decision Maker**: Product Lead + Data Science Lead

**Timeline**: Decision needed by EOD Friday, June 21

**Information Needed**:
- Sample size calculation approved
- Technical implementation confirmed
- Risk assessment complete

**Decision Options**:
1. Launch A/B test (recommended)
2. Request design changes
3. Reject (with rationale)
