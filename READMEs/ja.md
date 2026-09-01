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

```bash
claude plugin marketplace add Aboudjem/10x
```

> [!TIP]
> インストールコマンドは 1 つだけ。各プラグインが MCP ツール、スラッシュコマンド、エージェントを自動で接続します。

ここでのバージョンは各プラグイン自身のリリースに従います。詳しくは [docs/SYNC.md](https://github.com/Aboudjem/10x/blob/main/docs/SYNC.md) を参照してください。

---

## プラグイン

現在 7 つのプラグインがあります。そのすべてが以下の[品質基準](#10x-の基準)を満たしています。

### <img src="https://img.shields.io/badge/01-sniff-ef4444?style=flat-square" alt="sniff">&nbsp;&nbsp;ユーザーより先にバグを見つける

> 実行中のアプリに向けるだけ。実際のユーザーの動線を実際のブラウザで巡回し、本当に壊れている箇所を証拠付きで教えてくれます。

実行中のアプリを実際のブラウザで開き、人がするようにクリックして進みます。壊れている箇所のランク付きリストが返り、各所見には再現手順が付きます。動いているアプリが必要です。サーバーが立っていない場合、sniff はソースコードの読み取りにとどまります。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/sniff-diagram.svg" alt="sniff は実行中のアプリを巡回し、その動線を発見して、優先順位付けされたバグ・アクセシビリティ・パフォーマンスの検出結果を返します" width="100%"></p>

```bash
claude plugin install sniff@10x     # as a plugin (primary)
npx sniff-qa                        # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/sniff/main/install.sh | bash -s codex
```

441 個のテスト。12 種類のバグ分類。

<p><a href="https://github.com/Aboudjem/sniff">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/sniff-qa">npm →</a></p>

---

### <img src="https://img.shields.io/badge/02-ui--ux--suite-0ea5e9?style=flat-square" alt="ui-ux-suite">&nbsp;&nbsp;あなたのデザイン品質を、数値化する

> **デザイン向けの ESLint。** 正確な行、測定された誤った値、そして正確な修正方法を示します。

あなたの CSS、JSX、Tailwind の設定を読み取り、色、タイポグラフィ、余白、アクセシビリティなど、デザインの 12 の側面を採点します。各所見には、ファイル、行、誤っている値、そして修正方法が記されます。報告するだけで編集はしないので、修正を適用するかどうかはあなた次第です。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/uiux-diagram.svg" alt="ui-ux-suite はプロジェクトをスキャンし、12 のデザイン次元を採点して、各検出結果がどの UX 法則に違反しているかを引用した監査結果を返します" width="100%"></p>

```bash
claude plugin install ui-ux-suite@10x   # as a plugin (primary)
npx ui-ux-suite                         # as a standalone CLI
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/ui-ux-suite/main/install.sh | bash -s codex
```

311 個のテスト。重み付けされた 12 の次元。

<p><a href="https://github.com/Aboudjem/ui-ux-suite">GitHub →</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/ui-ux-suite">npm →</a></p>

---

### <img src="https://img.shields.io/badge/03-recap--studio-7c5cff?style=flat-square" alt="recap-studio">&nbsp;&nbsp;5 分未満で 1 ページの解説を

> どんなトピックやコーディングセッションも、ダブルクリックで開ける美しいダークモード・モバイルファーストの解説ページに変えます。サーバーなし、インターネット接続なし、依存関係なし。

トピックを与える、あるいはコーディングセッションを指定するだけで、ダブルクリックで開ける 1 枚の HTML ページが得られます。オフラインで動作し、すべての主張には出典が付きます。公開前には高速なチェッカーがページを採点しますが、そのスコアは構造上のシグナルであって、査読ではありません。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/recap-studio-diagram.svg" alt="recap-studio はトピックや git diff を受け取り、明確さとアクセシビリティの決定論的なチェックを実行して、自己完結型の 1 ページの解説を出力します" width="100%"></p>

```bash
claude plugin install recap-studio@10x   # as a plugin (primary)
/recap "Latest AI models"                # in any Claude Code session
# one-line multi-CLI install (Cursor, Codex, Gemini, Copilot, and more):
curl -fsSL https://raw.githubusercontent.com/Aboudjem/recap-studio/main/install.sh | bash -s codex
```

テストを持つ 5 つのパッケージにわたる 43 個のテスト。

<p><a href="https://github.com/Aboudjem/recap-studio">GitHub →</a> &nbsp;·&nbsp; <a href="https://github.com/Aboudjem/recap-studio/blob/main/docs/architecture.md">アーキテクチャ →</a></p>

---

### <img src="https://img.shields.io/badge/04-aws--cost--audit-FF9900?style=flat-square" alt="aws-cost-audit">&nbsp;&nbsp;AWS の請求を、安全に監査する

> Claude に AWS の請求を監査させましょう。すべての数値がライブの AWS 料金と照合された、明確な節約プランが得られます。あなたの許可なしには何も削除されません。

あなたのアカウントを読み取り、各リソースの本当のコストを算出して、アイドル状態や過剰な規模のリソースを見つけます。各節約案には信頼度、その根拠となる証拠、そして元に戻す方法が付きます。デフォルトでは読み取り専用なので、ドライランが通ってあなたが了承するまで何も変わりません。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/aws-cost-audit-diagram.svg" alt="aws-cost-audit はライブの AWS アカウントを読み取り、すべてのドルを割り当て、価格をライブで検証して、根拠に裏付けられたゲート付きの節約プランを返します" width="100%"></p>

```bash
claude plugin install aws-cost-audit@10x   # as a plugin (primary)
# one-line install into another CLI's skills directory:
curl -fsSL https://raw.githubusercontent.com/Aboudjem/aws-cost-audit-skill/main/install.sh | bash -s codex
```

<p><a href="https://github.com/Aboudjem/aws-cost-audit-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/05-goalify-3FB950?style=flat-square" alt="goalify">&nbsp;&nbsp;終わったという約束ではなく、終わった証拠を

> Claude に大きなタスクを託しましょう。終わったという約束ではなく、終わった証拠を確認しに戻ってくるだけです。

じっと見ていられないほど大きな仕事のために、goalify は **brief**（その実行がやるべきことを書いたファイル）と **condition**（`/goal` に貼り付ける 1 行）を書き出します。チャットをクリアしてその 1 行を貼り付けると、新しいセッションが仕事全体をこなし、最後に通ったチェックを引用して締めくくります。実行が止まったからといって終わった証拠にはならないので、その締めくくりの証拠を信じる前に必ず読んでください。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/goalify-diagram.svg" alt="goalify はリポジトリを調査し、本当に必要な数少ない決定を確定し、新しいセッションが実行・検証し、すべてのチェックが通った時点で .goal/done/ に格納する brief と condition を書き出します" width="100%"></p>

```bash
claude plugin install goalify@10x   # as a plugin (primary)
/goalify <your task>                # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/goalify">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/06-humanizer-d946ef?style=flat-square" alt="humanizer">&nbsp;&nbsp;AI っぽい文章を、人間らしい文章に書き直す

> Humanizer は無料でオープンソースの AI ライティング判定・人間化ツールです。

文章を貼り付けると、機械が書いたように読める度合いを採点するか、あなたが選んだボイスで書き直します。書き直された文章は、人がするように文の長さにばらつきを持たせます。単一の Markdown ファイルで完結し、あなたのマシンから何も出ていきません。目指すのは検出ツールを欺くことではなく、より良い文章です。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/humanizer-diagram.svg" alt="humanizer は文章から AI 特有のパターンをスキャンし、0 から 100 のスケールでどれだけ AI らしく読めるかを採点し、あなたが選んだボイスで文長のばらつきを持たせて書き直します" width="100%"></p>

```bash
claude plugin install humanizer@10x   # as a plugin (primary)
/humanizer "<your text>"              # then, in any Claude Code session
```

55 種類のパターン、5 つのボイス、0〜100 の AI 検出スコア。

<p><a href="https://github.com/Aboudjem/humanizer-skill">GitHub →</a></p>

---

### <img src="https://img.shields.io/badge/07-loopify-14b8a6?style=flat-square" alt="loopify">&nbsp;&nbsp;繰り返す仕事を、任せる

> Claude に繰り返す仕事を託しましょう。あなたが見張らなければならないループではなく、各 tick が何をしたかのログを確認しに戻ってくるだけです。

デプロイが落ち着くまで見張る、新しいバグ報告を 1 時間おきに片づけるなど、いつまでも終わらない仕事があります。loopify は **brief**（ループが毎回読み直す常設ファイル）と **line**（`/loop` に貼り付ける 1 つの文字列）を書き出し、tick の上限と停止ルールはその line の中に収められています。tick のたびに、何をしたかが `TICKS.md` に記録されます。そのログは読むべきものです。何もすることがなかったループも、午後じゅう作業していたループも、外から見れば同じに見えるからです。

<p align="center"><img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/loopify-diagram.svg" alt="loopify は繰り返す仕事の 1 サイクルのスコープを定め、brief と /loop に貼り付ける line を書き出します。以後は tick ごとに brief を読み直し、1 サイクルを実行し、やったことを TICKS.md に追記します" width="100%"></p>

```bash
claude plugin install loopify@10x   # as a plugin (primary)
/loopify <your job>                 # then, in any Claude Code session
```

<p><a href="https://github.com/Aboudjem/loopify">GitHub →</a></p>

---

## あらゆる AI エディタで動作

<p align="center">
  <img src="https://raw.githubusercontent.com/Aboudjem/10x/main/.github/assets/editors-strip.svg" alt="Claude Code、Cursor、VS Code、Codex、Gemini、Windsurf、Continue、その他あらゆる MCP 対応エディタで動作します" width="100%">
</p>

sniff、ui-ux-suite、recap-studio はデュアルモードです。Claude Code プラグインとしてインストールするか、お好みのエディタで素のままの MCP サーバーとして実行できます。aws-cost-audit、goalify、humanizer、loopify は MCP サーバーではなく Claude Code のスキルなので、Claude Code 内で動作します。

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
| **積極的にメンテナンス** | 今四半期にリリース、昨年に放置ではない |
| **テレメトリなし** | ローカルで動作し、あなたのコードはマシンから出ない |

完全なチェックリストは [`QUALITY-BAR.md`](https://github.com/Aboudjem/10x/blob/main/QUALITY-BAR.md) にあります。メンテナーは四半期レビューで各プラグインを再検証します。

> [!NOTE]
> 現在のラインナップ: **sniff 0.7.0**（441 tests）、**ui-ux-suite 0.5.0**（311 tests）、**recap-studio 0.4.0**（テストを持つ 5 つのパッケージにわたる 43 tests）、**aws-cost-audit 0.2.0**（デフォルトで読み取り専用）、**goalify 2.5.0**、**humanizer 0.6.2**（55 patterns）、**loopify 1.0.0**。最終検証日: 2026-09-01。

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
