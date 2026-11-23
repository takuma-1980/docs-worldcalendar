# WorldCalendar Phase 4 — T11 実装報告・受入残項目

2026-11-23 JST。調査資料4点を原本として保持し、今回の実装結果を別ファイルへ記録した。**準備可能なコード・ヘルプを実装済み。T11全体は法務・実機・韓国語校正の受入待ちで、完了認定しない。**

Android: `/Volumes/ExtSSD/Projects/WorldCalendar`、候補HEAD `fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec`。Web: `/Volumes/ExtSSD/app/docs-worldcalendar`、HEAD `26e39429ae144c65fa62fcb9b8fd4d1f029b2bc9`。両方とも既存未コミット変更を含むローカル候補。commit・mainへのマージ・配布・公開は行っていない。

## 1. 変更ファイルと証跡

全相対パスは [implementation-files.json](implementation-files.json)、変更後SHA-256と調査時ファイルの一致検査は [implementation-audit.json](implementation-audit.json)。[調査時source-audit.json](source-audit.json) は上書きしていない。Android今回差分だけは [T11-android.patch](T11-android.patch)、実行コマンドと詳細は [T11-android-results.md](T11-android-results.md)。パッチは適用済みソースの記録であり、再適用用の指示ではない。

| 対象 | ファイル（各リポジトリ相対） | 内容 |
| --- | --- | --- |
| Android資源 | `app/src/main/res/values-ko/strings.xml` | ヘルプ・免責に英語明示、通知を韓国語年月日表記へ |
| Android日付UI | `app/src/main/java/xyz/takuborn/worldcalendar/feature/eventedit/EventEditScreen.kt` | 日付語順・윤・読取専用fallbackを共通資源化、ピッカーを24時間へ |
| Android表示 | 同 `feature/calendar/CalendarEventMapper.kt`、`RecurrenceDisplayFormatter.kt`、`core/ui/DisplayDateTimeFormatter.kt`（新規） | 時刻共通化、韓国語の繰り返し終了日 |
| Androidテスト | `app/src/test/java/xyz/takuborn/worldcalendar/core/ui/DisplayDateTimeFormatterTest.kt`（新規） | 深夜・正午・ゼロ埋め・不正値、韓国語日付、ja/en維持 |
| Android UI試験 | `app/src/androidTest/java/xyz/takuborn/worldcalendar/feature/settings/SettingsMenuScreenTest.kt`、同 `feature/eventedit/KoreanEventDateLabelTest.kt`（新規） | 英語リンク案内、韓国語Contextで윤・fallback・時刻 |
| Web共通 | `_data/ui.yml`、`_layouts/default.html`、`_includes/navigation.html`、`_plugins/site_policy.rb` | 韓国語UI、ko_KR、パンくず、実在リンク、三言語の相互参照 |
| Web言語案内 | `assets/language-hint.js`、`tests/language-hint.test.cjs` | 実在する翻訳だけを推薦、未公開koへ誘導しない |
| Web非公開・テスト | `_config.yml`、`scripts/check_contracts.py`、`scripts/preview_korean_help.rb`（新規）、`tests/korean-help.test.cjs`（新規）、`.github/workflows/pages.yml` | production除外・異常終了、ローカル12ページ試験、CI接続 |
| Webヘルプ | `helps/ko/index.md` と下記11章（新規） | 最新候補に沿う韓国語説明 |
| 報告 | 本書、Android結果・差分、実装監査・ファイル一覧、`web-regression.json` | 実装と未実施を分離 |

Web実装23ファイル、Android8ファイル、追加報告6ファイル。既存の `tests/korean-drafts.test.cjs` は変更せず実行した。Phase 2・3、既存ZIP、未追跡資料・`.DS_Store` は編集・削除していない。調査時記録との比較では同梱ko規約、受諾版実装、広告・Application、通知・ウィジェットの動作実装等のハッシュは一致している。

## 2. T11-01〜10の状態

