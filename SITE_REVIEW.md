# WorldCalendar 公式サイト：実装・検証報告

実施日：2026年10月31日（日本時間）。作業ブランチ：`feat-toppage`。保護対象の基準コミット：`ad322ee`。push、コミット、mainへのマージ、本番デプロイ、Pages・Play Consoleの設定変更、Androidリポジトリの編集は行っていません。

## 採用技術・構成

既存Jekyllを4.4.1へ更新し、Liquid・Markdown・CSSを継続しました。Astroへの移行をせず、既存文書・相対リンク変換・URLを引き継いでいます。旧github-pages包括gemを、Jekyll・jekyll-relative-links・開発サーバー用webrickの3つの直接依存へ整理しました。依存関係はGemfile.lockで固定し、Ruby 3.3.11とLinux CIに対応します。

共通レイアウト、ナビゲーション、CTA、暦カード、記事テンプレートを部品化しました。Navy・Blue・Whiteを基調とし、主要CTAにYellowを使用しています。レスポンシブなグリッド、読みやすい記事行幅、OS標準フォントを採用しました。外部フォント・アクセス解析・Cookie・フォームサービスはありません。

## 実装したURL

| 用途 | 日本語 | 英語 |
| --- | --- | --- |
| トップ | `/` | `/en/` |
| 機能紹介 | `/features/` | `/en/features/` |
| 暦一覧 | `/calendars/` | `/en/calendars/` |
| グレゴリオ暦 | `/calendars/gregorian/` | `/en/calendars/gregorian/` |
| 日本の旧暦 | `/calendars/japanese-lunar/` | `/en/calendars/japanese-lunar/` |
| ユリウス暦 | `/calendars/julian/` | `/en/calendars/julian/` |
| エチオピア暦 | `/calendars/ethiopian/` | `/en/calendars/ethiopian/` |
| ユダヤ暦 | `/calendars/hebrew/` | `/en/calendars/hebrew/` |
| インド太陰太陽暦 | `/calendars/hindu-amanta/` | `/en/calendars/hindu-amanta/` |
| お知らせ | `/news/` | `/en/news/` |
| お問い合わせ | `/contact/` | `/en/contact/` |
| プライバシー | `/privacy-policy/ja/` | `/privacy-policy/en/` |
| 既存利用規約 | `/terms-of-use/ja/` | `/terms-of-use/en/` |
| 既存ヘルプ | `/helps/ja/` と各11章 | `/helps/en/` と各11章 |

既存の `/privacy-policy/`、`/disclaimer/ja/`、`/disclaimer/en/` を保持し、404ページ、robots.txt、sitemap.xmlを追加しました。お知らせ詳細はMarkdown追加時に生成されます。現時点では公開記事がないため、両言語の一覧は空状態です。

## 仕様・出典の確認根拠

Androidのローカルリポジトリ `/Users/takuma/AndroidStudioProjects/WorldCalendar` のmain、`195b981`（設定上のバージョン1.0.7）と既存の日英ヘルプ・利用規約を参照しました。Google Playの配布バージョンをローカルバージョンと同一とは扱っていません。

| 確認事項 | Androidソース（`app/src/main/java/xyz/takuborn/worldcalendar/` 以下）または既存資料 |
| --- | --- |
| 6種類の暦 | `core/domain/model/CalendarType.kt`、日英strings.xml |
| 日付境界と計算 | `core/domain/converter/` の6暦のConverter、`core/domain/astronomy/LunarYearCache.kt`、`HinduLunisolarYearCache.kt` |
| 旧暦の月構成 | 冬至月を11月、冬至月の間が13か月の場合は中気のない最初の月を閏月とする実装 |
| ユダヤ暦 | Tishreiからの市民暦順、19年周期、エルサレム午前0時 |
| インド暦 | Vikram Samvat・Amanta、新月・恒星黄経・Lahiri近似、Kolkata午前0時、日番号は経過日数でティティではない |
| エチオピア暦 | 13か月、閏年判定、表示はAddis Ababa午前6時、時刻入力は端末タイムゾーン＋6時間 |
| 予定・通知 | `feature/eventedit/EventEditViewModel.kt`、`core/notification/ReminderSchedulerImpl.kt`、ヘルプ第4・5章 |
| 検索・カテゴリ | `feature/schedulesearch/ScheduleSearchViewModel.kt`、ヘルプ第6章 |
| 月・リスト・六曜・節気 | `feature/calendar/CalendarViewModel.kt`、ヘルプ第2・3章 |
| ICS・端末連携 | `core/data/external/ical/IcsEventParser.kt`、既存の実装調査TERMS_REVIEW.md、ヘルプ第7・8章 |
| ウィジェット | `feature/widget/WorldCalendarWidget.kt`、ヘルプ第9章 |
| 問い合わせ先 | 日英プライバシー、日英規約、Android同梱規約の同じGoogleグループアドレス |

