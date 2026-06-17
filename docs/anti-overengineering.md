# Anti-Overengineering

**Guardrails against feature creep and overengineering in Shokunin Review.**

---

## Core Principle

```text
Shokunin Review must not become the thing it reviews against.
```

If Shokunin Review produces bloated, verbose, or overcritical output, it fails its own review.

---

## The Problem

Many review tools become:

- **Bloated** — Too much output, too many findings
- **Overcritical** — Nitpicking style over substance
- **Complex** — Too many options, too much configuration
- **Slow** — Too many checks, too much overhead
- **Theater** — Simulating review instead of doing review

Shokunin Review must avoid these traps.

---

## Guardrails

### 1. Output Bloat Guardrail

**Rule**: Default output must be short.

**Enforcement**:
- Default: max 3 blockers, max 5 findings
- Full output only with `--full` flag
- No 20+ page reports by default
- No wall of text for simple issues

**Example**:

❌ **Bad** — 50 findings listed by default

✅ **Good** — Top 3 blockers, 5 high-value findings, use `--full` for more

---

### 2. Overcriticism Guardrail

**Rule**: Don't nitpick style over substance.

**Enforcement**:
- Style nits are filtered out
- Only review-affecting issues reported
- Tone is calm, not dramatic
- No shaming language

**Example**:

❌ **Bad** — "This is terrible writing. You should rewrite everything."

✅ **Good** — "This requirement is not testable. Consider rewriting as: 'Given X, when Y, then Z.'"

---

### 3. Validator Count Guardrail

**Rule**: Limited to 17 focused validators, not 25+.

**Enforcement**:
- No additional validators in MVP 1
- Each validator has single responsibility
- Validators are dimensions, not personas
- No board simulation validators

**Example**:

❌ **Bad** — 50 validators covering every possible nit

✅ **Good** — 17 validators focused on review readiness

---

### 4. Feature Scope Guardrail

**Rule**: MVP 1 limited to 4 artifact types.

**Enforcement**:
- No new artifact types in MVP 1
- No "generic document review"
- No "review everything" mode
- Clear boundaries for each type

**Example**:

❌ **Bad** — "We'll support all document types generically"

✅ **Good** — "MVP 1 supports PRD, RFC, Experiment Plan, Product Strategy"

---

### 5. Mode Guardrail

**Rule**: Limited to 3 review modes (fast, deep, draft).

**Enforcement**:
- No "board review" mode
- No "CEO simulation" mode
- No "legal review" mode
- No "market validation" mode

**Example**:

❌ **Bad** — 20 different modes for every possible use case

✅ **Good** — 3 modes: fast, deep, draft

---

### 6. Generic Advice Guardrail

**Rule**: No generic, unactionable advice.

**Enforcement**:
- Every finding must be grounded
- Every finding must be actionable
- Every finding must reference artifact content
- Generic advice filtered in audit

**Example**:

❌ **Bad** — "Improve clarity. Add more detail."

✅ **Good** — "Section 'Problem Statement' lacks quantification. Add affected users, frequency, current impact."

---

### 7. Rewrite Guardrail

**Rule**: No full rewrite by default.

**Enforcement**:
- Default is review-first
- Improve mode suggests, not rewrites
- Full rewrite requires explicit request
- Smallest useful improvement principle

**Example**:

❌ **Bad** — Rewrite entire document without being asked

✅ **Good** — Suggest specific improvements to top 3 blockers

---

### 8. Board Simulation Guardrail

**Rule**: No board/executive simulation in MVP 1-5.

**Enforcement**:
- No CEO persona validator
- No CPO persona validator
- No CTO persona validator
- No board meeting simulation

**Rationale**:

- Conflicts with terminal-first UX
- Conflicts with anti-overengineering
- Focus is validation, not theater
- Persona-based review is not eval-driven

**Example**:

❌ **Bad** — "CEO says: This strategy lacks vision"

✅ **Good** — "Strategy document missing: target segment, opportunity sizing, tradeoffs"

---

### 9. Domain Pack Guardrail

**Rule**: No domain packs in MVP 1-4.

**Enforcement**:
- No AI product pack
- No fintech pack
- No marketplace pack
- No platform pack

