# Changelog

All notable changes to this marketplace will be documented in this file.

## [1.9.0] - 2026-09-01

### Added
- **Connected marketplace.** `scripts/sync-plugins.mjs` (Node 22, no dependencies, written test-first with `tests/sync-plugins.test.mjs`) reads every listed plugin's upstream `.claude-plugin/plugin.json`, rewrites only lagging `version` pins byte-for-byte, reports description drift without writing it, and prints `drift: none` or the bump list. `.github/workflows/sync-plugins.yml` runs it every 6 hours, on a `plugin-released` `repository_dispatch` and on demand, and commits `chore(sync): <plugin> <old> -> <new>` as `github-actions[bot]`. `validate.yml` gained a blocking `drift` job (unit tests + `--check`). `docs/SYNC.md` explains the chain, the schedule, the guard, what syncs (versions) and what does not (prose), how to add plugin #8, and the `TEN_X_DISPATCH_TOKEN` setup; it is linked from `README.md`, `CONTRIBUTING.md` and `AGENTS.md`. `package.json` (private) wires `npm test`, `npm run sync:check` and `npm run sync:write`.
- **Five sender workflows.** `recap-studio`, `aws-cost-audit-skill`, `goalify`, `humanizer-skill` and `loopify` each got a `.github/workflows/release.yml` (tag `v*` -> verify the tag matches `plugin.json` -> GitHub release -> `plugin-released` dispatch to 10x), modeled on the one `sniff` and `ui-ux-suite` already had. Until `TEN_X_DISPATCH_TOKEN` is set in those repos the dispatch step logs a notice and the 6-hour pull sync covers it.
- `demo.gif` gained a 3.0 s teal `loopify` title-card beat (`scenes/loopify.html` -> `clips/cl.mp4`, "PLUGIN 07 - Hand Claude a job that repeats") after the humanizer beat; the intro card now says "7 PLUGINS". 960x540, 675 frames (was 642), 6.1 MB. `docs/VIDEO-EMBED.md` describes the seven-beat reel.

### Changed
- `README.md` rewritten as seven compact plugin cards (417 -> 251 lines): badge heading, the plugin's own tagline, two or three plain sentences, the diagram, the install block, one sourced proof number (or none) and the GitHub link. Every number traces to the plugin's own README or `plugin.json`; the roster note keeps only sourced facts. Reviewed by a separate two-persona judge (non-technical reader 3/3, mechanical checks 10/10). "How it works" links `docs/SYNC.md`.
- **humanizer** pinned at **0.6.2** (was 0.1.0, five minor versions behind its repo) and described with **55** AI writing patterns (was 43) in `marketplace.json`, `README.md`, the four translations, `llms.txt`, `site/index.html`, `AGENTS.md`, `ECOSYSTEM.md` and `QUALITY-BAR.md`.
- Unsourced claims cut everywhere they appeared: ui-ux-suite's "24 named UX laws" (its README states no count; the copy now says it cites the named law behind every finding), aws-cost-audit's "independently verified end-to-end on a live account", and the goalify/loopify eval figures in the README roster note. The quality bar is eight points and 28 items (`llms.txt` and `AGENTS.md` said 32).
- The four translated READMEs (`zh-CN`, `ja`, `es`, `fr`) rewritten from the new English README with the same 13 headings, seven badge cards and absolute asset links.
- `SECURITY.md` lists all seven plugin contacts and the CI drift check; `docs/LAUNCH-PLAN.md` is marked as the historical four-plugin plan; `.gitignore` ignores `.goal/`.
- GitHub repo settings: description names all seven plugins, homepage set to the Pages site, topics gained `claude-code-plugins`, `agent-skills`, `claude-skills`.
- `validate.yml` link check: lychee now gets `GITHUB_TOKEN` and skips `adam-boudjemaa.com` (refuses GitHub-hosted runners) and GitHub `/stargazers` pages (404 to non-browser clients), which had been failing the job since before this release.

### Fixed
- `editors-strip.svg` lost two of its eight editor chips, `logo-light.svg`/`logo-dark.svg` pulled their sparkles onto the wordmark, and `aws-cost-audit-diagram.svg` stacked savings rows 2 and 3 onto row 1: a CSS `transform` keyframe was overriding the attribute `transform` that positioned the same element (the class of bug `[1.8.0]` fixed in `goalify-diagram.svg`). The position now lives on a wrapper `<g>`. `humanizer-diagram.svg` had the same latent bug on its second chip (noted in `[1.8.0]`) and gets the same fix. Re-rendered and seek-proved at t=0.3 s and t=4.5 s; a static re-scan finds no remaining case in any of the 12 SVGs.
- `uiux-diagram.svg`: the 12-dimension caption was clipped mid-word; it now wraps onto three lines inside its frame at 900 px and 380 px.

