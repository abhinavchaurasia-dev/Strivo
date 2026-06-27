---
title: Progress Card
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - DESIGN_SYSTEM.md
  - THEME_TOKENS.md
  - MOTION.md
  - ACCESSIBILITY.md

used_by:
  - TODAY.md
  - INSIGHTS.md

react_component:
  ProgressCard.tsx
---

# Purpose

Displays the user's current progress for today at a glance.

The component provides immediate feedback about daily completion and current consistency without requiring navigation.

---

# Responsibilities

The component SHALL:

- Display today's completion percentage.
- Display completed vs total habits.
- Display current streak.
- Optionally display best streak.
- Optionally display progress trend.

The component SHALL NOT:

- Calculate progress.
- Fetch data.
- Manage navigation.

Business logic belongs to the ViewModel.

---

# Dependencies

Uses:

- theme.colors.*
- theme.spacing.*
- theme.radius.*
- theme.typography.*
- theme.elevation.*
- motion.card.*
- accessibility defaults

---

# Composition

ProgressCard

├── Progress Summary
│   ├── Completion %
│   └── Completed / Total
│
├── Divider
│
├── Statistics
│   ├── Current Streak
│   └── Best Streak
│
└── Optional Trend Indicator

---

# Layout Rules

Container

- Width: Parent width
- Height: Content driven
- Minimum Height: 96dp

Padding

- Horizontal: spacing.xl
- Vertical: spacing.lg

Corner Radius

- radius.xl

Elevation

- elevation.sm

Spacing

- Internal gap: spacing.md

---

# Content Rules

Completion

Examples:

0%

43%

100%

Completed Count

Examples:

0 / 6

4 / 8

7 / 7

Statistics

Current Streak

Best Streak

Trend

Optional.

Hidden if unavailable.

---

# States

## Loading

- Skeleton placeholders
- No animation loops

---

## Default

Displays all available values.

---

## Empty

Shown when:

No habits exist.

Display:

"Create your first habit."

---

## Error

Display generic error state.

No retry button inside component.

---

# Interaction

Entire card:

Optional tap.

If enabled:

Navigate to Insights.

Otherwise:

Read-only.

---

# Motion

Uses:

motion.card.enter

Pressed:

motion.card.press

No custom motion.

---

# Accessibility

Container

Role:

Summary

Labels

Completion Percentage

Current Streak

Best Streak

All values must be announced.

---

# Dark Mode

Uses semantic tokens only.

No hardcoded colors.

---

# Public API

```tsx
interface ProgressCardProps {

  completionPercentage: number;

  completedHabits: number;

  totalHabits: number;

  currentStreak: number;

  bestStreak?: number;

  trend?: "up" | "down" | "neutral";

  loading?: boolean;

  onPress?: () => void;

}
```

---

# Implementation Rules

Must

✓ Use semantic theme tokens

✓ Support Dynamic Type

✓ Support dark mode

✓ Respect reduced motion

✓ Memoize component

Must Not

✗ Calculate completion

✗ Read database

✗ Hardcode colors

✗ Hardcode spacing

---

# Acceptance Criteria

✓ Matches approved UI

✓ Responsive

✓ Accessible

✓ Token-driven

✓ Dark mode verified

✓ No hardcoded values

✓ Reusable across screens