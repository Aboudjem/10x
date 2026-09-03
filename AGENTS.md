# AGENTS.md: 10x marketplace

Instructions for AI agents and coding assistants working in or installing from this repository. Plain Markdown, no required fields (per the AGENTS.md convention: the agent simply parses the text below). Human-facing docs live in `README.md`; this file holds the extra context an agent needs.

## What this repo is

This repo is a **Claude Code plugin marketplace**, a curated hub, not a tool. It lists seven plugins in `.claude-plugin/marketplace.json` and nothing more; there is no `plugin.json` here because 10x is not itself a plugin. The job of this repo is to let a user add one marketplace and then install any of the seven curated plugins. Each plugin lives in its own GitHub repo and is installed from the `github` source, so installation works whether or not a given package is published to npm. MIT licensed (each plugin carries its own license). Every listed plugin must pass the eight-point quality bar in `QUALITY-BAR.md`.

## The seven plugins

- **sniff** (0.8.1, Apache-2.0): Point it at your running app and it walks your real user flows in a real browser, reporting what is broken with the route, the ordered steps, and the screenshot or console excerpt behind each finding. A source scan is available via `sniff scan`. Dual-mode (plugin or MCP server). Repo: `Aboudjem/sniff`.
- **ui-ux-suite** (0.6.1, MIT): ESLint for design. Reads CSS, JSX, HTML and Tailwind classes and names the file, the line, the measured wrong value and the exact fix, with the WCAG criterion or named UX law behind it. Scores 12 dimensions. It audits, it never edits. Zero runtime dependencies. Dual-mode. Repo: `Aboudjem/ui-ux-suite`.
- **recap-studio** (0.5.1, MIT): Turns any topic or coding session into one self-contained HTML file with inlined styles, no JavaScript and no external request, readable offline in about five minutes; deterministic heuristic checks score it before you ship. Dual-mode. Repo: `Aboudjem/recap-studio`.
- **aws-cost-audit** (0.3.1, MIT): A Claude Code skill that reads a live AWS account read-only through the AWS CLI, attributes every dollar, and ships a safe, reversible, gated savings plan. No price is quoted from memory; every figure comes from live AWS pricing. Skill plugin (no MCP server). Repo: `Aboudjem/aws-cost-audit-skill`.
- **goalify** (2.6.1, MIT): A Claude Code skill that scopes a big coding task, locks the few real decisions, and writes the brief (a file the run works from) plus the condition (one line you paste into `/goal`), so a fresh full-context session executes the whole job, quotes the passing checks in its closing turn, and archives the brief to `.goal/done/`. Skill plugin (no MCP server). Repo: `Aboudjem/goalify`.
- **humanizer** (0.7.1, MIT): Names 55 AI writing patterns and rewrites text with sentence-length burstiness, 5 voice profiles, and a 0-100 AI-tell score. Pure Markdown, zero dependencies, no network calls. Skill plugin (no MCP server). Repo: `Aboudjem/humanizer-skill`.
- **loopify** (1.1.1, MIT): A Claude Code skill for a job that repeats. It writes the brief (a standing file the loop re-reads every tick) plus the line (one short string you paste into Claude Code's built-in `/loop`), with a tick cap, a stop rule, and five safety rails; every tick logs what it did to `TICKS.md`. Skill plugin (no MCP server). Repo: `Aboudjem/loopify`.

## How an agent should install from this marketplace

- Add the marketplace once: `claude plugin marketplace add Aboudjem/10x`.
- Install a plugin by name: `claude plugin install <name>@10x`, for example `sniff@10x`, `ui-ux-suite@10x`, `recap-studio@10x`, `aws-cost-audit@10x`, `goalify@10x`, `humanizer@10x`, or `loopify@10x`.
- Outside Claude Code, install any of the seven with the Vercel skills CLI: `npx skills add Aboudjem/<repo>`, optionally with `-a <agent>` (`-a cursor`, `-a codex`, `-a github-copilot`, `-a gemini-cli`, and more). The repo names are `sniff`, `ui-ux-suite`, `recap-studio`, `aws-cost-audit-skill`, `goalify`, `humanizer-skill`, `loopify`.
- The tool plugins (sniff, ui-ux-suite, recap-studio) are dual-mode and also run as standalone MCP servers (`npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`; recap-studio's server runs from a clone after a workspace build). Per-editor snippets live in each repo's `docs/editors.md`. `aws-cost-audit`, `goalify`, `humanizer`, and `loopify` are Claude Code skills, not MCP servers.

## Editing rules an agent MUST honor in this repo

These keep the marketplace correct and the listing honest.

1. **The source of truth for the listing is `.claude-plugin/marketplace.json`.** Keep it valid JSON. After any edit, run `claude plugin validate . --strict`; it must pass clean (exit 0). Do not add a top-level `version` and do not add `metadata.keywords`: Claude Code ignores `metadata.keywords` at load time and it makes `--strict` fail with an unknown-field error. Per-entry `keywords` arrays are fine. Keep `metadata.description`.
2. **Version pins must match the upstream plugin repos.** Do not invent or guess a version, and do not edit a pin by hand: `.github/workflows/sync-plugins.yml` reads every plugin repo's `.claude-plugin/plugin.json` and rewrites the pins itself. Run `node scripts/sync-plugins.mjs --check` to see the current state; see [docs/SYNC.md](docs/SYNC.md) for the whole chain.
3. **No fabricated numbers.** Do not embed unverifiable test counts, scores, or "N-dimension" claims that you cannot confirm from the live plugin repo. Describe what a plugin does, not a stat that goes stale the moment upstream changes.
4. **Plugin-specific behavior, bugs, and security issues belong in the plugin's own repo**, not here. This repo only owns the marketplace manifest, the quality bar, and the docs that describe the seven plugins.
5. **Keep the animated SVGs.** Assets in `.github/assets/` are hand-authored CSS/SMIL with no `<script>` and no external references, so they are GitHub-safe. Edit only the stale text inside `<text>` elements; never add scripts or external refs. Motion that moves an element is CSS, so `prefers-reduced-motion` can stop it; SMIL is used only for gradient colour drift, which that media query cannot reach. Per-plugin diagrams live in each plugin's own repo, not here.

## Where things live

- `.claude-plugin/marketplace.json`: the marketplace manifest (the plugin list). No `plugin.json` (10x is not a plugin).
- `QUALITY-BAR.md`: the explicit eight-point, 29-item bar every listed plugin must pass, plus the roster table and "verify before listing" steps.
- `README.md`: human-facing overview; `CONTRIBUTING.md`: how to propose a plugin.
- `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`, `CHANGELOG.md`: community and policy files.
- `.github/assets/`: animated, GitHub-safe SVG hero banners, the hub logo pair, the hero diagram, the editors strip, the social preview, and the PNG logo marks.
- `.github/workflows/`: `validate.yml` (JSON + manifest validation, link check, secret scan, and a blocking version-pin drift check), `sync-plugins.yml` (syncs every version pin from upstream) and `deploy-pages.yml` (publishes `site/index.html`). `docs/SYNC.md` explains the sync chain.
- `scripts/` and `tests/`: `validate-marketplace.mjs` (structural checks) and `sync-plugins.mjs` (version sync), each with a `node:test` suite. `npm test` runs them; there are no dependencies to install.

## Validate before claiming done

- `python3 -m json.tool .claude-plugin/marketplace.json` parses with no error.
- `claude plugin validate . --strict` passes clean (exit 0, no warnings).
- Every version pin matches the upstream plugin repo; every plugin repo link resolves.
- No secret, key, or PEM in any tracked file.

## Q&A

**What is 10x?**
A curated Claude Code plugin marketplace. You add it once with `claude plugin marketplace add Aboudjem/10x`, then install any of its seven plugins (sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer, loopify). It is a hub, not a tool.

**How do I install a plugin from 10x?**
`claude plugin marketplace add Aboudjem/10x`, then `claude plugin install <name>@10x`.

**Do the plugins work outside Claude Code?**
Yes. All seven install into 70+ agents with `npx skills add Aboudjem/<repo>`, because every one of them ships as skills, which are Markdown files an agent reads. The three tool plugins additionally run as standalone MCP servers. See each repo's `docs/editors.md`.

**Where do I report a bug in one of the plugins?**
In that plugin's own GitHub repo (linked above). This repo only owns the marketplace itself.
