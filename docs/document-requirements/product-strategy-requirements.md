# Product Strategy Requirements

**Requirements for Product Strategy documents in Shokunin Review MVP 1.**

---

## Overview

Product Strategy is a **strategic choice document**.

It answers: **What strategic thesis are we proposing, which segment matters, what pain does it address, what opportunity exists, why now, what options were considered, what trade-offs do we make, what will we not do, how should work be sequenced, what metrics prove progress?**

---

## Main Question

**What strategic choice should we make?**

---

## Primary Layer

**Product / business strategy**

---

## Main Risk

**Choosing a vague direction without evidence**

---

## Common Product Strategy Types

### Product Strategy Memo

Traditional strategy memo format.

**Structure**: Thesis, evidence, choices, metrics, sequencing.

**When to use**: Strategic pivots, new initiatives, product direction changes.

### Narrative Strategy Doc

Story-driven strategy document.

**Structure**: Customer narrative, problem, solution, opportunity.

**When to use**: Customer-centric strategies, new market entry, product vision.

### Opportunity Solution Tree

Opportunity-focused strategy with solution tree.

**Structure**: Outcome, opportunities, solutions, experiments.

**When to use**: Outcome-based planning, solution exploration, experimentation strategy.

### Product Bet Brief

Focused strategic bet document.

**Structure**: Thesis, market opportunity, risks, metrics.

**When to use**: Strategic bets, major investments, new product lines.

### Platform Strategy

Platform-specific strategy document.

**Structure**: Platform thesis, ecosystem, growth, monetization.

**When to use**: Platform products, multi-sided markets, developer tools.

### AI Product Strategy

AI-specific strategy document.

**Structure**: AI thesis, technical feasibility, market timing, differentiation.

**When to use**: AI products, ML features, automation tools.

### Fintech Strategy Doc

Fintech-specific strategy document.

**Structure**: Regulatory landscape, market gap, trust building, monetization.

**When to use**: Financial products, payments, lending, insurance.

### B2B SaaS Strategy

B2B SaaS-specific strategy document.

**Structure**: Customer economics, sales motion, retention, expansion.

**When to use**: B2B software, enterprise products, SaaS platforms.

### Agent-Readable Strategy Spec

Strategy optimized for automation.

**Structure**: Structured fields, parseable metrics, automation-ready.

**When to use**: Strategic planning automation, OKR tracking, reporting.

---

## Required Sections

### 1. Strategic Thesis

**Purpose**: What is the strategic choice?

**Requirements**:

- Clear strategic thesis
- What we're choosing
- Why this choice matters

**Common Issues**:

- `[strategy-fog]` — Thesis unclear or missing
- `[logic-drift]` — Thesis doesn't align with evidence

**Good Example**:

```markdown
## Strategic Thesis

**Thesis**:
Focus on urban millennial food delivery users (ages 25-40) with
real-time order tracking and ETA prediction to reduce cancellations
by 40%, capturing $2.4M in lost revenue annually.

**Strategic Choice**:
We choose to optimize for delivery reliability over restaurant
onboarding speed or geographic expansion.

**Why This Matters**:
- 60% of cancellations cite late delivery as primary reason
- Addressing this unlocks $2.4M in revenue (15% of $16M delivery segment)
- Establishes differentiation in crowded market
- Builds foundation for future logistics advantages
```

**Weak Example**:

```markdown
## Strategic Thesis

We should improve food delivery.
```

---

### 2. Target Customer / ICP

**Purpose**: Who is this for?

**Requirements**:

- Specific target segment
- Ideal Customer Profile (ICP)
- Segment characteristics

**Common Issues**:

- `[segment-fog]` — Target segment unclear
- `[overclaim]` — Segment size exaggerated

**Good Example**:

```markdown
## Target Customer / ICP

**Primary Segment**:
Urban millennials (ages 25-40) ordering food delivery 3+ times/week
- Segment size: 12,000 users (15% of active users)
- Current spend: $48/month/user
- Pain point: Unreliable delivery times, order cancellations

**Secondary Segment**:
Urban professionals (ages 30-50) ordering business lunches
- Segment size: 4,500 users (5% of active users)
- Current spend: $120/month/user
- Pain point: Late deliveries impact meetings

**Not Targeting**:
- Occasional users (< 1 order/week)
- Suburban/rural users
- Price-sensitive users (< $15 average order)
```

