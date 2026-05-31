<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="许可证"></a>
  <a href="#plugins"><img src="https://img.shields.io/badge/plugins-5-f59e0b?style=flat-square" alt="5 个插件"></a>
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
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="你的编辑器与 10x 市场通信，市场提供五个精选插件：sniff、ui-ux-suite、recap-studio、aws-cost-audit 和 goalify" width="100%">
</p>

<p align="center"><i>只需一条安装命令。每个插件都会自动接入它的 MCP 工具、斜杠命令和智能体。</i></p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> 只需一条安装命令。每个插件都会自动接入它的 MCP 工具、斜杠命令和智能体。

---

## 插件

如今共有五个插件。它们每一个都通过了下面的[质量标准](#10x-标准)。

> [!TIP]
> 想看它们运行吗？每个工具的仓库都有自己的演示：[sniff](https://github.com/Aboudjem/sniff#readme)、[ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite#readme)、[recap-studio](https://github.com/Aboudjem/recap-studio#readme)、[aws-cost-audit](https://github.com/Aboudjem/aws-cost-audit-skill#readme) 和 [goalify](https://github.com/Aboudjem/goalify#readme)。

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;在用户之前发现 bug

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="Sniff 遍历你正在运行的应用，发现它的流程，并返回按优先级排序的 bug、可访问性和性能发现" width="100%">
</p>

由 AI 驱动的 QA，像用户一样遍历你正在运行的应用，发现它的流程，并找出可访问性、性能和损坏交互方面的真实 bug。自动检测你的开发服务器。也可通过 `sniff scan` 进行源代码扫描。无需 API 密钥，无需配置。

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**斜杠命令**
- `/sniff` - 遍历你正在运行的应用
- `/sniff-fix` - 应用安全修复
- `/sniff-report` - 打开上一次扫描

</td>
<td width="50%" valign="top">

**MCP 工具**
- `sniff` - 遍历你正在运行的应用（统一版）
- `sniff_scan` - 仅源代码扫描
- `sniff_report` - 格式化结果

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/sniff-qa">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;量化你的设计质量

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite 扫描你的项目，对 12 个设计维度评分，并返回一份引用每个发现违反了哪条 UX 法则的审计报告" width="100%">
</p>

扫描你的 CSS、JSX 和 Tailwind 配置。对 12 个设计维度评分：可访问性、配色系统、排版、布局与间距、组件质量、视觉层级、交互质量、响应式、视觉打磨、体感性能、信息架构和平台适配性。引用每个发现所违反的 UX 法则，然后向你展示确切的修复方法。它只审计，从不修改。零依赖，100% 本地。

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**斜杠命令**
- `/design-audit` - 完整的 12 维审计
- `/color-audit` - 对比度 + 调色板
- `/type-audit` - 仅排版
- `/layout-audit` - 间距 + 网格
- `/a11y-audit` - WCAG 2.2 + APCA
- `+ 另外 9 项专项审计`

</td>
<td width="50%" valign="top">

**MCP 工具**
- `uiux_scan_project` - 检测技术栈
- `uiux_extract_colors` - 调色板
- `uiux_check_contrast` - WCAG/APCA
- `uiux_generate_tokens` - design system
- `+ 另外 10 项评分与生成工具`

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;5 分钟内生成一页式讲解

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="Recap Studio 接收一个主题或一份 git diff，运行关于清晰度和可访问性的确定性启发式检查，并输出一个自包含的一页式讲解" width="100%">
</p>

把任何主题或编码会话变成一个干净、移动优先的一页式讲解，一个聪明的 18 岁年轻人 5 分钟就能读完。输出是一个自包含、可离线使用的 HTML 页面。确定性的启发式检查会在你发布前验证清晰度、可访问性和结构，并且每个论断都有引用来源。

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**斜杠命令**
- `/recap "<topic>"` - 完整的讲解页面
- `/recap session` - 编码会话回顾
- `/recap setup` - 写入安全默认配置
- `/recap validate` - 对当前页面重新评分

</td>
<td width="50%" valign="top">

**你将获得**
- 一个自包含、可离线的 HTML 页面
- 每个论断都引用到来源
- 确定性的启发式检查（清晰度、a11y、结构）
- 可选的部署路径（默认关闭）

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">架构 →</a>
</p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;安全地审计你的 AWS 账单

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit 读取你实时的 AWS 账户，归因每一美元并实时核验价格，然后返回一份有证据支撑、需逐项放行的节省方案" width="100%">
</p>

读取你实时的 AWS 账户（默认只读），归因每一美元，并找出闲置、孤立和过度配置的资源。针对 AWS Price List API 实时核验每个价格（它不硬编码任何价格），并为每个发现给出置信度、其背后的证据和回滚方案。没有证据和你的签字确认，任何东西都不会被删除。

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**它做什么**
- 实时重新核算支出（Cost Explorer）
- 盘点每个区域，追猎浪费
- 每个发现都附带置信度 + 证据 + 回滚

</td>
<td width="50%" valign="top">

**默认安全**
- 只读；破坏性操作需逐项放行
- 实时核验价格，从不硬编码
- 「立即安全节省」对比「理论最大节省」

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;为大型编码任务准备一次自主运行

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify 厘清一个大型编码任务的范围，锁定为数不多的真实决策，并写出一个自包含、可自删除的 /goal 文件，供一个全新的满上下文会话执行" width="100%">
</p>

厘清一个大型编码任务的范围，锁定为数不多的真实决策，并写出一个自包含、可自删除的 `/goal` 文件。随后你可以开启一个全新的满上下文会话来执行整个任务，它会在删除该文件之前核验每一项成功标准。

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**斜杠命令**
- `/goalify <your task>` - 准备一个 `/goal` 文件

</td>
<td width="50%" valign="top">

**它做什么**
- 厘清任务范围并锁定为数不多的真实决策
- 写出一个自包含、可自删除的 `/goal` 文件
- 一个全新的满上下文会话执行整个任务
- 在删除文件之前核验每一项成功标准

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/goalify">GitHub →</a>
</p>

---

## 适配任何 AI 编辑器

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="适配 Claude Code、Cursor、VS Code、Codex、Gemini、Windsurf、Continue 以及任何兼容 MCP 的编辑器" width="100%">
</p>

每个 10x **工具**插件都是**双模式**的：把它作为 Claude Code 插件安装，或者在你选择的编辑器中把它作为一个纯粹的 MCP 服务器运行。（`aws-cost-audit` 和 `goalify` 是 Claude Code 技能而非 MCP 服务器，所以它们在 Claude Code 中运行：`aws-cost-audit` 在本地读取你的 AWS 账户，`goalify` 写出一个供 `/goal` 使用的文件。）

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

每个工具插件还附带一个一行式 `install.sh`，用一条命令把它接入另一个 CLI 的技能目录（`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`），以及 `.cursor-plugin` 和 `.copilot-plugin` 清单。每个项目的 README 都有面向 Cursor、VS Code + Copilot、Codex、Gemini、Windsurf 和 Continue.dev 的可复制粘贴片段。

---

## 10x 标准

这里的每个插件都通过了这条标准。如果它不再通过，就会被移除。

| | |
|---|---|
| **没有冗余** | 标准 Node.js，无运行时依赖 |
| **一条命令安装** | 无配置文件，无 API 密钥 |
| **真实的测试** | 不是愿景，不是「即将推出」 |
| **双模式** | 既作为 Claude Code 插件运行，也作为 MCP 服务器运行 |
| **积极维护** | 本季度发布，而非去年弃置 |
| **无遥测** | 在本地运行，你的代码绝不离开你的机器 |

完整的八点清单（32 项）在 [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md) 中。维护者在每季度评审时会对照它重新核验每个插件。

> [!NOTE]
> 当前阵容：**sniff 0.7.0**（441 tests）、**ui-ux-suite 0.5.0**（311 tests）、**recap-studio 0.4.0**（分布在 5 个带测试的包中的 43 tests）、**aws-cost-audit 0.2.0**（以测试先行方式构建，在真实账户上端到端验证，零硬编码价格）、**goalify 1.0.0**（一个 Claude Code 技能，写出一个自包含、可自删除的 `/goal` 文件）。最近核验：2026-05-30。

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

*本翻译在自动工具的协助下完成。欢迎母语者提交 PR 来修正任何生硬的措辞或不准确之处。如有出入，以英文 README（[../README.md](../README.md)）为准。*
