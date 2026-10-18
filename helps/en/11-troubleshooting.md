---
layout: default
title: Chapter 11 Troubleshooting and FAQ
lang: en
---

# Chapter 11 Troubleshooting and FAQ

Find the item closest to the issue you are experiencing. If you cannot find a screen mentioned here, update the app to the latest version, then tap <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) at the bottom of the main screen.

<a id="11-section-1"></a>

## Calendar and date display

### I cannot switch calendars

**Cause:** The calendar you want to use is disabled or unavailable in your build.

**Check:** Open <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > calendar display settings and check the relevant switch. Calendars marked as unavailable in this build cannot be selected.

**Solution:** Enable an available calendar, then switch to it using the calendar name in the upper-left corner of the main screen.

### Dates do not match another calendar

**Cause:** Calendar calculation methods, regions, time zones, and religious practices may differ.

**Check:** Confirm the displayed calendar and the method used in the relevant region or religious community.

**Solution:** See [Calendar Types and Regional Differences](02-calendars.md#calendar-limits). For important observances, confirm dates with official information from the relevant region or organization.

### Rokuyo is not displayed

**Cause:** Rokuyo display is turned off, or the current calendar does not support it.

**Check:** Under <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > event management, check the option to show Rokuyo (Gregorian and Japanese lunisolar calendars only). Also check the calendar selected on the main screen.

**Solution:** Select the “☑ / ☐” checkbox and choose the Gregorian or Japanese lunisolar calendar. See [Rokuyo Settings](02-calendars.md#rokuyo-settings).

### Public holidays are not displayed

**Cause:** A holiday calendar may not have been added, may be hidden, or may not have been fetched yet.

**Check:** In the iCal subscriptions section of event management, check that a holiday calendar is present, its “☑ / ☐” checkbox is selected, and its sync result is successful.

**Solution:** For Japanese public holidays, [add the Japanese holiday preset](08-subscriptions.md#ical-add), enable its display, and sync. Switching calendars alone does not display public holidays for every country.

### A calendar takes a long time to display

**Cause:** Display calculations for calendars such as the Japanese lunisolar or Hindu calendar may take time.

**Check:** Check whether the Japanese lunisolar or Hindu calendar is currently displayed.

**Solution:** Wait for loading to finish. If the issue continues after reopening the screen, restart the app.

<a id="11-section-2"></a>

## Events and notifications

### A saved event does not appear in the calendar

**Cause:** Its category or calendar may be hidden, a different month may be displayed, or a recurring date may not exist in that calendar or year.

**Check:** Check the event's storage location and date, then review the visibility of categories, connected calendars, and subscription calendars in event management. If the date is within the searchable period, also try [event search](06-search-categories.md#search-events).

**Solution:** Enable the relevant display and go to the event's month. Sync connected calendar events. For recurring events, also check [How Dates Are Handled in Different Calendars](05-recurrence-notifications.md).

### I cannot edit or delete an event

**Cause:** Subscription calendar events are read-only. Device calendar events also cannot be edited if integration is disabled or the calendar does not allow writing.

**Check:** Check whether <img class="button-icon" src="../../assets/icons/edit.svg" width="20" height="20" alt="Pencil"> (Edit) appears in the event details. For device calendar events, also check the account integration list in event management.

**Solution:** For device calendars, see [Permissions and Editing Requirements](07-calendar-sync.md#device-permissions). You can save a subscription event as a separate event using <img class="button-icon" src="../../assets/icons/content-copy.svg" width="20" height="20" alt="Two overlapping sheets of paper"> (Duplicate).

### An event does not appear in search results

**Cause:** Search covers the two years before and after the current date and time. Events in disabled device calendars or subscription calendars are also excluded.

**Check:** Check that the date is within two years before or after the current date and that the relevant device or subscription calendar is enabled. Search includes titles, descriptions, category names, and dates.

**Solution:** Search again using words found in those fields.

<a id="notification-missing"></a>

### Notifications do not arrive

**Cause:** Android notification permission may be turned off, a local event may have no notification time, device calendar notifications may be disabled in the app, or device power-saving settings may interfere.

**Check:** In Android settings, check that WorldCalendar is allowed to send notifications and that the local event has a notification time. For device calendar events, also check event notifications under <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > event management > account integration.

**Solution:** Allow notifications, then set a notification time for the local event or turn on event notifications for device calendar events. If notifications are also enabled in the device calendar, you may receive duplicates; adjust the notification settings on either side. Also check your device's power-saving settings. Notifications may be delayed depending on the device's state.

### Notifications arrive twice

**Cause:** WorldCalendar and another calendar app may both be sending notifications for the same connected event.

**Check:** Check the app name shown on each notification and the event notification setting under account integration in event management.

**Solution:** If you do not need WorldCalendar notifications for connected events, turn that switch off. To stop notifications from another app, adjust that app's notification settings.

<a id="device-calendar-missing"></a>

## Device calendars do not appear

### The list or events for Google Calendar or another calendar remain empty

**Cause:** Either read or write calendar permission may be missing, Android may have no available calendars, the relevant calendar may be disabled, or sync may not have finished.

**Check:** In Android app permissions, check that both read and write calendar access are allowed, then check the connection state and the relevant calendar's “☑ / ☐” checkbox.

**Solution:** Allow both read and write access, enable integration, turn on the relevant calendar, then sync manually. If a sync was completed recently, wait a little before trying again.

### I cannot save to a device calendar

**Cause:** Write permission is missing, or no writable calendar is available.

**Check:** Check Android calendar permissions and whether a writable calendar exists on the device.

**Solution:** Grant permission or set up a writable calendar on the device. If none is available, choose a local storage location.

<a id="ical-load-error"></a>

## An iCal calendar cannot be loaded

### I cannot save the URL

**Cause:** The URL may not use HTTPS, may already be registered, or may have a host or port that does not meet the requirements.

**Check:** Check that the URL is the provider's ICS subscription URL and has not already been added.

**Solution:** Enter an HTTPS or `webcal://` subscription URL. Use a public URL on a standard port, without login credentials in the URL.

### The URL was saved, but no events appear

**Cause:** The URL may not be public, the server may not be responding, the ICS format may be unreadable, or the subscription may be disabled.

**Check:** Check that the subscription calendar is enabled, review its latest sync status, confirm that the URL is still valid, and check that account integration is enabled.

**Solution:** If account integration is disabled, [start integration](07-calendar-sync.md#device-connect), then use <img class="button-icon" src="../../assets/icons/sync.svg" width="20" height="20" alt="Two arrows forming a circle"> (Sync) in the upper-right corner of event management. If an update has just occurred, wait a little before trying again.

### A subscription calendar was added successfully but no longer updates

**Cause:** When account integration is disabled, neither manual nor automatic sync runs, including iCal sync. The initial fetch still runs when a subscription is added, so events may appear immediately after adding it while later changes are not reflected.

**Check:** In event management, check that account integration is enabled.

**Solution:** [Start account integration](07-calendar-sync.md#device-connect), allow both read and write calendar access, then sync. If updates still fail with integration enabled, also check your network connection and [sync intervals](08-subscriptions.md#ical-sync).

<a id="widget-not-updated"></a>

## The widget does not update

### The displayed date is out of date

**Cause:** Your home screen app or Android power-saving features may be delaying updates.

**Check:** Check the device time and time zone, and any power-saving restrictions on the home screen app.

**Solution:** Tap <img class="button-icon" src="../../assets/icons/widget-settings.svg" width="20" height="20" alt="Gear"> (Settings) in the upper-right corner of the widget, then tap Save. If this does not help, remove the widget from the home screen and add it again.

<a id="migration-missing-data"></a>

## Events are missing after transferring devices

### Check data restoration

**Cause:** Possible causes include data excluded from Android backup, data that the device manufacturer or operating system did not transfer, or device events whose account has not yet synced.

**Check:** Check that Android restoration has completed and that device calendars are syncing with the same account.

**Solution:** Set up device calendar permissions and integration again, then sync iCal subscriptions again. See [Backup and Changing Devices](10-backup-migration.md) for details.

<a id="11-section-3"></a>

## Related pages

[Creating and Editing Events](04-events.md) · [Syncing with Device Calendars](07-calendar-sync.md) · [iCal Calendars](08-subscriptions.md) · [Backup and Changing Devices](10-backup-migration.md)
