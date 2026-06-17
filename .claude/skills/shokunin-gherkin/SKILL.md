# Shokunin Gherkin Skill

Helps write testable requirements in Gherkin format.

## Purpose

Converts vague requirements into testable Given/When/Then format.

## When to Use

Use this skill when:
- Requirements are not testable
- Acceptance criteria missing
- Need to improve requirement quality

## Workflow

1. **Identify** — Find requirements that need Gherkin format
2. **Transform** — Convert to Given/When/Then
3. **Validate** — Check if testable
4. **Example** — Provide concrete examples

## Inputs

- Requirements text
- Context about the feature

## Output Contract

Returns Gherkin-formatted requirements:
```
Given [context]
When [action]
Then [outcome]
```

## Example

**Input**:
```
"System should be fast"
```

**Output**:
```
Given: User is on checkout page with 10 items in cart
When: User clicks "Place Order" button
Then: Order is processed within 3 seconds (p95)
And: Order confirmation page displays
And: User receives email confirmation
```

## Best Practices

- **Specific**: Concrete context and actions
- **Testable**: Binary pass/fail
- **Measurable**: Include thresholds where applicable
- **Complete**: Include all relevant outcomes
