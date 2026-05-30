# Changelog

All notable changes to this marketplace will be documented in this file.

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
