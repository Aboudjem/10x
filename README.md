<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/assets/hero-banner-light.svg">
  <img alt="10x: nine agent tools, proof for each. Three chips: install by name, proof for each tool, clear limits. The two install commands, and a 3 by 3 grid of the nine tool logos, each with its first benefit." src=".github/assets/hero-banner-light.svg" width="100%">
</picture>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-00D4FF?style=flat-square" alt="License MIT"></a>
  <a href="https://github.com/Aboudjem/10x/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aboudjem/10x/validate.yml?branch=main&style=flat-square&color=7C3AED&label=validate" alt="validate workflow status"></a>
</p>

<p align="center">
  <b>English</b> ·
  <a href="READMEs/zh-CN.md">简体中文</a> ·
  <a href="READMEs/ja.md">日本語</a> ·
  <a href="READMEs/es.md">Español</a> ·
  <a href="READMEs/fr.md">Français</a>
</p>

<p align="center"><b>Nine agent tools, each with proof, from one list.</b></p>

<p align="center">
  <a href="#the-plugins">The plugins</a> ·
  <a href="#install">Install</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#proof">Proof</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">Limits</a>
</p>

Add the list once, then install any tool by its name.

| Install by name | Proof for each tool | Clear limits |
|:--|:--|:--|
| `npm run validate` prints `Marketplace has 9 valid plugin(s)`. | Each plugin README has a Proof section with commands you can re-run. | Each plugin README has a Limits section that says what it cannot do. |

**Works with:** Claude Code, and more than 70 other agents through `npx skills`.
Three tools also run as MCP servers. MCP is the standard way an agent calls a tool.
No tool is tied to one model: skills are plain Markdown files.

