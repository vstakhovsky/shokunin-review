# Compatibility

**Shokunin Review compatibility with different tools and platforms.**

---

## Overview

Shokunin Review MVP 1 is designed for terminal-first workflows with primary support for Claude Code.

---

## Primary Target

### Claude Code (Full Support)

**Status**: ✅ Primary Target

**Support Level**: Full

**What Works**:

- ✅ All commands (`/shokunin-review`, `/shokunin-improve`, etc.)
- ✅ All skills (review, score, gherkin, strategy, verify)
- ✅ All agents (17 validators)
- ✅ All hooks (pre-review, finding-quality, verdict-consistency, etc.)
- ✅ Full lifecycle (intake → routing → validation → scoring → output)
- ✅ Mascot states and terminal UX
- ✅ All output modes (default, full, JSON, markdown, quiet)
- ✅ Project-local and user-level installation

**Installation**:

```bash
# Project-local install (recommended)
cd /path/to/your/project
git clone https://github.com/vstakhovsky/shokunin-review.git
cd shokunin-review
./bin/install --project-local

# User-level install
./bin/install --user-level
```

**Usage**:

```text
/shokunin-review examples/prd/weak-ai-food-agent.before.md
/shokunin-improve docs/prd.md
/shokunin-score docs/strategy.md
```

**Why Claude Code?**

- Native skill support
- Agent orchestration
- Hook system
- Terminal-first UX
- File context handling
- Best integration experience

---

## Best-Effort Support

### Cursor

**Status**: 🔄 Best-Effort

**Support Level**: Best-effort, not guaranteed

**What May Work**:

- 🔄 Markdown skills (may load manually)
- 🔄 Basic CLI commands
- 🔄 Terminal review workflow

**Limitations**:

- ❌ No guaranteed skill auto-loading
- ❌ Limited or no hook support
- ❌ Different agent system
- ❌ Lifecycle integration uncertain

**Installation**:

Copy skills to Cursor's skills directory (location varies by version).

**Usage**:

Use CLI directly:

```bash
shokunin review path/to/file.md
```

**Notes**:

- Cursor compatibility depends on Cursor's skill system
- May change without notice
- Not officially tested

---

### Codex CLI

**Status**: 🔄 Best-Effort

**Support Level**: Best-effort, not guaranteed

**What May Work**:

- 🔄 CLI commands
- 🔄 Terminal review workflow
- 🔄 JSON/Markdown output

**Limitations**:

- ❌ No skill system (likely)
- ❌ No agent orchestration (likely)
- ❌ Different integration model

**Installation**:

Use CLI directly:

```bash
npm install -g @shokunin/cli
shokunin review path/to/file.md
```

**Notes**:

- Codex CLI compatibility uncertain
- May work as terminal tool
- Not officially tested

---

### Gemini CLI

**Status**: 🔄 Best-Effort

**Support Level**: Best-effort, not guaranteed

**What May Work**:

- 🔄 CLI commands
- 🔄 Terminal review workflow
- 🔄 JSON/Markdown output

**Limitations**:

- ❌ Unknown skill system
- ❌ Unknown agent system
- ❌ Different integration model

**Installation**:

Use CLI directly:

```bash
npm install -g @shokunin/cli
shokunin review path/to/file.md
```

**Notes**:

- Gemini CLI compatibility uncertain
- May work as terminal tool
- Not officially tested

---

## Portable Assets

These assets are portable across environments:

### ✅ Portable

- **Markdown commands** — `.claude/commands/*.md`
- **Markdown agents** — `.claude/agents/*.md`
- **Markdown skills** — `.claude/skills/*/SKILL.md`
- **JSON schemas** — `templates/*.schema.json`
- **Eval YAML files** — `harness/evals/*.yaml`
- **Rubric YAML files** — `harness/rubrics/*.yaml`
- **Templates** — `templates/*.md`
- **Examples** — `examples/*/*.md`
- **Documentation** — `docs/*.md`

These can be:

- Copied to other tools manually
- Used as reference documentation
- Integrated into custom workflows
- Adapted for different environments

### ❌ Not Portable

- **Full lifecycle hooks** — Claude Code specific
- **Mascot UI** — Terminal-specific
- **Skill auto-loading** — Claude Code specific
- **Agent orchestration** — Platform-specific

---

## Platform Compatibility

### macOS

**Status**: ✅ Fully Supported

**What Works**:

- ✅ CLI commands
- ✅ Terminal UX
- ✅ All features
- ✅ Installation scripts

