# The 10x ecosystem: one place to see it all

**10x** is a curated marketplace of Claude Code plugins. Every one of them also installs into 70+
other agents through the Vercel skills CLI, and three of them run as a standalone MCP server or CLI
in any editor. Last aligned **2026-09-03**.

> Install any tool in two lines:
> ```
> claude plugin marketplace add Aboudjem/10x
> claude plugin install <name>@10x
> ```

## The tools

| Tool | Version | What it does (the job-to-be-done) | Install | Repo | npm | License |
|---|---|---|---|---|---|---|
| **sniff** | 0.8.1 | Autonomous QA. Point it at your running app and it **walks the app like a user**, reporting real bugs (broken pages, dead forms, accessibility, console errors, broken links) with the ordered steps that produced each one. A source scan is still available via `sniff scan`. | `claude plugin install sniff@10x` | [Aboudjem/sniff](https://github.com/Aboudjem/sniff) | [`sniff-qa`](https://www.npmjs.com/package/sniff-qa) | Apache-2.0 |
| **ui-ux-suite** | 0.6.1 | Design audit. Reads CSS, JSX, HTML and Tailwind classes and returns **located, measured, fixed** findings across **12 dimensions**, each citing the WCAG criterion or named UX law behind it. WCAG 2.2, APCA, OKLCH color science. Zero runtime deps. It audits, it never edits. | `claude plugin install ui-ux-suite@10x` | [Aboudjem/ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite) | [`ui-ux-suite`](https://www.npmjs.com/package/ui-ux-suite) | MIT |
| **recap-studio** | 0.5.1 | One-page explainers. Turns a topic or a coding session into **one self-contained HTML file** (inlined CSS, zero JS, opens by double-click, reads offline in about five minutes). Validation is a set of deterministic heuristic checks. | `claude plugin install recap-studio@10x` | [Aboudjem/recap-studio](https://github.com/Aboudjem/recap-studio) | _(placeholder redirect package only; run from a clone)_ | MIT |
| **aws-cost-audit** | 0.3.1 | AWS cost audit. **Read-only** by default: reads your live account through the AWS CLI, attributes every dollar, and returns a gated savings plan. **No price from memory**, every figure comes from live AWS pricing, and CI fails the build if a price is hardcoded. | `claude plugin install aws-cost-audit@10x` | [Aboudjem/aws-cost-audit-skill](https://github.com/Aboudjem/aws-cost-audit-skill) | _(skill, no npm)_ | MIT |
| **goalify** | 2.6.1 | Autonomous task prep. Scopes a big coding task, locks the few real decisions, and writes **the brief** (a file the run works from) plus **the condition** (one line you paste into `/goal`), so a fresh full-context session executes the whole job, quotes the passing checks in its closing turn, and archives the brief to `.goal/done/`. A Claude Code skill (no MCP server). | `claude plugin install goalify@10x` | [Aboudjem/goalify](https://github.com/Aboudjem/goalify) | _(skill, no npm)_ | MIT |
| **humanizer** | 0.7.1 | AI-writing detector and rewriter. Names **55 AI writing patterns** (inflated symbolism, em dash overuse, promotional language, rule-of-three, and more), rewrites with sentence-length burstiness across **5 voice profiles** (casual, professional, technical, warm, blunt), and produces a **0-100 AI-tell score**. Three modes: detect, rewrite, edit. Pure Markdown, zero dependencies, no network calls. A Claude Code skill (no MCP server). | `claude plugin install humanizer@10x` | [Aboudjem/humanizer-skill](https://github.com/Aboudjem/humanizer-skill) | _(skill, no npm)_ | MIT |
| **loopify** | 1.1.1 | Recurring-job prep. For work that repeats rather than finishes: writes **the brief** (a standing file the loop re-reads every tick) plus **the line** (one short string you paste into Claude Code's built-in `/loop`), with a **tick cap**, a **stop rule** and five safety rails. Every tick logs what it did to `TICKS.md`; what it cannot do safely waits in `QUEUE.md`. A Claude Code skill (no MCP server). | `claude plugin install loopify@10x` | [Aboudjem/loopify](https://github.com/Aboudjem/loopify) | _(skill, no npm)_ | MIT |

Marketplace hub: **[Aboudjem/10x](https://github.com/Aboudjem/10x)** (v2.0.1).

## What's tested

Every figure below was re-derived on 2026-09-03 by running the command in the plugin's own repo.

- **sniff**: `npx vitest run` prints `Tests 507 passed (507)` across 48 test files, including a
  real-browser planted-bug fixture gate (21 bugs across 12 classes, no false positive on a clean
  control page).
- **ui-ux-suite**: `npm test` runs **356 tests**, and a shipped broken fixture must keep producing
  findings that carry a file, a line and a fix.
- **recap-studio**: **73 tests** pass across six workspace projects, on Node 20 and 22.
- **aws-cost-audit**: `bash tests/smoke.sh` prints `Results: 62 passed, 0 failed`. CI also checks
  frontmatter, JSON validity, no hardcoded prices, no secrets, and link resolution.
- **goalify**: `python3 tests/test_manifests.py` prints `126/126 checks passed`,
  `python3 evals/check_skill.py skills/goalify/SKILL.md` prints `83/83`, and
  `python3 tests/test_condition_lint.py` prints `18/18`.
- **humanizer**: **64 tests** pin the metrics CLI's behaviour. CI also validates the SKILL.md
  structure, the 55-pattern catalog (the README badge count must match the catalog), and zero em
  dashes in its own docs, so the skill obeys its own anti-em-dash rule.
- **loopify**: `python3 tests/test_manifests.py` prints `158/158 checks passed`,
  `python3 evals/check_skill.py skills/loopify/SKILL.md` prints `153/153`, and
  `python3 tests/test_ticks_lint.py` prints `13/13`.

## Multi-editor support

Every plugin ships as skills, so `npx skills add Aboudjem/<repo>` installs any of the seven into
Claude Code, Cursor, Codex, GitHub Copilot, Gemini CLI, OpenCode, Zed, Kimi Code CLI and 70+ other
agents. The three tool plugins (sniff, ui-ux-suite, recap-studio) additionally run as a standalone
MCP server and ship an `install.sh` that delegates to the skills CLI, plus `.cursor-plugin` and
`.copilot-plugin` manifests. Every repo carries a `docs/editors.md` with per-editor snippets.

## Manual steps that can't be automated

A few discoverability touches require the GitHub web UI (no API): uploading each repo's 1280x640
`social-preview.png` under **Settings, Social preview**. Demo recordings for ui-ux-suite and
aws-cost-audit still need a screen-capture session; aws-cost-audit additionally needs a live AWS
account, so its demo is left to a contributor rather than faked.

---

_This file is the canonical roster. If a version here disagrees with a tool's live `plugin.json`, the
live repo wins: re-derive, don't trust a cached number._
