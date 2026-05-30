# Command surface

10x is a marketplace hub, not a plugin. It has no slash commands or skills of its own.

## What this repo exposes

| Surface | Count | Notes |
|---------|-------|-------|
| Slash commands (this repo) | 0 | None defined here |
| Skills (this repo) | 0 | `skills/repo-polish/` is empty |
| MCP tools (this repo) | 0 | No MCP server |

## Bundled plugin commands

Each bundled plugin owns its own command surface. These live in upstream repos and
are installed automatically when the user runs `claude plugin marketplace add Aboudjem/10x`.
They are not consolidated here because each one is a distinct tool with a distinct job.

| Plugin | Primary slash command | Secondary commands |
|--------|-----------------------|--------------------|
| sniff | `/sniff` | `/sniff-fix`, `/sniff-report` |
| ui-ux-suite | `/design-audit` | `/color-audit`, `/type-audit`, `/layout-audit`, `/a11y-audit`, + 9 specialist audits |
| recap-studio | `/recap "<topic>"` | `/recap session`, `/recap setup`, `/recap validate` |
| aws-cost-audit | (skill, invoked via natural language) | n/a |

## Consolidation decision

Nothing was hidden with `user-invocable: false` in this pass. Reasoning:

- The marketplace hub has no commands to consolidate.
- The bundled plugins each expose a distinct primary command for a distinct job (`/sniff`,
  `/design-audit`, `/recap`). Hiding any of them would remove the entry point to that tool.
- Secondary commands within each plugin (`/sniff-fix`, `/sniff-report`, `/recap session`,
  etc.) are internal to their upstream repos and are not authored here.

If a future plugin added redundant sub-commands to this hub's own `commands/` directory,
the ones not needed at the top-level should get `user-invocable: false` in their frontmatter.