```bash
# Any agent: install one tool for all your projects
npx skills add Aboudjem/humanizer-skill -g
# Claude Code: add the list once, then install by name
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

What the two Claude Code commands print (real run, 2026-11-17):

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

- **What it is:** a list of nine tools for coding agents.
- **When to use it:** you have one job, such as finding bugs or cutting AWS costs.
- **What you get:** one install command per tool, and a README with its proof and limits.

10x only lists plugins. Each one runs with your permissions, so read its repo first.

## The plugins

| | Plugin | One line | Chips |
|:-:|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**sniff**](https://github.com/Aboudjem/sniff) | Catch broken pages in your web app before users do. | Bugs caught before users · Steps to repeat it · Broken merges blocked |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**ui-ux-suite**](https://github.com/Aboudjem/ui-ux-suite) | Design bugs by line number, each with the exact fix. | Exact line to fix · WCAG rule cited · Fix value given |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**recap-studio**](https://github.com/Aboudjem/recap-studio) | Understand what changed, in one page you can send. | Understand what was done · One page to send · Checked before you send |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**aws-cost-audit**](https://github.com/Aboudjem/aws-cost-audit-skill) | Find what to stop paying for on your AWS bill. | Lower AWS bill · Prices checked against AWS · Rollback before any change |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**goalify**](https://github.com/Aboudjem/goalify) | Give your agent a big job and get proof back. | Questions asked once · Plan saved to file · Proof it is done |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**humanizer**](https://github.com/Aboudjem/humanizer-skill) | See why your draft sounds like AI, then fix it. | Know which words · Reads more human · Facts kept |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**loopify**](https://github.com/Aboudjem/loopify) | Check a repeating agent job in one line. | No babysitting · Fewer stuck ticks · Stops by itself |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**secure-my-app**](https://github.com/Aboudjem/secure-my-app) | Find what a stranger can take from your app. | Fixes proven closed · Proof for each hole · No surprise changes |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**contextify**](https://github.com/Aboudjem/contextify) | One AGENTS.md for your agents, checked with zero tokens. | Time saved · Context kept · Tokens saved |

Each line and each chip comes from the tool's own README. [What each one does](#what-each-one-does) gives the proof.

## Install

**Recommended: the Vercel skills CLI.** `npx skills` is Vercel's open installer for agent skills.
One command installs one tool for all your projects:

```bash
npx skills add Aboudjem/sniff -g
```

Works in more than 70 agents: pick yours in the menu ([supported agents](https://github.com/vercel-labs/skills#supported-agents)).
In a terminal it shows the agent menu. In a script it installs into every agent folder, so add `-a <agent>` there.
Only this project: drop `-g`.

Use the tool's repo name, not `Aboudjem/10x`. This repo is the list and holds no skills of its own.

| Tool | Command | Page |
|:--|:--|:--|
| sniff | `npx skills add Aboudjem/sniff -g` | [skills.sh](https://skills.sh/aboudjem/sniff) |
| ui-ux-suite | `npx skills add Aboudjem/ui-ux-suite -g` | [skills.sh](https://skills.sh/aboudjem/ui-ux-suite) |
| recap-studio | `npx skills add Aboudjem/recap-studio -g` | [skills.sh](https://skills.sh/aboudjem/recap-studio) |
| aws-cost-audit | `npx skills add Aboudjem/aws-cost-audit-skill -g` | [skills.sh](https://skills.sh/aboudjem/aws-cost-audit-skill) |
| goalify | `npx skills add Aboudjem/goalify -g` | [skills.sh](https://skills.sh/aboudjem/goalify) |
| humanizer | `npx skills add Aboudjem/humanizer-skill -g` | [skills.sh](https://skills.sh/aboudjem/humanizer-skill) |
| loopify | `npx skills add Aboudjem/loopify -g` | [skills.sh](https://skills.sh/aboudjem/loopify) |
| secure-my-app | `npx skills add Aboudjem/secure-my-app -g` | [skills.sh](https://skills.sh/aboudjem/secure-my-app) |
| contextify | `npx skills add Aboudjem/contextify -g` | [skills.sh](https://skills.sh/aboudjem/contextify) |

It installs the skills only. The three MCP servers are a separate one-line step: see [MCP servers](#mcp-servers).

**Or install straight into one agent.** Each command installs for all your projects.

<a href="#claude-code"><img alt="Claude Code" height="24" src="https://img.shields.io/badge/Claude_Code-D97757?style=flat-square&logo=claude&logoColor=white"></a> <a href="#codex"><img alt="Codex" height="24" src="https://img.shields.io/badge/Codex-000000?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHRpdGxlPk9wZW5BSTwvdGl0bGU%2BPHBhdGggZD0iTTIyLjI4MTkgOS44MjExYTUuOTg0NyA1Ljk4NDcgMCAwIDAtLjUxNTctNC45MTA4IDYuMDQ2MiA2LjA0NjIgMCAwIDAtNi41MDk4LTIuOUE2LjA2NTEgNi4wNjUxIDAgMCAwIDQuOTgwNyA0LjE4MThhNS45ODQ3IDUuOTg0NyAwIDAgMC0zLjk5NzcgMi45IDYuMDQ2MiA2LjA0NjIgMCAwIDAgLjc0MjcgNy4wOTY2IDUuOTggNS45OCAwIDAgMCAuNTExIDQuOTEwNyA2LjA1MSA2LjA1MSAwIDAgMCA2LjUxNDYgMi45MDAxQTUuOTg0NyA1Ljk4NDcgMCAwIDAgMTMuMjU5OSAyNGE2LjA1NTcgNi4wNTU3IDAgMCAwIDUuNzcxOC00LjIwNTggNS45ODk0IDUuOTg5NCAwIDAgMCAzLjk5NzctMi45MDAxIDYuMDU1NyA2LjA1NTcgMCAwIDAtLjc0NzUtNy4wNzI5em0tOS4wMjIgMTIuNjA4MWE0LjQ3NTUgNC40NzU1IDAgMCAxLTIuODc2NC0xLjA0MDhsLjE0MTktLjA4MDQgNC43NzgzLTIuNzU4MmEuNzk0OC43OTQ4IDAgMCAwIC4zOTI3LS42ODEzdi02LjczNjlsMi4wMiAxLjE2ODZhLjA3MS4wNzEgMCAwIDEgLjAzOC4wNTJ2NS41ODI2YTQuNTA0IDQuNTA0IDAgMCAxLTQuNDk0NSA0LjQ5NDR6bS05LjY2MDctNC4xMjU0YTQuNDcwOCA0LjQ3MDggMCAwIDEtLjUzNDYtMy4wMTM3bC4xNDIuMDg1MiA0Ljc4MyAyLjc1ODJhLjc3MTIuNzcxMiAwIDAgMCAuNzgwNiAwbDUuODQyOC0zLjM2ODV2Mi4zMzI0YS4wODA0LjA4MDQgMCAwIDEtLjAzMzIuMDYxNUw5Ljc0IDE5Ljk1MDJhNC40OTkyIDQuNDk5MiAwIDAgMS02LjE0MDgtMS42NDY0ek0yLjM0MDggNy44OTU2YTQuNDg1IDQuNDg1IDAgMCAxIDIuMzY1NS0xLjk3MjhWMTEuNmEuNzY2NC43NjY0IDAgMCAwIC4zODc5LjY3NjVsNS44MTQ0IDMuMzU0My0yLjAyMDEgMS4xNjg1YS4wNzU3LjA3NTcgMCAwIDEtLjA3MSAwbC00LjgzMDMtMi43ODY1QTQuNTA0IDQuNTA0IDAgMCAxIDIuMzQwOCA3Ljg3MnptMTYuNTk2MyAzLjg1NThMMTMuMTAzOCA4LjM2NCAxNS4xMTkyIDcuMmEuMDc1Ny4wNzU3IDAgMCAxIC4wNzEgMGw0LjgzMDMgMi43OTEzYTQuNDk0NCA0LjQ5NDQgMCAwIDEtLjY3NjUgOC4xMDQydi01LjY3NzJhLjc5Ljc5IDAgMCAwLS40MDctLjY2N3ptMi4wMTA3LTMuMDIzMWwtLjE0Mi0uMDg1Mi00Ljc3MzUtMi43ODE4YS43NzU5Ljc3NTkgMCAwIDAtLjc4NTQgMEw5LjQwOSA5LjIyOTdWNi44OTc0YS4wNjYyLjA2NjIgMCAwIDEgLjAyODQtLjA2MTVsNC44MzAzLTIuNzg2NmE0LjQ5OTIgNC40OTkyIDAgMCAxIDYuNjgwMiA0LjY2ek04LjMwNjUgMTIuODYzbC0yLjAyLTEuMTYzOGEuMDgwNC4wODA0IDAgMCAxLS4wMzgtLjA1NjdWNi4wNzQyYTQuNDk5MiA0LjQ5OTIgMCAwIDEgNy4zNzU3LTMuNDUzN2wtLjE0Mi4wODA1TDguNzA0IDUuNDU5YS43OTQ4Ljc5NDggMCAwIDAtLjM5MjcuNjgxM3ptMS4wOTc2LTIuMzY1NGwyLjYwMi0xLjQ5OTggMi42MDY5IDEuNDk5OHYyLjk5OTRsLTIuNTk3NCAxLjQ5OTctMi42MDY3LTEuNDk5N1oiLz48L3N2Zz4%3D"></a> <a href="#cursor"><img alt="Cursor" height="24" src="https://img.shields.io/badge/Cursor-000000?style=flat-square&logo=cursor&logoColor=white"></a> <a href="#gemini-cli"><img alt="Gemini CLI" height="24" src="https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white"></a> <a href="#github-copilot"><img alt="GitHub Copilot" height="24" src="https://img.shields.io/badge/Copilot-24292F?style=flat-square&logo=githubcopilot&logoColor=white"></a> <a href="#opencode"><img alt="OpenCode" height="24" src="https://img.shields.io/badge/OpenCode-333333?style=flat-square&logo=opencode&logoColor=white"></a> <a href="https://skills.sh/aboudjem"><img alt="skills.sh" height="24" src="https://img.shields.io/badge/skills.sh-000000?style=flat-square&logo=vercel&logoColor=white"></a>

Swap `<repo>` for a repo name from the table above.
Install tested for all nine tools on 2026-11-17, into an empty home folder.

#### Claude Code

```bash
npx skills add Aboudjem/<repo> -g -a claude-code
```

#### Codex

```bash
npx skills add Aboudjem/<repo> -g -a codex
```

#### Cursor

```bash
npx skills add Aboudjem/<repo> -g -a cursor
```

#### Gemini CLI

```bash
npx skills add Aboudjem/<repo> -g -a gemini-cli
```

#### GitHub Copilot

```bash
npx skills add Aboudjem/<repo> -g -a github-copilot
```

#### OpenCode

```bash
npx skills add Aboudjem/<repo> -g -a opencode
```

**Claude Code plugin.** Add the list once, then install by name.
For three tools, the plugin adds more than the skills:

- sniff: the MCP server.
- ui-ux-suite: 5 slash commands, 12 agents and the MCP server.
- recap-studio: 13 agents, safety hooks and the MCP server.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Swap `sniff` for any name in [the plugins](#the-plugins) table.
Claude Code plugins install per user, so they work in all your projects.

### MCP servers

MCP is the standard way an agent calls a tool. Three tools ship an MCP server:

```bash
npx sniff-qa --mcp
npx ui-ux-suite --mcp
npx -y github:Aboudjem/recap-studio mcp
```

Each repo's `docs/editors.md` shows how to add the server to your editor. The other six ship no MCP server.

## What each one does

#### sniff

**Catch broken pages in your web app before users do.**

- **Bugs caught before users.** Found 21 of 21 planted bugs, 0 false findings: `npm run build && npm run proof`.
- **Steps to repeat it.** Each page bug comes with its route, the steps to repeat it, and a fix.
- **Broken merges blocked.** `--fail-on` exits 1 on critical or high bugs, so CI stops the merge.

Limit: use a dev or staging app. A walk clicks buttons and submits real forms.

```bash
npx sniff-qa --url http://localhost:3000
npx skills add Aboudjem/sniff -g
claude plugin install sniff@10x
```

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

**Design bugs by line number, each with the exact fix.**

- **Exact line to fix.** 46 located findings on the test app, each with a file and a line.
- **WCAG rule cited.** Contrast is measured against WCAG 2.2. Each finding cites a WCAG rule or UX law.
- **Fix value given.** Each one shows the measured value and the change, such as `#fbfbfb` to `#767676`.

