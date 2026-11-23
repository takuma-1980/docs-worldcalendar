# T05-KR GoogleへのAdMob照会案（日英）

作成日：2026-11-23（JST）。**未送信**。Googleへの問い合わせを自動送信しない。これはGoogleに処理事実・契約・公式見解を確認する文案であり、Googleの回答だけで韓国法上の適法性を確定する依頼ではない。

関連：[証拠資料](T05-KR-admob-evidence.md)／[判断資料・回答受入条件](T05-KR-admob-decision.md)。下記の日本語又は英語の一方を使用する。アカウント固有IDは必要な場合に認証済みの非公開窓口で補足し、公開フォーラムへ掲載しない。

## 1. 質問を6問に絞る方針

| 質問 | 分類 | Googleでしか埋められない主要な空欄 |
| --- | --- | --- |
| Q1 | 契約 | 適用基本契約・C-C／DPT・機能別適用・版 |
| Q2 | 処理主体・独自利用 | 誰のために処理し、誰が目的・手段を決めるか、結合・独自利用の制限 |
| Q3 | 送信データ | 25.4.0・NPAの処理段階別データと識別子制御 |
| Q4 | 受領法人・処理国・保持期間 | 項目・目的ごとの受領者、国、期間、削除・窓口 |
| Q5 | 第三者共有 | メディエーションとは別のRTB・未落札者・配信／測定先への共有 |
| Q6 | 韓国向け要件 | PIPAに関するGoogleの対応、開発者への要求、開始前制御・拒否撤回 |

既に判明した「NPAでも識別子を使うか」「一般AdMobはどちらの一覧か」を繰り返し聞かず、本件条件への適用差分を質問する。Q4は一つの処理一覧表で回答可能。全8分類を独立した長い照会に分割しない。回答が部分的なら未回答欄だけを追加照会する。

## 2. 日本語文案

件名：韓国向けAdMob NPAの契約・データ処理の確認（Android GMA 25.4.0／WorldCalendar）

Google AdMob ご担当者様

日本所在のWorldCalendar開発者です。韓国で非パーソナライズ広告（NPA）を利用する際のPIPA評価と説明に必要な、契約およびデータ処理の事実を確認したくご連絡します。

対象はAndroidアプリ（パッケージ`xyz.takuborn.worldcalendar`）、Google Mobile Ads SDK `com.google.android.gms:play-services-ads:25.4.0`です。現在検討しているソースは、起動時に`MobileAds.initialize(this)`を実行し、バナー・ネイティブ広告のすべての明示ロードでAdMobAdapterのextrasに`npa=1`を指定します。SDK初期化前の広告同意ゲートはありません。アプリManifestによる広告ID権限の除去はなく、既存のrelease統合ManifestにAD_ID等が残ります。Firebase Analyticsは全体停止設定ですが、AdMobの処理停止とは解釈していません。これは配布バイナリの通信を実測した結果ではありません。

独自の別社広告SDK・アダプタ宣言は確認していません。過去の管理画面記録では「AdMob（デフォルト）」のみでしたが、現在の全入札先・メディエーション設定は未確認です。契約法人はアカウント所有者の確認によるGoogle Asia Pacific Pte. Ltd.です。公開データ開示は25.5.0を対象とし、通常AdMobと一部Processor機能が区別されること、NPAでも第三者RTBへの要求送信があり得ることを理解しています。

以下6点について、**25.4.0・NPA・韓国所在利用者・本アカウントに適用される範囲**をお示しください。該当しない機能はその旨、確認不能な点は未確認と明示し、一般ページを示す場合も適用する節・条件・版をご指定ください。

