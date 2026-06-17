# DESIGN.md

**Single source of truth for Shokunin Review terminal UX, brand, and design system.**

---

## Brand Principles

1. **Clarity over noise** — Reduce uncertainty, don't add more commentary
2. **Respect for author time** — Non-shaming, non-accusatory tone
3. **Respect for reviewer time** — Catch issues before human review
4. **Actionable feedback** — Every finding must have a concrete fix
5. **Terminal-first** — Optimized for CLI, not web UI
6. **Calm professionalism** — Direct, not dramatic

---

## Terminal Palette

```text
background-dark:     #11181C
background-medium:   #172126
panel:               #22303A
panel-border:        #3E4C55
text-primary:        #D8DEE3
text-secondary:      #B9C0C7
text-muted:          #8A969E
accent-blue:         #6F95A5
accent-orange:       #C97752
warning:             #B7A27A
risk:                #B97868
success:             #8FAE9A
```

### Color Usage Guidelines

- **background-dark** — Main terminal background
- **background-medium** — Subtle contrast areas
- **panel** — Grouped content areas
- **panel-border** — Panel dividers
- **text-primary** — Main content text
- **text-secondary** — Supporting text and captions
- **text-muted** — Placeholder and disabled text
- **accent-blue** — Active state, links, progress
- **accent-orange** — Highlights, warnings
- **warning** — Cautionary states
- **risk** — Blockers, critical issues
- **success** — Completed states, ready status

---

## Status Colors

```text
idle          muted gray    → Waiting for input
reading       muted blue    → Reading artifact
classifying   steel blue    → Determining artifact type
scoping       slate         → Building review spec
routing       muted blue    → Selecting validators
checking      amber         → Running validators
auditing      orange        → Auditing findings
scoring       blue-green    → Calculating score
verifying     slate         → Verifying output quality
done          muted green   → Review complete
blocked       muted red     → Blocker found
unsupported   amber         → Unsupported format/artifact
```

### Color Mapping

```yaml
idle:
  color: text-muted
  emoji: "💤"

reading:
  color: accent-blue
  emoji: "📖"

classifying:
  color: "#7A95B5"  # steel blue
  emoji: "🔍"

scoping:
  color: "#8A95A0"  # slate
  emoji: "📐"

routing:
  color: accent-blue
  emoji: "🔀"

checking:
  color: warning
  emoji: "🔎"

auditing:
  color: accent-orange
  emoji: "🔬"

scoring:
  color: success
  emoji: "📊"

verifying:
  color: "#8A95A0"  # slate
  emoji: "✓"

done:
  color: success
  emoji: "✓"

blocked:
  color: risk
  emoji: "🚫"

unsupported:
  color: warning
  emoji: "⚠️"
```

---

## Mascot Design

### Mascot Principle

```text
The mascot is not decoration.
The mascot indicates review state, progress, and whether user action is needed.
```

### Mascot Modes

- **ascii** — ASCII/Unicode mascot (default)
- **pixel** — Pixel mascot
- **off** — Disable mascot

### Mascot States

Each state corresponds to a review lifecycle status.

```text
idle          → 💤 Zzz...
reading       → 📖 Reading...
classifying   → 🔍 Classifying...
scoping       → 📐 Scoping...
routing       → 🔀 Routing validators...
checking      → 🔎 Checking...
auditing      → 🔬 Auditing findings...
scoring       → 📊 Scoring...
verifying     → ✓ Verifying...
done          → ✓ Done
blocked       → 🚫 Blocked
unsupported   → ⚠️ Unsupported
```

### ASCII Mascot Art

Stored in `assets/mascot/ascii.txt`.

Example states:

```text
# idle
  (___)
  (o,o)
  _(")_)

# reading
  [📖]
  reading...

# checking
  [🔎]
  validating

# done
  [✓]
  complete

# blocked
  [🚫]
  blocker found
```

### Pixel Mascot

Stored in `assets/mascot/pixel.png`.

Single-pixel or minimal pixel art for each state.

### Mascot Configuration

Mascot behavior is configured through DESIGN.md.

Changes to mascot states, colors, or animations should be made here first.

---

## Animation Rules

### Default Behavior

- Static state changes by default
- No continuous animation
- State transitions only

### Optional Animation

If `--no-animation` is set:

- Use static states only
- No transition effects
- Immediate state changes

### Animation Support

Future versions may add:

- Transition animations between states
- Progress indicators during long operations
- Subtle pulse effects for active states

---

## Accessibility Rules

### Color Independence

- No critical information conveyed by color alone
- Always pair colors with text labels or symbols
- Use emoji or text alongside color indicators