**Weak Example**：

```markdown
## Target Customer / ICP

Food delivery users.
```

---

### 3. Pain Points

**Purpose**: What pain are we addressing?

**Requirements**:

- Specific pain points
- Evidence of pain
- Impact of pain

**Common Issues**:

- `[evidence-gap]` — Pain not evidenced
- `[overclaim]` — Pain exaggerated

**Good Example**:

```markdown
## Pain Points

**Primary Pain**:
Unreliable delivery times cause order cancellations
- Evidence: 15% cancellation rate, 60% cite "late delivery"
- Impact: $48K/month in lost revenue per 1,000 users
- Customer quotes: "I cancelled because food was 45 minutes late"

**Secondary Pain**:
No visibility into order progress
- Evidence: Support tickets for ETA updates: 200/month
- Impact: Customer support cost: $12K/month
- Customer quotes: "I had no idea when my food would arrive"

**Competitive Gap**:
- Competitor A: Real-time tracking, 8% cancellation rate
- Competitor B: Map view, 10% cancellation rate
- Us: No tracking, 15% cancellation rate
```

**Weak Example**：

```markdown
## Pain Points

Delivery is unreliable and users are unhappy.
```

---

### 4. Evidence

**Purpose**: What evidence supports this strategy?

**Requirements**:

- Market evidence
- Customer evidence
- Competitive evidence
- Internal evidence

**Common Issues**:

- `[evidence-gap]` — Claims not supported

**Good Example**:

```markdown
## Evidence

**Market Evidence**:
- Food delivery market: $12B (growing 15% YoY)
- Urban delivery segment: $8B (67% of market)
- Delivery reliability ranked #2 customer priority (after food quality)

**Customer Evidence**:
- Survey (n=1,200): 78% want real-time tracking
- Customer interviews: "Cancellations due to late delivery"
- Churn analysis: 25% cite delivery reliability as churn reason

**Competitive Evidence**:
- Competitor A launched tracking: Cancellations 15% → 8%
- Competitor B launched tracking: Cancellations 18% → 10%
- Industry benchmark: Tracking reduces cancellations 30-50%

**Internal Evidence**:
- A/B test (email notifications): 10% reduction in cancellations
- Operations data: ETA accuracy ±45 minutes
- Finance data: $48K/month revenue loss per 1K users from cancellations
```

**Weak Example**：

```markdown
## Evidence

Market research shows this is a good opportunity.
```

---

### 5. Opportunity Sizing

**Purpose**: How big is the opportunity?

**Requirements**:

- Market size estimate
- Serviceable addressable market
- Revenue potential
- Growth assumptions

**Common Issues**:

- `[opportunity-fog]` — Opportunity not sized
- `[overclaim]` — Opportunity exaggerated

**Good Example**:

```markdown
## Opportunity Sizing

**Market Size (TAM)**:
- US food delivery: $12B
- Urban delivery: $8B (67%)
- Growth rate: 15% YoY
- 5-year projection: $16B

**Serviceable Addressable Market (SAM)**:
- Our urban markets: 5 cities
- Current TAM in these cities: $2B
- Our current penetration: 10% ($200M)

**Target Segment (SOM)**:
- Urban millennials 25-40: $48M (24% of SAM)
- High-frequency users (3+ orders/week): $36M (18% of SAM)
- Initial focus: $16M (8% of SAM, 80K users)

**Revenue Potential**:
- Current user LTV: $576/year ($48/month × 12 months)
- Reduced cancellations: +$48/year/user (15% → 9% rate)
- Total revenue opportunity: $3.8M/year (80K users)
- Gross margin: 40% (delivery fees)
- Gross profit: $1.5M/year

**Assumptions**:
- 80K target users in 5 cities
- 40% reduction in cancellations
- No change in order frequency
- Market growth: 15% YoY
```

**Weak Example**：

```markdown
## Opportunity Sizing

This is a billion dollar opportunity.
```

---

### 6. Business Logic

**Purpose**: How does this create value?

**Requirements**:

- Value creation mechanism
- Economic logic
- Competitive advantage

**Common Issues**:

- `[logic-drift]` — Business logic unclear
- `[overclaim]` — Advantage exaggerated

**Good Example**:

