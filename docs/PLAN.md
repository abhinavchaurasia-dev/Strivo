# PLAN.md

# Part 1 — Foundation & Product Blueprint

Version: 1.0

Project: Streaks - Habit Tracker

Target Platform: Android

Framework: React Native + Expo SDK 56

Architecture Style: Offline-First, Service-Oriented, Feature-Based

Goal: Top-ranked submission with production-grade architecture and modern user experience.

---

# 1. Executive Summary

## Project Objective

Build a habit tracking application that demonstrates mastery of:

- Local notifications
- Push notifications
- Deep linking
- Offline-first architecture
- SQLite persistence
- Notification lifecycle management
- Mobile UX principles

The project is intentionally designed to test understanding of:

```text
Local Notification vs Push Notification
```

and specifically whether both can share:

```text
Notification Payload

↓

Notification Response

↓

Deep Link Router

↓

Habit Detail Screen
```

This architecture will serve as the foundation of the application.

---

# 2. Product Vision

## What We Are Building

A premium modern habit tracker focused on:

- Building consistency
- Maintaining streaks
- Timely reminders
- Insightful progress tracking

The app should feel:

```text
Minimal
Modern
Fast
Reliable
Motivating
```

---

## What We Are NOT Building

Not a social network.

Not a productivity suite.

Not a task manager.

Not a gamified RPG.

Not an AI coach.

The app must remain focused on:

```text
Habits

Notifications

Consistency
```

---

# 3. Success Criteria

## Assignment Success

Achieve:

```text
Core Requirements      50/50

Push Requirements      25/25

Architecture           10/10

Writeup                15/15

Stretch Goals          Bonus
```

Target:

```text
110+/100
```

with bonus points.

---

## Product Success

Users should be able to:

- Create habits quickly
- Receive reliable reminders
- Track streaks effortlessly
- Understand progress immediately
- Never feel overwhelmed

---

## Technical Success

Architecture should support future:

```text
Authentication

Cloud Sync

Multi Device

Web App

Analytics

Premium Features
```

without major rewrites.

---

# 4. Competitive Differentiation Strategy

Most submissions will implement:

```text
Habit CRUD

Notifications

Done Button
```

and stop there.

This submission will additionally provide:

### Modern UX

- Clean design
- Spacious layout
- Smooth interactions

### Habit Insights

- Completion rate
- Best streak
- Current streak
- Daily progress

### Activity Center

- Notification activity
- Completion activity
- Milestone activity

### Heatmap

- GitHub-style completion calendar

### Quiet Hours

- Notification suppression window

### Multiple Reminder Times

- More realistic habit scheduling

### Shared Notification Pipeline

- Most important differentiator

---

# 5. Requirement Traceability Matrix

| Req | Requirement              | Implementation             |
| --- | ------------------------ | -------------------------- |
| 1   | Create Habit             | Habit Form + SQLite        |
| 2   | Persistence              | SQLite Repository          |
| 3   | Schedule on Save         | Notification Service       |
| 4   | Edit/Delete              | Reschedule Engine          |
| 5   | Mark Done + Streak       | Completion Engine          |
| 6   | Deep Link                | Shared Notification Router |
| 7   | Foreground Handler       | Notification Setup         |
| 8   | Android Channel          | Notification Bootstrap     |
| 9   | Permission Flow          | Permission Banner          |
| 10  | Push Token               | Settings Screen            |
| 11  | Push Deep Link           | Shared Router              |
| 12  | Foreground vs Background | Demo Evidence              |

---

# 6. User Personas

## Persona 1

Student

Example:

```text
Read 30 Minutes

Code 1 Hour

Drink Water
```

Needs:

- Simple reminders
- Progress visibility
- Motivation

---

## Persona 2

Working Professional

Example:

```text
Workout

Meditation

Reading
```

Needs:

- Reliable notifications
- Quiet hours
- Consistency tracking

---

## Persona 3

Productivity Enthusiast

Needs:

- Insights
- Streaks
- Completion history

---

# 7. UX Principles

## Principle 1

Action Over Navigation

Users should spend time:

```text
Completing Habits
```

not navigating screens.

---

## Principle 2

Reduce Cognitive Load

No unnecessary screens.

No excessive settings.

No feature overload.

---

## Principle 3

Information Hierarchy

Most important information first:

```text
Today's Progress

Today's Habits

Current Streak
```

---

## Principle 4

Notifications Are First-Class Citizens

Notifications are core product functionality.

They should be visible throughout the experience.

---

# 8. Navigation Architecture

## Bottom Navigation

```text
Today

Insights

Settings
```

Three tabs only.

Reason:

Modern applications favor fewer navigation destinations.

---

## Stack Screens

