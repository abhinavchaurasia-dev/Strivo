---
title: Habit Detail
type: Screen Specification
status: Frozen
version: 1.0

depends_on:

- foundation/DESIGN_SYSTEM.md
- foundation/THEME_TOKENS.md
- foundation/MOTION.md
- foundation/ACCESSIBILITY.md

used_components:

- HERO_MOMENTUM_CARD.md
- HEATMAP_CARD.md
- MILESTONE_CARD.md
- EMPTY_STATE.md

react_screen:

HabitDetailScreen.tsx
---

# Purpose

The Habit Detail screen provides comprehensive information about a single habit.

It allows users to review progress, understand consistency, edit habit settings, and manage the habit lifecycle.

The screen focuses on one habit only.

---

# Responsibilities

The screen SHALL:

- Display habit information.
- Display current streak.
- Display best streak.
- Display completion history.
- Display 30-day heatmap.
- Display upcoming reminder.
- Allow editing.
- Allow deletion.
- Allow today's completion.

The screen SHALL NOT:

- Calculate statistics.
- Calculate streaks.
- Query persistence.
- Schedule reminders.

Business logic belongs to HabitDetailViewModel.

---

# Entry Points

Today Screen

Insights

Notifications

Deep Link (future)

---

# Exit Points

Today

Habit Form (Edit)

Back Navigation

---

# Screen Composition

```
SafeArea

└── ScrollView

    ├── Header

    ├── Habit Summary

    ├── Statistics

    ├── Heatmap

    ├── Milestone

    ├── Reminder

    ├── Actions

    └── Bottom Spacer
```

---

# Component Order

| Order | Component |
|---------|----------------|
| 1 | Header |
| 2 | Habit Summary |
| 3 | Progress Statistics |
| 4 | Heatmap Card |
| 5 | Milestone Card |
| 6 | Reminder Information |
| 7 | Action Section |

---

# Layout Rules

Safe Area

Required

Scrollable

Vertical

Spacing

theme.spacing.section

Horizontal Padding

theme.spacing.screenHorizontal

Bottom Padding

Must avoid navigation overlap.

---

# Header

Contains

Back Button

Title

Overflow Menu

Overflow Menu

Edit Habit

Delete Habit

---

# Habit Summary

Displays

Emoji

Habit Name

Category (optional)

Current Status

Today's Completion

Today's completion button uses existing completion workflow.

---

# Statistics

Displays

Current Streak

Best Streak

Completion Rate

Total Completions

Values supplied by ViewModel.

---

# Heatmap

Uses

HEATMAP_CARD.md

Displays

Last 30 Days

No custom implementation.

---

# Milestone

Uses

MILESTONE_CARD.md

Displayed only if a milestone exists.

Otherwise hidden.

---

# Reminder

Displays

Reminder Time

Repeat Schedule

Notification Status

Read only.

Edit via Habit Form.

---

# Actions

Primary

Edit Habit

Secondary

Delete Habit

Danger actions require confirmation.

---

# Screen States

## Loading

Skeleton layout.

---

## Ready

Normal screen.

---

## Empty

Not applicable.

A habit must exist.

---

## Deleted

Return to Today.

---

## Error

Generic error state.

Retry optional.

---

# Navigation

| Interaction | Destination |
|------------|----------------|
| Back | Previous Screen |
| Edit | Habit Form |
| Delete | Confirmation Dialog |
| Confirm Delete | Today |
| Completion | Update Habit |
| Overflow | Action Menu |

---

# Data Dependencies

Provided by

HabitDetailViewModel

Includes

- Habit
- Statistics
- Heatmap
- Reminder
- Milestone
- Loading State

No calculations occur inside the screen.

---

# Motion

Uses

foundation/MOTION.md

Screen transition

Standard

Completion

Standard completion sequence

Delete

Standard destructive transition

---

# Accessibility

Uses

foundation/ACCESSIBILITY.md

Additional Rules

Back Button

Accessible label

"Back"

Overflow Menu

Accessible label

"More Options"

Delete Button

Accessible hint

"Deletes this habit permanently."

---

# Dark Mode

All visual elements use semantic theme tokens.

---

# Performance

Must

✓ Preserve scroll position

✓ Memoize statistics

✓ Memoize heatmap

✓ Avoid unnecessary re-renders

---

# Acceptance Criteria

✓ Matches approved UI

✓ Responsive

✓ Accessible

✓ Uses approved reusable components

✓ No duplicated component implementation

✓ Token driven

✓ Dark mode verified

✓ Business logic isolated in ViewModel

✓ No hardcoded visual values