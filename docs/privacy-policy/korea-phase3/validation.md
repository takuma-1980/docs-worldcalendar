# Phase 3 検証結果

2026-11-23 JST。`fix-privacy-policy`。公開・mainへのマージ・デプロイは未実施。

| 検証 | 結果 |
|---|---|
| production Jekyllビルド | 成功。`BUNDLE_PATH=vendor/bundle JEKYLL_ENV=production bundle exec jekyll build --trace` |
| 公開出力・リンク | `python3 scripts/check_site.py _site`：54ページ、1,727内部リンク／画像、0エラー |
| 既存文書保持・SEO | `python3 scripts/check_contracts.py _site`：54 HTML、50 sitemap URL、0エラー |
| 既存コンテンツポリシー統合試験 | `BUNDLE_PATH=vendor/bundle bundle exec ruby scripts/check_content_policy.rb`：成功。news順序、個別経路、草案除外、古い出力削除、不正メタデータ拒否 |
| JS・問い合わせ・言語・新規公開防止テスト | `node --test tests/*.test.cjs`：21件成功（既存18＋新規3） |
| 韓国語文書の非公開 | `tests/korean-drafts.test.cjs`：docsと3つのko経路が出力されない、本文・予定URL・ko hreflangがHTML/XML等に漏れないことを検証 |
| 草案問い合わせの無効化 | 同テスト：全操作要素disabled、チェックなし、script／form／mailto／インラインイベント／送信先data属性なし。メール本文とチェックの文案・説明版が一致 |
| 草案相互リンク | 同テスト：3草案の相対リンクと再利用CSSがすべて実在 |
| 日英公開ページ不変 | HEADを`git archive`した一時ソースと現在ツリーを同環境でproductionビルド。生成物101ファイルのパスとSHA-256を比較し、差分0。サイトマップ・ナビ・hreflang・JS/CSSも含む |
| git差分・空白 | `git diff --check`成功。追加ファイルにも`git diff --no-index --check /dev/null <file>`で空白エラーがないことを確認 |
| 法令・意味・韓国語 | [根拠と照合](review-and-sources.md)に記録。専門家の適合審査・母語話者の最終校正は未実施 |

## 実行環境と限界

ローカルRubyは4.0.9、Jekyll4.4.1。リポジトリ`.ruby-version`／CIは3.3.11。単純な`bundle check`ではvendorのgemが探索されず失敗したが、既存の `BUNDLE_PATH=vendor/bundle` で依存が充足し全チェックを実行できた。gem追加・ロックファイル変更は不要だった。コンテンツポリシー試験ではRuby4と同梱Bundler2.5.22の定数再定義警告が出たが終了コード0。Ruby3.3.11のGitHub Actionsそのものは未実行で、同一環境での成功とは主張しない。

比較元：`/private/tmp/worldcalendar-phase3-baseline-source`（HEADの追跡ファイル）。比較出力：`/private/tmp/worldcalendar-phase3-baseline-site` と `_site`。初回の空ディレクトリ未作成による展開失敗後、ディレクトリを作成して展開・ビルド・比較を完了した。生成物はgit管理対象外。

静的草案に送信処理を接続していないため、韓国語方式Bの実メール作成・送信は試験していない。既存日英方式Bの挙動は既存テストで検証。Android実機／AAB通信、Google契約・Console、公開中ページの最新本文は再検証していない。これらは[公開ゲート](open-items.md)へ引き継ぐ。

## 再実行

リポジトリルートで上表のコマンドを実行する。新規テストは実際のproductionビルド後に実行すること。別出力を検証する場合は `KOREAN_DRAFT_SITE=/absolute/output node --test tests/korean-drafts.test.cjs` を使用できる。草案の公開移動時にはこのガードを削除するだけで承認に代えず、open-items全件の完了条件・必要な同意実装・正式承認を確認する。

## T06：16歳以上方針反映後の再検証（2026-11-23）

- production Jekyllビルド：`BUNDLE_PATH=vendor/bundle JEKYLL_ENV=production bundle exec jekyll build --trace`、成功。
- `node --test tests/*.test.cjs`：21件成功、失敗0。韓国語草案の公開出力除外、問い合わせのdisabled維持・送信処理なし、相互リンクを含む。
- `python3 scripts/check_site.py _site`：54ページ、1,727内部リンク／画像、0エラー。
- `python3 scripts/check_contracts.py _site`：54 HTML、50 sitemap URL、0エラー。
- 作業開始時と再ビルド後の`_site`全ファイルのパス・SHA-256比較：差分0。日英公開ページ・ナビ・サイトマップも不変。
- 作業開始時のソースハッシュと比較し、変更はPhase 2・3の内部文書／韓国語草案に限定。日英公開文書、設定、JS/CSS、Androidコードは変更していない。
- `git diff --check`と、未追跡を含む変更文書の行末空白検査：成功。今回新規テストの追加・既存テスト変更なし。
- 内部文案照合：韓国語3草案に満16歳以上、未成年契約と個人情報同意の区別を反映。14歳未満の情報処理義務は残ると明示し、方式Bのチェック・メール本文同意文を維持。対象年齢が未確定という旧記述を対象ファイルから除去。

比較用ハッシュ記録：`/private/tmp/worldcalendar-t06-before.json`と`/private/tmp/worldcalendar-t06-site-before.json`。今回の検証は文書・非公開性・既存サイトの回帰確認。Android実機・広告要求、Google Play／AdMobの現管理画面、法適合性の専門家確認は未実施。保護者同意機能・年齢確認画面も未実装。既存`korea-phase3.zip`は今回更新しておらず、最新の原本は本ディレクトリ内のファイルとする。
