# Integrations Roadmap

## Overview

This document outlines potential MCP (Model Context Protocol) integrations for Shokunin Review.

**Important:** These are roadmap items. None of these integrations are currently implemented.

## Rule

**Do not claim these integrations are implemented until code and verification exist.**

## Candidate integrations

| Integration | Use case | Status |
|---|---|---|
| GitHub | PR review, issue comments, CI verification | Roadmap |
| Notion / Obsidian | Review product docs and knowledge base pages | Roadmap |
| Google Drive | Review shared docs and exported artifacts | Roadmap |
| Linear / Jira | Link findings to product tasks | Roadmap |

## GitHub integration

### Potential use cases

- **PR review** - Review PRDs, RFCs, and experiment plans in pull requests
- **Issue comments** - Automated review comments on document issues
- **CI verification** - Run reviews as part of CI pipeline
- **Report linking** - Link review reports to commits and branches

### What it might look like

```bash
# Review a document in a PR
shokunin review https://github.com/org/repo/pull/123/files/prd.md

# Post review as PR comment
shokunin review prd.md --post-to-pr --repo org/repo --pr 123

# CI integration
.github/workflows/shokunin-review.yml
```

### Current status

**Roadmap** - Not implemented

## Notion / Obsidian integration

### Potential use cases

- **Review Notion pages** - Review product documents stored in Notion
- **Review Obsidian vaults** - Review markdown knowledge bases
- **Sync review results** - Write findings back to Notion/Obsidian

### What it might look like

```bash
# Review a Notion page
shokunin review https://notion.site/.../prd-page

# Review Obsidian vault
shokunin review ~/obsidian-vault/product-docs/prd.md
```

### Current status

**Roadmap** - Not implemented

## Google Drive integration

### Potential use cases

- **Review shared docs** - Review Google Docs exported as markdown/text
- **Review Drive artifacts** - Review PDFs and other document types from Drive
- **Organization workflow** - Fit into existing Drive-based document processes

### What it might look like

```bash
# Review a Google Doc (exported)
shokunin review https://docs.google.com/document/d/.../export

# Review from Drive
shokunin review drive:prd-document-id
```

### Current status

**Roadmap** - Not implemented

## Linear / Jira integration

### Potential use cases

- **Link findings to tasks** - Create Linear/Jira tickets from findings
- **Track improvements** - Update task status when findings are addressed
- **Close the loop** - Mark findings as resolved in external systems

### What it might look like

```bash
# Create tickets from findings
shokunin review prd.md --create-tickets --linear

# Link specific finding to task
shokunin link prd.md --finding F-001 --linear-task LIN-123

# Update task status
shokunin resolve prd.md --finding F-001 --status done
```

### Current status

**Roadmap** - Not implemented

## Integration principles

If any of these integrations are implemented, they should follow these principles:

1. **Security-first** - Never expose secrets or sensitive data
2. **Opt-in** - User must explicitly configure and authorize each integration
3. **Local-first** - Default to local operation, optional cloud sync
4. **Transparent** - Clearly show what data is being sent where
5. **Reversible** - Easy to disconnect or revoke integration access
6. **Minimal scope** - Only request permissions needed for core functionality

## Integration design requirements

Before implementing any integration, the following must exist:

1. **Design document** - Clear scope, security model, and data flow
2. **Security review** - Approval for any external data transmission
3. **Privacy controls** - User control over what is shared
4. **Error handling** - Clear behavior when integration fails
5. **Testing** - Eval cases for integration-specific scenarios
6. **Documentation** - Setup, usage, and troubleshooting guides

## Not currently considered

The following integrations are **not** on the roadmap:

- **Slack/Discord** - Review notifications (not core to review flow)
- **Confluence** - Lower priority than Notion/Obsidian
- **Figma/Miro** - Visual diagram review (out of scope for MVP 1-5)
- **Jenkins/GitLab CI** - Lower priority than GitHub Actions
- **Azure DevOps** - Not in current roadmap

## Timeline

- **MVP 1-4** - No integrations (terminal-first focus)
- **MVP 5** - MCP server support, potential GitHub integration
- **Post-MVP 5** - Additional integrations based on user demand

## How to prioritize integrations

When considering which integration to implement first, evaluate:

1. **User demand** - How many users have requested this?
2. **Workflow fit** - Does it fit naturally into existing review workflows?
3. **Security risk** - Can we implement this safely?
4. **Maintenance cost** - Can we maintain this long-term?
5. **Value vs effort** - Is the implementation effort justified by the value?

## Verification

Before claiming any integration is implemented, ensure:

- [ ] Code exists and is tested
- [ ] Security review is complete
- [ ] Documentation exists
- [ ] Eval cases pass
- [ ] Verification script confirms integration exists
- [ ] No overclaiming in README or marketing material
