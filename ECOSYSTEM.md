# The 10x ecosystem: one place to see it all

**10x** is a curated marketplace of Claude Code plugins that each also run as a standalone MCP
server / CLI in any editor. Zero bloat, evidence-backed, polished. Last aligned **2026-05-30**.

> Install any tool in two lines:
> ```
> claude plugin marketplace add Aboudjem/10x
> claude plugin install <name>@10x
> ```

## The tools

| Tool | Version | What it does (the job-to-be-done) | Install | Repo | npm | License |
|---|---|---|---|---|---|---|
| **sniff** | 0.7.0 | Autonomous QA. Point it at your running app and it **walks the app like a user**, reporting real bugs (broken pages, dead forms, accessibility, console errors, broken links). Source scan still available via `sniff scan`. | `claude plugin install sniff@10x` | [Aboudjem/sniff](https://github.com/Aboudjem/sniff) | [`sniff-qa`](https://www.npmjs.com/package/sniff-qa) | Apache-2.0 |
| **ui-ux-suite** | 0.5.0 | Design audit. Scores a project across **12 dimensions** grounded in **24 named UX laws** + **21 evidence-backed knowledge docs**. WCAG 2.2, APCA, OKLCH color science. Zero runtime deps. | `claude plugin install ui-ux-suite@10x` | [Aboudjem/ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite) | [`ui-ux-suite`](https://www.npmjs.com/package/ui-ux-suite) | MIT |
| **recap-studio** | 0.4.0 | One-page explainers. Turns a topic or a coding session into **one self-contained, offline-safe dark HTML file** (inlined CSS, zero JS, opens by double-click). Validation = deterministic heuristic checks. | `claude plugin install recap-studio@10x` | [Aboudjem/recap-studio](https://github.com/Aboudjem/recap-studio) | _(npm at 0.2.0)_ | MIT |
| **aws-cost-audit** | 0.2.0 | AWS cost audit. **Read-only** by default: analyzes your live AWS spend and surfaces concrete, gated savings. Built test-first, verified end-to-end on a live account, **zero hardcoded prices** (reads live pricing). | `claude plugin install aws-cost-audit@10x` | [Aboudjem/aws-cost-audit-skill](https://github.com/Aboudjem/aws-cost-audit-skill) | _(skill, no npm)_ | MIT |
| **goalify** | 1.0.0 | Autonomous task prep. Scopes a big coding task, locks the few real decisions, and writes a **self-contained, self-deleting `/goal` file** so a fresh full-context session executes and verifies the whole job, then deletes the file only on full success. A Claude Code skill (no MCP server). | `claude plugin install goalify@10x` | [Aboudjem/goalify](https://github.com/Aboudjem/goalify) | _(skill, no npm)_ | MIT |

Marketplace hub: **[Aboudjem/10x](https://github.com/Aboudjem/10x)** (v1.6.0).

## What's tested

- **sniff**: 441 tests incl. a real-browser planted-bug fixture gate (21 bugs / 12 classes, 100% recall + precision, 0 false positives on a clean control).
- **ui-ux-suite**: 311 tests (zero-dependency Node test runner).
- **recap-studio**: 43 tests across 5 test-bearing packages.
- **aws-cost-audit**: built test-first; CI checks frontmatter, JSON validity, no hardcoded prices, no secrets, and link resolution.
- **goalify**: built test-first; ships manifest smoke tests (`tests/test_manifests.py`) plus deterministic and behavioral evals with a recorded RED→GREEN baseline on Haiku, Sonnet, and Opus.

## Multi-editor support

Each tool ships a standalone MCP server / CLI, a one-line `install.sh` (curl) that wires it into
another CLI's skills directory, `.cursor-plugin` and `.copilot-plugin` manifests, and per-editor
setup docs (Claude Code, Cursor, VS Code/Copilot, Codex, Gemini, Windsurf). **aws-cost-audit**
targets Claude Code (it shells out to the AWS CLI) and also ships the same one-line installer plus a
documented drop-in `~/.claude/skills` path for other environments.

## Manual steps that can't be automated

A few discoverability touches require the GitHub web UI (no API): uploading each repo's 1280×640
`social-preview.png` via **Settings → Social preview**, and setting the **About** description + topics.
Demo recordings (sniff/ui-ux/aws-cost) need a screen-capture session; aws-cost additionally needs a
live AWS account, so its demo is intentionally left to a contributor rather than faked.

---

_This file is the canonical roster. If a version here disagrees with a tool's live `plugin.json`, the
live repo wins: re-derive, don't trust a cached number._
