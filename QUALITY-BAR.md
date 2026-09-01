# The 10x quality bar

Every plugin listed in `.claude-plugin/marketplace.json` must meet this bar.
If a plugin stops passing, it gets removed. No exceptions.

This document is the **explicit checklist** behind the short version in the
README. Maintainers run through it before listing a new plugin, and again
on every quarterly review.

---

## 1. Zero bloat

- [ ] Vanilla Node.js, **no runtime dependencies** (devDependencies are fine).
- [ ] Bundle ≤ 500 KB on disk after `npm pack` (excluding test fixtures).
- [ ] No telemetry, analytics SDK, or third-party network call at runtime.

## 2. One-command install

- [ ] `claude plugin install <name>@10x` succeeds with no follow-up prompts.
- [ ] `npx <name>` works as a standalone CLI when relevant.
- [ ] No required env vars on first run. Every feature with an env var has
      a clearly-marked off-by-default path.

## 3. Real tests

- [ ] At least one CI job runs on every PR and on `main`.
- [ ] Tests assert behavior, not "the file exists" or "the export is a function".
- [ ] Test count is published in the README and meaningfully above 0.

## 4. Dual mode

- [ ] Works as a Claude Code plugin (`/<command>` and `.claude-plugin/plugin.json`).
- [ ] Works as a standalone MCP server (`--mcp` flag or an explicit binary).
- [ ] README documents both modes with copy-paste snippets.

## 5. Documentation

- [ ] README starts with **install** before any feature list.
- [ ] README has a clear "What it does" with a real diagram.
- [ ] README has a "How it works" section with a real architecture, not a
      sales pitch.
- [ ] README has copy-paste editor setup for at least 6 editors
      (Claude Code, Cursor, VS Code + Copilot, Codex, Gemini, Windsurf,
      Continue.dev, OpenClaw).
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
| 1 | `sniff`           | 0.7.0 | Apache-2.0 | [`Aboudjem/sniff`](https://github.com/Aboudjem/sniff) |
| 2 | `ui-ux-suite`     | 0.5.0 | MIT        | [`Aboudjem/ui-ux-suite`](https://github.com/Aboudjem/ui-ux-suite) |
| 3 | `recap-studio`    | 0.4.0 | MIT        | [`Aboudjem/recap-studio`](https://github.com/Aboudjem/recap-studio) |
| 4 | `aws-cost-audit`  | 0.2.0 | MIT        | [`Aboudjem/aws-cost-audit-skill`](https://github.com/Aboudjem/aws-cost-audit-skill) |
| 5 | `goalify`         | 2.5.0 | MIT        | [`Aboudjem/goalify`](https://github.com/Aboudjem/goalify) |
| 6 | `humanizer`       | 0.6.2 | MIT        | [`Aboudjem/humanizer-skill`](https://github.com/Aboudjem/humanizer-skill) |
| 7 | `loopify`         | 1.0.0 | MIT        | [`Aboudjem/loopify`](https://github.com/Aboudjem/loopify) |

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
install loopify@10x`), real-verification (built test-first, with manifest tests and a 136-assertion
skill eval in CI plus a recorded RED 1/7 -> GREEN 7/7 behavioral baseline on Sonnet), no-telemetry,
and local-only items; the dual-mode/MCP and standalone-CLI items do not apply to a skill plugin.

Last verified: 2026-09-01.