| ID | 対応状況 | 今回の実装と残件 |
| --- | --- | --- |
| T11-01 | 法務判断待ち・非公開検証済み | 草案除外・法務URL漏出ゼロを維持。候補アプリのko法務URLは従来の未公開経路を保持。正式公開URL、文面・版の一致と承認後到達性は未完。配布受入ブロッカー |
| T11-02 | 承認待ち・本番適用なし | 同梱韓国語規約、`2026-10-18-v1`、受諾処理を変更していない。既存Unit10件成功。満16歳以上・7暦等の正式文面との同期、版・再同意・旧受諾・復元の最終仕様待ち |
| T11-03 | 方式B維持・法務判断待ち | 韓国語方式Bは非公開かつ無効。既存非公開・送信不可試験成功。権利窓口、説明文、手動本文、版の承認後に接続。英語窓口だけで成立とは扱わない |
| T11-04 | 12ページ作成・公開/受入待ち | 索引＋11章、ローカルリンク・メタ試験成功。候補1.0.8に準拠。母語話者と実画面の受入は未実施。アプリhelp_urlは英語のまま |
| T11-05 | 実装済み・UI実行待ち | `도움말 (영어)`・`면책 조항 (영어)`、英語URL維持。Webの英語法務・問い合わせにも言語表示。独立ko免責は追加していない |
| T11-06 | 実装・自動検証済み | ko共通ナビ、メニュー、スキップ、パンくず、フッター、言語名、description、ko_KR、canonical/hreflang。公開に存在しないkoホーム・法務・窓口は生成しない |
| T11-07 | 表示修正・対象Unit成功、実機待ち | 24時間仕様を明文化、韓国語年月日、윤、fallbackを整理。保存時刻、時間帯、暦変換・繰り返し計算は変更なし |
| T11-08 | Unit検証のみ・実機未実施 | WidgetTextFormatter10件成功。接続端末0台で言語変更のOS/通知/Glance動作は検証できず。未再現のためReceiverやチャンネル更新処理を追加していない |
| T11-09 | 明確な表示問題修正・校正待ち | 日付の英語語順・`Leap`直書きと英語リンク案内を修正。旧暦・公休と連携の説明を分離。IME・小画面・大文字・TalkBack・母語話者校正は未実施 |
| T11-10 | 実行可能な試験成功・端末受入未完 | Android Unit37件、instrumentationコンパイル、Web production/preview/回帰/草案検査成功。Compose試験の実行成功とは扱わない |

## 3. 韓国語ヘルプ12ページ

すべて `helps/ko/` に作成。既存の古い日本語スクリーンショットを韓国語候補画面として流用せず、テキスト手順と操作名で説明した。新しい実機画像は未取得。

| ファイル | 内容と候補ソースからの補正 |
| --- | --- |
| `index.md` | 11章索引、1.0.8候補・検討日、英語リンクと非公開/承認前の説明 |
| `01-getting-started.md` | 満16歳以上、初回、Android13以上のアプリ別言語・旧OS、オフライン |
| `02-calendars.md` | 7暦、韓国/日本旧暦の区別、平月/윤、**陽暦1900-01-01〜2050-12-31**。陰暦年1899の部分を含み、陰暦年全体の範囲と誤記しない。各暦の境界 |
| `03-view-calendar.md` | 月/一覧、移動、日詳細、曜日略字、24時間、祝日との分離 |
| `04-events.md` | ローカル/機器/ICSの編集可否、韓国語入力、複製・削除・保存先 |
| `05-recurrence-notifications.md` | 反復、閏月・月末・範囲・読取専用、権限、24時間の採用仕様 |
| `06-search-categories.md` | 前後2年、検索対象/対象外、ハングル、50分類・削除時の影響 |
| `07-calendar-sync.md` | 読取/書込両権限、接続・同期・解除、原本を削除しない、ICS更新との依存 |
| `08-subscriptions.md` | 韓国/日本Google ICSプリセット、非公式性・遅延、初回/以後更新条件、24h/5分、秘密URL、読取専用、RECURRENCE-ID制限 |
| `09-appearance-widgets.md` | テーマ、ホーム追加、最大2補助暦、狭幅、言語変更の未保証部分 |
| `10-backup-migration.md` | XMLで指定された対象/除外、外部アカウント別管理、再権限、**同意記録はbackup preferences対象**、版の検査と復元後確認 |
| `11-troubleshooting.md` | 通知・同期・ICS・言語・widget・復元の症状別確認、方式B非公開、不要情報抑制 |

