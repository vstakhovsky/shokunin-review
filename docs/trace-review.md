# Trace Review

## What is Trace Review?

Trace Review is the capability to explain **why** Shokunin Review produced a specific finding, which evidence it used, how it arrived at a severity score, and what impact that finding had on the overall readiness score.

## Why it matters

AI-powered review tools can be opaque. When Shokunin Review flags a blocker or assigns a low score, users need to understand:

1. **What evidence was found?** - Which parts of the document triggered the finding?
2. **Why this severity?** - Why is this critical vs minor?
3. **How much impact?** - How much did this finding affect the score?
4. **What was the logic?** - Which validator or rule produced this?

Without trace review, users must trust the review output blindly. With trace review, they can verify the reasoning and debug false positives.

## How it connects to review components

Trace Review ties together several review components:

1. **Validators** - Which validator produced the finding?
2. **Evidence** - Which specific content in the artifact triggered it?
3. **Severity** - Why was this severity assigned?
4. **Score impact** - How much did this change the readiness score?
5. **Eval results** - How does this compare to expected findings?

## Example output

```markdown
## Trace Review Example

**Finding:** missing-primary-metric
**Validator:** Metric Reviewer
**Evidence:** PRD mentions business impact ("increase sales, improve retention") but does not define a measurable primary success metric.
**Severity:** high
**Score impact:** -12
**Suggested fix:** Add a primary metric with baseline, target, and decision rule.
**Human decision:** pending
```

## Current implementation status

### Status: Partially implemented

Trace/reports exist in the system, but human-readable trace review is a **roadmap / WIP capability**.

### What exists now

- Generated reports in `harness/reports/`
- Basic trace information in review output
- Score breakdown and impact explanation

### What is missing

- Standardized trace format
- Human-readable trace review UX
- Direct linking from findings to evidence
- Debug mode for false positive investigation
- Trace comparison across review runs

## Future trace review features

### Planned capabilities

1. **Evidence highlighting** - Show exactly which text triggered the finding
2. **Validator explanation** - Explain which validator logic was applied
3. **Score attribution** - Show how each finding affected the final score
4. **Comparison mode** - Compare traces between two review runs
5. **Debug mode** - Verbose output for investigating unexpected results
6. **False positive reporting** - Easy way to flag and explain incorrect findings

### Example future workflow

```bash
# Review with trace output
shokunin review prd.md --trace

# Show detailed trace for a finding
shokunin trace prd.md --finding F-001

# Compare traces between versions
shokunin trace --compare prd.md prd-revised.md

# Debug mode for investigation
shokunin review prd.md --debug --trace
```

## Why trace review matters for trust

### For users

- **Transparency** - See exactly why a finding was produced
- **Verification** - Check if the evidence actually supports the finding
- **Learning** - Understand what triggers different validators
- **Debugging** - Investigate false positives or unexpected scores

### For maintainers

- **Validator tuning** - See which validators are producing useful findings
- **Calibration** - Understand score impact and severity assignment
- **Regression testing** - Compare traces across versions
- **Quality assurance** - Audit why specific recommendations were made

### For organizations

- **Compliance** - Explain why artifacts were flagged or rejected
- **Consistency** - Ensure similar issues are flagged consistently
- **Process improvement** - Identify patterns in review findings
- **Training** - Use traces to train PMs and engineers on common issues

## Trace review vs decision log

- **Trace review** explains *why* a finding was produced (technical trace)
- **Decision log** tracks *what* was done with the finding (human decision)

Both are important for a complete validation harness:

1. **Trace review** → Transparency and debugging
2. **Decision log** → Accountability and follow-through
