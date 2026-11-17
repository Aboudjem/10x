<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x: curated Claude Code plugins that ship quality" src="../.github/assets/hero-banner-light.svg" width="100%">
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

<p align="center"><b>插件市场是一份你的编辑器可以从中安装的清单。这个市场收录了面向 Claude Code 的九款开发者工具，你只需要添加一次。</b></p>

<p align="center">
  <a href="#install">安装</a> ·
  <a href="#the-plugins">插件</a> ·
  <a href="#how-it-works">工作原理</a> ·
  <a href="#proof">证明</a> ·
  <a href="#faq">常见问题</a> ·
  <a href="#limits">限制</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

运行这两条命令后你会看到（真实运行，2026-11-17）：

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

<a id="install"></a>

## 安装

把市场添加一次。之后 Claude Code 就能按名称安装这九款插件中的任意一款。

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

把 `sniff` 换成下表中的任意名称即可。

插件可以用你的权限运行命令、读取文件。安装之前，请先看一看插件的仓库。

不用 Claude Code？可以用 [Vercel skills CLI](https://github.com/vercel-labs/skills) 一次安装一款插件。
它会把技能复制到你的智能体读取的目录中。

```bash
npx skills add Aboudjem/sniff
```

请使用插件自己的仓库名，而不是 `Aboudjem/10x`。这个仓库只是一份清单，本身不包含任何技能。

<a id="the-plugins"></a>
## 插件

| | 插件 | 用途 | 安装方式 | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | 遍历你正在运行的应用，发现真实存在的 bug | `claude plugin install sniff@10x` | [仓库](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | 面向设计的 ESLint：具体到行、具体到值、给出修复方法 | `claude plugin install ui-ux-suite@10x` | [仓库](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | 把一个主题或一次会话变成一份离线 HTML 讲解页 | `claude plugin install recap-studio@10x` | [仓库](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | 对照实时 AWS 价格审计你的 AWS 账单 | `claude plugin install aws-cost-audit@10x` | [仓库](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | 为一项庞大的任务准备好自主运行所需的材料 | `claude plugin install goalify@10x` | [仓库](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | 指出 55 种 AI 写作习惯，并加以改写 | `claude plugin install humanizer@10x` | [仓库](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | 为 Claude Code 的 `/loop` 命令准备一项重复性任务 | `claude plugin install loopify@10x` | [仓库](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | 找出陌生人能从你的应用里拿走什么，再证明它已经堵上 | `claude plugin install secure-my-app@10x` | [仓库](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | 编写代理说明，并检查说明是否仍然有效 | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

<a id="what-each-one-does"></a>

### 各插件的功能

#### sniff

把它指向你正在运行的应用，它会在真实浏览器里点击你的真实使用流程，然后告诉你哪里坏了，以及导致问题发生的按顺序排列的步骤。

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

它会读取你的 CSS、JSX、HTML 和 Tailwind 类名，并指出具体文件、具体行、实测的错误数值，以及确切的修复方法。它只做审计，从不修改代码。

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

它会把一个主题或一次编程会话变成一个可以双击打开的 HTML 文件，所有样式都内联在文件里，不发起任何外部请求，离线状态下大约五分钟就能读完。

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [架构文档](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

它会通过你机器上已有的 AWS CLI 读取你真实的 AWS 账户，交给你一份节省方案，其中每一个价格都是实时查证的，绝不是凭记忆给出的。

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

对于大到没法坐在旁边盯着看的任务，它会写出 brief（一个文件，记录这次运行要完成什么）和 condition（一行文字，你把它粘贴进 `/goal`），这样一个全新的会话就能完成这项工作，并在收尾时引用通过的检查项，作为完成的证明。

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

它掌握 55 种让文字读起来像机器写的习惯，指出你的文本中出现的那些，依据可测量的信号给文本打出 0 到 100 分，并按你选定的语气重写文本。

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

对于不断重复而非一次性完成的任务，它会写出 brief，以及你粘贴进 `/loop`（Claude Code 内置的重复执行命令）的那一行文字，其中带有执行次数上限和停止规则。每次执行都会把它做了什么记录下来。

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

它会找出陌生人能从你的应用里拿走什么，并用一条你能读到输出的命令来佐证每一项发现，然后只修复你批准的部分，再重新运行同一条命令，证明这个漏洞已经堵上，而你自己的登录依然可用。共 65 项控制项，分为七组。没有发现问题的一次运行也绝不会被称为安全：它的第三种判定是 `NOTHING CONFIRMED HERE`。

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Tell every coding agent how your repo works. Then prove it is still true.**

保持 `AGENTS.md` 简短，优先复用准确的现有文档。需要时添加 `docs/context/architecture.md` 或 `docs/context/workflows.md`，每个文件最多120行，通过链接按需读取。安装后的 Git 钩子在提交和推送时检查上下文，无需调用模型；会话钩子可选。更新时显示差异，并保留管理区块外的人工内容。

`claude plugin install contextify@10x`

[GitHub](https://github.com/Aboudjem/contextify)

<a id="how-it-works"></a>

## 工作原理

10x 就是一个文件：[`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json)。其中不包含任何插件代码。

1. 每个条目写明一款插件、它的 GitHub 仓库，以及这里列出的版本。
2. `claude plugin marketplace add Aboudjem/10x` 会克隆这个仓库并读取该文件。
3. `claude plugin install <name>@10x` 会从插件自己的仓库获取插件。
4. 一个定时任务会重新读取每个插件仓库并更新版本号。[docs/SYNC.md](../docs/SYNC.md) 说明了这条链路。

<a id="other-agents"></a>

### 其他智能体

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

这里的每款插件都以技能的形式发布，也就是你的智能体会读取的 Markdown 文件。
正因如此，九款插件都能通过 `npx skills add` 安装到 Claude Code 之外的环境中。
skills CLI 维护着自己的[受支持智能体列表](https://github.com/vercel-labs/skills#supported-agents)。

其中三款还能作为独立的 MCP 服务器运行。MCP 是编辑器用来连接外部工具的协议。
sniff 和 ui-ux-suite 可以直接从 npm 运行。recap-studio 需要克隆仓库并完成工作区构建后运行。
其余六款不提供 MCP 服务器。

| 智能体 | 一行安装命令 |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor、Codex、Copilot、Gemini CLI，以及[列表中的其余智能体](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| 任意 MCP 客户端 | `npx sniff-qa --mcp`、`npx ui-ux-suite --mcp`，recap-studio 需从构建后的克隆仓库运行 |
| 其他情况 | 参见插件自身仓库中的 `docs/editors.md` |

<a id="proof"></a>

## 证明

下面每一项说法都附带能打印出它的命令。请在这个仓库的克隆目录中运行。

| 说法 | 命令 | 在输出中要找的那一行 |
|:--|:--|:--|
| 清单中有九款有效插件 | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| 列出的每个版本都与插件自己的仓库一致 | `npm run sync:check` | `drift: none` （如果某个仓库读不到，它会打印 `unverified: <n> of 9 ...` 并以退出码 1 结束） |
| 清单文件能在 Claude Code 中加载 | `claude plugin validate . --strict` | `✔ Validation passed` |
| 仓库自身的测试全部通过 | `npm test` | `# fail 0` |

CI 会在每次 push 和每个 pull request 上运行这四项，还会检查每个链接并扫描密钥。

<a id="the-10x-bar"></a>

### 10x 标准

| | |
|---|---|
| **默认精简** | 不携带插件用不到的依赖。ui-ux-suite 以及其余六款技能不带任何依赖。recap-studio 的各个包依赖 zod，它的 web 应用则依赖 Next 和 React。sniff 需要驱动真实浏览器，所以它包含 Playwright 和 Lighthouse。 |
| **一条命令安装** | 不需要配置文件，也不需要注册。aws-cost-audit 是唯一需要你可能还没有的访问权限的插件：一个配置好、可以读取账户的 AWS CLI。 |
| **真实的测试** | CI 断言的是行为，而不是某个文件是否存在。 |
| **可在 Claude Code 之外运行** | 通过 `npx skills add` 安装到其他智能体中。 |
| **持续维护** | 本季度有发布记录，不是去年就已归档的项目。 |
| **无遥测** | 没有数据分析，也不会回传任何信息。每个工具只会与你指定的目标通信。 |

这里列出的每一款插件都要接受这套标准的约束。一旦某款插件不再达标，就会被移除。完整的检查清单，连同插件名单和最近一次验证日期，都在 [QUALITY-BAR.md](../QUALITY-BAR.md) 中。

<a id="faq"></a>

## 常见问题

### 什么是插件市场？

它是一份你的编辑器可以从中安装的清单。清单只需添加一次，之后就能按名称安装其中任意一款插件。

### 必须九款全部安装吗？

不必。添加市场本身不会安装任何东西。每条 `claude plugin install <name>@10x` 只安装一款插件。

### 没有 Claude Code 也能用吗？

可以，一次安装一款。运行 `npx skills add Aboudjem/<repo>`，其中的仓库名取自上面的表格。

### 为什么 `npx skills add Aboudjem/10x` 找不到任何技能？

这个仓库只是清单。技能位于每款插件自己的仓库中，所以请把命令指向那个仓库。

### 如何更新或移除插件？

更新请运行 `claude plugin update <name>@10x`。移除请运行 `claude plugin uninstall <name>@10x`。

### 10x 会收集数据吗？

不会。仓库里只有一个 JSON 文件、文档和图片。其中没有任何内容会在你的机器上运行。

<a id="limits"></a>

## 限制

- 10x 只负责列出插件，不会把它们放进沙箱。插件以你的权限运行。
- Claude Code 的命令需要 `claude` CLI。其他智能体使用 `npx skills add`，一次一个插件仓库。
- 只有三款插件提供 MCP 服务器：sniff、ui-ux-suite 和 recap-studio。
- aws-cost-audit 需要一个能读取你账户的 AWS CLI。
- sniff 的 MCP 服务器首次启动时会下载一套浏览器工具。这可能超过 Claude Code 的连接超时。请先预热一次：`npx -y sniff-qa --version`。
  如果下载中断导致 npx 报 `Invalid Version` 错误，请清掉它的缓存（`rm -rf ~/.npm/_npx`），再预热一次。
- `claude plugin list` 可能会在某个插件旁显示一条提示信息，例如 recap-studio 的 lockfile 提示，或 sniff 0.9.0 提示它列出的包未安装。插件照样能安装和运行。
- 在同步任务运行之前，这里列出的版本可能比插件的新版本最多落后六小时。
- 每款插件保留自己的许可证。sniff 采用 Apache-2.0，其余八款采用 MIT。

## 参与贡献

有插件觉得该收录进来？[CONTRIBUTING.md](../CONTRIBUTING.md) 中有提案步骤。
一个自动化工作流会从每个插件自己的仓库同步所有版本号；[docs/SYNC.md](../docs/SYNC.md) 说明了这条链路。

<p align="center">
  <sub>由 <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> 制作 · MIT 许可证 · 无遥测，不收集数据</sub>
</p>

本翻译由机器辅助完成，如有出入，请以英文版 README（../README.md）为准。
