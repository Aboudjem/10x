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
  <a href="zh-CN.md">简体中文</a> ·
  <b>日本語</b> ·
  <a href="es.md">Español</a> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>プラグインマーケットプレイスとは、エディタがそこからインストールできる一覧のことです。ここには Claude Code 向けの開発ツールが7つ収録されており、追加は一度だけで済みます。</b></p>

<p align="center">
  <a href="#install">インストール</a> ·
  <a href="#the-plugins">プラグイン一覧</a> ·
  <a href="#what-each-one-does">各プラグインの機能</a> ·
  <a href="#works-with-any-ai-editor">どのAIエディタでも動作</a> ·
  <a href="#the-10x-bar">10xの基準</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
```

<a id="install"></a>
## インストール

マーケットプレイスを一度追加すれば、Claude Code はそこから7つのプラグインを名前でインストールできるようになります。

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

`sniff` の部分は下表にある任意の名前に置き換えられます。Claude Code の外部でも、同じスキルが
[Vercel skills CLI](https://github.com/vercel-labs/skills) 経由でインストールでき、これはお使いのエージェントが読み込む
ディレクトリにスキルをインストールします。

```bash
npx skills add Aboudjem/sniff
```

<a id="the-plugins"></a>
## プラグイン一覧

| | プラグイン | 用途 | インストール | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **sniff** | 起動中のアプリを歩き回り、実際のバグを見つけます | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **ui-ux-suite** | デザイン版ESLint: 該当行、測定値、修正方法を示します | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **recap-studio** | トピックやセッションから、1つのオフラインHTML解説ファイルを生成します | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-512.png" width="28" alt=""> | **aws-cost-audit** | AWSの請求額を、AWSのライブ価格と照合して監査します | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-512.png" width="28" alt=""> | **goalify** | 大きなタスクを、自律実行できるように準備します | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-512.png" width="28" alt=""> | **humanizer** | AI特有の書き癖55個を特定し、書き直します | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-512.png" width="28" alt=""> | **loopify** | Claude Code の `/loop` 向けに、繰り返しジョブを準備します | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |

<a id="what-each-one-does"></a>
## 各プラグインの機能

### sniff

起動中のアプリを指定すると、実際のブラウザで実際のフローをクリックして辿り、何が壊れたか、そしてそれを壊した手順を順番通りに教えてくれます。

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

### ui-ux-suite

CSS、JSX、HTML、Tailwindのクラスを読み取り、ファイル名、行番号、測定された誤った値、そして正確な修正方法を示します。監査するだけで、編集は一切行いません。

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

### recap-studio

トピックやコーディングセッションを、ダブルクリックで開ける1つのHTMLファイルに変換します。すべてのスタイルはインライン化され、外部リクエストは一切なく、オフラインで約5分で読めます。

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

### aws-cost-audit

お使いのAWSアカウントを、既にお持ちのAWS CLI経由でライブに読み取り、すべての価格をライブで確認した節約プランを提示します。記憶頼みの価格は一切使いません。

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

### goalify

座って見ていられないほど大きな作業のために、ブリーフ(実行すべき内容を記した1ファイル)とコンディション(`/goal` に貼り付ける1行)を作成します。これにより、新しいセッションが作業を行い、通過したチェックを引用して終了します。

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

### humanizer

文章が機械的に見える書き癖を55個特定し、あなたの文章がそれをいくつ含んでいるかを0から100のスケールでスコア化し、選んだ文体で書き直します。

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

### loopify

完了するのではなく繰り返すジョブのために、ブリーフと、Claude Code の組み込み繰り返しコマンドである `/loop` に貼り付ける1行を、上限回数と停止ルール付きで作成します。各実行は、行った内容をログに記録します。

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

<a id="works-with-any-ai-editor"></a>
## どのAIエディタでも動作

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

ここにあるすべてのプラグインは、エージェントが読み込むMarkdownファイルであるスキルとして提供されています。だからこそ、7つ
すべてが `npx skills add` 経由でClaude Codeの外部でもインストールでき、そのREADME自体には77個のサポート対象エージェントが
挙げられています。うち3つはコマンドラインツールでもあります。sniff と ui-ux-suite はそれぞれ、npmから直接、エディタが外部
ツールに到達するためのプロトコルであるMCPサーバーとして単独で動作します。recap-studio も同様にMCPサーバーを備えていますが、
クローンしてワークスペースをビルドした後に実行する必要があります。残る4つはスキルのみです。

| エージェント | 1行インストール |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor、Codex、Copilot、Gemini CLI、[他70以上](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| 任意のMCPクライアント(sniff、ui-ux-suite) | `npx sniff-qa --mcp`、`npx ui-ux-suite --mcp` |
| その他すべて | 各プラグイン自身のリポジトリ内の `docs/editors.md` を参照 |

<a id="the-10x-bar"></a>
## 10xの基準

| | |
|---|---|
| **無駄のない既定構成** | プラグインが必要としない依存関係は持ちません。sniff は実際のブラウザを操作するためPlaywrightとLighthouseを含みますが、それ以外は依存関係ゼロで提供されます。 |
| **ワンコマンドインストール** | 設定ファイル、サインアップ、開始時のAPIキーは一切不要です。 |
| **本物のテスト** | ファイルが存在するかではなく、振る舞いを検証するCIです。 |
| **Claude Code以外でも動作** | `npx skills add` 経由で[70以上のエージェント](https://github.com/vercel-labs/skills#supported-agents)にインストールできます。 |
| **継続的にメンテナンス** | 今四半期のリリースがあり、去年のまま放置されたアーカイブではありません。 |
| **テレメトリなし** | アナリティクスも外部への通信も一切ありません。各ツールは、指定した対象としか通信しません。 |

ここに掲載されているすべてのプラグインはこの基準を満たしています。満たさなくなった場合は削除されます。ロースターと
最終検証日を含む完全なチェックリストは [QUALITY-BAR.md](../QUALITY-BAR.md) にあります。

## コントリビューション

ここに加えるべきプラグインをお持ちですか? 提案手順は [CONTRIBUTING.md](../CONTRIBUTING.md) にあります。
あるワークフローが、各プラグイン自身のリポジトリからすべてのバージョン指定を同期しています。その仕組みは
[docs/SYNC.md](../docs/SYNC.md) で説明されています。

<p align="center">
  <sub>制作: <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · MITライセンス · テレメトリなし、データ収集なし</sub>
</p>

この日本語訳は機械翻訳による支援を受けて作成されています。正式な内容は英語版のREADME(../README.md)を参照してください。
