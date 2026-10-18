# 利用規約の調査・作業報告と公開前確認

調査日：2026年10月18日。利用規約の制定日・施行日は、開発者の指定によりともに2026年10月18日としました。
アプリ：`/Users/takuma/AndroidStudioProjects/WorldCalendar`、HEAD `6828bea`。
サイト：`/Users/takuma/app/docs-worldcalendar`。開始時は両リポジトリとも未コミット変更なし。

## 作成方針と構成

既存の利用規約・免責事項ファイルはありませんでした。日英で10条を作成しました。
適用範囲／サービス内容／利用条件・禁止事項／知的財産／情報の正確性・機能制約／アプリの提供・法的責任／サービス変更・終了／規約変更／準拠法・紛争解決／問い合わせ、の構成です。

免責事項は第5・6条に統合しています。指定された`disclaimer/ja/index.md`と英語版は、規約への案内のみです。独立した免責条項は設けていません。
無条件の全部免責、賠償額ゼロ・任意の賠償上限、利用継続による一律のみなし同意、外国法・裁判所の一方的指定、日本語優先条項は設けていません。
故意・重大な過失、生命・身体の損害、その他免除できない責任と、海外利用者の強行的な消費者保護を留保しています。機能の保証ができない旨と、法律に基づく責任を分けました。

## 実装で確認した事実と根拠

以下のソースパスはアプリの`app/src/main/`を基準とします。Kotlinソースの共通接頭辞は`java/xyz/takuborn/worldcalendar/`です。

| 対象 | 確認した内容 | 主な根拠 |
| --- | --- | --- |
| 対応暦 | グレゴリオ、旧暦、ユリウス、ユダヤ、インド太陰太陽暦、エチオピアの6種類 | `core/domain/model/CalendarType.kt` |
| グレゴリオ・ユリウス | 前者はkotlinx.datetime、後者はユリウス日数に基づく先発ユリウス暦。端末タイムゾーンを使用 | `core/domain/converter/GregorianCalendarConverter.kt`、`JulianCalendarConverter.kt` |
| 旧暦 | 新月・太陽黄経、冬至月を11月とする規則、中気と閏月判定。日付基準はJST午前0時 | `core/domain/converter/LunarCalendarConverter.kt`、`core/domain/astronomy/LunarYearCache.kt` |
| 天文計算 | 新月はコード上Meeus第49章、太陽黄経は第25章に基づく近似計算と説明されている。独立した天文精度認証ではない | `core/domain/astronomy/NewMoonCalculator.kt`、`SolarLongitudeCalculator.kt` |
| ユダヤ暦 | 19年周期、閏月・新年の延期規則を用いた固定暦。エルサレム時間の午前0時。日没切り替えではない | `core/domain/converter/HebrewCalendarConverter.kt` |
| インド暦 | Vikram Samvat・Amanta。新月と恒星黄経、Lahiri歳差補正の近似式を使用。Kolkata午前0時。日番号は月初からの経過日数でティティではない | `core/domain/converter/HinduCalendarConverter.kt`、`core/domain/astronomy/HinduLunisolarYearCache.kt` |
| エチオピア暦 | ユリウス日数による変換、13か月、閏年判定。表示はAddis Ababa午前6時。時刻入力は端末時間の6時間オフセット | `core/domain/converter/EthiopianCalendarConverter.kt` |
| 祝日・暦注 | 日本の祝日のプリセットはGoogle公開ICS。旧暦画面の二十四節気は太陽黄経のローカル計算であり、国の祝日データではない。六曜も参考表示 | `core/data/external/ical/ExternalCalendarPreset.kt`、`feature/calendar/CalendarViewModel.kt`の`computeSolarTermHolidays`と`computeRokuyoUiModels` |
| 更新 | 起動時WorkManagerの一回の同期。ICS自動更新は24時間以内なら省略、手動は5分間隔の制約。常時更新ではない。共有コーディネータはアカウント連携オフ時にICS更新前に終了する | `core/sync/ExternalCalendarSyncScheduler.kt`、`core/domain/usecase/SyncExternalCalendarsUseCase.kt`、`SyncCalendarsCoordinatorUseCase.kt` |
| 保存・バックアップ | RoomのユーザーDBと端末状態DBを分離。ユーザーDBと一部DataStore設定のみAndroidバックアップ・移行の対象。取得済み予定・予約済み通知等は対象外 | `core/data/local/database/UserDataDatabase.kt`、`DeviceStateDatabase.kt`、`core/di/DatabaseModule.kt`、`res/xml/backup_rules.xml`、`data_extraction_rules.xml`、`AndroidManifest.xml` |
| 外部カレンダー | Android CalendarContractを介して読み書き。開始にはREAD/WRITE権限。アプリがGoogle独自APIに直接ログインする方式とは確認されない。クラウド反映はOS・アカウント側に依存 | `core/data/external/provider/CalendarProviderGatewayImpl.kt`、`CalendarPermissionGateway.kt`、`core/domain/usecase/SyncCalendarsCoordinatorUseCase.kt` |
| ICS | 読み取り専用。RECURRENCE-IDは読み込み対象外。HTTPS・URL検査・2MiB上限・リダイレクト3回上限。検査が外部情報の安全を保証するものではない | `core/data/external/ical/IcsEventParser.kt`、`IcsFeedFetcher.kt`、`core/security/ExternalCalendarFeedUrlValidator.kt` |
| 通知 | AlarmManager。正確なアラームが使えなければ非正確な方式へ。通知権限を確認。OSや端末状態に依存 | `core/notification/ReminderSchedulerImpl.kt`、`ReminderNotifier.kt` |
| 広告 | MobileAds初期化とバナー・ネイティブ広告実装 | `WorldCalendarApplication.kt`、`core/ads/AdMobBanner.kt`、`AdMobNativeAd.kt`、`docs/spec-ad.md`（リポジトリルート基準） |
| アプリ内導線 | 設定のヘルプボタンから日英の既存Webヘルプを開く。今回、ヘルプ目次と共通ヘッダー・フッターに規約を追加。設定→ヘルプ→利用規約でアクセス可能 | `feature/settings/SettingsMenuScreen.kt`、`res/values/strings.xml`、`res/values-ja/strings.xml` |

