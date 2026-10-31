# WorldCalendar 公式サイト

世界の暦を紹介し、Androidアプリの利用につなげる日本語・英語の静的サイトです。公式ドメインは https://www.worldcalendar.xyz/ です。既存ヘルプ・利用規約・プライバシーポリシーを引き継いでいます。

## 技術と採用理由

Jekyll 4.4、Liquid、Markdown、CSS、Ruby 3.3、GitHub Actionsを使用します。既存のMarkdownとURL、相対リンク変換を活かせるためJekyllを継続しました。GitHub Pagesの標準ブランチビルドではなく、Actionsで生成済みHTMLを公開します。依存関係は必要なgemに絞り、Gemfile.lockを管理します。Node 22は言語案内のテスト用で、サイトのビルド・閲覧には不要です。

外部Webフォント・アクセス解析・Cookie・フォームサービスは使用しません。クライアントJavaScriptはトップの言語案内だけです。

## ディレクトリ構成

| 場所 | 用途 |
| --- | --- |
| `index.md` / `en/index.html` | 日本語・英語のトップ |
| `features/`, `calendars/`, `news/`, `contact/` と `en/` 以下 | 各言語の紹介・一覧ページ |
| `_calendars/ja/`, `_calendars/en/` | 6種類の暦のMarkdown記事 |
| `_news/ja/`, `_news/en/` | お知らせ記事（初期状態は記事なし） |
| `_data/` | 日英のUI文言・機能説明 |
| `_layouts/`, `_includes/` | 共通レイアウト・部品 |
| `_plugins/site_policy.rb` | メタデータ検証・下書き除外・言語対応付け |
| `helps/ja/`, `helps/en/` | 既存ヘルプ目次と各11章 |
| `privacy-policy/`, `terms-of-use/`, `disclaimer/` | 既存文書と互換URL |
| `assets/images/`, `assets/site.css` | 最適化済み画像・共通CSS |
| `scripts/`, `tests/` | リンク・SEO・本文保護・記事・言語案内の検証 |
| `templates/` | 公開対象外の記事雛形 |
| `.github/workflows/pages.yml` | ビルド・検証・Pagesデプロイ |
| `_site/` | ビルド出力。Git管理しない |

## 開発環境の準備

Rubyのバージョン管理ツールなどで `.ruby-version` のRuby 3.3.11を用意します。macOSのシステムRuby 2.6は使用しないでください。Python 3.9以上と、テスト用にNode 22を使用します。

```sh
ruby --version
bundle --version
bundle install
```

依存関係の解決結果はGemfile.lockに固定します。Linux CI用のプラットフォームも含んでいます。依存関係変更時は意図した差分だけを更新してください。

## ローカル起動

```sh
bundle exec jekyll serve --host 127.0.0.1
```

表示されたローカルURLを開きます。日本語は `/`、英語は `/en/` です。自動リダイレクトはありません。日本語以外を最優先にしたブラウザで日本語トップを開くと「View in English」を表示し、日本語ブラウザで英語トップを開くと日本語の案内を表示します。手動切り替えはメニューから常に利用でき、言語選択の保存は行いません。

## プロダクションビルドと検証

```sh
JEKYLL_ENV=production bundle exec jekyll build --trace
python3 scripts/check_site.py _site
python3 scripts/check_contracts.py _site
bundle exec ruby scripts/check_content_policy.rb
node --test tests/language-hint.test.cjs
```

`check_contracts.py` は保護対象本文のハッシュ、app-ads.txtとCNAMEのバイト一致、必須URL、メタデータ、相互hreflang、構造化データ、サイトマップを確認します。本文ハッシュは移設前のコミット `ad322ee` を基準に、front matterとMarkdownリンクのリンク先だけを除いて記録しています。基準ハッシュを、失敗を回避するためだけに更新しないでください。

記事テストは一時ディレクトリにだけテスト記事を作成し、日付順、個別ページ、下書きの直接URL・一覧・サイトマップからの除外、公開から下書きへ戻した際の出力削除、不正メタデータでのビルド失敗を検証します。テスト記事は公開サイトへ追加されません。

## GitHub Pagesへの公開