```text
Habit Detail

Habit Form

Activity Center
```

---

# 9. Screen Inventory

Final Screen Count:

```text
Today

Habit Detail

Habit Form

Insights

Settings

Activity Center
```

Total:

```text
6 Screens
```

---

# 10. Screen Specification — Today

## Purpose

Primary screen.

Users spend most of their time here.

---

## Header

```text
Good Morning 👋

3/5 Habits Completed Today

                       🔔
```

Bell icon opens:

```text
Activity Center
```

---

## Progress Card

```text
Today's Progress

68%
```

Visual progress bar.

---

## Permission Banner

Visible only when notifications denied.

```text
Notifications Disabled

Enable reminders to keep your streaks alive.

[Open Settings]
```

---

## Today's Habits

Habit Cards.

Example:

```text
💧 Drink Water

🔥 14 Day Streak

Next Reminder: 7 PM

[Done]
```

---

## Today's Agenda

Displays upcoming reminders.

Example:

```text
8:00 AM

💧 Drink Water

1:00 PM

💧 Drink Water

7:00 PM

📖 Read
```

---

## Quick Insights

Displays:

```text
Best Streak

Completion Rate
```

---

## Floating Action Button

```text
+
```

Creates habit.

---

## Empty State

```text
No Habits Yet

Start your first streak today.

[Create Habit]
```

---

# 11. Screen Specification — Habit Detail

## Purpose

Notification deep-link destination.

Both local and push notifications land here.

---

## Header

```text
💧 Drink Water
```

---

## Overview Card

Displays:

```text
Current Streak

Best Streak

Completion Rate
```

---

## Reminder Schedule

Example:

```text
8:00 AM

1:00 PM

7:00 PM
```

---

## Completion History

Recent completions.

Example:

```text
✓ Today

✓ Yesterday

✓ Monday

✗ Sunday
```

---

## Milestones

```text
🔥 First Week

🔥 14 Days

🔒 30 Days
```

---

## Actions

```text
Edit Habit

Delete Habit
```

---

# 12. Screen Specification — Habit Form

## Purpose

Create and Edit Habit.

Shared screen.

---

## Fields

### Habit Name

Required.

---

### Emoji

Examples:

```text
💧

📖

🏃

💻

🧘
```

---

### Frequency

Options:

```text
Daily

Specific Weekdays
```

---

### Weekday Selector

```text
M T W T F S S
```

---

### Reminder Times

Supports multiple times.

Example:

```text
08:00 AM

01:00 PM

07:00 PM
```

---

### Add Reminder

```text
+ Add Reminder
```

---

### Preview Section

Displays final schedule summary.

---

# 13. Screen Specification — Insights

## Purpose

Portfolio differentiator.

Provides visibility into habit performance.

---

## Statistics Section

Displays:

```text
Total Habits

Total Completions

Current Streak

Best Streak
```

---

## Completion Rate

Percentage-based metric.

---

## Heatmap

GitHub-style calendar.

Visualizes consistency.

---

## Milestones Section

Unlocked achievements.

---

## Empty State

```text
No Insights Yet

Complete habits to generate statistics.
```

---

# 14. Screen Specification — Settings

## Purpose

Notification and application settings.

---

## Notification Status

Displays:

```text
Granted
```

or

```text
Denied
```

---

## Open Settings

Launch system settings.

---

## Push Token Section

Displays:

```text
Expo Push Token
```

with copy button.

---

## Quiet Hours

Example:

```text
10 PM → 7 AM
```

Toggle enabled/disabled.

---

## Notification Testing

Actions:

```text
Send Test Local Notification
```

---

## App Information

Version

Build

Documentation Links

---

# 15. Screen Specification — Activity Center

## Purpose

Notification-focused activity feed.

Accessible via bell icon.

---

## Activity Types

### Reminder Activity

```text
🔔 Drink Water Reminder Fired
```

---

### Completion Activity

```text
✓ Workout Completed
```

---

### Milestone Activity

```text
🏆 14 Day Streak Unlocked
```

---

### Push Activity

```text
📣 Push Notification Received
```

---

## Grouping

Grouped by:

```text
Today

Yesterday

Earlier
```

---

## Empty State

```text
No Recent Activity
```

---

# 16. Feature Flags

Feature flags will allow optional functionality.

```ts
export const FEATURES = {
  HEATMAP: true,
  QUIET_HOURS: true,
  ACTIVITY_CENTER: true,
  SNOOZE_ACTION: true,
};
```

Purpose:

- Easier experimentation
- Cleaner development
- Future scalability

---

# 17. Product Decisions

## Included

✓ Activity Center

✓ Heatmap

✓ Milestones

✓ Quiet Hours

