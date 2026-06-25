# Shokunin Review Product Architecture Roadmap

## Why this matters

Shokunin Review is not just an AI PM assistant. It is a validation harness for reviewing product documents, technical artifacts, AI-assisted outputs, and security-sensitive workflows.

The goal is to combine:

- Skills
- Evals
- Review loops
- Decision logs
- Trace review
- Human gates
- Future MCP integrations

## Architecture components

| Component | What it means | Current status | Next step |
|---|---|---|---|
| Skills | Review modes such as PRD review, RFC review, experiment review, strategy review | Partially implemented / documented | Formalize skill entrypoints and examples |
| Evals | Weak/strong cases, missing metrics, trade-offs, overclaiming, security gaps | Implemented / WIP calibration | Improve pass rate and regression reliability |
| Loops | Review → fix → re-review → readiness score delta | Partially implemented through verification loop and review delta reporting | Add explicit re-review workflow examples |
| MCP integrations | GitHub, Notion/Obsidian, Google Drive, Linear/Jira | Roadmap | Add integration design docs before implementation |
| Decision Log | Track which recommendations were accepted, rejected, or deferred | Not yet implemented | Add decision log schema and example |
| Trace Review | Explain why a finding was produced and which evidence was used | Partially implemented through traces/reports | Add trace review documentation and readable reports |
| Human Gate | Final decision remains with PM / team lead | Documented in security/human approval concepts | Add human gate workflow and approval states |

## Positioning statement

Shokunin Review should look stronger than a generic AI assistant because it does not only generate advice. It routes, evaluates, verifies, explains, and requires human judgment before acceptance.

## Current implementation status

### Implemented
- Terminal-first review skills for PRD, RFC, Experiment Plan, Product Strategy
- Eval harness with weak/strong cases
- Security routing layer for defensive review
- Verification loop and multi-agent orchestration
- Before/after examples

### Partially implemented
- Trace/reports generation
- Verification workflow
- Review modes and entrypoints

### WIP
- Eval calibration and regression reliability
- Security route coverage
- Score calibration accuracy

### Roadmap
- MCP integrations (GitHub, Notion/Obsidian, Google Drive, Linear/Jira)
- Decision log schema and persistence
- Human-readable trace review UX
- Full human approval workflow

### Not started
- Persistent decision log storage
- Integration implementations
- Production deployment of MCP services

## Architecture diagram

```
Skills (Review modes)
  ↓
Evals (Quality verification)
  ↓
Review Loops (Fix → re-review → score delta)
  ↓
Trace Review (Explain findings)
  ↓
Human Gate (Final decision)
  ↓
Decision Log (Track outcomes)
```

## Why this architecture matters

This architecture moves Shokunin Review from a simple review tool to a comprehensive validation harness:

1. **Skills** provide targeted review modes for different artifact types
2. **Evals** ensure review quality is measured and regression-tested
3. **Loops** enable continuous improvement through re-review cycles
4. **Trace Review** provides transparency into why findings were produced
5. **Human Gate** keeps humans accountable for final decisions
6. **Decision Log** creates audit trail for product and technical decisions
7. **MCP integrations** will connect reviews to existing workflows

## Next steps

1. Complete eval calibration and improve pass rates
2. Add decision log schema and examples
3. Add human-readable trace review documentation
4. Design MCP integration patterns
5. Add human gate workflow examples
