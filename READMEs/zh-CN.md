<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x：九款智能体工具，每款都有证明。三个亮点：按名字安装，每款工具都有证明，限制写得清楚。两条安装命令，以及九款工具标志组成的 3 乘 3 方格，每个标志下面写着它的第一个好处。" src="../.github/assets/hero-banner-light.svg" width="100%">
</picture>

<p align="center">
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-00D4FF?style=flat-square" alt="License MIT"></a>
  <a href="https://github.com/Aboudjem/10x/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/Aboudjem/10x/validate.yml?branch=main&style=flat-square&color=7C3AED&label=validate" alt="validate workflow status"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <b>简体中文</b> ·
  <a href="ja.md">日本語</a> ·
  <a href="es.md">Español</a> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>九款智能体工具，从一份清单安装，每款都有证明。</b></p>

<p align="center">
  <a href="#the-plugins">插件</a> ·
  <a href="#install">安装</a> ·
  <a href="#how-it-works">工作原理</a> ·
  <a href="#proof">证明</a> ·
  <a href="#faq">常见问题</a> ·
  <a href="#limits">限制</a>
</p>

把清单添加一次，之后就能按名字安装任意一款工具。

| 按名字安装 | 每款工具都有证明 | 限制写得清楚 |
|:--|:--|:--|
| `npm run validate` 会输出 `Marketplace has 9 valid plugin(s)`。 | 每个插件的 README 都有 Proof 一节，里面的命令你可以重新运行。 | 每个插件的 README 都有 Limits 一节，说明它做不到什么。 |

**适用于：** Claude Code，以及通过 `npx skills` 支持的 70 多个其他智能体。
其中三款工具还能作为 MCP 服务器运行。MCP 是智能体调用工具的标准方式。
没有哪款工具绑定某一个模型：技能就是普通的 Markdown 文件。

