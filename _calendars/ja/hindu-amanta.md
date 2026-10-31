---
layout: "article"
wide: true
title: "インド太陰太陽暦（Amanta）"
description: "新月を基に月を区切るAmanta方式。アプリはVikram Samvatを用い、日番号はティティとは異なります。"
language: "ja"
publishedAt: "2026-10-31"
updatedAt: "2026-10-31"
draft: false
translationKey: "calendar-hindu-amanta"
permalink: "/calendars/hindu-amanta/"
family: "太陰太陽暦"
order: 6
---

## 暦の概要

インドの暦には太陽暦や太陰太陽暦など多様な方式があります。ここでは、アプリが実装するVikram SamvatのAmanta方式を紹介します。インドのすべての暦を代表するものではありません。

## 主に利用される国や地域

Amantaはインドの一部地域で使われます。一方、Purnimantaなど別の月の区切り方もあり、地域によって紀年、年初、月名、行事の決め方が異なります。

## 歴史的背景

インドの暦法は天文学と地域ごとの慣習の中で発展しました。Vikram Samvatは紀年法の一つです。インド国定暦のSaka紀年と混同せず、どの方式の暦かを確認する必要があります。

## 年・月・日の仕組み

Amantaは新月で月を区切り、Purnimantaは満月で月を区切ります。季節とのずれを調整する閏月があります。宗教暦のティティは太陽と月の角度差に基づく単位で、午前0時からの一日とは一致しません。

## グレゴリオ暦との違い

グレゴリオ暦の固定的な月構成とは異なり、月の開始や閏月が天文上の関係に依存します。紀年の差だけを加減して、月日まで変換することはできません。

## 日付計算に関する特徴

アプリは新月と恒星黄経、Lahiri歳差補正の近似計算を用いて月を構成します。日番号は月初からの経過日数です。日の出に割り当てたティティによる宗教暦ではありません。

## WorldCalendarでの利用方法

暦の選択からインド太陰太陽暦（Amanta）を選びます。英語UIの現行リソースではVikram (Amanta)と表記されます。日付表示はインド時間の午前0時を基準とします。

<figure><img src="/assets/images/hindu-amanta-360.webp" srcset="/assets/images/hindu-amanta-360.webp 360w, /assets/images/hindu-amanta-720.webp 720w" sizes="220px" width="360" height="800" loading="lazy" alt="WorldCalendarのインド暦の画面例"><figcaption>提供された過去の画面例です。表示や機能はバージョン・設定によって異なります。</figcaption></figure>

## 注意事項・制限

Purnimantaへの切り替えや、地域ごとの宗教暦を選び分ける機能はありません。祭日や儀礼の日付は地域の公式情報・パンチャンガを確認してください。

詳しい操作と条件は[暦のヘルプ](/helps/ja/02-calendars.html#calendar-limits)をご確認ください。

## 出典・参考資料

- [India Meteorological Department — Rashtriya Panchang](https://mausam.imd.gov.in/responsive/rashtriyPanchang.php)
- [India Meteorological Department — Calendar systems (PDF)](https://metnet.imd.gov.in/docs/imdrajbhasha/sangoshthi_2017%28S%29/6891124.pdf)
- [IGNCA digital collection — The Hindu Calendar (PDF)](https://ignca.gov.in/Asi_data/34958.pdf)

一般的な暦法の資料です。アプリ固有の方式はAndroid実装と既存ヘルプを照合しています。資料内の歴史的な日付表や「現在」の年を、そのまま最新情報として転載していません。

## 関連記事

- [グレゴリオ暦](/calendars/gregorian/)
- [日本の旧暦](/calendars/japanese-lunar/)
- [世界の暦の一覧](/calendars/)

## アプリで使ってみる

6種類の暦と予定管理をAndroidで。[Google PlayでWorldCalendarを見る](https://play.google.com/store/apps/details?id=xyz.takuborn.worldcalendar)。
