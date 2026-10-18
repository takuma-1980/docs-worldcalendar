---
layout: default
title: Chapter 8 Add Public Calendars
lang: en
---

# Chapter 8 Add Public Calendars

Register an iCal (ICS) URL to display events from a public calendar in WorldCalendar. These calendars appear in the iCal subscriptions section. Events in subscribed calendars are read-only. See also [Available actions by save destination](04-events.md#event-save-target).

<a id="ical-add"></a>

## Add a subscribed calendar

### Register a URL

1. Open <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > event management.
2. Tap “＋” to the right of the iCal subscriptions heading.
3. Choose a preset if needed, and enter the calendar name, URL, and color.
4. Save. The first calendar fetch starts after the calendar is added.

This initial fetch runs even when account integration is disabled. However, subsequent manual and automatic updates require account integration to be enabled. See [Update requirements](#ical-sync).

The available preset is Japanese public holidays. To toggle Rokuyo, use “☑／☐” (the checkbox) for the Rokuyo display setting under <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > event management. If you enter a URL yourself, use a public HTTPS ICS URL. A `webcal://` URL is converted to HTTPS when saved. Duplicate URLs cannot be registered. For safety, URLs containing a username or password, localhost or `.local` hosts, and nonstandard ports are not supported.

### Check where to get the URL

Use a subscription URL provided by the calendar service, often described as “iCal,” “ICS,” or a “secret address.” A URL for a page that requires login, or for the calendar view itself, cannot be loaded. A URL may grant access to the calendar, so take care when sharing it.

<a id="ical-manage"></a>

## Manage subscriptions

### Change visibility, color, or details

In the subscribed calendar list in event management, use “☑／☐” (the checkbox) on each row to enable or disable display. Events from disabled feeds do not appear on the main screen or in search results. Use <img class="button-icon" src="../../assets/icons/edit.svg" width="20" height="20" alt="Pencil"> (Edit) on a row to change its name, URL, or color. You can register up to 10 subscriptions.

<a id="ical-sync"></a>

### Check sync status and update

In the current app, both manual and automatic iCal updates require account integration to be enabled. When it is disabled, subscribed calendars are not updated by either method. First, start account integration from event management. This requires both Android calendar read and write permissions. For instructions, see [Connect other calendars](07-calendar-sync.md#device-connect).

The list shows the status and time of the last sync. To update manually, use <img class="button-icon" src="../../assets/icons/sync.svg" width="20" height="20" alt="Two arrows forming a circle"> (Sync) at the top right of the event management screen. Automatic syncing is scheduled when the app starts, but it skips subscribed calendars that have already been synced within the past 24 hours. Manual syncing has a five-minute cooldown. If repeated sync attempts do not show changes immediately, wait a while and try again.

### Delete a subscribed calendar

Tap <img class="button-icon" src="../../assets/icons/delete.svg" width="20" height="20" alt="Trash can"> (Delete) on the relevant row. After deletion, events from that feed are no longer displayed. The provider's calendar and account are not deleted.

<a id="ical-read-only"></a>

## Editing subscribed events

Events fetched from subscribed calendars are read-only. Changes to individual occurrences of recurring events in ICS (`RECURRENCE-ID`) are not imported. Events with complex recurrence rules or provider-specific information may not be reproduced completely. You cannot edit or delete these events from event details, but you can use <img class="button-icon" src="../../assets/icons/content-copy.svg" width="20" height="20" alt="Two overlapping sheets of paper"> (Duplicate) to copy one as a separate event. The copy starts as a new in-app event, and you can change its save destination where that option is available. To change the original subscribed event, edit it in the provider's calendar.

<a id="08-section-1"></a>

## Read next

[Search and categories](06-search-categories.md) · [Device calendar syncing](07-calendar-sync.md) · [Trouble loading a URL](11-troubleshooting.md#ical-load-error)
