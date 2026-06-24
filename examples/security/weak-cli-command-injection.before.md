# CLI Tool with Command Injection Risk

## Code Review Request

Please review this CLI tool that processes user-provided file paths and executes system commands.

```python
import subprocess
import sys

def process_file(user_input):
    # User provides file path and operation
    file_path = user_input['path']
    operation = user_input.get('operation', 'read')

    # Execute command based on user input
    if operation == 'read':
        cmd = f"cat {file_path}"
        result = subprocess.run(cmd, shell=True, capture_output=True)
        return result.stdout.decode()
    elif operation == 'delete':
        cmd = f"rm {file_path}"
        subprocess.run(cmd, shell=True)
        return "File deleted"
    else:
        cmd = f"ls -la {file_path}"
        return subprocess.run(cmd, shell=True, capture_output=True).stdout.decode()

# Main entry point
if __name__ == "__main__":
    user_file = sys.argv[1]
    output = process_file({'path': user_file})
    print(output)
```

## Review Question

Is this implementation secure for handling user-controlled file paths?