README、ARCHITECTURE_FOR_AI.md、`docs/spec-ad.md`、`docs/spec-backup-local-data.md`、`docs/spec-external-calendar.md`、既存ヘルプ第2・5・7・8・10章と両言語目次、すべての既存プライバシーポリシーも確認しました。仕様書より現行実装を優先しました。
バックアップ仕様とヘルプの対応を確認し、一括エクスポート／インポートがあるとは記載していません。
変換テストでは`HinduCalendarConverterReferenceTest.kt`の参照fixture照合と、旧暦等の往復変換・月境界テストの内容を参照しました。テストの存在を全期間・全地域の精度保証とは扱っていません。

## 既存コンテンツとの整合と修正

- プライバシーポリシーは独立したページとして既存URLを維持しました。
- 日本語別URL`privacy-policy/ja/index.md`だけ問い合わせ先が未設定でした。他の3ページと指定アドレスに統一しました。
- 旧説明は「原則端末保存」「アンインストールで削除できる」とだけ記載し、OSバックアップや連携先での保存・残存が明確ではありませんでした。実装に基づき、4ページに同期・フィード接続・Androidバックアップ・外部保存データの削除条件を補足しました。
- 日本語の3ページにfront matter（layout/title/lang）を付け、Jekyllで本文をHTML化し、ナビゲーションと日本語指定を確実に適用しました。既存の制定日は維持し、今回の作業日を施行日にはしていません。
- READMEに残っていた「連絡先未設定」の説明を修正しました。ヘルプ本文の技術説明は維持し、規約から該当章へ参照します。

## 多言語照合

アプリの文字列リソースは`values`（英語）と`values-ja`、Webヘルプも`helps/en`と`helps/ja`のみです。外部の翻訳管理サービスは、確認した構成では見つかっていません。
規約は両言語10条・第5条の4小節とし、暦基準、ICS制約、バックアップ対象外、責任留保、変更手順、準拠法、連絡先、制定日・施行日（ともに2026年10月18日）の表示を対照確認しました。文言上の一方の優先は設けていません。
他言語の追加対象は現在の実装から確定できません。公開対象国・利用者言語と各地域で必要な説明を決めてから追加してください。新言語追加時は規約・ヘルプ・プライバシーポリシー・言語切り替えを一緒に更新する必要があります。

## 法的・運用上の未確定事項（公開前に開発者が確認）

