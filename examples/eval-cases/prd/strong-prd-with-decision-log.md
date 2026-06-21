# Fraud-Aware Promo Eligibility

## Context
We need to update our promo eligibility system to prevent fraud while maintaining a good user experience for legitimate customers. Current system allows new accounts to immediately receive promos, leading to abuse.

## Customer Problem
Legitimate new customers expect promos when they sign up, but we need to prevent fraudsters from creating multiple accounts to abuse promo codes.

## Business Problem
- Promo abuse costs: $50K/month in fraudulent discounts
- Legitimate customer acquisition impact: Unknown
- Current approval rate: 85% of sign-ups receive promos

## Goals
1. Reduce promo abuse by 80%
2. Maintain promo approval rate for legitimate customers ≥ 80%
3. Minimize friction for genuine new customers

## Success Metrics

### Primary Metric
- Fraud detection rate: ≥ 90% of fraudulent accounts blocked
- Legitimate customer approval rate: ≥ 80%

### Proxy Metrics
- Time to approval: < 5 seconds for 95% of users
- False positive rate: < 5% of legitimate customers incorrectly blocked
- Customer support tickets related to promo eligibility: < 50 per week

### Guardrail Metrics
- Customer acquisition rate must not decrease by > 5%
- CSAT score for new sign-ups must remain ≥ 4.0/5
- Promo conversion rate must remain ≥ 25% for approved users

## Evidence

### Baseline Data
- Current new sign-ups: 10,000 per week
- Current promo abuse rate: 15% of sign-ups
- Current cost per fraudulent sign-up: $25
- Average order value for legitimate customers: $45

### Customer Feedback
- Support tickets show frustration when promos are delayed
- No complaints about eligibility requirements from legitimate users

## Proposed Solution

### Requirements
1. Implement risk-based eligibility check
2. Use multiple signals to assess legitimacy
3. Provide clear feedback to blocked users

### Functional Requirements
- Check email domain reputation
- Validate phone number (if provided)
- Assess IP address risk
- Check for duplicate account indicators
- Require additional verification for high-risk sign-ups

### Non-Functional Requirements
- Eligibility check must complete in < 5 seconds
- System must handle 10,000 sign-ups per hour
- Must maintain 99.9% uptime
- All decisions must be auditable

### Non-Goals
- Changing promo amounts or types
- Implementing full identity verification
- Blocking international sign-ups

## Decision Log

### Decision 1: Risk-Based Eligibility
**Decision:** Use risk scoring (0-100) to determine promo eligibility
**Rationale:** Binary approve/deny is too blunt. Risk scoring allows graduated response.
**Alternatives Considered:**
- Manual review (too slow at scale)
- Block all new accounts (too restrictive)
- Current system (too permissive)
**Chosen Option:** Risk scoring with graduated thresholds
**Rejected Options:**
- Manual review: Cannot scale to 10K sign-ups/week
- Block all: Would significantly impact customer acquisition
**Owner:** Sarah Chen (Product)
**Date:** 2024-01-15

### Decision 2: Signals for Risk Assessment
**Decision:** Use email domain, IP address, phone, and behavioral signals
**Rationale:** Multiple signals provide better fraud detection than any single signal
**Alternatives Considered:**
- Email domain only (insufficient)
- Device fingerprinting (privacy concerns)
**Chosen Option:** Multi-signal approach with weighted scoring
**Trade-offs:**
- More signals = better detection but higher latency
- Added complexity vs. improved accuracy
**Owner:** Mike Johnson (Engineering)
**Date:** 2024-01-16

### Decision 3: High-Risk Handling
**Decision:** Require additional verification for high-risk sign-ups
**Rationale:** Allows legitimate users to prove identity while blocking fraudsters
**Alternatives Considered:**
- Auto-block high-risk (too restrictive)
- Auto-approve with monitoring (too permissive)
**Chosen Option:** Additional verification (SMS or email)
**Trade-offs:**
- Added friction for high-risk users vs. reduced fraud
**Owner:** Sarah Chen (Product)
**Date:** 2024-01-17

## Risks & Mitigations

### Product Risk
**Risk:** Legitimate customers may be blocked or delayed
**Impact:** High - could reduce customer acquisition
**Mitigation:** Monitor false positive rate, provide easy appeal process
**Owner:** Sarah Chen

### Business Risk
**Risk:** Promo fraud may shift to other channels
**Impact:** Medium - doesn't solve root problem
**Mitigation:** Coordinate with fraud team on broader strategy
**Owner:** David Lee (Fraud)

### Technical Risk
**Risk:** Risk scoring may have latency issues
**Impact:** High - could slow sign-up flow
**Mitigation:** Implement caching, optimize scoring algorithm, set timeouts
**Owner:** Mike Johnson

### Legal/Compliance Risk
**Risk:** Risk scoring could have disparate impact
**Impact:** High - potential regulatory issues
**Mitigation:** Review with legal, test for bias, maintain audit trail
**Owner:** Legal Team

### Operational Risk
**Risk:** Increased support tickets from blocked users
**Impact:** Medium - support cost increase
**Mitigation:** Provide clear rejection reasons, train support team
**Owner:** Support Lead

### Team/Resource Risk
**Risk:** Engineering capacity constraint for implementation
**Impact:** Medium - could delay launch
**Mitigation:** Phase rollout, prioritize critical features
**Owner:** Mike Johnson

## Rollout Plan

### Phase 1: Internal Testing (Week 1)
- Deploy to staging environment
- Test with internal accounts
- Validate risk scoring logic

### Phase 2: Beta Launch (Week 2-3)
- Launch to 5% of new sign-ups
- Monitor metrics closely
- Gather feedback from support team

### Phase 3: Gradual Rollout (Week 4-6)
- Increase to 25% if metrics are healthy
- Increase to 50% after 1 week at 25%
- Increase to 100% after 1 week at 50%

### Rollback Plan
If any of the following occur, immediately rollback to previous system:
- Fraud detection rate < 70%
- Legitimate customer approval rate < 70%
- Customer acquisition rate decrease > 10%
- System latency > 10 seconds (p95)
- Support ticket increase > 200%

## Experiment Plan

### Hypothesis
Risk-based eligibility will reduce promo fraud by 80% while maintaining ≥ 80% legitimate customer approval rate.

### Experiment Design
- **Duration:** 6 weeks
- **Sample Size:** 60,000 new sign-ups (10K/week)
- **Design:** A/B test with 50% control (current system), 50% treatment (new system)
- **Randomization:** User ID based
- **Decision Rule:** Launch if fraud reduction ≥ 80% AND legitimate approval rate ≥ 80%

### Success Criteria
- Fraud reduction ≥ 80% (statistically significant, p < 0.05)
- Legitimate approval rate ≥ 80% (statistically significant, p < 0.05)
- No increase in support tickets per new sign-up

## Owners

**Product Owner:** Sarah Chen (sarahr@company.com)
**Engineering Owner:** Mike Johnson (mikej@company.com)
**Data Owner:** Lisa Wang (lisaw@company.com)
**Ops Owner:** Tom Brown (tomb@company.com)
**Approver:** VP Product, VP Engineering

## Timeline
- **Phase 1:** Week of Jan 22
- **Phase 2:** Week of Feb 5
- **Phase 3:** Week of Feb 19
- **Complete:** Week of Mar 4

## Dependencies
- SMS provider integration (for additional verification)
- Data science team (risk scoring model)
- Legal review (compliance)
