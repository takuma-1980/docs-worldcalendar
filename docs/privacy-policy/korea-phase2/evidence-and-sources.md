# 調査証拠・公式出典・取得限界

調査日：2026-11-22（JST）。内部資料。記載は調査時点の状態であり、将来の変更を追跡した資料ではない。

## 1. 対象と証拠の優先順位

- 文書リポジトリ：`/Volumes/ExtSSD/app/docs-worldcalendar`、ブランチ`fix-privacy-policy`、HEAD `26e39429ae144c65fa62fcb9b8fd4d1f029b2bc9`。GitHubの同ブランチ先頭も一致と確認。開始時の作業ツリーは変更なし。
- Android：`/Volumes/ExtSSD/Projects/WorldCalendar`の既存作業ツリーを読取のみ。HEAD `fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec`はGitHub mainと一致。**未コミット・未追跡変更を含む**ため、GitHub mainの内容だけを現在の公開候補ソースとしない。
- ソースのNPA・Analytics停止・韓国語等の差分を現在の実装候補として扱う。配布済みバイナリとは同一と認定しない。最新のAndroid内部資料`docs/release-plans/korea/current-data-processing-status-ja.md`（11月22日更新）を最終ビルド確認記録として参照した。debugビルドとrelease統合Manifestの停止確認あり。最終release AABと実通信の完成証拠は同資料でも未確認。
- ユーザー指示によりPhase 1のAnalytics／NPA／Play申告作業は完了前提とする。上記成果物の限界は法的判断の証拠範囲を説明するためであり、Phase 1の再提出・全作業の再実施を求めない。
- 公開サイト`https://www.worldcalendar.xyz/`、`/privacy-policy/`、`/privacy-policy/ja/`は今回のWeb取得でアクセスエラー。**公開中の全文を今回再取得したとはしない**。既存`2026-11-21-live-privacy.txt`・`live-terms.txt`を過去スナップショットとして参照。現在の公開ページと改訂ブランチの一致は未確認。

