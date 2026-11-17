# Fleet triage

Every public, non-fork repo of [Aboudjem](https://github.com/Aboudjem) has a verdict. Checked live on 2026-11-17.

```bash
npm run fleet:triage
```

| Verdict | Repos | What happens |
| --- | --- | --- |
| `KEEP-UPGRADE` | 18 | Brought to the full [fleet standard](FLEET-STANDARD.md) |
| `KEEP-TIDY` | 12 | Clean README, license, topics and description |
| `ARCHIVE` | 24 | Archived on GitHub. Still readable. Reversible |

Run fleet-2 handles 10 repos (`10x` and the nine plugins). Run fleet-3 handles 20.

## How was each verdict reached?

- `KEEP-UPGRADE`: a tool on the owner's site, or one that should be.
- `KEEP-TIDY`: worth showing. It needs a clean front door, nothing more.
- `ARCHIVE`: one of three rules holds.
  - Rule A: no push in 18 months, not linked from the site, no dependents.
  - Rule B: superseded by a named repo.
  - Rule C: broken, with no reason to fix.
- A repo on the site is never archived. When unsure, the verdict is `KEEP-TIDY`.
- One agent wrote each verdict. A second agent re-checked every `ARCHIVE` from primary sources before anything was archived.

## Public repos

Traits tell the checker which install paths to test. See [the standard](FLEET-STANDARD.md).

| Repo | Kind | Verdict | Traits | Reason | Evidence | Run |
| --- | --- | --- | --- | --- | --- | --- |
| 10x | marketplace | KEEP-UPGRADE | site | Install path works end to end and manifest validates strict. Four prose surfaces still carry old pins (recap-studio 0.5.1, goalify 2.6.1) and the last tagged release predates the ninth plugin. | push 2026-11-03, release v2.0.1 (2026-09-03), 0 issues / 0 PRs, CI green, MIT, 41/41 tests, site yes, profile yes | fleet-2 |
| aws-cost-audit-skill | plugin-skill | KEEP-UPGRADE | site, claude-plugin, skills, report | Listed on the site, second most cloned, copied by a third-party skills repo. The 62-test smoke suite passes locally but CI never runs it. | push 2026-09-06, v0.3.1, 0 / 0, CI green, MIT, 1290 words, 45 views / 366 clones, site yes, profile yes, dependents: 10x, profile, one external copy | fleet-2 |
| contextify | plugin-skill | KEEP-UPGRADE | site, claude-plugin, skills, report | Listed on the site; both documented marketplaces install it and all 7 documented test commands pass. README leads with a different install than the site, and its only example is labelled as v0.1.0 history. | push 2026-11-02, v0.2.0, 0 / 0, CI green, MIT, 1117 words, 0 views / 28 clones, site yes, profile yes, dependents: 10x, profile | fleet-2 |
| goalify | plugin-skill | KEEP-UPGRADE | site, claude-plugin, skills, report | Healthiest of the five: fresh v3.0.0, 9/9 suites pass, both installs work, validate clean. Needs only weight and consistency fixes. | push 2026-11-06, release v3.0.0 (2026-11-03), 0 / 0, CI green, MIT, no npm, site yes, profile yes | fleet-2 |
| humanizer-skill | plugin-skill | KEEP-UPGRADE | site, claude-plugin, skills, report | Listed on the site and the most visited of the five; every install path and all 64 tests work. Its own repo breaks its own rules (em dashes, failing self-scan) and carries internal launch docs. | push 2026-09-06, v0.7.1, 0 issues / 0 PRs, CI green, MIT, 1081 words, 2147 views / 1489 clones (14d uniques), site yes, profile yes, third-party dependents found | fleet-2 |
| loopify | plugin-skill | KEEP-UPGRADE | site, claude-plugin, skills, report | Listed on the site; installs and 334 checks pass. Almost no traffic, and 22 tracked files contain em dashes against the house rule. | push 2026-09-06, v1.1.1, 0 / 0, CI green, MIT, 1383 words, 1 view / 27 clones, site yes, profile yes, dependents: 10x, secure-my-app README, profile | fleet-2 |
| recap-studio | plugin-mcp | KEEP-UPGRADE | site, claude-plugin, skills, mcp | Clone path, build, 73 tests and skills install all work. The plugin as installed ships an MCP server entry that cannot start and hooks that touch unrelated projects. | push 2026-10-21, release v0.5.2 (2026-10-15), 0 issues / 1 draft PR, CI green, MIT, npm placeholder 0.2.0, site yes, profile yes | fleet-2 |
| secure-my-app | plugin-skill | KEEP-UPGRADE | site, claude-plugin, skills, report | Listed on the site; installs and the 162 checks the README claims are real (90 + 72). README never shows how to invoke it and presents a fictional report as "real output". | push 2026-09-07, v0.2.0, 0 / 0, CI green, MIT, 727 words, 3 views / 20 clones, site yes, profile yes, dependents: 10x, profile | fleet-2 |
| sniff | plugin-mcp | KEEP-UPGRADE | site, claude-plugin, skills, mcp, npm, report | Plugin install, skills install and npm CLI all work from a clean cache. Lockfile reports 45 production vulnerabilities and the plugin's bundled MCP packages are skipped at install. | push 2026-09-06, release v0.8.1 (2026-09-03), 0 / 0, CI green, Apache-2.0, npm sniff-qa 0.8.1, 506/507 tests locally (1 needs a Chromium download), site yes, profile yes | fleet-2 |
| ui-ux-suite | plugin-mcp | KEEP-UPGRADE | site, claude-plugin, skills, mcp, npm, report | Every documented command works and every README figure reproduced (356 tests, 3.7/10 fixture, 16 MCP tools, 14 skills). Only freshness and small polish are missing. | push 2026-09-06, release v0.6.1 (2026-09-03), 0 / 0, CI green, MIT, npm ui-ux-suite 0.6.1, site yes, profile yes | fleet-2 |
| claude-plugin-template-kit | guide | KEEP-UPGRADE | site | On the site, but the README sells paid tiers through a placeholder checkout link while the "paid" files sit in the same MIT repo, and the scaffold fails `claude plugin validate`. As it stands it costs trust. | Push 2026-03-10 (single commit), no release, no CI, MIT, 0 views in 14 days, on site, not on profile | fleet-3 |
| ERC-3643 | solidity-reference | KEEP-UPGRADE | - | Pushed 2026-04, linked from the profile README, real external dependents, 170 tests pass, so no archive branch applies. It should be on the site; 10 stale dependabot PRs (two with red CI) and an outdated description need cleanup. | push 2026-04-24, CI on main green (2026-04-17), GPL-3.0, 2475 words, 0 issues / 10 PRs, tags up to 4.0.1-beta2, no release | fleet-3 |
| ERC-6960 | solidity-reference | KEEP-UPGRADE | site | Site tool and the code behind a Draft ERC he first-authored; 112 tests pass. Untouched since 2023, emoji-template README with no status, spec link or install steps, and Polytrade leftovers. | push 2023-11-22, default branch `dev`, no CI runs retained, MIT, 803 words, 0 / 0, no release | fleet-3 |
| erc-8203-metered-billing | guide | KEEP-UPGRADE | site | Site tool, a docs-only profile that is honest about being non-normative. Needs a visible Draft label, license detection fix and removal of a committed forum-post draft. | push 2026-04-27, no CI, CC0 file (GitHub: NOASSERTION), 701 words, 0 / 0, no release | fleet-3 |
| erc-8203-ref | solidity-reference | KEEP-UPGRADE | site | Site tool, builds and passes 24/24 tests from the README commands. README never says "Draft" and never links PR #1614. | push 2026-11-02, CI green, MIT, 844 words, 0 issues / 0 PRs, no release | fleet-3 |
| mastering-claw | guide | KEEP-UPGRADE | site | A complete 35-chapter book (59,069 words, 0 broken internal links) listed on the site. Needs an honest README, a currency check against today's OpenClaw, and removal of an internal agent plan file. | Push 2026-11-02, no release, no CI, MIT, 0 views in 14 days, on site, not on profile | fleet-3 |
| Sleepless | macos-app | KEEP-UPGRADE | site | The most visited repo of the five (556 unique views in 14 days) and listed in awesome-mac lists, but 6 issues and 5 community PRs have had no maintainer action since the last push on 2026-06-03. The release, checksum and attestation are all sound. | Push 2026-06-03, release v1.2.7, 6 issues / 5 PRs open, CI success on main, MIT, on site and profile | fleet-3 |
| solidity-style-guide | guide | KEEP-UPGRADE | site, skills | Site tool with steady traffic and external reuse. The README quick start formatter command fails as shipped and the version label is inconsistent (0.8.30 vs 0.8.34). | push 2026-04-17, release v2.0.0, CI green, MIT, 9114 words, 0 / 0 | fleet-3 |
| aboudjem | profile | KEEP-TIDY | - | The README is current and accurate on ERC status. The repo still carries unused legacy files and a daily bot job whose output the README no longer uses. | Push 2026-11-17 (bot, `output` branch), last human commit 2026-11-02, no license, CI success | fleet-3 |
| bonding-curve-token | solidity-sample | KEEP-TIDY | - | Coherent sample with 16 passing tests and an open user issue claiming a real mint bug, so I am not sure it is dead. Age alone (branch A) holds but the dependents search is unreliable here. | pushed 2023-01-20, no release, 1 issue / 0 PR, CI none on default branch, MIT (file + detected), README 567 words, 14d 3 views / 3 unique, 10 clones / 8 unique, no npm, site no, profile no, dependents none found | fleet-3 |
| homebrew-tap | homebrew-tap | KEEP-TIDY | - | The cask is correct (version and sha256 match the latest release asset). It lacks a license, topics and an answer to its one open PR. | Push 2026-06-03, cask 1.2.7 = release v1.2.7, sha256 match, 192 unique clones in 14 days, no license | fleet-3 |
| modules | solidity-sample | KEEP-TIDY | - | Real work (4 ERC20 variants, 49 passing tests) but looks like course "week1" material and its BanToken duplicates restricted-tokens; unsure it meets ARCHIVE strictly, so KEEP-TIDY. Archive is a reasonable call if the owner does not want course work shown. | pushed 2023-02-02, no release, 0 issues / 1 open PR (#8, stale 2023), no CI recorded, MIT, README 283 words, 14d views 0 / clones 10 (7 uniques), not on site, not in profile README, no dependents found locally, tests 49 passing | fleet-3 |
| restricted-tokens | solidity-sample | KEEP-TIDY | - | Focused ERC20 with owner-managed address restrictions, interface, 9 passing tests, good description and 9 topics; only the README is wrong (default Hardhat sample text). | pushed 2023-01-21, no release, 0 issues/PRs, no CI recorded, MIT, README 283 words, 14d views 0 / clones 7 (5 uniques), not on site, not in profile README, no dependents found locally, tests 9 passing | fleet-3 |
| simple-sale-token | solidity-sample | KEEP-TIDY | - | Coherent sample, 19 passing tests, no issues; unsure it deserves archive and no better repo supersedes it. | pushed 2023-01-20, no release, 0 issues / 0 PR, CI none, MIT, README 532 words, 14d 0 views, 6 clones / 4 unique, no npm, site no, profile no, dependents none found | fleet-3 |
| solidity-boilerplate | solidity-sample | KEEP-TIDY | - | Working Hardhat/TypeScript starter, marked as a GitHub template, with a real description; the only one of the template-sc family worth showing. | pushed 2023-01-20, no release, 0 issues/PRs, no CI recorded, MIT, README 429 words, 14d views 5 (5 uniques) / clones 3, not on site, not in profile README, no dependents found locally, `npm ci` + `npx hardhat test` = 1 passing | fleet-3 |
| staking-platform-fixed-apy | solidity-sample | KEEP-TIDY | - | Audited (two PDF reports in repo), 368 passing tests, a non-owner user opened an issue, and it gets the most clones of the six. Age holds for A but real usage means not dead. | pushed 2021-11-15, no release, 1 issue / 0 PR, CI none, MIT, README 592 words, 14d 5 views / 5 unique, 42 clones / 11 unique, npm package name in package.json only (not published), site no, profile no, external mentions only (see section) | fleet-3 |
| Swapper | school-exercise | KEEP-TIDY | - | Take-home style exercise, and `hardhat test` fails to compile (pragma 0.8.17 vs configured 0.8.6), but the fix is one line and the last push is 2026-11-02, so A fails and C is not clearly "no reason to fix". | pushed 2026-11-02 (license commit), no release, 0 issues, no CI, MIT, README 407 words, views 7, clones 16 | fleet-3 |
| web3-listener | cli | KEEP-TIDY | - | Recent (2025-12), coherent TypeScript Base-mainnet transfer monitor with tests; needs description, license, topics and an honest test count. | pushed 2025-12-20, no release, 0 issues, no CI, no license, README 1803 words, views 2, clones 16 | fleet-3 |
| Yul-ERC1155-assembly | solidity-sample | KEEP-TIDY | - | Branch A date test holds (last push 2023-11-22, not on site) but one code-search hit for the name exists in a `Projects.tsx` of another Aboudjem repo that could not be identified, and the 23 tests pass; unsure so KEEP-TIDY. | pushed 2023-11-22, no release, 0 issues, no CI, no license (src says UNLICENSED), README 64 words, views 1, clones 8 | fleet-3 |
| Yul-ERC20-assembly | solidity-sample | KEEP-TIDY | - | Working Yul ERC20, 8 forge tests pass, CI present, useful to show low-level EVM skill; README is emoji and giphy heavy with a broken license link. | pushed 2026-11-02, no release, 0 issues, CI test.yml, MIT, README 299 words, views 9, clones 25 | fleet-3 |
| Airdrop-Distribution | other | ARCHIVE | - | Rule A. Empty repo: a 2 word README ("# Airdrop-Distribution"), a LICENSE and a .gitignore, one "Initial commit". Last push 2021-08-29, no site link, no dependents. | push 2021-08-29, release none, 0 issues / 0 PRs, CI none, MIT (file + GitHub), README 2 words, 14d views 0 / clones 3 uniques, npm none, site no, profile no, dependents none | none |
| BitcoinWalletGenerator | other | ARCHIVE | - | Rule A, also C. A browser tool that takes a user chosen private key and a "wallet generator" label, abandoned since 2019-03-07. `npm install` fails today with a 404 on a pinned tarball. | push 2019-03-07, release none, 0 / 0, CI none, license none, README 196 words, 14d views 9 / clones 14 uniques, npm none (private package `walletgenerator`), site no, profile no, dependents none, 2 forks | none |
| BlockchainJS | other | ARCHIVE | - | Rule A. A 210 line toy chain that appears to be a copy of the public "naivechain" sample with no attribution or license. Last push 2019-02-21, no site link, no dependents. | push 2019-02-21, release none, 0 / 0, CI none, license none, README 109 words, 14d views 0 / clones 5 uniques, npm none (the name `blockchain` on npm belongs to another author), site no, profile no, dependents none | none |
| catalyst | other | ARCHIVE | - | Rule A. Last push 2022-02-28, not linked, no dependents; no license, one-sentence README, no CI, an unfinished voting MVP. | pushed 2022-02-28, default branch `master`, no release, 0 issues / 0 PR, CI none, no license file (GitHub: none), README 52 words, 14d 0 views, 8 clones / 5 unique, npm name `catalyst` in package.json belongs to another project (friendsoftheweb), no import from here, site no, profile no, dependents none | none |
| chatBox | other | ARCHIVE | - | Rule A. 2019 React 15 + Firebase chat tutorial app, `npm install` fails with ERESOLVE. Last push 2019-02-28, no site link; the only reference is image hotlinks from the sibling repo TheGreatCorner. | push 2019-02-28, release none, 0 / 0, CI none, license none, README 103 words, 14d views 0 / clones 5 uniques, npm none (private package), site no, profile no, dependents: image hotlinks only (see section) | none |
| check_entrypoint | other | ARCHIVE | - | Rule A (and C in part). Single-purpose issue-comment bot from Jan 2024, no activity since, and the workflow is outdated and injection-prone. | pushed 2024-01-25 (before 2025-05-17), no release, 1 open issue (the bot's own UI thread), 0 workflow runs ever, no license, README 213 words, views 0, clones 3; dependents none | none |
| codingtestinterview | other | ARCHIVE | - | Rule A. A company take-home test from 2019, last push 2019-02-07, not on site or profile, no dependents. | pushed 2019-02-07; no release; 0/0; no CI; no license; README 235 words; clones 3 uniques; private pkg "paymium"; site no; profile no; dependents none | none |
| Darkly | school-exercise | ARCHIVE | - | Rule A. 42 web-security project from 2018, last push 2018-12-19, not on site or profile, no dependents. | pushed 2018-12-19; no release; 0/0; no CI; no license; no README; clones 5 uniques; site no; profile no; dependents none | none |
| ERC-20 | school-exercise | ARCHIVE | - | Rule A. Last push 2021-11-29; a 13-line OpenZeppelin ERC20 wrapper with a default Hardhat task list as README, not linked, no dependents. | pushed 2021-11-29, no release, 0 issues / 0 PR, CI none, MIT, README 63 words, 14d 0 views, 3 clones / 2 unique, no npm, site no, profile no, dependents none | none |
| Filler | school-exercise | ARCHIVE | - | Rule A. 42 C project from 2017, last push 2017-04-03, not on site or profile, no dependents. Also fails to build on current clang. | pushed 2017-04-03; no release; 0/0; no CI; no license; no README; clones 4 uniques; site no; profile no; dependents none | none |
| flashloans | solidity-sample | ARCHIVE | - | Rule A. Unfinished Truffle flash loan sample (provider + user contract, empty `test/`, no README, no description, no license). Last push 2020-12-07, no site link, no dependents. | push 2020-12-07, release none, 0 / 0, CI none, license none, README none, 14d views 1 / clones 4 uniques, npm none (package.json name `flashloans`, not published), site no, profile no, dependents none | none |
| ft_ls | school-exercise | ARCHIVE | - | Rule A. 42 C project from 2017, last push 2017-06-28, not on site or profile, no dependents. Builds, but ships scratch files and a compiled binary. | pushed 2017-06-28; no release; 0/0; no CI; no license; no README; clones 4 uniques; site no; profile no; dependents none | none |
| ft_printf | school-exercise | ARCHIVE | - | Rule A. 42 C project from 2017, last push 2017-03-09, not on site or profile, no dependents. README is 6 lines. | pushed 2017-03-09; no release; 0/0; no CI; no license; README 32 words; clones 3 uniques; site no; profile no; dependents none | none |
| god-mode-token | solidity-sample | ARCHIVE | - | Rule A (weak). Last push 2023-01-20, not on site, no dependents found; it is a deliberate owner-can-move-anyone's-tokens backdoor token whose README says UNLICENSED while the repo is MIT, which weakens a trust profile. | pushed 2023-01-20, default branch `dev`, no release, 0 issues / 0 PR, CI none, MIT, README 664 words, 14d 2 views / 2 unique, 4 clones / 3 unique, no npm, site no, profile no, dependents none | none |
| huff-project | other | ARCHIVE | - | Rule B (A also true by date). Unmodified copy of the upstream huff-language/huff-project-template (README still carries upstream badges and links), one "Initial commit", no description, nothing of the owner's own. Successor: huff-language/huff-project-template (upstream). | pushed 2023-03-15, no release, 0 issues/PRs, no CI, Unlicense (file + GitHub), README 360 words, 14d views 0 / clones 4 (4 uniques), not on site, not in profile README, no dependents found locally | none |
| Lem_in | school-exercise | ARCHIVE | - | Rule A. 42 C project from 2017, last push 2017-04-21, not on site or profile, no dependents. Fails to build on current clang and ships binaries and scratch maps. | pushed 2017-04-21; no release; 0/0; no CI; no license; no README; clones 4 uniques; site no; profile no; dependents none | none |
| libft | school-exercise | ARCHIVE | - | Rule A. The oldest 42 exercise, last push 2016-10-22, not on site or profile, no dependents (other clones do not reference it; Filler and ft_printf embed their own libft copy). Committed a.out. | pushed 2016-10-22; no release; 0/0; no CI; no license; no README; clones 4 uniques; site no; profile no; dependents none | none |
| merkle-my-day | other | ARCHIVE | - | Rule A. Empty repo, README is only the title, one initial commit. | pushed 2024-08-13 (before 2025-05-17), no release, 0 issues, MIT file only, README 2 words, views 0, clones 3; dependents none | none |
| nft | solidity-sample | ARCHIVE | - | Rule B. Tree is byte-identical to solidity-boilerplate (diff -rq empty), still the Greeter sample, empty description, so the name promises an NFT project that does not exist. Successor: solidity-boilerplate. | pushed 2023-01-21, no release, 0 issues/PRs, no CI recorded, MIT, README 429 words, 14d views 1 / clones 4 (3 uniques), not on site, not in profile README | none |
| PiscineCPP | school-exercise | ARCHIVE | - | Rule A. 42 C++ piscine exercises from Jan 2019, last push 2019-01-13, not on site or profile, no dependents. Commits .idea and .DS_Store. | pushed 2019-01-13; no release; 0/0; no CI; no license; no README; clones 4 uniques; site no; profile no; dependents none | none |
| rush00 | school-exercise | ARCHIVE | - | Rule A. 42 PHP rush (shop site) from 2017, last push 2017-06-18, not on site or profile, no dependents. | pushed 2017-06-18; no release; 0/0; no CI; no license; no README; clones 4 uniques; site no; profile no; dependents none | none |
| solidity-challenges | solidity-sample | ARCHIVE | - | Rule B. Tree is byte-identical to solidity-boilerplate (diff -rq empty), still the Greeter sample, empty description, created and pushed the same day with one "Initial commit". Successor: solidity-boilerplate. | pushed 2023-03-03, no release, 0 issues/PRs, no CI recorded, MIT, README 429 words, 14d views 0 / clones 6 (5 uniques), not on site, not in profile README | none |
| TheGreatCorner | other | ARCHIVE | - | Rule A. 2019 React/Firebase LeBonCoin clone, last push 2019-03-06, not on site or profile, no dependents. README is half copied from another project (says "install chatBox"). | pushed 2019-03-06; no release; 0 issues/PRs; no CI; no license; README 277 words; views 0, clones 3-4 uniques; no npm (private pkg "TheGoodCorner"); site no; profile no; dependents none | none |
| TradingBot | other | ARCHIVE | - | Rule A. An unfinished hiring-test bot from 2021 whose README is the task brief. Last push 2021-02-01, no site link, no dependents. | push 2021-02-01, release none, 0 / 0, CI none, license none, README 205 words, 14d views 3 / clones 14 uniques, npm none, site no, profile no, dependents none, 18 forks | none |

## Archive log

Each repo got a first README line that says why, then `gh repo archive`. To undo one: `gh repo unarchive Aboudjem/<repo>`.

| Repo | Archived on | Notice commit | Re-check |
| --- | --- | --- | --- |
| Airdrop-Distribution | 2026-11-17 | 6638ac4 | confirmed by a second agent from primary sources |
| BitcoinWalletGenerator | 2026-11-17 | 897b23f | confirmed by a second agent from primary sources |
| BlockchainJS | 2026-11-17 | ab955cf | confirmed by a second agent from primary sources |
| catalyst | 2026-11-17 | 6a2bed1 | confirmed by a second agent from primary sources |
| chatBox | 2026-11-17 | 41f8676 | confirmed by a second agent from primary sources |
| check_entrypoint | 2026-11-17 | e413dc0 | confirmed by a second agent from primary sources |
| codingtestinterview | 2026-11-17 | 3e64e2b | confirmed by a second agent from primary sources |
| Darkly | 2026-11-17 | 0a6bd40 | confirmed by a second agent from primary sources |
| ERC-20 | 2026-11-17 | 52b58f6 | confirmed by a second agent from primary sources |
| Filler | 2026-11-17 | 40de0ff | confirmed by a second agent from primary sources |
| flashloans | 2026-11-17 | f93bbeb | confirmed by a second agent from primary sources |
| ft_ls | 2026-11-17 | 314c277 | confirmed by a second agent from primary sources |
| ft_printf | 2026-11-17 | ae3bb5d | confirmed by a second agent from primary sources |
| god-mode-token | 2026-11-17 | 5605250 | confirmed by a second agent from primary sources |
| huff-project | 2026-11-17 | 1d096f9 | confirmed by a second agent from primary sources |
| Lem_in | 2026-11-17 | c002be5 | confirmed by a second agent from primary sources |
| libft | 2026-11-17 | b5012bf | confirmed by a second agent from primary sources |
| merkle-my-day | 2026-11-17 | b9fb40c | confirmed by a second agent from primary sources |
| nft | 2026-11-17 | dc3caf9 | confirmed by a second agent from primary sources |
| PiscineCPP | 2026-11-17 | 9e89f4c | confirmed by a second agent from primary sources |
| rush00 | 2026-11-17 | cb7fc49 | confirmed by a second agent from primary sources |
| solidity-challenges | 2026-11-17 | 7c62322 | confirmed by a second agent from primary sources |
| TheGreatCorner | 2026-11-17 | 0a524c1 | confirmed by a second agent from primary sources |
| TradingBot | 2026-11-17 | c818e36 | confirmed by a second agent from primary sources |

## Decisions taken while merging

- The live list has 54 public non-fork repos. The brief expected 32.
- `mastering-claw` is on the site, so its verdict is `KEEP-UPGRADE`.
- `ERC-3643` is not on the site. It is kept: recent pushes, real dependents, a link from the profile. It should join the site.
- `modules`, `bonding-curve-token`, `simple-sale-token` and `staking-platform-fixed-apy` are old. They stay `KEEP-TIDY` because the rule says so when unsure.
- `god-mode-token` duplicates a contract of `modules`. Rules A and B both hold, so it is archived.
- Public forks (82) are out of scope.

## Open points for the owner

- Some archived repos hold content that an archive does not hide. The list is in a local file, `.goal/fleet/needs-approval.md`.
- `npm whoami` fails on this machine. Nothing was published to npm in this run.
- The site returned 404 for `https://adam-boudjemaa.com/tools/<slug>` on 2026-11-17. Check D4 fails until those pages are live.
- `QUALITY-BAR.md` item 6 asks for a stars badge. The fleet standard forbids it. Run fleet-2 updates the quality bar.
- The MCP registry lists `sniff` and `ui-ux-suite` two releases behind npm. Run fleet-2 republishes them.

## Private repos

The account has 76 private repos. None was changed. Their names and purposes are kept in a local file,
`.goal/fleet/private-repos.md`, which is not committed. This repo is public, and a private repo name is not public information.

Public forks are out of scope and were not touched.