構造参照はja/enヘルプ、機能確認は候補Androidの韓国旧暦converter、ExternalCalendarPresets、ScheduleManagementViewModel、SyncCalendarsCoordinatorUseCase、SyncExternalCalendarsUseCase、検索ViewModel、バックアップXML・DataStore/TermsConsentRepository等。外部の法的判断やGoogle回答の新規推定は行っていない。

### 非公開方法

- `_config.yml` の `exclude: helps/ko` により通常build・production配布物から除外。
- 除外を外しても、`development` かつ `korean_help_preview: true` 以外はgeneratorが失敗する。
- `scripts/preview_korean_help.rb` は一時設定で12ページをローカル生成・検査し、同じ設定のproduction実行が失敗することも試験。出力は一時ディレクトリで処理終了時削除。サーバーを起動しない。CIの配布先 `_site` へ書かない。
- 通常productionでkoリンク・hreflang・sitemap・法務草案は出力されない。公開承認後は除外・generator・非公開テスト・アプリhelp_urlを一体で変更する別作業が必要。

## 4. Android・Web試験

| 検査 | 結果 |
| --- | --- |
| `python3 scripts/check_korean_resources.py` | 成功、ja399/ko399、対象欠落・書式不一致0 |
| Android対象Unit | 37成功、失敗/error/skip0。表示4・mapper13・widget10・terms10。Gradle XMLを親でも照合 |
| `:app:compileDebugAndroidTestKotlin --offline` | 成功。新規韓国語fallback Compose試験と更新設定リンク試験を含む |
| Compose UIの実行 | **未実施**。`adb devices -l` 接続0台。APKインストール・アプリ起動なし |
| production Jekyll | 成功、`BUNDLE_PATH=vendor/bundle JEKYLL_ENV=production bundle exec jekyll build --trace` |
| `node --test tests/*.test.cjs` | 27登録、26成功・失敗0・preview専用1件skip。previewでは当該試験を別途実行成功 |
| `python3 scripts/check_site.py _site` | 54ページ・1,727内部リンク/画像、エラー0 |
| `python3 scripts/check_contracts.py _site` | 54 HTML・50 sitemap URL、保存/SEO/og:localeエラー0 |
| `bundle exec ruby scripts/preview_korean_help.rb` | 一時66ページ・2,062リンク/画像、62 sitemap URL、全検査エラー0。Nodeは3成功・production専用1件skip。12ページのko metadata・日英韓リンクを確認 |
| 同preview設定でproduction実行 | 意図どおりビルド拒否。公開ガードの陰性試験成功 |
| `bundle exec ruby scripts/check_content_policy.rb` | 記事順・詳細・下書き除外・再下書き時の古い出力除去・不正metadata拒否が成功 |
| ja/enの回帰 | 変更した追跡ファイルをHEADへ戻した一時コピーで比較。production101ファイルのパス同一、54 HTMLすべてバイト一致。変更は意図した `assets/language-hint.js` だけ。[記録](web-regression.json) |
| 韓国語法務/方式B草案 | 既存tests/korean-drafts.test.cjs成功。docs/ko法務/ko問い合わせの出力なし、草案ボタン無効、相互リンク検査成功 |
| 差分 | 両repoの `git diff --check` 成功 |

既存debugのAdMob application IDと3枠がGoogleテストIDであることを確認した。release広告ID、AdMob実設定・Play Console、韓国配信設定は変更していない。本番広告要求をする端末試験は行っていない。将来のUI試験はdebugテスト広告構成を使用し、releaseアプリを通常起動して代用しない。

### QA-01〜14への対応

