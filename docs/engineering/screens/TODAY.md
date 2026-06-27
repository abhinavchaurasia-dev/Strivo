---
title: Today Screen
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
- PROGRESS_CARD.md
- HABIT_CARD.md
- REMINDER_CHIP.md
- EMPTY_STATE.md

react_screen:

TodayScreen.tsx
---

# Purpose

The Today screen is the primary entry point of Strivo.

Its purpose is to answer three questions immediately:

1. How am I doing?
2. What should I do next?
3. What progress have I made today?

The screen should encourage action within the first few seconds.

---

# Responsibilities

The screen SHALL:

- Display today's progress.
- Display today's scheduled habits.
- Allow habit completion.
- Provide quick access to notifications.
- Provide entry to Habit Detail.
- Provide entry to Habit Creation.

The screen SHALL NOT:

- Calculate streaks.
- Calculate completion percentages.
- Query the database directly.
- Manage business logic.

Business logic belongs to TodayViewModel.

---

# Entry Points

App Launch

↓

Bottom Navigation

↓

Back Navigation

---

# Exit Points

Habit Detail

Habit Form

Activity Center

Insights (optional)

---

# Screen Composition

```
SafeArea

└── ScrollView

    ├── Header

    ├── HeroMomentumCard

    ├── ProgressCard

    ├── SectionHeader

    ├── HabitCard[]

    ├── EmptyState (when no habits)

    └── Bottom Spacer

FloatingActionButton

BottomNavigation
```

---

# Component Order

| Order | Component |
|---------|----------------------|
| 1 | Header |
| 2 | HeroMomentumCard |
| 3 | ProgressCard |
| 4 | Today's Agenda Header |
| 5 | HabitCard List |
| 6 | EmptyState (conditional) |
| 7 | FAB |
| 8 | Bottom Navigation |

---

# Layout Rules

Safe Area

Top

Required

Horizontal Padding

theme.spacing.screenHorizontal

Vertical Gap

theme.spacing.section

Bottom Padding

Must ensure FAB never overlaps content.

---

# Header

Contains

Greeting

Current Date

Notification Button

Notification button opens

Activity Center.

Uses

AppHeader component.

---

# Hero Section

Uses

HERO_MOMENTUM_CARD.md

Rules

- Always first content section.
- Never hidden.
- Receives streak data from ViewModel.

---

# Progress Section

Uses

PROGRESS_CARD.md

Rules

- Display immediately below Hero.
- Hidden only during fatal error state.

---

# Today's Agenda

Contains

HabitCard list.

Ordering

1.

Overdue

2.

Scheduled

3.

Completed

Within each group

Sort by reminder time.

---

# Habit Cards

Uses

HABIT_CARD.md

Reminder

Uses

REMINDER_CHIP.md

Tap

↓

Habit Detail

Completion Button

↓

Complete Habit

Long Press

Reserved for future bulk actions.

---

# Empty State

Uses

EMPTY_STATE.md

Shown when

No habits exist.

Primary CTA

Create Habit

Secondary CTA

Hidden.

---

# Floating Action Button

Purpose

Create Habit

Position

Bottom Right

Persistent

Visible while scrolling.

Uses

Primary FAB component.

---

# Bottom Navigation

Tabs

Today

Insights

Settings

Today is always active.

---

# Screen States

## Loading

Display

Hero skeleton

Progress skeleton

Habit skeleton list

No EmptyState.

---

## Ready

Normal screen.

---

## Empty

Display

Hero

Progress

EmptyState

Hide Habit List.

---

## Refreshing

Triggered by pull-to-refresh.

Maintain existing content.

Show refresh indicator only.

---

## Error

Display generic screen error.

Retry action optional.

---

# Navigation

| Interaction | Destination |
|------------|----------------|
| Notification | Activity Center |
| Hero | None |
| Progress | Insights (optional) |
| Habit Card | Habit Detail |
| FAB | Habit Form |
| Bottom Navigation | Selected Screen |

---

# Data Dependencies

Provided by

TodayViewModel

Includes

- Greeting
- Date
- Current Streak
- Completion Percentage
- Today's Habits
- Loading State
- Empty State

The screen performs no calculations.

---

# Motion

Uses

foundation/MOTION.md

Screen

Standard screen transition.

Cards

Enter using card motion.

Habit completion

Uses completion timeline.

FAB

Standard press animation.

---

# Accessibility

Uses

foundation/ACCESSIBILITY.md

Additional Rules

Header

Announce greeting.

Habit list

Accessible sequentially.

FAB

Label

"Create Habit"

Notification

Label

"Open Activity Center"

---

# Dark Mode

All components inherit semantic theme tokens.

No screen-specific colors.

---

# Performance

Must

✓ Virtualize long habit lists.

✓ Memoize Habit Cards.

✓ Avoid unnecessary screen re-renders.

✓ Preserve scroll position.

---

# Acceptance Criteria

✓ Matches approved Today UI

✓ Uses only approved components

✓ No duplicated component implementation

✓ Responsive

✓ Accessible

✓ Dark mode verified

✓ Token driven

✓ 60 FPS scrolling

✓ No hardcoded visual values

✓ Business logic isolated in ViewModel