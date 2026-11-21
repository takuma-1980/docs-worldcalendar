---
layout: default
title: Privacy Policy
lang: en
description: WorldCalendar's privacy policy covers events and settings, analytics, advertising, external services, and data retention and deletion.
---

# WorldCalendar Privacy Policy

Originally established: September 13, 2026

Revision draft prepared: November 21, 2026

Effective date of this revision: November 22, 2026.

> This is an unpublished draft for local review. November 22, 2026 has been designated as the effective date, but outstanding checks on retention, distributed versions, and contracts with external providers, and formal publication, remain pending.

WorldCalendar (the “App”) is provided by an individual developer using the developer name “takuborn” on Google Play. This policy explains information handled by the App, processing by external services, retention and deletion, and how to contact the developer.

## 1. Information Handled by the App

The App handles events, reminders and settings, usage analytics data, advertising data, external calendar information, data eligible for OS backup, and information provided in inquiries as described separately below. The App does not provide its own account registration or login function.

### Events and Settings on Your Device

Event titles, dates and times, notes, locations, reminders, and settings entered by users are mainly stored in an on-device database (Room) and settings storage (DataStore). They are used to display and manage events, provide notifications and widgets, and support related functions. The date and time of acceptance of the Terms of Use, the terms version, language, and app version are also stored on the device.

The app source code reviewed does not contain a feature that uploads event contents to a server managed by the developer. However, the SDKs and external services described below may process information outside the device. On-device storage does not mean that these other processes do not occur.

## 2. Usage Analytics with Firebase Analytics

The App uses Google's Firebase Analytics (Google Analytics for Firebase) to understand usage and help improve features and usability. Through the SDK's standard automatic collection, information is sent to and processed by Google, depending on the circumstances. This includes events such as first launch, session start, screen views, engagement time and app updates; an app instance identifier; the app version; and device and operating system information. Connection IP addresses are also processed for purposes such as estimating approximate regions and detecting spam. For users outside the EU, the UK and Switzerland, including Japan, Google explains that raw IP addresses are discarded after use. This is separate from retention of approximate region data.

The GA4 setting for granular location and device data collection is disabled. This setting concerns details such as cities and device models; it does not disable all country- or region-level information or all usage analytics. Google signals are not used. GA4 is not linked to Google Ads, AdMob or BigQuery. Processing by the AdMob SDK itself is separate from whether GA4 is linked to AdMob.

In the GA4 account's data sharing settings, “Google products & services” and “Modeling contributions & business insights” are disabled. “Technical support” and “Recommendations for your business” are enabled, allowing Google to access data to help resolve technical issues and to access account usage, settings and related information to provide improvement recommendations. These settings are separate from processing needed for Analytics measurement and advertising-related processing by AdMob.

The latest app source code reviewed does not contain app-defined custom event logging, user ID or user property settings, or code that explicitly sends event titles, notes, event locations, or external calendar names or IDs to Analytics. This statement is limited to the app code reviewed and does not guarantee the absence of information in every automatically collected SDK event or parameter.

### Advertising Settings and Differences Between Versions

The latest source code for the next release disables Analytics advertising ID collection and the default use of Analytics data for advertising personalization. A setting to deactivate Analytics collection entirely (firebase_analytics_collection_deactivated=true) has also been added. Verification in the final build and on a device, and publication of the updated version, remain pending. These settings are separate from AdMob's own handling of advertising IDs.

The baseline source for the published version 1.0.8 (versionCode 31) does not include these two disabling settings. Checks against the distributed artifacts and applicable management settings are not complete, so this policy does not state that these settings are disabled in every distributed version.

### Stopping Collection and Retention

The latest app reviewed does not provide a screen or switch to consent to, refuse, withdraw consent to, or stop Analytics collection. Acceptance of the Terms of Use is not treated as separate consent to Analytics processing. Deleting the Android advertising ID alone does not stop collection of Analytics app instance identifiers or usage events.

If you stop using and uninstall the App, that installation will no longer send new data. Data already processed by Google is not automatically deleted. See Sections 7 and 9 for retention, deletion and contact information.

