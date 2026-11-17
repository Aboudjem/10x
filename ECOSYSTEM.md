# The 10x ecosystem: one place to see it all

**10x** is a curated marketplace of Claude Code plugins. Every one of them also installs into
other agents through the Vercel skills CLI, and three of them run as a standalone MCP server or CLI
in any editor. Versions and test counts below were last aligned on **2026-11-17**.

> Install one tool, in any agent, for all your projects:
> ```
> npx skills add Aboudjem/<repo> -g
> ```
> In Claude Code, the plugin route:
> ```
> claude plugin marketplace add Aboudjem/10x
> claude plugin install <name>@10x
> ```

## The tools

| Tool | Version | What it does (the job-to-be-done) | Install | Repo | npm | License |
|---|---|---|---|---|---|---|
| **sniff** | 0.9.5 | Find what is broken in your running web app before users do. Each page bug comes with the steps to repeat it and a fix. Also runs as an MCP server and a CLI (`npx sniff-qa`). | `claude plugin install sniff@10x` | [Aboudjem/sniff](https://github.com/Aboudjem/sniff) | [`sniff-qa`](https://www.npmjs.com/package/sniff-qa) | Apache-2.0 |
| **ui-ux-suite** | 0.7.3 | Finds the design bugs in your CSS, JSX, HTML and Tailwind. Each one gets its file, line, measured value and exact fix. WCAG 2.2 contrast. Also runs as an MCP server and a CLI (`npx ui-ux-suite`). | `claude plugin install ui-ux-suite@10x` | [Aboudjem/ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite) | [`ui-ux-suite`](https://www.npmjs.com/package/ui-ux-suite) | MIT |
| **recap-studio** | 0.6.4 | Understand what was done: one HTML page from your git session or a topic. Double-click to open. Works offline, no JavaScript. Also runs as a CLI and an MCP server from GitHub. | `claude plugin install recap-studio@10x` | [Aboudjem/recap-studio](https://github.com/Aboudjem/recap-studio) | _(not on npm; runs with `npx -y github:Aboudjem/recap-studio`)_ | MIT |
| **aws-cost-audit** | 0.4.5 | Ranks what to cut on your AWS bill, three cuts first. Each price comes from AWS; the validator rejects a figure with no lookup record. Dry run by default. | `claude plugin install aws-cost-audit@10x` | [Aboudjem/aws-cost-audit-skill](https://github.com/Aboudjem/aws-cost-audit-skill) | _(skill, no npm)_ | MIT |
| **goalify** | 3.1.4 | Give your agent a big job once. It asks every question first, saves the plan to a file, and re-runs your tests as proof. Works in any agent that reads skills. | `claude plugin install goalify@10x` | [Aboudjem/goalify](https://github.com/Aboudjem/goalify) | _(skill, no npm)_ | MIT |
| **humanizer** | 0.8.4 | See which words make a draft sound like AI, then rewrite it in one of five voices. Optional 0 to 100 score. No network calls of its own. | `claude plugin install humanizer@10x` | [Aboudjem/humanizer-skill](https://github.com/Aboudjem/humanizer-skill) | _(skill, no npm)_ | MIT |
| **loopify** | 1.2.4 | Check a repeating Claude Code job in one line: OK, NEEDS YOU or STALE. loopify writes the brief and the /loop line, stop rule included. | `claude plugin install loopify@10x` | [Aboudjem/loopify](https://github.com/Aboudjem/loopify) | _(skill, no npm)_ | MIT |
| **secure-my-app** | 0.3.2 | 65 security checks for your app before launch. Each hole comes with its proof, and a fix counts only when its VERIFY output changes. | `claude plugin install secure-my-app@10x` | [Aboudjem/secure-my-app](https://github.com/Aboudjem/secure-my-app) | _(skill, no npm)_ | MIT |
| **contextify** | 0.3.4 | Know when your agent instructions point at something gone. One AGENTS.md for all your agents and a local check that costs no tokens. | `claude plugin install contextify@10x` | [Aboudjem/contextify](https://github.com/Aboudjem/contextify) | _(skill, no npm)_ | MIT |

Marketplace hub: **[Aboudjem/10x](https://github.com/Aboudjem/10x)** (v2.1.5).

## What's tested

Every figure below comes from the Proof section of the plugin's own README on 2026-11-17.
Run the command in a clone of that repo to re-print it.

| Plugin | Command | What it prints |
|---|---|---|
| sniff | `npm test` | `Test Files  54 passed (54)` and `Tests  603 passed (603)` |
| sniff | `npm run build && npm run proof` | `Recall: 21/21 (100%)` on the planted-bug fixture, 0 findings on the clean page |
| ui-ux-suite | `npm test` | 397 tests pass, 0 fail |
| recap-studio | `npm run test:count` | 115 tests |
| aws-cost-audit | `make test` | `Results: 167 passed, 0 failed` |
| goalify | `make test` | `10/10 suites passed`, then `460/460 checks passed` |
| humanizer | `npm test` | `# pass 90` and `# fail 0` |
| loopify | `make test` | `161/161` skill checks, `170/170` manifest checks, `13/13`, `62/62`, `18/18` and `5/5` on the other suites |
| secure-my-app | `make test` | `79/79` skill checks, `152/152` manifest checks, `54/54` fixture checks (they replay the proof behind all 11 sample findings) |
| contextify | `make test` | `128/128` drift checks, `30/30` claim checks, `155/155` manifest checks, `114/114` skill checks, three unittest suites OK |

Each repo's CI runs the same command on every push and pull request.

## Multi-editor support

Every plugin ships as skills, so `npx skills add Aboudjem/<repo> -g` installs any of the nine into
Claude Code, Cursor, Codex, GitHub Copilot, Gemini CLI, OpenCode, Zed, Kimi Code CLI and the other agents on
[the skills CLI list](https://github.com/vercel-labs/skills#supported-agents). The three tool plugins (sniff, ui-ux-suite, recap-studio) additionally run as a standalone
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