**Rationale**:

- Core validation harness must be stable first
- Domain packs are optional extensions
- Domain packs require community input
- Domain packs come in MVP 5

**Example**:

❌ **Bad** — "We'll add AI product pack, fintech pack, marketplace pack in MVP 1"

✅ **Good** — "MVP 5 will add domain packs as optional extensions"

---

### 10. Finding Quality Guardrail

**Rule**: Every finding must pass quality audit.

**Enforcement**:
- Grounding check: Is finding grounded in artifact?
- Actionability check: Is there a concrete fix?
- Specificity check: Is finding specific enough?
- Duplication check: Is this duplicate of another finding?

**Failure**:

Finding fails audit → Removed from output → Not shown to user

**Example**:

❌ **Bad** — "This document needs improvement." (too vague)

✅ **Good** — "Section 'Metrics' lacks primary metric. Define one metric with: name, formula, threshold, source."

---

## Eval Enforcement

### Anti-Overcriticism Eval

**Purpose**: Prevent overcriticism of concise but good documents.

**Test Case**: Review a concise, good PRD.

**Expected**:
- Score 85+ (review-ready or ready with minor fixes)
- No style nits
- No generic praise
- No nitpicking

**Forbidden Behaviors**:
- Scoring under 70 for good document
- Flagging style as blocker
- Suggesting full rewrite
- Complaining about length

### Anti-Bloat Eval

**Purpose**: Prevent bloated output.

**Test Case**: Review a weak document.

**Expected**:
- Default output under 20 lines
- Max 3 blockers in default output
- Max 5 findings in default output

**Forbidden Behaviors**:
- 50+ findings in default output
- 20+ page report by default
- Wall of text for simple issues

### Output Guard Eval

**Purpose**: Ensure output quality.

**Checks**:
- No toxic language
- No shaming or accusations
- No invented evidence
- No sensitive data leakage
- No generic praise

**Failure**: Output blocked, error returned.

---

## Design Principles

### 1. Less is More

**Principle**: Smaller, focused feature set is better than large, unfocused set.

**Application**:
- 4 artifact types, not 20+
- 17 validators, not 50+
- 3 review modes, not 10+
- 5 score bands, not granular scoring

### 2. Default Short

**Principle**: Default output should be short. Full output requires explicit flag.

**Application**:
- Default: verdict + score + blockers + next action
- Full: all findings, dimensions, rationale
- Use `--full` for detailed reports

### 3. Smallest Useful Improvement

**Principle**: Recommend smallest useful change, not full rewrite.

**Application**:
- Improve mode suggests, not rewrites
- Focus on top blockers first
- Prioritize structure over style
- Concrete, specific suggestions

### 4. Validation Over Theater

**Principle**: Focus on validation, not simulation.

**Application**:
- Validators are dimensions, not personas
- No CEO/CPO/CTO simulation
- No board meeting simulation
- Direct, calm feedback

### 5. Substance Over Style

**Principle**: Focus on substance, not style.

**Application**:
- Flag review blockers, not style nits
- Prioritize decisions, evidence, metrics
- Filter out style-only issues
- Calm, non-dramatic tone

---

## Decision Framework

### When Adding Features

Before adding any feature, ask:

1. **Is it review-focused?**
   - Yes → Consider
   - No → Reject

2. **Does it prevent scope creep?**
   - Yes → Consider
   - No → Reject

3. **Is it eval-driven?**
   - Yes → Consider
   - No → Reject

4. **Is it minimal?**
   - Yes → Consider
   - No → Reject

5. **Is it respecting boundaries?**
   - Yes → Consider
   - No → Reject

**All 5 must be Yes** to proceed.

### When Adding Validators

Before adding a validator, ask:

1. **Is it a distinct dimension?**
   - Yes → Consider
   - No → Reject (duplicate)

2. **Is it review-critical?**
   - Yes → Consider
   - No → Reject (nice-to-have)

3. **Can it be evaluated?**
   - Yes → Consider
   - No → Reject (not eval-driven)

4. **Does it fit MVP 1 scope?**
   - Yes → Consider
   - No → Reject (out of scope)

**All 4 must be Yes** to proceed.

### When Adding Output