一般的な暦の説明には、各記事に国立天文台、米国海軍天文台、インド気象局、エチオピア大使館などの出典を掲載しています。アプリ固有の計算方式と一般的な暦法を分け、未検証の具体的な日付変換例は掲載していません。

アイコンはユーザー提供のworldcalendar_icon_512.png、6暦の画像は提供screenshots内の番号付きPNG、ウィジェット画像はAndroidリポジトリのimages/widget_preview.pngです。提供アイコンの実寸は1254×1254で、64・128・512pxへ最適化しました。画面画像は360・720pxのWebPへ変換し、内容は加工していません。過去の画面・テスト広告・旧UI名を含むため、画面例であることを明示しています。

## 多言語・SEO

UI文言は_data、記事本文は言語別Markdownで管理します。translationKeyによって翻訳済みページ同士を対応付けます。未翻訳の記事は単独で公開可能ですが、存在しない翻訳先のリンクやhreflangは出力しません。

トップの小さなJavaScriptは最優先ブラウザ言語に応じて別言語への案内を表示するだけです。自動転送、言語選択の保存、Cookieはありません。手動言語リンクはHTMLに出力され、モバイルメニューもネイティブdetails/summaryで動作します。

各ページにlang・dir、title、description、canonical、OGP、Xメタデータを設定しました。相互のhreflang、パンくず・BreadcrumbList、確認済み情報だけのSoftwareApplication、サイトマップ、robotsを整備しています。下書き・404・重複案内URLはサイトマップから除外します。公開対象の50URLを掲載しています。

## 実施した検証

| 検証 | 結果 |
| --- | --- |
| Ruby 3.3.11導入・bundle install | 成功。一時ディレクトリへ導入し、システム環境は変更なし |
| プロダクションビルド | Jekyll 4.4.1で成功 |
| 開発サーバー | 127.0.0.1:4000で起動・HTTP 200。検証後停止 |
| 内部リンク・画像・アンカー・見出し | 54ページ、1,685参照、エラー0 |
| 本文保護・バイト保護・SEO・構造化データ | エラー0。54ページ、50サイトマップURL |
| お知らせの統合テスト | 日付順、詳細ページ、下書きのHTML・一覧・サイトマップ除外、下書きへ戻した旧出力削除、不正メタデータのビルド失敗に合格 |
| 言語案内 | 日本語・英語・韓国語・ヘブライ語・言語不明・優先順位・直接アクセスなど10ケースに合格 |
| モバイルメニュー・言語切り替え | 実ブラウザで展開と英語への遷移を確認 |
| キーボード | Tabでスキップリンク・フォーカス枠表示、Enterでmainへ移動、Enterでメニュー展開を確認 |
| 375・768・1440px | 日英トップ・日英機能紹介・日英代表記事・日本語ヘルプ・お問い合わせの各幅で、横スクロールなしを確認 |
| 外部リンク | 15件のHTTP 200を確認。大容量のIGNCA PDFはGET全受信が20秒で時間切れのため、HEADで200を再確認 |
| app-ads.txt配信 | ローカル・既存本番ともHTTP 200、text/plain; charset=utf-8、リダイレクトなしを確認 |
| 差分 | git diff --check成功。Android作業ツリー・本番設定は変更なし |

ブラウザはCodex内蔵ブラウザで表示を確認し、Lighthouseは別のローカルChromeで計測しました。実ブラウザのJavaScript無効化は未実施ですが、静的HTMLに全本文・ナビゲーションがあり、言語案内以外にJavaScriptを使用しないことを確認しています。

### Lighthouse実測

