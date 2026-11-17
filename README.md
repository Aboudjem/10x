<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/assets/hero-banner-light.svg">
  <img alt="10x: nine Claude Code tools, one list, proof for each" src=".github/assets/hero-banner-light.svg" width="100%">
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

<p align="center"><b>Nine Claude Code tools. One list. Proof for each.</b></p>

<p align="center">
  <a href="#install">Install</a> ·
  <a href="#the-plugins">The plugins</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#proof">Proof</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">Limits</a>
</p>

Add this list once, then install any of the nine tools by name.

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

What you see after those two commands (real run, 2026-11-17):

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

Catch what is broken in your app, find what a stranger can take, and cut what your AWS bill wastes.
Make AI drafts read like a person wrote them, and hand off long jobs with a receipt.
Every plugin lists the commands that prove what it says.

10x lists plugins, it does not sandbox them: each one runs with your permissions.

## Why use it

- **One add, nine tools.** Adding the list installs nothing. `claude plugin install <name>@10x` installs one tool.
  Proof: `npm run validate` prints `Marketplace has 9 valid plugin(s)`.
- **Checked on every push.** CI runs `npm run validate`, `npm run sync:check`, `claude plugin validate . --strict` and `npm test`.
  Proof: the [validate workflow](.github/workflows/validate.yml) and the [Proof](#proof) table below.
- **Limits in plain sight.** Each plugin's README has a Proof section and a Limits section that says what it cannot do.
  Proof: open any repo link in [The plugins](#the-plugins) and read its `## Proof` and `## Limits`.

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
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | Catch the 500s, dead links and broken forms in your running app, with repro steps. | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | Fix contrast, focus and layout bugs: the file, the line, the measured value, the change. | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | Explain a topic or your session in one HTML page that opens offline. | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | Cut your AWS bill: a ranked list of cuts, each priced from AWS at run time. | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | Hand off a big job and get a receipt: VERIFIED or NOT VERIFIED. | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | See what makes a draft sound AI-written, then rewrite it in a voice you pick. | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | Run a repeating job and check it in one line: OK, NEEDS YOU, STALE. | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | Find what a stranger can take from your app, with the proof behind each hole. | `claude plugin install secure-my-app@10x` | [repo](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | One AGENTS.md for your agents, and a no-token check that flags dead commands and files. | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

### What each one does

#### sniff

**Catch the 500s, dead links and broken forms in your running app.**

- The report opens with the verdict and the three fixes to make first. It says how many low-confidence findings it hid.
- Each page finding names the route, the steps and a fix, most with a screenshot.
- It found 21 of 21 planted bugs, with 0 false findings on the clean page (`npm run build && npm run proof`).
- `--fail-on` exits 1 on critical or high findings, so it can block a merge. No API key.

It submits real forms, so point it at a dev or staging app. Its first walk downloads about 440 MB once.

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

**ESLint for design: the line, the measured value, the fix.**

- Each located finding has a file, a line, a measured value and a fix (46 on the broken fixture).
- It checks contrast against WCAG 2.2, and each located finding cites the rule or UX law behind it.
- No runtime dependency: `npm view ui-ux-suite dependencies` prints nothing.

It reads source, not pixels, and it never edits your code.

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

**One page you can email, attach to a PR, or read on a plane.**

- One HTML file with 0 script tags and all CSS inlined. It opens offline with a double-click.
- Seven offline checks score the page with no model. `--fail-under 8` refuses a weak page.
- `/recap session` turns your git diff and commits into a page your team can read.

The score checks shape, not truth, so read the sources first.

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

**Cut the waste in your AWS bill, each cut priced from AWS at run time.**

- A verdict in dollars, then the three cuts to make first.
- Prices come from AWS at run time. `make test` rejects a priced finding with no lookup record.
- Dry-run by default: a change needs `--apply`, then your typed yes. `--yes` skips that question.

It needs an AWS CLI that can read your account, `jq`, and Cost Explorer turned on.

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

**Give your AI a big job. Get proof back.**

- Every question comes first, so the run has nothing left to ask you.
- The `/goal` line names the test command that must pass.
- `/goalify verify` re-runs your tests into a receipt that can say `NOT VERIFIED`.

A run that stops is not always a finished run, and it can still pause on a permission prompt.

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

**Find what makes your draft sound like AI. Fix it.**

- 55 numbered patterns, and a "Fix first" list that quotes the words costing points.
- The optional CLI's `compare --check-facts` fails a rewrite that lost a number, date, version or URL.
- `scan --fail-above 40` exits 1 on a draft that scores too high, so CI can gate it.

The rewrite runs on your editor's model, in one of five voices you pick.

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

**Stop babysitting your loop.**

- One status line gives one of six verdicts, such as `OK`, `NEEDS YOU` or `STALE`, then what to do next.
- A missing tick shows as `STALE` when the interval is known, after more than two intervals with no new entry.
- A stop rule rides in the line, and every loop expires at 7 days.

The loop lives in your open session, and its log is the only proof of what it did.

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

**Find what a stranger can take from your app. Then close it and prove it closed.**

- Each finding shows its proof: the code line and, with a live URL, the request and its real output.
  `make test` replays the proof behind all 11 sample findings.
- Each finding has a `VERIFY` command whose output must change before a fix counts.
- It writes a report and stops. Nothing in your app changes until you approve a fix.

It is not a penetration test. Without a live URL, most access checks come back `UNPROVEN`.

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Know when your agent instructions point at something gone.**

- The notice gives the file, the line and the dead command.
- One `AGENTS.md` that Codex, Cursor and Copilot read directly, plus short pointers for Claude Code and Gemini CLI.
- A local script with no model and no network call. It stays silent when the repo is fresh.

It resolves commands, targets and files. It does not run the commands or read prose.

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
  <img src=".github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf and Continue, and more through the skills CLI. Three plugins also run as MCP servers." width="100%">
</p>

Every plugin here ships as skills, which are Markdown files your agent reads.
That is why all nine install outside Claude Code through `npx skills add`.
The skills CLI keeps its own [list of supported agents](https://github.com/vercel-labs/skills#supported-agents).

Three plugins also run as a standalone MCP server. MCP is the protocol an editor speaks to reach an outside tool.
sniff and ui-ux-suite run straight from npm. recap-studio runs straight from GitHub: `npx -y github:Aboudjem/recap-studio mcp`.
The other six ship no MCP server.

| Agent | One-line install |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor, Codex, Copilot, Gemini CLI, and [the rest of the list](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
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

CI runs all four on every push and pull request. It also checks every link and scans for secrets.

### The 10x bar

| | |
|---|---|
| **Lean by default** | No dependency a plugin does not need. ui-ux-suite and the six skills ship none. recap-studio's packages pull zod, its web app Next and React. sniff depends on `zod` only and downloads its browser engine and Chromium on first use (about 440 MB). |
| **One-command install** | No config file and no signup. aws-cost-audit is the one that needs access you may not have: an AWS CLI configured to read the account. |
| **Real tests** | CI that asserts behaviour, not that a file exists. |
| **Runs outside Claude Code** | Installs into other agents through `npx skills add`. |
| **Actively maintained** | A release this quarter, not an archive from last year. |
| **No telemetry** | No analytics and no phoning home. Network calls serve the job, for example sniff's browser download and its check of your pages' external links. |

Every plugin listed here is held to this bar. If one stops passing, it gets removed.
The full checklist, the roster and the last verification date are in [QUALITY-BAR.md](QUALITY-BAR.md).

## FAQ

### What is a plugin marketplace?

A plugin marketplace is a list your editor can install from. You add the list once, then install any plugin on it by name.

### Do I have to install all nine?

No. Adding the marketplace installs nothing. Each `claude plugin install <name>@10x` installs one plugin.

### Does it work without Claude Code?

Yes, one plugin at a time. Run `npx skills add Aboudjem/<repo>` with the plugin's repo name from the table.

### Why does `npx skills add Aboudjem/10x` find no skills?

This repo is only the list. The skills live in each plugin's own repo, so point the command at that repo.

### How do I update or remove a plugin?

Run `claude plugin update <name>@10x` to update. Run `claude plugin uninstall <name>@10x` to remove it.

### Does 10x collect any data?

No. 10x has no analytics. Adding the list clones this repo and runs nothing. Its scripts and tests run only when you run them in a clone.

## Limits

- 10x lists plugins. It does not sandbox them. A plugin runs with your permissions.
- The Claude Code commands need the `claude` CLI. Other agents use `npx skills add`, one plugin repo at a time.
- Only three plugins ship an MCP server: sniff, ui-ux-suite and recap-studio.
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
