# RFC Requirements

**Requirements for Technical Design documents (RFCs) in Shokunin Review MVP 1.**

---

## Overview

RFC is primarily a **technical design document**.

It answers: **How should we build it, what alternatives exist, what trade-offs do we accept?**

---

## Main Question

**How should we build it?**

---

## Primary Layer

**Technical design**

---

## Main Risk

**Building it wrong**

---

## Common RFC Types

### RFC / Request for Comments

Traditional RFC format for technical proposals.

**Structure**: Problem, proposal, alternatives, trade-offs, implications.

**When to use**: Major technical decisions, architecture changes, new systems.

### Technical Design Doc

Comprehensive technical design document.

**Structure**: Detailed technical specifications, architecture, implementation plan.

**When to use**: Complex features, system design, infrastructure projects.

### API Design Spec

Focused RFC for API design.

**Structure**: Endpoints, contracts, versioning, migration.

**When to use**: REST APIs, GraphQL schemas, SDK design.

### Migration / Rollout Design

RFC for data or system migrations.

**Structure**: Current state, target state, migration plan, rollback.

**When to use**: Database migrations, system migrations, data migrations.

### Security / Privacy Design

RFC for security or privacy features.

**Structure**: Threat model, security requirements, implementation.

**When to use**: Authentication, authorization, encryption, privacy features.

### AI / LLM System Design

RFC for AI/ML systems.

**Structure**: Model architecture, training, deployment, monitoring.

**When to use**: ML models, LLM applications, AI features.

### Agent-Readable Tech Spec

RFC optimized for both human and machine reading.

**Structure**: Structured sections, explicit fields, parseable specs.

**When to use**: Automation, CI/CD, infrastructure-as-code.

---

## Required Sections

### 1. Context / Background

**Purpose**: What is the context?

**Requirements**:

- Current system state
- Problem or opportunity
- Why this change is needed

**Common Issues**:

- `[evidence-gap]` — Context not provided
- `[logic-drift]` — Problem not clearly stated

**Good Example**:

```markdown
## Context

Current user authentication uses session cookies with 24-hour expiration.
This causes 30% of daily active users to re-authenticate, resulting in
15% drop-off. Mobile users are disproportionately affected due to
background app restrictions.

We need to move to token-based authentication with refresh tokens
to improve user experience and security.
```

**Weak Example**:

```markdown
## Context

Auth is broken and we need to fix it.
```

---

### 2. Goals

**Purpose**: What are we trying to achieve?

**Requirements**:

- Clear technical objectives
- Success criteria
- Non-goals

**Common Issues**:

- `[logic-drift]` — Goals unclear
- `[missing-decision]` — Non-goals not stated

**Good Example**:

```markdown
## Goals

**Primary Goals**:
1. Implement JWT-based authentication with refresh tokens
2. Reduce re-authentication frequency by 80%
3. Improve security with short-lived access tokens

**Success Criteria**:
- Access token lifetime: 15 minutes
- Refresh token lifetime: 7 days
- Re-auth rate: < 6% of daily active users

**Non-Goals**:
- Social login integration (separate project)
- SSO integration (separate project)
- Session migration (cold migration)
```

**Weak Example**:

```markdown
## Goals

Make auth better.
```

---

### 3. Technical Proposal

**Purpose**: What are we proposing?

**Requirements**:

- Detailed technical approach
- Architecture overview
- Key components

**Common Issues**:

- `[tech-handwave]` — Technical details vague
- `[architecture-gap]` — System boundaries unclear

**Good Example**:

```markdown
## Technical Proposal

**Authentication Flow**:
1. User logs in with email/password
2. Server validates credentials
3. Server issues JWT access token (15 min) + refresh token (7 days)
4. Client stores tokens securely
5. Client uses access token for API calls
6. Client refreshes access token with refresh token

**Architecture**:
- Auth service: Token issuance and validation
- Token store: Redis for refresh token storage
- Middleware: JWT validation for API requests
- Client SDK: Token management and refresh

**Components**:
- `/auth/login` endpoint: Email/password auth
- `/auth/refresh` endpoint: Refresh token exchange
- `/auth/logout` endpoint: Token revocation
- JWT middleware: Request validation
```

**Weak Example**:

```markdown
## Technical Proposal

We'll use JWT tokens and refresh tokens.
The system will be secure and fast.
```

---

### 4. Alternatives Considered