✓ Multiple Reminder Times

✓ Completion Analytics

✓ Shared Notification Pipeline

---

## Excluded

✗ Authentication

✗ Cloud Sync

✗ Social Features

✗ AI Coach

✗ Chat

✗ Rewards Coins

✗ Leaderboards

Reason:

No assignment value and unnecessary complexity.

---

# PLAN.md

# Part 2 — Technical Architecture Blueprint

Version: 1.0

Project: Streaks - Habit Tracker

Focus: Engineering Architecture, Database Design, Notifications, Deep Linking, Push Infrastructure

---

# 18. Architecture Principles

Every technical decision must satisfy:

### Scalability

Can grow without rewrites.

---

### Maintainability

Easy to understand.

Easy to modify.

---

### Testability

Business logic isolated.

---

### Offline-First

Core functionality must work without internet.

---

### Separation of Concerns

UI must never directly handle:

```text
Database

Notification Scheduling

Push Registration

Business Rules
```

---

# 19. Architecture Overview

```text
UI Layer

↓

Hooks Layer

↓

Store Layer

↓

Service Layer

↓

Repository Layer

↓

SQLite / Expo APIs
```

---

# 20. Layer Responsibilities

## UI Layer

Contains:

```text
Screens

Components
```

Responsibilities:

- Rendering
- User interactions
- Navigation

Must NOT:

```text
Access SQLite

Schedule Notifications

Calculate Streaks
```

---

## Hooks Layer

Purpose:

Bridge UI and Store.

Examples:

```text
useHabits()

useNotifications()

usePermissionState()
```

---

## Store Layer

Technology:

```text
Zustand
```

Responsibilities:

```text
Client State

Loading State

Error State

Cached Data
```

Must NOT:

```text
Schedule Notifications

Write SQL

Register Push Tokens
```

---

## Service Layer

Most important layer.

Contains:

```text
HabitService

NotificationService

PushService

AnalyticsService
```

Responsibilities:

```text
Business Logic

Workflows

Validation

Orchestration
```

---

## Repository Layer

Purpose:

Hide database implementation.

UI should never know whether data comes from:

```text
SQLite

API

Cloud Sync
```

---

# 21. Folder Structure

```text
src/

app/

components/

hooks/

store/

services/

repositories/

database/

lib/

constants/

types/

utils/

theme/
```

---

# 22. Final Folder Structure

```text
src/

app/

├── (tabs)/
│   ├── index.tsx
│   ├── insights.tsx
│   └── settings.tsx

├── habit/
│   └── [id].tsx

├── habit-form.tsx

├── activity-center.tsx

components/

├── HabitCard.tsx

├── ProgressCard.tsx

├── PermissionBanner.tsx

├── StatsCard.tsx

├── Heatmap.tsx

├── ActivityItem.tsx

├── MilestoneCard.tsx

hooks/

├── useHabits.ts

├── useNotifications.ts

├── useSettings.ts

store/

├── habitStore.ts

├── settingsStore.ts

services/

├── HabitService.ts

├── NotificationService.ts

├── PushService.ts

├── AnalyticsService.ts

repositories/

├── HabitRepository.ts

├── CompletionRepository.ts

├── NotificationRepository.ts

├── SettingsRepository.ts

database/

├── sqlite.ts

├── schema.ts

├── migrations.ts

lib/

notifications/

├── setup.ts

├── schedule.ts

├── permissions.ts

├── deeplink.ts

theme/

├── colors.ts

├── spacing.ts

├── typography.ts
```

---

# 23. State Management Strategy

## Why Zustand?

Compared to Redux:

### Advantages

```text
Less Boilerplate

Cleaner Code

Faster Development

Better DX
```

---

## Store Responsibilities

### habitStore

```text
Habits

Current Habit

Loading State

Error State
```

---

### settingsStore

```text
Permissions

Push Token

Quiet Hours

Theme
```

---

# 24. Database Design

Technology:

```text
Expo SQLite
```

Reason:

```text
Offline First

Structured Data

Analytics Friendly

Future Sync Ready
```

---

# 25. Database Schema

## habits

```sql
CREATE TABLE habits (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 emoji TEXT NOT NULL,

 frequency_type TEXT NOT NULL,

 frequency_data TEXT NOT NULL,

 created_at TEXT NOT NULL,

 updated_at TEXT NOT NULL
);
```

---

## Frequency Data Structure

Stored as JSON.

Example:

```json
{
  "type": "weekly",
  "weekdays": [1, 3, 5],
  "times": ["08:00", "19:00"]
}
```

Supports:

```text
Daily

Weekly

Multiple Reminder Times
```

---

## habit_completions

