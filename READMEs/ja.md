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
  <a href="zh-CN.md">简体中文</a> ·
  <b>日本語</b> ·
  <a href="es.md">Español</a> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>プラグインマーケットプレイスとは、エディタがそこからインストールできる一覧のことです。ここには Claude Code 向けの開発ツールが9つ収録されており、追加は一度だけで済みます。</b></p>

<p align="center">
  <a href="#install">インストール</a> ·
  <a href="#the-plugins">プラグイン一覧</a> ·
  <a href="#how-it-works">仕組み</a> ·
  <a href="#proof">証拠</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">制限事項</a>
</p>

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

この2つのコマンドを実行すると、次のように表示されます(実際の実行結果、2026-11-17)。

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

<a id="install"></a>

## インストール

マーケットプレイスを一度追加すれば、Claude Code はそこから9つのプラグインを名前でインストールできるようになります。

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install sniff@10x
```

`sniff` の部分は下表にある任意の名前に置き換えられます。

プラグインは、あなたの権限でコマンドを実行し、ファイルを読み取ることができます。インストールする前に、そのプラグインのリポジトリを確認してください。

Claude Code を使っていない場合は、[Vercel skills CLI](https://github.com/vercel-labs/skills) でプラグインを1つずつインストールできます。
この CLI は、お使いのエージェントが読み込むフォルダにスキルをコピーします。

```bash
npx skills add Aboudjem/sniff
```

`Aboudjem/10x` ではなく、プラグイン自身のリポジトリ名を指定してください。このリポジトリは一覧であり、スキルそのものは含みません。

<a id="the-plugins"></a>
## プラグイン一覧

| | プラグイン | 用途 | インストール | |
|:-:|:--|:--|:--|:--|
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | 起動中のアプリを歩き回り、実際のバグを見つけます | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | デザイン版ESLint: 該当行、測定値、修正方法を示します | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | トピックやセッションから、1つのオフラインHTML解説ファイルを生成します | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | AWSの請求額を、AWSのライブ価格と照合して監査します | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | 大きなタスクを、自律実行できるように準備します | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | AI特有の書き癖55個を特定し、書き直します | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | Claude Code の `/loop` 向けに、繰り返しジョブを準備します | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | 見知らぬ他人が持ち出せるものを見つけ、塞がったことを証明します | `claude plugin install secure-my-app@10x` | [repo](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | エージェント向け指示を作り、今も正しいかを検査します | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

<a id="what-each-one-does"></a>

### 各プラグインの機能

#### sniff

起動中のアプリを指定すると、実際のブラウザで実際のフローをクリックして辿り、何が壊れたか、そしてそれを壊した手順を順番通りに教えてくれます。

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

CSS、JSX、HTML、Tailwindのクラスを読み取り、ファイル名、行番号、測定された誤った値、そして正確な修正方法を示します。監査するだけで、編集は一切行いません。

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

トピックやコーディングセッションを、ダブルクリックで開ける1つのHTMLファイルに変換します。すべてのスタイルはインライン化され、外部リクエストは一切なく、オフラインで約5分で読めます。

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

お使いのAWSアカウントを、既にお持ちのAWS CLI経由でライブに読み取り、すべての価格をライブで確認した節約プランを提示します。記憶頼みの価格は一切使いません。

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

座って見ていられないほど大きな作業のために、ブリーフ(実行すべき内容を記した1ファイル)とコンディション(`/goal` に貼り付ける1行)を作成します。これにより、新しいセッションが作業を行い、通過したチェックを引用して終了します。

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

文章が機械的に見える書き癖を55個把握しており、あなたの文章に現れたものを指摘し、測定可能な指標をもとに文章を0から100でスコア化し、選んだ文体で書き直します。

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

完了するのではなく繰り返すジョブのために、ブリーフと、Claude Code の組み込み繰り返しコマンドである `/loop` に貼り付ける1行を、上限回数と停止ルール付きで作成します。各実行は、行った内容をログに記録します。

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

見知らぬ他人があなたのアプリから持ち出せるものを見つけ、出力を自分で読めるコマンドで一つひとつの指摘を裏づけます。そのうえで、あなたが承認したものだけを修正し、同じコマンドをもう一度実行して、穴が塞がったことと、あなた自身のログインが今も通ることを証明します。コントロールは 7 グループで 65 項目です。指摘が出ない実行でも安全だとは決して述べません。3 つ目の判定は `NOTHING CONFIRMED HERE` です。

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**Tell every coding agent how your repo works. Then prove it is still true.**

`AGENTS.md` を短く保ち、正確な既存資料を再利用します。必要に応じて `docs/context/architecture.md` や `docs/context/workflows.md` を各120行以内で作成し、必要なときに読むためのリンクを付けます。インストール済みの Git フックがコミットとプッシュ時にモデルを使わず検査します。セッションフックは任意です。更新時は差分を表示し、管理ブロック外の人間が書いた内容を保持します。

`claude plugin install contextify@10x`

[GitHub](https://github.com/Aboudjem/contextify)

<a id="how-it-works"></a>

## 仕組み

10x の実体は1つのファイル、[`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json) です。プラグインのコードは含みません。

