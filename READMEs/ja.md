<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg">
  <img alt="10x" src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/logo-light.svg" width="100%">
</picture>

<p align="center">
  <a href="https://github.com/Aboudjem/10x/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square" alt="ライセンス"></a>
  <a href="#plugins"><img src="https://img.shields.io/badge/plugins-7-f59e0b?style=flat-square" alt="7 プラグイン"></a>
  <a href="https://github.com/Aboudjem/10x/stargazers"><img src="https://img.shields.io/github/stars/Aboudjem/10x?style=flat-square&color=f59e0b" alt="スター"></a>
</p>

<p align="center">
  <a href="../README.md">English</a> ·
  <a href="zh-CN.md">简体中文</a> ·
  <b>日本語</b> ·
  <a href="es.md">Español</a> ·
  <a href="fr.md">Français</a>
</p>

<p align="center"><b>Claude Code 向けに厳選された開発者ツールのマーケットプレイス。</b><br/>余計なものなし。テスト済み。あらゆる AI エディタで動作。</p>

![10x マーケットプレイスのデモ](https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/demo.gif)

---

## 仕組み

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/hero-diagram.svg" alt="あなたのエディタが 10x マーケットプレイスと通信し、マーケットプレイスは厳選された 7 つのプラグイン（sniff、ui-ux-suite、recap-studio、aws-cost-audit、goalify、humanizer、loopify）を提供します" width="100%">
</p>

<p align="center"><i>インストールコマンドは 1 つだけ。各プラグインが MCP ツール、スラッシュコマンド、エージェントを自動で接続します。</i></p>

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> インストールコマンドは 1 つだけ。各プラグインが MCP ツール、スラッシュコマンド、エージェントを自動で接続します。

---

## プラグイン