GitHub：[Android基点](https://github.com/takuma-1980/WorldCalendar/commit/fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec)、[文書ブランチ](https://github.com/takuma-1980/docs-worldcalendar/tree/fix-privacy-policy)。未コミットソースについてこれらのURLを最新行の証明にしない。

## 2. 確認した実装

Androidパスは上記ルートからの相対パス。

| ファイル | 確認できた事実 | 限界 |
|---|---|---|
| `app/src/main/AndroidManifest.xml` | 21行のAnalytics全体停止true、次2行の広告関連false。allowBackup、READ/WRITE_CALENDAR、INTERNET等 | 権限の存在は実送信を意味しない。停止はGMAの停止ではない |
| `WorldCalendarApplication.kt`（main Javaパッケージ内） | 47行で`MobileAds.initialize(this)`。規約UIより前のApplication起動 | 初期化通信は未実測 |
| `core/ads/AdRequestFactory.kt` | 共通関数のAdMobAdapter bundleにnpa=1 | 全購入者・他SDKの処理まで保証しない |
| `core/ads/AdMobBanner.kt` | 80・88行の2ロードが共通関数経由 | 配布版との同一性は別 |
| `core/ads/AdMobNativeAd.kt` | 84行のロードが共通関数経由 | 同上 |
| `app/build.gradle.kts`・`gradle/libs.versions.toml` | Firebase Analytics依存あり、BoM34.10.0、GMA25.4.0。直接の別広告ネットワーク／UMP依存は確認範囲で未検出 | 推移依存・広告購入者すべてを排除した証拠でない |
| `core/data/external/provider/CalendarProviderGatewayImpl.kt` | CalendarContractの予定・説明・場所・時刻・繰返し・通知の読書き | OS同期アダプタと各社の処理はコード外 |
| `core/data/external/ical/IcsFeedFetcher.kt` | GET、Accept、ETag／Last-Modified、各リダイレクト検証 | 提供元のログ・保持はコード外 |
| `app/src/main/res/xml/backup_rules.xml`・`data_extraction_rules.xml` | user_data_databaseとshm/wal、一部DataStoreをクラウド・移行対象 | 実行時期・処理先はOS等に依存 |
| `core/data/local/datastore/TermsConsentRepository.kt` | 規約同意をバックアップ対象設定へ保存 | 広告同意とは別 |
| `feature/settings/SettingsMenuScreen.kt` | 規約・ポリシーを開く導線 | SDKの法的同意／拒否・撤回を実装した証拠なし |

独自アカウント・開発者サーバーへの予定アップロード・独自Analytics送信は既存調査と今回の関連コード確認で発見なし。アプリ全ファイル・サーバー全体の不存在証明ではない。広告SDKの自動処理と分離する。

文書側は`privacy-policy/ja/index.md`・英語版・互換版、`contact/index.html`、`_data/inquiry.yml`、既存問い合わせ運用資料を確認。現改訂ポリシーはAnalytics本文削除済みとの11月22日履歴に一致。今回の内部資料では、ユーザー指示どおり過去Analytics処理を区別して残した。韓国向け方針本文は未作成。

## 3. 既存資料との差異

| 旧資料の記述 | 今回の扱い |
|---|---|
| Analytics標準収集が有効／全体停止なし | 最新Manifest・Android側11月22日更新資料により全体停止へ更新 |
| 最終ビルド一切未確認 | 最新資料はdebugビルド・release統合Manifestを確認済み。最終release AAB・実通信まで確認済みにはしない |
| Playの未提出・公開修正が必要 | ユーザーのPhase 1完了前提を優先。韓国の追加処理に伴う差分だけを今後評価 |
| 方式A/Bが未選択 | B確定を維持。Aの再提案なし |
| 13歳未満を除外 | 韓国14歳未満と異なる。13～15歳／16～17歳のどちらが対象かは未確認 |
| 問い合わせ完了後1年の保存 | 日本側で確定した運用。韓国21条の必要性・遅滞ない破棄と別途照合 |
| Google契約先の国が判明 | 実受領者・実処理国・保持期間まで確定した意味ではない |

## 4. 韓国の公式資料

以下は今回ブラウジングでページ又は検索結果の本文を確認した資料。動的ページで取得できない全文は確認済みとしない。法令の施行日・公表日と、検索エンジンのクロール日を区別した。

| 出典 | 確認内容・版・限界 |
|---|---|
| [PIPA 15～25条群](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947) | 原文取得。法律21445号、2026-03-10改正、2026-09-11施行。15・17・21・22・22条の2・23条等 |
| [PIPA 28条の8～11](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334869) | 原文取得、同現行版。別個同意、必要委託・保管の公開／通知、法定事項、保護措置・再移転 |
| [22条の2単独条文](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1033215047) | 現行版・14歳未満の条件付き代理人同意を公式検索結果でも照合 |
| [PIPA 30条](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025127663) | 現行版の条見出しと自動収集事項を取得。表示が一部条項に限定され、全列挙をこのページだけで確認したとはしない |
| [施行令31条](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1033215161) | 原文取得。大統領令36804号、2026-11-10他法改正・同日施行。国外移転根拠・直接収集国等 |
| [施行令29条の10](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=182203) | 原文取得、36804号。受領者との事前協議・契約等への反映 |
| [施行令の改正資料](https://law.go.kr/lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20260911&lsId=&lsiSeq=289537&urlMode=lsEfInfoR&viewCls=lsRvsDocInfoR) | 旧36671号の17条の2・29条の7等を検索結果で確認。現行版への条別照合の取得限界あり |
| [施行令17条の2を含む検索対象](https://www.law.go.kr/LSW/LsiJoLinkP.do?docType=JO&joNo=003100000&languageType=KO&lsNm=개인정보%20보호법%20시행령&paras=1) | 公式検索結果に代理人確認方式。直接openでは動的外枠となった。署名・メール等の方式は旧版PDF検索結果とも照合。当初は旧版との照合に留まったが、下記現行本文で17条の2の全7方式を追加照合済み |
| [国内代理人：施行令32条の3](https://law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=182211) | 公式検索結果で売上・人数基準確認。全条件を本件に当てはめた結論は未確定 |
| [公布済み将来法](https://www.law.go.kr/lsInfoP.do?lsiSeq=289415) | 法律21910号、2026-09-08改正、2027-03-09施行。現行法に混入させない |
| [韓国政府機関のPIPA掲載](https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=190&SEQ_HISTORY=) | 2条の容易結合による識別定義を確認。全文をlaw.go.krの現行改正照合に代用しない |
| [PIPC海外事業者案内公表](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=10056) | 2024-04-04。適用類型、子ども・国外移転・権利等の注意 |
| [公式ポータルの案内書](https://www.privacy.go.kr/front/bbs/bbsView.do?bbsNo=BBSMSTR_000000000049&bbscttNo=20691) | 2024-04-05登録。国文修正版・英中添付の存在確認。添付PDFの全頁照合は未実施 |
| [PIPC直接収集の解説](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS292&mCode=C050010000&nttId=10972) | 2025-02-04登録。海外直接収集とその後の提供・委託・保管を区別する公式本文を取得 |
| [PIPC行動情報政策](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=9888) | 2024-01-31。識別可能性と広告媒体の透明性。計画を施行済み新法としない |
| [2026年処理方針指針の公表](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=&nttId=12021) | 2026-04-24。4月改訂の存在確認。添付全文の要件照合は未了 |
| [PIPC現行案内書一覧](https://pipc.go.kr/np/cop/bbs/selectBoardList.do?bbsId=BS217&mCode=D010000000) | 2026年4月処理方針、9月責任者／漏えい、11月安全管理の資料の存在。各添付全文は未確認 |

追加照合：[現行施行令本文](https://www.law.go.kr/LSW/lsInfoR.do?efYd=20261110&lsiSeq=291731)で17条の2の代理人確認方式と32条の3の基準を確認。[41・42条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=67078)、[43条](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900077157)、[44条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=67080)は36804号表示の原文を取得し、10日以内の閲覧・結果通知等を確認した。

法令名で開くURLには施行前の条文も混在し、動的外枠だけ返る例・メンテナンス転送もあった。このため主要結論は施行日を表示する条文情報ページを優先した。韓国語原文と英訳の相違を実際に発見したとは記載しない。未取得条文・指針を閲覧済みとしない。

## 5. Google・日本の公式資料

- [GMAデータ開示](https://developers.google.com/admob/android/privacy/play-data-disclosure)：送信項目の候補。既存調査は25.5.0対象資料を25.4.0実装と区別している。実測の代用不可。
- [NPA](https://support.google.com/admob/answer/7676680?hl=en)：過去行動に基づく選択との違い、識別子利用が残る説明。
- [初期化](https://developers.google.com/admob/android/quick-start)：初期化前の同意・設定確認。対象版の挙動確認は別。
- [UMP](https://developers.google.com/admob/android/privacy)：Googleメッセージと状態API。韓国法の全要件対応を示す証拠なし。
- [広告設定](https://developers.google.com/admob/android/targeting)：子ども等の設定。最新APIを25.4.0で利用可能と未検証のまま指定しない。
- [Google Play Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en)：対象年齢・子ども／混合利用者への要求。
- [Googleサービス分類](https://business.safety.google/adsservices/)：通常AdMobはcontroller service、一部processor機能を区別。
- [Firebase収集停止](https://firebase.google.com/docs/analytics/android/configure-data-collection)：既存実装確認の公式根拠。今回の停止方針は維持。
- [Google APPI](https://business.safety.google/intl/ja/appi/)、[PPC法31条FAQ](https://www.ppc.go.jp/all_faq_index/faq1-q8-3/)：今回再確認。実契約・個別処理への当てはめは未了。
- [PPC外国提供編](https://www.ppc.go.jp/personalinfo/legal/guidelines_offshore/)、[通信分野共同解説](https://www.ppc.go.jp/files/pdf/250601_telecom_GLs_description.pdf)：既存日本法調査の参照先。今回全文の再調査はしていない。

## 6. 未確認の一覧

実通信・最終release AAB、Googleと各広告ソースの実受領者・目的・国・期間・窓口、契約による措置の充足、SDKによる提供／直接収集の本件分類、問い合わせの3号必要性と独自目的、14歳未満方針、代理人確認方式・証跡期間、韓国語窓口・法定期限を守る実運用、規模義務、補助法令・約款の条文別適用、公開サイト現本文。具体的な照合先と完了条件は[マトリクス](release-matrix.md)に記載した。


## 7. 調査時のローカル証拠ファイルの識別

未コミット変更の再現確認用SHA-256。ファイル内容は変更していない。

| Android相対パス | SHA-256 |
|---|---|
| `app/src/main/AndroidManifest.xml` | `3555a8defb35d8df821eb46de86486b3d8eaeeeca062dd05ab109a380bbd9f35` |
| `app/src/main/java/xyz/takuborn/worldcalendar/WorldCalendarApplication.kt` | `eee7ed4f4e63adc06ec648211ce30cc3eee75379c2da64d35800a3a427a51840` |
| `app/src/main/java/xyz/takuborn/worldcalendar/core/ads/AdRequestFactory.kt` | `47644630dfc80cedb1c76e461531b4dd6ce56e642e4b4ee26b805a1bdfb3d3d7` |
| `app/src/main/java/xyz/takuborn/worldcalendar/core/ads/AdMobBanner.kt` | `72b859eab9618c218886e7d4ee85cc755e91b8379f9204dfcf5d5daa4d831b13` |
| `app/src/main/java/xyz/takuborn/worldcalendar/core/ads/AdMobNativeAd.kt` | `a2073bc2b195f3a88e868aea2067abd8b309bfc835952eacbc7848c93e8b1d32` |
| `app/src/main/res/xml/backup_rules.xml` | `1dcf2c04ce0205a0d7eb9db7802ca0cb5c3be0a786ff97baa30a4e649d3bd1c6` |
| `app/src/main/res/xml/data_extraction_rules.xml` | `8a88451d1e384e4261247ff843fac8a0334764c1d644015f4e810760826e98b0` |
| `docs/release-plans/korea/current-data-processing-status-ja.md` | `0a941cb9260d002001b609134b73dba47f0579b96fa014ea669775c3f51ad6a1` |