```bash
# Any agent: install one tool for all your projects
npx skills add Aboudjem/humanizer-skill -g
# Claude Code: add the list once, then install by name
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

这两条 Claude Code 命令会输出的内容（真实运行，2026-11-17）：

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

- **它是什么：** 一份给编码智能体用的九款工具清单。
- **什么时候用：** 你有一件具体的事要做，比如找 bug 或削减 AWS 成本。
- **你能得到什么：** 每款工具一条安装命令，以及一份写明证明和限制的 README。

10x 只列出插件。每个插件都以你的权限运行，所以请先看它的仓库。

<a id="the-plugins"></a>

## 插件

| | 插件 | 一句话 | 亮点 |
|:-:|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**sniff**](https://github.com/Aboudjem/sniff) | 在用户发现之前，抓出你的 Web 应用里坏掉的页面。 | 在用户之前抓到 bug · 复现步骤 · 拦住有问题的合并 |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**ui-ux-suite**](https://github.com/Aboudjem/ui-ux-suite) | 按行号指出设计问题，每个都附准确的修法。 | 精确到要改的行 · 引用 WCAG 规则 · 给出修复值 |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**recap-studio**](https://github.com/Aboudjem/recap-studio) | 看懂改了什么，做成一页可以发出去的页面。 | 看懂做了什么 · 一页可发送 · 发送前已检查 |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**aws-cost-audit**](https://github.com/Aboudjem/aws-cost-audit-skill) | 找出你的 AWS 账单上可以不再付费的部分。 | 更低的 AWS 账单 · 价格对照 AWS 核实 · 改动前先备好回滚 |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**goalify**](https://github.com/Aboudjem/goalify) | 给智能体一个大任务，拿回证明。 | 问题只问一次 · 计划存成文件 · 完成有证明 |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | [**humanizer**](https://github.com/Aboudjem/humanizer-skill) | 看清草稿为何像 AI 写的，再改掉。 | 知道是哪些词 · 读起来更像人写的 · 事实保持不变 |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**loopify**](https://github.com/Aboudjem/loopify) | 用一行检查重复运行的智能体任务。 | 不用盯着 · 更少卡住的 tick · 自己会停 |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**secure-my-app**](https://github.com/Aboudjem/secure-my-app) | 找出陌生人能从你的应用拿走什么。 | 修复证明已堵上 · 每个漏洞都有证明 · 没有意外改动 |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | [**contextify**](https://github.com/Aboudjem/contextify) | 给你的智能体一份 AGENTS.md，检查不耗 token。 | 节省时间 · 保留上下文 · 节省 token |

每一句话和每个亮点都来自该工具自己的 README。[各插件的功能](#what-each-one-does)给出了证明。

<a id="install"></a>

## 安装

**推荐：Vercel skills CLI。** `npx skills` 是 Vercel 的智能体技能开源安装器。
一条命令就能为你的所有项目安装一款工具：

```bash
npx skills add Aboudjem/sniff -g
```

支持 70 多个智能体：在菜单里选你用的那个（[支持的智能体](https://github.com/vercel-labs/skills#supported-agents)）。
在终端里它会显示智能体菜单。在脚本里它会装进每个智能体的目录，所以要在那里加上 `-a <agent>`。
只装在当前项目：去掉 `-g`。

请使用工具自己的仓库名，而不是 `Aboudjem/10x`。这个仓库只是清单，本身不含任何技能。

| 工具 | 命令 | 页面 |
|:--|:--|:--|
| sniff | `npx skills add Aboudjem/sniff -g` | [skills.sh](https://skills.sh/aboudjem/sniff) |
| ui-ux-suite | `npx skills add Aboudjem/ui-ux-suite -g` | [skills.sh](https://skills.sh/aboudjem/ui-ux-suite) |
| recap-studio | `npx skills add Aboudjem/recap-studio -g` | [skills.sh](https://skills.sh/aboudjem/recap-studio) |
| aws-cost-audit | `npx skills add Aboudjem/aws-cost-audit-skill -g` | [skills.sh](https://skills.sh/aboudjem/aws-cost-audit-skill) |
| goalify | `npx skills add Aboudjem/goalify -g` | [skills.sh](https://skills.sh/aboudjem/goalify) |
| humanizer | `npx skills add Aboudjem/humanizer-skill -g` | [skills.sh](https://skills.sh/aboudjem/humanizer-skill) |
| loopify | `npx skills add Aboudjem/loopify -g` | [skills.sh](https://skills.sh/aboudjem/loopify) |
| secure-my-app | `npx skills add Aboudjem/secure-my-app -g` | [skills.sh](https://skills.sh/aboudjem/secure-my-app) |
| contextify | `npx skills add Aboudjem/contextify -g` | [skills.sh](https://skills.sh/aboudjem/contextify) |

它只安装技能。三个 MCP 服务器要另外一步，也只要一行：见 [MCP servers](#mcp-servers)。

**或者直接装进某一个智能体。** 每条命令都会为你的所有项目安装。

<a href="#claude-code"><img alt="Claude Code" height="24" src="https://img.shields.io/badge/Claude_Code-D97757?style=flat-square&logo=claude&logoColor=white"></a> <a href="#codex"><img alt="Codex" height="24" src="https://img.shields.io/badge/Codex-000000?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHRpdGxlPk9wZW5BSTwvdGl0bGU%2BPHBhdGggZD0iTTIyLjI4MTkgOS44MjExYTUuOTg0NyA1Ljk4NDcgMCAwIDAtLjUxNTctNC45MTA4IDYuMDQ2MiA2LjA0NjIgMCAwIDAtNi41MDk4LTIuOUE2LjA2NTEgNi4wNjUxIDAgMCAwIDQuOTgwNyA0LjE4MThhNS45ODQ3IDUuOTg0NyAwIDAgMC0zLjk5NzcgMi45IDYuMDQ2MiA2LjA0NjIgMCAwIDAgLjc0MjcgNy4wOTY2IDUuOTggNS45OCAwIDAgMCAuNTExIDQuOTEwNyA2LjA1MSA2LjA1MSAwIDAgMCA2LjUxNDYgMi45MDAxQTUuOTg0NyA1Ljk4NDcgMCAwIDAgMTMuMjU5OSAyNGE2LjA1NTcgNi4wNTU3IDAgMCAwIDUuNzcxOC00LjIwNTggNS45ODk0IDUuOTg5NCAwIDAgMCAzLjk5NzctMi45MDAxIDYuMDU1NyA2LjA1NTcgMCAwIDAtLjc0NzUtNy4wNzI5em0tOS4wMjIgMTIuNjA4MWE0LjQ3NTUgNC40NzU1IDAgMCAxLTIuODc2NC0xLjA0MDhsLjE0MTktLjA4MDQgNC43NzgzLTIuNzU4MmEuNzk0OC43OTQ4IDAgMCAwIC4zOTI3LS42ODEzdi02LjczNjlsMi4wMiAxLjE2ODZhLjA3MS4wNzEgMCAwIDEgLjAzOC4wNTJ2NS41ODI2YTQuNTA0IDQuNTA0IDAgMCAxLTQuNDk0NSA0LjQ5NDR6bS05LjY2MDctNC4xMjU0YTQuNDcwOCA0LjQ3MDggMCAwIDEtLjUzNDYtMy4wMTM3bC4xNDIuMDg1MiA0Ljc4MyAyLjc1ODJhLjc3MTIuNzcxMiAwIDAgMCAuNzgwNiAwbDUuODQyOC0zLjM2ODV2Mi4zMzI0YS4wODA0LjA4MDQgMCAwIDEtLjAzMzIuMDYxNUw5Ljc0IDE5Ljk1MDJhNC40OTkyIDQuNDk5MiAwIDAgMS02LjE0MDgtMS42NDY0ek0yLjM0MDggNy44OTU2YTQuNDg1IDQuNDg1IDAgMCAxIDIuMzY1NS0xLjk3MjhWMTEuNmEuNzY2NC43NjY0IDAgMCAwIC4zODc5LjY3NjVsNS44MTQ0IDMuMzU0My0yLjAyMDEgMS4xNjg1YS4wNzU3LjA3NTcgMCAwIDEtLjA3MSAwbC00LjgzMDMtMi43ODY1QTQuNTA0IDQuNTA0IDAgMCAxIDIuMzQwOCA3Ljg3MnptMTYuNTk2MyAzLjg1NThMMTMuMTAzOCA4LjM2NCAxNS4xMTkyIDcuMmEuMDc1Ny4wNzU3IDAgMCAxIC4wNzEgMGw0LjgzMDMgMi43OTEzYTQuNDk0NCA0LjQ5NDQgMCAwIDEtLjY3NjUgOC4xMDQydi01LjY3NzJhLjc5Ljc5IDAgMCAwLS40MDctLjY2N3ptMi4wMTA3LTMuMDIzMWwtLjE0Mi0uMDg1Mi00Ljc3MzUtMi43ODE4YS43NzU5Ljc3NTkgMCAwIDAtLjc4NTQgMEw5LjQwOSA5LjIyOTdWNi44OTc0YS4wNjYyLjA2NjIgMCAwIDEgLjAyODQtLjA2MTVsNC44MzAzLTIuNzg2NmE0LjQ5OTIgNC40OTkyIDAgMCAxIDYuNjgwMiA0LjY2ek04LjMwNjUgMTIuODYzbC0yLjAyLTEuMTYzOGEuMDgwNC4wODA0IDAgMCAxLS4wMzgtLjA1NjdWNi4wNzQyYTQuNDk5MiA0LjQ5OTIgMCAwIDEgNy4zNzU3LTMuNDUzN2wtLjE0Mi4wODA1TDguNzA0IDUuNDU5YS43OTQ4Ljc5NDggMCAwIDAtLjM5MjcuNjgxM3ptMS4wOTc2LTIuMzY1NGwyLjYwMi0xLjQ5OTggMi42MDY5IDEuNDk5OHYyLjk5OTRsLTIuNTk3NCAxLjQ5OTctMi42MDY3LTEuNDk5N1oiLz48L3N2Zz4%3D"></a> <a href="#cursor"><img alt="Cursor" height="24" src="https://img.shields.io/badge/Cursor-000000?style=flat-square&logo=cursor&logoColor=white"></a> <a href="#gemini-cli"><img alt="Gemini CLI" height="24" src="https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white"></a> <a href="#github-copilot"><img alt="GitHub Copilot" height="24" src="https://img.shields.io/badge/Copilot-24292F?style=flat-square&logo=githubcopilot&logoColor=white"></a> <a href="#opencode"><img alt="OpenCode" height="24" src="https://img.shields.io/badge/OpenCode-333333?style=flat-square&logo=opencode&logoColor=white"></a> <a href="https://skills.sh/aboudjem"><img alt="skills.sh" height="24" src="https://img.shields.io/badge/skills.sh-000000?style=flat-square&logo=vercel&logoColor=white"></a>

把 `<repo>` 换成上表中的一个仓库名。
2026-11-17 在空的主目录中测试过，九款工具都能安装。

#### Claude Code

```bash
npx skills add Aboudjem/<repo> -g -a claude-code
```

#### Codex

```bash
npx skills add Aboudjem/<repo> -g -a codex
```

#### Cursor

```bash
npx skills add Aboudjem/<repo> -g -a cursor
```

#### Gemini CLI

```bash
npx skills add Aboudjem/<repo> -g -a gemini-cli
```

#### GitHub Copilot

```bash
npx skills add Aboudjem/<repo> -g -a github-copilot
```

#### OpenCode

```bash
npx skills add Aboudjem/<repo> -g -a opencode
```

**Claude Code 插件。** 把清单添加一次，之后按名字安装。
对其中三款工具，插件带来的比技能更多：

- sniff：MCP 服务器。
- ui-ux-suite：5 个斜杠命令、12 个智能体和 MCP 服务器。
- recap-studio：13 个智能体、安全钩子和 MCP 服务器。

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

把 `sniff` 换成 [插件](#the-plugins) 表中的任意名称。
Claude Code 插件按用户安装，所以在你的所有项目里都能用。

### MCP servers

MCP 是智能体调用工具的标准方式。有三款工具带 MCP 服务器：

```bash
npx sniff-qa --mcp
npx ui-ux-suite --mcp
npx -y github:Aboudjem/recap-studio mcp
```

每个仓库的 `docs/editors.md` 说明了如何把服务器添加到你的编辑器。其余六款不带 MCP 服务器。

<a id="what-each-one-does"></a>

## 各插件的功能

#### sniff

**在用户发现之前，抓出你的 Web 应用里坏掉的页面。**

- **在用户之前抓到 bug。** 21 个预埋 bug 全部找到，误报为 0：`npm run build && npm run proof`。
- **复现步骤。** 每个页面 bug 都附带路由、复现步骤和修复建议。
- **拦住有问题的合并。** `--fail-on` 在出现 critical 或 high 级别 bug 时以退出码 1 结束，CI 会因此拦住合并。

限制：请指向开发或预发布环境的应用。遍历时会点击按钮并提交真实表单。

```bash
npx sniff-qa --url http://localhost:3000
npx skills add Aboudjem/sniff -g
claude plugin install sniff@10x
```

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

**按行号指出设计问题，每个都附准确的修法。**

- **精确到要改的行。** 测试应用上有 46 个定位到的问题，每个都有文件和行号。
- **引用 WCAG 规则。** 对比度按 WCAG 2.2 测量。每个问题都引用一条 WCAG 规则或 UX 定律。
- **给出修复值。** 每个问题都写出实测值和改法，比如 `#fbfbfb` 改为 `#767676`。

