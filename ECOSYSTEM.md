# The 10x ecosystem: one place to see it all

**10x** is a curated marketplace of Claude Code plugins that each also run as a standalone MCP
server / CLI in any editor. Zero bloat, evidence-backed, polished. Last aligned **2026-05-29**.

> Install any tool in two lines:
> ```
> claude plugin marketplace add Aboudjem/10x
> claude plugin install <name>@10x
> ```

## The tools

| Tool | Version | What it does (the job-to-be-done) | Install | Repo | npm | License |
|---|---|---|---|---|---|---|
| **sniff** | 0.6.1 | Autonomous QA. Point it at your running app and it **walks the app like a user**, reporting real bugs (broken pages, dead forms, accessibility, console errors, broken links). Source scan still available via `sniff scan`. | `claude plugin install sniff@10x` | [Aboudjem/sniff](https://github.com/Aboudjem/sniff) | [`sniff-qa`](https://www.npmjs.com/package/sniff-qa) | Apache-2.0 |
| **ui-ux-suite** | 0.4.1 | Design audit. Scores a project across **12 dimensions** grounded in **24 named UX laws** + **21 evidence-backed knowledge docs**. WCAG 2.2, APCA, OKLCH color science. Zero runtime deps. | `claude plugin install ui-ux-suite@10x` | [Aboudjem/ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite) | [`ui-ux-suite`](https://www.npmjs.com/package/ui-ux-suite) | MIT |
| **recap-studio** | 0.3.1 | One-page explainers. Turns a topic or a coding session into **one self-contained, offline-safe dark HTML file** (inlined CSS, zero JS, opens by double-click). Validation = deterministic heuristic checks. | `claude plugin install recap-studio@10x` | [Aboudjem/recap-studio](https://github.com/Aboudjem/recap-studio) | _(planned)_ | MIT |
| **aws-cost-audit** | 0.1.0 | AWS cost audit. Analyzes your AWS spend and surfaces concrete savings. Built test-first, verified end-to-end on a live account, **zero hardcoded prices** (reads live pricing). | `claude plugin install aws-cost-audit@10x` | [Aboudjem/aws-cost-audit-skill](https://github.com/Aboudjem/aws-cost-audit-skill) | _(skill, no npm)_ | Apache-2.0 |

Marketplace hub: **[Aboudjem/10x](https://github.com/Aboudjem/10x)** (v1.4.0).

## What's tested

- **sniff**: 441 tests incl. a real-browser planted-bug fixture gate (21 bugs / 12 classes, 100% recall + precision, 0 false positives on a clean control).
- **ui-ux-suite**: 311 tests (zero-dependency Node test runner).
- **recap-studio**: 44 tests across 6 packages.
- **aws-cost-audit**: built test-first; CI checks frontmatter, JSON validity, no hardcoded prices, no secrets, and link resolution.

## Multi-editor support

Each tool ships a standalone MCP server / CLI and per-editor setup docs (Claude Code, Cursor,
VS Code/Copilot, Codex, Gemini, Windsurf), except **aws-cost-audit**, which targets Claude Code (it
shells out to the AWS CLI) with a documented drop-in `~/.claude/skills` path for other environments.

## Manual steps that can't be automated

A few discoverability touches require the GitHub web UI (no API): uploading each repo's 1280×640
`social-preview.png` via **Settings → Social preview**, and setting the **About** description + topics.
Demo recordings (sniff/ui-ux/aws-cost) need a screen-capture session; aws-cost additionally needs a
live AWS account, so its demo is intentionally left to a contributor rather than faked.

---

_This file is the canonical roster. If a version here disagrees with a tool's live `plugin.json`, the
live repo wins: re-derive, don't trust a cached number._
