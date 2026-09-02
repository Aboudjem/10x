# Distribution status — 10x marketplace and its seven plugins

Last full audit: 2026-09-02. Every row carries evidence. Statuses: **FILED** (submitted this run,
awaiting third-party review) · **REPAIRED** (existing submission fixed) · **LISTED** (live now) ·
**PR-OPEN** (pre-existing open PR) · **PENDING** (submitted earlier, no public tracker) ·
**BLOCKED-\<reason\>** · **SKIPPED-\<reason\>**.

## Anthropic official (platform.claude.com/plugins/submit)

| Asset | Status | Evidence |
|---|---|---|
| loopify | PENDING | Submitted 2026-09-01, "Your plugin submission has been received"; no public tracker — check the Console |
| 10x marketplace | BLOCKED-form-plugin-only | Form is plugin-scoped ("Link to plugin", "Plugin name"; no marketplace entry type) — screenshots anthropic-form-step1-intro.jpg / anthropic-form-step2-plugin-scoped.jpg |
| sniff | FILED | Submitted 2026-09-02; confirmation: "Plugin submitted for review — Your plugin submission has been received." Screenshot in .goal/audit/screens/anthropic-sniff.jpg |
| ui-ux-suite | FILED | Submitted 2026-09-02; confirmation: "Plugin submitted for review — Your plugin submission has been received." Screenshot in .goal/audit/screens/anthropic-ui-ux-suite.jpg |
| recap-studio | FILED | Submitted 2026-09-02; confirmation: "Plugin submitted for review — Your plugin submission has been received." Screenshot in .goal/audit/screens/anthropic-recap-studio.jpg |
| aws-cost-audit | FILED | Submitted 2026-09-02; confirmation: "Plugin submitted for review — Your plugin submission has been received." Screenshot in .goal/audit/screens/anthropic-aws-cost-audit.jpg |
| goalify | FILED | Submitted 2026-09-02; confirmation: "Plugin submitted for review — Your plugin submission has been received." Screenshot in .goal/audit/screens/anthropic-goalify.jpg |
| humanizer | FILED | Submitted 2026-09-02; confirmation: "Plugin submitted for review — Your plugin submission has been received." Screenshot in .goal/audit/screens/anthropic-humanizer.jpg |

## GitHub lists

