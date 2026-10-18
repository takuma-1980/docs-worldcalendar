---
layout: default
title: Chapter 7 Connect Other Calendars
lang: en
---

# Chapter 7 Connect Other Calendars

Enable device calendar integration to display events from calendars available on your Android device in WorldCalendar. Both calendar read and write permissions are required to start integration and sync with device calendars. Creating and editing events also requires write access to the destination calendar.

<a id="device-connect"></a>

## Start integration

### Grant permissions

1. Tap <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) at the bottom of the main screen.
2. Open event management and tap <img class="button-icon" src="../../assets/icons/link.svg" width="20" height="20" alt="Chain link"> (Connect) to the right of the account integration heading.
3. Tap the option to sync. When Android asks for permissions, allow both calendar read and write access.
4. Once the list of available calendars loads, enable the calendars you want to display.

You can also set this up through the external calendar integration option shown on first launch. If either permission is missing, device calendar integration and syncing cannot start. You can change the permissions later in the device's app permission settings.

### Choose which calendars to display

In the account integration section of event management, use “☑／☐” (the checkbox) for each calendar to enable or disable its display. Events from disabled calendars are excluded from the main screen and search results. If a calendar is missing from the list, check that its account and calendar are registered on Android.

<a id="device-sync"></a>

## Sync calendars

### Sync manually

Check that account integration is enabled and that both calendar read and write permissions are granted.

Tap <img class="button-icon" src="../../assets/icons/sync.svg" width="20" height="20" alt="Two arrows forming a circle"> (Sync) at the top right of the event management screen. Completion may take some time depending on what is being synced, the connection, and the device's state. Device calendar syncing may be deferred if repeated too frequently.

### Automatic syncing and when changes appear

Syncing is also scheduled when the app starts. Device calendar updates may be skipped if the last sync was within five minutes. If a change does not appear immediately, wait a while and sync manually.

<a id="device-permissions"></a>

## Permissions and editable events

### Requirements for editing and creating events

You can edit device calendar events when syncing is enabled and the calendar allows write access. If device calendars do not appear as save destinations for new events, check the integration settings, permissions, and whether any writable calendars are available.

### Disconnect integration

In event management, tap <img class="button-icon" src="../../assets/icons/link-off.svg" width="20" height="20" alt="Chain link with a slash"> (Disconnect) to the right of the account integration heading, then confirm the disconnection. Disconnecting removes the connected calendars and their fetched event data from the app and stops syncing. Manual and automatic updates for subscribed iCal calendars also stop, so enable account integration if you want those updates to continue. Calendars on Android or Google are not deleted. Reconnecting may require granting permissions and loading data again.

<a id="07-section-1"></a>

## Read next

[Event save destinations and editing](04-events.md#event-save-target) · [Subscribe to iCal calendars](08-subscriptions.md) · [Trouble connecting calendars](11-troubleshooting.md#device-calendar-missing)