**Purpose**: What else did we consider?

**Requirements**:

- At least 2-3 alternatives
- Analysis of each
- Rationale for chosen approach

**Common Issues**:

- `[simpler-alternative-gap]` — Simpler alternatives not considered
- `[logic-drift]` — Alternatives not analyzed

**Good Example**:

```markdown
## Alternatives Considered

**Alternative 1: Long-lived session cookies**
- Pros: Simple, no migration needed
- Cons: Security risk, frequent re-auth, poor mobile experience
- Rejected: Doesn't solve primary problems

**Alternative 2: OAuth 2.0 / OIDC**
- Pros: Industry standard, supports SSO
- Cons: Complex infrastructure, overkill for current needs
- Rejected: Over-engineering for current scale

**Alternative 3: JWT with rotating refresh tokens (Chosen)**
- Pros: Security, mobile-friendly, scalable
- Cons: Migration effort, token revocation complexity
- Chosen: Best balance of security and UX
```

**Weak Example**:

```markdown
## Alternatives Considered

We considered a few options but JWT is best.
```

---

### 5. Trade-offs

**Purpose**: What trade-offs are we accepting?

**Requirements**:

- Explicit trade-offs
- Rationale for each
- Mitigation strategies

**Common Issues**:

- `[tradeoff-gap]` — Trade-offs not acknowledged

**Good Example**:

```markdown
## Trade-offs

**Trade-off 1: Token revocation complexity vs security**
- Choice: Implement token revocation via Redis token blacklist
- Rationale: Necessary for security (logout, compromised tokens)
- Mitigation: Simple Redis-based blacklist with TTL

**Trade-off 2: Cold migration vs gradual rollout**
- Choice: Cold migration over weekend
- Rationale: Simpler implementation, lower error risk
- Mitigation: Extensive testing, rollback plan

**Trade-off 3: Refresh token storage vs statelessness**
- Choice: Store refresh tokens in Redis
- Rationale: Need token revocation capability
- Mitigation: Redis persistence with replicas
```

**Weak Example**:

```markdown
## Trade-offs

There are some trade-offs but we think it's worth it.
```

---

### 6. System Boundaries

**Purpose**: What are the system boundaries?

**Requirements**:

- Clear system boundaries
- Interface definitions
- Integration points

**Common Issues**:

- `[architecture-gap]` — System boundaries unclear

**Good Example**:

```markdown
## System Boundaries

**In Scope**:
- Auth service (token issuance, validation, refresh)
- Token store (Redis)
- API middleware (JWT validation)
- Client SDK (token management)

**Out of Scope**:
- User database (existing system)
- Session storage (deprecated)
- Social login providers (future)

**Integration Points**:
- User database: User validation
- API services: JWT validation middleware
- Client apps: Token management SDK
```

**Weak Example**:

```markdown
## System Boundaries

Auth system handles tokens and stuff.
```

---

### 7. API / Data Contracts

**Purpose**: What are the interfaces?

**Requirements** (if applicable):

- API endpoints
- Request/response schemas
- Data models
- Versioning strategy

**Common Issues**:

- `[tech-handwave]` — Contracts not defined

**Good Example**:

```markdown
## API Contracts

**POST /auth/login**

Request:
```json
{
  "email": "string",
  "password": "string"
}
```

Response (200):
```json
{
  "access_token": "string (JWT, 15min)",
  "refresh_token": "string (7day)",
  "expires_in": 900
}
```

**POST /auth/refresh**

Request:
```json
{
  "refresh_token": "string"
}
```

Response (200):
```json
{
  "access_token": "string (JWT, 15min)",
  "expires_in": 900
}
```
```

**Weak Example**：

```markdown
## API Contracts

We'll have login and refresh endpoints.
```

---

### 8. Dependencies

**Purpose**: What does this depend on?

**Requirements**:

- Technical dependencies
- External services
- Team dependencies

**Common Issues**:

- `[dependency-gap]` — Dependencies not acknowledged

**Good Example**:

```markdown
## Dependencies

**Technical**:
- Redis (for token storage)
- JWT library (jsonwebtoken)
- Existing user database
- Load balancer (for auth service)

**External**:
- None

**Team**:
- Backend team: Auth service implementation
- DevOps: Redis setup and configuration
- Mobile team: Client SDK integration
```

**Weak Example**:

```markdown
## Dependencies

We'll need Redis and some libraries.
```

---

