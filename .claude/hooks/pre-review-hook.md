# Pre-Review Hook

Validates environment and inputs before review starts.

## Purpose

Ensures review can proceed safely and correctly.

## When It Runs

Before review begins, after document intake.

## Checks

### Environment
- Shokunin Review properly installed
- Dependencies available
- File system accessible

### Input
- File exists and readable
- File format supported (or best-effort)
- File size within limits (< 1MB)

### Security
- Check for sensitive content patterns
- Warn if patterns detected
- Offer safe mode options

## Output

If checks pass:
- Review proceeds normally

If checks fail:
- Clear error message
- Suggested fix
- Review does not proceed

## Example

**File Not Found**:
```
❌ File not found: docs/missing.md

Fix: Check file path and try again.
```

**Sensitive Content Detected**:
```
⚠️ Potential sensitive content detected

Recommended:
- Use --local-only --no-trace

Continue? [Y/N]
```
