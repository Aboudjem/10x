# 10x

10x developer tools for Claude Code. Curated plugins that ship quality.

## Install

```bash
claude plugin marketplace add Aboudjem/10x
```

Then install any plugin:

```bash
claude plugin install sniff@10x
claude plugin install ui-ux-suite@10x
```

## Plugins

### sniff

AI-powered QA testing. Scans source code for bugs, checks accessibility, visual regression, and performance. Auto-detects your dev server. No config needed.

**Commands:** `/sniff` `/sniff-fix` `/sniff-report`

[GitHub](https://github.com/Aboudjem/sniff) | [npm](https://www.npmjs.com/package/sniff-qa)

### ui-ux-suite

Design audit tool. Scores projects across 12 dimensions: color contrast, typography, accessibility, layout, and more. WCAG 2.1, APCA, and OKLCH color science. Zero dependencies.

**Commands:** `/design-audit` `/color-audit` `/type-audit` `/layout-audit` `/a11y-audit` and 9 more

[GitHub](https://github.com/Aboudjem/ui-ux-suite) | [npm](https://www.npmjs.com/package/ui-ux-suite)

## Other editors

These tools also work as MCP servers with any AI editor:

```bash
# Cursor, VS Code, Codex, Gemini, Windsurf, Continue.dev
npx sniff-qa --mcp
npx ui-ux-suite --mcp
```

See each project's README for editor-specific setup.

---

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-333?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
</p>

<p align="center">
  <sub>Built by <a href="https://github.com/Aboudjem">Adam Boudjemaa</a></sub>
</p>