```sql
CREATE TABLE habit_completions (
 id TEXT PRIMARY KEY,

 habit_id TEXT NOT NULL,

 completed_at TEXT NOT NULL,

 FOREIGN KEY(habit_id)
 REFERENCES habits(id)
);
```

---

## scheduled_notifications

```sql
CREATE TABLE scheduled_notifications (
 id TEXT PRIMARY KEY,

 habit_id TEXT NOT NULL,

 notification_id TEXT NOT NULL,

 created_at TEXT NOT NULL
);
```

Purpose:

Track Expo notification IDs.

Required for:

```text
Edit Habit

Delete Habit

Cancel Notifications
```

---

## activity_log

```sql
CREATE TABLE activity_log (
 id TEXT PRIMARY KEY,

 type TEXT NOT NULL,

 title TEXT NOT NULL,

 metadata TEXT,

 created_at TEXT NOT NULL
);
```

Types:

```text
notification

completion

milestone

push
```

Used by:

```text
Activity Center
```

---

## app_settings

```sql
CREATE TABLE app_settings (
 key TEXT PRIMARY KEY,

 value TEXT NOT NULL
);
```

Stores:

```text
Quiet Hours

Push Token

Permission State

Feature Flags
```

---

# 26. Database Indexes

For performance.

```sql
CREATE INDEX idx_completion_habit
ON habit_completions(habit_id);
```

---

```sql
CREATE INDEX idx_activity_created
ON activity_log(created_at);
```

---

```sql
CREATE INDEX idx_notification_habit
ON scheduled_notifications(habit_id);
```

---

# 27. Repository Layer Design

Repositories provide:

```text
Single Source Of Database Access
```

---

## HabitRepository

Methods:

```ts
createHabit();

updateHabit();

deleteHabit();

getHabit();

getHabits();
```

---

## CompletionRepository

Methods:

```ts
recordCompletion();

getCompletions();

getCompletionRate();
```

---

## NotificationRepository

Methods:

```ts
saveNotificationIds();

getNotificationIds();

deleteNotificationIds();
```

---

## SettingsRepository

Methods:

```ts
getSetting();

setSetting();
```

---

# 28. Service Layer Design

Most important architecture decision.

---

## HabitService

Responsibilities:

```text
Habit CRUD

Streak Logic

Completion Logic

Milestones
```

---

## AnalyticsService

Responsibilities:

```text
Current Streak

Best Streak

Completion Rate

Progress Metrics
```

---

## NotificationService

Responsibilities:

```text
Schedule

Cancel

Reschedule

Deep Linking

Notification Responses
```

---

## PushService

Responsibilities:

```text
Register Push Token

Copy Token

Push Helpers
```

---

# 29. Notification Architecture

Critical section.

Assignment revolves around this.

---

# 30. Shared Notification Contract

Both local and push notifications use:

```ts
{
  screen: "/habit",
  habitId: string
}
```

No exceptions.

---

# 31. Local Notification Flow

```text
Create Habit

↓

Schedule Notification

↓

Store Notification ID

↓

Notification Fires

↓

User Taps

↓

Notification Router

↓

Habit Detail Screen
```

---

# 32. Push Notification Flow

```text
Push Arrives

↓

User Taps

↓

Notification Router

↓

Habit Detail Screen
```

Exactly same destination.

Exactly same handler.

---

# 33. Shared Notification Router

Core architecture.

```text
Notification Response

↓

Extract Payload

↓

Validate Payload

↓

Navigate

↓

Habit Detail
```

Shared by:

```text
Local

Push
```

---

# 34. Notification Scheduling Strategy

Assignment requires:

```text
Reminder Time(s)
```

Plural.

---

Example:

```text
Drink Water

8 AM

1 PM

7 PM
```

---

Scheduling Engine:

Creates:

```text
Notification A

Notification B

Notification C
```

Stores all IDs.

---

# 35. Notification Cancellation Strategy

Editing Habit:

```text
Fetch IDs

↓

Cancel IDs

↓

Create New Notifications

↓

Store New IDs
```

---

Deleting Habit:

```text
Fetch Habit IDs

↓

Cancel Habit IDs Only

↓

Delete Records
```

NEVER:

```ts
cancelAllScheduledNotificationsAsync();
```

---

# 36. Foreground Notification Handler

Required.

Setup at app startup.

```ts
Notifications.setNotificationHandler();
```

Behavior:

```text
Show Alert

Play Sound

Show Banner
```

even while app open.

---

# 37. Android Notification Channel

Channel:

```text
habit-reminders
```

Importance:

```text
HIGH
```

Created BEFORE permission request.

Reason:

Android notification configuration depends on channels.

---

# 38. Permission Architecture

Flow:

```text
App Launch

↓

Check Permission

↓

Granted?
```