限制：它读的是源码，不是像素，也从不修改你的代码。

```bash
npx ui-ux-suite .
npx skills add Aboudjem/ui-ux-suite -g
claude plugin install ui-ux-suite@10x
```

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

**看懂改了什么，做成一页可以发出去的页面。**

- **看懂做了什么。** `/recap session` 读取你的 git diff 和提交，然后写成一页。
- **一页可发送。** 一个 HTML 文件，0 个 script 标签，CSS 全部内联。演示会把这两项都打印出来。
- **发送前已检查。** 七项检查在不用模型的情况下给页面打分。`--fail-under 8` 会拒绝质量差的页面。

限制：分数检查的是结构，不是真假，所以分享前请先读来源。

```bash
npx -y github:Aboudjem/recap-studio demo
npx skills add Aboudjem/recap-studio -g
claude plugin install recap-studio@10x
```

[GitHub](https://github.com/Aboudjem/recap-studio) · [架构文档](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

**找出你的 AWS 账单上可以不再付费的部分。**

- **更低的 AWS 账单。** 每份报告先给出以美元计的结论，再给出最先要做的三项削减。
- **价格对照 AWS 核实。** 每个价格都记录了它的 AWS 查询。没有查询记录的数字，`make test` 会拒绝。
- **改动前先备好回滚。** 脚本默认只做演练。`--apply` 会先保存回滚文件，再询问，除非加 `--yes`。

限制：它需要 AWS CLI v2、bash 和 `jq`，并且要开启 Cost Explorer。

```bash
npx skills add Aboudjem/aws-cost-audit-skill -g
claude plugin install aws-cost-audit@10x
```

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

**给智能体一个大任务，拿回证明。**

- **问题只问一次。** 所有问题都放在最前面，只问一次。答案记在 brief 的 "Decisions" 下。
- **计划存成文件。** 运行时会重新读取 brief 文件，所以可以在干净的对话里开始。
- **完成有证明。** `/goalify verify` 重新运行你的测试：`make demo` 为 VERIFIED，`--broken` 为 NOT VERIFIED。

限制：停下来的运行不一定已完成，它也可能停在权限确认上。

```bash
npx skills add Aboudjem/goalify -g
claude plugin install goalify@10x
```

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

**看清草稿为何像 AI 写的，再改掉。**

- **知道是哪些词。** 它会引用每个听起来像 AI 的词。CLI 把它们排进 "Fix first" 清单。
- **读起来更像人写的。** 自带的示例从 57 分降到 6 分（满分 100）。分数越低越像人写的。
- **事实保持不变。** CLI 的 `compare --check-facts` 会让丢了数字、日期、版本或 URL 的改写失败。

限制：它不是 AI 检测器，也不保证能通过检测器。

```bash
npx skills add Aboudjem/humanizer-skill -g
claude plugin install humanizer@10x
```

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

**用一行检查重复运行的智能体任务。**

- **不用盯着。** `loop_status.py` 会打印六种结论之一，然后最多给出三件要做的事。
- **更少卡住的 tick。** loopify 会先打印需要放行的命令，比如 `gh pr view`。一个 tick 就是任务运行一次。
- **自己会停。** 那一行带着停止规则。每个 `/loop` 在 7 天后结束。

限制：循环活在你打开的会话里。关掉终端，它就停了。

```bash
npx skills add Aboudjem/loopify -g
claude plugin install loopify@10x
```

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

**找出陌生人能从你的应用拿走什么。**

- **修复证明已堵上。** 只有当它的 VERIFY 输出发生变化，修复才算数。全部 11 个示例问题都有这一项。
- **每个漏洞都有证明。** 每个问题都附上证明。`make test` 会重放全部 11 个示例问题背后的证明。
- **没有意外改动。** 它写完报告就停下。每个修复都要等你说可以。

限制：它不是渗透测试（由专家进行的付费攻击测试）。

```bash
npx skills add Aboudjem/secure-my-app -g
claude plugin install secure-my-app@10x
```

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**给你的智能体一份 AGENTS.md，检查不耗 token。**

- **节省时间。** 提示会指出文件、行号和缺失的命令。
- **保留上下文。** 一份文件，按仓库大小分为 20、40 或 60 行。`CLAUDE.md` 的指引是 4 行。
- **节省 token。** 检查失效行用的是本地脚本。它不调用模型，所以花费 0 个 token。

限制：它检查命令是否存在，不运行这个命令。

```bash
npx skills add Aboudjem/contextify -g
claude plugin install contextify@10x
```

[GitHub](https://github.com/Aboudjem/contextify)

<a id="how-it-works"></a>

## 工作原理

10x 就是一个文件：[`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json)。其中不含任何插件代码。

1. 每个条目写明一个插件、它的 GitHub 仓库，以及这里列出的版本。
2. `claude plugin marketplace add Aboudjem/10x` 会克隆这个仓库并读取该文件。
3. `claude plugin install <name>@10x` 会从插件自己的仓库获取插件。
4. 一个定时任务会重新读取每个插件仓库并更新版本号。[docs/SYNC.md](../docs/SYNC.md) 说明了这条链路。

`npx skills` 这条路径不经过这个文件。它直接把技能从工具自己的仓库复制到你的智能体目录。

### 其他智能体

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf and Continue, and more through the skills CLI. Three plugins also run as MCP servers." width="100%">
</p>

这里的每个插件都以技能的形式发布，也就是你的智能体会读取的 Markdown 文件。
所以九款工具都能通过 `npx skills add` 装到 Claude Code 之外。

| 智能体 | 一行安装命令 |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor、Codex、Copilot、Gemini CLI，以及[列表中的其余智能体](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo> -g` |
| 任意 MCP 客户端 | `npx sniff-qa --mcp`、`npx ui-ux-suite --mcp`、`npx -y github:Aboudjem/recap-studio mcp` |
| 其他情况 | 参见插件自身仓库中的 `docs/editors.md` |

<a id="proof"></a>

## 证明

下面每一项说法都附带能打印出它的命令。请在这个仓库的克隆目录中运行。

| 说法 | 命令 | 在输出中要找的那一行 |
|:--|:--|:--|
| 清单中有九款有效插件 | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| 列出的每个版本都与插件自己的仓库一致 | `npm run sync:check` | `drift: none`（如果某个仓库读不到，它会打印 `unverified: <n> of 9 ...` 并以退出码 1 结束） |
| 清单文件能在 Claude Code 中加载 | `claude plugin validate . --strict` | `✔ Validation passed` |
| 仓库自身的测试全部通过 | `npm test` | `# fail 0` |

CI（GitHub 上的自动检查）会在每次 push 和每个 pull request 上运行这四项。它还会检查每个链接并扫描密钥。

### 10x 标准

| | |
|---|---|
| **默认精简** | 不携带插件用不到的依赖。ui-ux-suite 和另外六款技能不带任何依赖。recap-studio 的各个包依赖 zod，它的 web 应用依赖 Next 和 React。sniff 只依赖 `zod`，浏览器引擎和 Chromium 在首次使用时下载（约 440 MB）。 |
| **一条命令安装** | 不需要配置文件，也不需要注册。aws-cost-audit 是唯一需要你可能还没有的访问权限的插件：一个配置好、可以读取账户的 AWS CLI。 |
| **真实的测试** | CI 检查的是行为，而不只是某个文件是否存在。 |
| **可在 Claude Code 之外运行** | 通过 `npx skills add` 安装到其他智能体中。 |
| **持续维护** | 本季度有发布记录，不是去年就已归档的项目。 |
| **无遥测** | 没有数据分析，也不会回传任何信息。网络请求只为完成任务服务，例如 sniff 下载浏览器，以及检查你页面上的外部链接。 |

这里列出的每个插件都要接受这套标准的约束。一旦某个插件不再达标，就会被移除。
完整的检查清单、插件名单和最近一次验证日期，都在 [QUALITY-BAR.md](../QUALITY-BAR.md) 中。

<a id="faq"></a>

## 常见问题

### 什么是插件市场？

插件市场是一份你的编辑器可以从中安装的清单。你把清单添加一次，之后就能按名字安装清单上的任意一个插件。

### 必须九款全部安装吗？

不必。添加市场本身不会安装任何东西。每条 `claude plugin install <name>@10x` 或 `npx skills add` 只安装一款工具。

### 没有 Claude Code 也能用吗？

可以，一次装一款。运行 `npx skills add Aboudjem/<repo> -g`，仓库名取自上面的表格。

### 为什么 `npx skills add Aboudjem/10x` 找不到任何技能？

这个仓库只是清单。技能位于每个插件自己的仓库中，所以请把命令指向那个仓库。

### 如何更新或移除插件？

更新请运行 `claude plugin update <name>@10x`。移除请运行 `claude plugin uninstall <name>@10x`。
用 skills CLI 的话，运行 `npx skills update` 或 `npx skills remove <skill>`。

### 10x 会收集数据吗？

不会。10x 没有任何数据分析。添加清单只会克隆这个仓库，不运行任何东西。它的脚本和测试只在你于克隆目录中运行时才会执行。

<a id="limits"></a>

## 限制

- 10x 只列出插件，不把它们放进沙箱。插件以你的权限运行。
- Claude Code 的命令需要 `claude` CLI。其他智能体使用 `npx skills add`，一次一个插件仓库。
- `npx skills` 只安装技能。只有三个插件带 MCP 服务器：sniff、ui-ux-suite 和 recap-studio。
- aws-cost-audit 需要一个能读取你账户的 AWS CLI，以及 `jq`。
- sniff 第一次遍历时会下载一次浏览器引擎和 Chromium：约 440 MB，在 Mac 上占用磁盘约 730 MB。`npx sniff-qa install` 可以提前完成，MCP 工具 `sniff_install` 会报告进度。
- 下载完成之前，即使下载中途被打断，sniff 也会返回安装步骤：CLI 给出安装提示，MCP 返回 `needsSetup`。
- sniff 的 MCP 服务器在下载之前就会响应。它的 README 在 npm 缓存为空时测得 3.1 到 4.9 秒，低于 Claude Code 30 秒的连接上限。
- `claude plugin list` 可能会显示 recap-studio 的提示 "The packages it lists were not installed"。这无害：插件从一个打包好的文件运行。
- 在同步任务运行之前，这里列出的版本可能比插件的新版本最多落后六小时。
- 每个插件保留自己的许可证。sniff 采用 Apache-2.0，其余八款采用 MIT。

## 参与贡献

有插件该收录进来？[CONTRIBUTING.md](../CONTRIBUTING.md) 中有提案步骤。
一个工作流会从每个插件自己的仓库同步所有已列出的版本。[docs/SYNC.md](../docs/SYNC.md) 说明了这条链路。

<p align="center">
  <sub>由 <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> 制作 · MIT 许可证 · 无遥测，不收集数据</sub>
</p>

本翻译由机器辅助完成，如有出入，请以英文版 README（../README.md）为准。
