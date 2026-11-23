# Phase 3 根拠・意味と法令の内部照合

確認日：2026-11-23 JST。翻訳・構成の内部検証であり、韓国弁護士による法律意見や韓国語母語話者による校了ではない。

## 調査対象と版の限界

文書は開始時 `feat-korean-privacy-policy`（HEAD `43577045f4af22c7c2c87ad55507ef3a9b95420f`）。指定の `fix-privacy-policy`（HEAD `26e39429ae144c65fa62fcb9b8fd4d1f029b2bc9`）との差分はツリー上なしと確認し、後者へ切り替えた。既存の未追跡Phase 2資料と `.DS_Store` はそのまま維持。既存の日英処理方針・日英規約・両問い合わせ、include・inquiry.yml、JS/CSS、Jekyll設定・プラグイン・CIを参照。

Androidは `/Volumes/ExtSSD/Projects/WorldCalendar`、ブランチ `feat-for-korean`、HEAD `fb61fb5963fce9d61d3ecace24ecb22bb1ef92ec`。未コミット／未追跡変更を含む現在の候補ソースを読取のみで確認した。GitHub mainのコミットは候補差分の証明ではない。ソース変更・アプリビルド・実通信測定・管理画面操作はしていない。

| 根拠（Android相対パス） | 確認内容 | 草案・限界 |
|---|---|---|
| `app/src/main/AndroidManifest.xml:7–23` | READ/WRITE_CALENDAR、allowBackup、backup規則、`firebase_analytics_collection_deactivated=true` | Provider、OS、新規停止を記載。旧配布版やAdMob停止の証明ではない |
| `…/WorldCalendarApplication.kt:47` | MobileAds起動時初期化 | 開始前同意を実装済みと書かない |
| `…/core/ads/AdRequestFactory.kt:8`、`AdMobBanner.kt:80,88`、`AdMobNativeAd.kt:84` | `npa=1`、バナー2経路とネイティブ1経路 | NPAを無収集・無同意の根拠にしない |
| `app/build.gradle.kts:37–38,169–172`、`gradle/libs.versions.toml` | 表示版1.0.8／31、Analytics依存あり、GMA25.4.0 | 版文字列だけでは公開中成果物と一致しない |
| `…/core/data/local/datastore/TermsConsentRepository.kt` | 規約版・日時・言語・アプリ版をバックアップ対象DataStoreへ。koを受理する候補差分あり | ログインでなくローカル受諾記録。広告同意の証拠ではない |
| `app/src/main/res/xml/backup_rules.xml`、`data_extraction_rules.xml` | user_data_databaseとbackup_user_preferencesを対象にcloud／transfer | 全予定や通知の完全復元を約束しない。同期先・OS保持削除は別 |
| `…/core/data/external/ical/IcsFeedFetcher.kt:87–95` | GET、If-None-Match・If-Modified-Since、手動リダイレクト検証 | IP・URL・ヘッダと提供者ログの説明。ローカル予定本文を追加する引数なし |
| `…/core/domain/model/CalendarType.kt:16`、`…/converter/KoreanLunarCalendarConverter.kt:18–33,61–75` | 候補にKOREAN_LUNAR、同梱KASI由来表、陽暦1900-01-01〜2050-12-31、Asia/Seoulの0時 | 日英の6暦説明に対する候補差分。全版提供やKASI認証としない |
| `…/core/data/external/ical/ExternalCalendarPreset.kt:18–27` | 日本・韓国祝日Google公開ICS | 政府公式休日配信と誤認させない |

`…/` は `app/src/main/java/xyz/takuborn/worldcalendar/`。ローカルDB、Provider、通知・ウィジェット等の経路はPhase 2 [実装証拠表](../korea-phase2/evidence-and-sources.md)も再利用。独自アカウント・予定本文の開発者サーバー送信がないとの結論は調査範囲のもの。SDK全通信の不存在を証明していない。