### 9. Security / Privacy

**Purpose**: What are the security implications?

**Requirements** (if applicable):

- Threat model
- Security requirements
- Privacy considerations

**Common Issues**:

- `[tech-handwave]` — Security not addressed

**Good Example**:

```markdown
## Security / Privacy

**Threat Model**:
- Token theft: Mitigated by short-lived access tokens
- Replay attacks: Mitigated by token expiration and refresh token rotation
- CSRF: Mitigated by using Authorization headers (not cookies)

**Security Requirements**:
- Access tokens: 15-minute lifetime
- Refresh tokens: 7-day lifetime, one-time use
- Token storage: Secure HTTP-only cookies or mobile keychain
- TLS required: All auth endpoints over HTTPS

**Privacy**:
- No PII in JWT tokens
- Refresh tokens stored securely, not logged
```

**Weak Example**:

```markdown
## Security / Privacy

We'll use HTTPS and secure tokens.
```

---

### 10. Failure Modes

**Purpose**: What could go wrong?

**Requirements**:

- Failure scenarios
- Error handling
- Degradation strategies

**Common Issues**:

- `[tech-handwave]` — Failure modes not addressed

**Good Example**:

```markdown
## Failure Modes

**Failure Mode 1: Redis unavailable**
- Impact: Cannot validate refresh tokens
- Mitigation: Fall back to access token only, require re-login
- Detection: Redis health check, circuit breaker

**Failure Mode 2: Token validation fails**
- Impact: API requests fail
- Mitigation: Return 401, client retries with refresh token
- Detection: Validation error rate monitoring

**Failure Mode 3: Refresh token expired**
- Impact: User must re-authenticate
- Mitigation: Clear client state, redirect to login
- Detection: Token validation error handling
```

**Weak Example**:

```markdown
## Failure Modes

If something fails, we'll show an error.
```

---

### 11. Observability

**Purpose**: How will we monitor this?

**Requirements**:

- Metrics to track
- Logging strategy
- Alerting thresholds

**Common Issues**:

- `[tech-handwave]` — Observability not addressed

**Good Example**：

```markdown
## Observability

**Metrics**:
- Token issuance rate (per minute)
- Token validation rate (per minute)
- Refresh token usage rate
- Validation error rate (target: < 0.1%)
- Redis availability (target: > 99.9%)

**Logging**:
- Token issuance (excluding token content)
- Validation failures (with reason)
- Refresh token rotation events

**Alerting**:
- Validation error rate > 0.5%
- Redis availability < 99%
- Token issuance latency > 100ms (p95)
```

**Weak Example**:

```markdown
## Observability

We'll monitor errors and performance.
```

---

### 12. Rollout / Rollback Plan

**Purpose**: How will we deploy and rollback?

**Requirements**:

- Rollout strategy
- Rollback plan
- Success criteria

**Common Issues**:

- `[tech-handwave]` — Rollout not planned

**Good Example**:

```markdown
## Rollout / Rollback Plan

**Rollout Strategy**:
- Week 1: Internal testing (dev team)
- Week 2: Beta users (1% of traffic)
- Week 3: Gradual rollout (10%, 25%, 50%, 100%)
- Week 4: Monitor and optimize

**Rollback Plan**:
- Trigger: Validation error rate > 1%
- Action: Revert to session cookie auth
- Timeline: Within 1 hour
- Data loss: None (cold migration, new sessions only)

**Success Criteria**:
- Re-auth rate < 6% of daily active users
- Validation error rate < 0.1%
- No increase in support tickets
```

**Weak Example**:

```markdown
## Rollout / Rollback Plan

We'll deploy gradually and rollback if needed.
```

---

### 13. Test Plan

**Purpose**: How will we test this?

**Requirements**:

- Unit testing strategy
- Integration testing strategy
- Load testing strategy

**Common Issues**:

- `[tech-handwave]` — Testing not addressed

**Good Example**:

```markdown
## Test Plan

**Unit Tests**:
- Token generation and validation
- Refresh token rotation
- Error handling

**Integration Tests**:
- End-to-end auth flow
- Token refresh flow
- Token revocation

**Load Tests**:
- 10K concurrent token validations
- 1K token refreshes per second
- Redis failover scenarios

**Security Tests**:
- Token theft simulation
- Replay attack prevention
- CSRF prevention
```

**Weak Example**：

```markdown
## Test Plan

We'll test everything thoroughly.
```

