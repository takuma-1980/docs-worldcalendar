# T11 重要度別修正計画・ファイル一覧

2026-11-23 JST。計画のみ。調査根拠・F番号は [調査報告](T11-investigation.md)。P0＝公開前の阻害要因／他Phase依存、P1＝韓国語対応の受入前、P2＝品質向上（操作不能ならP1）。ファイルパスの`K/`はAndroidの`app/src/main/java/xyz/takuborn/worldcalendar/`。新規・条件付き対象はその旨を明示する。

| ID／優先度 | 修正・確認内容 | Android対象（相対パス） | Web対象（相対パス） | 完了証拠／依存 |
|---|---|---|---|---|
| T11-01／P0 | F01：承認済みの韓国語法務URLと配布タイミングを統一。URL組立てと資源値の二重管理も照合 | `app/src/main/res/values-ko/strings.xml`、`K/feature/settings/SettingsMenuScreen.kt`、`K/feature/terms/TermsConsentScreen.kt`、`app/src/main/res/raw/terms_of_use_ko.txt` | 既存`docs/privacy-policy/korea-phase3/drafts/`を修正原本に使い、承認後のみ`privacy-policy/ko/index.md`・`terms-of-use/ko/index.md`へ移動／作成。今回は移動しない | P3-01〜12の適用ゲート、法務承認、最終候補からのタップ到達、HTTP・本文版・言語一致 |
| T11-02／P0 | F02：同梱ko規約に16歳以上、最終機能・効力発生日・権利留保を反映し、受諾版を決定 | `app/src/main/res/raw/terms_of_use_ko.txt`、`K/core/data/local/datastore/TermsConsentRepository.kt`。変更方針次第で`K/feature/terms/TermsConsentViewModel.kt` | Phase 3既存草案を使用。T06・P3-05・08・12に判断を返す | 旧受諾・新規・言語変更・バックアップ復元の期待動作、承認文面ハッシュと版、未成年契約と情報処理同意の分離 |
| T11-03／P0依存・実装P1 | F04：韓国語権利窓口を成立させ、一般問い合わせ導線を方式Bへ接続 | 必要なら`values-ko/strings.xml`のhelp_url等。独立問い合わせ行を採用する場合のみ`SettingsMenuScreen.kt`追加、必須化しない | `_data/inquiry.yml`、`_includes/inquiry-consent.html`、承認後の`ko/contact/index.html`（新規）、区分追加が必要な場合のみ`assets/inquiry-consent.js` | P3-06・07完了後。先行説明→チェック→本文へ同意文・版→本人送信、未チェック・戻る・手動経路、サイトに選択／日時を保存しない |
| T11-04／P1 | F03：韓国語ヘルプ索引＋11章、候補画面の言い回し・版・画像を整合 | `app/src/main/res/values-ko/strings.xml`のhelp_url、`app/src/main/res/raw/terms_of_use_ko.txt`のヘルプリンク | `helps/ko/index.md`・`helps/ko/01-getting-started.md`〜`11-troubleshooting.md`（新規、各名称は調査報告参照）、必要な`assets/images/`の韓国語画像 | 全12ページ、章・アンカー、各主要操作の再現、韓国旧暦／祝日差分、最終候補版での校正 |
| T11-05／P1 | F03：英語へ遷移する暫定導線の言語を明示、免責導線を決定 | `values-ko/strings.xml`のtitle_help/title_disclaimer又は補助説明、disclaimer_url。必要時`SettingsMenuScreen.kt` | ko免責単独ページを作るか承認済み規約へまとめるか決定 | 無断で非公開ko規約に変更しない。英語フォールバックと正式ko切替の双方をテスト |
| T11-06／P1 | F05：共通UIをkoに対応、言語リンク表示、OG locale、パンくず・フッター・メタデータを整備 | なし | `_data/ui.yml`、`_includes/navigation.html`、`_layouts/default.html`、`assets/language-hint.js`、必要時`_plugins/site_policy.rb` | 新規koページのナビを実在ページだけで構成。ja/enの文面・リンク・canonical・hreflangを保持。koホームや全コレクション翻訳を必須範囲へ無断追加しない |
| T11-07／P1 | F06：12／24時間、繰り返し終了日、通知日付の表示方針を決め必要差分を実装 | `K/feature/calendar/CalendarEventMapper.kt`、`K/feature/calendar/RecurrenceDisplayFormatter.kt`、`K/feature/eventedit/EventEditScreen.kt`、`values-ko/strings.xml`のnotification_content_format。共通関数採用時のみ`K/core/ui/` | `helps/ko/05-recurrence-notifications.md`（新規） | OS12／24、ko/ja/en、UI言語とタイムゾーンが異なる条件で表示と保存値を確認。固定形式継続なら理由・例を明文化 |
| T11-08／P1検証・条件付き修正 | F07：アプリ別言語変更後の通知・チャンネル・ウィジェット更新 | `K/feature/widget/WorldCalendarWidgetReceiver.kt`・`WidgetTextFormatter.kt`・`WorldCalendarWidget.kt`、`K/core/notification/NotificationChannels.kt`・`ReminderNotifier.kt`・`ReminderAlarmReceiver.kt`、`K/WorldCalendarApplication.kt`。再現した経路のみ修正 | ヘルプ01・09・11にOS別の言語設定／更新説明 | 旧言語残留・反映タイミングの実機記録。未再現ならテストと説明を追加し、不要なReceiverを増やさない |
| T11-09／P1検証・P2校正 | F08：韓国語入力・折返し・省略・読み上げ・用語を確認 | `values-ko/strings.xml`、`K/feature/calendar/RecurrenceDisplayFormatter.kt`、`K/feature/eventedit/EventEditScreen.kt`、`K/feature/widget/WorldCalendarWidget.kt`、問題が再現したCompose画面 | 韓国語ヘルプ全文、必要なCSSのみ`assets/help.css`・`assets/site.css` | 曜日の文章用／グリッド用を区別。母語話者校正ログ、320dp相当・フォント200%・TalkBack。操作不能はP1 |
| T11-10／P1 | F01・05：テストの期待値を最終公開状態へ更新し、非公開ガードを維持 | `app/src/androidTest/java/xyz/takuborn/worldcalendar/core/localization/KoreanLocaleResourceTest.kt`、`…/feature/settings/SettingsMenuScreenTest.kt`、`…/MainActivityTermsConsentTest.kt`、`…/feature/eventedit/EventEditScreenTest.kt`、`app/src/test/java/xyz/takuborn/worldcalendar/feature/widget/WidgetTextFormatterTest.kt`・`…/feature/terms/TermsConsentViewModelTest.kt`、`scripts/check_korean_resources.py` | `scripts/check_contracts.py`、`tests/language-hint.test.cjs`、`tests/inquiry-consent.test.cjs`、`tests/korean-drafts.test.cjs`。collection展開時`scripts/check_content_policy.rb` | URL文字列だけでなく実体／言語／版を検証。承認前に韓国語公開を許可するためガードを単に削除しない |

## 作業順序と担当

1. 開発者・文書担当：最終配布候補のコミットと未追跡差分を固定。Play設定済みは再設定不要。
2. 韓国法／文書担当：T11-01〜03のP3依存を解消。Google回答待ちの広告条件は継続管理する。
3. Android・Web担当：T11-04〜09を独立した小さな変更に分ける。暦計算・祝日提供元の変更はUI翻訳と別にする。
4. QA・韓国語確認担当：T11-10とテスト計画を実行。法務URL・問い合わせの有効化は承認後の公開作業として実施。

ここで示す担当は引継ぎ先の役割で、依頼・送信した意味ではない。翻訳レビューの対象にユーザー入力やICS原文を一律含めない。広告要否の結論や年齢認証UIをこの計画で新たに決定しない。
