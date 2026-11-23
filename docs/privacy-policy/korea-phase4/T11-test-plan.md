# T11 テスト計画・検証結果・完了判定

2026-11-23 JST。調査フェーズで実施した検査と、後続実装後に実施する試験を分ける。未実行を成功扱いしない。

## 1. 既存テストと不足

以下のAndroidテストはソースの存在・狙いを確認した。今回はGradle／端末試験を実行していない。

| 既存ファイル（Android相対） | 確認できた範囲 | 不足 |
|---|---|---|
| `scripts/check_korean_resources.py` | ja/koのキー充足、重複、%d/%s/%f系引数の一致 | 翻訳の意味、任意の全書式、実行時動的テキスト・外部SDKは対象外 |
| `app/src/androidTest/java/xyz/takuborn/worldcalendar/core/localization/KoreanLocaleResourceTest.kt` | ko-KRの月・曜日・アクセシビリティ資源、日韓旧暦の区別、ja/en/koの予定法務URL・同梱規約存在 | View描画、URL到達、正式文面・16歳以上方針は保証しない |
| `app/src/androidTest/java/xyz/takuborn/worldcalendar/feature/settings/SettingsMenuScreenTest.kt` | koの規約／英語免責への予定URLをUriHandlerで捕捉 | ライブ到達性、ヘルプ／問い合わせの最終導線、本文の言語・版 |
| `app/src/test/java/xyz/takuborn/worldcalendar/feature/terms/TermsConsentViewModelTest.kt` | ja/en/ko選択、ko受諾の保存、言語変更関連 | 正式版への更新、復元、Activity再作成を含むko表示との結合 |
| `app/src/test/java/xyz/takuborn/worldcalendar/feature/widget/WidgetTextFormatterTest.kt` | ko接尾辞、通常月／閏月、範囲外、端末既定とContextのLocale差 | 実ホームのGlance描画、切替時の更新、狭幅・文字サイズ |
| `app/src/androidTest/java/xyz/takuborn/worldcalendar/MainActivityTermsConsentTest.kt`・`feature/eventedit/EventEditScreenTest.kt` | 規約フロー・編集画面の既存テスト基盤 | 韓国語での主要操作一巡、実機IME、通知、言語変更の総合受入 |
| `app/src/test/java/xyz/takuborn/worldcalendar/feature/calendar/CalendarEventMapperTest.kt`等 | 韓国旧暦のデータ・範囲条件の候補テスト | koロケールでのUIフォーマット受入とは別 |

韓国語に関係するテストは存在するため「韓国語テストなし」とはしない。一方、存在だけで合格済み・十分とはしない。

## 2. 後続テストの条件とマトリクス

端末試験の前に**本番広告を要求しないテスト構成**を用意する。現ApplicationのMobileAds起動時初期化を考慮し、UI試験では広告依存を差し替える等の方法を採用し、SDK試験が必要な場合のみGoogleのテスト用設定を用いる。テスト広告であることだけで韓国法上の未確定事項が解消するわけではない。今回はアプリを起動しない。

| 試験ID | 条件・操作 | 合格条件 | 種別 |
|---|---|---|---|
| QA-01 | en/ja/koの全キー、空文字、重複、書式・参照、韓国語raw規約を検査 | 対象キー欠落0、正当な非翻訳項目は除外理由あり、書式崩れ0 | 静的・リソース |
| QA-02 | API27〜32のシステム言語、API33以上のアプリ別ko、端末en/ja＋アプリko、ko→ja→en→ko、未対応言語 | 適切な資源／英語fallback、再作成後のラベル一致、言語設定経路をヘルプが説明 | OS／Compose |
| QA-03 | 初回規約のスクロール、同意前後、途中言語変更、保存失敗、旧版受諾・復元 | 本文言語・保存言語・承認版が一致、変更時チェック解除、既存受諾の扱いが仕様どおり | Unit＋UI |
| QA-04 | 月／一覧／日詳細、設定、テーマ、カテゴリ、検索、韓国旧暦選択、エラー・空状態 | 未意図のja/en混在なし、日韓旧暦を区別、操作・読み上げ可 | Compose＋実機 |
| QA-05 | ハングルIMEで予定名・場所・本文・検索、作成→再編集→複製→削除、終日／時刻あり／繰り返し・リマインダー | 合成中の入力消失なし、保存後往復一致、韓国語エラー表示、対象外・読取専用表示が理解できる | IME実機＋UI |
| QA-06 | ko-KR/ja-JP/en-US × OS12／24時間、深夜・正午、月末・年越し、Asia/Seoulと別タイムゾーン | ピッカー・入力ラベル・一覧・詳細が決定した形式に一致。保存時刻と暦計算に回帰なし | Unit＋UI |
| QA-07 | 韓国旧暦閏月・範囲端・範囲外と既存繰り返しの編集fallback | 윤表示・範囲外説明・日付が正しく、読取専用fallbackにも翻訳可能な統一形式を適用 | Unit＋UI |
| QA-08 | koで通知権限許可／拒否、リマインダー・同期通知、言語切替後と再起動後、通知から遷移 | チャンネル名／説明／本文が仕様の言語・形式、権限拒否でもクラッシュなし、予定名は勝手に翻訳しない | 隔離実機 |
| QA-09 | ウィジェット最小・中・大、複数列、端末en＋アプリko、言語変更直後／定期更新／再配置 | 暦名・月・일・윤が読める、古い言語の残留が仕様内、タップと設定動線が使用可能 | ホーム実機 |
| QA-10 | 320dp相当、横画面、フォント100/130/200%、TalkBack、長い韓国語入力と暦名 | ボタン／警告が隠れず操作可能、読み順・contentDescriptionが適切 | 視覚・アクセシビリティ |
| QA-11 | 設定・初回規約・同梱規約・ヘルプから法務／問い合わせへ遷移 | 承認済み実URL、HTTP到達・正しい言語／版、未公開URLへ誘導なし、英語fallbackは表示あり | ローカル結合＋承認後HTTP |
| QA-12 | 韓国語ヘルプ索引＋11章、章間・アンカー・画像・モバイルナビ・言語切替 | 全ページ到達、実UI用語・対応版一致、韓国旧暦／祝日・年齢方針を説明 | Web結合 |
| QA-13 | 方式B：未チェック、チェック、戻る、JS無効、手動本文、文面版、メール本文の編集 | 承認までは無効維持。承認後は本人が送信、説明文・版が一致、選択と時刻をサイト保存せず、年齢や代理人同意を自動認定しない | JS＋手動（実送信不要） |
| QA-14 | ja/en既存文書・リンク・ナビ・canonical・hreflang、koメタデータと未公開草案ガード | ja/en回帰なし、koのlang/og:localeと相互リンク一致、docsや未承認文案の漏出0 | production build＋既存試験 |

