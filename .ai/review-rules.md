# Serge Review Rules for Shokunin Review

You are reviewing Shokunin Review, a TypeScript CLI and validation harness for reviewing PRDs, RFCs, strategy docs, and experiment plans.

## Review Priorities

Focus on:

- correctness bugs
- TypeScript errors
- CLI command behavior
- scoring math mistakes
- score caps and penalty logic
- feedback/correction loop bugs
- broken file paths after repository restructuring
- missing tests for behavior changes
- security issues around secrets, tokens, file access, and shell execution
- unsafe assumptions in GitHub Actions or automation
- regressions in review output format
- documentation/code mismatch

## High-Priority Paths

Pay special attention to:

- `cli/`
- `cli/src/commands/`
- `cli/src/utils/`
- `cli/src/types/`
- `harness/evals/`
- `.github/workflows/`
- `.ai/`
- `skills/`
- `references/`

## Avoid Low-Value Comments

Avoid:

- style-only comments
- formatting comments unless formatting breaks behavior
- generic advice
- comments on generated files
- repeating the same issue multiple times
- suggesting large rewrites when a small fix is enough

## Required Comment Format

Every review comment should include:

1. Concrete issue
2. Why it matters
3. Smallest useful fix
4. Severity: blocker, major, minor, or nit

## Security Review Focus

Check that changes do not:

- expose GitHub tokens
- expose LLM API keys
- allow PR content to control review policy
- execute arbitrary shell commands from PR content
- allow `.ai/review-rules.md` from a PR branch to override trusted default-branch policy
- write to repository contents unless explicitly configured
- use overly broad GitHub permissions
- leak repository or user data to logs

## Project-Specific Review Focus

For Shokunin Review, pay special attention to:

- scoring trace math:
  - penalties must reduce scores
  - score caps must only lower final score
  - weak documents should not receive inflated scores
- feedback correction loop:
  - feedback should be stored as signal
  - feedback should not automatically mutate validators/scoring
  - false positives and missed issues should be traceable
- CLI behavior:
  - commands should work from the expected package directory
  - file paths should remain correct after repo restructuring
  - local runtime folders like `.shokunin/` should not be committed
- eval harness:
  - weak/improved/good/strong fixtures should remain meaningful
  - tests should check behavior, not filenames