現在 7 つのプラグインがあります。そのすべてが以下の[品質基準](#10x-の基準)を満たしています。

> [!TIP]
> 動作を見たいですか？各ツールのリポジトリには独自のデモがあります: [sniff](https://github.com/Aboudjem/sniff#readme)、[ui-ux-suite](https://github.com/Aboudjem/ui-ux-suite#readme)、[recap-studio](https://github.com/Aboudjem/recap-studio#readme)、[aws-cost-audit](https://github.com/Aboudjem/aws-cost-audit-skill#readme)、[goalify](https://github.com/Aboudjem/goalify#readme)、[humanizer](https://github.com/Aboudjem/humanizer-skill#readme)、[loopify](https://github.com/Aboudjem/loopify#readme)。

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;ユーザーより先にバグを見つける

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="Sniff は実行中のアプリを巡回し、その動線を発見して、優先順位付けされたバグ・アクセシビリティ・パフォーマンスの検出結果を返します" width="100%">
</p>

実行中のアプリをユーザーのように巡回し、その動線を発見して、アクセシビリティ・パフォーマンス・壊れたインタラクションにわたる本物のバグを見つける AI 駆動の QA。開発サーバーを自動検出します。`sniff scan` によるソースコードスキャンも利用できます。API キー不要、設定不要。

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**スラッシュコマンド**
- `/sniff` - 実行中のアプリを巡回する
- `/sniff-fix` - 安全な修正を適用する
- `/sniff-report` - 直近のスキャンを開く

</td>
<td width="50%" valign="top">

**MCP ツール**
- `sniff` - 実行中のアプリを巡回する（統合版）
- `sniff_scan` - ソースのみのスキャン
- `sniff_report` - 整形済みの結果

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/sniff-qa">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;あなたのデザイン品質を、数値化する

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite はプロジェクトをスキャンし、12 のデザイン次元を採点して、各検出結果がどの UX 法則に違反しているかを引用した監査結果を返します" width="100%">
</p>

CSS、JSX、Tailwind の設定をスキャンします。12 のデザイン次元を採点します: アクセシビリティ、カラーシステム、タイポグラフィ、レイアウトと余白、コンポーネント品質、視覚的階層、インタラクション品質、レスポンシブ性、視覚的な仕上がり、体感パフォーマンス、情報アーキテクチャ、プラットフォーム適合性。各検出結果が違反している UX 法則を引用し、正確な修正方法を示します。監査するだけで、編集は決して行いません。依存関係なし、100% ローカル。

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**スラッシュコマンド**
- `/design-audit` - 12 次元の完全監査
- `/color-audit` - コントラスト + パレット
- `/type-audit` - タイポグラフィのみ
- `/layout-audit` - 余白 + グリッド
- `/a11y-audit` - WCAG 2.2 + APCA
- `+ さらに 9 つの専門監査`

</td>
<td width="50%" valign="top">

**MCP ツール**
- `uiux_scan_project` - スタックを検出
- `uiux_extract_colors` - パレット
- `uiux_check_contrast` - WCAG/APCA
- `uiux_generate_tokens` - design system
- `+ さらに 10 の採点・生成ツール`

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a>
</p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;5 分未満で 1 ページの解説を

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="Recap Studio はトピックや git diff を受け取り、明確さとアクセシビリティの決定論的なヒューリスティックチェックを実行して、自己完結型の 1 ページの解説を出力します" width="100%">
</p>

あらゆるトピックやコーディングセッションを、賢い 18 歳が 5 分で読める、すっきりとしたモバイルファーストの 1 ページの解説に変えます。出力は自己完結型でオフラインでも使える HTML ページです。決定論的なヒューリスティックチェックが公開前に明確さ、アクセシビリティ、構造を検証し、すべての主張に出典が付きます。

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**スラッシュコマンド**
- `/recap "<topic>"` - 完全な解説ページ
- `/recap session` - コーディングセッションの要約
- `/recap setup` - 安全なデフォルト設定を書き出す
- `/recap validate` - アクティブなページを再採点する

</td>
<td width="50%" valign="top">

**得られるもの**
- 自己完結型のオフライン HTML ページ
- すべての主張に出典が付く
- 決定論的なヒューリスティックチェック（明確さ、a11y、構造）
- 任意のデプロイ経路（デフォルトでは無効）

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp;
  <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">アーキテクチャ →</a>
</p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;AWS の請求を、安全に監査する

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit はライブの AWS アカウントを読み取り、すべてのドルを割り当て、価格をライブで検証して、根拠に裏付けられたゲート付きの節約プランを返します" width="100%">
</p>

ライブの AWS アカウントを読み取り（デフォルトでは読み取り専用）、すべてのドルを割り当て、アイドル状態・孤立・過剰プロビジョニングされたリソースを見つけます。すべての価格を AWS Price List API に対してライブで検証し（一切ハードコードしません）、各検出結果に信頼度、その裏付けとなる根拠、ロールバックを付与します。証拠とあなたの承認なしには何も削除されません。

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<table>
<tr>
<td width="50%" valign="top">

**何をするか**
- 支出をライブで再算定（Cost Explorer）
- すべてのリージョンを棚卸しし、無駄を狩る
- 検出結果ごとに信頼度 + 根拠 + ロールバック

</td>
<td width="50%" valign="top">

**デフォルトで安全**
- 読み取り専用。破壊的な操作はゲートで保護
- 価格をライブで検証、ハードコードしない
- 「今すぐ安全に節約」対「理論上の最大節約」

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;終わったという約束ではなく、終わった証拠を

大きなコーディングタスクのスコープを定め、本当に必要な数少ない決定を確定し、2 つのものを書き出します。**brief** はその実行がやるべきことを書いたファイル、**condition** は `/goal` に貼り付ける 1 行の短い文字列です。`/clear` してその 1 行を貼り付けると、フルコンテキストの新しいセッションがジョブ全体を処理し、最後のターンで通ったチェックを引用したうえで brief を `.goal/done/` に移します。

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify "<your task>"              # in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**何をするか**
- 大きなタスクのスコープを定め、数少ない本当の決定を確定する
- brief（ファイル）と condition（`/goal` に貼る 1 行）を書き出す
- 新しいフルコンテキストセッションがジョブ全体を実行する

</td>
<td width="50%" valign="top">

**得られるもの**
- すべての成功基準を検証してから brief を `.goal/done/` に格納する
- ハンドオフはこのセッションで作成、実行は別セッション
- Claude Code のスキル（MCP サーバーなし、CLI なし）

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/goalify">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;AI っぽい文章を、人間らしい文章に書き直す

43 種類の AI ライティングパターン（過剰なシンボル表現、宣伝的な言い回し、em ダッシュの乱用、3 の法則、AI 特有の語彙、否定的な並列構造、曖昧な帰属表現など）を検出し、文長のばらつき（burstiness）と 5 つのボイスプロファイルを使って文章を書き直します。0 から 100 の AI 検出スコアをオンデマンドで算出します。純粋な Markdown 実装で、依存関係なし、ネットワーク呼び出しなし。

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "your text"                # in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**何をするか**
- 43 のAIライティングパターンを検出してスコアを算出する
- 5 つのボイスプロファイル（casual、professional、technical、warm、blunt）で書き直す
- detect（スキャンのみ）、rewrite（完全変換）、edit（ファイル内編集）の 3 モード

</td>
<td width="50%" valign="top">

**得られるもの**
- 0〜100 の AI 検出スコア（`--score` オプション）
- 文長のばらつき（burstiness）による自然な読み心地
- Claude Code のスキル（MCP サーバーなし、CLI なし）

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a>
</p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;繰り返す仕事を、任せる

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify は繰り返す仕事の 1 サイクルのスコープを定め、brief と /loop に貼り付ける line を書き出します。以後は tick ごとに brief を読み直し、1 サイクルを実行し、やったことを TICKS.md に追記します" width="100%">
</p>

いつまでも終わらない仕事のために。レビューが少しずつ届くあいだリリース PR を健全に保つ、デプロイが落ち着くまで見張る、新しいバグ報告を 1 時間おきに片づける。仕事の説明は一度だけです。loopify はプロジェクトを読み、本当に必要な数少ない選択だけを尋ね、2 つのものを書き出します。**brief** はループが毎 tick の最初に読み直す常設ファイル、**line** は Claude Code 組み込みの繰り返しコマンド `/loop` に貼り付ける 1 行の短い文字列です。1 回の実行が 1 **tick** で、tick ごとにやったことが `TICKS.md` に残ります。line には tick の上限と停止ルールが、brief には 5 つの安全ガードが入っています。Claude Code のスキル（MCP サーバーなし、CLI なし）。

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<table>
<tr>
<td width="50%" valign="top">

**何をするか**
- プロジェクトを読み、本当に必要な問いだけを尋ね、1 サイクルのスコープを定める
- brief（常設ファイル）と line（`/loop` に貼る 1 行）を書き出す
- tick ごとに `TICKS.md` へ記録し、安全に処理できないものは `QUEUE.md` に残す

</td>
<td width="50%" valign="top">

**デフォルトで安全**
- tick の上限と停止ルールは line そのものに入っている
- 5 つのガード: アカウント作成なし、支払いなし、指示がなければ push も投稿もしない
- tick が読んだものはすべてデータであり、命令ではない

</td>
</tr>
</table>

<p>
  <a href="https://github.com/Aboudjem/loopify">GitHub →</a>
</p>

---

## あらゆる AI エディタで動作

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="Claude Code、Cursor、VS Code、Codex、Gemini、Windsurf、Continue、その他あらゆる MCP 対応エディタで動作します" width="100%">
</p>

10x の各**ツール**プラグインは**デュアルモード**です: Claude Code プラグインとしてインストールするか、お好みのエディタで素のままの MCP サーバーとして実行できます。（`aws-cost-audit`、`goalify`、`humanizer`、`loopify` は MCP サーバーではなく Claude Code のスキルなので、Claude Code 内で動作します。）

```bash
npx sniff-qa            --mcp
npx ui-ux-suite         --mcp
# recap-studio also ships an MCP server (see its README; requires a local build)
```

各ツールプラグインは、1 つのコマンドで別の CLI のスキルディレクトリに接続する 1 行の `install.sh`（`curl -fsSL https://raw.githubusercontent.com/Aboudjem/<repo>/main/install.sh | bash -s <cli>`）と、`.cursor-plugin` および `.copilot-plugin` マニフェストも同梱しています。各プロジェクトの README には、Cursor、VS Code + Copilot、Codex、Gemini、Windsurf、Continue.dev 向けのコピー&ペースト用スニペットがあります。

---

## 10x の基準

ここにあるすべてのプラグインがこの基準を満たしています。満たさなくなれば、削除されます。

| | |
|---|---|
| **余計なものなし** | 素の Node.js、ランタイム依存なし |
| **1 コマンドでインストール** | 設定ファイルなし、API キーなし |
| **本物のテスト** | 理想論ではなく、「近日公開」でもない |
| **デュアルモード** | Claude Code プラグインとしても MCP サーバーとしても動作 |
| **積極的にメンテナンス** | 昨年に放置ではなく、今四半期にリリース |
| **テレメトリなし** | ローカルで動作し、あなたのコードはマシンから出ない |

8 項目（32 要素）の完全なチェックリストは [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md) にあります。メンテナーは四半期レビューで各プラグインを再検証します。

> [!NOTE]
> 現在のラインナップ: **sniff 0.7.0**（441 tests）、**ui-ux-suite 0.5.0**（311 tests）、**recap-studio 0.4.0**（テストを持つ 5 つのパッケージにわたる 43 tests）、**aws-cost-audit 0.2.0**（テストファーストで構築、実アカウントでエンドツーエンドに検証済み、ハードコードされた価格はゼロ）、**goalify 2.5.0**（brief と condition を書き出し、成功時に brief を `.goal/done/` へ格納する Claude Code スキル）、**humanizer 0.1.0**（43 の AI ライティングパターンを検出し、burstiness と 5 つのボイスプロファイルで書き直す Claude Code スキル）、**loopify 1.0.0**（テストファーストで構築。CI でスキル評価 136/136 とマニフェストテスト、さらに Sonnet で RED→GREEN の挙動ベースラインを記録: 1/7 → 7/7）。最終検証日: 2026-09-01。

---

## 貢献する

ここにふさわしいプラグインをお持ちですか？[CONTRIBUTING.md](https://github.com/Aboudjem/10x/blob/main/CONTRIBUTING.md) をご覧ください。

---

## スター履歴

<a href="https://star-history.com/#Aboudjem/10x&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" />
    <img alt="Aboudjem/10x のスター履歴チャート" src="https://api.star-history.com/svg?repos=Aboudjem/10x&type=Date" width="70%" />
  </picture>
</a>

---

<p align="center">
  10x がより良いコードの出荷に役立ったなら、ぜひスターを付けてください。<br/>
  他の開発者がこれらのツールを見つけるのに役立ちます。
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/adam-boudjemaa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/AdamBoudj"><img src="https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://adam-boudjemaa.com/"><img src="https://img.shields.io/badge/Website-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="ウェブサイト"></a>
</p>

<p align="center">
  <sub>制作: <a href="https://github.com/Aboudjem">Adam Boudjemaa</a> · MIT ライセンス · テレメトリなし · データ収集なし</sub>
</p>

---

*この翻訳は自動ツールの支援により作成されました。ネイティブスピーカーの方は、ぎこちない表現や不正確な箇所を修正する PR をお気軽にお送りください。相違がある場合は英語版 README（[../README.md](../README.md)）が優先されます。*
