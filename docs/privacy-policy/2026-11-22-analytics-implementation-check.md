> 追加確認（2026-11-22）：開発者が停止設定を追加した後、main AndroidManifest.xml第21行に firebase_analytics_collection_deactivated=true があることを再確認。現在のソースは停止設定あり。以下は追加前の調査記録。最終ビルド・実機・配布反映は未確認。

# Analytics収集停止の実装確認

確認日：2026-11-22。対象：`/Volumes/ExtSSD/Projects/WorldCalendar` の現在の作業ツリー。読取のみ。ビルド・ソース変更・実機通信測定は行っていない。

判定：現在のソースはAnalytics全体の収集停止を実装していない。

- `app/build.gradle.kts:172` に `firebase-analytics` の依存関係が存在する。
- `app/src/main/AndroidManifest.xml:21–22` は広告ID収集・既定の広告パーソナライズ利用の無効化であり、Analytics全体停止ではない。
- `firebase_analytics_collection_enabled=false`、`firebase_analytics_collection_deactivated=true`、`setAnalyticsCollectionEnabled(false)` は現在のapp/srcと直接関係するGradle設定に見つからない。debug Manifestにも停止設定の追加はない。
- KotlinメインソースでFirebaseAnalytics呼出しは見つからないが、これだけで標準自動収集は停止しない。
- 既存debugマージManifestにはFirebaseInitProviderとAppMeasurement関連コンポーネントが含まれる。
- AdMobは `AdRequestFactory.kt:7–9` の `npa=1` をバナー初回・再ロード・ネイティブの3か所で使用している。Analytics停止とは別の設定。

## 古いrelease生成物との不一致

既存のreleaseマージManifestには `firebase_analytics_collection_deactivated=true` があるが、更新日時は2026-11-21 12:48:53。現在のmain Manifestは同日13:26:43、その内容と合うdebugマージManifestは13:26:46。このrelease生成物は現在ソースより古く、現行ビルドやPlay公開中のバイナリの証明には使わない。

## 対応候補

Analytics不要の方針なら依存関係を削除し、推移依存を確認する。SDKを残して当該版で収集停止するなら `firebase_analytics_collection_deactivated=true` が公式の方法。どちらも未実施。最終ビルドのManifest・依存関係と実機挙動の確認後、対象版を明記してWeb本文・Play申告を更新する。

根拠：[Firebase Androidの公式収集制御](https://firebase.google.com/docs/analytics/android/configure-data-collection)。広告ID無効化、パーソナライズ無効化、全体停止を区別して説明している。