API27は候補minSdk。API33以上は少なくとも1台、加えて最終配布でサポートする最新OS・実機1台で確認する。全OS×全言語の総当たりを要求せず、端末／アプリ言語差と12／24時間等の重要組合せを優先する。機種・OS・候補版・設定・画面記録・結果を保存する。

### 後続で使うコマンド例（今回未実行のAndroidコマンド）

Androidルートで静的資源検査と対象Unitから始める。Gradleタスク・依存の最終版を確認して実行する。全件試験を最初から要求しない。

```sh
python3 scripts/check_korean_resources.py
./gradlew :app:testDebugUnitTest --tests 'xyz.takuborn.worldcalendar.feature.widget.WidgetTextFormatterTest' --tests 'xyz.takuborn.worldcalendar.feature.terms.TermsConsentViewModelTest'
```

Compose instrumentationは広告隔離後に対象クラスから実行。release相当の最終候補でも表示・リンク・資源の梱包を確認するが、実広告配信や韓国公開はT11試験の一部として実施しない。テストコードは既存JUnit／MockK／Truth／Compose構成を踏襲し、Coroutineには決定的Dispatcherを使う。UI操作にはtestTagやsemanticsを活用し、文字列確認は翻訳検証が目的の箇所に限定する。

## 3. 今回実行した検査結果

| 検査 | 結果 |
|---|---|
| Android既存`check_korean_resources.py` | 成功。ja399／ko399キー、欠落・検査対象書式不一致なし |
| 追加の読取専用XML照合 | 英語400キー、翻訳対象399。ko399、余剰0、空0、重複0。app_nameは非翻訳指定で正常。結果をsource-audit.jsonへ保存 |
| production Jekyll | `BUNDLE_PATH=vendor/bundle JEKYLL_ENV=production bundle exec jekyll build --trace`成功 |
| `node --test tests/*.test.cjs` | 21件成功、失敗0。韓国語草案の非公開、方式B草案の無効化、相互リンクを含む |
| `python3 scripts/check_site.py _site` | 54ページ、1,727内部リンク／画像、エラー0 |
| `python3 scripts/check_contracts.py _site` | 54 HTML、50 sitemap URL、エラー0 |
| 調査前後の公開生成物 | 101ファイルのパス・SHA-256一致、差分0。Phase 4資料もdocs除外 |
| 読取ファイル保全 | 記録したAndroid・Web主要38ファイルのハッシュ一致。既存ソースを変更していない |
| 外部ko URL確認 | 閲覧ツールで取得不能。HTTPステータス未確定。ローカルソース・生成物にはko経路なし |
| Android Unit／instrumentation／端末表示 | **未実行**。今回の成果は調査・計画であり、表示成功やテスト合格を主張しない |
| 韓国語母語話者・法務の最終レビュー | **未実施**。誤訳・幅不足等は候補として記載 |

Jekyllは既存vendor依存を使用。Androidや依存ファイルの更新は行っていない。新しいテストコードは追加していない。

## 4. T11完了判定

### 調査・修正計画フェーズ（今回）：完了

- ユーザー指定8項目について候補ソース・Web・既存資料を調査した。
- 対応済み一覧、確定不足と要再現候補、優先順位、Android／Webファイル、テスト計画を保存した。
- Play設定済みという新しい報告を優先し、Phase 2・3原本と法的課題を再作成していない。
- Markdownと監査データをZIPへまとめ、整合性を検査する。

### 韓国語UI・ヘルプ対応の受入フェーズ：未完了

次をすべて満たした時点で、T11の対応受入を完了とする。

1. 最終Android候補をコミット・成果物で固定し、韓国語資源・規約・localeConfigが実APK/AABに含まれる。
2. T11-01〜03のP0依存が解消し、法務リンク・同梱規約・満16歳以上・受諾版・韓国語権利窓口が承認内容と一致する。草案の単純公開で代用しない。
3. 韓国語ヘルプ12ページと共通UIが完成し、実画面・版・リンクと一致する。暫定英語ページを残す範囲は言語表示・受入判断を記録する。
4. QA-01〜14の適用項目を実行し、P0/P1未解決0。P2は影響・対応予定を開発者が受け入れた記録がある。未再現候補は検証結果で閉じる。
5. 韓国語の意味・文体・固有名とアクセシビリティのレビュー記録、ja/en回帰チェックがそろう。
6. docs内の未承認草案の非公開を維持し、承認後公開する正式文書とは区別する。

T11受入が完了しても、Google回答待ちの広告条件やPhase 3残ゲートが自動的に完了するわけではない。韓国公開・広告配信開始の判断は別に行う。Play対象年齢の再変更は要求しない。
