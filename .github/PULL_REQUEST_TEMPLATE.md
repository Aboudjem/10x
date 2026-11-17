## What this changes

<!-- One or two sentences. Say what a user of the marketplace will notice. -->

## Checks

- [ ] `npm test` exits 0
- [ ] `npm run validate` exits 0
- [ ] `npm run sync:check` ends with `drift: none`
- [ ] `claude plugin validate . --strict` passes
- [ ] No plugin `name` was renamed (see CONTRIBUTING.md, "Plugin names never change")
- [ ] No em dash, no star count, no number without the command that prints it

## Adding a plugin?

- [ ] The plugin passes [QUALITY-BAR.md](../QUALITY-BAR.md)
- [ ] The entry has `name`, `source`, `description`, `version`, `license`, `homepage` and `category`
- [ ] The version is the one in the plugin repo's `.claude-plugin/plugin.json`