1. 運営者の法的な氏名・名称・所在国等。リポジトリREADMEは作者等が未設定のため、メールアドレスから法的な主体を推定していません。必要な開示事項を確定してください。
2. 制定日・施行日はともに2026年10月18日で確定しています。旧版の保存と今後の改定日・改定通知の運用を確認してください。プライバシーポリシー補足の正式な改定日・周知も決定が必要です。
3. 規約を契約内容とするための提示・同意手順。今回確認できたのは閲覧導線です。同意取得済みとは扱っていません。アプリ内の独立した規約ボタンや同意画面は追加していません。
4. 準拠法・専属裁判管轄を選択するか。第9条は適用法令に委ねています。日本法・特定裁判所を勝手に確定していません。運営者・配信国の確認後、必要なら専門家と検討してください。
5. 消費者契約法第8・10条等との整合、免責・非保証条項の実際の効力、規約改定の要件、海外の強行的消費者保護や言語要件。責任を無条件に免除する構成は避けていますが、個別の法的有効性は未確認です。
6. AdMobの実運用における広告同意、配信対象年齢・国、Google Playのデータセーフティ申告、OSバックアップ等を含むプライバシー説明。初期化実装の確認は、広告・プライバシー関連の法的適合性の確認ではありません。
7. 問い合わせ用Googleグループの受信・投稿権限、公開範囲、回答担当。予定の詳細等の個人情報を安全に受け取れる運用か確認してください。
8. Google公開祝日フィードの提供範囲・更新頻度の保証、各地域の公式暦との定量的な精度保証、将来のサービス継続期間は確認できません。保証する記述は追加していません。
9. GitHub Pagesの実デプロイと公開URLの確認。今回の変更はローカルファイルまでで、公開・pushは実行していません。

参照した一次資料：

- [消費者庁：消費者契約法と逐条解説](https://www.caa.go.jp/policies/policy/consumer_system/consumer_contract_act/annotations/)（責任免除条項と消費者利益に関する第8・10条を確認するため）
- [法務省：定型約款に関する規定](https://www.moj.go.jp/content/001259612.pdf)（一律の「いつでも自由に変更」「継続利用で同意」を避け、法的要件・周知・必要な同意を記載するため）

これらの一次資料と照合して作成していますが、法律上の適合性が完全に確認されたものではありません。

## 変更ファイル

新規：`terms-of-use/ja/index.md`、`terms-of-use/en/index.md`、`disclaimer/ja/index.md`、`disclaimer/en/index.md`、`TERMS_REVIEW.md`。
変更：`_layouts/default.html`、`helps/ja/index.md`、`helps/en/index.md`、`index.md`、`privacy-policy/index.md`、`privacy-policy/ja/index.md`、`privacy-policy/en/index.md`、`README.md`、`_config.yml`。
`TERMS_REVIEW.md`はJekyllの公開対象から除外します。アプリのコード・計算・保存・同期処理は変更していません。

## 検証

- Jekyll 3.9.0でサイト全体を生成：成功。
- `python3 scripts/check_site.py <生成先>`：32ページ・548内部リンク／画像、エラー0。見出し数、ページ内アンカー、リンク、画像参照・代替テキストを含みます。
- 規約の両言語の条文番号・小節数、言語切り替えの相互リンク、ヘルプ・プライバシーポリシーから同じ言語の規約へのリンク、未設定の問い合わせ先が残っていないことを確認。
- アプリのコード・リソース・ビルド設定に変更はないため、GradleビルドとAndroid単体テストは実行していません。公開中の外部サービスへの通信・端末での復元・通知実行も今回の検証対象外です。
- ローカル環境の制約：システムRuby 2.6のBundlerと、インストール済みRuby 4.0.3／古いLiquid 4.0.3に互換性問題があります。最初の試行ではcsvの探索パスと削除済みtaint APIで失敗しました。既存の一時gem環境・Ruby標準gemのパスを指定し、プロセス限定のtainted?/untaint/taint互換補助を読み込むことでビルドを検証しました。補助はリポジトリに追加していません。標準の`bundle exec jekyll build`やGitHub Pages上の本番ビルドがこの端末で無調整で成功した、とは扱っていません。

実行したビルド（パスはローカル検証環境）：

```sh
GEM_HOME=/private/tmp/worldcalendar-gems-34/ruby/4.0.0 \
GEM_PATH=/private/tmp/worldcalendar-gems-34/ruby/4.0.0:/opt/homebrew/Cellar/ruby/4.0.3/lib/ruby/gems/4.0.0 \
/opt/homebrew/opt/ruby/bin/ruby -r /private/tmp/worldcalendar-ruby-compat.rb \
/private/tmp/worldcalendar-gems-34/ruby/4.0.0/bin/jekyll build \
--source /Users/takuma/app/docs-worldcalendar --destination /private/tmp/worldcalendar-terms-final
python3 /Users/takuma/app/docs-worldcalendar/scripts/check_site.py /private/tmp/worldcalendar-terms-final
```
