# Security Policy

10x is a **plugin marketplace**, a curated hub, not a tool that runs your code. This repo ships the
marketplace manifest (`.claude-plugin/marketplace.json`), the quality bar, documentation, and static
assets. It contains no executable runtime and collects no data.

## Scope

This security policy covers **the marketplace itself**:

- The marketplace manifest (`.claude-plugin/marketplace.json`), for example a plugin entry that
  points to the wrong repository, a tampered or unexpected source, or a version pin that does not
  match the upstream plugin repo.
- The repository's links and documentation, for example a link that resolves to a repo other than
  the named `Aboudjem/<plugin>`.
- Anything in this repo that could leak a secret, key, or credential (there should be none).

**Out of scope: vulnerabilities inside an individual plugin.** Each plugin lives in its own
repository and has its own security policy. Report plugin-specific issues there:

- `sniff` → https://github.com/Aboudjem/sniff
- `ui-ux-suite` → https://github.com/Aboudjem/ui-ux-suite
- `recap-studio` → https://github.com/Aboudjem/recap-studio
- `aws-cost-audit` → https://github.com/Aboudjem/aws-cost-audit-skill
- `goalify` → https://github.com/Aboudjem/goalify
- `humanizer` → https://github.com/Aboudjem/humanizer-skill
- `loopify` → https://github.com/Aboudjem/loopify

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Email **adam@integralayer.com** with:

- A description of the issue and its impact.
- Steps to reproduce.

You will get a response within 48 hours. Once a fix is ready, the issue will be disclosed
responsibly with credit to the reporter if wanted.

## What you can rely on

- The marketplace manifest lists only plugins authored or vetted by the maintainer, installed from
  their own `Aboudjem/<repo>` GitHub source.
- This repo has no telemetry, no analytics, and no runtime network calls; it is a manifest plus
  docs and static assets.
- CI (`.github/workflows/validate.yml`) validates that the manifest is valid JSON, checks that every
  version pin matches the upstream plugin repo (`scripts/sync-plugins.mjs --check`), and scans tracked
  files for secrets on every push and pull request.
