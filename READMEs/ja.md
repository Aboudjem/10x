<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../.github/assets/hero-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="../.github/assets/hero-banner-light.svg">
  <img alt="10x: nine Claude Code tools, one list, proof for each" src="../.github/assets/hero-banner-light.svg" width="100%">
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

<p align="center"><b>Claude Code 用の9つのツール。リストは1つ。それぞれに証拠付き。</b></p>

<p align="center">
  <a href="#install">インストール</a> ·
  <a href="#the-plugins">プラグイン一覧</a> ·
  <a href="#how-it-works">仕組み</a> ·
  <a href="#proof">証拠</a> ·
  <a href="#faq">FAQ</a> ·
  <a href="#limits">制限事項</a>
</p>

このリストを一度追加すれば、9つのツールのどれでも名前でインストールできます。

```bash
claude plugin marketplace add Aboudjem/10x
claude plugin install humanizer@10x
```

この2つのコマンドを実行すると、次のように表示されます(実際の実行結果、2026-11-17)。

```text
✔ Successfully added marketplace: 10x (declared in user settings)
✔ Successfully installed plugin: humanizer@10x (scope: user)
```

アプリの壊れた箇所、第三者が持ち出せるもの、AWS 請求の無駄を見つけます。
AI の下書きを人が書いた文章に近づけ、長い作業はレシート付きで任せられます。
どのプラグインも、主張を証明するコマンドを載せています。

10x はプラグインを一覧にするだけで、サンドボックス化はしません。各プラグインはあなたの権限で動きます。

<a id="why-use-it"></a>

## 使う理由

- **一度の追加で9つのツール。** リストを追加しても何もインストールされません。`claude plugin install <name>@10x` で1つずつ入れます。
  証拠: `npm run validate` が `Marketplace has 9 valid plugin(s)` と表示します。
