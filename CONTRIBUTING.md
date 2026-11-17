# Contributing to 10x

Thanks for your interest. 10x is a curated marketplace of developer tools for Claude Code.

## Adding a plugin

10x is opinionated. Plugins listed here meet a quality bar: clear documentation, working installation, real user value, no abandoned projects.

If you have a plugin you think belongs here:

1. Open an issue describing the plugin
2. Share a link to the repo
3. Explain what problem it solves and who it's for

I'll review and respond within a few days.

## Reporting a broken plugin

If a listed plugin is broken, abandoned, or no longer maintained, open an issue. Listings can be removed.

## Code style

The marketplace manifest is `.claude-plugin/marketplace.json`. Keep entries concise: one-line description, correct source URL, accurate keywords.

Version pins are not edited by hand; they sync automatically from each plugin repo. See [docs/SYNC.md](docs/SYNC.md).

## Plugin names never change

A plugin's `name` in `marketplace.json` is part of every install command (`claude plugin install <name>@10x`).
Renaming an entry breaks that command for everyone who already uses it. So:

- Never rename a listed plugin.
- A plugin that changes its repo keeps its `name`. Only the `source` moves.
- If a rename is ever unavoidable, add the old name to a top-level `renames` map
  (`"old-name": "new-name"`) in the same commit, so existing installs keep resolving.

## Before you open a pull request

```bash
npm test
npm run validate
npm run sync:check
claude plugin validate . --strict
```

All four must exit 0. CI runs the same four.

## License

By contributing, you agree your contributions will be licensed under the MIT License.