### Removed
- `.github/workflows/bump-plugin.yml` (single-pin bump on dispatch), replaced by `sync-plugins.yml`, which accepts the same `plugin-released` payload and re-reads every upstream instead.

## [1.8.0] - 2026-09-01

### Added
- **loopify** (1.0.0, MIT) joins the marketplace as the seventh plugin: a Claude Code skill for a job that repeats rather than finishes (babysitting a release PR, watching a deploy, sweeping new bug reports). It writes the brief (a standing file the loop re-reads at the start of every tick) plus the line (one short string you paste into Claude Code's built-in `/loop`), with a tick cap, a stop rule and five safety rails; every tick logs what it did to `TICKS.md` and leaves what it cannot do safely in `QUEUE.md`. Installed from the `github` source (`Aboudjem/loopify`). Listed under the same skill-plugin carve-out as `aws-cost-audit`, `goalify` and `humanizer` (the dual-mode/MCP and standalone-CLI bar items do not apply to a skill plugin).
- New animated, GitHub-safe `.github/assets/loopify-diagram.svg` (teal `#14b8a6` accent, hand-authored SMIL/CSS, three stages: scope one cycle -> the brief and the line -> every tick re-reads the brief and logs to `TICKS.md`, with `prefers-reduced-motion` and light-mode guards, no scripts or external refs).

### Changed
- Roster is now seven plugins across every text surface: `marketplace.json` (7 entries, passes `claude plugin validate . --strict` clean), `README.md` (badge `plugins-6`->`7`, hero alt text, new plugin card 07, editor/skill carve-out, roster note), `QUALITY-BAR.md` (roster table 6->7 + loopify skill carve-out note), `ECOSYSTEM.md` (table row + what's-tested bullet + hub bumped to v1.8.0), `llms.txt`, `AGENTS.md`, `examples/README.md`, `site/index.html`, `CLAUDE.md` (current pins), and the four localized READMEs (`zh-CN`, `ja`, `es`, `fr`).
- **goalify refreshed to 2.5.0** on every surface. It no longer self-deletes: goalify now writes the brief (a file the run works from) plus the condition (one line you paste into `/goal`), and on full success the run quotes the passing checks and archives the brief to `.goal/done/` instead of deleting it. The pin, the descriptions, the README pitch and heading, the diagram alt text, and the `<text>` inside `goalify-diagram.svg` ("SELF-DELETING" -> "ARCHIVED ON DONE", "rm /goal" -> ".goal/done/") were all updated to match.
- `hero-diagram.svg` rebuilt from a 3-3 (six-card) grid to a 4-over-3 layout that holds seven plugin cards, on a widened `0 0 1560 480` viewBox; `aws-cost-audit` moved up to the top row, the bottom row of three was re-centred under it, a teal `#14b8a6` `loopify` card was added bottom-right, and the seven hub-to-card flow paths were recomputed. `social-preview.svg` sub-tagline updated to "7 plugins. sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer, loopify."
- `social-preview.png` regenerated from the updated `social-preview.svg` via headless Chrome at exactly 1280x640 (the `system-ui` wordmark/taglines fall back to San Francisco since Inter is not installed; the JetBrains Mono install pill renders natively). It now reads "7 plugins ... loopify."
- `demo.gif` is not yet re-recorded for seven plugins: deferred. The reel still runs its six beats and has no `loopify` segment; `docs/VIDEO-EMBED.md` now says so instead of claiming the montage covers every plugin.

### Fixed
- The `check-in` keyframes in `goalify-diagram.svg` animate `transform: translateX(...)`, and a CSS transform overrides the element's SVG `transform` presentation attribute. The second and third checklist rows carried their row offset on that same element, so once the animation settled all three rows collapsed onto the first. The offsets now sit on a wrapper `<g>` and the animated `<g>` sits inside it. `loopify-diagram.svg` uses the fixed shape from the start. (`humanizer-diagram.svg` has the same latent problem on one of its two chips and is left untouched here.)

## [1.7.0] - 2026-05-30

### Added
- **humanizer** (0.1.0, MIT) joins the marketplace as the sixth plugin: a Claude Code skill that detects 43 AI writing patterns and rewrites text with sentence-length burstiness, 5 voice profiles (casual, professional, technical, warm, blunt), and a 0-100 AI-tell score, across three modes (detect, rewrite, edit). Pure Markdown, zero dependencies, no network calls. Installed from the `github` source (`Aboudjem/humanizer-skill`). Listed under the same skill-plugin carve-out as `aws-cost-audit` and `goalify` (the dual-mode/MCP and standalone-CLI bar items do not apply to a skill plugin).
- New animated, GitHub-safe `.github/assets/humanizer-diagram.svg` (magenta `#d946ef` accent, hand-authored SMIL/CSS, three stages detect -> rewrite -> humanized, `prefers-reduced-motion` and light-mode guards, no scripts or external refs).

### Changed
- Roster is now six plugins across every text surface: `marketplace.json` (passes `claude plugin validate . --strict` clean), `README.md` (badge `plugins-5`->`6`, hero alt text, new plugin card 06, editor/skill carve-out, roster note), `QUALITY-BAR.md` (roster table 5->6 + humanizer skill carve-out note), `ECOSYSTEM.md` (table row + what's-tested bullet + hub bumped to v1.7.0), `llms.txt`, `AGENTS.md`, `examples/README.md`, `site/index.html`, and the four localized READMEs (`zh-CN`, `ja`, `es`, `fr`).
- `hero-diagram.svg` rebuilt from a 3-2 (five-card) grid to a 3-3 layout that holds six plugin cards on the same `0 0 1320 480` viewBox; the bottom row was realigned to the top row's columns and a magenta `#d946ef` `humanizer` card added bottom-right, with the six hub-to-card flow paths recomputed. `social-preview.svg` sub-tagline updated to "6 plugins. sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify, humanizer."
- `social-preview.png` regenerated from the updated `social-preview.svg` via headless Chrome at 1280x640 (the `system-ui` wordmark/taglines fall back to San Francisco since Inter is not installed; the JetBrains Mono install pill renders natively). It now reads "6 plugins ... humanizer."
- `demo.gif` rebuilt to a ~54s montage that now includes a `humanizer` beat: a 3.0s magenta title-card segment (`scenes/humanizer.html` -> `clips/chum.mp4`, accent `#d946ef`) inserted after the goalify beat and before the editors strip, crossfaded into the chain via an updated `xfade.txt`/`build_concat.sh`. `humanizer` is skill-only so it has no hero segment. Output is 960x540, 6.78 MB (under the 10 MB GitHub cap). The demo pipeline (`demo-output/`, gitignored) and `make-titles.sh` were updated to include the humanizer card.

## [1.6.0] - 2026-05-30

### Added
- **goalify** (1.0.0, MIT) joins the marketplace as the fifth plugin: a Claude Code skill that scopes a big coding task, locks the few real decisions, and writes a self-contained, self-deleting `/goal` file so a fresh full-context session executes and verifies the whole job, then deletes the file only on full success. Installed from the `github` source (`Aboudjem/goalify`). Listed under the same skill-plugin carve-out as `aws-cost-audit` (the dual-mode/MCP and standalone-CLI bar items do not apply to a skill plugin).
- New animated, GitHub-safe `.github/assets/goalify-diagram.svg` (green `#3FB950` accent, hand-authored SMIL/CSS, `prefers-reduced-motion` and light-mode guards, no scripts or external refs).

### Changed
- Roster is now five plugins across every text surface: `marketplace.json` (passes `claude plugin validate . --strict` clean), `README.md` (badge `plugins-4`->`5`, hero alt text, new plugin card 05, editor/skill carve-out, roster note), `QUALITY-BAR.md` (roster table 4->5 + goalify skill carve-out note), `ECOSYSTEM.md` (table row + what's-tested bullet + hub bumped to v1.6.0), `llms.txt`, `AGENTS.md`, `examples/README.md`, `site/index.html`, and the four localized READMEs (`zh-CN`, `ja`, `es`, `fr`).
- `hero-diagram.svg` rebuilt from a 2x2 (four-card) grid to a balanced 3-2 layout that holds five plugin cards, on a widened `0 0 1320 480` viewBox; cards refactored into self-contained group transforms. `social-preview.svg` sub-tagline updated to "5 plugins. sniff, ui-ux-suite, recap-studio, aws-cost-audit, goalify."
- `social-preview.png` regenerated from the updated `social-preview.svg` via headless Chrome at 1280x640 (the `system-ui` wordmark/taglines fall back to San Francisco since Inter is not installed; the JetBrains Mono install pill renders natively). It now reads "5 plugins ... goalify."
- `demo.gif` rebuilt to a ~52s montage that now includes a `goalify` beat: a 3.0s green title-card segment (`scenes/goalify.html` -> `clips/cg.mp4`, accent `#3FB950`) inserted before the editors strip and crossfaded into the chain via an updated `xfade.txt`/`build_concat.sh`. `goalify` is skill-only so it has no hero segment. Output is 960x540, 5.79 MB (under the 10 MB GitHub cap). The demo pipeline (`demo-output/`, gitignored) and `make-titles.sh` were updated to include the goalify card.

## [Unreleased] - 2026-05-29

### Changed
- Aligned the plugin one-liners across `marketplace.json`, `README.md`, `ECOSYSTEM.md`, and `llms.txt` so all four surfaces agree with each plugin's own README.
- sniff: corrected the README blurb to "Auto-detects your dev server" (was "framework and port"), matching the marketplace and llms.txt; framed `/sniff` as the flow-walk and named the unified `sniff` MCP tool.
- ui-ux-suite: aligned the 12 dimension labels in the README to the schema (interaction quality, information architecture, platform appropriateness) and stated it is audit-only ("it audits, it never edits"); kept the 311-test and 24-UX-law counts consistent.
- aws-cost-audit: led the marketplace description and the ECOSYSTEM row with "read-only"; corrected the ECOSYSTEM license from Apache-2.0 to MIT (matches the repo LICENSE, plugin.json, and the other surfaces).
- Removed marketing fluff ("Battle-tested") and sentence-break em-dashes from the docs.

### Added
- Marketplace montage demo (`.github/assets/demo.gif` + `demo.mp4`) embedded in the README.

### Fixed
- Animated SVGs now respect `prefers-reduced-motion`; added light-theme guards on the dark-only sniff and ui-ux diagrams.

## [1.5.0] - 2026-05-30

### Changed
- Synced marketplace pins to the four released plugins: `recap-studio` 0.3.1 -> 0.4.0 and `aws-cost-audit` 0.1.0 -> 0.2.0 (the auto-bump bot had already set `sniff` 0.7.0 and `ui-ux-suite` 0.5.0). Cross-checked each entry's version, description, and license against the plugin's live `.claude-plugin/plugin.json`.
- Removed the `metadata.keywords` array from `marketplace.json`. Claude Code ignores it at load time and its presence made `claude plugin validate . --strict` fail with an unknown-field error. `metadata.description` is kept, and per-entry `keywords` arrays are kept. Validation now passes clean under `--strict`.
- Refreshed plugin versions across the prose docs that the bump bot does not touch (`README.md`, `ECOSYSTEM.md`, `llms.txt`, `QUALITY-BAR.md`, `AGENTS.md`) to sniff 0.7.0, ui-ux-suite 0.5.0, recap-studio 0.4.0, aws-cost-audit 0.2.0.
- Corrected the recap-studio test figure to 43 tests across 5 test-bearing packages (was 44 across 6). Updated every "Last verified" / "Last aligned" date to 2026-05-30.
- Documented the one-line `curl` multi-CLI installer for the tool plugins across the README, ECOSYSTEM, and llms.txt, keeping `claude plugin install <name>@10x` as the primary path.
- Updated `AGENTS.md` validation guidance to require `claude plugin validate . --strict` (clean), reflecting the removal of `metadata.keywords`.

### Added
- Discoverability layer: a static GitHub Pages hub landing page (`site/index.html`) listing all four plugins with install commands and the one-line curl, plus `.github/workflows/deploy-pages.yml` to publish it.
- Localized full READMEs at `READMEs/{zh-CN,ja,es,fr}.md` and a language-switcher row at the top of the README.
- A Star History `<picture>` (dark/light) for `Aboudjem/10x` near the end of the README.
- `.github/FUNDING.yml` (`github: Aboudjem`).
- `CLAUDE.md` documenting the marketplace conventions (per-entry versions, no top-level version, no `metadata.keywords`), the bump-bot prose-drift gotcha, the gitleaks CI approach, and the funding handle.

### Fixed
- The `validate` CI secret-scan job was red: `gitleaks/gitleaks-action@v2` fails on this repo with "failed to scan Git repository error=stderr is not empty" (a known action bug). Replaced it with a pinned gitleaks v8.24.3 binary running `gitleaks dir . --no-banner --redact --exit-code 1`, a working-tree scan that does not depend on git history. Verified locally to exit 0 (no leaks). The `claude plugin validate` step now runs with `--strict`.
- Removed em-dashes (U+2014) from `CODE_OF_CONDUCT.md`, `SECURITY.md`, `docs/VIDEO-EMBED.md`, the `validate.yml` comments, and the `<text>` / comments of two SVG assets, per house style.

## [1.4.0] - 2026-05-28

### Changed
- Synced plugin pins to the current upstream versions: `sniff` 0.5.2 -> 0.6.1, `ui-ux-suite` 0.4.0 -> 0.4.1, `recap-studio` 0.2.0 -> 0.3.1. `aws-cost-audit` stays 0.1.0.
- Rewrote `metadata.description` and the per-plugin descriptions to be honest and count-free: dropped the hardcoded "427 tests" for sniff and the disowned "13 specialist agents / 7-dimension validation board" for recap-studio. sniff now describes its autonomous flow-walk model (walks your running app, finds real bugs; source scan via `sniff scan`); recap-studio is described as self-contained offline HTML explainers validated by deterministic heuristic checks.
- README roster note updated to sniff 0.6.1 (441 tests), ui-ux-suite 0.4.1 (311 tests), recap-studio 0.3.1 (44 tests), aws-cost-audit 0.1.0; dropped the "9.7/10" claim. Refreshed the sniff and recap-studio sections, diagram alt text, and feature table to match the honest framing, and added a pointer to each tool's own demo.
- `QUALITY-BAR.md` roster table updated to 0.6.1 / 0.4.1 / 0.3.1.

### Added
- `llms.txt`, `AGENTS.md`, `CODE_OF_CONDUCT.md` (by-reference), and `SECURITY.md`: the marketplace now satisfies its own QUALITY-BAR.md item 8.
- `.github/workflows/validate.yml`: CI that validates the marketplace JSON, runs `claude plugin validate .` when the CLI is available, checks markdown links (lychee), and scans for secrets (gitleaks). The existing `bump-plugin.yml` automation is kept.

## [1.3.0] - 2026-05-28

### Added
- `aws-cost-audit` v0.1.0: evidence-first AWS cost auditor that reads a live AWS account read-only, attributes every dollar, finds idle/orphaned/over-provisioned resources, verifies prices live (never hardcoded), and ships a safe, reversible, gated savings plan with confidence levels. A Claude Code skill plugin (no MCP server).
- Animated `aws-cost-audit-diagram.svg` asset.

### Changed
- README now features four plugins instead of three; roster note and "last verified" date updated to 2026-05-28.
- Recreated `hero-diagram.svg` to show all four plugins (it previously showed only two), in an even 2x2 grid; bottom caption no longer claims universal MCP dual-mode, since `aws-cost-audit` is skill-only.
- `social-preview.svg` updated from "3 plugins" to "4 plugins".
- Marketplace `metadata.description` and keywords now include `aws-cost-audit`, AWS, and FinOps; the dual-mode line is scoped to the tool plugins.

## [1.2.0] - 2026-05-13

### Added
- `recap-studio` v0.2.0: visual one-page explainers in under 5 minutes (13 specialist agents, 7-dimension validation board, mobile-first Next.js renderer, offline-safe demo for "Latest AI models").
- `QUALITY-BAR.md`: the explicit checklist every listed plugin must meet, with a `Verify before listing` section maintainers can run.
- Animated recap-studio diagram asset.

### Changed
- README now features three plugins instead of two.
- Bumped `sniff` pin from `0.4.0` → `0.5.2` to match upstream.
- Bumped `ui-ux-suite` pin from `0.2.0` → `0.3.0` to match upstream.
- `Works with any AI editor` section adds the recap-studio MCP scaffold path.

## [1.0.0] - 2026-04-17

### Added
- Initial marketplace with two curated plugins
- `sniff` - AI-powered QA testing plugin
- `ui-ux-suite` - Design audit tool across 12 dimensions
