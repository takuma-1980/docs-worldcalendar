# 韓国公開対応マトリクス

調査日：2026-11-22（JST）。T06方針更新：2026-11-23（JST）。優先度「高」は公開判断を左右する事項。「必須確認」は同意画面必須と同じ意味ではない。担当は引き継ぎ先の役割であり、外部へ依頼・送信した記録ではない。

| ID | 対象 | 現在の実装 | 韓国法上の要件 | 必要な対応 | 優先度 | 根拠 |
|---|---|---|---|---|---|---|
| KR-01 | AdMob | NPA要求、起動時初期化、拒否なし | 個人情報の収集利用・提供の根拠 | **必須確認**：SDK／Googleの主体・独自目的を確定。非同意根拠が立証できなければ目的別同意＋開始前ゲート、又は広告処理停止案 | 高 | [15・17・22条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947)、[NPA](https://support.google.com/admob/answer/7676680?hl=en) |
| KR-02 | 広告の国外移転 | 契約先GAP。実受領者・国・期間未確認 | 直接収集と提供／委託を判別。移転なら根拠と法定開示 | **必須確認**：Googleの処理・実契約を照合。移転で他根拠がなければ別個同意。通常AdMobを契約必要委託と即断しない | 高 | [28条の8](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334869)、[直接収集](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS292&mCode=C050010000&nttId=10972) |
| KR-03 | 問い合わせ | 方式B・無料Groups/Gmail、日英の日本国外説明 | 処理根拠・移転項目、直接送信・代理人確認 | **公開前対応**：方式B維持で韓国語説明・法定事項・非経由受信の根拠を確定。チェック状態・日時の保存は追加しない | 高 | [施行令31条](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1033215161)、[28条の8](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334869) |
| KR-04 | 未成年者 | 韓国は満16歳以上に確定（2026-11-23）。Playは16～17歳・18歳以上を選択予定、未操作。年齢UI・保護者同意機能なし | 同意が必要な14歳未満には代理人同意・確認 | **方針確定・運用未完了**：16歳未満対象外を草案へ反映。16～17歳の契約同意、年齢不明・実際の14歳未満への必要処理制限、問い合わせ・権利対応を確定。必要時は代理人確認まで対象処理停止。今回は機能実装なし | 高 | [22条の2](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1033215047) |
| KR-05 | 韓国語処理方針 | 改訂ブランチに日英草案。韓国語Web方針なし | 目的・項目・期間・根拠・権利等の継続公開 | **Phase 3必須**：T05-KR要件表を満たす。未確認国・保持期間を確定して記載 | 高 | [30条](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025127663)、[令31条](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1033215161) |
| KR-06 | Androidバックアップ | ユーザー予定DB・一部設定対象 | 開発者責任の移転かOS独立処理か評価 | **必須確認**：OS/OEM・主体・処理国・利用者指示。必要なら根拠・通知・同意。SDK同意状態の復元を別設計 | 高 | [PIPC直接収集と移転](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS292&mCode=C050010000&nttId=10972) |
| KR-07 | 外部カレンダー | Provider読書き、アカウント同期 | 必要な機能処理と第三者提供・移転を分離 | **必須確認**：保存先と同期主体、権限前説明、連携解除／外部削除。OS権限を法定同意に代用しない | 高 | [15・17条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947) |
| KR-08 | ICS | HTTPS GET・条件付きヘッダ・リダイレクト | 必要な接続と先方直接収集、追加提供の分類 | **公開前整理**：利用者指定先・通信情報・秘密URLを説明。購読解除で更新停止、提供元ログとは区別 | 中 | [15条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947) |
| KR-09 | Analytics | 全体停止設定・既存ビルド資料あり | 新規収集と過去データを分離 | 新規同意UI不要。過去データの保持・破棄・権利対応を内部運用に残す。Phase 1再提出要求なし | 中 | [Firebase収集停止](https://firebase.google.com/docs/analytics/android/configure-data-collection)、[21条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947) |
| KR-10 | 拒否・撤回 | AAID等のOS設定案内、アプリ広告停止なし | 同意の撤回・処理停止等の権利 | **条件付き実装**：必要な同意ゲートと設定入口、停止・広告破棄・再起動制御。OSのAAID削除だけで全停止とはしない | 高 | [PIPC権利案内](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=10056) |
| KR-11 | 保存・破棄 | 問い合わせ完了後1年・月次削除 | 不要時の遅滞ない破棄、法定保存の分離 | **公開前対応**：韓国問い合わせの必要保持範囲・期限を根拠付きで決定し、通常運用と例外を分ける | 高 | [21条](https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1006183947) |
| KR-12 | 権利・安全管理 | メール窓口、7日初回目安、2FA等 | 法定権利、事故対応、安全措置、責任者 | **公開前対応**：韓国語窓口、請求種別の期限・処理、受領者との措置・苦情処理、責任者要件 | 高 | [海外事業者案内](https://pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=10056)、[令29条の10](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=182203) |
| KR-13 | 国内代理人・規模義務 | 売上・韓国情報主体数・韓国内拠点未確認 | 31条の2・令32条の3等の閾値又は指定条件 | **条件次第で必須**：売上・韓国情報主体数・当局指定の有無を確認し適用メモを保存 | 中 | [令32条の3](https://law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=182211) |
| KR-14 | Google契約・Families | デフォルトグループの既存画像、NPA | 法律とGoogle配信・子どもSDK要件を各々充足 | **条件次第で必須**：16歳以上方針とPlay連携・Families該当性・広告ソース／内容を照合。AdMob子ども向け現値は未確認。一律オン／オフ変更は不要と即断せず[T06](T06-children.md)で点検。UMP導入を韓国法適合と扱わない | 高 | [Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en)、[UMP](https://developers.google.com/admob/android/privacy) |
| KR-15 | 利用規約・補助法令 | 韓国語アプリ内草案あり、Webは日英 | 未成年契約・不当約款等。位置・販促・取引の実態で追加法令 | **Phase 3確認**：免責・準拠法等を韓国法に照合。GPS不使用・無料だけで全法令を除外しない | 中 | [現行法令検索](https://www.law.go.kr/)（個別法令適用は未確認） |

## 未確認事項の担当と完了条件

| 対応 | 引き継ぎ先 | 確認するもの | 完了条件 |
|---|---|---|---|
| KR-01・02・14 | 開発者→Google、韓国法担当 | 実契約、SDK版、初期化・NPA、Google独自利用、全受領者・国・期間・連絡先、広告ソース | データ項目・目的ごとに15／17／26／28条の8の適用と根拠を記録。回答が得られない範囲は停止案等を決定 |
| KR-03・11 | 開発者、韓国法担当 | Groups/Gmail設定・規約、配信先図、方式B全文・説明版、保持必要性 | 非経由受信・欠落メール・権利請求も含む根拠と保存期限が確定 |
| KR-04 | 開発者、Android担当 | 確定した16歳以上方針、Playの16～17歳・18歳以上予定、16歳未満／14歳未満・年齢不明時の処理、代理人確認方式 | 公開前にPlay現値・他配信国との整合を確認し必要差分を設定・記録。契約と情報処理を分け、対象外判明時・未知年齢の動作、問い合わせ・権利対応、必要時の代理人確認仕様・証跡期限を確定。今回はConsole操作・Android実装なし |
| KR-06～08 | Android担当、各サービス資料、韓国法担当 | バックアップ対象・同期の責任分界・ICS通信 | 経路ごとに直接収集／提供／委託の根拠、必要な説明、停止方法を確定 |
| KR-05・12・15 | Phase 3文書・法務担当 | T05-KR要件表、韓国語窓口、期限、規約・補助法 | 未確認値を解消し、韓国語文書と運用・実装が一致 |
| KR-09・10 | Android担当 | Phase 1証拠、必要時の同意制御試験 | 停止設定維持、過去データ対応、T07試験。完了済みPhase 1申告を再オープンしない |
| KR-13 | 開発者、韓国法担当 | 規模・拠点・指定通知 | 閾値・例外の適用根拠を保存し、必要なら指定手続へ引き継ぐ |

Googleへの確認や法務照会は準備すべき情報を示したもので、今回外部へ送信していない。