1. **Q1 契約**：上記構成に適用される基本契約とデータ保護条項の名称・URL・版／発効日、C-C規約又はDPTが組み込まれる条項とその対象処理を特定してください。通常NPAがDPT対象となる場合は根拠、Secure Signals／Server-side impression-level ad revenue等の限定機能の場合は本アカウントでの適用範囲・有効状態の確認方法もお願いします。
2. **Q2 処理主体・独自利用**：広告配信、頻度管理、測定、不正防止、診断・改善の各処理について、処理を行う法人、誰の目的／指示で処理するか、誰が目的・手段を決定するかをご説明ください。NPAデータをGoogle又は広告事業者自身の目的、サービス横断の改善・開発、他アプリ／Googleアカウント等との結合に利用するか、利用する場合の対象・目的・制限をお示しください。開発者が生データへアクセスできない場合にも提供者として扱われる契約上の範囲、Googleが本人から直接収集すると考える範囲とその根拠もお願いします。韓国法に関する見解と契約上の役割の説明は区別してください。
3. **Q3 データ・開始時点**：25.4.0の本構成について、SDK／Provider起動・`initialize()`・広告要求・表示／操作の各段階で外部送信する項目、目的、送信先をお示しください。AAID、App Set ID、publisher first-party ID等、アカウント関連ID、IP／推定位置、操作・診断を含め、AAID削除時に残る処理、`npa=1`が初期化にも及ぶか、送信を停止／制限できる設定と25.5.0開示との差分を確認したいです。
4. **Q4 法人・国・保持・権利**：対象データ／目的ごとに、実受領法人と連絡先、保存・処理・遠隔アクセス国、処理開始時期・方法、保有利用期間（起算点・上限又は具体的決定基準、バックアップ・法定例外）、削除／処理停止／権利請求手続を一覧でお示しください。契約法人所在地、集計レポート閲覧期間、一般的なデータセンター一覧を個別処理の回答と区別してください。
5. **Q5 第三者共有**：韓国NPAで、第三者RTB入札者（未落札者を含む）、メディエーション、広告配信・測定ベンダーにデータを渡す経路はありますか。存在する各経路の法人／一覧、項目、目的、独自利用の可否、国・保持期間、再提供・再委託上の役割、共有を制限できる設定をご提示ください。本アカウントでの実適用を確認する管理画面又は記録もご案内ください。Google→第三者と端末→第三者を分け、デフォルトグループのみの場合に残る共有も確認したいです。
6. **Q6 韓国向け要件**：この構成に対するGoogleの韓国向け公式見解・契約上の要求があれば、PIPA上の収集利用・提供・委託・国外移転ごとにご提示ください。Google自身が根拠／同意を確保する範囲、開発者に求める告知・同意（国外移転の別個同意を含む）、拒否・撤回・14歳未満への対応、同意が必要な場合に初期化前から処理を止めて同意状態を伝達する対応APIと25.4.0での実装資料を確認したいです。無同意利用又は認証・同等性認定を根拠とする見解がある場合は、対象処理・法人・国・根拠条項／公的決定をご指定ください。UMP等で対応できない部分もご明示ください。

可能であればQ2–Q5を、`処理段階｜データ｜目的｜目的決定主体｜受領法人・連絡先｜処理国｜期間｜共有先・役割｜制御／権利窓口`の表でご回答ください。最終的な韓国法の判断は当方で別途行います。個別確認が必要な項目は、適切な契約・プライバシー担当窓口への引継ぎをお願いいたします。

よろしくお願いいたします。

WorldCalendar開発者

## 3. English draft

Subject: Contract and data-processing clarification for AdMob NPA in South Korea — Android GMA 25.4.0 / WorldCalendar

Dear Google AdMob team,

I am the Japan-based developer of WorldCalendar. I am seeking factual and contractual information needed to evaluate and explain non-personalized advertising (NPA) for users located in South Korea under PIPA.

The proposed Android configuration uses package `xyz.takuborn.worldcalendar` and `com.google.android.gms:play-services-ads:25.4.0`. It calls `MobileAds.initialize(this)` at application startup and sets `npa=1` in AdMobAdapter extras for every explicit banner and native ad load. There is no advertising consent gate before SDK initialization. The app does not remove the advertising ID permission; an existing merged release manifest includes AD_ID and related permissions. Firebase Analytics has collection deactivated, which we do not interpret as disabling AdMob processing. These statements describe the working source configuration, not a network measurement of a distributed binary.

We found no explicit third-party advertising SDK or adapter dependency in the inspected app code. An earlier console record showed only “AdMob (default),” but current bidder and mediation settings remain unverified. The account owner identified Google Asia Pacific Pte. Ltd. as the contracting entity. We understand that the public SDK disclosure covers 25.5.0, that ordinary AdMob is distinguished from specific Processor features, and that NPA may still involve requests to third-party RTB bidders.

