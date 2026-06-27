---
title: Activity Center
type: Screen Specification
status: Frozen
version: 1.0

depends_on:

- foundation/DESIGN_SYSTEM.md
- foundation/THEME_TOKENS.md
- foundation/MOTION.md
- foundation/ACCESSIBILITY.md

used_components:

- components/ACTIVITY_ITEM.md
- components/MILESTONE_CARD.md
- components/EMPTY_STATE.md

react_screen:

ActivityCenterScreen.tsx
---

# Purpose

The Activity Center provides a chronological timeline of meaningful events occurring within Strivo.

It enables users to review recent activity, milestones, reminders, and habit events without functioning as a traditional notification inbox.

The Activity Center is an activity history, not a notification history.

---

# Responsibilities

The screen SHALL:

- Display chronological activity.
- Group activities by date.
- Display milestone events.
- Display reminder events.
- Display habit completion events.
- Display system events.
- Support pull-to-refresh.

The screen SHALL NOT:

- Schedule notifications.
- Calculate activity.
- Generate events.
- Modify habit data.

Business logic belongs to ActivityCenterViewModel.

---

# Entry Points

Today Screen

↓

Notification Bell

Future Deep Link

---

# Exit Points

Back Navigation

Habit Detail

Today

---

# Screen Composition

```
SafeArea

└── ScrollView

    ├── Header

    ├── Today Section

    │   ├── Section Header

    │   └── ActivityItem[]

    ├── Yesterday Section

    │   ├── Section Header

    │   └── ActivityItem[]

    ├── Earlier Section

    │   ├── Section Header

    │   └── ActivityItem[]

    ├── Milestone Card (Conditional)

    ├── Empty State (Conditional)

    └── Bottom Spacer
```

---

# Component Mapping

| UI Section | Specification | React Component |
|------------|---------------|-----------------|
| Timeline Item | components/ACTIVITY_ITEM.md | ActivityItem.tsx |
| Milestone | components/MILESTONE_CARD.md | MilestoneCard.tsx |
| Empty State | components/EMPTY_STATE.md | EmptyState.tsx |

---

# Layout Rules

Safe Area

Required

Scrollable

Vertical

Horizontal Padding

theme.spacing.screenHorizontal

Vertical Section Gap

theme.spacing.section

Activity Item Gap

theme.spacing.sm

Bottom Padding

Must clear Bottom Navigation.

---

# Header

Contains

Back Button

Screen Title

Optional Clear Action (Future)

Title

Activity Center

Subtitle

Optional

"Recent activity"

---

# Timeline Sections

Activities SHALL be grouped into:

Today

Yesterday

Earlier

Section headers remain visible even when scrolling between groups.

Groups are determined by the ViewModel.

---

# Activity Timeline

Uses

ActivityItem.tsx

Each activity represents exactly one event.

Events are displayed in reverse chronological order.

Newest event always appears first.

Timeline connector is continuous within each section.

---

# Supported Event Types

Displays

Habit Completed

Habit Missed

Reminder Triggered

Habit Created

Habit Updated

Habit Deleted

Milestone Unlocked

System Event

Future event types may be added without changing screen composition.

---

# Milestone Section

Uses

MilestoneCard.tsx

Displayed only when the latest activity includes a newly unlocked milestone.

Position

Below the corresponding timeline section.

Hidden otherwise.

---

# Empty State

Uses

EmptyState.tsx

Shown when

No activity exists.

Primary CTA

Return to Today

Secondary CTA

Hidden

---

# Pull To Refresh

Supported

Yes

Refreshes activity feed.

Existing content remains visible during refresh.

---

# Screen States

## Loading

Display

Section Skeletons

Activity Skeleton Items

---

## Ready

Display grouped activity.

---

## Empty

Display

EmptyState

Hide timeline.

---

## Refreshing

Display refresh indicator.

Keep timeline visible.

---

## Error

Display generic error state.

Retry optional.

---

# Navigation

| Interaction | Destination |
|------------|----------------|
| Back | Previous Screen |
| Activity Item | Related Screen |
| Milestone Card | Insights |
| Empty CTA | Today |

Related destinations are determined by the activity type.

---

# Data Dependencies

Provided by

ActivityCenterViewModel

Includes

- Activity Groups
- Timeline Items
- Milestone
- Loading State
- Empty State

The screen performs no calculations.

---

# Motion

Uses

foundation/MOTION.md

Screen Transition

Standard

Timeline Items

motion.list.enter

Refresh

Platform Default

Milestone

motion.milestone.enter

---

# Accessibility

Uses

foundation/ACCESSIBILITY.md

Additional Rules

Section Headers

Announced before activities.

Activity Items

Sequential reading order.

Back Button

Accessible label

"Back"

---

# Dark Mode

Uses semantic theme tokens only.

No screen-specific colors.

---

# Performance

Must

✓ Virtualize long timelines

✓ Memoize ActivityItem

✓ Preserve scroll position

✓ Incrementally render large activity lists

✓ Maintain smooth scrolling at 60 FPS

---

# Acceptance Criteria

✓ Matches approved Activity Center UI

✓ Timeline grouped correctly

✓ Reverse chronological order

✓ Responsive

✓ Accessible

✓ Token driven

✓ Dark mode verified

✓ Uses approved reusable components

✓ Business logic isolated in ViewModel

✓ No hardcoded visual values