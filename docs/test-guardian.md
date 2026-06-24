# Test Guardian Workflow

## Why This Exists

Claude Code previously reported "tests passed, implementation complete" but the real eval harness showed **0/33 passed** (later **5/33 passed**). This was unacceptable.

The Test Guardian prevents false success reports by running real terminal commands and checking their actual output, not summaries.

## Why Unit Tests Are Not Enough

Unit tests verify code structure and logic. They do not verify that the eval harness produces correct results on real artifacts.

**The problem:**
- Unit tests pass ✓
- Build compiles ✓
- Eval harness shows 5/33 passed ❌
- Commit proceeds anyway ❌

**The solution:**
- Test Guardian runs real eval harness
- Inspects actual output (5/33 passed)
- Blocks commit honestly
- Forces return to Builder or Eval Calibrator

## Commands Before Commit

Before committing changes to the eval harness:

```bash
bash scripts/verify-eval.sh
```

This runs:
1. Build check (`cd cli && npm run build`)
2. Unit tests (`npm test -- --testPathPattern="eval"`)
3. Eval harness (`node cli/dist/cli.js eval --report`)
4. Report verification (file exists at `harness/reports/latest_eval_report.md`)

## Blocking Failures

A commit is **BLOCKED** if:
- TypeScript build fails (exit code ≠ 0)
- Eval unit tests fail (exit code ≠ 0)
- Real eval harness returns 0 passed cases
- Supported artifacts (PRD, RFC, Experiment, Strategy) are marked Unsupported
- Eval reports are not generated
- Baseline is updated after a failed eval

## Quality Gates

### Hard Blockers (must pass)
```bash
# Build must compile
cd cli && npm run build
# Exit code: 0 (pass) or ≠ 0 (fail)

# Unit tests must pass
npm test -- --testPathPattern="eval"
# Exit code: 0 (pass) or ≠ 0 (fail)

# Eval harness must return > 0 passed
node cli/dist/cli.js eval
# Output: "Eval Results: 5/33 passed" (fail if 0)

# Supported artifacts must not be Unsupported
# Output must NOT contain: "prd.*Unsupported", "rfc.*Unsupported", etc.

# Report must be generated
[ -f "harness/reports/latest_eval_report.md" ]
# Exit code: 0 (exists) or 1 (missing)
```

### Quality Thresholds (recommended but not blocking)
- Eval pass rate: ≥ 20% (7/33 or better)
- Critical recall: ≥ 90%
- Finding recall: ≥ 75%
- Score calibration error: ≤ 8

## Why Baseline Should Not Update After Bad Run

Updating baselines when the eval harness is broken would bake in bad behavior.

**Bad pattern:**
```text
Eval: 5/33 passed (15%)
→ Update baseline to match current (bad) state
→ Future evals pass because baseline was lowered
→ Quality degrades silently
```

**Good pattern:**
```text
Eval: 5/33 passed (15%)
→ BLOCK baseline update
→ Fix scorer or fixtures
→ Re-run eval: 25/33 passed (76%)
→ Now baseline update is safe
```

Baseline updates only when:
- Eval harness passes quality threshold (≥ 20%)
- Score calibration is within acceptable bounds
- No regressions detected

## Quick Reference

| Check | Command | Fail State |
|-------|---------|------------|
| Build | `cd cli && npm run build` | Exit code ≠ 0 |
| Unit tests | `cd cli && npm test -- --testPathPattern="eval"` | Exit code ≠ 0 |
| Eval harness | `node cli/dist/cli.js eval` | Output contains "0/.*passed" |
| Unsupported | `node cli/dist/cli.js eval` | Output matches "prd\|rfc\|experiment\|strategy.*Unsupported" |
| Report | `node cli/dist/cli.js eval --report` | File missing at `harness/reports/latest_eval_report.md` |

## Multi-Agent Context

The Test Guardian is part of a bounded verification loop:

```text
Builder → Eval Calibrator → Test Guardian → Judge → PASS / RETRY / BLOCKED
```

**Test Guardian role:**
- Run verification script
- Check all quality gates
- Report pass/fail status
- Block commit if gates fail

**After Test Guardian:**
- If passed → Judge decides PASS
- If failed → Judge decides RETRY or BLOCKED

See [Agent Orchestration](./agent-orchestration.md) for complete workflow details.

## Prevention

The Test Guardian prevents the failure mode where:
- Implementation appears complete
- Unit tests pass
- Real eval harness fails
- Commit proceeds anyway

**Now:** verification runs real commands → checks real output → blocks bad commits → forces return to Builder/Eval Calibrator → honest failure reports.

## Example Output

```text
🔍 Shokunin Verification
========================
📦 Building...
✅ Build passed

🧪 Running eval unit tests...
✅ Eval unit tests passed

🎯 Running real eval harness...
Eval Results: 5/33 passed
28 evals failed ❌

❌ FAIL: Eval harness returned 0 passed cases
Exit code: 1

=== VERIFICATION SUMMARY ===
Build: pass
Unit tests: pass
Eval harness: FAIL (5/33 passed)
Report generated: yes
Commit allowed: NO
Blocking reasons: Eval harness shows 5/33 passed (< 20% threshold)
Next action: Return to Builder or Eval Calibrator
```

## Files

- [Test Guardian Agent](../.claude/agents/shokunin-test-guardian.md)
- [Verification Script](../scripts/verify-eval.sh)
- [Agent Orchestration](./agent-orchestration.md)
