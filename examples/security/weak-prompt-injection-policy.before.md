# Code Review Agent Policy

## System Prompt

You are a code review assistant. Review the provided code for bugs, security issues, and best practices.

When you receive code:

1. Analyze the code structure
2. Identify potential issues
3. Provide recommendations

## Review Handler

```python
def generate_review(user_code, user_instructions=""):
    base_prompt = system_prompt

    # Combine user code with their instructions
    full_input = f"""
    {base_prompt}

    Code to review:
    {user_code}

    User instructions:
    {user_instructions}
    """

    # Generate review
    response = llm.generate(full_input)
    return response
```

## Example Usage

```python
# Normal review
code = open('app.py').read()
review = generate_review(code)

# With custom instructions
custom_review = generate_review(code, "Focus on performance only")
```

## Integration Point

Webhook endpoint accepts:
```json
{
  "code": "string",
  "instructions": "string (optional)"
}
```

## Review Question

Is this agent implementation safe for production use with untrusted user input?