---

YES

Continue.

---

NO

Display Permission Banner.

---

Button:

```ts
Linking.openSettings();
```

---

# 39. Deep Linking Architecture

Route:

```text
/habit/[id]
```

Example:

```text
/habit/habit_123
```

---

Navigation:

```ts
router.push(`/habit/${habitId}`);
```

---

# 40. Push Architecture

Push notifications require:

```text
Development Build
```

NOT Expo Go.

---

# 41. Push Registration Flow

```text
Request Permission

↓

Get Expo Push Token

↓

Store Token

↓

Display Token

↓

Copy Button
```

---

# 42. Tiny Push Server

Directory:

```text
server/

sendPush.ts
```

Uses:

```text
expo-server-sdk
```

Responsibilities:

```text
Send Push

Handle Tickets

Handle Receipts

Handle DeviceNotRegistered
```

---

# 43. Push Ticket vs Receipt

Must be understood.

### Ticket

```text
Expo accepted message.
```

NOT delivery confirmation.

---

### Receipt

```text
Delivery result.
```

Actual outcome.

---

# 44. DeviceNotRegistered

Meaning:

```text
App Removed

Token Invalid

Device Unregistered
```

Server should:

```text
Remove Token
```

---

# 45. Security & Privacy

## Data Storage

All habit data stored locally.

---

## Personal Data

None collected.

---

## Analytics

No third-party analytics SDK.

---

## Tracking

None.

---

## Push Token

Stored locally.

Never exposed publicly.

---

# 46. Future Scalability

Architecture supports future:

```text
Authentication

Cloud Sync

Web

Premium Plans

Multi Device
```

without changing UI architecture.

---

# PLAN.md

# Part 3 — Engineering, Testing, Performance, Evaluation & Delivery Blueprint

Version: 1.0

Project: Streaks - Habit Tracker

Focus: Engineering Excellence, Testing, Performance, Evaluation Optimization, Delivery Strategy

---

# 47. Engineering Philosophy

This project should feel like:

```text
A production application
```

not:

```text
A coding assignment
```

Every engineering decision should prioritize:

### Reliability

### Simplicity

### Scalability

### Maintainability

### Testability

---

# 48. Component Architecture

## Design Principles

Components must be:

### Reusable

### Stateless where possible

### Focused on a single responsibility

### Easy to test

---

# 49. Core Components

## HabitCard

Purpose:

Display habit summary.

---

Displays:

```text
Emoji

Name

Current Streak

Next Reminder

Done Button
```

---

Actions:

```text
Open Habit

Mark Done
```

---

# 50. ProgressCard

Purpose:

Today's progress overview.

---

Displays:

```text
Completed Habits

Remaining Habits

Progress Percentage
```

---

# 51. PermissionBanner

Purpose:

Notification recovery flow.

---

Displays:

```text
Notifications Disabled

Enable notifications to keep your streak alive.
```

---

Actions:

```text
Open Settings
```

---

# 52. StatsCard

Purpose:

Analytics visualization.

---

Displays:

```text
Best Streak

Current Streak

Completion Rate
```

---

# 53. Heatmap Component

Purpose:

Consistency visualization.

---

Displays:

```text
Daily Completion Activity
```

---

Style:

GitHub-inspired.

---

# 54. ActivityItem

Purpose:

Render activity center entries.

---

Types:

```text
Notification

Completion

Milestone

Push
```

---

# 55. MilestoneCard

Purpose:

Display achievement milestones.

---

States:

```text
Unlocked

Locked
```

---

# 56. Component Reusability Matrix

| Component        | Reusable |
| ---------------- | -------- |
| HabitCard        | Yes      |
| ProgressCard     | Yes      |
| PermissionBanner | Yes      |
| StatsCard        | Yes      |
| Heatmap          | Yes      |
| ActivityItem     | Yes      |
| MilestoneCard    | Yes      |

---

# 57. Design System

The application must look modern and premium.

---

# 58. Typography Scale

### Display

Used for:

```text
Main headings
```

---

### Heading

Used for:

```text
Screen titles
```

---

### Body

Used for:

```text
Normal text
```

---

### Caption

Used for:

```text
Metadata

Timestamps
```

---

# 59. Spacing Scale

Use a consistent spacing system.

Example:

```text
4

8

12

16

24

32
```

No arbitrary spacing.

---

# 60. Border Radius System

Use consistent radius.

Example:

```text
12

16

24
```

Modern UI.

---

# 61. Color System

Primary Accent

Neutral Background

Surface Cards

Success

Warning

Error

---

# 62. Theme Support

Prepare architecture for:

```text
Light Theme

Dark Theme
```

even if only one theme launches initially.

---

