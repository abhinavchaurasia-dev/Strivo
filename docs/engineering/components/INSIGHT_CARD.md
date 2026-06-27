---
title: Insight Card
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - foundation/DESIGN_SYSTEM.md
  - foundation/THEME_TOKENS.md
  - foundation/MOTION.md
  - foundation/ACCESSIBILITY.md

used_by:
  - screens/INSIGHTS.md

react_component:
  InsightCard.tsx
---

# Purpose

Displays a single insight derived from the user's habit data.

The component summarizes one meaningful metric in a compact and easily scannable format.

Business logic is owned by the ViewModel.

---

# Responsibilities

The component SHALL:

- Display one insight.
- Display optional supporting information.
- Display an optional trend.
- Support optional navigation.

The component SHALL NOT:

- Calculate statistics.
- Query the database.
- Aggregate habit history.

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

InsightCard

├── Icon (Optional)

├── Title

├── Primary Value

├── Supporting Description

└── Trend Indicator (Optional)

---

# Layout Rules

Container

Width

Parent Width

Minimum Height

104dp

Padding

Horizontal

spacing.xl

Vertical

spacing.lg

Corner Radius

radius.xl

Elevation

elevation.sm

Internal Gap

spacing.md

---

# Content Rules

Title

Short descriptive label.

Examples

Current Streak

Completion Rate

Most Consistent Habit

Weekly Average

Primary Value

Large emphasis.

Examples

15 Days

84%

Morning Run

6.4 / Week

Supporting Description

One concise sentence.

Maximum

2 lines

Trend Indicator

Optional.

Values

Up

Down

Neutral

Hidden when unavailable.

---

# States

## Loading

Display skeleton placeholders.

---

## Default

Display all available values.

---

## Empty

Display helper message.

"No insights available yet."

---

## Error

Display generic error placeholder.

---

# Interaction

Optional.

Tap

↓

Navigate to detailed analytics.

If no action exists,

render as read-only.

---

# Motion

Uses

motion.card.enter

Press

motion.card.press

Trend updates

Subtle fade transition.

No looping animations.

---

# Accessibility

Role

Summary

Labels

Title

Primary Value

Supporting Description

Trend (if visible)

Decorative icons are hidden from screen readers.

---

# Dark Mode

Uses semantic theme tokens only.

---

# Public API

```tsx
type InsightTrend = "up" | "down" | "neutral";

interface InsightCardProps {

  title: string;

  value: string;

  description?: string;

  icon?: React.ReactNode;

  trend?: InsightTrend;

  loading?: boolean;

  onPress?: () => void;

}
```

---

# Implementation Rules

Must

✓ Be reusable for every insight

✓ Support Dynamic Type

✓ Support dark mode

✓ Use semantic tokens

✓ Memoized

Must Not

✗ Calculate insight values

✗ Access storage

✗ Hardcode colors

✗ Hardcode spacing

---

# Acceptance Criteria

✓ Matches approved design

✓ Responsive

✓ Accessible

✓ Token driven

✓ Dark mode verified

✓ Reusable

✓ No hardcoded values