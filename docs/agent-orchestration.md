# Shokunin Agent Orchestration

Shokunin Review uses a bounded multi-agent verification workflow to prevent false success reports and ensure eval harness quality.

## Workflow

```text
Builder
  → Eval Calibrator
  → Test Guardian
  → Judge
  → PASS / RETRY / BLOCKED
```

## Agents

### Builder Agent
- **Purpose:** Implement code and documentation changes
- **Never:** Claim success based only on build or unit tests
- **Always:** Provide changed files and verification commands
- **Location:** `.claude/agents/shokunin-builder.md`

### Eval Calibrator Agent
- **Purpose:** Inspect and improve eval harness quality
- **Inspects:** `harness/evals/**`, score calibration, expected findings
- **Detects:** Score band mismatch, severity mismatch, false positives, missed blockers
- **Location:** `.claude/agents/shokunin-eval-calibrator.md`

### Test Guardian Agent
- **Purpose:** Run real commands and block false success reports
- **Runs:** `bash scripts/verify-eval.sh`
- **Blocks:** Build failures, test failures, 0 eval passed, Unsupported artifacts
- **Location:** `.claude/agents/shokunin-test-guardian.md`

### Judge Agent
- **Purpose:** Make final decision after all agents finish
- **Decisions:** PASS (commit allowed), RETRY (needs work), BLOCKED (structural issue)
- **Location:** `.claude/agents/shokunin-judge.md`

## Bounded Loop Guidance

```text
max_iterations: 3 by default
max_iterations: 5 for deeper calibration
max_iterations: 10 only for manual deep repair
```

### Why Bounded Loops Matter

1. **Avoid infinite fixing** - Force clear failure reports after max iterations
2. **Avoid rabbit holes** - Prevent over-tuning for marginal gains
3. **Keep changes reviewable** - Small iteration counts keep diffs manageable
4. **Force clear failure reports** - If it can't be fixed in 3 tries, report the blocker

## Example Workflows

### Successful Workflow (PASS)

```text
Iteration 1/3:
Builder: "Implemented new scorer"
Test Guardian: "Build: pass, Tests: pass, Eval: 25/33 passed"
Judge: "Decision: PASS - Score: 85/100, commit allowed"
```

### Calibration Workflow (RETRY → PASS)

```text
Iteration 1/3:
Builder: "Added new validator"
Test Guardian: "Build: pass, Tests: pass, Eval: 18/33 passed"
Judge: "Decision: RETRY - Score bands need calibration"

Iteration 2/3:
Eval Calibrator: "Adjusted score bands for strong fixtures"
Test Guardian: "Build: pass, Tests: pass, Eval: 26/33 passed"
Judge: "Decision: PASS - Score: 88/100, commit allowed"
```

### Blocked Workflow (BLOCKED)

```text
Iteration 1/3:
Builder: "Implemented new scorer"
Test Guardian: "Build: fail - TypeScript error"
Judge: "Decision: RETRY - Build failed"

Iteration 2/3:
Builder: "Fixed TypeScript error"
Test Guardian: "Build: pass, Tests: pass, Eval: 5/33 passed"
Judge: "Decision: RETRY - Eval quality too low"

Iteration 3/3:
Eval Calibrator: "Cannot improve score bands further - scorer issue"
Test Guardian: "Build: pass, Tests: pass, Eval: 5/33 passed"
Judge: "Decision: BLOCKED - Max iterations reached, requires scorer redesign"
```

## Verification Commands

The Test Guardian always runs:
```bash
bash scripts/verify-eval.sh
```

This script checks:
1. Build: `cd cli && npm run build`
2. Unit tests: `npm test -- --testPathPattern="eval"`
3. Eval harness: `node cli/dist/cli.js eval --report`
4. Report generation: File exists at `harness/reports/latest_eval_report.md`

## Quality Gates

### Hard Blockers (must pass)
- TypeScript build compiles without errors
- Unit tests pass
- Eval harness returns > 0 passed cases
- Supported artifacts (PRD, RFC, Experiment, Strategy) are not Unsupported
- Report file is generated

### Quality Thresholds (recommended)
- Eval pass rate: ≥ 20% (7/33 or better)
- Critical recall: ≥ 90%
- Finding recall: ≥ 75%
- Score calibration error: ≤ 8

## Failure Modes Prevented

### Before (False Success)
```text
Builder: "Implementation complete ✓"
Unit tests: "Passing ✓"
Real eval harness: "5/33 passed ❌"
Commit: "Proceeds anyway ❌"
```

### After (Honest Failure)
```text
Builder: "Implementation done, handing off to verification"
Test Guardian: "Build: pass, Tests: pass, Eval: 5/33 failed ❌"
Judge: "Decision: RETRY - Eval quality too low, commit blocked ✓"
```

## Using the Workflow

When implementing changes to Shokunin Review:

1. **Builder Agent** implements the change
2. **Test Guardian Agent** runs `bash scripts/verify-eval.sh`
3. **If eval quality is low**, **Eval Calibrator Agent** inspects and tunes
4. **Test Guardian Agent** re-runs verification
5. **Judge Agent** makes final decision: PASS, RETRY, or BLOCKED

The loop continues until PASS or BLOCKED (max iterations reached).

## Documentation

- [Builder Agent](../.claude/agents/shokunin-builder.md)
- [Eval Calibrator Agent](../.claude/agents/shokunin-eval-calibrator.md)
- [Test Guardian Agent](../.claude/agents/shokunin-test-guardian.md)
- [Judge Agent](../.claude/agents/shokunin-judge.md)
- [Test Guardian Documentation](./test-guardian.md)
