# The 10x quality bar

Every plugin listed in `.claude-plugin/marketplace.json` must meet this bar.
If a plugin stops passing, it gets removed. No exceptions.

This document is the **explicit checklist** behind the short version in the
README. Maintainers run through it before listing a new plugin, and again
on every quarterly review.

The bar says what a plugin must be. [FLEET-STANDARD.md](FLEET-STANDARD.md) says how each repo is
checked, rule by rule, with `node scripts/fleet-check.mjs --group plugins`. Where the two disagree,
the fleet standard wins and this file gets fixed.

---

## 1. Zero bloat

- [ ] **No runtime dependency the tool does not need** (devDependencies are fine).
      Read this as "nothing pulled in for convenience", not "zero". ui-ux-suite ships zero and the
      six skill plugins declare no runtime dependency (humanizer's `package.json` holds only its test script); contextify also includes standard-library scripts. recap-studio's root package
      declares none, but its workspace packages pull `zod` and its web app pulls Next, React and
      Mermaid. sniff carries **17 runtime dependencies**, among them Playwright and Lighthouse,
      because driving a real browser and measuring a real page is the job. A plugin that cannot
      justify a dependency line by line does not pass this item.
- [ ] Bundle stays small on disk after `npm pack` (excluding test fixtures). 500 KB is the target
      for a dependency-free tool; a plugin that ships a browser engine is judged on its own code.
- [ ] No telemetry, analytics SDK, or third-party network call the user did not ask for.

## 2. One-command install

- [ ] `claude plugin install <name>@10x` succeeds with no follow-up prompts.
      `claude plugin list` may still print an informational note (recap-studio shows a lockfile
      note). A note is allowed; an install that asks a question or fails is not.
- [ ] `npx <name>` works as a standalone CLI when relevant.
- [ ] No required env vars on first run. Every feature with an env var has
      a clearly-marked off-by-default path. A plugin that needs credentials for a
      service it audits (aws-cost-audit needs a configured AWS CLI) must say so on
      its first screen.

## 3. Real tests

- [ ] At least one CI job runs on every PR and on `main`.
- [ ] Tests assert behavior, not "the file exists" or "the export is a function".
- [ ] Test count is published in the README and meaningfully above 0.

## 4. Runs outside Claude Code

- [ ] Works as a Claude Code plugin (`/<command>` and `.claude-plugin/plugin.json`).
- [ ] Installs into other agents with `npx skills add Aboudjem/<repo>`, and ships
      `.cursor-plugin/plugin.json` and `.copilot-plugin/plugin.json` manifests.
- [ ] A tool plugin also runs as a standalone MCP server (`--mcp` flag or an explicit binary).
      This item does not apply to a skill-only plugin.
- [ ] `docs/editors.md` documents every supported path with copy-paste snippets.

## 5. Documentation

- [ ] README starts with **install** before any feature list.
- [ ] README has a clear "What it does" with a real diagram.
- [ ] README has a "How it works" section with a real architecture, not a
      sales pitch.
- [ ] `docs/editors.md` has copy-paste setup for at least 6 editors
      (Claude Code, Cursor, VS Code + Copilot, Codex, Gemini CLI, Windsurf,
      Continue.dev, OpenCode, Zed), and the README links it.
- [ ] README sections in the fleet order: install, how it works, proof, FAQ, limits
      ([FLEET-STANDARD.md](FLEET-STANDARD.md) rules R3 and R4).
- [ ] No emoji in section headers. No em dashes. No marketing fluff.

## 6. Polish

- [ ] Light and dark `.github/assets/logo-*.svg` exist.
- [ ] Logos are **animated** (subtle, respecting `prefers-reduced-motion`
      via the same media query strategy).
- [ ] Badge row: license and CI status, plus npm version and Node version when the plugin ships a package.
      No stars badge and no star count: [FLEET-STANDARD.md](FLEET-STANDARD.md) rule R6 forbids both.
- [ ] Social footer with at least LinkedIn + X + website.

## 7. Maintenance

- [ ] Shipped a release in the last 90 days.
- [ ] No GitHub issue tagged `bug` open longer than 30 days without a
      maintainer comment.
- [ ] CHANGELOG.md current.

## 8. Security and privacy

- [ ] LICENSE file present (MIT or Apache-2.0 preferred).
- [ ] CODE_OF_CONDUCT.md, SECURITY.md, CONTRIBUTING.md all present.
- [ ] No secret, key, or PEM in any tracked file.
- [ ] Side effects (deploy, email, paid API calls) are off by default and
      gated by explicit confirmation.

---

## Verify before listing

Run these before a plugin is added to `marketplace.json`. Every step must succeed.
Use `<repo>` for the plugin's GitHub repo and `<name>` for its plugin name.

**Tool plugins** (ship an npm package, such as sniff and ui-ux-suite):

1. `git clone https://github.com/Aboudjem/<repo> && cd <repo>`
2. `npm install`
3. `npm test`
4. `npx -y <npm-package> --version`
5. `claude plugin validate . --strict`

**Skill plugins** (Markdown and scripts, no npm package):

1. `git clone https://github.com/Aboudjem/<repo> && cd <repo>`
2. Run the test command the README's Proof section names (`make test` or `npm test`).
3. `claude plugin validate . --strict`
4. `npx skills add Aboudjem/<repo>` in an empty folder.

**Both kinds**, after the entry is added on a branch:

1. `claude plugin marketplace add Aboudjem/10x`
2. `claude plugin install <name>@10x`
3. Run one of the plugin's slash commands in a new session.

The plugin's README must also document its slash commands, and its MCP tools if it has any.

---

## Current roster (9)

| # | Plugin | Version | License | Repo |
| - | ------ | ------- | ------- | ---- |
| 1 | `sniff`           | 0.9.0 | Apache-2.0 | [`Aboudjem/sniff`](https://github.com/Aboudjem/sniff) |
| 2 | `ui-ux-suite`     | 0.7.0 | MIT        | [`Aboudjem/ui-ux-suite`](https://github.com/Aboudjem/ui-ux-suite) |
| 3 | `recap-studio`    | 0.6.1 | MIT        | [`Aboudjem/recap-studio`](https://github.com/Aboudjem/recap-studio) |
| 4 | `aws-cost-audit`  | 0.4.1 | MIT        | [`Aboudjem/aws-cost-audit-skill`](https://github.com/Aboudjem/aws-cost-audit-skill) |
| 5 | `goalify`         | 3.1.1 | MIT        | [`Aboudjem/goalify`](https://github.com/Aboudjem/goalify) |
| 6 | `humanizer`       | 0.8.0 | MIT        | [`Aboudjem/humanizer-skill`](https://github.com/Aboudjem/humanizer-skill) |
| 7 | `loopify`         | 1.2.1 | MIT        | [`Aboudjem/loopify`](https://github.com/Aboudjem/loopify) |
| 8 | `secure-my-app`   | 0.3.0 | MIT        | [`Aboudjem/secure-my-app`](https://github.com/Aboudjem/secure-my-app) |
| 9 | `contextify`      | 0.3.1 | MIT        | [`Aboudjem/contextify`](https://github.com/Aboudjem/contextify) |

`aws-cost-audit` is a Claude Code **skill** plugin (no MCP server): it meets the bar's zero-bloat,
one-command-install, real-verification (built test-first; read-only by default, prices verified live against AWS
pricing), no-telemetry, and local-only items; the dual-mode/MCP item does not apply to a skill plugin.

`goalify` is also a Claude Code **skill** plugin (no MCP server, no standalone CLI): it meets the bar's
zero-bloat (a single `SKILL.md`, no runtime deps), one-command-install (`claude plugin install
goalify@10x`), real-verification (built test-first, with manifest and skill-lint tests in CI), no-telemetry, and local-only items; the
dual-mode/MCP and standalone-CLI items do not apply to a skill plugin.

`humanizer` is also a Claude Code **skill** plugin (no MCP server, no standalone CLI): it meets the
bar's zero-bloat (pure Markdown, zero dependencies, no network calls), one-command-install
(`claude plugin install humanizer@10x`), real-verification (detects 55 AI writing patterns with a
0-100 AI-tell score, 5 voice profiles, and 3 modes: detect, rewrite, edit), no-telemetry, and
local-only items; the dual-mode/MCP and standalone-CLI items do not apply to a skill plugin.

`loopify` is also a Claude Code **skill** plugin (no MCP server, no standalone CLI): it meets the bar's
zero-bloat (a single `SKILL.md` plus docs, no runtime deps), one-command-install (`claude plugin
install loopify@10x`), real-verification (`make test` prints `170/170` manifest checks and `161/161`
skill checks), no-telemetry,
and local-only items; the MCP-server and standalone-CLI items do not apply to a skill plugin.

`secure-my-app` is also a Claude Code **skill** plugin (no MCP server, no standalone CLI): it meets the
bar's zero-bloat (pure Markdown, no runtime dependency, no network call of its own), one-command-install
(`claude plugin install secure-my-app@10x`), no-telemetry, and local-only items; the MCP-server and
standalone-CLI items do not apply to a skill plugin. Its real-verification item: `make test` prints `79/79`
skill checks, `138/138` manifest checks and `33/33` fixture checks.

`contextify` is a skill plugin with local shell/Python scripts and no package dependencies or MCP server. Its drift check runs without a model; generation uses the host coding agent. See its [0.2 feature evaluation](https://github.com/Aboudjem/contextify/blob/main/evals/supporting-docs.md) for measured behavior and validation limits.

## How item 1 is read

"Zero bloat" is a judgement about necessity, not a count. Seven of the nine ship no runtime
dependency: ui-ux-suite and the six Markdown and script skills. recap-studio's root declares none while its
workspace packages pull `zod`, Next, React and Mermaid, because it renders pages. sniff ships 17,
including Playwright and Lighthouse, because walking a real app in a real browser cannot be done
without a browser. The question this item asks is whether every dependency earns its line, and a
maintainer answers it in the review, not with a number.

## Verification runs, 2026-11-17

Each figure comes from the Proof section of the plugin's README at the released commit.
Run the command in a clone of that repo to re-print it.

| Plugin | Command | Output |
| --- | --- | --- |
| sniff | `npm test` | `Tests  534 passed (534)`, 50 test files |
| ui-ux-suite | `npm test` | 397 tests pass, 0 fail |
| recap-studio | `npm run test:count` | 109 tests |
| aws-cost-audit | `make test` | `Results: 106 passed, 0 failed` |
| goalify | `make test` | `10/10 suites passed`, `448/448 checks passed` |
| humanizer | `npm test` | `# pass 77`, `# fail 0` |
| loopify | `make test` | `161/161`, `170/170`, `13/13`, `62/62`, `18/18` |
| secure-my-app | `make test` | `79/79`, `138/138`, `33/33` |
| contextify | `make test` | `128/128`, `30/30`, `131/131`, `114/114`, three unittest suites OK |

Last verified: 2026-11-17.


## Contextify 0.1 verification, 2026-09-17 (historical)

These checks ran in the Contextify repository during the Codex continuation. They are kept as history. The current figures for every plugin are in the 2026-11-17 table above.

| Command | Historical 0.1 output |
| --- | --- |
| `python3 tests/test_ctx_check.py` | `119/119 checks passed` |
| `python3 tests/test_verify_claims.py` | `30/30 checks passed` |
| `python3 tests/test_regressions.py` | 23 tests passed |
| `python3 tests/test_hooks.py` | 6 tests passed |
| `python3 tests/test_manifests.py` | `135/135 checks passed` |
| `python3 evals/check_skill.py skills/contextify/SKILL.md` | `110/110` |

Claude model validation remains unperformed because the weekly Claude limit was reached. Deterministic Claude CLI manifest validation is a separate check; it does not consume a model run or establish model quality. The [evaluation record](https://github.com/Aboudjem/contextify/blob/main/evals/dogfood.md) documents the independent Codex review and dogfood limits.

## Contextify 0.2 verification, 2026-09-17 (historical)

The Contextify extension was checked locally after implementation. These results cover the current feature tests, not fresh validation of any other listed plugin.

| Command | 0.2 local output |
| --- | --- |
| `python3 tests/test_ctx_check.py` | `119/119 checks passed` |
| `python3 tests/test_verify_claims.py` | `30/30 checks passed` |
| `python3 tests/test_regressions.py` | 23 tests passed |
| `python3 tests/test_hooks.py` | 20 tests passed |
| `python3 tests/test_supporting_docs.py` | 16 tests passed |
| `python3 tests/test_manifests.py` | `130/130 checks passed` |
| `python3 evals/check_skill.py skills/contextify/SKILL.md` | `114/114` |

The [0.2 evaluation record](https://github.com/Aboudjem/contextify/blob/main/evals/supporting-docs.md) records local validation, generated context and remaining limits. Independent Codex review covered the implementation. Claude model validation remains unavailable; CLI validation is separate. Git hooks are advisory by default, inspect the current working tree and never rewrite context. Supporting documents carry the same evidence and preservation requirements as agent instructions.