Before adding to output, ask:

1. **Is it grounded?**
   - Yes → Include
   - No → Reject

2. **Is it actionable?**
   - Yes → Include
   - No → Reject

3. **Is it specific?**
   - Yes → Include
   - No → Reject

4. **Is it duplicate?**
   - Yes → Reject
   - No → Include

**3 of 4 must be Yes** to proceed.

---

## Examples

### Good: Minimal Improvement

```text
Recommended next action:
Add quantified problem statement and define MVP scope.

Specific changes:
1. Problem Statement: Add "Affects 12K users (15%), occurs 3-5x/week"
2. MVP Scope: Define "Phase 1: X only. Phase 2: Y later."

Run:
shokunin improve docs/prd.md --focus structure
```

### Bad: Overengineered Suggestion

```text
Recommended next action:
Completely rewrite the entire PRD from scratch using the following
42-point improvement plan covering every possible aspect of product
documentation, including comprehensive market analysis, financial
modeling, legal compliance review, technical architecture validation,
user research synthesis, competitive intelligence gathering,
[38 more points]...
```

### Good: Focused Finding

```text
[metric-fog] Primary success metric is not defined.

Location: Success Metrics section

Recommended fix:
Define one primary metric with:
- Metric name
- Calculation formula
- Success threshold
- Measurement source

Example:
"Primary metric: checkout_completion_rate = checkouts_completed /
checkouts_started. Success: +2% relative lift at 95% confidence."
```

### Bad: Vague Finding

```text
[metric-fog] Metrics need improvement.

You should really work on making your metrics better and clearer
and more specific and more measurable and more aligned with business
goals and more traceable and more actionable...
```

---

## Anti-Patterns

### ❌ Anti-Pattern 1: Validator Explosion

**Problem**: Adding validators for every possible nit.

**Solution**: Limited to 17 focused validators. Each validator has clear scope.

### ❌ Anti-Pattern 2: Output Bloat

**Problem**: 50+ findings in default output.

**Solution**: Default shows 3 blockers, 5 findings. Use `--full` for more.

### ❌ Anti-Pattern 3: Persona Theater

**Problem**: "CEO says this, CPO says that."

**Solution**: Validators are dimensions, not personas. Direct feedback.

### ❌ Anti-Pattern 4: Generic Advice

**Problem**: "Improve clarity. Add detail."

**Solution**: Every finding grounded, specific, actionable.

### ❌ Anti-Pattern 5: Scope Creep

**Problem**: "Let's add support for all document types."

**Solution**: MVP 1 limited to 4 types. Clear boundaries.

---

## Metrics

### Success Metrics

- Default output length: < 20 lines (95th percentile)
- Default finding count: 3-5 findings (95th percentile)
- Good document score: 85+ (95th percentile)
- Finding audit pass rate: > 95%
- Anti-overcriticism eval pass: 100%

### Anti-Patterns to Track

- Bloated output: > 50 findings default (target: 0%)
- Overcritical good docs: Score < 70 for good doc (target: 0%)
- Generic advice: Unactionable findings (target: 0%)
- Toxic output: Shaming/accusatory language (target: 0%)

---

## Summary

### Guardrails

1. **Output bloat** — Default short, `--full` for detailed
2. **Overcriticism** — Substance over style
3. **Validator count** — 17 focused, not 25+
4. **Feature scope** — 4 artifact types only
5. **Mode count** — 3 modes only
6. **Generic advice** — Every finding actionable
7. **Rewrite** — Suggest, don't rewrite
8. **Board simulation** — Not in MVP 1-5
9. **Domain packs** — Not until MVP 5
10. **Finding quality** — Audit required

### Principles

1. **Less is more** — Smaller, focused
2. **Default short** — Full requires flag
3. **Smallest improvement** — Not full rewrite
4. **Validation over theater** — Dimensions, not personas
5. **Substance over style** — Blockers, not nits

### Success

Shokunin Review succeeds when:

- Output is concise by default
- Good documents score highly
- Findings are actionable
- No toxic language
- No scope creep
- Evals pass

---

**docs/anti-overengineering.md prevents Shokunin Review from becoming bloated.**

**Shokunin Review must not become the thing it reviews against.**
