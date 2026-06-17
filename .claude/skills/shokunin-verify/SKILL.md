# Shokunin Verify Skill

Verifies output quality before returning to user.

## Purpose

Final verification step to ensure output is safe, grounded, and useful.

## When to Use

This skill runs automatically at the end of every review. User doesn't call it directly.

## Workflow

1. **Check grounding** — Every finding grounded in artifact?
2. **Check actionability** — Every finding has concrete fix?
3. **Check specificity** — No generic advice?
4. **Check duplicates** — No duplicate findings?
5. **Check tone** — Tone calm and direct?
6. **Check safety** — No toxic language or invented evidence?
7. **Check consistency** — Score matches findings?

## Inputs

- Review findings
- Calculated score
- Verdict

## Output Contract

If verification passes:
- Output is returned to user

If verification fails:
- Findings revised
- Score recalculated if needed
- Verification re-run
- Only when all checks pass → Output returned

## Verification Checklist

- ✅ All findings reference artifact content
- ✅ All findings have location (line/section)
- ✅ All findings have concrete fix
- ✅ All findings have example (where helpful)
- ✅ No "improve clarity" without specifics
- ✅ No "add detail" without guidance
- ✅ No duplicate findings
- ✅ Tone is calm, not dramatic
- ✅ No shaming language
- ✅ No accusations of AI use
- ✅ No invented evidence
- ✅ Score aligns with findings
- ✅ Verdict matches score

## Failure Modes

If check fails:
- Finding removed or revised
- Output re-verified
- Process repeats until all pass

## Example

**Bad Finding** (fails verification):
```
"Requirements need improvement. Add more detail."
```

**Good Finding** (passes verification):
```
"Requirements section is not testable.
Location: Requirements section
Fix: Rewrite each requirement as Given/When/Then
Example: Given user on checkout, When enters payment, Then order confirmed"
```
