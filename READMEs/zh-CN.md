<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x: curated Claude Code plugins that ship quality" src="../.github/assets/hero-banner-light.svg" width="100%">
</picture>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-00D4FF?style=flat-square" alt="License MIT"></a>
  <a href="https://github.com/Aboudjem/10x/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aboudjem/10x/validate.yml?branch=main&style=flat-square&color=7C3AED&label=validate" alt="validate workflow status"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=FF2D78" alt="GitHub stars"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <b>简体中文</b> ·
  <a href="ja.md">日本語</a> ·
  <a href="es.md">Español</a> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>插件市场是一份你的编辑器可以从中安装的清单。这个市场收录了面向 Claude Code 的七款开发者工具，你只需要添加一次。</b></p>

<p align="center">
  <a href="#install">安装</a> ·
  <a href="#the-plugins">插件</a> ·
  <a href="#what-each-one-does">各插件的功能</a> ·
  <a href="#works-with-any-ai-editor">适配任意 AI 编辑器</a> ·
  <a href="#the-10x-bar">10x 标准</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

<a id="install"></a>
## 安装

把市场添加一次。之后 Claude Code 就能按名称安装这七款插件中的任意一款。

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

把 `sniff` 换成下表中的任意名称即可。在 Claude Code 之外，同样的技能也可以通过
[Vercel skills CLI](https://github.com/vercel-labs/skills) 安装，它会把这些技能安装到你的智能体读取的目录中：

```bash
npx skills add Aboudjem/sniff
```

<a id="the-plugins"></a>
## 插件

| | 插件 | 用途 | 安装方式 | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **sniff** | 遍历你正在运行的应用，发现真实存在的 bug | `claude plugin install sniff@10x` | [仓库](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **ui-ux-suite** | 面向设计的 ESLint：具体到行、具体到值、给出修复方法 | `claude plugin install ui-ux-suite@10x` | [仓库](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **recap-studio** | 把一个主题或一次会话变成一份离线 HTML 讲解页 | `claude plugin install recap-studio@10x` | [仓库](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-512.png" width="28" alt=""> | **aws-cost-audit** | 对照实时 AWS 价格审计你的 AWS 账单 | `claude plugin install aws-cost-audit@10x` | [仓库](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-512.png" width="28" alt=""> | **goalify** | 为一项庞大的任务准备好自主运行所需的材料 | `claude plugin install goalify@10x` | [仓库](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **humanizer** | 指出 55 种 AI 写作习惯，并加以改写 | `claude plugin install humanizer@10x` | [仓库](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-512.png" width="28" alt=""> | **loopify** | 为 Claude Code 的 `/loop` 命令准备一项重复性任务 | `claude plugin install loopify@10x` | [仓库](https://github.com/Aboudjem/loopify) |

<a id="what-each-one-does"></a>
## 各插件的功能

### sniff

把它指向你正在运行的应用，它会在真实浏览器里点击你的真实使用流程，然后告诉你哪里坏了，以及导致问题发生的按顺序排列的步骤。

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

### ui-ux-suite

它会读取你的 CSS、JSX、HTML 和 Tailwind 类名，并指出具体文件、具体行、实测的错误数值，以及确切的修复方法。它只做审计，从不修改代码。

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

### recap-studio

它会把一个主题或一次编程会话变成一个可以双击打开的 HTML 文件，所有样式都内联在文件里，不发起任何外部请求，离线状态下大约五分钟就能读完。

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [架构文档](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

### aws-cost-audit

它会通过你机器上已有的 AWS CLI 读取你真实的 AWS 账户，交给你一份节省方案，其中每一个价格都是实时查证的，绝不是凭记忆给出的。

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

### goalify

对于大到没法坐在旁边盯着看的任务，它会写出 brief（一个文件，记录这次运行要完成什么）和 condition（一行文字，你把它粘贴进 `/goal`），这样一个全新的会话就能完成这项工作，并在收尾时引用通过的检查项，作为完成的证明。

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

### humanizer

它会指出 55 种让文字读起来像机器写的习惯，用 0 到 100 的量表给你的文本打分，衡量其中带有多少这类习惯，并按你选定的语气重写文本。

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

### loopify

对于不断重复而非一次性完成的任务，它会写出 brief，以及你粘贴进 `/loop`（Claude Code 内置的重复执行命令）的那一行文字，其中带有执行次数上限和停止规则。每次执行都会把它做了什么记录下来。

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

<a id="works-with-any-ai-editor"></a>
## 适配任意 AI 编辑器

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

这里的每一款插件都以技能的形式发布（技能即你的智能体读取的 Markdown 文件）。这就是为什么这七款插件都可以在 Claude Code 之外通过 `npx skills add` 安装，该命令自己的 README 列出了 77 个受支持的智能体。其中三款同时也是命令行工具。sniff 和 ui-ux-suite 各自可以直接从 npm 作为独立的 MCP 服务器运行，MCP 是编辑器用来连接外部工具所使用的协议。recap-studio 也提供了 MCP 服务器，但需要先克隆仓库、完成工作区构建之后才能运行。其余四款则只有技能形式。

| 智能体 | 一行安装命令 |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor、Codex、Copilot、Gemini CLI，以及[70 多种其他智能体](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| 任意 MCP 客户端（sniff、ui-ux-suite） | `npx sniff-qa --mcp`、`npx ui-ux-suite --mcp` |
| 其他情况 | 参见插件自身仓库中的 `docs/editors.md` |

<a id="the-10x-bar"></a>
## 10x 标准

| | |
|---|---|
| **默认精简** | 不携带插件用不到的依赖。sniff 需要驱动真实浏览器，所以它包含 Playwright 和 Lighthouse；其余插件不带任何这类依赖。 |
| **一条命令安装** | 不需要配置文件，不需要注册，开始使用也不需要 API key。 |
| **真实的测试** | CI 断言的是行为，而不是某个文件是否存在。 |
| **可在 Claude Code 之外运行** | 通过 `npx skills add` 安装进[70 多种智能体](https://github.com/vercel-labs/skills#supported-agents)。 |
| **持续维护** | 本季度有发布记录，不是去年就已归档的项目。 |
| **无遥测** | 没有数据分析，也不会回传任何信息。每个工具只会与你指定的目标通信。 |

这里列出的每一款插件都满足这套标准。一旦某款插件不再满足，就会被移除。完整的检查清单，连同插件名单和最近一次验证日期，都在 [QUALITY-BAR.md](../QUALITY-BAR.md) 中。

## 参与贡献

有插件觉得该收录进来？[CONTRIBUTING.md](../CONTRIBUTING.md) 中有提案步骤。
一个自动化工作流会从每个插件自己的仓库同步所有版本号；[docs/SYNC.md](../docs/SYNC.md) 说明了这条链路。

<p align="center">
  <sub>由 <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> 制作 · MIT 许可证 · 无遥测，不收集数据</sub>
</p>

本翻译由机器辅助完成，如有出入，请以英文版 README（../README.md）为准。
