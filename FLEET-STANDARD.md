# Fleet standard

One bar for every public repo of [Aboudjem](https://github.com/Aboudjem). A repo passes when a script says so.

```bash
npm run fleet:all
```

```text
PASS goalify [plugin-skill, KEEP-UPGRADE] 32/32 checks
FAIL sniff [plugin-mcp, KEEP-UPGRADE] 33/35 checks
  FAIL sniff I3 MCP config snippet and server.json: server.json has no packages and no remotes
  FAIL sniff D8 Registry listing: the MCP registry has io.github.Aboudjem/sniff@0.7.1, server.json says 0.8.1
FLEET all: 1/2 FAIL
```

The block above shows the output shape. It is not a recorded run.

## What does this standard decide?

It decides when a repo is prod-ready, trusted, easy to understand and easy to find.

- Every rule has a check id, such as `R2`.
- [`scripts/fleet-check.mjs`](scripts/fleet-check.mjs) implements every id.
- [`FLEET-TRIAGE.md`](FLEET-TRIAGE.md) says which repos are kept and what kind each one is.
- A rule that no script can test is listed under "What a person still reviews".

## How do I run it?

| Step | Command                 | What it checks                                                                            |
| ---- | ----------------------- | ----------------------------------------------------------------------------------------- |
| 1    | `npm run fleet:triage`  | Run 1: every repo has a verdict, dead repos are archived, this file and the checker agree |
| 2    | `npm run fleet:plugins` | Run 2: `10x` and the nine plugins                                                         |
| 3    | `npm run fleet:rest`    | Run 3: every other kept repo                                                              |
| 4    | `npm run fleet:all`     | Runs 2 and 3 together                                                                     |

One repo at a time:

```bash
node scripts/fleet-check.mjs --group all --repo goalify
```

The last line is `FLEET <group>: <passed>/<total> PASS` or `FAIL`. The exit code is 0 only on `PASS`.

- A filter shows in the last line, such as `FLEET all (only goalify, no-exec): 1/1 PASS`. The bare form means the full group ran.
- When no repo matches, the last line is `FLEET <group>: 0/0 FAIL` and the exit code is 1.
- An unknown group, an unknown flag or a flag without its value exits 2 with a usage line.

Clones live in `/Users/adamboudj/projects/_fleet/<repo>`. Use `--root <dir>` for another folder.
`--no-exec` skips the commands that run repo code. A check that was skipped counts as failed.

The runner can fail a repo or a group with three ids of its own. They are not rules of this standard.

- `TABLE`: the per-repo groups trust the triage table, so they run M1, M2 and M5 first. If one fails, the group cannot end in `PASS`.
- `ROW`: the row has an unknown verdict or kind, or no check applies to it.
- `CLONE`: the clone is missing, has uncommitted or untracked files, or is not at the head of the default branch on GitHub.

## Which checks apply to my repo?

Three columns of the triage table decide it: the kind, the verdict and the traits.

**Kinds.** `marketplace`, `plugin-skill`, `plugin-mcp`, `cli`, `macos-app`, `homebrew-tap`, `guide`,
`solidity-reference`, `solidity-sample`, `profile`, `school-exercise`, `other`.

**Verdicts.**

| Verdict        | Meaning                                   | Checks                              |
| -------------- | ----------------------------------------- | ----------------------------------- |
| `KEEP-UPGRADE` | A tool on the site, or one that should be | The full list for its kind          |
| `KEEP-TIDY`    | Worth showing, needs a clean front door   | The short list                      |
| `ARCHIVE`      | Dead, superseded, or a course exercise    | None. It must be archived on GitHub |

**Traits.** A trait adds the checks for one install path or one promise. Traits add checks only on `KEEP-UPGRADE`.

| Trait           | The repo has                                              | Adds       |
| --------------- | --------------------------------------------------------- | ---------- |
| `site`          | A page on the owner's site                                | D4         |
| `claude-plugin` | `.claude-plugin/plugin.json`                              | I1, I4     |
| `skills`        | A `SKILL.md`                                              | I2, I4, D8 |
| `mcp`           | An MCP server: `server.json`, `.mcp.json` or `mcpServers` | I3, I4, D8 |
| `npm`           | A package published from this repo                        | I5, D7     |
| `report`        | A tool that prints a report, a score or a receipt         | O1         |

**The matrix.** "Full" means `KEEP-UPGRADE`. "Short" means `KEEP-TIDY`.

| Kind                                               | Short list                            | Full list adds                                   |
| -------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| `marketplace`, `plugin-skill`, `plugin-mcp`, `cli` | R1 R2 R5 R6 R7 T1 T9 T11 T13 D1 D2 X1 | R3 R4 T2 T3 T4 T5 T6 T7 T8 T10 T12 D3 D5 D6      |
| `macos-app`                                        | same                                  | R3 R4 T2 T3 T4 T5 T6 T8 T10 T12 D3 D5 D6 K2      |
| `solidity-reference`                               | same                                  | R3 R4 T2 T3 T4 T5 T6 T7 T8 T10 T12 D3 D5 D6 K3   |
| `guide`                                            | same                                  | R3 R4 T2 T3 T4 T6 T10 T12 D3 D5 D6 K4            |
| `homebrew-tap`                                     | same, plus K1                         | nothing: a tap is always `KEEP-TIDY`             |
| `profile`                                          | R1 R5 R6 R7 T9 T11 T13 X1             | nothing: the profile is always `KEEP-TIDY`       |
| `solidity-sample`, `school-exercise`, `other`      | same as the first row                 | nothing: upgrade means picking a real kind first |

## README

The answer comes first. A reader decides in one screen.

| Id  | Rule                                                                        | How it is tested                                                                                                                                                                                                                                                                                                                                                 |
| --- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | The repo has a `README.md` with at least 120 words                          | Words outside code and HTML comments: at least 120, with at least 60 distinct words                                                                                                                                                                                                                                                                              |
| R2  | The first screen says what it is, gives one command, and shows what you get | Before the second `##` heading and within 80 lines: a title, one sentence of 4 to 25 words, and a command in a code block. A title is a level-1 heading, or a hero image whose alt text starts with the tool name. The command has a second word that is not a comment. A full-list repo also needs a picture that exists, or an output block of 2 lines or more |
| R3  | Sections follow one order                                                   | Tools: install, how it works, proof, FAQ, limits. `solidity-reference`: build, how it works, proof, FAQ, limits. `guide`: start here, FAQ, limits. Headings match whole words. Each matched section holds 10 words or more                                                                                                                                       |
| R4  | The FAQ asks real questions                                                 | A FAQ section with at least 3 questions. A question is a heading, a bold line or a summary that ends with `?` and has 3 words or more. Its answer holds 5 words or more                                                                                                                                                                                          |
| R5  | No sentence is longer than 25 words                                         | Prose, table cells and headings, one sentence at a time. A link counts as its text. A code span with more than 3 spaces counts as its words. A word over 30 characters is split at each slash and hyphen. A hard break ends a sentence                                                                                                                           |
| R6  | House style holds                                                           | No em dash in any form. No emoji, flag, keycap or `:shortcode:` in a heading. No hype word. No star count, and no image whose URL names stars                                                                                                                                                                                                                    |
| R7  | Every link answers                                                          | Links, bare URLs and autolinks. Web links must return 200. An npmjs.com package link must exist on npm. Relative links must point to a file inside the repo                                                                                                                                                                                                      |

Why the stars badge fails: a star count is a number the repo cannot re-run. The owner's rule is no star counts.

The em dash counts in every form a reader sees as one. That covers the character, its HTML entities and its JSON escape. It also covers the horizontal bar, the two-em dash and an en dash with a space on both sides.

The hype words are listed in the checker as `HYPE`. They claim speed, magic or rank without a number to back it.

Some hosts refuse scripts. A refusal (401, 403, 429, 999) from LinkedIn, X, npmjs.com, Medium, Etherscan, Telegram, Udemy or Coveralls is not a dead link.
A link to a template or a placeholder host (localhost, `example.com`, a host with `your-`) is not fetched.

## Trust

A stranger must be able to check the repo before running it.

| Id  | Rule                                  | How it is tested                                                                                                                                                                                                                                            |
| --- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1  | A LICENSE file that GitHub recognises | File at the root with 200 characters or more, and the GitHub API returns an SPDX id                                                                                                                                                                         |
| T2  | A security policy                     | `SECURITY.md` at the root, in `.github` or in `docs`, with 30 words or more                                                                                                                                                                                 |
| T3  | A contributing guide                  | `CONTRIBUTING.md` in the same places, with 30 words or more                                                                                                                                                                                                 |
| T4  | A changelog that is current           | The newest level-2 or level-3 version heading of `CHANGELOG.md` has a real date, not in the future, and a body. Its version equals the latest release. A tool or `solidity-reference` without a release fails. A `guide` without one passes                 |
| T5  | A tagged release with real notes      | Latest GitHub release with notes of 80 characters and 12 distinct words or more. Its tag equals the version in every manifest. With no manifest version, it equals the newest CHANGELOG entry                                                               |
| T6  | CI is green on the default branch     | Every file in `.github/workflows` is read. For each one, the newest completed run that was not skipped is `success`. A file that runs on push (not on tags only), pull request or schedule must have such a run                                             |
| T7  | The declared test command exits 0     | `package.json` `scripts.test`, else a Makefile `test` target with a recipe, else `forge test`. A script that runs nothing fails, such as `exit 0`, `true`, a bare `echo`, or one that swallows a failure. The output must show that at least one test ran   |
| T8  | Tests assert behavior                 | Test files with a code extension hold at least 10 distinct assertion lines. A named `check("label", ok)` call counts. Comments and `assert(true)` do not count                                                                                                                                        |
| T9  | No secret in the tree                 | Every file git tracks, or every file on disk when git cannot say. The first 1 MB of each file is read. Key patterns, hex keys, mnemonics, and tracked `.env`, `.env.*` and `.envrc` files fail                                                              |
| T10 | Versions are pinned                   | Every action in `.github/workflows` and `.github/actions` sits on a version tag or a commit sha. Images have a fixed tag. No `npx` on `@latest`. Every dependency is a version range. A tracked lockfile over 2 bytes when there are dependencies           |
| T11 | Standards carry their true status     | The README, `llms.txt`, `AGENTS.md` and the GitHub description are read. ERC-6960, ERC-7410 and ERC-8203 say Draft at first mention: the word with a capital, or the noun "a draft". ERC-8203 also names `#1614` or `pull/1614`. ERC-3643 is never called a draft, experimental or pending |
| T12 | No em dash in any doc                 | Every `.md`, `.mdx`, `.markdown`, `.txt`, `.rst`, `.html`, `.svg`, `.yml` and `.yaml` file, and every manifest. The forms are the same as in R6                                                                                                             |
| T13 | No AI attribution                     | The head commit author is the owner or a GitHub bot. No trailer and no "Generated with" line names an AI tool                                                                                                                                               |

Manifests read by T5 and T12: `package.json`, `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`,
`.copilot-plugin/plugin.json`, `.codex-plugin/plugin.json`, `gemini-extension.json`, `server.json`. T12 also reads `marketplace.json`.

A line that must hold a fake key carries the comment `fleet-check:allow`. The comment counts only in a test, example, sample or fixture file.

T9 skips a placeholder key: one with 4 distinct characters or fewer, one short unit repeated, or a word such as `example` or `your`.

The first mention for T11 skips the level-1 heading. When the title is the only mention, Draft must appear in the first screen.

## Install

One command per agent, and each one must work.

| Id  | Rule                                              | How it is tested                                                                                                                                                                                                                                                                                                                                 |
| --- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| I1  | The Claude Code path works                        | README shows `claude plugin install <name>@10x` in a code block. `plugin.json` has a version, and the 10x marketplace pins the same one. `claude plugin validate . --strict` exits 0                                                                                                                                                             |
| I2  | The skills path works                             | README shows `npx skills add Aboudjem/<repo>` with nothing appended. Each `SKILL.md`, at any depth, has a `name` and a `description` of 20 characters or more. The name is lowercase with hyphens and equals its folder. The pinned skills CLI finds at least one skill                                                                          |
| I3  | The MCP path works                                | README has a config block: `"mcpServers"` with a `command` or a `url`, or `claude mcp add`. `server.json` sits in the `io.github.Aboudjem/` namespace and matches the package version. It lists `packages` or `remotes`. Each package names an identifier, and an npm package matches `package.json`. Its description has 100 characters at most |
| I4  | The "works with" table lists only what was tested | A table with an agent column and a "Tested" column. Every row carries a real date from the last 365 days, such as 2026-11-17. "Planned" and "not tested" fail                                                                                                                                                                                    |
| I5  | The npm package matches the repo                  | npm has the same version as `package.json`. npm says it is published from this repo. `license` is set, and `files` is a list that is not empty                                                                                                                                                                                                   |

The skills CLI version is pinned in the checker (`SKILLS_CLI`). Bump it on purpose.

## Discoverability

People and answer engines find a repo through its metadata and its plain text.

| Id  | Rule                                                          | How it is tested                                                                                                                 |
| --- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| D1  | The description states the outcome in 120 characters or fewer | Not empty, and 5 words or more. It does not start with an article or the repo name. No emoji, no em dash, no hype word           |
| D2  | Topics are set                                                | 8 to 15 topics on the full list, 5 to 15 on the short list. Each topic has 3 characters or more                                  |
| D3  | A social preview image is set                                 | GitHub reports a custom image                                                                                                    |
| D4  | The homepage is the tool page                                 | It is `https://adam-boudjemaa.com/tools/<repo>`, with a trailing `-skill` or `-plugin` allowed to drop. It returns 200           |
| D5  | `llms.txt` follows the format                                 | A `# Title` first, a `> summary` line, links to at least 3 distinct real targets, and every link answers                         |
| D6  | `AGENTS.md` tells an agent how to work here                   | At least 60 words, at least 40 distinct words, and at least one command                                                          |
| D7  | The package has keywords                                      | At least 5 distinct keywords in `package.json` that are not empty                                                                |
| D8  | The registries list it                                        | An MCP server is in the official registry at the version of `server.json`, with `packages`. A skill repo has a page on skills.sh |

Question-shaped headings and a FAQ are tested by R4. They help readers. No primary source shows they raise citation.

## Output quality

A report is read by a tired person. The verdict comes first.

| Id  | Rule                                            | How it is tested                                                                                                                                                                                 |
| --- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| O1  | The README shows a sample report, verdict first | A "Sample report" or "What you get" section with a text block that is not a shell block. A verdict word sits in its first 3 lines. At least 3 action lines of 3 words or more follow the verdict |

The report order is fixed: the verdict, then the three things to do, then the detail.

## Rules for one kind

| Id  | Kind                 | Rule                                            | How it is tested                                                                                                                                                                                                                                                                                |
| --- | -------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K1  | `homebrew-tap`       | The cask matches the app's latest release       | Version equals the release tag. The url is a release asset under `https://github.com/Aboudjem/`. The asset exists and has a digest, and the `sha256` equals it                                                                                                                                  |
| K2  | `macos-app`          | A reader can install it and knows what they run | The latest release has a `.dmg`, `.zip` or `.pkg`. README has a `brew install` line in a code block. It states the signing status and the macOS version needed, such as macOS 14                                                                                                                |
| K3  | `solidity-reference` | A reader knows the code's status                | README says "not audited" or "audited by". Every contract outside tests, scripts, mocks and the root `lib` has an SPDX line and a `pragma solidity` outside a comment                                                                                                                           |
| K4  | `guide`              | A reader has a path to follow                   | README links at least 5 chapters, and root policy files do not count. A "Last reviewed: 2026-11-17" style line gives a date from the last 365 days                                                                                                                                              |
| X1  | every kind           | The triage table tells the truth about the repo | A plugin manifest, a `SKILL.md`, an MCP server or a package published from this repo appears as a trait. A plugin manifest or `server.json` needs a tool kind. Any of these needs `KEEP-UPGRADE`. A homepage on the site needs `site`. `profile` and `homebrew-tap` need the matching repo name |

## Run 1: the triage

| Id  | Rule                                                            | How it is tested                                                                                                                                                               |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| M1  | Every public non-fork repo has a verdict, a reason and evidence | The live repo list against the triage table. A reason has 5 distinct words or more. Evidence holds a date or a number                                                          |
| M2  | Every `ARCHIVE` repo is archived on GitHub, and no kept repo is | The live `archived` flag                                                                                                                                                       |
| M3  | This file and the checker name the same ids                     | Ids in the tables here against the ids in the code. Every kind is named here                                                                                                   |
| M4  | The benchmark and the house practices exist                     | `.goal/fleet/benchmark.md` covers the seven kinds, cites 30 sources or more, and records the skeptic pass                                                                      |
| M5  | The table obeys the rules of kinds and traits                   | No site tool is archived. A site tool is `KEEP-UPGRADE`. A `KEEP-UPGRADE` repo has a kind with a full list                                                                     |
| M6  | Private repos are listed locally, by name and purpose only      | `.goal/fleet/private-repos.md` holds one table that lists each one. A purpose has 200 characters at most and no `@`. No private name appears in `FLEET-TRIAGE.md` or this file |

## What a person still reviews

A script cannot judge these. A reviewer signs them off in the pull request.

- The first sentence is true and a smart 18-year-old understands it.
- Every number in the README names the command that prints it.
- The tests fail when the feature breaks.
- A privacy section states every network call the tool makes.
- A sample report comes from a real run, or says plainly that it is invented.
- The "works with" dates match a run that someone can show.
- Text that meets a rule in letter only, such as filler words in the README, the FAQ, `AGENTS.md` or a sample report.

## Where do these rules come from?

| Source                                                                         | What it gave                                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [`QUALITY-BAR.md`](QUALITY-BAR.md)                                             | The bar for the nine plugins: install first, real tests, runs outside Claude Code |
| House practices of `goalify`, `contextify`, `secure-my-app`, `sniff` and `10x` | Proof-first README, version parity, receipts, the no em dash rule                 |
| The fleet benchmark of 2026-11-17                                              | 35 comparable repos read file by file, and the install rails re-checked live      |

Primary sources for the rules that depend on an outside tool:

- Skills CLI and its `SKILL.md` rules: <https://github.com/vercel-labs/skills> and <https://agentskills.io/specification>
- Claude Code plugins: <https://code.claude.com/docs/en/plugins/cli-reference>
- MCP registry and `server.json`: <https://github.com/modelcontextprotocol/registry/blob/main/docs/modelcontextprotocol-io/quickstart.mdx>
- llms.txt: <https://llmstxt.org>
- AGENTS.md: <https://agents.md>
- Topics and social preview: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics>
- ERC status words: <https://eips.ethereum.org/EIPS/eip-1>
- Homebrew casks: <https://docs.brew.sh/Cask-Cookbook>

## Limits

- The checker reads a clean clone at the head of the default branch. A dirty or stale clone fails with `CLONE`. Pull before you run it.
- T8 counts assertions. It cannot tell a strong test from a weak one.
- Filler text can meet R1, R4, D6 or O1 in letter. A person reviews it.
- T11 reads one sentence at a time. A false status moved to the sentence after the name passes.
- T10 accepts a version tag such as `@v4` for any action. It does not require a commit sha for a third-party action.
- T6 does not require a run for a workflow that runs only by hand or only on tags.
- T9 knows common key shapes only. A key that is encoded, split in two or in an unknown format passes.
- M4 counts sources and headings. It does not judge their quality.
- The `report` trait is declared by hand. No check finds a report tool without it.
- K1 accepts release assets only. A Formula that builds from a tagged source tarball fails.
- R5 splits sentences on `.`, `!`, `?` and on a colon before a capital letter. Odd punctuation can hide a long sentence.
- R5 fails a sentence that is long only because it lists versions. Write the list as bullets.
- D4 fails until the site serves one page per tool. On 2026-11-17 those pages returned 404.
- D8 needs skills.sh to have seen one install of the repo. A new repo fails until then.
- T13 reads the head commit only. Older commits are not rewritten: the owner's rule forbids it.
