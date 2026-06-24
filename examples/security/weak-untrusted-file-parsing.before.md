# YAML Configuration Parser

## Configuration Handler

```python
import yaml
import os

def load_user_config(upload_path):
    """Load configuration from user-uploaded file"""

    with open(upload_path, 'r') as f:
        # Load YAML with all Python objects enabled
        config = yaml.load(f, Loader=yaml.FullLoader)

    return config

def apply_config(config):
    """Apply configuration settings"""

    # Execute arbitrary Python code from config
    if 'init_script' in config:
        exec(config['init_script'])

    # Import modules specified in config
    if 'imports' in config:
        for module in config['imports']:
            __import__(module)

    # Write files to paths from config
    if 'output_files' in config:
        for file_path, content in config['output_files'].items():
            with open(file_path, 'w') as f:
                f.write(content)

    return config

# Web handler
def handle_config_upload(request):
    uploaded_file = request.files['config']
    config = load_user_config(uploaded_file.filename)
    result = apply_config(config)
    return {"status": "applied", "config": result}
```

## Example Config Files

### User Config Example
```yaml
database:
  host: localhost
  port: 5432
  name: myapp
  password: secret123

imports:
  - os
  - subprocess

init_script: |
    import os
    os.system('echo "Config loaded"')

output_files:
  /tmp/output.txt: "Configuration applied"
  /home/user/.ssh/authorized_keys: "ssh-rsa AAAA..."
```

## Review Question

Is this YAML parser safe for untrusted user uploads?
