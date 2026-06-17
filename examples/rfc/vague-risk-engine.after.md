# Risk Engine RFC (After)

## Context

Our current fraud detection system is manual, review-based, and processes ~500 transactions/day with a 2-week review backlog. We need to build an automated risk assessment engine that scales to 50,000 transactions/day by end of year.

## Technical Proposal

We'll implement a gradient boosting model (XGBoost) that analyzes 50+ features per transaction including:

**Features**:
- Transaction amount and velocity
- Merchant category risk score
- Geographic risk patterns
- User behavior patterns
- Device fingerprinting anomalies
- Time-of-day patterns

**Architecture**:
- Feature extraction service (Python/Scala)
- Model inference service (TensorFlow Serving)
- Real-time scoring API (existing gateway integration)
- Model training pipeline (Airflow)

**Data Contracts**:
- Input: Transaction event stream
- Output: Risk score (0-1) + confidence interval

## Alternatives Considered

**Alternative 1: Rule-based system**
- Pros: Simple, explainable, fast to implement
- Cons: High maintenance, can't catch complex patterns
- Revenue: $50K potential (lost fraud)
- Rejected: Too brittle for scale

**Alternative 2: Deep learning (LSTM)**
- Pros: Can catch sequential patterns
- Cons: Requires 6+ months development, needs large training set
- Revenue: $100K additional cost
- Rejected: Over-engineering for current needs

**Chosen Approach**: Gradient boosting (XGBoost)
- Why: Best balance of accuracy (85% true positive rate), explainability, and 3-month timeline
- Risks: Feature engineering dependency, model drift
- Mitigation: Monthly model retraining, feature monitoring

## Trade-offs

**Trade-off 1: Accuracy vs Latency**
- Choice: Prioritize accuracy over latency
- Rationale: Fraud causes more damage than +200ms latency
- Mitigation: Accept +200ms latency (p95), monitor user impact

**Trade-off 2: Model Complexity vs Interpretability**
- Choice: XGBoost over simpler models
- Rationale: 15% accuracy improvement worth complexity
- Mitigation: SHAP values for explainability, audit monthly

**Trade-off 3: False Positives vs False Negatives**
- Choice: Bias toward false negatives (catch fraud) over false positives
- Rationale: Missed fraud costs $500 per transaction, false positives cost $5 in review
- Mitigation: Adjustable threshold based on merchant risk profile

## System Boundaries

**In Scope**:
- Real-time transaction scoring
- Model training and evaluation
- Feature extraction and monitoring

**Out of Scope**:
- Identity verification (separate system)
- Manual review workflow (existing system, will integrate)
- Case management system (existing system)

**Integration Points**:
- Transaction event stream (Kafka)
- Merchant database (PostgreSQL)
- User profile service (REST API)
- Manual review queue (SQS)

## Dependencies

**Technical**:
- Feature extraction pipeline (needs new development)
- Model serving infrastructure (TensorFlow Serving)
- Training data warehouse (Snowflake, existing)

**Team**:
- Data science team: Model development and training
- Engineering team: Production integration
- DevOps: Infrastructure setup

**External**:
- None (all internal systems)

## Security / Privacy

**Threat Model**:
- Adversaries attempting to bypass detection
- Data poisoning in training data
- Model inversion attacks

**Security Requirements**:
- PII not used for training (anonymized)
- Model weights encrypted at rest
- Access logging for model predictions
- Quarterly security review

## Failure Modes

**Failure Mode 1: Model Performance Drift**
- Impact: Increased false positives/negatives
- Detection: Monitoring precision/recall weekly
- Mitigation: Monthly model retraining, rollback to previous model

**Failure Mode 2: Feature Pipeline Failure**
- Impact: No scores generated
- Detection: Health check on feature pipeline
- Mitigation: Fallback to rule-based system

**Failure Mode 3: High Latency**
- Impact: Transaction delays
- Detection: Latency monitoring (alert if > 500ms p95)
- Mitigation: Timeout and fallback to rules

## Observability

**Metrics**:
- Model precision: Target > 90%
- Model recall: Target > 85%
- Scoring latency: p95 < 200ms
- Feature pipeline uptime: > 99.9%

**Logging**:
- Model predictions (no PII)
- Feature values (no PII)
- System health events

**Alerting**:
- Precision < 85% for 2+ consecutive weeks
- Recall < 80% for 1+ week
- Latency > 500ms p95 for 5+ minutes

## Rollout / Rollback Plan

**Rollout Strategy**:
- Week 1-2: Shadow mode (parallel with manual review)
- Week 3-4: Gradual traffic (10%, 25%, 50%, 100%)
- Week 5-8: Full production

**Rollback Plan**:
- Triggers: Precision < 85% OR Latency > 500ms p95
- Action: Revert to previous model, investigate, fix, redeploy
- Timeline: Complete within 1 hour

**Success Criteria**:
- Precision > 90% AND Recall > 85%
- Latency < 200ms p95
- No increase in manual review backlog

## Test Plan

**Unit Tests**:
- Feature extraction modules
- Model training pipeline
- Scoring API endpoints

**Integration Tests**:
- End-to-end scoring with test transactions
- Model retraining pipeline
- Rollback process

**Load Tests**:
- 10,000 transactions per minute (peak load)
- Feature extraction performance
- Model inference latency

## Open Questions

1. **Feature Engineering Priority**
   - Owner: Data Science Lead
   - Timeline: Decision by Friday, June 20
   - Question: Which of 50 candidate features should we prioritize for MVP?

2. **Retraining Frequency**
   - Owner: ML Engineer
   - Timeline: Decision by Monday, June 23
   - Question: Monthly retraining sufficient or need more frequent?

3. **False Positive Feedback Loop**
   - Owner: Product Manager
   - Timeline: Decision by Friday, June 21
   - Question: How do we incorporate manual review feedback into model?

## Decision Ask

**Request**: Approval to implement automated risk assessment engine

**Decision Maker**: Tech Lead + Engineering Manager + Fraud Operations Lead

**Timeline**: Decision needed by EOD Wednesday, June 19

**Information Needed**:
- Technical feasibility confirmed
- Resource availability (2 engineers, 1 data scientist)
- Risk assessment complete
- Cost estimate approved ($180K for development + infrastructure)

**Decision Options**:
1. Approve implementation with XGBoost
2. Approve with rule-based system first
3. Request additional technical detail
4. Reject (with rationale)