```markdown
## Business Logic

**Value Creation**:
1. Reduce cancellations → More completed orders → More revenue
2. Better experience → Higher retention → Higher LTV
3. Differentiation → Market share gains → Growth

**Economic Logic**:
- Cancellation reduction: 15% → 9% (40% relative improvement)
- Revenue per user: +$48/year ($576 → $624)
- Payback period: 3 months (development cost / incremental margin)
- ROI: 300% over 12 months

**Competitive Advantage**:
- Short-term: Feature parity with competitors
- Long-term: Data advantage (delivery time optimization)
- Defensibility: Network effects (driver efficiency data)
```

**Weak Example**：

```markdown
## Business Logic

This will make us more competitive and profitable.
```

---

### 7. Options Considered

**Purpose**: What alternatives did we consider?

**Requirements**:

- At least 2-3 strategic options
- Analysis of each
- Rationale for chosen approach

**Common Issues**:

- `[simpler-alternative-gap]` — Simpler options not considered
- `[logic-drift]` — Options not analyzed

**Good Example**:

```markdown
## Options Considered

**Option 1: Expand to new cities**
- Pros: Larger TAM, geographic diversification
- Cons: High execution risk, operational complexity
- Revenue: $5M potential (but high risk)
- Rejected: Execution risk, operational stretch

**Option 2: Restaurant onboarding sprint**
- Pros: More restaurant options, faster growth
- Cons: Dilutes quality, increases operational complexity
- Revenue: $3M potential
- Rejected: Doesn't address core pain (delivery reliability)

**Option 3: Delivery reliability focus (Chosen)**
- Pros: Addresses core pain, differentiation, defensible
- Cons: Smaller immediate opportunity
- Revenue: $1.5M potential (but high confidence)
- Chosen: Best risk/reward, aligns with strategic thesis
```

**Weak Example**：

```markdown
## Options Considered

We considered a few options and this is the best one.
```

---

### 8. Trade-offs

**Purpose**: What trade-offs are we accepting?

**Requirements**:

- Explicit trade-offs
- Rationale for each
- Mitigation where possible

**Common Issues**:

- `[tradeoff-gap]` — Trade-offs not acknowledged

**Good Example**:

```markdown
## Trade-offs

**Trade-off 1: Growth vs Reliability**
- Choice: Optimize for reliability over growth
- Rationale: Current churn (15% cancellations) undermines growth
- Mitigation: Use reliability improvements as growth driver post-launch

**Trade-off 2: Features vs Infrastructure**
- Choice: Invest in tracking infrastructure over new features
- Rationale: Tracking is foundational, features are derivative
- Mitigation: Leverage existing feature roadmap, pause non-critical features

**Trade-off 3: Speed vs Quality**
- Choice: Prioritize quality (accuracy) over speed (coverage)
- Rationale: Inaccurate ETAs damage trust more than no ETAs
- Mitigation: Gradual rollout, learn and improve

**Trade-off 4: Short-term vs Long-term**
- Choice: Accept short-term revenue hit for long-term positioning
- Rationale: Delivery reliability is long-term competitive advantage
- Mitigation: Clear communication to stakeholders
```

**Weak Example**：

```markdown
## Trade-offs

We're making some trade-offs but they're worth it.
```

---

### 9. Resource Requirements

**Purpose**: What resources do we need?

**Requirements**:

- Team resources
- Budget requirements
- Timeline estimate

**Common Issues**:

- `[dependency-gap]` — Resources not specified

**Good Example**:

```markdown
## Resource Requirements

**Team Resources**:
- Backend engineers: 2 (tracking infrastructure)
- Frontend engineers: 1 (app UI)
- Data scientist: 1 (ETA prediction model)
- Product manager: 1 (full-time)
- Designer: 0.5 (part-time)
- DevOps: 0.5 (infrastructure)

**Budget Requirements**:
- Development: $120K (3 months)
- Infrastructure: $50K/year (servers, monitoring)
- Third-party services: $30K/year (maps API, push notifications)
- Total first-year cost: $200K

**Timeline Estimate**:
- Phase 1 (MVP): 3 months
- Phase 2 (Optimization): 2 months
- Phase 3 (Expansion): 3 months
- Total: 8 months to full rollout
```

**Weak Example**：

```markdown
## Resource Requirements

We'll need some engineers and budget.
```

---

### 10. Risks

**Purpose**: What could go wrong?

**Requirements**:

- Strategic risks
- Execution risks
- Market risks
- Mitigation strategies

**Common Issues**:

- `[logic-drift]` — Risks not addressed