| Venue | Asset(s) | Status | Evidence |
|---|---|---|---|
| punkpeye/awesome-mcp-servers | sniff | FILED | [#13423](https://github.com/punkpeye/awesome-mcp-servers/pull/13423), per the maintainer's invitation in [#7124](https://github.com/punkpeye/awesome-mcp-servers/pull/7124) ("Please submit one server per PR") and #6287 |
| punkpeye/awesome-mcp-servers | ui-ux-suite | FILED | [#13424](https://github.com/punkpeye/awesome-mcp-servers/pull/13424), same invitation |
| composio-community/awesome-claude-plugins | 6 plugins + loopify + 10x | REPAIRED | [#257](https://github.com/composio-community/awesome-claude-plugins/pull/257): was CONFLICTING, merged upstream 2026-09-02, now MERGEABLE; rows updated (humanizer 55, sourced ui-ux copy) and extended with loopify + the 10x marketplace |
| rohitg00/awesome-claude-code-toolkit | recap-studio, aws-cost-audit, goalify, loopify, 10x | REPAIRED | [#471](https://github.com/rohitg00/awesome-claude-code-toolkit/pull/471): branch refreshed 2026-09-02 with a loopify row and the 7-plugin 10x row; MERGEABLE; sniff-qa already listed upstream, not re-added |
| ComposioHQ/awesome-claude-plugins | 10x marketplace | SKIPPED-same-repo | github.com/ComposioHQ/awesome-claude-plugins redirects to composio-community/awesome-claude-plugins (org move, verified via API + push redirect 2026-09-02) — covered by #257 |
| ComposioHQ/awesome-claude-skills | humanizer | PR-OPEN | [#1336](https://github.com/ComposioHQ/awesome-claude-skills/pull/1336), ready-to-merge, no bump (last touched 2026-08-25) |
| ComposioHQ/awesome-claude-skills | loopify | PR-OPEN | [#1792](https://github.com/ComposioHQ/awesome-claude-skills/pull/1792), ready-to-merge |
| ComposioHQ/awesome-claude-skills | sniff, ui-ux-suite | SKIPPED-out-of-scope | Their README scopes skills as "not MCP servers and not tools"; stale issue #685 closed with pointer to #1336 |
| travisvn/awesome-claude-skills | humanizer | PR-OPEN | [#997](https://github.com/travisvn/awesome-claude-skills/pull/997), no bump (last touched 2026-08-25) |
| travisvn/awesome-claude-skills | sniff, ui-ux-suite | FILED | [#1204](https://github.com/travisvn/awesome-claude-skills/pull/1204); stale issue #601 closed with a pointer to it and #997 |
| jamesmurdza/awesome-ai-devtools | sniff, ui-ux-suite | FILED | [#1047](https://github.com/jamesmurdza/awesome-ai-devtools/pull/1047); stale issue #445 closed with a pointer |
| e2b-dev/awesome-ai-agents | recap-studio | FILED | [#1484](https://github.com/e2b-dev/awesome-ai-agents/pull/1484); stale issue #940 closed with a pointer |
| anthropics/skills | loopify | PR-OPEN | [#1702](https://github.com/anthropics/skills/pull/1702), ~861 open PRs in queue |
| hesreallyhim/awesome-claude-code | humanizer | REPAIRED | [#1809](https://github.com/hesreallyhim/awesome-claude-code/issues/1809): description cut to 466/500 chars, 55 patterns, category moved to Writing & Prose Quality — label now `validation-passed`: "All validation checks passed! Your recommendation is ready for a maintainer to review." |
| hesreallyhim/awesome-claude-code | everything else | BLOCKED-one-submission-per-author | #1809 occupies the single slot; goalify #2692 auto-closed for this rule 2026-09-01; loopify window opens 2026-09-15 (form values in loopify docs/launch.md) |
| GiladShoham/awesome-claude-plugins | any | SKIPPED-vendoring-required | Requires copying plugin files into their repo; no link-only path (README checked 2026-09-02) |

## Registries

| Venue | Asset(s) | Status | Evidence |
|---|---|---|---|
| glama.ai | sniff, ui-ux-suite | BLOCKED-needs-login | Absent from search 2026-09-02; "Add Server" opens sign-up (OAuth/email + CAPTCHA). User: sign in, then submit both repo URLs |
| mcpservers.org | sniff-qa | FILED | Free tier, 2026-09-02; confirmation: "Submission Successful! Your MCP server \"sniff\" has been submitted successfully... reviewed within 12 hours." Screenshot mcpservers-sniff.jpg; $39 premium left unchecked |
| mcpservers.org | ui-ux-suite | FILED | Free tier, 2026-09-02; confirmation: "Submission Successful! Your MCP server \"ui-ux-suite\" has been submitted successfully... reviewed within 12 hours." Screenshot mcpservers-ui-ux-suite.jpg |
| mcp.so | sniff-qa, ui-ux-suite | BLOCKED-paid-only | Submit page 2026-09-02 offers only "Paid submission $39"; both absent from its search (0 results each) |
| smithery.ai | sniff-qa, ui-ux-suite | BLOCKED-needs-login | Publish flow redirects to authk.smithery.ai sign-in (email/Google/GitHub) |
| mcpmarket.com | sniff | LISTED | mcpmarket.com/server/sniff, links github.com/aboudjem/sniff (auto-indexed) |
| mcpmarket.com | ui-ux-suite | LISTED | mcpmarket.com/server/ui-ux-suite, links github.com/Aboudjem/ui-ux-suite |
| PulseMCP | sniff | LISTED | pulsemcp.com search: "Sniff" by Adam Boudjemaa, since 2026-04-15 |
| PulseMCP | ui-ux-suite | BLOCKED-venue-paused | pulsemcp.com/submit 2026-09-02: "submissions and changes are temporarily paused"; they auto-ingest from the Official MCP Registry |
| claudepluginhub.com | any | BLOCKED-captcha | Submit page sits behind a Cloudflare human-verification interstitial |
| claudecodemarketplace.net | any | BLOCKED-site-down | Page renders only "no available server" on both attempts 2026-09-02 |
| cursor.directory | sniff-qa, ui-ux-suite | BLOCKED-needs-login | "Submit a plugin" → /login (GitHub/Google OAuth); Cursor-audience, low fit |
| npm | sniff-qa 0.7.0, ui-ux-suite 0.5.0 | LISTED | `npm view sniff-qa version`, `npm view ui-ux-suite version`; keyword tuning needs a release — recorded as Next |
| skills.sh | humanizer | LISTED | skills.sh/Aboudjem/humanizer-skill, 554 installs |
| skills.sh | loopify | LISTED | skills.sh/Aboudjem/loopify (1 install; search ranking is telemetry-driven) |
| TensorBlock/awesome-mcp-servers | sniff | LISTED | Auto-crawled 2026-08-06 by their bot; no action possible |
| mcpchangefeed / mcp-servers-live | sniff | LISTED | Auto-generated crawl pages; no submission channel |
| claudemarketplaces.com / claudedirectory / skillsmp | 10x + plugins | LISTED-auto-indexed | Crawl/topic-driven; topics hygiene done this run (see below) |

## Topics + previews (auto-indexer food)

All seven plugin repos carry `claude-code` (and the two MCP repos carry `mcp-server`); sniff gained
`claude-code-plugin` this run. The 10x social preview is set (GraphQL `usesCustomOpenGraphImage:
true`). Verify:

```
for r in sniff ui-ux-suite recap-studio aws-cost-audit-skill goalify humanizer-skill loopify; do gh repo view Aboudjem/$r --json repositoryTopics --jq '[.repositoryTopics[].name]|join(",")'; done
```

## Social (decision D1: drafts only, nothing posted)

Refreshed English drafts for r/ClaudeAI, r/ClaudeCode, X, dev.to, Show HN, Product Hunt live in
`.goal/audit/dist-social-drafts.md`. Post by hand; check each channel's rules while logged in.
