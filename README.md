# WorldCalendar ドキュメント

WorldCalendarの日本語・英語ヘルプ、利用規約とプライバシーポリシーを管理するGitHub Pages用リポジトリです。

- [日本語ヘルプ目次](helps/ja/index.md)
- [English help](helps/en/index.md)
- [プライバシーポリシー](index.md)
- [Privacy policy (English)](privacy-policy/en/index.md)
- [利用規約（免責事項を含む）](terms-of-use/ja/index.md)
- [Terms of Use](terms-of-use/en/index.md)
- [利用規約の調査・公開前確認事項](TERMS_REVIEW.md)

## 構成

- `helps/ja/`: ヘルプ目次と11章のMarkdown本文
- `helps/en/`: 英語版のヘルプ目次と11章のMarkdown本文（日本語版と同じファイル名・アンカーID）
- `index.md`: 既存のプライバシーポリシー（ルートURLを維持）
- `privacy-policy/en/`: 英語版プライバシーポリシー
- `terms-of-use/ja/` / `terms-of-use/en/`: 免責事項を含む利用規約
- `disclaimer/ja/` / `disclaimer/en/`: 利用規約への案内のみ（独立した免責条項なし）
- `TERMS_REVIEW.md`: 調査根拠・検証・公開前の確認事項（サイト公開対象外）
- `_layouts/default.html` / `assets/help.css`: 共通ナビゲーションと表示スタイル
- `assets/icons/`: 操作説明に添えるボタン記号のSVG（出典・変換内容は`NOTICE.txt`、Material Iconsのライセンスは`LICENSE.txt`）
- `_config.yml`: Jekyll設定。相対Markdownリンクは`jekyll-relative-links`で公開ページのURLに変換します。
- `CNAME`: 既存のカスタムドメイン設定

## GitHub Pagesでの公開

GitHubのリポジトリ設定で **Pages → Deploy from a branch** を選択し、公開対象ブランチの **/(root)** を指定します。既にPagesを設定している場合は、その公開ブランチに変更を取り込みます。

設定方法は[GitHub公式のPages・Jekyllガイド](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)も参照してください。

カスタムドメインは既存の`www.worldcalendar.xyz`を使用します。ヘルプの公開先は日本語版が`/helps/ja/`、英語版が`/helps/en/`、プライバシーポリシーは日本語版が`/`、英語版が`/privacy-policy/en/`です。各ヘルプページ上部で同じ章の言語を切り替えられます。プライバシーポリシーもページ上部で日英を切り替えられます。この変更の作成だけでは公開・DNS設定は実行されません。

別のリポジトリURLで公開する場合は、`_config.yml`の`url`と`baseurl`を公開先に合わせて変更してください。

## ローカル確認

RubyとBundlerが利用できる環境で実行します。

```sh
bundle install
bundle exec jekyll serve
```

表示されたローカルURLの`/helps/ja/`または`/helps/en/`を開きます。

ビルド後の内部リンク・ページ内アンカー・アイコン画像の参照先と代替テキストは次のコマンドで確認できます（Python 3.9以降）。

```sh
bundle exec jekyll build
python3 scripts/check_site.py _site
```

## 更新方針

本文は2026年10月18日時点のWorldCalendarソース（`d8003fc`、アプリバージョン`1.0.5`）を確認して作成しています。

アプリの機能変更時には、該当章、保存先の比較表、関連FAQを合わせて更新してください。画面名称はアプリの日本語表示に合わせ、説明で平易な言い換えを添えます。

英語版も該当章と目次を合わせて更新してください。英語版の画面名称は確認済みの日本語UIに基づく訳であることを目次に明記しています。言語切り替えと章間リンクを維持するため、両言語のファイル名と明示的なアンカーIDを揃えます。

暦の計算・通知・同期・復元の説明は、仕様書だけでなく現行実装も確認します。対応範囲や条件を省略して、日付の正確性・通知の到達・復元の成功を保証する表現にしないでください。

お問い合わせ先は`worldcalendar-app@googlegroups.com`です。利用規約の制定日・施行日はともに2026年10月18日です。公開前に`TERMS_REVIEW.md`の法的・運用上の項目を確認してください。規約の両言語は同時に更新し、どちらか一方を優先する条項は設けていません。アプリ内では「設定 → ヘルプ → 利用規約」からアクセスできます。利用規約の公開先は`/terms-of-use/ja/`と`/terms-of-use/en/`です。
