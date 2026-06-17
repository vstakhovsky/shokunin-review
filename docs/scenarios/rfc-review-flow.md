# RFC Review Flow

**Technical Design document review workflow.**

---

## User Context

**User**: Tech Lead
**Goal**: Review RFC before implementation
**Document**: `docs/api-redesign-rfc.md`

---

## Command

```bash
shokunin review docs/api-redesign-rfc.md
```

---

## Review Process

### Status Flow

```
💤 idle → 📖 Reading → 🔍 Classifying → 📐 Scoping → 🔀 Routing
🔎 Checking... (6 validators)
  ✓ technical-decision
  ✓ alternatives-analysis
  ✓ trade-offs
  ✓ system-boundaries
  ✓ failure-modes
  ✓ rollout-plan
🔬 Auditing → 📊 Scoring → ✓ Verifying → ✓ Done
```

---

## Classification

```yaml
Type: RFC
Confidence: High
Maturity: Proposal
Detected Sections:
  - Context ✓
  - Technical Proposal ✓
  - Alternatives ✓
  - Trade-offs ✓
  - Rollout Plan ✓
  - Test Plan ✓
```

---

## Output

```
🟢 Ready with minor fixes — 82/100
Confidence: High

Why:
Strong technical proposal with good alternatives analysis.
Missing failure mode details and rollback triggers.

Top findings:
1. [tech-handwave] Failure modes not fully addressed.
2. [tradeoff-gap] Performance trade-off not quantified.
3. [dependency-gap] Cache dependency risks not acknowledged.

Score caps applied:
- No failure modes → max score 70

Recommended next action:
Add failure mode analysis with rollback triggers.
Document cache dependency risks.

Run:
shokunin improve docs/api-redesign-rfc.md --focus failure-modes
```

---

## Key RFC Findings

### Tech Handwave

```
Failure modes not fully addressed.

Location: Failure Modes section

Issue:
"We'll handle errors gracefully" is too vague.

Recommended fix:
Add specific failure scenarios:
- Cache unavailable → Fallback to DB
- API timeout → Retry with exponential backoff
- Data inconsistency → Circuit breaker + alert
```

### Trade-off Gap

```
Performance trade-off not quantified.

Issue:
"New design may be slower" without specifics.

Recommended fix:
"Expected performance: +50ms latency (p95)
Trade-off accepted for:
  - Better maintainability
  - Easier testing
  - Type safety
```

### Dependency Gap

```
Cache dependency risks not acknowledged.

Recommended fix:
Add dependency analysis:
- Cache availability: 99.9% (existing SLA)
- Risk: If cache down, +200ms latency
- Mitigation: Automatic fallback to DB
```

---

## Decision Guidance

### Implement as Proposed?

**Current State**: Mostly ready

**Before Implementation**:
1. Add failure mode details
2. Quantify performance trade-off
3. Document dependency risks

**Then**: Ready for implementation

---

## RFC Score Ranges

| Score | Meaning | Implement? |
|-------|---------|-----------|
| 90-100 | Ready to implement | Yes |
| 75-89 | Minor technical issues | Yes (after fixes) |
| 60-74 | Major technical issues | No |
| 40-59 | Needs revision | No |
| 0-39 | Not technically sound | No |

---

## Common RFC Issues

### Missing Alternatives

**❌ Bad**: "We're using REST because it's standard"

**✅ Good**: 
```
Alternatives:
1. REST (chosen) - Pros: Standard, cacheable
2. GraphQL - Pros: Flexible queries
   Cons: Overkill for our needs, complexity
3. gRPC - Pros: Fast, type-safe
   Cons: Not browser-friendly
```

### Unclear Trade-offs

**❌ Bad**: "There are some trade-offs"

**✅ Good**:
```
Trade-offs:
- Latency: +50ms for type safety (accepted)
- Complexity: More endpoints vs monolith (accepted)
- Migration: Cold turkey vs gradual (chose gradual)
```

### No Failure Modes

**❌ Bad**: "We'll handle errors"

**✅ Good**:
```
Failure Modes:
- Cache down → Fallback to DB, +200ms
- API timeout → Retry (3x, exponential backoff)
- 5xx rate > 5% → Circuit breaker
- Data corruption → Alert + rollback
```

---

## Tips for RFC Authors

### Before Review

1. Include 2-3 alternatives with analysis
2. Acknowledge trade-offs explicitly
3. Address failure modes concretely
4. Define clear system boundaries
5. Include rollout/rollback plan
6. Add test strategy

### After Review

1. Address technical blockers
2. Quantify trade-offs
3. Fill in failure modes
4. Re-review before implementation

---

**docs/scenarios/rfc-review-flow.md — RFC review workflow.**
