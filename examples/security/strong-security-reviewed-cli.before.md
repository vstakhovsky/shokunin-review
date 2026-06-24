# Secure CLI Tool with Proper Input Handling

## Code Review Request

Please review this secure CLI tool implementation.

```python
import subprocess
import sys
import shlex
from pathlib import Path

def validate_path(file_path):
    """Validate and sanitize file path"""
    # Resolve to absolute path
    resolved = Path(file_path).resolve()

    # Ensure path is within allowed directory
    allowed_dir = Path('/home/user/workspace').resolve()
    if not str(resolved).startswith(str(allowed_dir)):
        raise ValueError(f"Path outside allowed directory: {resolved}")

    # Prevent path traversal
    if '..' in Path(file_path).parts:
        raise ValueError(f"Path traversal not allowed: {file_path}")

    return resolved

def process_file(user_input, require_approval=True):
    """Process file with safe execution"""

    file_path = validate_path(user_input['path'])
    operation = user_input.get('operation', 'read')

    # Require human approval for destructive operations
    if operation in ['delete', 'modify'] and require_approval:
        confirmation = input(f"Approve {operation} on {file_path}? (yes/no): ")
        if confirmation.lower() != 'yes':
            return "Operation cancelled by user"

    # Use argument arrays instead of shell strings
    if operation == 'read':
        result = subprocess.run(
            ['cat', str(file_path)],
            capture_output=True,
            text=True,
            check=False
        )
        return result.stdout
    elif operation == 'delete':
        result = subprocess.run(
            ['rm', str(file_path)],
            check=False
        )
        return "File deleted"
    else:
        result = subprocess.run(
            ['ls', '-la', str(file_path)],
            capture_output=True,
            text=True,
            check=False
        )
        return result.stdout

# Main entry point with validation
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python secure_cli.py <file_path> [operation]")
        sys.exit(1)

    user_file = sys.argv[1]
    operation = sys.argv[2] if len(sys.argv) > 2 else 'read'

    try:
        output = process_file({'path': user_file, 'operation': operation})
        print(output)
    except ValueError as e:
        print(f"Validation error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
```

## Security Features

1. **Path validation:** Resolves paths and ensures they're within allowed directory
2. **No shell=True:** Uses argument arrays instead of shell strings
3. **Path traversal prevention:** Explicit check for '..' in paths
4. **Human approval:** Required for destructive operations
5. **Error handling:** Proper exception handling with exit codes
6. **Input validation:** Validates and sanitizes all user input

## Review Question

Does this implementation follow defensive security best practices?