# 63. Animation Strategy

Library:

```text
React Native Reanimated
```

---

Animations:

### Habit Completion

### Progress Updates

### Card Press

### Screen Transitions

---

Avoid excessive animations.

---

# 64. Haptic Feedback

Library:

```text
expo-haptics
```

Use for:

### Mark Done

### Milestone Unlock

### Successful Habit Creation

---

# 65. Error Handling Philosophy

Errors should never crash the application.

---

# 66. SQLite Failure

Example:

```text
Database Unavailable
```

Behavior:

```text
Show Error

Retry Option
```

---

# 67. Notification Scheduling Failure

Example:

```text
Failed To Schedule
```

Behavior:

```text
Toast

Retry
```

---

# 68. Permission Failure

Behavior:

```text
Show Banner

Open Settings
```

---

# 69. Invalid Deep Link

Behavior:

```text
Fallback To Home Screen
```

---

# 70. Push Registration Failure

Behavior:

```text
Show Error

Retry Registration
```

---

# 71. Error Boundaries

Implement global error boundaries.

Purpose:

Prevent application crashes.

---

# 72. Performance Philosophy

Application should feel instant.

---

# 73. Database Optimization

Indexes already defined.

Queries should:

```text
Use Indexed Columns
```

where possible.

---

# 74. Streak Calculation Optimization

Avoid recalculating entire history repeatedly.

Use memoized analytics.

---

# 75. React Optimization

Use:

```text
useMemo

useCallback

Memoized Components
```

only when beneficial.

Avoid premature optimization.

---

# 76. Rendering Strategy

Lists:

```text
FlatList
```

not ScrollView for large datasets.

---

# 77. Lazy Loading

Load screens only when needed.

Benefits:

```text
Faster Startup

Lower Memory Usage
```

---

# 78. Battery Optimization

Avoid:

```text
Background Polling
```

Entirely notification-driven.

---

# 79. Accessibility

Support:

### Screen Readers

### Large Text

### Accessible Labels

### Touch Targets

---

# 80. Testing Strategy

Three levels.

---

## Unit Testing

Test:

### Habit Logic

### Analytics

### Streak Calculation

### Notification Parsing

---

# 81. Integration Testing

Test:

### Habit Creation

### Habit Editing

### Habit Deletion

### Notification Scheduling

### Notification Cancellation

---

# 82. Manual Testing

Test all assignment flows.

---

# 83. Testing Matrix

## Habit Creation

Expected:

```text
Habit Saved

Notifications Scheduled
```

---

## Habit Editing

Expected:

```text
Old Notifications Removed

New Notifications Scheduled
```

---

## Habit Deletion

Expected:

```text
Only Habit Notifications Removed
```

---

## Mark Done

Expected:

```text
Completion Stored

Streak Updated
```

---

## Local Notification Tap

Expected:

```text
Navigate To Habit Detail
```

---

## Push Notification Tap

Expected:

```text
Navigate To Same Habit Detail
```

---

## Permission Denied

Expected:

```text
Banner Visible
```

---

## Quiet Hours

Expected:

```text
Notification Suppressed
```

---

## Activity Center

Expected:

```text
Events Logged
```

---

# 84. Edge Cases

## Duplicate Completion

Prevent duplicate entries.

---

## Deleted Habit Notification

Ignore safely.

---

## Invalid Notification Payload

Fail gracefully.

---

## Timezone Changes

Recalculate schedules.

---

## Device Restart

Verify scheduled notifications persist.

---

## Empty Database

Show empty states.

---

## Push Token Expired

Handle re-registration.

---

# 85. Auto-Fail Prevention Checklist

Never use:

```ts
cancelAllScheduledNotificationsAsync();
```

---

Always:

```ts
cancelScheduledNotificationAsync(id);
```

---

Always:

```ts
setNotificationHandler();
```

---

Never:

```text
Send Push From Mobile App
```

---

Always:

```text
Send Push From Server
```

---

Never:

Separate local and push handlers.

---

Always:

Shared notification router.

---

# 86. AI Evaluation Optimization

The AI evaluator will likely reward:

### Clear Architecture

### Separation Of Concerns

### Scalability

### Error Handling

### Documentation

### Type Safety

### Consistent Folder Structure

---

# 87. Manual Evaluation Optimization

The evaluator should notice:

Within 60 seconds:

```text
Progress

Habits

Streaks

Notifications

Insights
```

without searching.

---

# 88. Evidence Collection Plan

Required evidence:

---

## Evidence A

Local reminder fires.

---

## Evidence B

Tap local reminder.

Navigate to habit.

---

## Evidence C

Push notification received.

---

## Evidence D

Tap push notification.

Navigate to same habit.

---

## Evidence E

