# AGENTS.md: 10x marketplace

Instructions for AI agents and coding assistants working in or installing from this repository. Plain Markdown, no required fields (per the AGENTS.md convention: the agent simply parses the text below). Human-facing docs live in `README.md`; this file holds the extra context an agent needs.

## What this repo is

This repo is a **Claude Code plugin marketplace**, a curated hub, not a tool. It lists nine plugins in `.claude-plugin/marketplace.json` and nothing more; there is no `plugin.json` here because 10x is not itself a plugin. The job of this repo is to let a user add one marketplace and then install any of the nine curated plugins. Each plugin lives in its own GitHub repo and is installed from the `github` source, so installation works whether or not a given package is published to npm. MIT licensed (each plugin carries its own license). Every listed plugin must pass the eight-point quality bar in `QUALITY-BAR.md`.

## The nine plugins

- **sniff** (0.9.0, Apache-2.0): Point it at your running app. It walks your real flows in a real browser and reports real bugs (broken pages and links, console and network errors, broken forms, accessibility) with reproduction steps, severity and a fix. A source scan is also available via `sniff scan`. No API key. Dual-mode (plugin or MCP server). Repo: `Aboudjem/sniff`.
- **ui-ux-suite** (0.7.0, MIT): ESLint for design. Reads CSS, JSX, HTML and Tailwind classes and names the file, the line, the measured wrong value and the exact fix. Scores 12 dimensions. The report opens with the score and the three fixes to start with. It audits, it never edits. Zero runtime dependencies. Dual-mode. Repo: `Aboudjem/ui-ux-suite`.
- **recap-studio** (0.6.1, MIT): Turns a topic or a coding session into one dark-mode HTML explainer you double-click and read offline in about five minutes. Inlined styles, no JavaScript, no external request. Dual-mode. Repo: `Aboudjem/recap-studio`.
- **aws-cost-audit** (0.4.1, MIT): Audits a live AWS account read-only through the AWS CLI: attributes every dollar, finds idle and orphaned resources, checks Savings Plans and RI coverage, and returns a savings plan with confidence levels and gated, reversible actions. Prices are verified live, never hardcoded. Skill plugin (no MCP server). Repo: `Aboudjem/aws-cost-audit-skill`.
- **goalify** (3.1.1, MIT): Give your AI a big job and get proof it is done. Writes the brief (a file the run works from) and the condition (one line you paste into `/goal`) for Claude Code and Codex; `/goalify verify` re-runs the checks into a proof receipt. Skill plugin (no MCP server). Repo: `Aboudjem/goalify`.
- **humanizer** (0.8.0, MIT): Detects 55 AI writing patterns and rewrites text in five voice profiles, with an optional 0-100 AI-tell score that opens with the verdict and what to fix first. Pure Markdown, zero dependencies, no network calls. Skill plugin (no MCP server). Repo: `Aboudjem/humanizer-skill`.
- **loopify** (1.2.1, MIT): Hand Claude a job that repeats. Come back to a log of what every tick did, not a loop you have to babysit. It writes the brief (a standing file the loop re-reads every tick) and the line you paste into Claude Code's built-in `/loop`, with a tick cap and a stop rule. Skill plugin (no MCP server). Repo: `Aboudjem/loopify`.
- **secure-my-app** (0.3.0, MIT): Find what a stranger can take from your app. Then close it and prove it closed. Each finding comes with a command whose output you can read; fixes run only on your approval, then the same command re-runs. 65 controls in seven groups. The report opens with its verdict and at most three things to do first. Skill plugin (no MCP server). Repo: `Aboudjem/secure-my-app`.
- **contextify** (0.3.1, MIT): Tell every coding agent how your repo works. Then prove it is still true. A short `AGENTS.md` with editor pointers, optional architecture and workflow docs of at most 120 lines each, and a drift check that runs without a model. Human edits outside managed blocks are kept. Skill plugin (no MCP server). Repo: `Aboudjem/contextify`.

## How an agent should install from this marketplace

