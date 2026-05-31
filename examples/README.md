# Examples

Practical, copy-paste recipes for using the 10x marketplace with Claude Code.

---

## 1. Add the 10x marketplace and install a plugin

### Step 1 — Register the marketplace

```bash
claude plugin marketplace add Aboudjem/10x
```

This registers the 10x marketplace in your Claude Code config. You only do this once.
All six plugins become available to install by name.

### Step 2 — Install a plugin

```bash
# Install the QA plugin (walks your running app, finds real bugs)
claude plugin install sniff@10x

# Install the design-audit plugin (scores 12 dimensions, cites UX laws)
claude plugin install ui-ux-suite@10x

# Install the explainer generator
claude plugin install recap-studio@10x

# Install the AWS cost auditor (Claude Code skill, read-only)
claude plugin install aws-cost-audit@10x

# Install goalify (Claude Code skill; writes a self-deleting /goal file)
claude plugin install goalify@10x

# Install humanizer (Claude Code skill; detects AI writing patterns and rewrites text)
claude plugin install humanizer@10x
```

Each install wires up the plugin's MCP tools, slash commands, and agents automatically.
No config files. No API keys.

### Step 3 — Use it

After installing `sniff`, open any Claude Code session in a project with a running dev server:

```
/sniff
```

After installing `ui-ux-suite`:

```
/design-audit
```

After installing `recap-studio`:

```
/recap "How React Server Components work"
```

After installing `aws-cost-audit`, open a session with AWS credentials in your environment:

```
/aws-cost-audit
```

After installing `goalify`, in any Claude Code session:

```
/goalify <your task>
```

After installing `humanizer`, in any Claude Code session:

```
/humanizer "<your text>" --score
```

---

## 2. List all available plugins

```bash
claude plugin marketplace list Aboudjem/10x
```

---

## 3. Check the installed version of a plugin

```bash
claude plugin list
```

---

## 4. Remove a plugin

```bash
claude plugin uninstall sniff
```

---

## 5. Use a plugin as a standalone MCP server (any editor)

The `sniff` and `ui-ux-suite` plugins are dual-mode: they work as Claude Code plugins
and as plain MCP servers you can wire into Cursor, VS Code Copilot, Codex, or any
MCP-compatible editor.

```bash
# Run sniff as an MCP server
npx sniff-qa --mcp

# Run ui-ux-suite as an MCP server
npx ui-ux-suite --mcp
```

Then point your editor's MCP config at the running server. Each plugin's README has
copy-paste config blocks for Cursor, VS Code, Codex, Gemini, Windsurf, and Continue.dev.

---

## 6. One-line install into another CLI's skills directory

```bash
# Install sniff into a Codex skills directory
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex

# Install ui-ux-suite into a Cursor skills directory
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s cursor
```

---

For full documentation on each plugin, see the individual plugin repos linked from the
[main README](../README.md).