**Good Example**:

```markdown
## Risks

**Strategic Risk**:
- Risk: Competitors may copy feature quickly
- Probability: High (70%)
- Impact: Medium (differentiation erodes in 6-12 months)
- Mitigation: Focus on execution quality, build data advantage

**Execution Risk**:
- Risk: Technical complexity underestimated
- Probability: Medium (40%)
- Impact: High (delays, budget overruns)
- Mitigation: Phased rollout, buffer in timeline

**Market Risk**:
- Risk: Users may not value tracking as much as expected
- Probability: Low (20%)
- Impact: Medium (lower-than-expected ROI)
- Mitigation: A/B test before full investment, customer validation

**Operational Risk**:
- Risk: Support burden increases (users calling about delays)
- Probability: Medium (30%)
- Impact: Low (manageable with better communication)
- Mitigation: Proactive notifications, clear ETAs
```

**Weak Example**：

```markdown
## Risks

There are some risks but we'll manage them.
```

---

### 11. Sequencing / Phasing

**Purpose**: How should this be sequenced?

**Requirements**:

- Clear phases
- Dependencies between phases
- Success criteria for each phase

**Common Issues**:

- `[logic-drift]` — Sequencing unclear

**Good Example**:

```markdown
## Sequencing / Phasing

**Phase 1: MVP (Months 1-3)**
- GPS-based driver tracking
- Real-time ETA updates
- Basic map view
- Success: 25% reduction in cancellations

**Phase 2: Optimization (Months 4-5)**
- ML-based ETA prediction
- Traffic pattern integration
- Accuracy reporting dashboard
- Success: ETA accuracy ±10 minutes (from ±45)

**Phase 3: Expansion (Months 6-8)**
- Rollout to all urban markets
- Feature parity with competitors
- Advanced features (route optimization)
- Success: 40% reduction in cancellations, 2% market share gain

**Dependencies**:
- Phase 2 depends on Phase 1 data
- Phase 3 depends on Phase 2 accuracy
- Each phase requires success criteria met before proceeding
```

**Weak Example**：

```markdown
## Sequencing / Phasing

We'll do this in phases and expand gradually.
```

---

### 12. GTM / Adoption Strategy

**Purpose**: How do we drive adoption?

**Requirements**:

- Go-to-market approach
- Adoption plan
- Success metrics

**Common Issues**:

- `[strategy-fog]` — GTM not defined

**Good Example**:

```markdown
## GTM / Adoption Strategy

**Launch Strategy**:
- Beta: Internal team + 100 friendly users (Week 1)
- Early access: Top 10% customers by volume (Week 2-3)
- General rollout: All urban users (Week 4-8)

**Adoption Drivers**:
- In-app prompt: "Track your order in real-time!"
- Push notification: "Your driver is 5 minutes away"
- Email announcement: "Never wonder where your food is"

**Success Metrics**:
- Feature adoption: 70% of eligible users use tracking (Week 4)
- Frequency: 50% of tracked users check tracking 2+ times/order
- Satisfaction: 4.5/5 stars on feature feedback

**Marketing**:
- Blog post: "Real-time tracking is here"
- Social media: Demo video of tracking feature
- In-app tutorial: First-time user walkthrough
```

**Weak Example**：

```markdown
## GTM / Adoption Strategy

We'll launch and promote the feature.
```

---

### 13. Success Metrics

**Purpose**: How do we measure success?

**Requirements**:

- Leading indicators
- Lagging indicators
- Targets and timelines

**Common Issues**:

- `[metric-fog]` — Metrics unclear

**Good Example**:

```markdown
## Success Metrics

**Leading Indicators**:
- Feature adoption: 70% of eligible users (Week 4)
- Cancellation rate: 12% (Phase 1), 9% (Phase 3)
- ETA accuracy: ±20 minutes (Phase 1), ±10 minutes (Phase 2)

**Lagging Indicators**:
- Revenue: +$1.5M/year (from reduced cancellations)
- Market share: +2% (from differentiation)
- Churn: -5% (from better experience)

**Targets by Phase**:
- Phase 1 (Month 3): 25% cancellation reduction, 50% adoption
- Phase 2 (Month 5): ETA accuracy ±10 minutes
- Phase 3 (Month 8): 40% cancellation reduction, 70% adoption

**Business Impact**:
- ROI: 300% over 12 months
- Payback: 3 months
- NPV: $1.3M (3-year horizon)
```