| QA | 実施範囲/判定 |
| --- | --- |
| QA-01 | 資源検査成功。文意の母語話者確認は別 |
| QA-02 | Locale単体/構成の確認のみ。OS別切替とfallbackの端末試験未実施 |
| QA-03 | Terms ViewModel10件成功。承認版、旧受諾/復元/UI結合は残件 |
| QA-04 | 資源・Web説明・Composeコンパイル確認。主要画面の操作一巡は未実施 |
| QA-05 | 韓国語IME/作成編集複製削除の実機試験未実施 |
| QA-06 | 24時間仕様、深夜/正午/年末/閏日の表示Unit成功。OS12/24・タイムゾーンのUI結合は未実施 |
| QA-07 | 윤・fallback試験追加/コンパイル成功。端末実行と暦境界総合は未実施 |
| QA-08 | 通知資源確認。権限・チャンネル・言語変更後の実機動作は未実施 |
| QA-09 | Widget formatter10件成功。Glance実描画・言語切替は未実施 |
| QA-10 | Webの見出し・リンク・画像alt検査成功。320dp/200%/TalkBack/視覚QAは未実施 |
| QA-11 | 英語フォールバックの資源とUI試験コンパイル、Web実在リンクを検証。承認済みko法務実URLは判断待ち |
| QA-12 | 韓国語12ページのビルド/章間/アンカー/三言語リンク成功。モバイル実表示・候補画面照合は未実施 |
| QA-13 | 草案無効、既存ja/enのチェック/戻る/手動/本文試験成功。ko有効化後の操作は承認待ち |
| QA-14 | production/日英回帰/canonical/hreflang/sitemap/草案非公開成功 |

## 5. 実機・受入で必要な確認

- API27〜32のシステム言語、API33以上のアプリ別言語と端末言語の相違、ko→ja→en→ko。最終対応OS・実機でも確認。
- OS12/24時間設定で24時間ピッカーと一覧・編集・詳細が一致すること、Seoulと別タイムゾーンの表示・保存値維持。
- 初回規約、旧受諾・言語変更時チェック解除・復元。最終承認版と実APK/AABの文面・版・資源梱包。
- ハングルIME、検索、予定作成/編集/複製/削除、韓国旧暦の윤・範囲外・既存読取専用fallback。
- 通知の新旧本文・チャンネル名/説明、権限拒否、再起動、言語変更直後。再現箇所だけ修正。
- ホームwidgetの小中大・複数列、言語切替直後/定期更新/再配置、200%文字・320dp・横画面・TalkBack。
- 韓国語母語話者による文体・宗教暦音写・曜日文章表記の確認、モバイルブラウザーでのナビ/折返し/キーボード操作。

## 6. 法務・公開判断待ち

Phase 3のP3-05/06/07/08/12等に従う。韓国語プライバシーポリシー・利用規約・方式Bの文面/運用/本人送信と権利窓口、同梱規約・効力発生日・受諾版の承認が必要。候補アプリからのko法務URLは非公開経路のままであり、受入ブロッカーとして継続する。今回の英語フォールバック表示で法務要件解消とは扱わない。

満16歳以上をヘルプに明記し、Play Consoleは操作しない。Googleの韓国AdMob同意要否回答は未入手のまま。NPAや16歳以上を法適合・同意不要の根拠にせず、韓国広告配信を開始しない。

**判定：T11の実装可能範囲を反映済み、T11全体は受入待ち（未完了）。** T11-08/09を未検証のまま合格扱いせず、P0依存と実機・母語話者の結果がそろってから完了判定する。

## 7. T12への暦・祝日引継ぎ

今回、新たな暦計算不具合を再現・修正したとは主張しない。次をT12の検証事項として引き継ぐ。

1. 韓国旧暦は陽暦1900-01-01〜2050-12-31の有限表。陰暦1899を含む端の部分月、2050年末、前後移動の範囲端クランプと範囲外案内、윤月を照合する。
2. 韓国旧暦の平月/윤月の年次反復、存在しない月日、表示暦/入力暦/通知暦の相違、既存反復fallbackを照合。T11では反復アルゴリズムを変更していない。
3. Google韓国祝日ICSは公式政府原簿ではない。国の公表資料と祝日名・臨時/振替休日・期間・更新遅延を比較。ICSのRECURRENCE-ID未取込等の制限で欠落しないか確認。
4. 韓国旧暦変換表の出典/再現性資料と実梱包データを固定し、Seoul境界と端末別時間帯の一致を確認する。UI言語変更を暦時間帯変更と混同しない。
5. 日本旧暦2033年、宗教暦の地域慣行・境界、エチオピア日付表示と時刻入力基準の違いを別課題として管理。韓国語UI文字列の変更で解決済みにしない。