Please answer the following six questions for **GMA 25.4.0, NPA, users located in South Korea, and this account**, identifying any limitations. Please mark inapplicable or unverified matters explicitly. If referring to general documentation, please identify the applicable section, conditions, and version.

1. **Q1 — Contracts.** Please identify the applicable base agreement and data protection terms, with URLs, versions/effective dates, incorporation clauses, and processing covered by the Controller-Controller Terms or Data Processing Terms. If ordinary NPA is covered by the DPT, please identify the basis. For specific features such as Secure Signals or Server-side impression-level ad revenue, please identify the scope and how to verify whether they apply or are enabled for this account.
2. **Q2 — Processing roles and independent use.** For ad delivery, frequency capping, measurement, fraud prevention, diagnostics, and improvement, please identify the processing entities, whose purposes/instructions they serve, and who determines purposes and means. Does Google or any advertising party use NPA data for its own purposes, cross-service improvement/development, or combination with other apps or Google account data? If so, please identify the data, purposes, and restrictions. Please explain any contractual scope in which the developer is treated as a data provider despite lacking access to raw data, and any scope Google regards as direct collection from users, with supporting grounds. Please distinguish a Korean-law position from contractual role descriptions.
3. **Q3 — Data and start of processing.** For this 25.4.0 configuration, please identify data sent externally, purposes, and destinations at SDK/provider startup, `initialize()`, ad request, and impression/interaction stages. Please cover AAID, App Set ID, publisher first-party or other identifiers, account-related identifiers, IP/estimated location, interactions, and diagnostics; processing remaining after AAID deletion; whether `npa=1` affects initialization; available controls to prevent or restrict transmission; and differences from the 25.5.0 disclosure.
4. **Q4 — Entities, countries, retention, and rights.** For each data/purpose combination, please provide the actual receiving legal entities and contact details; countries of storage, processing, and remote access; timing and method; retention/use periods, including starting points, limits or concrete determination criteria, backups and legal exceptions; and deletion, processing-stop, and data-subject request procedures. Please distinguish these from the contracting entity’s location, aggregate report availability, or a general data-center list.
5. **Q5 — Third-party sharing.** For Korean NPA traffic, are data disclosed to RTB bidders, including losing bidders, mediation partners, ad-serving vendors, or measurement vendors? For each applicable route, please provide entities/lists, data, purposes, independent-use permissions, countries, retention periods, onward-disclosure/subcontracting roles, and controls to restrict sharing. Please explain how to verify actual applicability through account settings or records. Please distinguish Google-to-third-party from device-to-third-party flows and identify sharing that remains when only the default group is shown.
6. **Q6 — Korea-specific requirements.** Please provide any official Google position or contractual requirements for this configuration regarding collection/use, third-party provision, entrusted processing, and overseas transfers under PIPA. Please identify the scope for which Google establishes a legal basis or obtains consent itself, and the notices/consents required of the developer, including separate overseas-transfer consent, refusal/withdrawal, and users under 14. If consent is required, please identify supported APIs and 25.4.0 documentation for preventing processing before initialization and communicating consent status. If Google considers any processing permissible without consent or relies on certification/equivalence recognition, please identify the processing, entities, countries, provisions, and official decisions. Please identify any requirements that UMP or other Google tooling does not address.

Where possible, please consolidate Q2–Q5 into a table: `processing stage | data | purpose | purpose-determining party | receiving entity/contact | processing countries | retention | onward recipients/roles | controls/rights contact`. We will separately obtain the final Korean-law assessment. Please route account-specific matters to the appropriate contractual or privacy team where necessary.

Thank you,

WorldCalendar developer

## 4. 回答の保存と追加照会

送信前に開発者が文面・対象アカウントを確認する。送信した場合はケース番号、送信日、回答日、回答部署、対象SDK・地域・機能・設定、適用契約版、根拠URL／添付を記録する。回答の原文と要約を分離し、営業上の一般説明を契約変更・法的保証として扱わない。

一般ページへのリンクだけの場合、既知の一般仕様を再質問せず、例えば「Q4のAAID・不正防止ログの処理国と期間が未回答です」のように不足セルを指定する。Googleが非開示又は確認不能と回答した欄は、推測で埋めず判断資料の未解決条件に残す。
