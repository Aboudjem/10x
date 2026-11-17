<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/assets/hero-banner-light.svg">
  <img alt="10x: curated Claude Code plugins that ship quality" src=".github/assets/hero-banner-light.svg" width="100%">
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

<p align="center"><b>A plugin marketplace is a list your editor can install from. This one holds nine developer tools for Claude Code, and you add it once.</b></p>

<p align="center">
  <a href="#install">Install</a> ·
  <a href="#the-plugins">The plugins</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#proof">Proof</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">Limits</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

What you see after the two install commands (real run, 2026-11-17):

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

## Install

Add the marketplace once. Claude Code can then install any of the nine by name.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

Swap `sniff` for any name in the table below.

A plugin can run commands and read files with your permissions. Read a plugin's repo before you install it.

Not on Claude Code? Install one plugin at a time with the [Vercel skills CLI](https://github.com/vercel-labs/skills).
It copies the skills into the folder your agent reads.

```bash
npx skills add Aboudjem/sniff
```

Use the plugin's repo name, not `Aboudjem/10x`. This repo is a list and holds no skills of its own.

## The plugins

| | Plugin | What it is for | Install | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | Walks your running app and finds real bugs | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | ESLint for design: the line, the value, the fix | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | One offline HTML explainer from a topic or a session | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | Audits your AWS bill against live AWS pricing | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | Preps a huge task to run on its own | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | Names 55 AI writing habits and rewrites them | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | Preps a repeating job for Claude Code's `/loop` | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | Finds what a stranger can take, then proves it shut | `claude plugin install secure-my-app@10x` | [repo](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | Writes agent instructions, then checks they are still true | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

### What each one does

#### sniff

Point it at your running app. It clicks through your real flows in a real browser.
Then it tells you what broke and the ordered steps that broke it.

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

It reads your CSS, JSX, HTML and Tailwind classes. It names the file, the line, the measured wrong value, and the exact fix.
It audits, it never edits.

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

It turns a topic or a coding session into one HTML file you can double-click.
Every style is inlined and the page makes no external request. You can read it offline in about five minutes.

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

It reads your live AWS account through the AWS CLI you already have, then hands you a savings plan.
Every price in the plan is checked live, never quoted from memory.

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

It is for a job too big to sit and watch. It writes two things:

- the brief, a file that holds what the run has to do
- the condition, one line you paste into `/goal`

A fresh session then does the work and closes by quoting the checks passing.

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

It knows 55 habits that make writing read as machine-written, and names the ones it finds in your text.
You get a score from 0 to 100, built from measurable signals, then a rewrite in the voice you pick.

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

It is for a job that repeats and never finishes. It writes the brief and the line you paste into `/loop`.
`/loop` is Claude Code's built-in repeat command. The line carries a tick cap and a stop rule. Every tick logs what it did.

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

It finds what a stranger can take from your app. Each finding comes with a command whose output you can read.
You approve a fix, or you do not. The same command then runs again to prove the hole is shut and your own login still works.
65 controls, seven groups. A clean run is never called secure: the third gate label reads `NOTHING CONFIRMED HERE`.

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Tell every coding agent how your repo works. Then prove it is still true.**

It keeps `AGENTS.md` short and reuses accurate existing docs.
When useful, it adds `docs/context/architecture.md` or `docs/context/workflows.md`, at most 120 lines each.
Installed Git hooks check at commit and push without calling a model. Session hooks are opt-in.
Updates show a diff and preserve human content outside managed blocks.

`claude plugin install contextify@10x`

[GitHub](https://github.com/Aboudjem/contextify)

## How it works

10x is one file: [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json). It holds no plugin code.

1. Each entry names a plugin, its GitHub repo, and the version listed here.
2. `claude plugin marketplace add Aboudjem/10x` clones this repo and reads that file.
3. `claude plugin install <name>@10x` fetches the plugin from its own repo.
4. A scheduled job re-reads every plugin repo and updates the version numbers. [docs/SYNC.md](docs/SYNC.md) explains the chain.

### Other agents

<p align="center">
  <img src=".github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

Every plugin here ships as skills, which are Markdown files your agent reads.
That is why all nine install outside Claude Code through `npx skills add`.
The skills CLI keeps its own [list of supported agents](https://github.com/vercel-labs/skills#supported-agents).

Three plugins also run as a standalone MCP server. MCP is the protocol an editor speaks to reach an outside tool.
sniff and ui-ux-suite run straight from npm. recap-studio runs from a clone after a workspace build.
The other six ship no MCP server.

| Agent | One-line install |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, and [the rest of the list](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| Any MCP client | `npx sniff-qa --mcp`, `npx ui-ux-suite --mcp`, recap-studio from a built clone |
| Everything else | see `docs/editors.md` in the plugin's own repo |

## Proof

Each claim below comes with the command that prints it. Run them from a clone of this repo.

| Claim | Command | Last line it prints |
|:--|:--|:--|
| The list holds nine valid plugins | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| Every listed version matches the plugin's own repo | `npm run sync:check` | `drift: none` |
| The manifest loads in Claude Code | `claude plugin validate . --strict` | `Validation passed` |
| The repo's own tests pass | `npm test` | `# fail 0` |

CI runs all four on every push and pull request. It also checks every link and scans for secrets.

### The 10x bar

| | |
|---|---|
| **Lean by default** | No dependency a plugin does not need. ui-ux-suite and the six skills ship none. recap-studio's packages pull zod, its web app Next and React. sniff drives a real browser, so it carries Playwright and Lighthouse. |
| **One-command install** | No config file and no signup. aws-cost-audit is the one that needs access you may not have: an AWS CLI configured to read the account. |
| **Real tests** | CI that asserts behaviour, not that a file exists. |
| **Runs outside Claude Code** | Installs into other agents through `npx skills add`. |
| **Actively maintained** | A release this quarter, not an archive from last year. |
| **No telemetry** | No analytics and no phoning home. Each tool talks only to what you point it at. |

Every plugin listed here is held to this bar. If one stops passing, it gets removed.
The full checklist, the roster and the last verification date are in [QUALITY-BAR.md](QUALITY-BAR.md).

## FAQ

### What is a plugin marketplace?

It is a list your editor can install from. You add the list once, then install any plugin on it by name.

### Do I have to install all nine?

No. Adding the marketplace installs nothing. Each `claude plugin install <name>@10x` installs one plugin.

### Does it work without Claude Code?

Yes, one plugin at a time. Run `npx skills add Aboudjem/<repo>` with the plugin's repo name from the table.

### Why does `npx skills add Aboudjem/10x` find no skills?

This repo is only the list. The skills live in each plugin's own repo, so point the command at that repo.

### How do I update or remove a plugin?

Run `claude plugin update <name>@10x` to update. Run `claude plugin uninstall <name>@10x` to remove it.

### Does 10x collect any data?

No. The repo holds a JSON file, docs and images. Nothing in it runs on your machine.

## Limits

- 10x lists plugins. It does not sandbox them. A plugin runs with your permissions.
- The Claude Code commands need the `claude` CLI. Other agents use `npx skills add`, one plugin repo at a time.
- Only three plugins ship an MCP server: sniff, ui-ux-suite and recap-studio.
- aws-cost-audit needs an AWS CLI that can read your account.
- The version listed here can trail a new plugin release by up to six hours, until the sync job runs.
- Each plugin keeps its own license. sniff is Apache-2.0, the other eight are MIT.

## Contributing

Have a plugin that belongs here? [CONTRIBUTING.md](CONTRIBUTING.md) has the proposal steps.
A workflow syncs every listed version from the plugin's own repo. [docs/SYNC.md](docs/SYNC.md) explains the chain.

<p align="center">
  <sub>Built by <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · MIT License · No telemetry, no data collection</sub>
</p>
