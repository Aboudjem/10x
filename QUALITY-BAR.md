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

## Current roster (3)

| # | Plugin | Version | License | Repo |
| - | ------ | ------- | ------- | ---- |
| 1 | `sniff`         | 0.5.2 | Apache-2.0 | [`Aboudjem/sniff`](https://github.com/Aboudjem/sniff) |
| 2 | `ui-ux-suite`   | 0.3.0 | MIT        | [`Aboudjem/ui-ux-suite`](https://github.com/Aboudjem/ui-ux-suite) |
| 3 | `recap-studio`  | 0.2.0 | MIT        | [`Aboudjem/recap-studio`](https://github.com/Aboudjem/recap-studio) |

Last verified: 2026-05-13.
