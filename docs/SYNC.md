# How marketplace versions stay current

Every plugin in [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json)
carries a `version` pin. It has to match the `version` in that plugin repo's
own `.claude-plugin/plugin.json`, or people install a stale listing. Nobody
edits the pins by hand — [`scripts/sync-plugins.mjs`](../scripts/sync-plugins.mjs) does.

## The chain

1. You tag a release in a plugin repo, say `v0.8.0`.
2. That repo's `release.yml` publishes, then POSTs a `repository_dispatch` to
   this repo with event type `plugin-released`.
3. [`sync-plugins.yml`](../.github/workflows/sync-plugins.yml) wakes up, reads
   the `plugin.json` of **every** listed plugin, and rewrites any pin that lags.
4. It commits as `github-actions[bot]` with a message like
   `chore(sync): sniff 0.7.0 → 0.8.0` and pushes to `main`.

The dispatch payload names one plugin, and the sync ignores it on purpose. It
re-reads all of them, so a single event repairs every pin — not just the one
that fired.

## The safety net

The same workflow runs on a schedule, at 17 past every sixth hour. If a
dispatch never arrives — a missing token, a failed release job, a plugin repo
with no `release.yml` yet — the next scheduled run picks it up anyway. Worst
case, a pin is stale for six hours. You can also run it from the Actions tab.

## The guard

`validate.yml` has a `drift` job on every push and pull request. It runs the
unit tests, then `node scripts/sync-plugins.mjs --check`, which writes nothing
and fails the build if any pin lags upstream or any `plugin.json` could not be
read. Drift cannot land quietly.

## What syncs and what does not

**Synced:** `version` fields, and nothing else. The script edits the version
strings in place rather than re-serializing the JSON, so key order, indentation
and the trailing newline come out byte-identical.

**Not synced:** descriptions, keywords, homepages, README prose. Marketplace
descriptions are written for someone browsing the listing; `plugin.json`
descriptions are written for the plugin's own repo. They are allowed to differ,
and today all seven do. The run summary prints a `description drift:` section
so a human can look, but the script never writes a description.

## Running it yourself

```
npm run sync:check   # compare only, exits 1 on drift
npm run sync:write   # rewrite the lagging pins
npm test             # unit tests
```

No dependencies to install; Node 22 or newer. Set `GITHUB_TOKEN` to read
through the authenticated API instead of `raw.githubusercontent.com`.

## Adding plugin #8

1. Add the entry to `.claude-plugin/marketplace.json`, with `source.repo`
   pointing at the plugin's GitHub repo and `version` matching what is on its
   `main` branch today.
2. Give that repo a `release.yml` modeled on
   [sniff's](https://github.com/Aboudjem/sniff/blob/main/.github/workflows/release.yml):
   publish, then a second job that POSTs the dispatch.
3. Set the sender token (below). Until you do, the six-hourly pull sync keeps
   the pin honest anyway — it just takes hours instead of a minute.

## The sender token

A `GITHUB_TOKEN` inside a plugin repo cannot dispatch to another repo, so each
sender needs its own credential:

1. Create a fine-grained PAT scoped to `Aboudjem/10x` with **Contents: read and
   write** ([GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)).
2. `gh secret set TEN_X_DISPATCH_TOKEN -R Aboudjem/<repo>`

Without it the release still succeeds; the dispatch step just logs
`TEN_X_DISPATCH_TOKEN secret not set; skipping 10x sync.` and moves on.