Limit: it reads source, not pixels, and it never edits your code.

```bash
npx ui-ux-suite .
npx skills add Aboudjem/ui-ux-suite -g
claude plugin install ui-ux-suite@10x
```

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

**Understand what changed, in one page you can send.**

- **Understand what was done.** `/recap session` reads your git diff and commits, then writes one page.
- **One page to send.** One HTML file, 0 script tags, all CSS inside. The demo prints both.
- **Checked before you send.** Seven checks score the page with no model. `--fail-under 8` refuses a weak page.

Limit: the score checks shape, not truth, so read the sources before you share.

```bash
npx -y github:Aboudjem/recap-studio demo
npx skills add Aboudjem/recap-studio -g
claude plugin install recap-studio@10x
```

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

**Find what to stop paying for on your AWS bill.**

- **Lower AWS bill.** Each report opens with a dollar verdict and the three cuts to make first.
- **Prices checked against AWS.** Each price records its AWS lookup. `make test` shows a figure without one is rejected.
- **Rollback before any change.** Scripts do a dry run by default. `--apply` saves a rollback file first, then asks, unless `--yes`.

Limit: it needs the AWS CLI v2, bash and `jq`, and Cost Explorer turned on.

```bash
npx skills add Aboudjem/aws-cost-audit-skill -g
claude plugin install aws-cost-audit@10x
```

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

