# Shokunin Review Architecture Overview

## High-level architecture

```
User artifact
  → intake / parser
  → artifact classifier
  → route selection
  → validators / agents
  → finding normalization
  → scoring
  → report generation
  → optional eval harness / Test Guardian
```

## Main architectural areas

### CLI layer
- Entry point for all commands
- Command routing and argument parsing
- Output formatting and display
- File system interaction

### Review engine
- Artifact parsing and classification
- Validator selection and execution
- Finding collection and normalization
- Scoring and confidence calculation
- Score cap application

### Validator registry
- Multiple validator types for different artifact aspects
- Evidence, decision, metric, requirement, feasibility, strategy validators
- Severity calibrator for consistent severity assignment
- Output guard for safety

### Eval harness
- Structured test case definitions
- Expected findings validation
- Score band calibration
- Regression detection and tracking
- Report generation

### Security routing
- Security task classification
- Defensive route selection
- Safety judge boundary enforcement
- Human approval workflows

### Agent definitions
- Multi-agent workflows for AI-assisted development
- Builder, Test Guardian, Judge verification loop
- Eval Calibrator for quality improvement
- Security agents for defensive review

### Reports and traces
- Review output formatting
- Trace generation for debugging
- Regression reports
- Quality metrics

## Key source paths

### CLI implementation
```
cli/src/
  commands/       - Command implementations (review, eval, etc.)
  utils/          - Shared utilities and helpers
  validators/     - Validator implementations
  types/          - TypeScript type definitions
  cli.ts          - Main CLI entry point
```

### Eval harness
```
harness/
  evals/          - Eval case definitions by artifact type
  expected_findings/ - Finding taxonomy and definitions
  score_calibration/ - Score band calibration data
  regression/     - Regression detection and tracking
  reports/        - Generated reports and traces
```

### Skills and validators
```
skills/           - Skill definitions for review logic
references/       - Validator reference implementations
```

### Agents
```
.claude/agents/   - Agent definitions for multi-agent workflows
```

### Examples
```
examples/         - Example artifacts for testing and demos
```

### Scripts
```
scripts/          - Verification and quality check scripts
```

## Data flow

### Review flow (data and control flow)

### Review flow (data and control)
1. User provides artifact file path
2. CLI reads and parses artifact
3. Artifact classifier determines type (PRD, RFC, etc.)
4. Router selects appropriate validators
5. Validators execute and produce findings
6. Findings are normalized and scored
7. Score caps are applied based on blockers
8. Report is generated and displayed

### Eval flow (data and control)
1. Eval case YAML is loaded
2. Input artifact is processed through review engine
3. Actual findings are compared to expected findings
4. Score band is validated
5. Regression data is updated
6. Report is generated

### Verification flow (data and control)
1. Builder implements changes
2. Build and unit tests run
3. Test Guardian runs real eval harness
4. Judge verifies results and decides PASS/RETRY/BLOCKED
5. Commit proceeds or is blocked

## Security architecture

### Defensive security routing
- Security task classification before handling
- Route selection from routing table
- Defensive-only reviewer agents
- Safety judge boundary enforcement

### Safety boundaries
- No offensive security instructions
- No exploit development guidance
- Human approval for critical findings
- Safe refusal for unsafe requests

### Data handling
- No storage of sensitive content by default
- Local-only and no-trace modes available
- Input sanitization and validation

## Current limitations

### Implementation status
- CLI layer is implemented and functional
- Review engine is operational
- Eval harness exists but calibration is ongoing
- Security routing is implemented
- Multi-agent workflows are functional

### Technical debt
- Eval calibration is not complete
- Some score bands may need adjustment
- Limited observability and monitoring
- Regression detection is basic
- Web/API surfaces are not implemented

### Known issues
- Generated reports should not be committed (may contain sensitive data)
- Some documented features are not yet fully implemented
- Competitor analysis is incomplete
- Limited integration with CI/CD systems

## Non-functional requirements

### Performance
- Reviews should complete in seconds for typical documents
- Eval harness should scale to hundreds of test cases
- CLI should remain responsive during processing

### Security
- Defensive-only security review
- No storage of sensitive content by default
- Input validation and sanitization
- Safe handling of security-sensitive tasks

### Reliability
- Deterministic scoring for consistent results
- Graceful handling of malformed input
- Clear error messages for failures

### Maintainability
- Clear separation of concerns
- Well-defined interfaces between components
- Comprehensive tests for non-trivial logic
- Documentation for architecture and workflows

## Related documentation

- `docs/architecture/system-architecture.md` - Detailed system architecture
- `docs/architecture/scoring-model.md` - Scoring logic and caps
- `docs/architecture/feedback-loop.md` - Feedback workflows
- `docs/agent-orchestration.md` - Multi-agent workflows
- `docs/eval-harness.md` - Eval harness architecture
- `docs/security-routing.md` - Security routing architecture
- `docs/test-guardian.md` - Verification workflow
- `SECURITY.md` - Security principles and data handling
