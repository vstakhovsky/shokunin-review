# Onboarding Flow

**First-time user onboarding scenario.**

---

## User Context

**User**: New to Shokunin Review
**Goal**: Review first document
**Setup**: Just ran `./bin/install`

---

## Scenario

### Step 1: Installation Complete

User ran:
```bash
git clone https://github.com/vstakhovsky/shokunin-review.git
cd shokunin-review
./bin/install
```

Output:
```
✓ Shokunin Review installed
✓ Skills installed to .claude/skills/
✓ Commands available

Try: shokunin review examples/prd/weak-ai-food-agent.before.md
```

---

### Step 2: First Review

User runs:
```bash
shokunin review examples/prd/weak-ai-food-agent.before.md
```

**Status Progression**:
```
💤 idle
📖 Reading artifact...
🔍 Classifying...
📐 Scoping review...
🔀 Routing validators...
🔎 Checking... (7 validators)
🔬 Auditing findings...
📊 Scoring...
✓ Verifying output...
✓ Done
```

**Artifact Classification**:
```
Type: PRD
Confidence: High
Maturity: Draft
```

**Review Spec**:
```
Mode: deep
Expected state: Ready for review
Dimensions: 7 (problem, evidence, requirements, metrics, etc.)
Validator budget: All applicable
Finding budget: 5 (default output)
```

---

### Step 3: Review Output

```
🔴 Not review-ready — 36/100
Confidence: Medium

Why:
This PRD describes an attractive AI idea, but not a decision-ready MVP.

Top blockers:
1. [evidence-gap] Problem is not quantified.
2. [missing-decision] MVP scope is not defined.
3. [overclaim] Business impact claimed without baseline.
4. [simpler-alternative-gap] No simpler alternative considered.
5. [ai-guardrail-gap] AI product guardrails missing.

Score caps applied:
- No evidence → max score 60
- No MVP scope → max score 55
- No primary metric → max score 55

Recommended next action:
Narrow into decision-ready MVP proposal with quantified
problem and clear success metric.

Run:
shokunin improve examples/prd/weak-ai-food-agent.before.md
```

---

### Step 4: User Tries Improve

User runs:
```bash
shokunin improve examples/prd/weak-ai-food-agent.before.md
```

**Output**:
```
📋 Improvement Suggestions

Priority 1 (Blockers):
1. Add quantified problem statement
   - Current: "Users have trouble finding healthy food"
   - Suggested: "15,000 urban users (25-40) struggle to find 
     healthy food options, spending 45min/day searching"

2. Define MVP scope
   - Include: AI agent for food recommendations
   - Exclude: Grocery delivery, meal planning, social features

Priority 2 (High):
3. Add primary success metric
   - "Healthy food selection rate: from 30% to 50%"

Run: shokunin review examples/prd/weak-ai-food-agent.after.md
(when you've made changes)
```

---

### Step 5: User Reviews Example After-File

User runs:
```bash
shokunin review examples/prd/weak-ai-food-agent.after.md
```

**Output**:
```
🟢 Ready with minor fixes — 78/100
Confidence: High

Top improvements:
✓ Problem quantified (15K users)
✓ MVP scope defined
✓ Primary metric added
✓ AI guardrails included

Remaining issues:
1. [metric-fog] Secondary metrics unclear
2. [tradeoff-gap] Costs not quantified

Score: Improved from 36 to 78 (+42 points)
```

---

## Key Learnings

### For New Users

1. **Installation is quick** — Clone and run install
2. **Review is fast** — 30-60 seconds for typical PRD
3. **Output is actionable** — Clear blockers and next steps
4. **Improve mode helps** — Suggests specific fixes
5. **Re-review shows progress** — Before/after comparison

### Common Questions

**Q: Do I need to specify document type?**
A: No, Shokunin auto-detects. Use `--type` only if misclassified.

**Q: What if my document is long?**
A: Works fine, but may take longer. Consider < 100KB.

**Q: Can I review confidential docs?**
A: Use `--local-only --no-trace` for sensitive content.

**Q: What do the scores mean?**
A: 90-100 = Review-ready, 75-89 = Minor fixes, 60-74 = Major fixes, < 60 = Not ready.

---

## Quick Reference

### First Commands to Try

```bash
# Review an example
shokunin review examples/prd/weak-ai-food-agent.before.md

# Improve a document
shokunin improve docs/prd.md

# Check your score
shokunin score docs/prd.md

# Compare before/after
shokunin rerun docs/prd-v2.md --compare docs/prd-v1.md
```

### Output Levels

```bash
# Default (short)
shokunin review file.md

# Full (all findings)
shokunin review file.md --full

# Quiet (minimal)
shokunin review file.md --quiet

# JSON (automation)
shokunin review file.md --json
```

---

## Troubleshooting

### Installation Issues

**Problem**: `command not found: shokunin`

**Fix**:
```bash
# Check installation
which shokunin

# If not found, reinstall
cd /path/to/shokunin-review
./bin/install
```

---

### Review Issues

**Problem**: Review takes too long

**Fix**:
```bash
# Use fast mode
shokunin review file.md --mode fast

# Or check file size
ls -lh file.md  # Should be < 100KB
```

---

### Misclassification

**Problem**: Wrong document type detected

**Fix**:
```bash
# Override type
shokunin review file.md --type prd
```

---

## Success Criteria

### Successful Onboarding

User can:

1. ✅ Install Shokunin Review
2. ✅ Run first review
3. ✅ Understand output
4. ✅ Use improve mode
5. ✅ See score improvement

### Time to First Value

- **Installation**: 2 minutes
- **First review**: 1 minute
- **Understand output**: 5 minutes
- **Total**: ~10 minutes to first value

---

**docs/scenarios/onboarding-flow.md — New user onboarding in 10 minutes.**