**Requirements**:

- macOS 11+
- Node.js 18+ (for CLI)
- Terminal (zsh, bash, fish)

**Installation**:

```bash
./bin/install
```

---

### Linux

**Status**: ✅ Fully Supported

**What Works**:

- ✅ CLI commands
- ✅ Terminal UX
- ✅ All features
- ✅ Installation scripts

**Requirements**:

- Linux (Ubuntu 20.04+, Debian 11+, etc.)
- Node.js 18+ (for CLI)
- Terminal (bash, zsh, fish)

**Installation**:

```bash
./bin/install
```

---

### Windows

**Status**: 🔄 Best-Effort (MVP 1)

**What May Work**:

- 🔄 CLI commands via WSL
- 🔄 Terminal UX via WSL
- 🔄 Installation scripts via WSL

**Limitations**:

- ❌ Native PowerShell support uncertain (MVP 1)
- ❌ Native CMD support uncertain (MVP 1)
- ❌ Path separators may differ

**Workaround**:

Use WSL (Windows Subsystem for Linux):

```bash
# In WSL
./bin/install
shokunin review path/to/file.md
```

**Future**:

Native Windows support may be improved post-MVP 1.

---

## Terminal Compatibility

### Shells

**Supported**:

- ✅ zsh (default on macOS)
- ✅ bash (default on Linux)
- ✅ fish
- 🔄 nushell (may work)
- 🔄 elvish (may work)

**Not Supported**:

- ❌ Windows CMD (use WSL)
- ❌ Windows PowerShell (use WSL, MVP 1)

### Terminal Emulators

**Supported**:

- ✅ Terminal.app (macOS)
- ✅ iTerm2 (macOS)
- ✅ GNOME Terminal (Linux)
- ✅ Alacritty (cross-platform)
- ✅ Kitty (cross-platform)
- ✅ VS Code integrated terminal
- ✅ JetBrains integrated terminal

**Features**:

- ✅ Colors
- ✅ Emoji
- ✅ Mascot states
- ✅ Progress indicators

**Accessibility**:

- ✅ `--no-color` for color-blind users
- ✅ `--no-animation` for motion-sensitive users
- ✅ `--quiet` for minimal output

---

## Model Compatibility

### Anthropic Claude

**Status**: ✅ Primary Model

**Support Level**: Full

**Recommended Models**:

- ✅ Claude Opus 4.8
- ✅ Claude Sonnet 4.6
- ✅ Claude Haiku 4.5 (fast mode)

**What Works**:

- ✅ All validators
- ✅ All skills
- ✅ Full review workflow
- ✅ Output quality

**Configuration**:

Set via environment or config:

```bash
export ANTHROPIC_API_KEY="your-key"
export SHOKUNIN_MODEL="claude-opus-4-8"  # optional
```

---

### Other Models (Best-Effort)

**Status**: 🔄 Best-Effort

**Compatible With**:

- 🔄 Claude via AWS Bedrock
- 🔄 Other Claude-compatible APIs

**Not Compatible With**:

- ❌ OpenAI GPT (different API)
- ❌ Google Gemini (different API)
- ❌ Other models (different APIs)

**Future**:

Model abstraction layer may be added post-MVP 1.

---

## Version Compatibility

### Claude Code

**Supported**:

- ✅ Latest Claude Code
- ✅ Recent Claude Code versions

**Not Supported**:

- ❌ Very old Claude Code versions (pre-skill system)

**Notes**:

Claude Code evolves quickly. Shokunin Review targets latest versions.

---

## Integration Compatibility

### CI/CD Systems

**Status**: 📋 Planned (MVP 2)

**MVP 1**:

- ✅ JSON output for custom integrations
- ✅ Exit codes for automation
- ❌ No built-in GitHub Action (MVP 1)

**MVP 2+**:

- 📋 GitHub Action
- 📋 GitLab CI template
- 📋 Generic CI integration

**MVP 1 Workaround**:

Use JSON output:

```bash
shokunin review file.md --json > review-output.json
```

Parse JSON in CI/CD:

```yaml
# Example GitHub Action (manual)
- name: Review PRD
  run: shokunin review docs/prd.md --json > output.json

- name: Check score
  run: |
    SCORE=$(jq '.total_readiness_score' output.json)
    if [ $SCORE -lt 60 ]; then
      echo "Score too low: $SCORE"
      exit 1
    fi
```

---

### Editor Integrations

**VS Code**:

