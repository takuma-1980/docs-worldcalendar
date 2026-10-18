---
layout: default
title: Chapter 5 Recurrence and Notifications
lang: en
---

# Chapter 5 Recurrence and Notifications

For local events, you can set recurrence and multiple notifications. For events saved to a device calendar, support for individual settings depends on the Android calendar.

<a id="05-section-1"></a>

## Set an event to repeat

### Recurrence options

On the event creation or editing screen, select the recurrence setting. Available options are no recurrence, daily, weekly (on the starting weekday), monthly (on the Nth weekday, the last day of the month, or the last occurrence of a weekday), yearly on the same date, and a custom weekly pattern. If the start date is the last day of the month, you can choose to repeat on the last day of each month. If it is the last occurrence of that weekday in the month, you can choose to repeat on the last occurrence of that weekday each month. Follow the options shown on screen to specify weekdays and weeks. All-day weekly, monthly weekday-based, and yearly recurrences are expanded using the calendar currently displayed. As a result, an all-day event repeating on the Nth weekday of each month, for example, may fall on different dates in the input calendar and the displayed calendar. Dates that do not exist in a particular year, such as February 29 or Pagume 6 in the Ethiopian calendar, are not shown in that year.

An existing event may not be editable if its recurrence rule cannot be represented by the app's available options. Rules for the last occurrence of a weekday each month and the last day of each month can also be loaded. Other recurrences use the recurrence calendar saved with the event, which is usually the input calendar. Notifications also use the input calendar, so their dates may differ from those in the calendar currently displayed.

### End a recurrence

Choose whether the recurrence never ends, ends on a specified date, or ends after a specified number of occurrences. If you choose a date or a number of occurrences, enter the corresponding value and save.

### Delete one occurrence, this and future occurrences, or all occurrences

When deleting a recurring event, choose to delete only this occurrence, this and all future occurrences, or all occurrences including past ones, then tap the action button to proceed. For recurring events in a device calendar, deleting only some occurrences may not be reflected in the device calendar. Check the device's calendar after deleting.

<a id="05-section-2"></a>

## Set notifications

### Add a notification time

In the notification section of the local event creation or editing screen, tap an existing notification row to choose its timing. To add another, tap the option with a “＋” to add a notification. You can use a preset or a custom notification with a value and unit (minutes, hours, or days). Each event can have up to five notifications.

Tap a configured notification row to change its timing. Use the “×” (remove notification) on the row to remove it. For local events, the last remaining notification cannot be removed.

If an event has multiple notification times, a notification is sent at each one. Notification timing for local events uses the calendar selected when entering the event. Notifications cannot be added to events in subscribed calendars. You can also set notification times for events from device calendars. Turn on event notifications under <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > event management > account integration. If notifications are also enabled in the device calendar, another app may send a notification as well, resulting in duplicates.

### Requirements for receiving notifications

On Android 13 and later, you must allow notifications for WorldCalendar. Event notifications are not shown if permission is denied. Device power-saving settings and alarm restrictions may delay notifications.

### Open an event from a notification

Tap a notification to open WorldCalendar and display the relevant date and event details. If the event has been changed or deleted, or the data on the device has been updated, the notification may differ from the current event.

<a id="05-section-3"></a>

## Read next

[Add and edit events](04-events.md) · [Manage categories](06-search-categories.md#category-manage) · [Missing notifications](11-troubleshooting.md#notification-missing)