公開中1.0.8／31には全体停止がなかったとの既存記録と次期設定を区別。GA4イベント／ユーザー2か月・リセットオン、利用者と識別子を対応付けられない事実は[Analytics記録](../2026-11-22-analytics-implementation-check.md)を再利用し、現Consoleを再確認したとはしない。旧版・過去データを方針11へ追加した。

## 韓国法の確認と文案への適用

以下は本日閲覧した公式条文・検索結果とPhase 2記録。条文の一般要件と本アプリでの成立判断は区別する。公式全文ページが動的外枠だけの場合は条文情報・公式検索抜粋を利用し、全文取得済みと扱わない。

| 一次資料 | 確認・草案への反映 | 残る確認 |
|---|---|---|
| [PIPA28条の8](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334869)（21445号、2026-09-11施行表示） | 別個同意と例外を区別。必要委託・保管の公表ルートを通常広告全体へ転用しない。台帳に項目・国・時期方法・受領者連絡先・目的期間・拒否影響を設けた | SDKの直接収集／提供／委託の当てはめ、根拠と契約保護措置は未確定 |
| [PIPA22条の2](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1033215047)・[現行施行令](https://www.law.go.kr/LSW/lsInfoR.do?efYd=20261110&lsiSeq=291731)（36804号、2026-11-10） | 同意を要する14歳未満の処理で代理人同意・確認。年齢自己申告やBチェックを確認手段と認定しない | 対象年齢は2026-11-23に満16歳以上へ確定。必要な処理・対象外利用／年齢不明・代理人方式・証跡をP3-05へ |
| [令41条](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1033216389)、[令43条](https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900077157)、[令44条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=67080) | 閲覧と訂正削除・処理停止の10日結果通知、例外時理由・異議方法を方針12へ。7日初回返信との混同を避ける | 実際の韓国語受付・本人代理人確認・記録・期限管理はP3-07 |
| [約款法6〜14条](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025032507)（20239号、2024-08-07施行表示） | 不当な免責・危険転嫁を避け、サービス変更に合理的理由・案内・保全期間を設け、沈黙の一律同意と専属管轄を置かない | 3〜5条の組入れ・説明等も含む個別運用、将来改正・韓国法最終適用はP3-08 |
| [民法の公式条文入口](https://www.law.go.kr/LSW/lsLinkProc.do?jono=075000&lsNm=%EB%AF%BC%EB%B2%95&mode=11)（4・5条の公式検索抜粋）、[現行版検索](https://www.law.go.kr/lsSc.do?menuId=1&query=%EB%AF%BC%EB%B2%95) | 成年19歳、未成年契約は代理人同意・例外・取消しの問題があり、PIPA14歳とは別。文案は法的に必要な場合と権利留保を明示 | 2026年改正全体・無料契約の成立条件までは監査未了 |
| [国際私法42・47条の公式掲載](https://www.law.go.kr/LSW/lsInfoP.do?ancYnChk=0&chrClsCd=010202&efYd=20220705&lsiSeq=238791)（公式検索抜粋を利用） | 消費者契約の国際管轄と常居所国の強行的保護を区別。日本法・日本専属裁判所を指定せず利用者の法定権利を留保 | 韓国向け勧誘・無料サービスへの具体的当てはめ、現行改正の再確認はP3-08 |
| [GMAデータ公開](https://developers.google.com/admob/android/privacy/play-data-disclosure)、[NPA](https://support.google.com/admob/answer/7676680?hl=ko)、[C-C規約](https://business.safety.google/adscontrollerterms/) | 一般開示の候補項目を反映し、NPAと収集停止を分離。C-Cは今回の暫定前提。対象SDKの実送信と受領主体は未確定 | 公開開示25.5.0と候補25.4.0の差分、Q1〜6の回答が必要 |

15・17・21・26・30・31条、令31条、PIPC直接収集解説と2026年指針の出典・不足は[Phase 2法令調査](../korea-phase2/T05-KR-research.md)・[AdMob証拠](../korea-phase2/T05-KR-admob-evidence.md)を継承。法定保存年数・同意不要・位置情報法等の適用除外を新たに断定していない。消費者保護について無料アプリを有料通信販売と仮定せず、取引実態と補助法令の個別適用をP3-08・12に残す。

## 意味・韓国語・リンクの内部確認

| 対象 | 照合結果 |
|---|---|
| 日本語方針1〜9・英語版 | 登録不要、主にローカル、予定本文の独自サーバー送信なし、NPA・外部連携・バックアップと削除限界を維持。韓国固有部分と旧Analyticsを補足 |
| 日本語規約1〜10・英語版 | 精度・境界・通知・ICS・データ保全の注意を維持。未成年契約・約款変更・法的責任は韓国向けに調整。日本固有の変更法条を転用しない |
| 用語 | 개인정보 처리방침、정보주체、개인정보처리자、제3자 제공、처리위탁、국외 이전、법정대리인、보유·이용기간、파기、처리정지、동의 철회を使い分け。만 14세 미만を明記 |
| 未確定表示 | 冒頭に未完成・未施行を明示。詳細なTODO／調査メモは本文に散在させずopen-itemsへ。国・期間・担当者名を架空で補完しない |
| 方式B | 開始前説明→チェック→メール作成→本人送信、同意文・説明版を受信メールで確認する設計。サイトに選択／日時を保存しない。現草案は一連の操作を無効化 |
| リンク | 3草案の相互リンクは内部ファイルへ。予定URLは公開済みリンクにしない。英語ヘルプは英語と表示。正式URL移動時の書換えは公開タスクで必要 |
| 文体 | 一般利用者向けの敬体、表で項目を整理、法的未確定部分は短く説明。ネイティブ校正・専門家審査は未実施で、P3-12に必須条件として残す |

追加の読取照合：`core/data/local/database/UserDataDatabase.kt` のRoomエンティティに予定・リマインダー・設定・購読URLがあり、`core/data/external/provider/CalendarProviderGatewayImpl.kt` はCalendarContractでカレンダー表示名・アカウント名・予定等を取得するため、方針2の項目にも反映。mainとGradleでFirebaseAuth／GoogleSignIn／signInWith／createUserWithは未検出。これを全認証・全通信不存在の網羅的証明とはしない。

候補 `app/src/main/res/raw/terms_of_use_ko.txt` は6暦・2026-10-18施行の既存文案で、未公開の韓国語ポリシーURLを参照している。`TermsConsentScreen.kt:100` も言語別Web規約URLへ遷移する。本Phase 3はこれらを変更せず、候補機能と新草案、受諾版、実在する公開URLの一致をP3-08・12の配布前必須確認として残す。

## T06対象年齢決定の追記（2026-11-23）

開発者の指示を一次の事業方針記録とし、韓国向けを満16歳以上、Play予定区分を「16～17歳」「18歳以上」と確定した。規約3・方針13・方式Bの未成年者説明へ反映。16～17歳の契約同意とPIPA14歳未満の同意必要処理を区別し、年齢確認・代理人同意を実装済みとは記載していない。問い合わせのチェック・テンプレート同意文は維持し、年齢申告の追加取得もしていない。

本日再確認した一次資料：[PIPA22条の2](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1033215047)は同意必要時の代理人同意・確認と平易な説明を規定。[Play対象年齢](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)は正確な年齢層申告・地域の子ども定義の確認を要求。[AdMob Families](https://support.google.com/admob/answer/6223431?hl=en)と[SDK targeting](https://developers.google.com/admob/android/targeting)は子ども向け扱い・同意年齢未満・広告内容を区別する。現Web資料の新年齢処理API／旧タグ非推奨表示を25.4.0にそのまま適用せず、版照合を残した。

推論の範囲：16歳以上方針のみを理由にAdMob子ども向け扱いを有効化する変更は必要と判断しない。ただし管理画面の現設定値・全地域のFamilies該当性・実年齢／SDK挙動は未確認で、不要との全面的保証ではない。具体的な点検と必要時の変更を[T06](../korea-phase2/T06-children.md)へ記録。今回AdMob・Playとも操作せず、Androidを変更していない。