**push・mainへのマージ・本番デプロイ・設定変更には、所有者の明示的な承認が必要です。** ローカルの変更だけでは公開されません。

調査時点のPages設定はmainの `/(root)` からのブランチ公開です。新構成ではカスタムプラグインを使うため、公開前に次の順序で切り替えます。

1. ローカル検証とレビューを完了する。
2. 承認後にブランチをpushし、PRのビルド・検証を通す。
3. 所有者が **Settings → Pages → Build and deployment → Source → GitHub Actions** に切り替える。旧方式のままmainへマージしない。切り替え時は現在の公開サイトが引き続き配信されることを確認する。
4. 重複する独自デプロイワークフローがないことを確認する。既存のブランチ方式のデプロイはSource変更で停止する。
5. 承認後にmainへマージする。ビルド・検証成功後だけ、同じワークフローのdeployジョブが実行される。
6. Actionsの成功、Pagesの公開URL、全必須URLを確認する。

PRと手動実行ではビルド・検証・アーティファクト作成だけを行い、デプロイしません。deployはmainへのpushに限定し、`needs: build` と `github-pages` 環境を使用します。必要に応じて同環境の保護ルールを所有者が設定してください。

## 独自ドメインとHTTPS

CNAMEの `www.worldcalendar.xyz` を維持します。`url` は `https://www.worldcalendar.xyz`、`baseurl` は空文字です。DNSの変更は今回不要です。公開前に既存DNS・PagesのCustom domain・証明書を確認してください。

調査時点で `https_enforced` はfalseでしたが、HTTPSの既存URLは応答しました。所有者が証明書の有効性を確認後、**Enforce HTTPS** を有効化してください。この作業では設定を変更していません。

## 新しい暦の記事を追加する

`templates/calendar.md` を `_calendars/ja/<slug>.md` にコピーします。言語・公開URL・翻訳キー・日付・本文を実際の内容に合わせます。

- `permalink: /calendars/<slug>/`
- `language: ja`
- `translationKey: calendar-<slug>`
- `draft: false` の記事だけを公開する。作業中はtrueのままにする。
- `publishedAt` と `updatedAt` は引用符付きの実際の日付 `YYYY-MM-DD`。更新日は公開日以降。
- `family` は暦の分類、`order` は一覧の並び順。

一般的な仕組みとアプリ固有の実装を分け、出典・制約・関連リンクを記載します。新しい暦へのアプリ対応を確認するまでは「対応する暦」として追加しないでください。本文にh1は書かず、記事レイアウトのh1に続けてh2から始めます。

## お知らせを追加する

`templates/news.md` を `_news/ja/<slug>.md` にコピーします。必要なメタデータは `title`, `description`, `language`, `publishedAt`, `updatedAt`, `draft`, `translationKey`, `permalink` です。

- 日本語記事URLは `/news/<slug>/`。
- 英語記事URLは `/en/news/<slug>/`。
- 同じ言語の記事は公開日の降順で表示する。
- `draft: true` はHTML・一覧・サイトマップから除外する。
- 日付や必須メタデータが不正な場合、ビルドは失敗する。
- 記事がない言語には空状態を表示する。架空のリリース記事は追加しない。

公開日が未来でも自動予約公開する仕組みではありません。公開可能になるまで `draft: true` を維持し、公開時にfalseへ変更してください。

## 英語コンテンツと将来の言語追加

英語の本文は各コレクションの `en/` に置き、`language: en` と `/en/` 以下のpermalinkを指定します。対応する日英記事には同じ `translationKey` を付けます。英語だけの記事も作成可能で、翻訳先がなければ言語切り替えは表示しません。

共通UIは `_data/ui.yml`、機能説明は `_data/features.yml` で管理します。本文とUIを分け、自然な英語を使用します。既存ヘルプ・法的文書は各 `/en/` URLを利用します。将来の言語はUIデータとルートを追加し、対応文書を用意します。RTL言語ではfront matterに `dir: rtl` を指定し、表示・ナビゲーションを実機確認してください。

## SEOの管理

