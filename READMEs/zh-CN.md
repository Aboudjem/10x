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
  <a href="ja.md">日本語</a> ·
  <a href="es.md">Español</a> ·
  <a href="fr.md">Français</a>
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

如今共有七个插件。它们每一个都通过了下面的[质量标准](#10x-标准)。

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;在用户之前先发现 bug

> 把它指向你正在运行的应用。它会在真实浏览器里走一遍你真实的用户流程，然后告诉你到底哪里坏了，并附上证据。

它会在真实浏览器里打开你的应用，像人一样一步步点下去。你拿到的是一份按优先级排序的问题清单，每一条都带着复现步骤。它需要你的应用正在运行：如果没有服务在跑，sniff 会退而去读你的源代码。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="sniff 遍历你正在运行的应用，发现它的流程，并返回按优先级排序的 bug、可访问性和性能发现" width="100%"></p>

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

441 个测试，覆盖 12 类 bug。

<p><a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/sniff-qa">npm →</a></p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;量化你的设计质量

> **设计界的 ESLint。** 它会指出确切的那一行、测出来的错误数值，以及确切的修复方法。

它会读取你的 CSS、JSX 和 Tailwind 配置，然后为你的设计打分，涵盖 12 个方面，其中包括配色、排版、间距和可访问性。每条发现都会点名文件、行号、出错的数值，以及修复方法。它只报告，从不修改，是否应用修复由你决定。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite 扫描你的项目，对 12 个设计维度评分，并返回一份引用每个发现违反了哪条 UX 法则的审计报告" width="100%"></p>

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

311 个测试，12 个加权维度。

<p><a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a></p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;5 分钟内做出一页式讲解

> 把任何主题或一次编码会话，变成一个漂亮的、深色模式、移动优先的讲解页面，双击就能打开。不需要服务器，不需要联网，没有依赖。

给它一个主题，或者让它指向一次编码会话，你会得到一个 HTML 页面，双击就能打开。它可以离线使用，每一条论断都附有来源。发布之前，一个快速检查器会给页面打分，这个分数是一个结构性信号，不是同行评审。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="recap-studio 接收一个主题或一份 git diff，运行关于清晰度和可访问性的确定性检查，并输出一个自包含的一页式讲解" width="100%"></p>

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

> 让 Claude 审计你的 AWS 账单。你会得到一份清楚的节省方案，每个数字都对照实时的 AWS 定价核实过，未经你同意不会删除任何东西。

它会读取你的账户，算清楚每个资源实际花了多少钱，并找出闲置和配置过高的资源。每一项节省都带着置信度、背后的证据，以及一个撤销的办法。它默认只读，所以在试运行通过、并且你点头同意之前，什么都不会改变。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit 读取你实时的 AWS 账户，归因每一美元并实时核验价格，然后返回一份有证据支撑、需逐项放行的节省方案" width="100%"></p>

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<p><a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;回来时看到完成的证据

> 把一个巨大的任务交给 Claude。回来时看到的是完成的证据——而不是一句"应该做完了"的承诺。

对于大到没法坐在旁边盯着的任务，goalify 会写出 brief（一个文件，写明这次运行要做什么）和 condition（一行字符串，粘贴进 `/goal`）。你清空对话，粘贴那一行，一个全新的会话就会把整个任务做完，并在收尾时引用通过的检查结果。一次运行停下来，并不等于它做完了，所以在相信之前，先读那份收尾证据。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify 研究你的仓库，锁定为数不多的真实决策，写出 brief 与 condition；一个全新的会话据此执行、核验，并在全部检查通过后把它归档到 .goal/done/" width="100%"></p>

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/goalify">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;让 AI 生成的文字读起来像人写的

> humanizer 是一个免费、开源的 AI 写作人性化改写与检测工具。

粘贴一段文字，它会给出这段文字读起来有多像机器写的评分，也可以按你选的语气把它改写一遍。改写会像人一样让句子长短参差不齐。它就是一个 Markdown 文件，什么都不会离开你的机器，目标是写得更好，而不是骗过检测器。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/humanizer-diagram.svg" alt="humanizer 扫描文本中的 AI 写作模式，给出 0 到 100 的 AI 痕迹评分，然后按你选的语气用参差的句长改写文本" width="100%"></p>

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "<your text>"              # then, in any Claude Code session
```

55 种模式，5 种语气，0-100 的 AI 痕迹评分。

<p><a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;把重复的活儿交出去

> 把一件会反复发生的活儿交给 Claude。回来看到的是一份记录每个 tick 做了什么的日志——而不是一个需要你一直盯着的循环。

有些活儿永远做不完：盯着一次部署直到它稳定下来，或者每小时清扫一遍新的 bug 报告。loopify 会写出 brief（一个常驻文件，循环每次运行都会重新读它）和 line（一行字符串，粘贴进 `/loop`），tick 上限和停止规则就写在这一行里。每个 tick 都会把做过的事记进 `TICKS.md`，你应该去读这份日志：一个什么都没找到要做的循环，和一个忙了一下午的循环，从外面看是一样的。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify 厘清重复任务的一个周期，写出 brief 和你粘贴进 /loop 的那一行；此后每个 tick 都重新读取 brief，跑完一个周期，并把做过的事记进 TICKS.md" width="100%"></p>

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/loopify">GitHub →</a></p>

---

## 适配任何 AI 编辑器

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="适配 Claude Code、Cursor、VS Code、Codex、Gemini、Windsurf、Continue 以及任何兼容 MCP 的编辑器" width="100%">
</p>

sniff、ui-ux-suite 和 recap-studio 是双模式的：既可以作为 Claude Code 插件安装，也可以在你选择的编辑器里当作一个纯粹的 MCP 服务器运行。aws-cost-audit、goalify、humanizer 和 loopify 是 Claude Code 技能而不是 MCP 服务器，所以它们只在 Claude Code 中运行。

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

每个工具插件都自带一个一行式 `install.sh`，用一条命令把它接入另一个 CLI 的技能目录（`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`），此外还有 `.cursor-plugin` 和 `.copilot-plugin` 清单。每个项目的 README 里都有面向 Cursor、VS Code + Copilot、Codex、Gemini、Windsurf 和 Continue.dev 的可复制粘贴片段。

---

## 10x 标准

这里的每个插件都通过了这条标准。如果它不再通过，就会被移除。

| | |
|---|---|
| **没有冗余** | 纯 Node.js，无运行时依赖 |
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
  如果 10x 帮助你交付了更好的代码，欢迎给它点个星标。<br/>
  这能帮助其他开发者找到这些工具。
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="网站"></a>
</p>

<p align="center">
  <sub>由 <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> 构建 · MIT 许可证 · 无遥测 · 无数据收集</sub>
</p>

---

*本翻译由自动化工具协助完成。欢迎母语者提交 PR 来修正任何生硬的措辞或不准确之处。如有出入，以英文 README（[README.md](https://github.com/Aboudjem/10x/blob/main/README.md)）为准。*
