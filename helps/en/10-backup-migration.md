---
layout: default
title: Chapter 10 Backup and Changing Devices
lang: en
---

# Chapter 10 Backup and Changing Devices

WorldCalendar user data may be included in Android's backup and device transfer features. Whether backup and restoration actually take place depends on factors such as the Android version, device manufacturer, Google account, and device backup settings. The app alone cannot guarantee restoration.

<a id="10-section-1"></a>

## Data included in backups

### Data that can be saved

Data eligible for Android backup includes events stored in the app, notification settings, recurrence exceptions, categories, calendar settings, subscription calendar registrations, and some user preferences. When Android automatic backup or device-to-device transfer is enabled, this data may be saved through the operating system.

### Data excluded from backups

Device calendar connections and permissions, calendar list selections, downloaded events, event data fetched from subscription calendars, sync state, device-specific notification schedules, and widget placement and display settings are excluded. However, the device sync on/off preference, device calendar notification preferences, theme, and calendar display preferences may be included as user settings. After restoration, check the actual connection state and reconnect or sync as needed.

<a id="10-section-2"></a>

## Check before and after changing devices

### Before transferring

1. In Android settings, check that Google backup or device data transfer is enabled.
2. Update WorldCalendar to the latest version and confirm that the device backup has completed.
3. Review the important events you need after the transfer for each storage location: local, device calendar, and subscription calendar.

Device calendar events are managed through Android accounts, so also check the sync and transfer status of those accounts. Subscription events are retrieved by syncing the feeds again on the new device. See [Android Auto Backup](https://developer.android.com/identity/data/autobackup) for backup conditions.

### After transferring

1. Use the same Google account on the new device and complete Android's restoration process.
2. Open WorldCalendar and check that your events and settings have been restored.
3. Allow both read and write access to Android calendars, then connect device calendars from <img class="button-icon" src="../../assets/icons/settings.svg" width="20" height="20" alt="Gear"> (Settings) > event management.
4. Account integration must also be enabled to update subscription calendars. Check the connection state and subscription registrations, then tap <img class="button-icon" src="../../assets/icons/sync.svg" width="20" height="20" alt="Two arrows forming a circle"> (Sync) in the upper-right corner of event management.
5. Set up notification permissions and home screen widgets again.

<a id="10-section-3"></a>

## If events are missing after restoration

Events or settings may not be restored if the operating system or device manufacturer did not perform a backup, if the backed-up app version differs from the current version, or for other reasons. Before uninstalling the app or clearing its data, confirm that the information you need is included in the Android backup. WorldCalendar does not have an in-app bulk export/import feature.

<a id="10-section-4"></a>

## Read next

[Syncing with Device Calendars](07-calendar-sync.md) · [Subscription Calendars](08-subscriptions.md) · [When Data Is Missing](11-troubleshooting.md#migration-missing-data)
