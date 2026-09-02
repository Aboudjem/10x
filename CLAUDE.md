# CLAUDE.md: 10x marketplace contributor operations

This file documents the conventions and gotchas for maintaining the 10x marketplace hub.
It is for contributors and AI agents editing this repo. The human-facing overview is in
`README.md`; agent install instructions are in `AGENTS.md`; this file holds the operational
rules that are easy to get wrong.

10x is a curated Claude Code plugin marketplace, not a plugin itself. There is no `plugin.json`
here. The repo surface is `.claude-plugin/marketplace.json` plus docs, assets, and CI.

## marketplace.json conventions

- **Per-entry versions only.** Each entry in `plugins[]` carries its own `version`. There is
  **no top-level `version`** field, and there must not be one.
- **No `metadata.keywords`.** Keep `metadata.description`, but do not add a `metadata.keywords`
  array. Claude Code ignores `metadata.keywords` at load time, and its presence makes
  `claude plugin validate . --strict` fail with an unknown-field error (warnings are treated as
  errors under `--strict`). Per-entry `keywords` arrays inside each plugin are fine and are not
  flagged. If you want SEO keywords, set GitHub repo topics instead, not `metadata.keywords`.
- **Version pins must match the upstream plugin repos.** Never invent or guess a version. A pin
  may only point at a version that actually exists in the plugin's own repo. Cross-check each
  entry's `version`, `description`, and `license` against the plugin's live
  `.claude-plugin/plugin.json` and fix any drift.
- **Validate after every edit.** Run `claude plugin validate . --strict`; it must pass clean
  (exit 0, no warnings). Also confirm the JSON parses: `python3 -m json.tool .claude-plugin/marketplace.json`.

Current pins (cross-checked 2026-09-02): sniff 0.8.0 (Apache-2.0), ui-ux-suite 0.6.0 (MIT),
recap-studio 0.5.0 (MIT), aws-cost-audit 0.3.0 (MIT), goalify 2.6.0 (MIT), humanizer 0.7.0 (MIT),
loopify 1.1.0 (MIT).

## KEY GOTCHA: the sync bot only touches marketplace.json

`.github/workflows/sync-plugins.yml` re-reads every listed plugin's upstream
`.claude-plugin/plugin.json` and rewrites the lagging `version` pins in
`.claude-plugin/marketplace.json`. It runs every six hours, on a `plugin-released`
`repository_dispatch` event, and on demand (`gh workflow run sync-plugins.yml -R Aboudjem/10x`).
It commits as `github-actions[bot]` and pushes. `docs/SYNC.md` explains the whole chain.

That bot edits **only `marketplace.json`**, and only the `version` fields: it reports description
drift without writing it. It does **not** touch the prose docs. So after a plugin version bump,
these surfaces drift and must be updated by hand:

- `README.md` (the plugin table and the per-plugin blocks)
- `ECOSYSTEM.md` (the version table, the hub version, the test counts)
- `llms.txt` (the per-plugin version lines)
- `QUALITY-BAR.md` (the roster table and "Last verified" date)
- `AGENTS.md` (the plugin list)

This hand-edit drift is exactly the kind of mismatch a reconcile pass fixes. When you bump a
pin, refresh every prose surface above to the same version, re-derive any test count from the
plugin's own README (do not carry a stale number forward), and update the "Last verified" /
"Last aligned" dates. Honest figures only: no fabricated test counts or scores.

## House style (hard rules)

- No em-dash (U+2014) in any committed doc, README, CHANGELOG, JSON description, SVG text, or
  commit message. Use commas, parentheses, colons, or a sentence break. Never break a sentence
  mid-flow with a period. Preserve `->`, Unicode arrows, and `--`.
- No emoji in section headers. No marketing fluff. Only honest, verifiable figures. No fake badges.
- Edit SVG assets only inside `<text>` elements and comments; never add `<script>` or external
  references. The hand-authored SMIL/CSS animations must stay GitHub-safe.

## CI: validate.yml

`.github/workflows/validate.yml` runs on push to `main` and on every pull request. Steps:

1. **JSON validity** of `marketplace.json` (Python `json.load`, checks required fields).
2. **`claude plugin validate . --strict`** when the `claude` CLI is available on the runner.
3. **Markdown link check** (lychee) over `**/*.md` and `llms.txt`.
4. **Secret scan (gitleaks).**

### gitleaks CI approach

Do **not** use `gitleaks/gitleaks-action@v2`. On this repo it fails with
`failed to scan Git repository error=stderr is not empty`, a known action bug tied to its
git-log range and stderr check. The validate workflow instead downloads a pinned gitleaks
binary and runs a working-tree directory scan, which does not depend on git history:

```bash
curl -fsSL -o /tmp/gitleaks.tar.gz \
  https://github.com/gitleaks/gitleaks/releases/download/v8.24.3/gitleaks_8.24.3_linux_x64.tar.gz
tar -xzf /tmp/gitleaks.tar.gz -C /tmp gitleaks
/tmp/gitleaks dir . --no-banner --redact --exit-code 1
```

This repo is markdown plus assets and is audited clean, so the scan exits 0. If a future
addition trips a false positive, add a minimal `.gitleaks.toml` allowlist for that exact finding
rather than disabling the scan. Bump the pinned `GITLEAKS_VERSION` in the workflow deliberately.

## CD: deploy-pages.yml

`.github/workflows/deploy-pages.yml` publishes the static hub landing page (`site/index.html`)
to GitHub Pages on push to `main` when `site/**`, `.github/assets/**`, or the workflow itself
changes. It assembles `_site` from `site/` and copies the already-shipped demo assets; it never
rebuilds them. Pages must be set to deploy from GitHub Actions in the repo settings.

## Localized READMEs

`READMEs/{zh-CN,ja,es,fr}.md` are full translations of the English `README.md`. Keep all code
blocks, commands, URLs, badges, and `<picture>` tags verbatim; translate prose only. When the
English README changes, refresh the translations and re-run the self-check (AI-slop grep,
duplicate-adjacent-line check, `grep -c "U+2014"` equals 0, and a heading-structure compare
against English). End each translated file with a one-line machine-assisted-translation note in
the target language.

## Funding

`.github/FUNDING.yml` contains exactly `github: Aboudjem`.

## Done checklist

- `python3 -m json.tool .claude-plugin/marketplace.json` parses.
- `claude plugin validate . --strict` passes clean (exit 0).
- Every version pin matches the upstream plugin repo; every prose surface agrees.
- `/tmp/gitleaks dir . --no-banner --redact --exit-code 1` exits 0.
- No em-dash in any committed file. No fabricated figures.
