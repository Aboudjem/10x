# Launch plan, June 2026

> Written for the four-plugin launch. The marketplace has seven plugins as of 2026-09-01 (see the README); the counts below are historical.

Supernova Standard, Pillar 1 applied to a Claude Code plugin marketplace.

Stars come from velocity on a channel whose audience you don't own. A marketplace's job is borrowed reach, not cold self-promotion.

---

## Why 10x is post-worthy

One sentence: "One command installs four independently tested, zero-telemetry AI developer tools into Claude Code, or any MCP editor."

The demoable hook: the demo GIF already shows the install flow. The per-plugin diagrams (sniff, ui-ux, recap-studio, aws-cost-audit) are visual and graspable.

---

## Phase 1: Ecosystem registries (immediate, passive, compounding)

### 1a. hesreallyhim/awesome-claude-code

Submit via the web-UI issue form only: https://github.com/hesreallyhim/awesome-claude-code/issues/new

Do NOT open a PR or use `gh issue create` (both are auto-closed). Fill the form manually.

Suggested entry:
```
**10x**: curated Claude Code plugin marketplace; one command installs sniff (AI QA), ui-ux-suite (design audit), recap-studio (explainer generator), and aws-cost-audit (read-only AWS cost audit).
https://github.com/Aboudjem/10x
```

### 1b. claudemarketplaces.com

The site auto-indexes public repos with `claude-code-marketplace` topic. The topic is already set after this PR lands. No manual submission needed.

### 1c. MCP Registry (for the dual-mode tool plugins individually)

Each tool plugin (`sniff`, `ui-ux-suite`, `recap-studio`) ships as a standalone npm package and MCP server. Register each on the official MCP registry: `mcp-publisher init -> login github -> publish` after confirming the package is on npm.

---

## Phase 2: Borrowed reach (week 1-2 of June)

### 2a. r/ClaudeAI

Post format: problem-first, not "I made a thing". Suggested title: "I was tired of manually checking accessibility and AWS waste after every sprint, so I wired four auditing tools into one Claude Code install command."

Body: screenshot of `/sniff` finding a real bug in a real project, screenshot of `/design-audit` output, one-liner install. Link to repo at the end.

### 2b. X/Twitter thread

Lead with the demo GIF. Thread structure:
1. Hook: "One command. Four AI tools. Zero API keys."
2. Show sniff finding a real bug (GIF or screenshot).
3. Show ui-ux-suite scoring a real design.
4. Show aws-cost-audit attributing a real AWS bill.
5. Install command + repo link.

Tag relevant accounts: @anthropic, @cursor_ai, known Claude Code builders.

### 2c. dev.to origin post

Title: "How I turned four independently built AI auditing tools into a one-command marketplace for Claude Code."

Format: origin story (why), the technical decisions (zero deps, dual-mode, test-first), the quality bar, what's next. Not a tutorial, a story. Link to the GitHub repo.

---

## Phase 3: Second wave (4 weeks post-launch)

- Ship a v2 of any plugin (sniff 0.8, ui-ux-suite 0.6, etc.) and post a release note.
- Court one developer newsletter (TLDR AI, Changelog Nightly, or Cooper Press).
- Add the next plugin and announce it by its new count ("10x now has eight plugins").

---

## What not to do

- Do NOT cold-submit to Hacker News as a Show HN from a cold account. Engineer a demo so a third party carries it instead.
- Do NOT buy stars or submit via fake accounts.
- Do NOT post on all channels simultaneously without a real artifact at each. The hook must land per channel.

---

## Timing

Open the launch window on a weekday, 13:00-16:00 UTC. Stack channels within 2 hours. Let GitHub Trending compound from 2+ simultaneous referrers: it is a multiplier, never the origin.
