<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="许可证"></a>
  <a href="#插件"><img src="https://img.shields.io/badge/plugins-7-f59e0b?style=flat-square" alt="7 个插件"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=f59e0b" alt="星标"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <b>简体中文</b> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/ja.md">日本語</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/es.md">Español</a> ·
  <a href="https://github.com/Aboudjem/10x/blob/main/READMEs/fr.md">Français</a>
</p>

<p align="center"><b>面向 Claude Code 的精选开发者工具市场。</b><br/>没有冗余。经过测试。可在任何 AI 编辑器中运行。</p>

![10x 市场演示](https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/demo.gif)

---

## 工作原理

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="你的编辑器与 10x 市场通信，市场提供七个精选插件：sniff、ui-ux-suite、recap-studio、aws-cost-audit、goalify、humanizer 和 loopify" width="100%">
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> 只需一条安装命令。每个插件都会自动接入它的 MCP 工具、斜杠命令和智能体。

此处的版本号跟随各插件自身的发布节奏，详见 [docs/SYNC.md](https://github.com/Aboudjem/10x/blob/main/docs/SYNC.md)。

---

## 插件

目前共有七个插件，每个都达到了下面的[质量标准](#10x-标准)。

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;在用户遇到问题前先找出缺陷

> 把它指向你正在运行的应用。它会在真实浏览器里走一遍你真实的用户流程，然后告诉你到底哪里坏了，并附上证据。

它会在真实浏览器里打开你的应用，像人一样一步步点下去。你拿到的是一份按优先级排序的问题清单，每一条都带着复现步骤。它需要你的应用正在运行：如果没有服务器在运行，sniff 就会转为检查源代码。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="sniff 会遍历正在运行的应用，识别其中的操作流程，并按优先级列出缺陷、无障碍和性能问题" width="100%"></p>

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

441 个测试，覆盖 12 类缺陷。

<p><a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/sniff-qa">npm →</a></p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;量化你的设计质量

> **设计界的 ESLint。** 它会精确指出问题所在行、实测的错误值和具体修复方法。

它会读取你的 CSS、JSX 和 Tailwind 配置，然后从十二个方面为设计打分，包括配色、字体、间距和无障碍性。每个问题都会标明文件、行号、实测错误值和修复方法。它只生成报告，不会修改文件，因此是否修复由你决定。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite 扫描项目，对 12 个设计维度评分，并在审计报告中注明每个问题违反了哪条 UX 法则" width="100%"></p>

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

311 个测试，12 个加权维度。

<p><a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a></p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;约 5 分钟读完的一页式讲解

> 把任何主题或编程过程制作成精美的讲解页面，支持深色模式并优先适配移动设备，双击即可打开。无需服务器、网络或额外依赖。

给它一个主题或一段编程记录，它就会生成一个可双击打开的 HTML 页面。页面可离线使用，每项主张都附有来源。发布前，快速检查器会为页面评分；该分数是一项结构性信号，并非同行评审。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="recap-studio 接收主题或 Git diff（代码差异），按照固定规则检查清晰度和无障碍性，并生成一个无需外部文件即可使用的一页式讲解" width="100%"></p>

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

43 个测试，分布在 5 个带测试的包中。

<p><a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp; <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">架构 →</a></p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;安全地审计你的 AWS 账单

> 让 Claude 审计你的 AWS 账单。你会得到一份清晰的成本节省方案，每个数字都对照实时的 AWS 定价核实过，未经你同意不会删除任何东西。

它会读取你的账户，算清楚每个资源实际花了多少钱，并找出闲置和配置过高的资源。每项节省建议都附有置信度、相关证据和回退方法。它默认只读，所以在试运行通过、并且你点头同意之前，什么都不会改变。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit 读取你实时的 AWS 账户，说明每一美元的去向并实时核验价格，然后提供一份有证据支持、需经确认后执行的节省方案" width="100%"></p>

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<p><a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;回来时看到完成的证据

> 把一个巨大的任务交给 Claude。回来时看到的是完成的证据——而不是一句"已经完成"的承诺。

对于不便全程守着的大任务，goalify 会创建任务简报（说明本次任务必须完成什么的文件）和完成条件（粘贴到 `/goal` 的一行文字）。清空聊天记录并粘贴这行文字后，新会话会完成整个任务，并在结束时引用各项检查的通过结果。仅仅停止运行并不能证明任务已经完成，因此请先查看收尾证据再确认结果。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify 会分析你的代码仓库，明确少数真正需要作出的决定，并生成任务简报和完成条件；新会话会据此执行并验证任务，在所有检查通过后将任务简报归档到 .goal/done/" width="100%"></p>

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/goalify">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;让 AI 生成的文字读起来像人写的

> humanizer 是一款免费开源工具，可让 AI 生成的文字更自然，并检测其中的 AI 写作痕迹。

它会评估文字读起来有多像机器生成的内容，也可以按你选择的文风进行改写。改写后的句子长短更有变化。它只包含一个 Markdown 文件，文本不会上传到外部；目标是改善写作，而不是欺骗检测工具。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/humanizer-diagram.svg" alt="humanizer 扫描文本中的 AI 写作模式，给出 0 到 100 的 AI 痕迹评分，然后按你选择的文风，用长短错落的句子改写文本" width="100%"></p>

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "<your text>"              # then, in any Claude Code session
```

55 种模式，5 种文风，0-100 的 AI 痕迹评分。

<p><a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;把重复的活儿交出去

> 把一项需要反复执行的工作交给 Claude。回来时，你看到的是每轮工作的记录，而不是一个需要全程盯着的循环。

有些工作永远不会彻底结束，例如观察一次部署是否稳定，或每小时检查新提交的缺陷报告。loopify 会创建任务简报（循环每轮都会重新读取的常驻文件）和循环指令（粘贴到 `/loop` 的一行文字），其中写明轮次上限和停止规则。每轮都会把完成的工作记录到 `TICKS.md`，因此你应查看这份日志：从外部看，一个没有找到待办事项的循环，和一个忙了一下午、持续修复问题的循环，并无区别。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify 会界定重复任务中单次循环的范围，生成任务简报和要粘贴到 /loop 的循环指令；之后每轮都会重新读取任务简报，完成一轮工作，并把结果记入 TICKS.md" width="100%"></p>

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/loopify">GitHub →</a></p>

---

## 兼容各种 AI 编辑器

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="可在 Claude Code、Cursor、VS Code、Codex、Gemini、Windsurf、Continue 以及任何兼容 MCP 的编辑器中使用" width="100%">
</p>

sniff、ui-ux-suite 和 recap-studio 是双模式的：既可以作为 Claude Code 插件安装，也可以在你选择的编辑器里当作一个纯粹的 MCP 服务器运行。aws-cost-audit、goalify、humanizer 和 loopify 是 Claude Code 技能而不是 MCP 服务器，因此在 Claude Code 中运行。

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

每个工具插件都附带一个只需一行命令即可运行的 `install.sh` 安装脚本，用来把它接入另一个 CLI 的技能目录（`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`），此外还有 `.cursor-plugin` 和 `.copilot-plugin` 清单。每个项目的 README 里都有面向 Cursor、VS Code + Copilot、Codex、Gemini、Windsurf 和 Continue.dev 的可复制粘贴片段。

---

## 10x 标准

这里的每个插件都达到了这套标准。如果不再达标，就会被移除。

| | |
|---|---|
| **没有冗余** | 原生 Node.js，无运行时依赖 |
| **一条命令安装** | 无配置文件，无 API 密钥 |
| **真实的测试** | 不是愿景，不是"即将推出" |
| **双模式** | 既作为 Claude Code 插件运行，也作为 MCP 服务器运行 |
| **积极维护** | 本季度发布，而非去年就已弃置 |
| **无遥测** | 在本地运行，你的代码绝不离开你的机器 |

完整清单在 [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md) 中。维护者在每季度评审时都会对照它重新核验每个插件。

> [!NOTE]
> 当前阵容：**sniff 0.7.0**（441 个测试）、**ui-ux-suite 0.5.0**（311 个测试）、**recap-studio 0.4.0**（43 个测试，分布在 5 个带测试的包中）、**aws-cost-audit 0.2.0**（默认只读）、**goalify 2.5.0**、**humanizer 0.6.2**（55 种模式）、**loopify 1.0.0**。最近核验时间：2026-09-01。

---

## 贡献

有适合放在这里的插件吗？请参阅 [CONTRIBUTING.md](https://github.com/Aboudjem/10x/blob/main/CONTRIBUTING.md)。

---

## 星标历史

<a href="https://star-history.com/#Aboudjem/10x&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" />
    <img alt="Aboudjem/10x 的星标历史图表" src="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" width="70%" />
  </picture>
</a>

---

<p align="center">
  如果 10x 帮助你写出了更好的代码，欢迎给它点个星标。<br/>
  这能帮助其他开发者找到这些工具。
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="网站"></a>
</p>

<p align="center">
  <sub>由 <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> 开发 · MIT 许可证 · 无遥测 · 无数据收集</sub>
</p>