- **push のたびに検査。** CI が `npm run validate`、`npm run sync:check`、`claude plugin validate . --strict`、`npm test` を実行します。
  証拠: [validate ワークフロー](../.github/workflows/validate.yml) と下の [証拠](#proof) の表。
- **制限が見える。** 各プラグインの README には Proof の節と、できないことを書いた Limits の節があります。
  証拠: [プラグイン一覧](#the-plugins) のリポジトリリンクを開き、`## Proof` と `## Limits` を読んでください。

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
| <img src="https://raw.githubusercontent.com/Aboudjem/sniff/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **sniff** | 動作中のアプリの 500 エラー、リンク切れ、壊れたフォームを再現手順付きで見つけます。 | `claude plugin install sniff@10x` | [repo](https://github.com/Aboudjem/sniff) |
| <img src="https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **ui-ux-suite** | コントラスト、フォーカス、レイアウトの不具合を、ファイル、行、測定値、修正案で直せます。 | `claude plugin install ui-ux-suite@10x` | [repo](https://github.com/Aboudjem/ui-ux-suite) |
| <img src="https://raw.githubusercontent.com/Aboudjem/recap-studio/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **recap-studio** | トピックや作業セッションを、オフラインで開ける1枚の HTML で説明します。 | `claude plugin install recap-studio@10x` | [repo](https://github.com/Aboudjem/recap-studio) |
| <img src="https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/assets/logo-mark-animated.svg" width="40" alt=""> | **aws-cost-audit** | AWS 請求を削る、順位付きの削減リスト。価格はすべてライブで確認します。 | `claude plugin install aws-cost-audit@10x` | [repo](https://github.com/Aboudjem/aws-cost-audit-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/goalify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **goalify** | 大きな作業を任せてレシートを受け取ります: VERIFIED か NOT VERIFIED。 | `claude plugin install goalify@10x` | [repo](https://github.com/Aboudjem/goalify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/.github/assets/logo-mark-animated.svg" width="40" alt=""> | **humanizer** | 下書きが AI っぽく聞こえる理由を示し、選んだ声で書き直します。 | `claude plugin install humanizer@10x` | [repo](https://github.com/Aboudjem/humanizer-skill) |
| <img src="https://raw.githubusercontent.com/Aboudjem/loopify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **loopify** | 繰り返し作業を動かし、1行で確認します: OK、NEEDS YOU、STALE。 | `claude plugin install loopify@10x` | [repo](https://github.com/Aboudjem/loopify) |
| <img src="https://raw.githubusercontent.com/Aboudjem/secure-my-app/main/assets/logo-mark-animated.svg" width="40" alt=""> | **secure-my-app** | 第三者がアプリから持ち出せるものを、穴ごとの証拠付きで見つけます。 | `claude plugin install secure-my-app@10x` | [repo](https://github.com/Aboudjem/secure-my-app) |
| <img src="https://raw.githubusercontent.com/Aboudjem/contextify/main/assets/logo-mark-animated.svg" width="40" alt=""> | **contextify** | エージェント共通の AGENTS.md と、消えたコマンドやファイルを示すトークン不要の検査。 | `claude plugin install contextify@10x` | [repo](https://github.com/Aboudjem/contextify) |

<a id="what-each-one-does"></a>

### 各プラグインの機能

#### sniff

**動作中のアプリの 500 エラー、リンク切れ、壊れたフォームを見つけます。**

- レポートは判定と、最初に直すべき 3 件から始まります。隠した低信頼度の指摘が何件あるかも示します。
- ページの指摘ごとにルート、手順、修正案を示し、多くはスクリーンショット付きです。
- 仕込んだバグ 21 件中 21 件を見つけ、正常なページでの誤検出は 0 件でした (`npm run build && npm run proof`)。
- `--fail-on` は critical か high の指摘で終了コード 1 を返すので、マージを止められます。API キーは不要です。

実際にフォームを送信するので、開発用かステージングのアプリに向けてください。最初の巡回で約 440 MB を一度だけダウンロードします。

`claude plugin install sniff@10x`

[GitHub](https://github.com/Aboudjem/sniff) · [npm](https://www.npmjs.com/package/sniff-qa)

#### ui-ux-suite

**デザインの ESLint: 行、測定値、修正案。**

- 位置が特定できた指摘には、ファイル、行、測定値、修正案があります (壊れたフィクスチャで 46 件)。
- コントラストを WCAG 2.2 で検査し、位置が特定できた指摘はその根拠のルールや UX の法則を示します。
- 実行時の依存関係はありません: `npm view ui-ux-suite dependencies` は何も表示しません。

ピクセルではなくソースを読み、コードを書き換えることはありません。

`claude plugin install ui-ux-suite@10x`

[GitHub](https://github.com/Aboudjem/ui-ux-suite) · [npm](https://www.npmjs.com/package/ui-ux-suite)

#### recap-studio

**メールで送れて、PR に添付でき、機内でも読める1枚のページ。**

- HTML ファイル1つ、script タグ 0、CSS はすべてインライン。ダブルクリックでオフラインで開きます。
- 7つのオフライン検査がモデルなしでページを採点します。`--fail-under 8` で弱いページを弾けます。
- `/recap session` は git の差分とコミットを、チームが読めるページにします。

スコアは形を見るもので、内容の正しさは見ません。まず出典を読んでください。

`claude plugin install recap-studio@10x`

[GitHub](https://github.com/Aboudjem/recap-studio) · [Architecture](https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md)

#### aws-cost-audit

**AWS 請求の無駄を、ライブ価格で削ります。**

- 金額での判定と、最初にやるべき3つの削減。
- 価格は実行時に AWS から取得します。スクリプトに価格が直書きされていると `make test` と CI のスキャンが失敗します。
- 既定はドライランです。変更には `--apply` と、そのあとあなたが入力する yes が必要です。`--yes` はその確認を飛ばします。

アカウントを読める AWS CLI、`jq`、有効な Cost Explorer が必要です。

`claude plugin install aws-cost-audit@10x`

[GitHub](https://github.com/Aboudjem/aws-cost-audit-skill)

#### goalify

**AI に大きな仕事を任せて、証拠を受け取る。**

- 質問はすべて最初に済ませるので、実行中に聞かれることはありません。
- `/goal` の行が、通るべきテストコマンドを指定します。
- `/goalify verify` がテストを再実行し、`NOT VERIFIED` にもなりうるレシートを書きます。

止まった実行が完了しているとは限らず、権限の確認で一時停止することもあります。

`claude plugin install goalify@10x`

[GitHub](https://github.com/Aboudjem/goalify)

#### humanizer

**下書きが AI っぽく聞こえる原因を見つけて、直す。**

- 番号付きの 55 パターンと、減点の原因になっている語句を引用する「Fix first」リスト。
- 任意の CLI の `compare --check-facts` は、数値、日付、バージョン、URL を失った書き直しを失敗にします。
- `scan --fail-above 40` はスコアが高すぎる下書きで終了コード 1 を返すので、CI で止められます。

書き直しはエディタのモデルで動き、選べる5つの声のどれかを使います。

`claude plugin install humanizer@10x`

[GitHub](https://github.com/Aboudjem/humanizer-skill)

#### loopify

**ループの子守はもう要りません。**

- 1行のステータスが 6 種類の判定のひとつ (`OK`、`NEEDS YOU`、`STALE` など) と、次にやることを示します。
- 間隔がわかっている場合、新しい記録がないまま 2 間隔を超えると、抜けた tick は `STALE` として表示されます。
- 停止ルールは行に含まれ、どのループも 7 日で期限切れになります。

ループは開いているセッションの中で動き、そのログが唯一の記録です。

`claude plugin install loopify@10x`

[GitHub](https://github.com/Aboudjem/loopify)

#### secure-my-app

**第三者がアプリから持ち出せるものを見つける。そして塞ぎ、塞いだことを証明する。**

- 各指摘は証拠を示します: コードの行と、ライブ URL があればリクエストと実際の出力。
- 各指摘には `VERIFY` コマンドがあり、その出力が変わって初めて修正とみなします。
- レポートを書いて止まります。あなたが修正を承認するまで、アプリは何も変わりません。

ペネトレーションテストではありません。ライブ URL がないと、ほとんどのアクセス検査は `UNPROVEN` になります。

`claude plugin install secure-my-app@10x`

[GitHub](https://github.com/Aboudjem/secure-my-app)

#### contextify

**エージェントへの指示が、もう存在しないものを指したら分かる。**

- 通知はファイル、行、使えなくなったコマンドを示します。
- Codex、Cursor、Copilot が直接読む `AGENTS.md` が1つと、Claude Code と Gemini CLI 用の短いポインタ。
- モデルもネットワーク呼び出しも使わないローカルスクリプト。リポジトリが最新なら何も出力しません。

コマンド、ターゲット、ファイルを解決します。コマンドの実行や本文の読解はしません。

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
  <img src="../.github/assets/editors-strip.svg" alt="Works in Claude Code, Cursor, VS Code, Codex, Gemini, Windsurf and Continue, and more through the skills CLI. Three plugins also run as MCP servers." width="100%">
</p>

ここにあるプラグインはすべてスキル、つまりエージェントが読み込む Markdown ファイルとして提供されています。
そのため、9つすべてが `npx skills add` 経由で Claude Code の外部にもインストールできます。
skills CLI は独自の[対応エージェント一覧](https://github.com/vercel-labs/skills#supported-agents)を管理しています。

3つのプラグインは、単体の MCP サーバーとしても動作します。MCP は、エディタが外部ツールに接続するためのプロトコルです。
sniff と ui-ux-suite は npm から直接実行できます。recap-studio は GitHub から直接実行できます: `npx -y github:Aboudjem/recap-studio mcp`。
残りの6つは MCP サーバーを提供していません。

| エージェント | 1行インストール |
|:--|:--|
| Claude Code | `claude plugin install <name>@10x` |
| Cursor、Codex、Copilot、Gemini CLI、および[一覧にあるその他のエージェント](https://github.com/vercel-labs/skills#supported-agents) | `npx skills add Aboudjem/<repo>` |
| 任意の MCP クライアント | `npx sniff-qa --mcp`、`npx ui-ux-suite --mcp`、`npx -y github:Aboudjem/recap-studio mcp` |
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
| **無駄のない既定構成** | プラグインが必要としない依存関係は持ちません。ui-ux-suiteと6つのスキルは依存関係を持ちません。recap-studioのパッケージはzodを、そのWebアプリはNextとReactを取り込みます。sniffは `zod` だけに依存し、ブラウザエンジンと Chromium は初回利用時にダウンロードします (約 440 MB)。 |
| **ワンコマンドインストール** | 設定ファイルもサインアップも不要です。aws-cost-auditだけは、お持ちでない可能性のあるアクセス権、つまりアカウントを読み取れるよう設定されたAWS CLIを必要とします。 |
| **本物のテスト** | ファイルが存在するかではなく、振る舞いを検証するCIです。 |
| **Claude Code以外でも動作** | `npx skills add` 経由で他のエージェントにインストールできます。 |
| **継続的にメンテナンス** | 今四半期のリリースがあり、去年のまま放置されたアーカイブではありません。 |
| **テレメトリなし** | アナリティクスも外部への通信も一切ありません。通信は作業のためだけです。たとえば sniff のブラウザのダウンロードや、ページ内の外部リンクの確認です。 |

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

いいえ。10x にアナリティクスはありません。リストの追加はこのリポジトリをクローンするだけで、何も実行しません。スクリプトとテストは、クローン内であなたが実行したときだけ動きます。

<a id="limits"></a>

## 制限事項

- 10x はプラグインを一覧にするだけで、サンドボックス化はしません。プラグインはあなたの権限で動作します。
- Claude Code のコマンドには `claude` CLI が必要です。他のエージェントでは `npx skills add` を使い、プラグインのリポジトリを1つずつ指定します。
- MCP サーバーを提供しているプラグインは、sniff、ui-ux-suite、recap-studio の3つだけです。
- aws-cost-audit には、アカウントを読み取れる AWS CLI と `jq` が必要です。
- sniff の最初の巡回では、ブラウザエンジンと Chromium を一度だけダウンロードします。Mac でダウンロード約 440 MB、ディスク上で約 730 MB です。`npx sniff-qa install` で事前に済ませられ、MCP ツール `sniff_install` は進捗を報告します。
- ダウンロードが終わるまでは、途中で切れた場合も含め、sniff はセットアップ手順を返します。CLI ではインストールの案内、MCP では `needsSetup` です。
- sniff の MCP サーバーはそのダウンロードより先に応答します。README の計測では、npm キャッシュが空の状態で 3.1 から 4.9 秒で、Claude Code の 30 秒の接続制限を下回ります。
- `claude plugin list` に recap-studio の「The packages it lists were not installed」というメモが出ることがあります。無害です: プラグインは1つのバンドル済みファイルから動きます。
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
