# T05-KR AdMob証拠資料

確認日：2026-11-23（JST）。内部検討用。公開資料の一般仕様、ローカル実装、過去の開発者回答、未確認の実処理を区別する。本書は分類の証拠であり、韓国での広告配信の適法性を確定する法律意見ではない。

関連：[条件付き判断](T05-KR-admob-decision.md)／[Googleへの日英照会案](T05-KR-admob-google-questions.md)／[Phase 2調査](T05-KR-research.md)。Googleへの送信・契約受諾・Console変更・Android変更は行っていない。

## 1. 対象・証拠の強さ

| ID | 対象と確認結果 | 証拠の限界 |
| --- | --- | --- |
| E01 | 文書：`takuma-1980/docs-worldcalendar`、`fix-privacy-policy`、HEAD `26e39429ae144c65fa62fcb9b8fd4d1f029b2bc9`。GitHub同ブランチも一致 | Phase 2フォルダは開始時から未追跡。本調査はそのローカル報告を基にした。既存報告をコミット済みとしない |
| E02 | Android：`/Volumes/ExtSSD/Projects/WorldCalendar`、HEAD `fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec`。GitHub mainも一致 | 未コミット・未追跡変更あり。NPA等は現在の作業ツリーの事実で、配布済み版の証拠ではない |
| E03 | SDK・Application・広告要求・Manifest・既存release統合Manifestとその由来を本日読取確認 | 新規ビルド・通信測定は未実施。既存生成物は最終配布AABの代用ではない |
| E04 | [契約確認記録](../2026-11-21-contract-review.md)：2026-11-21に開発者が契約先をGoogle Asia Pacific Pte. Ltd.と回答 | 当時の回答の記録。実契約全文、参照組込み、版・受諾日時、韓国利用者への適用は未取得 |
| E05 | [AdMob画面確認記録](../2026-11-21-admob-settings.md)：当時の一覧は「AdMob（デフォルト）」1件 | 本日は管理画面未確認。画像原本の再閲覧なし。第三者RTB、全入札先、広告ユニット別設定がない証明ではない |
| E06 | Google・韓国法・PIPCの公式Web本文を本日照合（以下のリンク） | Webは可変。実アカウントの合意や25.4.0の実通信を証明しない。添付ガイド全文を読了したとの扱いはしない |