**Give your agent a big job and get proof back.**

- **Questions asked once.** Every question comes first, once. The answers sit in the brief under "Decisions".
- **Plan saved to file.** The run re-reads the brief file, so it can start in a clean chat.
- **Proof it is done.** `/goalify verify` re-runs your tests: `make demo` VERIFIED, `--broken` NOT VERIFIED.

Limit: a stopped run is not always done, and it can pause on a permission prompt.

```bash
npx skills add Aboudjem/goalify -g
claude plugin install goalify@10x
```

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

**See why your draft sounds like AI, then fix it.**

- **Know which words.** It quotes each word that sounds like AI. The CLI ranks them in a "Fix first" list.
- **Reads more human.** The bundled example drops from 57 to 6 out of 100. Lower is more human.
- **Facts kept.** The CLI's `compare --check-facts` fails a rewrite that lost a number, date, version or URL.

Limit: it is not an AI detector, and it does not promise to pass one.

```bash
npx skills add Aboudjem/humanizer-skill -g
claude plugin install humanizer@10x
```

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

**Check a repeating agent job in one line.**

- **No babysitting.** `loop_status.py` prints one of six verdicts, then up to three things to do.
- **Fewer stuck ticks.** loopify prints the commands to allow first, such as `gh pr view`. A tick is one run of the job.
- **Stops by itself.** The line carries a stop rule. Every `/loop` ends after 7 days.