各ページのtitle・descriptionを設定します。canonical・OGP・Xメタデータ・hreflangは共通レイアウトから出力します。サイトマップは公開ページから生成し、下書き、404、重複案内URLを除外します。記事の更新日は実際に本文を更新した日に変更します。SoftwareApplicationに架空の評価・件数は追加しません。

公開後はGoogle Search Consoleで所有権を既存方式または所有者に発行された情報で確認し、`https://www.worldcalendar.xyz/sitemap.xml` を送信します。日英トップと各暦記事をURL検査し、取得可否・ユーザー指定canonical・Google選択canonicalを確認します。インデックス登録リクエスト後は「ページのインデックス登録」で経過を確認します。登録や順位を保証するものではありません。所有権トークンは推測で追加しません。

## app-ads.txtの管理

ルートのファイルをそのままビルド出力へコピーします。内容・改行を変更しないでください。front matterを付けず、HTML化やリダイレクトを設定しません。

```sh
cmp app-ads.txt _site/app-ads.txt
cmp CNAME _site/CNAME
curl -I https://www.worldcalendar.xyz/app-ads.txt
```

公開後もHTTP 200、`Content-Type: text/plain`、リダイレクトなし、公開ファイルと管理ファイルの同一内容を確認します。GitHub PagesのContent-Typeはホスティング側の配信設定であり、Jekyllでヘッダーを指定するものではありません。

## 法的文書のURL管理

| 文書 | 日本語 | 英語 |
| --- | --- | --- |
| プライバシーポリシー | `/privacy-policy/ja/` | `/privacy-policy/en/` |
| 利用規約 | `/terms-of-use/ja/` | `/terms-of-use/en/` |
| ヘルプ | `/helps/ja/` | `/helps/en/` |

既存の `/privacy-policy/` は本文を保持する互換URLで、canonicalは日本語の正規URLを指定します。`/disclaimer/ja/` と `/disclaimer/en/` は既存の規約案内を維持します。法的本文の変更は今回のサイト実装から切り離して扱ってください。

旧 `/` は紹介トップになるため、プライバシーポリシーへの転送はできません。公開に合わせて次を確認します。

| 管理対象 | 対応 |
| --- | --- |
| Google Play Console | 日本語プライバシーポリシーURLを `https://www.worldcalendar.xyz/privacy-policy/ja/` に変更。Consoleの実設定は未確認・未変更 |
| Web内の日本語リンク | 共通ナビゲーション、ヘルプ目次、利用規約のリンク先を更新済み |
| Android日本語の設定リンク | ローカルmainの `values-ja/strings.xml` は新URLを参照済み。配布中バイナリにも反映済みか所有者が確認 |
| Android同梱の日本語利用規約 | `app/src/main/res/raw/terms_of_use_ja.txt` に旧ルートURLが残る。別のAndroid変更でURLのみ更新する |
| 英語リンク | 既存 `/privacy-policy/en/` を維持 |
| ストア説明・配布資料・その他管理対象 | 所有者が旧ルートをプライバシーとして参照していないか確認 |

## 公開前チェックリスト

- [ ] 日英の本文・出典・機能と公開版アプリの整合をレビュー
- [ ] 提供画像は過去の画面例であることを確認し、必要なら新しい実画面に差し替え
- [ ] ビルド、全検証スクリプト、PRのCIが成功
- [ ] スマートフォン・タブレット・PC、キーボード、200%拡大を確認
- [ ] 日英切り替え、言語案内、JavaScript無効でも操作可能
- [ ] Google Play・mailto・出典の外部リンクを確認
- [ ] 本文保護・CNAME・app-ads.txtの検証が成功
- [ ] Google Play ConsoleのプライバシーURLを所有者が確認・変更
- [ ] Android同梱規約の旧URLと配布中アプリのリンクを確認
- [ ] 所有者の承認を得てPages公開方式をActionsへ切り替え
- [ ] 独自ドメイン・証明書・Enforce HTTPSを確認
- [ ] 公開後に全必須URLとapp-ads.txtのHTTP応答を確認
- [ ] Search Consoleへサイトマップを送信し、登録状況を継続確認

実施済みの結果と残された手動確認は `SITE_REVIEW.md` を参照してください。
