---
title: Reminder Chip
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - DESIGN_SYSTEM.md
  - THEME_TOKENS.md
  - MOTION.md
  - ACCESSIBILITY.md

used_by:
  - HABIT_CARD.md
  - HABIT_DETAIL.md

react_component:
  ReminderChip.tsx
---

# Purpose

Displays the next scheduled reminder time for a habit in a compact, glanceable format.

The Reminder Chip provides contextual information only. It does not manage scheduling logic.

---

# Responsibilities

The component SHALL:

- Display reminder time.
- Display reminder icon.
- Reflect reminder status.
- Support optional interaction.

The component SHALL NOT:

- Schedule notifications.
- Calculate reminder times.
- Manage timezone conversions.

---

# Dependencies

Uses:

- theme.colors.*
- theme.spacing.*
- theme.radius.*
- theme.typography.*
- motion.chip.*
- accessibility defaults

---

# Composition

ReminderChip

├── Clock Icon
└── Reminder Time

---

# Layout Rules

Container

- Height: 32dp
- Width: Content
- Radius: radius.pill

Padding

Horizontal

spacing.md

Vertical

spacing.xs

Gap

spacing.xs

---

# States

## Default

Reminder is active.

Example

08:00 AM

---

## Upcoming

Reminder scheduled for later today.

Uses default appearance.

---

## Expired

Reminder time has passed.

Visual emphasis reduced.

---

## Disabled

Reminder not configured.

Chip hidden unless explicitly required.

---

## Loading

Skeleton placeholder.

---

# Interaction

Optional.

Tap action may:

- Edit reminder
- Open Habit Detail

If no action exists,

render as read-only.

---

# Motion

Uses

motion.chip.enter

Press

motion.button.press

No custom animations.

---

# Accessibility

Role

Text

Label

Reminder at 8 AM

Icon

Decorative

Hidden from screen readers.

---

# Dark Mode

Uses semantic tokens only.

---

# Public API

```tsx
interface ReminderChipProps {

  time?: string;

  state?:

    | "default"
    | "upcoming"
    | "expired"
    | "disabled";

  loading?: boolean;

  onPress?: () => void;

}
```

---

# Implementation Rules

Must

✓ Auto-size to content

✓ Use semantic colors

✓ Hide when reminder unavailable

✓ Support Dynamic Type

Must Not

✗ Schedule notifications

✗ Calculate time

✗ Hardcode colors

---

# Acceptance Criteria

✓ Height matches design

✓ Radius uses pill token

✓ Uses semantic colors

✓ Dark mode verified

✓ Accessible

✓ Responsive

✓ Token driven