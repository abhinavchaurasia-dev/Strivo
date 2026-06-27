---
title: Activity Item
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - foundation/DESIGN_SYSTEM.md
  - foundation/THEME_TOKENS.md
  - foundation/MOTION.md
  - foundation/ACCESSIBILITY.md

used_by:
  - screens/ACTIVITY_CENTER.md

react_component:
  ActivityItem.tsx
---

# Purpose

Represents a single event in the user's activity timeline.

The component communicates important events in chronological order while maintaining a clean, scannable timeline.

Business logic belongs entirely to the ViewModel.

---

# Responsibilities

The component SHALL:

- Display one activity event.
- Display event icon.
- Display event title.
- Display event description.
- Display timestamp.
- Display optional status badge.

The component SHALL NOT:

- Group activities.
- Sort activities.
- Format dates.
- Determine activity type.

---

# Dependencies

Uses

- theme.colors.*
- theme.spacing.*
- theme.radius.*
- theme.typography.*
- theme.elevation.*
- motion.list.*
- accessibility defaults

---

# Supported Activity Types

Notification

Habit Completed

Habit Missed

Milestone Unlocked

Reminder Triggered

Habit Created

Habit Updated

Habit Deleted

System Event

Future activity types may be added without changing this component.

---

# Composition

ActivityItem

├── Timeline Indicator
│   ├── Timeline Line
│   └── Event Icon
│
├── Content
│   ├── Title
│   ├── Description
│   └── Timestamp
│
└── Optional Badge

---

# Layout Rules

Container

Width

Parent Width

Minimum Height

72dp

Padding

Horizontal

spacing.xl

Vertical

spacing.md

Gap

spacing.md

Timeline Indicator Width

40dp

Icon Size

20dp

Corner Radius

None

Timeline continues seamlessly between consecutive items.

---

# Content Rules

Title

Maximum

1 line

Description

Maximum

2 lines

Timestamp

Examples

Now

5 min ago

Today • 08:45

Yesterday • 07:30

Badge

Optional

Examples

New

Completed

100 Days

Hidden if unavailable.

---

# States

## Default

Displays complete activity information.

---

## Loading

Skeleton placeholder.

---

## Read

Default appearance.

---

## Highlighted

Used immediately after a new activity is added.

Uses subtle background emphasis.

---

## Error

Not applicable.

---

# Interaction

Tap

↓

Open related destination.

Examples

Habit Detail

Insights

Activity Details

Long Press

No action.

Swipe

Not supported.

---

# Motion

Entrance

Uses

motion.list.enter

Press

Uses

motion.card.press

New Item

Subtle fade + slide.

No looping animations.

---

# Accessibility

Role

Button

Announce

Activity Type

Title

Description

Timestamp

Badge (if present)

Timeline connector is decorative.

Hidden from screen readers.

---

# Dark Mode

Uses semantic timeline tokens only.

---

# Public API

```tsx
type ActivityType =
  | "notification"
  | "completion"
  | "missed"
  | "milestone"
  | "reminder"
  | "created"
  | "updated"
  | "deleted"
  | "system";

interface ActivityItemProps {

  id: string;

  type: ActivityType;

  title: string;

  description?: string;

  timestamp: string;

  badge?: string;

  onPress?: () => void;

}
```

---

# Implementation Rules

Must

✓ Be reusable

✓ Support Dynamic Type

✓ Support dark mode

✓ Use semantic tokens

✓ Support long activity lists

✓ Maintain smooth scrolling

Must Not

✗ Format timestamps

✗ Determine navigation destination

✗ Hardcode colors

✗ Hardcode spacing

---

# Acceptance Criteria

✓ Matches approved Activity Center design

✓ Timeline alignment consistent

✓ Accessible

✓ Responsive

✓ Token driven

✓ Dark mode verified

✓ 60 FPS scrolling

✓ Reusable