基点：[Androidコミット](https://github.com/takuma-1980/WorldCalendar/commit/fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec)、[文書ブランチ](https://github.com/takuma-1980/docs-worldcalendar/tree/fix-privacy-policy)。未コミット行をこれらのURLで立証しない。Phase 1は完了前提を維持し、今回残す配布・通信確認は分類の証拠範囲を限定するものとする。

## 2. ソースから確認できた実装

以下のパスはAndroidルートからの相対パス。Javaパッケージの略記 `P` は `app/src/main/java/xyz/takuborn/worldcalendar`。

| ID | ファイル・行 | 確認済み事実 | そこからは確定しないこと |
| --- | --- | --- | --- |
| S01 | `gradle/libs.versions.toml:33,96`、`app/build.gradle.kts:222` | `com.google.android.gms:play-services-ads`、指定版25.4.0 | 最新資料の25.5.0と同一仕様、全配布版の解決依存 |
| S02 | `P/WorldCalendarApplication.kt:45–47` | `Application.onCreate()`で`MobileAds.initialize(this)`を無条件呼出し。初期化前の広告同意・地域分岐なし | 初期化時の全送信項目・受領者・プリロードの実発生 |
| S03 | `P/core/ads/AdRequestFactory.kt:7–9` | `AdMobAdapter`へのnetwork extrasに文字列`npa=1` | 初期化にもNPAが適用されること、全事業者の独自利用停止、匿名化 |
| S04 | `P/core/ads/AdMobBanner.kt:80,88`、`AdMobNativeAd.kt:84` | バナー初回・サイズ変更時・ネイティブの3ロードが共通NPA要求を使用 | 通信上の信号受領、表示広告・SDK自動再要求を含む配布版の全挙動 |
| S05 | `app/src/main/AndroidManifest.xml:21–23` | Analytics全体停止true、Analyticsの広告ID収集・既定広告パーソナライズfalse | AdMobの広告ID・広告分析まで停止すること |
| S06 | 同Manifest全体、`P/core/ads`、Application、依存宣言 | GMAの広告ID権限を削除する宣言なし。独自AAID/App Set ID取得、publisher-provided ID、`setRequestConfiguration`、子ども・同意年齢タグ、publisher first-party IDの明示制御、UMP依存・呼出しは確認範囲で未検出 | SDK既定値、Console設定、OSのAAID状態。未検出をSDKによる取得なしとしない |
| S07 | `app/build/intermediates/merged_manifest/release/processReleaseMainManifest/AndroidManifest.xml:17–20,173` | 既存生成物に`AD_ID`、`ACCESS_ADSERVICES_AD_ID`／`ATTRIBUTION`／`TOPICS`、`MobileAdsInitProvider`が存在 | 各APIの実使用・実送信。Providerの存在だけで通信を認定しない |
| S08 | `app/build/intermediates/manifest_merge_blame_file/release/processReleaseMainManifest/manifest-merger-blame-release-report.txt:32–43` | 上記4権限の由来は`play-services-ads-api:25.4.0` | 新規最終ビルドや配布版のManifestとの一致 |
| S09 | `app/build.gradle.kts`、Version Catalog、`P/core/ads` | 別ネットワークの直接SDK／メディエーションアダプタ宣言・カスタムイベント実装は確認範囲で未検出。`AdMobAdapter`はNPA指定先 | サーバー側RTB・購入者不在。名称にmediationを含むGoogleクラスだけで他社アダプタの導入としない |

mainの広告ロードは空の`AdRequest.Builder().build()`で、作業ツリーのNPA指定は未コミット差分。Firebase停止も作業ツリーの設定として扱う。最終release AAB・端末通信は未確認。詳細な過去ビルド記録はAndroid側`docs/release-plans/korea/current-data-processing-status-ja.md`（11月22日）を参照し、その試験を今回再実行したとはしない。

Googleの[初期化ガイド](https://developers.google.com/admob/android/quick-start)は初期化時の広告プリロードの可能性と、必要な同意・要求フラグを初期化前に処理する旨を説明する。SDK20.4.0以降は広告ID権限を自動宣言する。S07–08は、この権限について本件生成物でも確認した証拠である。

### 再照合用SHA-256

S01–08の内容識別。ハッシュは実行結果や法的分類を証明しない。

| ファイル | SHA-256 |
| --- | --- |
| `gradle/libs.versions.toml` | `af547691d2f9296f2b8abfd52a9a28fc18b22697ad8d86fad1a1a9d6e1b9ea6f` |
| `app/build.gradle.kts` | `0f36f190d796e48fe0325131526ea1fc3b0a2bc00ba0f57225e1926f2f73b6f7` |
| `app/src/main/AndroidManifest.xml` | `3555a8defb35d8df821eb46de86486b3d8eaeeeca062dd05ab109a380bbd9f35` |
| `P/WorldCalendarApplication.kt` | `eee7ed4f4e63adc06ec648211ce30cc3eee75379c2da64d35800a3a427a51840` |
| `P/core/ads/AdRequestFactory.kt` | `47644630dfc80cedb1c76e461531b4dd6ce56e642e4b4ee26b805a1bdfb3d3d7` |
| `P/core/ads/AdMobBanner.kt` | `72b859eab9618c218886e7d4ee85cc755e91b8379f9204dfcf5d5daa4d831b13` |
| `P/core/ads/AdMobNativeAd.kt` | `a2073bc2b195f3a88e868aea2067abd8b309bfc835952eacbc7848c93e8b1d32` |
| S07統合Manifest | `179de28330020ad044ba2aef9f558c7235e89172d7f635da2430c391db425a61` |
| S08由来レポート | `ac40cdb86d58d71457e38cdd18f424e72337a0323ce4d07b6361c5b04a1d820a` |

## 3. 適用契約の照合

| ID | 公式資料・照合箇所 | 確認済みの一般条件 | 本件で不足する証拠 |
| --- | --- | --- | --- |
| G01 | [AdMob契約法人の確認手順](https://support.google.com/admob/answer/2772511?hl=en)／[AdSense規約入口](https://adsense.google.com/adsense/terms) | Console下部のTerms冒頭で契約法人を確認する方式。公開規約入口は請求先国ごとに条件が異なると説明 | E04は法人名のみ。適用基本契約全文・版・参照先・変更履歴・受諾記録。公開入口の他国版を日本の実契約に代用しない |
| G02 | [サービス分類](https://business.safety.google/adsservices/)のController Services／Processor Services | 通常AdMobはController Terms対象となり得る。処理者側のAdMob機能はSecure Signals、Server-side impression-level ad revenueを列挙 | 本アカウントで当該機能が有効か、処理別適用条件。NPAは処理者機能として列挙されていない |
| G03 | [Controller-Controller規約](https://business.safety.google/adscontrollerterms/) §§2.2、3.1、4.1–4.4、6.2 | 適用には合意・参照組込み等が必要。独立した目的・手段決定を定めるが、元契約の制限とEnd Controllerの可能性を留保。用語は適用法、なければGDPRの意味による | 韓国利用者の通常NPAに適用される条項・主体・目的の実際。PIPAの提供／委託／直接収集は別途判断 |
| G04 | [Google Ads Data Processing Terms](https://business.safety.google/adsprocessorterms/) §§2.1、4.1、5.1–5.4 | 対象は合意されたProcessor ServicesのCustomer Personal Data。Googleの代理処理・指示を規定し、Additional Productsを除外 | 一般AdMob全体にDPTが適用される証拠なし。AnalyticsのDPTや限定機能のDPTを広告配信全体へ拡張しない |

**照合結果**：通常NPAを包括的な指示下の委託とする契約上の裏付けは得られていない。一方、公開サービス分類だけで実アカウントのC-C規約の成立や韓国法上の第三者提供を確定できない。GoogleへのQ1–2で契約と処理実態を埋める。

## 4. SDK送信候補と公開目的の対応

G05：[GMAデータ開示](https://developers.google.com/admob/android/privacy/play-data-disclosure)の対象は**25.5.0**。自動収集・共有の目的は広告、分析、不正防止とまとめて説明されている。下表の全項目について、25.4.0・NPA・端末状態ごとの実送信と目的の個別対応は未確認。一般開示を実測結果としない。

| データ候補 | G05が挙げる内容 | 公開目的との対応・限界 |
| --- | --- | --- |
| IP | 端末IP、概略位置推定に利用し得る | 広告・分析・不正防止。IPによる概略位置利用も一般説明にある。生IP／推定位置ごとの保持・NPA条件は要確認 |
| 操作 | アプリ起動、タップ、動画閲覧等 | 同3目的。特定イベントを特定目的だけに割り当てた仕様は得られていない |
| 診断 | 起動時間、ハング率、電力等 | 同3目的。診断だから独自利用がないとはしない |
| 識別子 | AAID、App Set ID、条件によりサインインアカウント関連ID | 同3目的。AAID削除時、first-party ID等の代替、Googleアカウント等との結合条件は未確定 |

G06：[NPA説明](https://support.google.com/admob/answer/7676680?hl=en)は過去行動による広告選択を用いず、文脈・現在の概略位置等を利用すると説明する。モバイル広告識別子等は頻度管理・集計に残る。**NPAは無収集・無共有・韓国での同意免除の証拠ではない。**

G07：[パートナーサイト／アプリからの情報利用](https://policies.google.com/technologies/partner-sites?hl=en)は、サービス提供・維持改善、新サービス開発、効果測定、不正防止、設定に応じたパーソナライズを挙げる。アプリ名・広告識別子等の共有にも言及する。これは独自利用の検討を要する根拠であり、本件NPAの各データが全目的で利用される証明ではない。NPAの独自利用・他サービス結合の可否はQ2–3で確認する。

「SDKのanalytics目的」はFirebase Analytics収集停止と別。広告主向け測定・不正防止・サービス改善を混同せず、Googleにデータ×処理段階×目的×主体の対応表を求める。カレンダー予定本文を広告要求へ明示追加する処理は確認した広告コードにないが、これだけでSDK全送信項目の不存在を証明しない。

## 5. RTB・メディエーション

G08：[NPAを第三者RTB購入者へ送信する仕様](https://support.google.com/admob/answer/10833943?hl=en)はAdMob biddingを対象とし、NPAでも入札要求を送ること、広告ID等の列挙識別子を除去する一方でuser-agentや切り詰めたIP等を送ることを説明する。地域別制御があり、列挙地域外では他の保護措置に従い全入札者へ送るとする。

| 経路 | 本件の確認結果 | 追加証拠 |
| --- | --- | --- |
| アプリ内の別社SDK・アダプタ | S09の範囲で未検出 | 最終配布版の依存・SDK一覧、必要時の実行時アダプタ一覧 |
| Consoleのメディエーショングループ | E05の過去記録ではデフォルトのみ | 現在の広告ユニット・対象国・広告ソース・入札／ウォーターフォール・カスタムイベント設定。今回は未確認 |
| Googleサーバー→RTB入札者 | G08の一般仕様として存在 | 本アカウント・韓国NPAに実適用される入札者と送信データ、未落札者への共有、国・期間。今回は未確認 |
| 落札後の広告配信・測定先 | コードと既存画面記録だけでは特定不可 | クリエイティブ／測定ベンダー、端末からの直接通信とGoogleからの再提供を分離してQ5で確認 |

したがって「メディエーションなし」「第三者共有なし」は現状では確定できない。識別子の一部削除をPIPA上の匿名情報化と同一視せず、受領者の結合可能性も評価する。G08の子ども向け例外も、本アプリでタグを送っている証拠にはならない。

## 6. 韓国法・PIPC公式解説との照合

本日取得した韓国語条文の表示はPIPA法律21445号（2026-09-11施行）、施行令36804号（2026-11-10施行）。将来施行法と英訳を現行原文に代用しない。

| ID | 根拠 | 本件に関係する規範の要約 |
| --- | --- | --- |
| K01 | [15・17条](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947) | 収集利用と第三者提供は別の根拠を要する。15条1項4号は契約必要性、6号は権利に明らかに優越する正当利益。17条1項2号は15条1項2・3・5–7号で収集した目的内の提供を扱い、4号を含まない。17条4項の追加提供も条件付き |
| K02 | [26条1–3項](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025127467)、[4項](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029331841)、[6項](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?ancYnChk=&chrClsCd=010202&lsJoLnkSeq=1029335559) | 委託には目的外処理禁止・保護措置等の文書、業務・受託者（再委託先を含む）の公開、監督が必要。再委託は委託者同意。販促等の委託には3項通知も別途検討 |
| K03 | [28条の8・28条の11](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334869) | 国外提供（照会を含む）・委託・保管が移転。別個同意等の根拠が必要。1項3号の公表／通知は本人との契約締結・履行に必要な委託・保管。第三者提供を含めない。他条文遵守・保護措置・再移転も別に問題となる |
| K04 | [施行令31条1項2・4号](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1033215161)、[29条の10](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=182203) | 移転根拠・法定事項、国外直接収集の場合の処理国を方針に記載。移転の保護措置は受領者と事前協議して契約等へ反映 |
| K05 | [PIPC直接収集解説](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS292&mCode=C050010000&nttId=10972)（登録2025-02-04、本文2月5日発行表示） | 海外事業者の本人からの直接収集と、その後の第三者への移転を区別。直接収集でもPIPAの収集根拠・安全管理・処理国開示等は残る。同じ外国にある別事業者への提供等も移転となり得る |
| K06 | [PIPC海外事業者案内の公表本文](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=10056)（2024-04-04） | 韓国向け提供・影響・拠点等で適用を判断。海外第三者処理は提供と委託を区分し、一括してshareとしない旨を説明 |

K05の例は海外サービスへの直接提供であり、WorldCalendarに組み込まれたSDKを直接収集と判断した個別回答ではない。K06もAdMobの分類回答ではない。**SDKがGoogleへ直送する技術構成だけでは、開発者が処理主体として提供・委託するかを解消できない。** これは本件への当てはめ上の未確定事項である。

## 7. 確定できた範囲と残る資料

確定できるのは、25.4.0指定、起動時初期化、3ロードのNPA指定、既存統合Manifestの識別子権限、公開契約の対象区分、NPAの残存処理とRTB一般仕様まで。Googleの回答は未取得である。

不足資料は、実契約と適用条項、目的別の処理主体・独自利用、25.4.0の送信表、受領法人・処理国・保持期間・権利窓口、韓国向け第三者共有、韓国向け要件と実装方法。取得する質問を[Q1–Q6](T05-KR-admob-google-questions.md)に限定し、各回答の採否を[判断資料](T05-KR-admob-decision.md)に対応付けた。
