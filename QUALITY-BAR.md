# The 10x quality bar

Every plugin listed in `.claude-plugin/marketplace.json` must meet this bar.
If a plugin stops passing, it gets removed. No exceptions.

This document is the **explicit checklist** behind the short version in the
README. Maintainers run through it before listing a new plugin, and again
on every quarterly review.

---

## 1. Zero bloat

- [ ] **No runtime dependency the tool does not need** (devDependencies are fine).
      Read this as "nothing pulled in for convenience", not "zero". ui-ux-suite ships zero and the
      four skill plugins are pure Markdown with no `package.json` at all. recap-studio's root package
      declares none, but its workspace packages pull `zod` and its web app pulls Next, React and
      Mermaid. sniff carries **16 runtime dependencies**, among them Playwright and Lighthouse,
      because driving a real browser and measuring a real page is the job. A plugin that cannot
      justify a dependency line by line does not pass this item.
- [ ] Bundle stays small on disk after `npm pack` (excluding test fixtures). 500 KB is the target
      for a dependency-free tool; a plugin that ships a browser engine is judged on its own code.
- [ ] No telemetry, analytics SDK, or third-party network call the user did not ask for.

## 2. One-command install

- [ ] `claude plugin install <name>@10x` succeeds with no follow-up prompts.
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
- [ ] No emoji in section headers. No em dashes. No marketing fluff.

## 6. Polish

- [ ] Light and dark `.github/assets/logo-*.svg` exist.
- [ ] Logos are **animated** (subtle, respecting `prefers-reduced-motion`
      via the same media query strategy).
- [ ] Badge row: license, CI status, npm version, Node version, stars.
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

A new plugin must produce the following report locally before it is added
to `marketplace.json`:

```bash
# In the plugin repo
npm ci
npm test
npm run lint
npx <name> --version

# In a clean Claude Code session
claude plugin install <github-owner>/<repo>
/<command>           # smoke test
```

Each of those commands must succeed, **and** the plugin's README must
document its slash commands and MCP tools.

---

## Current roster (7)

| # | Plugin | Version | License | Repo |
| - | ------ | ------- | ------- | ---- |
| 1 | `sniff`           | 0.8.0 | Apache-2.0 | [`Aboudjem/sniff`](https://github.com/Aboudjem/sniff) |
| 2 | `ui-ux-suite`     | 0.6.0 | MIT        | [`Aboudjem/ui-ux-suite`](https://github.com/Aboudjem/ui-ux-suite) |
| 3 | `recap-studio`    | 0.5.0 | MIT        | [`Aboudjem/recap-studio`](https://github.com/Aboudjem/recap-studio) |
| 4 | `aws-cost-audit`  | 0.3.0 | MIT        | [`Aboudjem/aws-cost-audit-skill`](https://github.com/Aboudjem/aws-cost-audit-skill) |
| 5 | `goalify`         | 2.6.0 | MIT        | [`Aboudjem/goalify`](https://github.com/Aboudjem/goalify) |
| 6 | `humanizer`       | 0.7.0 | MIT        | [`Aboudjem/humanizer-skill`](https://github.com/Aboudjem/humanizer-skill) |
| 7 | `loopify`         | 1.1.0 | MIT        | [`Aboudjem/loopify`](https://github.com/Aboudjem/loopify) |

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
install loopify@10x`), real-verification (`python3 tests/test_manifests.py` prints `158/158 checks
passed` and `python3 evals/check_skill.py skills/loopify/SKILL.md` prints `153/153`), no-telemetry,
and local-only items; the MCP-server and standalone-CLI items do not apply to a skill plugin.

## How item 1 is read

"Zero bloat" is a judgement about necessity, not a count. Five of the seven ship no runtime
dependency: ui-ux-suite and the four Markdown skills. recap-studio's root declares none while its
workspace packages pull `zod`, Next, React and Mermaid, because it renders pages. sniff ships 16,
including Playwright and Lighthouse, because walking a real app in a real browser cannot be done
without a browser. The question this item asks is whether every dependency earns its line, and a
maintainer answers it in the review, not with a number.

## Verification runs, 2026-09-02

Each command was run in the plugin's own repo on the released commit.

| Plugin | Command | Output |
| --- | --- | --- |
| sniff | `npx vitest run` | `Tests 507 passed (507)`, 48 test files |
| ui-ux-suite | `npm test` | 356 tests |
| recap-studio | `npm test` | 73 tests across six workspace projects |
| aws-cost-audit | `bash tests/smoke.sh` | `Results: 62 passed, 0 failed` |
| goalify | `python3 tests/test_manifests.py` | `126/126 checks passed` (plus `83/83` skill eval, `18/18` condition lint) |
| humanizer | metrics CLI suite | 64 tests |
| loopify | `python3 tests/test_manifests.py` | `158/158 checks passed` (plus `153/153` skill eval, `13/13` ticks lint) |

Last verified: 2026-09-02.