Limit: the loop lives in your open session. Close the terminal and it stops.

```bash
npx skills add Aboudjem/loopify -g
claude plugin install loopify@10x
```

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

**Find what a stranger can take from your app.**

- **Fixes proven closed.** A fix counts only when its VERIFY output changes. All 11 sample findings have one.
- **Proof for each hole.** Each finding shows its proof. `make test` replays the proof behind all 11 sample findings.
- **No surprise changes.** It writes a report and stops. Each fix waits for your yes.

Limit: it is not a penetration test (a paid attack by an expert).

```bash
npx skills add Aboudjem/secure-my-app -g
claude plugin install secure-my-app@10x
```

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**One AGENTS.md for your agents, checked with zero tokens.**

- **Time saved.** The warning names the file, the line and the missing command.
- **Context kept.** One file of 20, 40 or 60 lines, by repo size. The `CLAUDE.md` pointer is 4 lines.
- **Tokens saved.** The check for stale lines is a local script. It calls no model, so it costs zero tokens.

Limit: it checks that a command exists. It does not run the command.

```bash
npx skills add Aboudjem/contextify -g
claude plugin install contextify@10x
```

[GitHub](https://github.com/Aboudjem/contextify)

## How it works

10x is one file: [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json). It holds no plugin code.

1. Each entry names a plugin, its GitHub repo, and the version listed here.
2. `claude plugin marketplace add Aboudjem/10x` clones this repo and reads that file.
3. `claude plugin install <name>@10x` fetches the plugin from its own repo.
4. A scheduled job re-reads every plugin repo and updates the version numbers. [docs/SYNC.md](docs/SYNC.md) explains the chain.

The `npx skills` route skips this file. It copies the skills from the tool's own repo into your agent's folder.

### Other agents

<p align="center">
  <img src=".github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf and Continue, and more through the skills CLI. Three plugins also run as MCP servers." width="100%">
</p>

Every plugin here ships as skills, which are Markdown files your agent reads.
That is why all nine install outside Claude Code through `npx skills add`.

| Agent | One-line install |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, and [the rest of the list](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo> -g` |
| Any MCP client | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`, `npx -y github:Aboudjem/recap-studio mcp` |
| Everything else | see `docs/editors.md` in the plugin's own repo |

## Proof

Each claim below comes with the command that prints it. Run them from a clone of this repo.

| Claim | Command | Line to look for in its output |
|:--|:--|:--|
| The list holds nine valid plugins | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| Every listed version matches the plugin's own repo | `npm run sync:check` | `drift: none` (if a repo cannot be read, it prints `unverified: <n> of 9 ...` and exits 1) |
| The manifest loads in Claude Code | `claude plugin validate . --strict` | `✔ Validation passed` |
| The repo's own tests pass | `npm test` | `# fail 0` |

CI (the automatic checks on GitHub) runs all four on every push and pull request. It also checks every link and scans for secrets.

### The 10x bar

| | |
|---|---|
| **Lean by default** | No dependency a plugin does not need. ui-ux-suite and the six skills ship none. recap-studio's packages pull zod, its web app Next and React. sniff depends on `zod` only and downloads its browser engine and Chromium on first use (about 440 MB). |
| **One-command install** | No config file and no signup. aws-cost-audit is the one that needs access you may not have: an AWS CLI configured to read the account. |
| **Real tests** | CI that checks behaviour, not only that a file exists. |
| **Runs outside Claude Code** | Installs into other agents through `npx skills add`. |
| **Actively maintained** | A release this quarter, not an archive from last year. |
| **No telemetry** | No analytics and no phoning home. Network calls serve the job, for example sniff's browser download and its check of your pages' external links. |

Every plugin listed here is held to this bar. If one stops passing, it gets removed.
The full checklist, the roster and the last verification date are in [QUALITY-BAR.md](QUALITY-BAR.md).

## FAQ

### What is a plugin marketplace?

A plugin marketplace is a list your editor can install from. You add the list once, then install any plugin on it by name.

### Do I have to install all nine?

No. Adding the marketplace installs nothing. Each `claude plugin install <name>@10x` or `npx skills add` installs one tool.

### Does it work without Claude Code?

Yes, one tool at a time. Run `npx skills add Aboudjem/<repo> -g` with the repo name from the table.

### Why does `npx skills add Aboudjem/10x` find no skills?

This repo is only the list. The skills live in each plugin's own repo, so point the command at that repo.

### How do I update or remove a plugin?

Run `claude plugin update <name>@10x` to update. Run `claude plugin uninstall <name>@10x` to remove it.
With the skills CLI, run `npx skills update` or `npx skills remove <skill>`.

### Does 10x collect any data?

No. 10x has no analytics. Adding the list clones this repo and runs nothing. Its scripts and tests run only when you run them in a clone.

## Limits

- 10x lists plugins. It does not sandbox them. A plugin runs with your permissions.
- The Claude Code commands need the `claude` CLI. Other agents use `npx skills add`, one plugin repo at a time.
- `npx skills` installs the skills only. Only three plugins ship an MCP server: sniff, ui-ux-suite and recap-studio.
- aws-cost-audit needs an AWS CLI that can read your account, and `jq`.
- sniff's first walk downloads a browser engine and Chromium once: about 440 MB, then about 730 MB on disk on a Mac. `npx sniff-qa install` does it ahead of time, and the MCP tool `sniff_install` reports progress.
- Until that download is complete, even after one cut midway, sniff returns setup steps: an install hint in the CLI, `needsSetup` in MCP.
- sniff's MCP server answers before that download. Its README measured 3.1 to 4.9 s on an empty npm cache, under Claude Code's 30 s connect limit.
- `claude plugin list` can show recap-studio's note "The packages it lists were not installed". It is harmless: the plugin runs from one bundled file.
- The version listed here can trail a new plugin release by up to six hours, until the sync job runs.
- Each plugin keeps its own license. sniff is Apache-2.0, the other eight are MIT.

## Contributing

Have a plugin that belongs here? [CONTRIBUTING.md](CONTRIBUTING.md) has the proposal steps.
A workflow syncs every listed version from the plugin's own repo. [docs/SYNC.md](docs/SYNC.md) explains the chain.

<p align="center">
  <sub>Built by <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · MIT License · No telemetry, no data collection</sub>
</p>