---

### 14. Open Questions

**Purpose**: What's still undecided?

**Requirements**:

- List of open questions
- Decision timeline
- Owner for each question

**Common Issues**:

- None — this section is optional

**Good Example**:

```markdown
## Open Questions

1. **Refresh token rotation strategy**
   - Question: Rotate on every refresh or only on refresh token reuse?
   - Owner: Backend lead
   - Timeline: Decision by Friday

2. **Token storage in mobile apps**
   - Question: Keychain vs secure storage?
   - Owner: Mobile lead
   - Timeline: Decision by Monday
```

**Weak Example**:

```markdown
## Open Questions

We have a few questions to figure out.
```

---

### 15. Decision Ask

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

**Request**: Approval to implement JWT-based authentication

**Decision Maker**: Tech Lead + Engineering Manager

**Timeline**: Decision needed by EOD Wednesday, June 18

**Information Needed**:
- Technical feasibility confirmed
- Resource availability (2 engineers, 3 weeks)
- Risk assessment complete

**Decision Options**:
1. Approve implementation
2. Request design changes
3. Reject (with rationale)
```

**Weak Example**:

```markdown
## Decision Ask

Please approve this RFC.
```

---

## Quality Dimensions

### Technical Decision Clarity (20%)

- Technical approach clear
- Architecture well-defined
- System boundaries explicit

### Alternatives Analysis (15%)

- Alternatives considered
- Analysis provided
- Rationale for choice clear

### Trade-offs Acknowledgment (15%)

- Trade-offs explicit
- Rationale provided
- Mitigation strategies

### System Boundaries (10%)

- Boundaries clear
- Interfaces defined
- Integration points explicit

### Failure Modes (10%)

- Failure scenarios identified
- Error handling planned
- Degradation strategies

### Rollout Plan (10%)

- Rollout strategy defined
- Rollback plan clear
- Success criteria stated

### Test Plan (10%)

- Testing strategy defined
- Coverage adequate
- Load testing planned

### Open Questions (10%)

- Questions listed
- Owners assigned
- Timeline defined

---

## Score Caps

- No technical decision → max score 60
- No alternatives considered → max score 65
- No trade-offs acknowledged → max score 70
- No failure modes → max score 70

---

## Common Issues

### Tech Handwave

**Pattern**: Technical details vague or deferred

**Example**:

```text
"We'll figure out the details later"
"We'll use standard best practices"
```

**Finding**: `[tech-handwave]`

**Fix**: Provide specific technical approach.

---

### Architecture Gap

**Pattern**: System boundaries unclear

**Example**:

```text
"The auth system will handle everything"
[WITHOUT clear boundaries, interfaces, or integration points]
```

**Finding**: `[architecture-gap]`

**Fix**: Define system boundaries and interfaces explicitly.

---

### Simpler Alternative Gap

**Pattern**: Simpler solutions not considered

**Example**:

```text
"We need a complex distributed system"
[WITHOUT considering simpler approaches first]
```

**Finding**: `[simpler-alternative-gap]`

**Fix**: Analyze simpler alternatives before complex solutions.

---

### Dependency Gap

**Pattern**: Dependencies not acknowledged

**Example**:

```text
"We'll build this feature"
[WITHOUT acknowledging Redis, auth service, etc.]
```

**Finding**: `[dependency-gap]`

**Fix**: List all technical and team dependencies.

---

## Examples

### Good RFC

- Clear context and goals
- Detailed technical proposal
- Alternatives analyzed
- Trade-offs acknowledged
- Failure modes addressed
- Rollout plan defined

### Weak RFC

- Vague context
- Technical proposal unclear
- No alternatives considered
- Trade-offs not acknowledged
- Failure modes not addressed
- No rollout plan

---

## Usage

### For Writers

Use this document to:

- Structure your RFC
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

### What if my RFC is small?

Small RFCs are supported. Ensure core sections:

- Context
- Technical proposal
- Alternatives
- Trade-offs
- Rollout plan

### What if my RFC is for an AI system?

Add AI-specific sections:

- Model architecture
- Training strategy
- Deployment plan
- Monitoring approach

### What if I don't have alternatives?

Missing alternatives triggers findings and score caps. Include at least 2-3 alternatives.

---

**docs/document-requirements/rfc-requirements.md defines RFC requirements.**

**Use these requirements to write better RFCs and understand review findings.**