- Add the marketplace once: `claude plugin marketplace add Aboudjem/10x`.
- Install a plugin by name: `claude plugin install <name>@10x`, for example `sniff@10x`, `ui-ux-suite@10x`, `recap-studio@10x`, `aws-cost-audit@10x`, `goalify@10x`, `humanizer@10x`, `loopify@10x`, `secure-my-app@10x`, or `contextify@10x`.
- Outside Claude Code, install any of the nine with the Vercel skills CLI: `npx skills add Aboudjem/<repo>`, optionally with `-a <agent>` (`-a cursor`, `-a codex`, `-a github-copilot`, `-a gemini-cli`, and more). The repo names are `sniff`, `ui-ux-suite`, `recap-studio`, `aws-cost-audit-skill`, `goalify`, `humanizer-skill`, `loopify`, `secure-my-app`, `contextify`.
- The tool plugins (sniff, ui-ux-suite, recap-studio) are dual-mode and also run as standalone MCP servers (`npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`; recap-studio's server runs from a clone after a workspace build). Per-editor snippets live in each repo's `docs/editors.md`. `aws-cost-audit`, `goalify`, `humanizer`, `loopify`, `secure-my-app`, and `contextify` are Claude Code skills, not MCP servers.

## Editing rules an agent MUST honor in this repo

These keep the marketplace correct and the listing honest.

1. **The source of truth for the listing is `.claude-plugin/marketplace.json`.** Keep it valid JSON. After any edit, run `claude plugin validate . --strict`; it must pass clean (exit 0). Do not add a top-level `version` and do not add `metadata.keywords`: Claude Code ignores `metadata.keywords` at load time and it makes `--strict` fail with an unknown-field error. Per-entry `keywords` arrays are fine. Keep `metadata.description`.
2. **Version pins must match the upstream plugin repos.** Do not invent or guess a version, and do not edit a pin by hand: `.github/workflows/sync-plugins.yml` reads every plugin repo's `.claude-plugin/plugin.json` and rewrites the pins itself. Run `node scripts/sync-plugins.mjs --check` to see the current state; see [docs/SYNC.md](docs/SYNC.md) for the whole chain.
3. **No fabricated numbers.** Do not embed unverifiable test counts, scores, or "N-dimension" claims that you cannot confirm from the live plugin repo. Describe what a plugin does, not a stat that goes stale the moment upstream changes.
4. **Plugin-specific behavior, bugs, and security issues belong in the plugin's own repo**, not here. This repo only owns the marketplace manifest, the quality bar, and the docs that describe the nine plugins.
5. **Keep the animated SVGs.** Assets in `.github/assets/` are hand-authored CSS/SMIL with no `<script>` and no external references, so they are GitHub-safe. Edit only the stale text inside `<text>` elements; never add scripts or external refs. Motion that moves an element is CSS, so `prefers-reduced-motion` can stop it; SMIL is used only for gradient colour drift, which that media query cannot reach. Per-plugin diagrams live in each plugin's own repo, not here.

## Where things live

- `.claude-plugin/marketplace.json`: the marketplace manifest (the plugin list). No `plugin.json` (10x is not a plugin).
- `QUALITY-BAR.md`: the explicit checklist, in eight sections, that every listed plugin must pass, plus the roster table and "verify before listing" steps.
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
A curated Claude Code plugin marketplace. You add it once with `claude plugin marketplace add Aboudjem/10x`, then install any of its nine plugins (sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer, loopify, secure-my-app, contextify). It is a hub, not a tool.

**How do I install a plugin from 10x?**
`claude plugin marketplace add Aboudjem/10x`, then `claude plugin install <name>@10x`.

**Do the plugins work outside Claude Code?**
Yes. All nine install into other agents with `npx skills add Aboudjem/<repo>`, because every one of them ships as skills, which are Markdown files an agent reads. The three tool plugins additionally run as standalone MCP servers. See each repo's `docs/editors.md`.

**Where do I report a bug in one of the plugins?**
In that plugin's own GitHub repo (linked above). This repo only owns the marketplace itself.
