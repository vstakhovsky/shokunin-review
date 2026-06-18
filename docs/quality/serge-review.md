# Serge AI Code Review

Shokunin Review uses Hugging Face Serge as an AI code review assistant for GitHub Pull Requests.

Serge reviews PR diffs and posts inline comments. It is useful for catching code review issues, path regressions, scoring logic mistakes, missing tests, and security concerns in automation.

## What Serge Is Good For

Serge can help review:

- TypeScript correctness
- CLI command behavior
- scoring math and score caps
- feedback/correction loop changes
- broken paths after repository cleanup
- missing tests
- GitHub Actions permissions
- secret handling
- unsafe file or shell access

## What Serge Does Not Guarantee

Serge is not a complete security scanner.

It should not be treated as a guarantee that the repository has no bugs or vulnerabilities.

Use it together with:

- tests
- TypeScript checks
- dependency checks
- GitHub CodeQL
- Dependabot
- human review

## Setup

### 1. Add Repository Secret

Go to:

```text
GitHub repository → Settings → Secrets and variables → Actions → New repository secret
```

Add:

```text
LLM_API_KEY
```

Use an OpenAI-compatible LLM provider key.

Never commit this key to the repository.

### 2. Add Review Rules

Serge review behavior is configured in:

```text
.ai/review-rules.md
```

### 3. Trigger Serge

Open a Pull Request and add a comment:

```text
@askserge please review
```

For a more focused review, use:

```text
@askserge please review this PR.

Focus on:
- TypeScript correctness
- CLI command behavior
- scoring math and score caps
- feedback/correction loop
- broken paths after repository cleanup
- missing tests
- GitHub Actions and secret handling
- unsafe file or shell access

Avoid:
- style-only comments
- generic suggestions
- comments that do not require action

Please classify each issue as blocker, major, minor, or nit.
```

## Recommended Test PR

To test Serge safely:

```bash
git checkout -b test-serge-review
mkdir -p docs/quality
echo "" >> docs/quality/serge-review.md
git add docs/quality/serge-review.md
git commit -m "Test Serge review"
git push -u origin test-serge-review
```

Then create a PR and comment:

```text
@askserge please review
```

## Security Notes

- Keep `LLM_API_KEY` only in GitHub Secrets.
- Use minimal GitHub Actions permissions.
- Do not allow PR content to execute shell commands.
- Do not expose secrets in logs.
- Review Serge comments critically before applying suggestions.

