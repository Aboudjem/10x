# Changelog

All notable changes to this marketplace will be documented in this file.

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