### Accessibility Options

```bash
--no-color       # Disable all colors
--no-animation   # Disable animations
--quiet          # Minimal output
```

### Text-Only Mode

When `--no-color` is set:

- Use text labels for all states
- Use ASCII characters instead of emoji
- Maintain all information without color

---

## Copywriting Rules

### Tone Guidelines

```text
Direct: State issues clearly, don't soften to the point of vagueness
Calm: Avoid dramatic language ("terrible", "awful", "disaster")
Non-shaming: Focus on the artifact, not the author
Actionable: Every issue must have a concrete fix
Respectful: Assume good intent
```

### Language Patterns

**Avoid:**

- "This is bad"
- "You should"
- "Terrible"
- "Awful"
- "Completely wrong"
- "Obviously"

**Use:**

- "This claim needs evidence"
- "This decision is missing"
- "This requirement is not testable"
- "This artifact is not ready for review yet"
- "Consider adding"
- "This would be stronger with"

### Feedback Structure

Every finding should follow:

```text
1. What: The issue (clear, direct)
2. Where: Location in artifact
3. Why it matters: Impact on review/readiness
4. How to fix: Concrete, actionable suggestion
```

Example:

```text
[metric-fog] Primary success metric is not defined.

Location: Success Metrics section

Why it matters:
Without a clear primary metric, reviewers cannot assess whether
the experiment succeeded or failed.

Recommended fix:
Define a single primary metric with:
- Metric name
- Calculation formula
- Success threshold
- Measurement source

Example:
"Primary metric: checkout_completion_rate, defined as
checkouts_completed / checkouts_started. Success threshold:
+2% relative lift over control, measured at 95% confidence."
```

---

## Quiet Mode Behavior

When `--quiet` is set:

- Show only verdict, score, and recommended next action
- Suppress detailed findings
- Suppress mascot
- Minimal output only

Example:

```text
🔴 Not review-ready — 36/100

Recommended: shokunin improve docs/prd.md --focus structure
```

---

## JSON Mode Behavior

When `--json` is set:

- Output structured JSON per schema
- Include all findings and metadata
- No mascot or terminal formatting
- Machine-parseable only

See `templates/review-output.schema.json` for JSON schema.

---

## Public Terminology Rules

### Allowed Terms

Use only these public-facing terms:

- noise
- signal
- clarity
- evidence
- decisions
- readiness
- review blocker
- quality gate
- feedback loop

### Banned Legacy Terms

Do NOT use these in public-facing files:

- Legacy Japanese process terms from earlier ideation
- Any banned terms (see `bin/check-terminology`)

### Files Where Terminology Rules Apply

- README.md
- DESIGN.md
- docs
- skills
- agents
- commands
- tags
- statuses
- examples
- terminal UX
- CLI output

### Internal Files

Internal scripts and configs may use banned terms for enforcement only.

The banlist is stored in `bin/check-terminology` only, not repeated across public docs.

---

## Design System Components

### Status Line

Shows current review state with mascot and color.

```text
[🔎 Checking...]
```

### Progress Indicators

For multi-step operations:

```text
[1/5] Reading artifact...
[2/5] Classifying...
[3/5] Routing validators...
[4/5] Running checks...
[5/5] Calculating score...
```

### Findings Display

```text
🔴 [evidence-gap] Problem is not quantified

Location: Problem Statement section

Why it matters:
Without quantified problem size, we cannot assess
opportunity or prioritize against alternatives.

Recommended fix:
Add problem quantification with:
- Affected users (absolute and %)
- Frequency / occurrence rate
- Current impact (revenue, time, error rate)
- User quotes or support ticket volume

Example:
"This problem affects 12,000 users (15% of active users),
occurring 3-5 times per week, resulting in an estimated
$48K/month in support costs and lost revenue."
```

### Score Display

```text
🟢 Review-ready — 87/100
Confidence: High
```

### Blocker Summary

```text
Top blockers:
1. [missing-decision] MVP scope is not defined.
2. [evidence-gap] Problem is not quantified.
3. [metric-fog] Primary metric is unclear.
```

### Score Cap Notice

```text
Score caps applied:
- No evidence → max score 60
- No MVP scope → max score 55
- No primary metric → max score 55
```

### Next Action Display

```text
Recommended next action:
Narrow into decision-ready MVP proposal with quantified
problem and clear success metric.

Run:
shokunin improve docs/prd.md --focus structure
```

---

## Output Structure

### Default Output (Short)