Foreground notification.

---

## Evidence F

Background notification.

---

# 89. Screen Recording Script

Recommended demo sequence:

```text
Create Habit

↓

Schedule Reminder

↓

Notification Fires

↓

Tap Notification

↓

Open Habit Detail

↓

Receive Push

↓

Tap Push

↓

Open Same Habit

↓

Show Insights

↓

Show Settings
```

Duration:

```text
2–3 Minutes
```

---

# 90. Writeup Strategy

Writeup must answer:

### Local vs Push

### Ticket vs Receipt

### DeviceNotRegistered

### Android Channel Timing

### Expo Go Limitations

---

Use diagrams.

Not paragraphs only.

---

# 91. Viva Preparation

Potential Questions:

---

Why SQLite instead of AsyncStorage?

---

Why Zustand instead of Redux?

---

Why Expo Router?

---

Why Service Layer?

---

Why Shared Notification Pipeline?

---

How would you support cloud sync?

---

Why create channel before permissions?

---

Difference between local and push notifications?

---

Ticket vs Receipt?

---

What is DeviceNotRegistered?

---

# 92. Implementation Roadmap

## Phase 1

Project Setup

Theme

Navigation

SQLite

---

## Phase 2

Database

Repositories

Services

---

## Phase 3

Habit CRUD

Forms

Validation

---

## Phase 4

Local Notifications

Channels

Permissions

---

## Phase 5

Deep Linking

Notification Router

Activity Logging

---

## Phase 6

Streak Logic

Analytics

Insights

Heatmap

---

## Phase 7

Push Notifications

Push Token

Tiny Server

---

## Phase 8

Quiet Hours

Snooze

Badge Count

---

## Phase 9

Testing

Documentation

Evidence

Writeup

---

# 93. Definition of Done

Project is complete only if:

### All Core Requirements Pass

### All Push Requirements Pass

### No Auto-Fail Conditions Exist

### Documentation Complete

### Evidence Recorded

### Architecture Defensible

### Notifications Fully Functional

### Deep Linking Shared Between Push and Local

---

# 94. Future Roadmap (Post-Assignment)

Potential future features:

### Authentication

### Cloud Sync

### Multi Device

### Web Version

### Wearables

### Advanced Analytics

### Team Habits

### AI Recommendations

These are intentionally excluded from the assignment implementation.

---

# 95. Final Architectural Statement

The application will be built as a modern offline-first habit tracking platform where local notifications and push notifications are treated as separate notification sources feeding into a single shared notification routing system.

This architecture maximizes assignment score, supports future scalability, demonstrates strong engineering practices, and produces a portfolio-quality application suitable for technical interviews, code reviews, and real-world product evolution.

# Engineering Blueprint Complete

# FINAL PLAN.md ADDENDUM

# Architecture Audit Changes (Source of Truth)

This document supersedes any conflicting decisions from Parts 1–3.

---

# 1. Final Navigation

Bottom Tabs:

Today

Insights

Settings

---

Stack Screens:

Habit Detail

Habit Form

Activity Center

---

Total Screens:

6

---

# 2. Activity Center

Purpose:

Activity feed for the entire application.

Not a notification history screen.

---

Displays:

Notifications

Completions

Milestones

Push Events

---

Grouping:

Today

Yesterday

Earlier

---

Access:

Bell Icon

Top-right corner of Today screen.

---

# 3. Heatmap Scope

Heatmap is retained.

Implementation:

Last 30 Days Only

---

Reason:

High visual value.

Low implementation complexity.

Avoids unnecessary calendar complexity.

---

# 4. Milestone System

Fixed milestones.

Implementation:

3 Days

7 Days

14 Days

30 Days

50 Days

100 Days

---

Milestone State:

Unlocked

Locked

---

# 5. Streak Strategy

Current Streak:

Derived from completion history.

Never manually incremented.

---

Best Streak:

Persisted in database.

Field:

best_streak INTEGER

---

Reason:

Efficient analytics.

Lower computational cost.

---

# 6. Habit Completion Constraints

Prevent duplicate completion records.

Database must enforce:

One Completion

Per Habit

Per Day

---

Recommended Constraint:

UNIQUE(habit_id, completion_date)

---

# 7. Notification Table Enhancement

scheduled_notifications

Additional Field:

type TEXT

---

Values:

REMINDER

SNOOZE

---

Purpose:

Support future notification actions.

Improve extensibility.

---

# 8. Frequency Data Structure

Canonical format:

{
"frequency": "weekly",
"weekdays": [1,3,5],
"times": [
"08:00",
"19:00"
]
}

---

Supports:

Daily

Weekly

Multiple Reminder Times

---

# 9. Insights Enhancements

