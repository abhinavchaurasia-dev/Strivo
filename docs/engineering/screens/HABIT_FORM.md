---
title: Habit Form
type: Screen Specification
status: Frozen
version: 1.0

depends_on:

- foundation/DESIGN_SYSTEM.md
- foundation/THEME_TOKENS.md
- foundation/MOTION.md
- foundation/ACCESSIBILITY.md

used_components:

- components/REMINDER_CHIP.md

react_screen:

HabitFormScreen.tsx
---

# Purpose

The Habit Form is responsible for creating and editing habits.

It provides a single, consistent interface for managing all configurable habit properties.

The screen SHALL support both Create and Edit modes using the same UI.

---

# Responsibilities

The screen SHALL:

- Create a new habit.
- Edit an existing habit.
- Validate user input.
- Configure reminders.
- Configure repeat schedule.
- Configure color and icon.
- Save or cancel changes.

The screen SHALL NOT:

- Persist data directly.
- Schedule notifications.
- Calculate streaks.
- Navigate automatically after validation failures.

Business logic belongs to HabitFormViewModel.

---

# Entry Points

Today Screen (FAB)

Habit Detail (Edit)

Future Deep Link

---

# Exit Points

Today

Habit Detail

Back Navigation

---

# Screen Composition

```
SafeArea

└── ScrollView

    ├── Header

    ├── Basic Information

    ├── Icon Picker

    ├── Color Picker

    ├── Reminder Section

    ├── Repeat Schedule

    ├── Preview

    └── Bottom Spacer

Sticky Bottom Bar

├── Cancel
└── Save
```

---

# Component Mapping

| UI Section | Specification | React Component |
|------------|---------------|-----------------|
| Reminder | components/REMINDER_CHIP.md | ReminderChip.tsx |

All remaining controls are native form components.

---

# Layout Rules

Safe Area

Required

Scrollable

Vertical

Horizontal Padding

theme.spacing.screenHorizontal

Section Gap

theme.spacing.section

Sticky Bottom Bar

Always visible.

Respects keyboard.

---

# Header

Contains

Back Button

Screen Title

Optional Delete Button (Edit Mode only)

Title

Create Habit

or

Edit Habit

depending on mode.

---

# Basic Information

Fields

Habit Name *

Description (Optional)

Validation

Habit Name

Required

Maximum Length

50 characters

Description

Maximum Length

200 characters

---

# Icon Picker

Displays available icons.

Single selection.

Scrollable grid.

Selection required.

---

# Color Picker

Displays approved brand color palette.

Single selection.

Uses semantic color tokens.

No custom color input.

---

# Reminder Section

Displays

Reminder Time

Notification Toggle

Repeat Frequency

Uses

ReminderChip.tsx

Reminder scheduling handled by ViewModel.

---

# Repeat Schedule

Supported

Daily

Weekdays

Weekends

Custom Days

Selection updates preview immediately.

---

# Preview

Displays

Icon

Color

Habit Name

Reminder

Read-only.

Used to confirm appearance before saving.

---

# Sticky Bottom Bar

Primary

Save

Secondary

Cancel

Save disabled until form is valid.

---

# Validation Rules

Habit Name

Required

Reminder Time

Required only when reminders enabled.

Duplicate habit names

Rejected by ViewModel.

Validation errors displayed inline.

---

# Screen States

## Create

Empty form.

---

## Edit

Prefilled form.

---

## Saving

Disable controls.

Display loading indicator.

---

## Success

Dismiss screen.

---

## Validation Error

Highlight invalid fields.

Preserve entered values.

---

# Navigation

| Interaction | Destination |
|------------|----------------|
| Back | Previous Screen |
| Cancel | Previous Screen |
| Save | Today or Habit Detail |
| Delete | Confirmation Dialog |

---

# Data Dependencies

Provided by

HabitFormViewModel

Includes

- Existing Habit (Edit Mode)
- Available Icons
- Available Colors
- Reminder Configuration
- Validation State
- Save State

---

# Motion

Uses

foundation/MOTION.md

Screen Transition

Standard

Save

Standard success animation

Validation Error

Subtle shake animation

Keyboard

Standard system animation

---

# Accessibility

Uses

foundation/ACCESSIBILITY.md

Additional Rules

Every input

Accessible label

Every validation error

Announced automatically

Icon Picker

Accessible selection state

Color Picker

Accessible selection state

---

# Dark Mode

All controls use semantic theme tokens.

---

# Performance

Must

✓ Preserve form state

✓ Avoid unnecessary re-renders

✓ Lazy render icon grid

✓ Keyboard optimized

---

# Acceptance Criteria

✓ Matches approved UI

✓ Responsive

✓ Accessible

✓ Token driven

✓ Dark mode verified

✓ Inline validation

✓ No hardcoded visual values

✓ Business logic isolated in ViewModel