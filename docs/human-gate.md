# Human Gate

## What is the Human Gate?

The Human Gate is the principle that **final acceptance or rejection of findings and decisions always belongs to a human** — the PM, team lead, security reviewer, or responsible owner.

## Why it exists

AI can recommend, score, and route reviews. But AI should not make final decisions about:

1. **Product strategy** - What to build and when
2. **Technical direction** - How to build it
3. **Risk acceptance** - Which risks are acceptable
4. **Resource allocation** - What gets prioritized
5. **Security posture** - What security measures are sufficient

The Human Gate ensures that AI assists but does not replace human judgment.

## What AI can do

✅ **AI capabilities:**
- Identify potential issues and blockers
- Suggest concrete improvements
- Score readiness and confidence
- Route to appropriate reviewers
- Explain findings with evidence
- Generate structured reports

## What humans must decide

❌ **Human-only decisions:**
- Accept or reject recommendations
- Override score assessments
- Approve or reject artifacts for stakeholder review
- Make go/no-go decisions on experiments
- Approve security-sensitive changes
- Accept technical trade-offs

## Human Gate workflow

```
AI Review → Findings & Score → Human Review → Accept/Reject → Final State
```

### Example flows

**PRD Review:**
```text
Shokunin Review: "Score 36/100 - Missing primary metric, no MVP scope"
PM: Reviews findings, accepts missing-metric, defers mvp-scope
PM: Adds metric, marks finding as "accepted - completed"
Re-review: "Score 68/100 - Metric added, MVP scope still deferred"
PM: Accepts current state for stakeholder review with caveats
Human Gate: PM decides artifact is ready despite incomplete scope
```

**Security Review:**
```text
Shokunin Security Router: "Flagged - potential secret exposure"
Security Reviewer: Reviews finding, confirms it's a false positive (test data)
Security Reviewer: Rejects finding with reason "Test credential, not production"
Human Gate: Security reviewer signs off on safety
```

## Approval states

| State | Meaning | Who can set |
|---|---|---|
| pending | Awaiting human decision | PM, team lead, owner |
| approved | Finding or artifact approved | PM, team lead, owner |
| rejected | Finding or artifact rejected | PM, team lead, owner |
| needs_revision | Artifact requires changes before approval | PM, team lead, owner |
| escalated | Requires higher-level approval | Any reviewer |

## When explicit approval is required

### Critical findings

For critical findings, explicit human approval is required:

- **Security issues** - Must be reviewed by security owner
- **Data privacy** - Must be reviewed by privacy/legal owner
- **Major scope changes** - Must be reviewed by product lead
- **Architecture decisions** - Must be reviewed by tech lead
- **Experiment go/no-go** - Must be reviewed by data science lead

### Approval thresholds

```text
Score 0-39 (Not review-ready): Human must accept before stakeholder review
Score 40-59 (Needs revision): Human must approve before re-review
Score 60-74 (Needs major fixes): Human can approve with caveats
Score 75-89 (Ready with minor fixes): Human can approve for review
Score 90-100 (Review-ready): Human gate still required for final sign-off
```

## Baseline update protection

To prevent regression, the Human Gate blocks certain actions:

**Blocked actions:**
- Updating eval baselines after failed eval runs
- Lowering severity of critical findings without evidence
- Reducing score caps without documented reason
- Bypassing security routing for sensitive content

**Allowed actions:**
- Updating baselines after verified improvements
- Adjusting severity with documented justification
- Modifying score caps through proper change process

## Current implementation status

### Status: Documented in concept

The Human Gate is documented as a principle but not fully implemented as a workflow.

### What exists now

- Security routing requires human approval for defensive review
- Documentation mentions human responsibility for final decisions
- Feedback system allows humans to correct incorrect findings

### What is missing

- Formal human gate workflow in the review cycle
- Approval state management
- Explicit approval tracking
- Integration with decision log
- Approval UI or CLI commands

## Example future workflow

```bash
# Review requires human decision
shokunin review prd.md
# Output: "Score 36/100 - Requires human approval before stakeholder review"

# Human approves with caveats
shokunin approve prd.md --findings F-001,F-002 --caveats "MVP scope deferred to Phase 2"

# Human rejects finding
shokunin reject prd.md --finding F-003 --reason "Out of scope for MVP"

# Check approval status
shokunin status prd.md
# Output: "Pending approval - 3 findings accepted, 1 rejected, requires lead sign-off"

# Final approval
shokunin approve-final prd.md --approver "Product Manager" --reason "Ready for stakeholder review with documented caveats"
```

## Human Gate principles

1. **AI recommends, humans decide** - Final authority always with humans
2. **Critical findings require explicit approval** - Can't auto-approve security or major issues
3. **Transparency** - All decisions and reasons should be recorded
4. **Accountability** - Humans own the outcomes of their decisions
5. **Continuous improvement** - Human feedback improves AI recommendations over time