Add:

Consistency Score

---

Formula:

Completed Days

÷

Expected Days

×

100

---

Insights Screen Displays:

Current Streak

Best Streak

Completion Rate

Consistency Score

Heatmap

Milestones

---

# 10. Habit Ordering

Default Sort:

Due Soonest First

---

Secondary Sort:

Highest Streak

---

Reason:

Most actionable habits should appear first.

---

# 11. Loading States

Replace:

Loading...

---

With:

Skeleton Cards

Skeleton Statistics

Skeleton Habit Rows

---

Purpose:

Premium user experience.

---

# 12. Emoji Strategy

Retain Emoji-Only System.

No Icon Library Based Habit Selection.

---

Reason:

Simpler

Cleaner

Matches assignment

Lower complexity

---

# 13. Feature Flags

Remove feature flag system.

---

Reason:

Unnecessary complexity for assignment scope.

---

# 14. Database Schema Updates

habits table additions:

best_streak INTEGER DEFAULT 0

---

habit_completions additions:

completion_date TEXT NOT NULL

UNIQUE(habit_id, completion_date)

---

scheduled_notifications additions:

type TEXT NOT NULL

---

# 15. Final Included Features

Core:

Habit CRUD

SQLite Persistence

Local Notifications

Push Notifications

Shared Notification Pipeline

Deep Linking

Foreground Handler

Permission Recovery

Android Channels

---

Analytics:

Current Streak

Best Streak

Completion Rate

Consistency Score

Heatmap

Milestones

---

Product Features:

Activity Center

Today's Agenda

Quiet Hours

Multiple Reminder Times

Push Token Copy

Notification Testing

---

Stretch:

Snooze

Tiny Push Server

Badge Count

Image Push (optional)

---

# 16. Final Excluded Features

Authentication

Cloud Sync

Social Features

Leaderboards

AI Coach

Chat

Archive Habit

Search

Rewards System

Coins

Levels

---

# 17. Final Architectural Statement

The application will be implemented as an offline-first habit tracking platform using SQLite, Zustand, Expo Notifications, and Expo Router.

Local notifications and push notifications will share the same payload contract, notification response handling logic, deep-link router, and destination screens.

This shared notification architecture is the core differentiator of the project and serves as the primary demonstration of notification lifecycle understanding.

# ADDITIONAL FINAL AUDIT MODIFICATIONS

These entries should be appended to the existing FINAL PLAN.md ADDENDUM.

---

# 18. Next Due Date Strategy

Do NOT store:

next_due_at

inside SQLite.

---

Reason:

next_due_at is derived data.

It depends on:

Frequency

Reminder Times

Current Time

Timezone

Quiet Hours

---

Persisting it creates synchronization problems.

---

Implementation:

Add service methods:

HabitService.calculateNextDueAt()

HabitService.getUpcomingHabits()

---

UI receives:

nextDueAt

as computed ViewModel data.

---

Purpose:

Keeps database normalized.

Reduces maintenance complexity.

Avoids stale schedule bugs.

---

# 19. Habit ViewModel Layer

Introduce a ViewModel transformation layer.

---

Database Habit:

Raw persistence model.

---

HabitViewModel:

UI-ready model.

---

Example:

{
id,
name,
emoji,

currentStreak,

bestStreak,

completionRate,

nextDueAt,

consistencyScore
}

---

Purpose:

Keep UI independent from database structure.

Improve maintainability.

Prepare for future sync architecture.

---

# 20. Today's Agenda Source

Today's Agenda must NOT rely on notification tables.

---

Agenda is derived from:

Habit Frequency

Reminder Times

Current Date

---

Reason:

scheduled_notifications only stores Expo notification identifiers.

It should not become a scheduling source of truth.

---

Source of Truth:

frequency_data

---

# 21. Final Database Responsibility Rules

habits

Stores:

Habit Definitions

Best Streak

Frequency Configuration

---

habit_completions

Stores:

Completion History

---

scheduled_notifications

Stores:

Expo Notification IDs

Notification Type

---

activity_log

Stores:

Activity Center Events

---

app_settings

Stores:

Application Configuration

---

No table should store duplicated calculated analytics.

---

Analytics must be derived through:

AnalyticsService

HabitService

---

# 22. Final Service Responsibilities

HabitService

Habit CRUD

Completion Logic

Next Due Calculation

Upcoming Habits

Milestone Evaluation

---

AnalyticsService

Current Streak

Completion Rate

Consistency Score

Heatmap Data

Statistics

---

NotificationService

Schedule

Reschedule

Cancel

Deep Linking

Notification Routing

---

PushService

Push Registration

Token Management

Push Utilities

---

These service boundaries are final and should remain stable during implementation.