For details, see [Privacy and Security in Firebase](https://firebase.google.com/support/privacy), [Analytics data collection](https://support.google.com/analytics/answer/11593727?hl=en), and [regional IP address handling](https://support.google.com/analytics/answer/16871531?hl=en).

## 3. Advertising with Google AdMob

The App uses the Google Mobile Ads SDK to display Google AdMob banner and native ads. Google and other advertising providers may process advertising IDs, App Set IDs and other identifiers; IP addresses and approximate locations derived from them; interaction information such as ad views and taps; and diagnostics such as launch times, hang rates and energy usage. Purposes include serving ads, measuring and aggregating ad performance, managing ad frequency, and preventing fraud.

The latest source code for the next release requests non-personalized ads using `npa=1`. The baseline source for the published version 1.0.8 (versionCode 31) does not include this instruction. Not every published version necessarily requests non-personalized ads.

Non-personalized ads are not selected according to interests inferred from past behavior, but identifiers and other information may still be processed for frequency management, aggregated reporting and fraud prevention. Disabling Analytics advertising ID collection does not disable identifier processing by AdMob.

On supported Android devices, you can reset or delete the advertising ID in device settings. Available options and steps vary by OS and other conditions. This does not delete other identifiers or advertising data already retained. The latest app reviewed does not provide a separate control to refuse or withdraw from advertising-related processing.

See the [Google Mobile Ads SDK data disclosure](https://developers.google.com/admob/android/privacy/play-data-disclosure?hl=en), [explanation of non-personalized ads](https://support.google.com/admob/answer/7676680?hl=en), and [Google Privacy Policy](https://policies.google.com/privacy?hl=en).

## 4. External Calendar Integration

Based on calendar permissions granted by the user and integration settings, the App uses Android Calendar Provider, the device's calendar functionality, to read calendars and events and to save, update and delete event titles, descriptions, locations, dates and times, reminders and related information in the selected destination.

If you choose a calendar associated with an external account, such as Google Calendar, events may also be reflected in that service according to the account's synchronization settings. This processing by your selected destination and synchronization service is separate from collection of event contents on the developer's server. Check the external service's terms and privacy policy. See [Calendar Integration Help](../../helps/en/07-calendar-sync.md) for details.

## 5. External Calendar Subscriptions in ICS Format

When you subscribe to an external calendar, the App connects to the registered ICS feed URL to retrieve events. The source IP address, request URL and query parameters, update-check headers and related connection information may be transmitted to the provider or redirect destination. Providers may handle connection logs according to their own policies.

The retrieval code reviewed uses read-only GET requests and does not append the contents of local events to send them to ICS providers. Information contained in the URL itself is transmitted to the destination. Choose trusted providers and avoid carelessly sharing private subscription URLs. See [Subscription Help](../../helps/en/08-subscriptions.md).

## 6. OS Backup and Device Transfer

The App's user database containing events and related data, and some settings including terms acceptance records, are eligible for Android backup and device transfer. Depending on the OS, device, account, user settings and other conditions, they may be stored by a backup service or restored to another device. This is separate from storage on a server managed by the developer.

Backup and restoration are not guaranteed. Uninstalling the App may not delete backed-up data. See [Backup Help](../../helps/en/10-backup-migration.md) and the settings of your OS and backup service.

## 7. Data Retention and Deletion

### On-Device Data

Events and related information are retained on the device until you delete them. The App's deletion functions can remove relevant data. Clearing the App's storage or uninstalling the App can remove its app-specific local data. This is separate from deleting external calendar data, backups, or data already sent by SDKs.

### Firebase Analytics

Google Analytics distinguishes event data retention, user data retention, and resetting the retention period on new activity. When reset is enabled, activity extends the retention expiry associated with user identifiers. These settings do not apply uniformly to all standard aggregated reports or to data across all Google services.

For this App, GA4 event data retention and user data retention are both set to 2 months, and “Reset on new user activity” is enabled. Continued use therefore does not mean that all data is deleted 2 months after its initial collection. See [Google Analytics data retention](https://support.google.com/analytics/answer/7667196?hl=en).

The App has no mechanism to associate a person making an inquiry with an Analytics app instance identifier. The developer currently cannot identify the Analytics data corresponding to a requester and therefore cannot carry out individual deletion of that requester's Analytics data. Questions about deletion are accepted at the address in Section 9. The developer explains why the data cannot be identified and provides verified Google guidance and available procedures. The developer will not state that data has been deleted when completion cannot be confirmed. Deletion of local data does not guarantee deletion of data held by Google.

### AdMob

Retention and deletion of advertising data depend on the purposes, applicable contracts and policies of Google and other providers. **For this draft, the retention periods for individual data and applicable deletion request procedures remain to be confirmed.** The period for which reports can be viewed is not treated as the retention period for advertising IDs or individual interactions. The developer does not guarantee the ability to identify or delete all advertising data held by Google. Use the contact address in Section 9 and [Google's information management and deletion guidance](https://policies.google.com/privacy?hl=en).

### External Calendars and ICS Providers

Delete events held by external calendars using those services and check the results after synchronization. Disconnecting integration or uninstalling the App does not delete them. Unsubscribing from an ICS feed does not delete the provider's events or connection logs. Check each provider's retention policy and deletion procedures.

### OS Backups

Retention periods and conditions for deletion and restoration depend on the OS, backup service and other factors. Check and manage them in device and account backup settings. The developer cannot directly delete your backups.

### Inquiry Information

Email addresses, inquiry text, attachments and related information you provide are used to respond, investigate issues and handle rights requests. Avoid sending unnecessary event contents or sensitive information.

Inquiry messages, attachments and correspondence records are normally retained for 1 year after the inquiry is resolved. Once each month, inquiries older than that period are checked and deleted from both Google Groups and the mailboxes receiving or forwarding them. They are deleted no later than 1 year and 1 month after resolution. Where retention is required by law or necessary for an ongoing dispute, information is retained only to the extent and for the period needed for that purpose.

## 8. External Providers and Processing Outside Japan

Google processes information through Firebase Analytics and AdMob. The contracting entity for the free standard Google Analytics service used for the App is Google LLC; for AdMob, it is Google Asia Pacific Pte. Ltd.

For handling inquiry information that constitutes disclosure of personal data to a foreign third party, the contact process presents information before sending and checks for explicit consent. The notice and consent statement are on the contact page linked in Section 9. The compose button does not send an email automatically. Direct emails are not automatically treated as consent, and the new consent process is not applied retroactively to existing emails or used to automatically refuse rights requests.

Inquiries are received and stored using Google Groups and Gmail, free individual services provided by Google LLC. Google's Terms of Service and Privacy Policy apply to them. External calendar providers, ICS providers and OS backup providers handle information in their respective services. These processes may take place outside Japan.

Processing on the developer's instructions, including outsourced processing, is distinguished from processing for external providers' own purposes and third-party provision according to applicable contracts and actual practices. This policy does not describe all external processing as outsourcing or as involving no third-party provision.

**Items to confirm before publication: the classification of each service's provision or outsourced processing; countries of processing, storage and access; safeguards; and information or consent procedures required under Japanese law remain to be confirmed. The necessary explanations and procedures will be finalized before publication.** Posting this policy or accepting the Terms of Use does not itself obtain any separate consent that may be required.

## 9. Contact and User Rights

For questions about this policy or information handling, and requests for access, correction, deletion, suspension of use, suspension of third-party provision or other rights, contact the dedicated WorldCalendar inquiry address: [worldcalendar-app@googlegroups.com (notice and consent before sending)](/en/contact/).

For personal data held by the developer, information that must be made available to the person concerned under applicable law will also be provided without delay upon their request through the contact address above.

Requests are accepted at that address. Normally, the developer aims to acknowledge receipt and explain next steps within 7 days of receipt. This is not a deadline for completing deletion; any applicable statutory response deadline takes precedence.

Under applicable law, the developer checks identity, the relevant information and authority using the minimum information necessary, and explains procedures and results within the scope of what the developer can handle. To request deletion of inquiry records, normally contact the developer from the email address used for the original inquiry. A reply check and details such as the inquiry date are used to identify the records. Identity documents are not normally requested. If you can no longer use that email address, the developer will explain appropriate checks individually. These checks alone may not identify Analytics or advertising data.

For deletion requests concerning information managed by the developer, eligibility for deletion is assessed individually without waiting for the normal retention period in Section 7 to expire. Information managed by external providers may require procedures with those providers.

If data cannot be identified, or a request cannot be fulfilled because of a legal retention requirement or another reason, the developer explains the reason and available procedures. If Analytics or advertising data cannot be identified and deletion cannot be confirmed, the developer will not state that it has been deleted. Deleting an advertising ID or uninstalling the App is distinguished from completed deletion of data already processed by Google. Deletion of all data held by external providers is not guaranteed.

### Safeguards for Inquiry Information

Access to inquiry contents is limited to the developer. Two-step verification is enabled for the Google accounts used to manage inquiries, and the devices used for this purpose have screen locks. Inquiry information is deleted under the policy in Section 7. Questions about safeguards may also be sent to the contact address above.

## 10. Policy Changes and Revision History

This policy may be revised following changes to laws, features or information handling. The revised content and effective date will be announced on this page and in an announcement on the official website. The next app update's Google Play release notes will also provide notice. Any separately required explanation, consent or other procedure will be handled under applicable laws and service requirements.

- September 13, 2026: Policy established.
- November 22, 2026: Designated as the effective date, pending formal publication. The dedicated inquiry address is stated explicitly.
- November 21, 2026: Revision draft prepared. Explanations of Analytics, version-specific advertising settings, external integration, retention and deletion, external processing and rights requests have been organized.