Lighthouse 13.6.0、Apple Silicon版Node 22.23.4、ローカルChrome、ローカル開発サーバーで各条件を1回測定しました。mobileは標準設定、desktopは `--preset=desktop` を使用しました。

| ページ・条件 | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| 日本語トップ mobile | 100 | 100 | 100 | 100 |
| 英語トップ mobile | 99 | 100 | 100 | 100 |
| 日本語機能紹介 mobile | 100 | 100 | 100 | 100 |
| 英語機能紹介 mobile | 100 | 100 | 100 | 100 |
| 日本語旧暦記事 mobile | 100 | 100 | 100 | 100 |
| 英語Amanta記事 mobile | 100 | 100 | 100 | 100 |
| 日本語トップ desktop | 100 | 100 | 100 | 100 |

HTML・JSONレポートは、この作業のローカル成果物ディレクトリ `worldcalendar-qa` に保存しました。作業端末上の場所は `/Users/takuma/.codex/visualizations/2026/10/31/01a18fe6-9350-7853-9f07-ca77051994b6/worldcalendar-qa/` です。

これらはローカルのラボ値で、GitHub Pages上の速度や実利用者のCore Web Vitalsを実測したものではありません。Accessibility 100もWCAG 2.2 AA全項目の適合認証ではありません。

再測定例（Node 22.19以上とChromeが必要）：

```sh
npx --yes lighthouse@13.6.0 http://127.0.0.1:4000/ \
  --chrome-flags="--headless --disable-gpu" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html --output=json --output-path=/tmp/worldcalendar-audit
```

### ローカル環境の補足

端末の標準Ruby 2.6は依存関係を満たさず、既存HomebrewのRubyは4.0でした。Ruby 3.3.11を一時領域にコンパイルし、端末のiOS向け環境変数を除去・macOSターゲット指定して検証しました。実行時にJekyllやLiquidの互換パッチは使用していません。通常の運用ではバージョン管理ツールでRuby 3.3.11を用意してください。

この作業端末の一時環境で再実行する場合：

```sh
export PATH=/private/tmp/worldcalendar-ruby-3.3.11/bin:$PATH
export BUNDLE_PATH=/private/tmp/worldcalendar-bundle-33
bundle exec jekyll serve --host 127.0.0.1
```

一時領域の環境はOS清掃等で消える場合があります。本番CIは.ruby-versionとGemfile.lockから準備し、この一時パスには依存しません。

## 既存資産の維持と移設

日英のヘルプ本文、日英の規約本文、プライバシー本文、既存免責事項案内を保護しています。日本語ヘルプ目次と規約のプライバシーリンク先だけを変更し、共通レイアウトからのリンクを新URLへ切り替えました。既存 `/privacy-policy/ja/` はルートの旧本文と、リンク先を除いて一致しています。制定日・見出し・条項は変更していません。app-ads.txtとCNAMEはソース・出力とも基準ハッシュと完全一致しました。

## 公開手順と外部で必要な対応

READMEの公開チェックリストに従い、承認後にPRを作成してCIを確認します。mainへマージする前に、所有者がPagesのSourceをGitHub Actionsへ切り替えます。現在はlegacy方式、mainのルートを公開しており、旧方式のまま新構成を公開してはいけません。新ワークフローはPR・手動実行ではデプロイせず、mainへのpush時だけ検証済み成果物をデプロイします。

- 独自ドメインはwww.worldcalendar.xyzを維持。既存設定ではHTTPS強制がfalseだったため、所有者が証明書を確認してEnforce HTTPSを設定する。
- Play ConsoleのプライバシーURLは新しい日本語URLへ。実際のConsole設定は参照・変更していない。
- Androidの `values-ja/strings.xml` は既に `/privacy-policy/ja/` を参照。配布済みバイナリの状態は別途確認する。
- Androidの `app/src/main/res/raw/terms_of_use_ja.txt` には旧ルートURLが残る。Android側の別変更でURLだけを更新する。
- ストア説明や配布資料など、その他の管理対象リンクも所有者が確認する。
- 公開後に必須URL、app-ads.txt、HTTPS、Search Consoleでの登録状況を確認する。

## 残された手動確認・制約

