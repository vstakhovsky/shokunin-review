# Ponytail review setup

## Summary

This repository includes Ponytail skills for Claude Code.

Ponytail helps review code and agent-generated changes through a "lazy senior developer" lens: remove unnecessary complexity, avoid speculative abstractions, prefer existing code, and keep implementation small.

## Why this is useful for Shokunin Review

Shokunin Review is a terminal-first validation harness for reviewing PRDs, RFCs, strategy documents, and experiment plans.

Because the project itself is built with AI-assisted coding workflows, it needs a lightweight quality guard against over-engineering.

Ponytail is useful as a second review pass after correctness-focused checks.

## Added skills

The following Poniew`
- `ponytail-audit`
- `ponytail-debt`
- `ponytail-help`

## Recommended usage

Use Ponytail when reviewing agent-generated code changes, especially after Claude Code or Codex adds new files, abstractions, helper layers, or dependencies.

Useful prompts:

Use `ponytail-review` on the latest diff. Focus only on over-engineering. What can we delete?

Run `ponytail-audit` on this repository. Find speculative abstractions, unnecessary dependencies, duplicated helpers, and code that can be removed.

Use Ponytail full mode. Implement the smallest working change. Prefer existing code and standard library. Do not add new abstractions unless required.

## Review focus

Ponytail should check for:

- unnecessary abstractions
- one-use interfaces
- factories with one implementation
- speculative configuration
- unused flexibility
- new dependencies that native tools can replace
- duplicated helper functions
- verbose code that can be safely simplified
- files added without clear product or engineering value

## Boundaries

Ponytail is not a replacement for:

- correctness review
- security review
- TypeScript build
- test coverage
- eval harness regression tests

Ponytail should not delete important safety logic, input validation, error handling, security checks, or accessibility basics.

## Recommended Shokunin Review workflow

Use this flow for local review:

1. Run normal build and tests.
2. Run Shokunin eval harness.
3. Use `ponytail-review` on the diff.
4. Decide what to simplify or delete.
5. Commit only the smallest useful change.

Example local commands:

cd cli
npm run build
npm test
cd ..

shokunin eval --report --trace

Then ask Claude Code:

Use `ponytail-review` on this diff. Only report over-engineering. Do not rewrite code automatically.

## Source

Ponytail repository:

https://github.com/DietrichGebert/ponytail