1. 各エントリには、プラグイン名、その GitHub リポジトリ、ここに掲載するバージョンが書かれています。
2. `claude plugin marketplace add Aboudjem/10x` は、このリポジトリをクローンしてそのファイルを読み込みます。
3. `claude plugin install <name>@10x` は、プラグイン自身のリポジトリからプラグインを取得します。
4. 定期ジョブが各プラグインのリポジトリを読み直し、バージョン番号を更新します。その流れは [docs/SYNC.md](../docs/SYNC.md) で説明しています。

<a id="other-agents"></a>

### その他のエージェント

<p align="center">
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf, Continue, and any MCP client" width="100%">
</p>

ここにあるプラグインはすべてスキル、つまりエージェントが読み込む Markdown ファイルとして提供されています。
そのため、9つすべてが `npx skills add` 経由で Claude Code の外部にもインストールできます。
skills CLI は独自の[対応エージェント一覧](https://github.com/vercel-labs/skills#supported-agents)を管理しています。

3つのプラグインは、単体の MCP サーバーとしても動作します。MCP は、エディタが外部ツールに接続するためのプロトコルです。
sniff と ui-ux-suite は npm から直接実行できます。recap-studio は、クローンしてワークスペースをビルドした後に実行します。
残りの6つは MCP サーバーを提供していません。

| エージェント | 1行インストール |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor、Codex、Copilot、Gemini CLI、および[一覧にあるその他のエージェント](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| 任意の MCP クライアント | `npx sniff-qa --mcp`、`npx ui-ux-suite --mcp`、recap-studio はビルド済みのクローンから |
| それ以外 | 各プラグインのリポジトリにある `docs/editors.md` を参照 |

<a id="proof"></a>

## 証拠

以下の主張には、それぞれ結果を表示するコマンドを添えています。このリポジトリのクローン内で実行してください。

| 主張 | コマンド | 出力の中で探す行 |
|:--|:--|:--|
| 一覧には有効なプラグインが9つある | `npm run validate` | `All checks passed. Marketplace has 9 valid plugin(s).` |
| 掲載バージョンはすべて各プラグインのリポジトリと一致する | `npm run sync:check` | `drift: none` (読めないリポジトリがあると `unverified: <n> of 9 ...` を表示し、終了コード 1 で終わります) |
| マニフェストは Claude Code で読み込める | `claude plugin validate . --strict` | `✔ Validation passed` |
| このリポジトリ自身のテストが通る | `npm test` | `# fail 0` |

CI は、push とプルリクエストのたびにこの4つを実行します。あわせて、すべてのリンクの確認とシークレットのスキャンも行います。

<a id="the-10x-bar"></a>

### 10xの基準

| | |
|---|---|
| **無駄のない既定構成** | プラグインが必要としない依存関係は持ちません。ui-ux-suiteと6つのスキルは依存関係を持ちません。recap-studioのパッケージはzodを、そのWebアプリはNextとReactを取り込みます。sniffは実際のブラウザを操作するためPlaywrightとLighthouseを含みます。 |
| **ワンコマンドインストール** | 設定ファイルもサインアップも不要です。aws-cost-auditだけは、お持ちでない可能性のあるアクセス権、つまりアカウントを読み取れるよう設定されたAWS CLIを必要とします。 |
| **本物のテスト** | ファイルが存在するかではなく、振る舞いを検証するCIです。 |
| **Claude Code以外でも動作** | `npx skills add` 経由で他のエージェントにインストールできます。 |
| **継続的にメンテナンス** | 今四半期のリリースがあり、去年のまま放置されたアーカイブではありません。 |
| **テレメトリなし** | アナリティクスも外部への通信も一切ありません。各ツールは、指定した対象としか通信しません。 |

ここに掲載されているすべてのプラグインは、この基準の対象です。満たさなくなった場合は削除されます。ロースターと
最終検証日を含む完全なチェックリストは [QUALITY-BAR.md](../QUALITY-BAR.md) にあります。

<a id="faq"></a>

## FAQ

### プラグインマーケットプレイスとは何ですか?

エディタがそこからインストールできる一覧のことです。一覧を一度追加すれば、そこにあるプラグインを名前でインストールできます。

### 9つすべてをインストールする必要がありますか?

いいえ。マーケットプレイスを追加しても何もインストールされません。`claude plugin install <name>@10x` は、1回につき1つのプラグインだけをインストールします。

### Claude Code がなくても使えますか?

はい、プラグイン1つずつであれば使えます。表にあるプラグインのリポジトリ名を使って `npx skills add Aboudjem/<repo>` を実行してください。

### なぜ `npx skills add Aboudjem/10x` ではスキルが見つからないのですか?

このリポジトリは一覧にすぎません。スキルは各プラグイン自身のリポジトリにあるので、コマンドにはそのリポジトリを指定してください。

### プラグインを更新または削除するにはどうすればよいですか?

更新するには `claude plugin update <name>@10x` を実行します。削除するには `claude plugin uninstall <name>@10x` を実行します。

### 10x はデータを収集しますか?

いいえ。このリポジトリにあるのは JSON ファイル、ドキュメント、画像だけです。あなたのマシン上で実行されるものはありません。

<a id="limits"></a>

## 制限事項

- 10x はプラグインを一覧にするだけで、サンドボックス化はしません。プラグインはあなたの権限で動作します。
- Claude Code のコマンドには `claude` CLI が必要です。他のエージェントでは `npx skills add` を使い、プラグインのリポジトリを1つずつ指定します。
- MCP サーバーを提供しているプラグインは、sniff、ui-ux-suite、recap-studio の3つだけです。
- aws-cost-audit には、アカウントを読み取れる AWS CLI が必要です。
- sniff の MCP サーバーは、初回起動時にブラウザ一式をダウンロードします。そのため Claude Code の接続タイムアウトを超えることがあります。先に一度ウォームアップしてください: `npx -y sniff-qa --version`。
  ダウンロードが途中で切れて npx が `Invalid Version` エラーを出す場合は、キャッシュを消して (`rm -rf ~/.npm/_npx`) もう一度ウォームアップしてください。
- `claude plugin list` は、プラグインの横に情報メモを表示することがあります。例: recap-studio の lockfile メモ。プラグインのインストールと動作には影響しません。
- 同期ジョブが実行されるまで、ここに掲載されたバージョンはプラグインの新しいリリースより最大6時間遅れることがあります。
- 各プラグインはそれぞれのライセンスに従います。sniff は Apache-2.0、残りの8つは MIT です。

## コントリビューション

ここに加えるべきプラグインをお持ちですか? 提案手順は [CONTRIBUTING.md](../CONTRIBUTING.md) にあります。
あるワークフローが、各プラグイン自身のリポジトリからすべてのバージョン指定を同期しています。その仕組みは
[docs/SYNC.md](../docs/SYNC.md) で説明されています。

<p align="center">
  <sub>制作: <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · MITライセンス · テレメトリなし、データ収集なし</sub>
</p>

この日本語訳は機械翻訳による支援を受けて作成されています。正式な内容は英語版のREADME(../README.md)を参照してください。