```text
🔴 Not review-ready — 36/100
Confidence: Medium

Why:
This PRD describes an attractive AI idea, but not a
decision-ready MVP.

Top blockers:
1. [evidence-gap] Problem is not quantified.
2. [missing-decision] MVP scope is not defined.
3. [overclaim] Business impact is claimed without baseline.

Score caps applied:
- No evidence → max score 60
- No MVP scope → max score 55

Recommended next action:
Narrow into decision-ready MVP proposal.

Run:
shokunin improve docs/prd.md --focus structure
```

### Full Output (--full)

Includes:

- All findings (not just blockers)
- Dimension breakdown
- Missing context
- Full rationale
- Acceptance criteria
- Exit criteria

---

## Verdict Display

### Verdict Types

```text
🟢 Review-ready                → 90–100
🟡 Ready with minor fixes       → 75–89
🟠 Needs major fixes            → 60–74
🔴 Needs revision               → 40–59
⛔ Not review-ready             → 0–39
```

### Verdict Logic

Score bands:

- **90–100** → Review-ready
- **75–89** → Ready with minor fixes
- **60–74** → Needs major fixes
- **40–59** → Needs revision
- **0–39** → Not review-ready

Modified by score caps — strictest cap wins.

---

## Mascot State Configuration

### State Transitions

```text
idle → reading → classifying → scoping → routing
→ checking → auditing → scoring → verifying → done

Exception paths:
- unsupported (at classification)
- blocked (at any point if critical blocker found)
```

### State Duration

Most states should be under 1 second.

Long operations:

- checking (may take several seconds)
- auditing (may take several seconds)

---

## Example Terminal Session

```bash
$ shokunin review examples/prd/weak-ai-food-agent.before.md

[📖 Reading artifact...]

[🔍 Classifying...]

[📐 Scoping review...]

[🔀 Routing validators...]

[🔎 Checking...]
  ✓ decision-reviewer
  ✓ evidence-reviewer
  ✓ metric-reviewer
  ✓ requirement-reviewer
  ✓ technical-feasibility-reviewer
  ✓ strategy-reviewer
  ✓ ai-safety-guardrails-reviewer

[🔬 Auditing findings...]

[📊 Scoring...]

[✓ Verifying output...]

🔴 Not review-ready — 36/100
Confidence: Medium

Why:
This PRD describes an attractive AI idea, but not a
decision-ready MVP.

Top blockers:
1. [evidence-gap] Problem is not quantified.
2. [missing-decision] MVP scope is not defined.
3. [overclaim] Business impact is claimed without baseline.
4. [simpler-alternative-gap] No simpler alternative considered.
5. [ai-guardrail-gap] AI product guardrails missing.

Score caps applied:
- No evidence → max score 60
- No MVP scope → max score 55
- No primary metric → max score 55

Recommended next action:
Narrow into decision-ready MVP proposal.

Run:
shokunin improve docs/prd.md --focus structure

[✓ Done]
```

---

## Design Principles for Specific Features

### Score Caps

- Always display applied caps
- Explain which cap is strictest
- Show why cap was applied

### Finding Quality

- Every finding must be grounded
- Every finding must be actionable
- No generic advice
- No duplicate findings

### Non-Toxic Review

- Never accuse author of using AI
- Never use shaming language
- Focus on artifact, not author
- Assume good intent

### Security Warnings

- Warn before reviewing sensitive docs
- Recommend `--local-only` and `--no-trace`
- Don't store sensitive content by default

---

## Mascot Customization

Users can customize mascot behavior:

```bash
--mascot ascii   # ASCII mascot (default)
--mascot pixel   # Pixel mascot
--mascot off     # Disable mascot
```

Future customization (roadmap):

- Custom mascot files
- Custom mascot states
- Custom mascot colors

---

## Design Documentation Updates

When updating terminal UX:

1. Update DESIGN.md first
2. Update mascot states in `assets/mascot/states/`
3. Update CLI output format in `cli/src/ui/`
4. Update examples to reflect new design
5. Run `bin/check-terminology` to verify terminology

---

## Anti-Overengineering Design Principles

### Output Length

- Default: max 3 blockers, max 5 high-value findings
- Full: all findings, structured output
- Never generate 20+ page reports by default

### Feature Boundaries

- No board simulation in MVP 1
- No domain packs in MVP 1
- No web UI in MVP 1
- No MCP server in MVP 1

### Validator Count

- 17 focused validators, not 25+
- Validators are dimensions, not personas
- Each validator has a clear scope

### Skill Behavior

- Skills are workflows, not reference docs
- Every skill must include verification
- Every skill must state exit criteria

---

**DESIGN.md is the single source of truth for Shokunin Review design.**

All terminal UX, mascot behavior, colors, and design decisions should be documented here first.
