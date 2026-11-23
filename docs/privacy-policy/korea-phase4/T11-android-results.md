# T11 Android実装結果

2026-11-23 JST。ルート `/Volumes/ExtSSD/Projects/WorldCalendar`。候補HEAD `fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec` と既存未コミット変更を保持。今回差分の適用前バックアップは `/tmp/t11-android-before/`、今回だけの差分は `/tmp/t11-android.patch`、一覧は `/tmp/t11-android-changed.json`。commit/merge/配布なし。

## 変更したファイル（Android相対）

- app/src/main/res/values-ko/strings.xml
- app/src/main/java/xyz/takuborn/worldcalendar/feature/eventedit/EventEditScreen.kt
- app/src/main/java/xyz/takuborn/worldcalendar/feature/calendar/RecurrenceDisplayFormatter.kt
- app/src/main/java/xyz/takuborn/worldcalendar/feature/calendar/CalendarEventMapper.kt
- app/src/main/java/xyz/takuborn/worldcalendar/core/ui/DisplayDateTimeFormatter.kt（新規）
- app/src/test/java/xyz/takuborn/worldcalendar/core/ui/DisplayDateTimeFormatterTest.kt（新規）
- app/src/androidTest/java/xyz/takuborn/worldcalendar/feature/settings/SettingsMenuScreenTest.kt
- app/src/androidTest/java/xyz/takuborn/worldcalendar/feature/eventedit/KoreanEventDateLabelTest.kt（新規）

## 実装・仕様

- T11-05: `도움말 (영어)` と `면책 조항 (영어)` に変更。URLは承認まで従来英語のまま。設定画面テストで両ラベルとリンクを捕捉する。
- T11-07: 予定編集の日付の英語固定語順と `Leap` 直書きを既存共通日付資源へ置換。韓国語は `2025년 윤6월 1일`。読取専用fallbackも同じ日付と時刻関数を使用し、終日では時刻を表示しない。
- 時刻は既存の一覧・編集・詳細に合わせ、24時間 `HH:mm` をT11表示仕様として採用。ピッカーも24時間に変更しOS12時間設定での不一致をなくす。OS設定追従への全面変更は行わない。この仕様は親と合意済み。純粋表示関数で00:00/12:00/23:05/不正値を検査。
- 繰り返し終了日はko Contextで `yyyy년 M월 d일`、ja/enは既存 `yyyy/MM/dd` を保持。通知はko資源のみ年月日と単位を明記（書式引数は同じ）。
- 保存エポック、タイムゾーン、暦変換、繰り返し計算、祝日提供元は変更していない。
- T11-08: ウィジェット既存Unit10件は成功、端末言語切替は未実施。実再現がないためReceiver/通知チャンネル/Glance更新処理は変更していない。
- T11-09: `Leap` と英語語順の確定問題を修正。TalkBack/320dp/200%文字/母語話者校正は未実施。短縮曜日や音写を機械的に誤訳と扱わない。
- T11-01〜03: 韓国語同梱規約、TermsPolicy版、法務URL、方式B、広告設定は変更していない。現候補アプリの韓国語法務URLは未公開経路であり、法務承認・公開同期まで配布受入ブロッカーとして継続する。

## テスト

`python3 scripts/check_korean_resources.py`: ja399/ko399、欠落・書式不一致なし。

`./gradlew :app:testDebugUnitTest --tests 'xyz.takuborn.worldcalendar.core.ui.DisplayDateTimeFormatterTest' --tests 'xyz.takuborn.worldcalendar.feature.calendar.CalendarEventMapperTest' --tests 'xyz.takuborn.worldcalendar.feature.widget.WidgetTextFormatterTest' --tests 'xyz.takuborn.worldcalendar.feature.terms.TermsConsentViewModelTest' :app:compileDebugAndroidTestKotlin --offline`: BUILD SUCCESSFUL。

| Unit | 件数 | 結果 |
|---|---:|---|
| DisplayDateTimeFormatterTest | 4 | 成功 |
| CalendarEventMapperTest | 13 | 成功 |
| WidgetTextFormatterTest | 10 | 成功 |
| TermsConsentViewModelTest | 10 | 成功 |
| 合計 | 37 | 失敗0・error0・skip0 |

Compose instrumentationはコンパイル成功のみ。新規KoreanEventDateLabelTest（韓国語Context、윤、読取専用fallback、00:05/12:05）と設定リンク試験を追加更新。既存と同様のCompose JUnit4 APIについてdeprecation warningあり。`adb devices -l` は接続端末0台で、UI・実機試験は未実行。APKインストール/アプリ起動なし、本番広告要求なし。既存debugビルドのadmobApplicationIdと3広告枠はGoogleテストID `ca-app-pub-3940256099942544` 配下、releaseやAdMob実設定には触れていない。

最初のコンパイルは今回追加fallbackのプロパティ名参照誤りで失敗したが `currentCalendarType` へ修正後、上記全テストとinstrumentationコンパイルが成功。`git diff --check` も成功。

## 実機受入が必要な点

OS12/24時間設定での24hピッカー/ラベル一致、ko→ja→en→koと端末言語の相違、通知チャンネルと新規通知と既存通知の言語、ウィジェット言語切替直後/更新/再配置、韓国語IME、320dp・横画面・フォント200%・TalkBack、法務承認後の実URL到達、APK/AABへの梱包確認。テストはdebugのテスト広告構成を使用する。

## T12への引継ぎ

韓国旧暦の1900〜2050範囲・윤・閏月繰り返し・範囲端での切詰め挙動は既存候補でありT11では変更していない。Google韓国祝日ICSはGoogle提供フィードで政府の公式保証ではない。祝日名・振替休日・遅延と期間範囲をT12で一次資料と照合。日本旧暦2033年、宗教暦境界、Ethiopian時刻解釈もT11表示修正と分離する。新たな暦計算不具合を実再現したという主張はない。
