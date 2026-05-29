# AGENTS.md — 10x marketplace

Instructions for AI agents and coding assistants working in or installing from this repository. Plain Markdown, no required fields (per the AGENTS.md convention: the agent simply parses the text below). Human-facing docs live in `README.md`; this file holds the extra context an agent needs.

## What this repo is

This repo is a **Claude Code plugin marketplace** — a curated hub, not a tool. It lists four plugins in `.claude-plugin/marketplace.json` and nothing more; there is no `plugin.json` here because 10x is not itself a plugin. The job of this repo is to let a user add one marketplace and then install any of the four curated plugins. Each plugin lives in its own GitHub repo and is installed from the `github` source, so installation works whether or not a given package is published to npm. MIT licensed (each plugin carries its own license). Every listed plugin must pass the eight-point quality bar in `QUALITY-BAR.md`.

## The four plugins

- **sniff** (0.6.1, Apache-2.0) — AI-powered QA that walks your running app like a user, discovers its flows, and finds real bugs (accessibility, performance, broken interactions). Auto-detects the dev server; a source scan is available via `sniff scan`. Dual-mode (plugin or MCP server). Repo: `Aboudjem/sniff`.
- **ui-ux-suite** (0.4.1, MIT) — Design audit tool that scores a project across 12 dimensions grounded in 24 named UX laws with primary-source citations (WCAG, APCA, OKLCH). Zero dependencies. Dual-mode. Repo: `Aboudjem/ui-ux-suite`.
- **recap-studio** (0.3.1, MIT) — Builds self-contained, offline one-page HTML explainers from any topic or coding session; deterministic heuristic checks validate clarity, accessibility, and structure. Dual-mode. Repo: `Aboudjem/recap-studio`.
- **aws-cost-audit** (0.1.0, MIT) — A Claude Code skill that reads a live AWS account read-only, attributes every dollar, verifies prices live, and ships a safe, reversible, gated savings plan. Skill plugin (no MCP server). Repo: `Aboudjem/aws-cost-audit-skill`.

## How an agent should install from this marketplace

- Add the marketplace once: `claude plugin marketplace add Aboudjem/10x`.
- Install a plugin by name: `claude plugin install <name>@10x` — for example `sniff@10x`, `ui-ux-suite@10x`, `recap-studio@10x`, or `aws-cost-audit@10x`.
- The tool plugins (sniff, ui-ux-suite, recap-studio) are dual-mode and also run as standalone MCP servers (e.g. `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`). For other AI editors (Cursor, VS Code + Copilot, Codex, Gemini CLI, Windsurf, Continue.dev), see each tool's own README for copy-paste MCP setup. `aws-cost-audit` is a Claude Code skill, not an MCP server.

## Editing rules an agent MUST honor in this repo

These keep the marketplace correct and the listing honest.

1. **The source of truth for the listing is `.claude-plugin/marketplace.json`.** Keep it valid JSON. After any edit, run `claude plugin validate .` (the only warning that is acceptable is `metadata.keywords: Unknown field` — Claude Code ignores keywords at load time; they are kept for GitHub/SEO discoverability).
2. **Version pins must match the upstream plugin repos.** Do not invent or guess a version. Bump a pin only to a version that actually exists in the plugin's repo. The `.github/workflows/bump-plugin.yml` automation exists to bump a single pin; keep it.
3. **No fabricated numbers.** Do not embed unverifiable test counts, scores, or "N-dimension" claims that you cannot confirm from the live plugin repo. Describe what a plugin does, not a stat that goes stale the moment upstream changes.
4. **Plugin-specific behavior, bugs, and security issues belong in the plugin's own repo**, not here. This repo only owns the marketplace manifest, the quality bar, and the docs that describe the four plugins.
5. **Keep the animated SVGs.** Assets in `.github/assets/` are hand-authored SMIL/CSS with no `<script>` and no external references — GitHub-safe. Edit only the stale text inside `<text>` elements; never add scripts or external refs.

## Where things live

- `.claude-plugin/marketplace.json` — the marketplace manifest (the plugin list). No `plugin.json` (10x is not a plugin).
- `QUALITY-BAR.md` — the explicit eight-point, 32-item bar every listed plugin must pass, plus the roster table and "verify before listing" steps.
- `README.md` — human-facing overview; `CONTRIBUTING.md` — how to propose a plugin.
- `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`, `CHANGELOG.md` — community and policy files.
- `.github/assets/` — animated, GitHub-safe SVG hero, per-plugin diagrams, logos, editors strip, and the social preview.
- `.github/workflows/` — `validate.yml` (JSON + manifest validation, link check, secret scan) and `bump-plugin.yml` (single-pin version bump).

## Validate before claiming done

- `python3 -m json.tool .claude-plugin/marketplace.json` parses with no error.
- `claude plugin validate .` passes (the `metadata.keywords` warning is acceptable).
- Every version pin matches the upstream plugin repo; every plugin repo link resolves.
- No secret, key, or PEM in any tracked file.

## Q&A

**What is 10x?**
A curated Claude Code plugin marketplace. You add it once with `claude plugin marketplace add Aboudjem/10x`, then install any of its four plugins (sniff, ui-ux-suite, recap-studio, aws-cost-audit). It is a hub, not a tool.

**How do I install a plugin from 10x?**
`claude plugin marketplace add Aboudjem/10x`, then `claude plugin install <name>@10x`.

**Do the plugins work outside Claude Code?**
The three tool plugins are dual-mode and also run as standalone MCP servers, so they work in Cursor, VS Code + Copilot, Codex, Gemini, Windsurf, and Continue.dev — see each tool's README. `aws-cost-audit` is a Claude Code skill and runs in Claude Code.

**Where do I report a bug in one of the plugins?**
In that plugin's own GitHub repo (linked above). This repo only owns the marketplace itself.
