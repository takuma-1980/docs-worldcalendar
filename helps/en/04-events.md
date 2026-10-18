---
layout: default
title: Chapter 4 Adding and Editing Events
lang: en
---

# Chapter 4 Adding and Editing Events

Events can be displayed from WorldCalendar, Android device calendars, or iCal subscriptions. The changes you can make depend on where an event is stored.

<a id="event-save-target"></a>

## Where events are stored

| Action or feature | In-app (local) | Device calendar (account integration) | Public calendar (iCal subscription) |
| --- | --- | --- | --- |
| View events | Available | When integration and display are enabled | When the subscription and display are enabled |
| Save new events | Available | When integration and permissions are available and there is a writable destination | Unavailable |
| Edit or delete | Available | When sync is enabled and the calendar allows writing | Unavailable (read-only) |
| Duplicate as a separate event | Available | Available | Available |
| Categories | Available | In-app categories unavailable | In-app categories unavailable |
| Notifications | Available (up to 5) | Depends on the event's notification settings and the event notification switch for the connected calendar | Notifications cannot be added to subscribed events |
| Update information | Saved within the app | Synced with the device calendar | Fetched again from the public calendar (updates after adding require account integration) |

### Differences between destinations

- **In-app events (local)**: Stored in WorldCalendar. Categories, notifications, and recurrence are available.
- **Device calendars**: Stored in calendars registered with Android. Integration and permissions are required, and only writable calendars appear as destinations.
- **Subscribed calendars**: Fetched from an iCal URL. These are read-only and cannot be edited in the app.

If <img class="button-icon" src="../../assets/icons/edit.svg" width="20" height="20" alt="Pencil"> (Edit) is missing from an existing event's details, the event may be read-only or you may not have permission to edit its calendar. For sync settings, see [Syncing Device Calendars](07-calendar-sync.md).

<a id="event-add"></a>

## Add an event

### Enter details and save

1. Tap “+” (add event) at the bottom right of the main screen. If you selected a date first, that date is filled in on the entry screen.
2. Enter a title. Set a description, location, all-day status, and start/end dates and times as needed.
3. Set recurrence and notifications as needed. Local events can also have categories.
4. When creating a new event, choose where to save it. Device calendars appear when integration is enabled and calendars are available.
5. Tap Save.

A new event's default time is the time you started creating it, rounded up to the next 30-minute interval. Available fields depend on the destination. In-app categories can only be assigned to local events. Notifications cannot be added to subscribed events. To use notifications for device calendar events, see [Notification Settings](05-recurrence-notifications.md).

### Enter dates and times

Enter start and end dates using the calendar system displayed on the entry screen. Turn on the all-day option for an all-day event. Use “‹” (previous month) and “›” (next month) in the date picker to move between months. Check that the end date and time match the intended event duration.

<a id="event-edit-copy-delete"></a>

## Edit, duplicate, or delete an event

### Edit an event

Open the event's details and tap <img class="button-icon" src="../../assets/icons/edit.svg" width="20" height="20" alt="Pencil"> (Edit). Change the fields, then tap Save. You cannot change an existing event's storage destination. Device calendar events can be edited when their calendar is writable and sync is enabled.

### Duplicate an event

In the event's details, tap <img class="button-icon" src="../../assets/icons/content-copy.svg" width="20" height="20" alt="Two overlapping sheets of paper"> (Duplicate). This is also available for read-only events. An entry screen opens for the copy, initially set up as a new in-app event. If a destination selector is available, you can change it. Check the details, date, and time, then tap Save to create a separate event from the original.

### Delete an event

Tap <img class="button-icon" src="../../assets/icons/delete.svg" width="20" height="20" alt="Trash can"> (Delete) in the event's details and follow the confirmation prompts. For a recurring event, choose whether to delete only this occurrence, this and all following occurrences, or all occurrences including past ones, then confirm the action. For recurring device calendar events, deleting only this occurrence or this and following occurrences may not be reflected by the calendar provider.

<a id="event-source-and-editing"></a>

## Event sources and editing availability

### Check an event's source

Details for a subscribed event show the subscription calendar's name. You can check a device calendar event's destination on its edit screen or in the calendar list under event management. Subscribed events are read-only.

### When you cannot edit an event

If <img class="button-icon" src="../../assets/icons/edit.svg" width="20" height="20" alt="Pencil"> (Edit) or <img class="button-icon" src="../../assets/icons/delete.svg" width="20" height="20" alt="Trash can"> (Delete) is missing from an event's details, it is either an iCal subscription event or belongs to a device calendar that does not allow writing. For device calendars, check [Sync and Permissions](07-calendar-sync.md#device-permissions).

<a id="04-section-1"></a>

## Read next

[Recurrence and Notifications](05-recurrence-notifications.md) · [Search and Categories](06-search-categories.md) · [iCal Subscriptions](08-subscriptions.md)
