# Decision Log

## What is the Decision Log?

The Decision Log is a structured record that tracks which recommendations from Shokunin Review were accepted, rejected, or deferred by the responsible human (PM, team lead, or owner).

## Why it exists

AI-powered review tools can produce many findings and recommendations. Without tracking which recommendations were acted upon, it's impossible to:

1. **Measure review impact** - Which findings actually improved the artifact?
2. **Maintain accountability** - Who accepted or rejected each finding?
3. **Enable learning** - Which validators produce high-value vs noisy findings?
4. **Support audit trails** - Why was a decision made?
5. **Close the loop** - Follow up on deferred recommendations

## How it tracks recommendations

Each significant finding or recommendation from Shokunin Review should be recorded with:

- **Decision ID** - Unique identifier for the decision
- **Artifact ID** - Which document/artifact was reviewed
- **Recommendation ID** - Which finding is being decided on
- **Decision** - accepted, rejected, deferred, needs_more_evidence, requires_lead_approval
- **Owner** - Who made the decision (product_manager, tech_lead, etc.)
- **Reason** - Why the decision was made
- **Follow-up action** - What happens next
- **Status** - Current state of the decision
- **Created at** - When the decision was recorded

## Example schema

```yaml
decision_id: decision_001
artifact_id: prd_ai_food_agent
recommendation_id: finding_missing_primary_metric
decision: accepted
owner: product_manager
reason: "Primary metric is required before stakeholder review."
follow_up_action: "Add recommendation-to-order conversion rate as primary metric."
status: open
created_at: 2026-06-25
```

## Decision statuses

- **accepted** - Recommendation accepted and will be implemented
- **rejected** - Recommendation rejected after consideration
- **deferred** - Recommendation deferred to later phase or review
- **needs_more_evidence** - Requires more information before deciding
- **requires_lead_approval** - Escalated to team lead or higher authority

## How this supports accountability

The Decision Log helps PMs and team leads:

1. **Stand behind decisions** - Clear record of what was accepted and why
2. **Explain choices** - Reason field captures the rationale
3. **Track follow-through** - Status field shows if action was completed
4. **Review patterns** - See which types of findings are usually accepted/rejected
5. **Maintain audit trail** - For compliance, retrospectives, or post-mortems

## Current implementation status

### Status: Not yet implemented

The Decision Log is currently a **roadmap item**. The design and schema are documented here, but there is no persistence layer or CLI integration yet.

### What would be needed for implementation

1. **Decision log schema** - YAML or JSON structure
2. **Storage mechanism** - Local file storage or database
3. **CLI commands** - `shokunin decisions`, `shokunin accept`, `shokunin reject`, `shokunin defer`
4. **Report generation** - Show accepted/rejected/deferred counts by artifact or time period
5. **Integration with review output** - Link findings to decisions

## Example workflow (future)

```bash
# Review a document
shokunin review prd.md

# Accept a finding
shokunin accept prd.md --finding F-001 --reason "Required for stakeholder review"

# Reject a finding
shokunin reject prd.md --finding F-002 --reason "Out of scope for MVP"

# Defer a finding
shokunin defer prd.md --finding F-003 --reason "Will address in Phase 2"

# Show decision log
shokunin decisions prd.md

# Generate decision report
shokunin decisions --report --period 2026-06
```

## Design considerations

1. **Privacy** - Decision logs may contain sensitive product information
2. **Storage** - Local-first by default, optional cloud sync
3. **Format** - Human-readable YAML or JSON
4. **Git integration** - Optional commit to repository for audit trail
5. **Search** - Filter by artifact, owner, decision type, date range