**Weak Example**：

```markdown
## Success Metrics

We'll measure adoption and revenue.
```

---

### 14. Decision Ask

**Purpose**: What decision is needed?

**Requirements**:

- Clear strategic decision request
- Who decides
- When decision needed
- What commitment is required

**Common Issues**:

- `[missing-decision]` — Decision ask not stated

**Good Example**:

```markdown
## Decision Ask

**Request**:
Strategic approval to focus on delivery reliability as primary
product direction for next 8 months.

**Decision Maker**:
- CEO
- Product VP
- Engineering VP

**Timeline**:
Decision needed by EOD Friday, June 20.

**Commitment Required**:
- Budget: $200K first year
- Resources: 4 engineers, 1 PM, 1 data scientist
- Timeline: 8 months to full rollout
- Strategic focus: Pause other strategic initiatives

**Decision Options**:
1. Approve strategy (recommended)
2. Approve with modifications
3. Reject / Defer (with rationale)
```

**Weak Example**：

```markdown
## Decision Ask

Please approve this strategy.
```

---

## Quality Dimensions

### Strategic Thesis Clarity (20%)

- Thesis clear and specific
- Strategic choice explicit
- Importance explained

### Evidence Quality (15%)

- Claims supported with data
- Multiple evidence sources
- Evidence credible

### Opportunity Sizing (15%)

- Market size estimated
- Serviceable market defined
- Revenue potential quantified

### Target Segment Clarity (10%)

- Segment clearly defined
- Segment characteristics
- Segment size estimated

### Trade-offs Acknowledgment (15%)

- Trade-offs explicit
- Rationale provided
- Mitigation strategies

### Sequencing Logic (10%)

- Phases clearly defined
- Dependencies explained
- Success criteria stated

### Success Metrics (15%)

- Leading indicators defined
- Lagging indicators defined
- Targets and timelines

---

## Score Caps

- No strategic thesis → max score 60
- No target segment → max score 60
- No opportunity sizing → max score 65
- No trade-offs → max score 70
- Generic strategy language only → max score 55

---

## Common Issues

### Strategy Fog

**Pattern**: Vague strategic language

**Example**:

```text
"We'll innovate and delight customers"
[WITHOUT specific choices, segments, or mechanisms]
```

**Finding**: `[strategy-fog]`

**Fix**: State specific strategic thesis and choices.

---

### Segment Fog

**Pattern**: Target segment unclear

**Example**:

```text
"We're targeting customers who want good service"
[WITHOUT specific segment definition or characteristics]
```

**Finding**: `[segment-fog]`

**Fix**: Define specific target segment with characteristics.

---

### Opportunity Fog

**Pattern**: Opportunity not sized

**Example**:

```text
"This is a large market opportunity"
[WITHOUT market size, SAM, or revenue estimates]
```

**Finding**: `[opportunity-fog]`

**Fix**: Quantify opportunity with TAM, SAM, SOM.

---

### Simpler Alternative Gap

**Pattern**: Simpler strategies not considered

**Example**:

```text
"We need a complex multi-market strategy"
[WITHOUT considering focused single-market strategy]
```

**Finding**: `[simpler-alternative-gap]`

**Fix**: Analyze simpler alternatives before complex strategies.

---

## Examples

### Good Product Strategy

- Clear strategic thesis
- Specific target segment
- Evidence-backed claims
- Opportunity sized (TAM, SAM, SOM)
- Trade-offs acknowledged
- Sequencing defined
- Success metrics with targets

### Weak Product Strategy

- Vague strategic language
- Generic "everyone" as target
- Claims without evidence
- Opportunity not sized
- No trade-offs acknowledged
- No sequencing defined
- No success metrics

---

## Usage

### For Writers

Use this document to:

- Structure your product strategy
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

### What if my strategy is simple?

Simple strategies are supported. Ensure core sections:

- Strategic thesis
- Target segment
- Opportunity sizing
- Trade-offs
- Success metrics

### What if my strategy is for an AI product?

Add AI-specific sections:

- Technical feasibility
- Data requirements
- Model performance
- Cost structure

### What if I don't have all evidence?

Missing evidence triggers findings and score caps. Include all supporting evidence.

---

**docs/document-requirements/product-strategy-requirements.md defines Product Strategy requirements.**

**Use these requirements to write better product strategies and understand review findings.**