- ✅ Use via integrated terminal
- ✅ Use Claude Code extension
- ❌ No dedicated VS Code extension (MVP 1)

**JetBrains IDEs**:

- ✅ Use via integrated terminal
- ✅ Use Claude Code integration (if available)
- ❌ No dedicated JetBrains plugin (MVP 1)

**Vim/Neovim**:

- ✅ Use via terminal
- ✅ Use `:!shokunin review %`
- ❌ No dedicated plugin (MVP 1)

**Future**:

Dedicated editor integrations may be considered post-MVP 1.

---

## File System Compatibility

### Paths

**Supported**:

- ✅ Unix-style paths (`/path/to/file.md`)
- ✅ Relative paths (`./file.md`)
- ✅ Absolute paths (`/Users/user/file.md`)

**Not Supported** (MVP 1):

- ❌ Windows-style paths (`C:\path\to\file.md`)
- ❌ UNC paths (`\\server\share\file.md`)

**Workaround**:

Use WSL for Windows paths.

---

### File Sizes

**Recommended**:

- ✅ < 100KB — Fast, full quality
- ✅ 100KB - 1MB — May be slower
- 🔄 1MB - 5MB — May be truncated
- ❌ > 5MB — Not supported (MVP 1)

**Future**:

Large file handling may be improved post-MVP 1.

---

## Network Compatibility

### Online Mode

**When**: Using cloud-based models

**Requirements**:

- ✅ Internet connection
- ✅ API access (Anthropic or compatible)
- ✅ API key configured

**Behavior**:

- Document content sent to model API
- Review processed remotely
- Results returned locally

---

### Offline Mode

**When**: Using local models

**Requirements**:

- ✅ Local model deployment
- ✅ Model compatibility
- ✅ Sufficient local resources

**Behavior**:

- No network calls
- Everything processed locally
- No data leaves machine

**Status**:

📋 Planned improvement (better local model support post-MVP 1).

---

## Security Compatibility

### Environments

**Safe for**:

- ✅ Local development
- ✅ `--local-only` mode
- ✅ `--no-trace` mode

**Not Safe for** (without precautions):

- ❌ Shared environments with sensitive docs
- ❌ CI/CD with secrets (use `--no-trace`)
- ❌ Cloud environments with confidential data

**Guidance**:

See `SECURITY.md` for detailed security guidance.

---

## Accessibility Compatibility

### Screen Readers

**Status**: ✅ Supported

**What Works**:

- ✅ Text output
- ✅ `--no-color` mode
- ✅ `--no-emoji` mode (future)
- ✅ Structured output

**Recommendations**:

Use `--no-color` for screen readers:

```bash
shokunin review file.md --no-color
```

---

### Color Blindness

**Status**: ✅ Supported

**What Works**:

- ✅ `--no-color` mode
- ✅ Text labels alongside colors
- ✅ No color-only information

**Recommendations**:

Use `--no-color` if needed:

```bash
shokunin review file.md --no-color
```

---

### Motion Sensitivity

**Status**: ✅ Supported

**What Works**:

- ✅ `--no-animation` mode
- ✅ Static mascot states
- ✅ No forced animations

**Recommendations**:

Use `--no-animation` if needed:

```bash
shokunin review file.md --no-animation
```

---

## Summary

### Fully Supported

- ✅ Claude Code (primary target)
- ✅ macOS
- ✅ Linux
- ✅ Terminal UX
- ✅ Anthropic Claude models
- ✅ JSON/Markdown output

### Best-Effort

- 🔄 Cursor
- 🔄 Codex CLI
- 🔄 Gemini CLI
- 🔄 Windows (via WSL)

### Not Supported (MVP 1)

- ❌ Web UI
- ❌ Native Windows support
- ❌ Board simulation
- ❌ Domain packs
- ❌ Mobile apps

---

## FAQ

### Does Shokunin Review work with Cursor?

Best-effort. Core CLI should work. Skill integration uncertain.

### Does Shokunin Review work with VS Code?

Yes, via integrated terminal or Claude Code extension.

### Does Shokunin Review work on Windows?

Best-effort via WSL. Native Windows support uncertain in MVP 1.

### Why Claude Code as primary target?

Native skill support, agent orchestration, hooks, best integration.

### Will you add support for other editors?

Dedicated editor integrations may be considered post-MVP 1.

---

**docs/compatibility.md defines what Shokunin Review works with.**

**Primary target: Claude Code. Best-effort: Cursor, Codex, Gemini.**