- GitHub Actions上の実ビルド・デプロイは、push禁止のため未実施。PRのCIと承認後のデプロイ結果で確認する。
- 内蔵ブラウザは拡大ショートカットでズーム値が変わらず、実際の200%拡大は確認できなかった。Chrome等でズーム200%にし、日英トップ・記事・メニュー・法的文書の文字欠落と操作性を確認する。
- JavaScriptを無効にしたブラウザで、日英切り替えとメニューが操作できることを確認する。
- VoiceOver/TalkBack等での読み上げ、実機Androidブラウザ、全ページの手動WCAG確認は未実施。見出し移動・リンク名・表の読み上げを確認する。
- 問い合わせGoogleグループの受信権限や実際のメール配送は送信を伴うため検証していない。
- 画像は提供された過去版。公開版との最終的な外観一致は所有者がレビューし、必要なら同じ構成で差し替える。
- 記事の将来日付による自動予約公開・Web上の日付変換・計測ツールは実装していない。

## 追加・変更ファイル一覧

以下は今回の作業ツリーのファイル一覧です。生成物_siteとローカル監査レポートはGit管理対象外です。

### 変更

- `Gemfile`
- `README.md`
- `_config.yml`
- `_layouts/default.html`
- `helps/ja/index.md`
- `index.md`
- `scripts/check_site.py`
- `terms-of-use/ja/index.md`

### 追加

- `.github/workflows/pages.yml`
- `.ruby-version`
- `404.html`
- `Gemfile.lock`
- `SITE_REVIEW.md`
- `_calendars/en/ethiopian.md`
- `_calendars/en/gregorian.md`
- `_calendars/en/hebrew.md`
- `_calendars/en/hindu-amanta.md`
- `_calendars/en/japanese-lunar.md`
- `_calendars/en/julian.md`
- `_calendars/ja/ethiopian.md`
- `_calendars/ja/gregorian.md`
- `_calendars/ja/hebrew.md`
- `_calendars/ja/hindu-amanta.md`
- `_calendars/ja/japanese-lunar.md`
- `_calendars/ja/julian.md`
- `_data/features.yml`
- `_data/ui.yml`
- `_includes/calendar-cards.html`
- `_includes/download-section.html`
- `_includes/navigation.html`
- `_includes/play-link.html`
- `_layouts/article.html`
- `_news/.gitkeep`
- `_plugins/site_policy.rb`
- `assets/images/ethiopian-360.webp`
- `assets/images/ethiopian-720.webp`
- `assets/images/gregorian-360.webp`
- `assets/images/gregorian-720.webp`
- `assets/images/hebrew-360.webp`
- `assets/images/hebrew-720.webp`
- `assets/images/hindu-amanta-360.webp`
- `assets/images/hindu-amanta-720.webp`
- `assets/images/icon-128.png`
- `assets/images/icon-512.png`
- `assets/images/icon-64.png`
- `assets/images/japanese-lunar-360.webp`
- `assets/images/japanese-lunar-720.webp`
- `assets/images/julian-360.webp`
- `assets/images/julian-720.webp`
- `assets/images/widget.webp`
- `assets/language-hint.js`
- `assets/site.css`
- `calendars/index.html`
- `contact/index.html`
- `en/calendars/index.html`
- `en/contact/index.html`
- `en/features/index.html`
- `en/index.html`
- `en/news/index.html`
- `features/index.html`
- `news/index.html`
- `robots.txt`
- `scripts/check_content_policy.rb`
- `scripts/check_contracts.py`
- `sitemap.xml`
- `templates/calendar.md`
- `templates/news.md`
- `tests/language-hint.test.cjs`
- `tests/protected-content.json`

## 英語版の追加確認

英語トップは `/en/`、canonicalは `https://www.worldcalendar.xyz/en/` として生成されます。機能紹介・暦一覧と6暦の記事・お知らせ・お問い合わせも英語で実装済みです。

再確認で、JekyllのPageDrop.dir（ソースディレクトリ）とHTMLの文字方向属性の衝突を修正しました。front matterのdir指定を内部のtext_directionへ移し、全54ページで有効な文字方向属性を出力することを検証に追加しました。プロダクションビルド、内部リンク1,685参照、SEO・本文保護の検証は再度成功しています。本番公開は行っていません。
