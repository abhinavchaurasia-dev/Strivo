---
title: Heatmap Card
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - DESIGN_SYSTEM.md
  - THEME_TOKENS.md
  - MOTION.md
  - ACCESSIBILITY.md

used_by:
  - INSIGHTS.md

react_component:
  HeatmapCard.tsx
---

# Purpose

Visualizes the user's habit consistency over the last **30 days** using a contribution-style heatmap.

The Heatmap Card helps users identify consistency patterns without requiring detailed analysis.

---

# Responsibilities

The component SHALL:

- Display a 30-day heatmap.
- Represent completion intensity using color.
- Show month/day labels where applicable.
- Support selection of individual days (optional).

The component SHALL NOT:

- Calculate completion statistics.
- Fetch historical data.
- Manage filtering.

Business logic belongs to the ViewModel.

---

# Dependencies

Uses:

- theme.colors.*
- theme.spacing.*
- theme.radius.*
- theme.typography.*
- motion.card.*
- accessibility defaults

---

# Composition

HeatmapCard

├── Title
├── Optional Subtitle
├── Heatmap Grid (30 Cells)
├── Legend
└── Optional Footer

---

# Layout Rules

Container

- Width: Parent width
- Height: Content driven
- Minimum Height: 240dp

Padding

- Horizontal: spacing.xl
- Vertical: spacing.lg

Corner Radius

- radius.xl

Elevation

- elevation.sm

Internal Gap

- spacing.lg

---

# Heatmap Rules

Window

- Fixed: Last 30 Days

Grid

- 5 Rows × 6 Columns

Cell Size

- 16dp × 16dp

Cell Radius

- radius.sm

Cell Gap

- spacing.xs

Future dates

- Hidden

---

# Color Levels

Level 0

No completion

Level 1

Low consistency

Level 2

Moderate consistency

Level 3

High consistency

Level 4

Perfect completion

Uses semantic heatmap color tokens.

---

# Legend

Display

Less ● ● ● ● More

Legend colors use the same semantic tokens as the grid.

---

# States

## Loading

Display skeleton grid.

---

## Default

Display all 30 days.

---

## Empty

No completion history available.

Display helper message.

---

## Error

Display generic error placeholder.

---

# Interaction

Optional

Tap a cell

↓

Show completion details for that date.

Long press

↓

No action.

---

# Motion

Uses

motion.card.enter

Cell selection

Uses subtle scale animation.

No continuous animations.

---

# Accessibility

Each cell announces:

Date

Completion status

Example

"12 June. Habit completed."

Legend is announced once.

---

# Dark Mode

Uses semantic heatmap tokens only.

Never hardcode colors.

---

# Public API

```tsx
interface HeatmapDay {

  date: Date;

  level: 0 | 1 | 2 | 3 | 4;

}

interface HeatmapCardProps {

  days: HeatmapDay[];

  loading?: boolean;

  onSelectDay?: (date: Date) => void;

}
```

---

# Implementation Rules

Must

✓ Always render exactly 30 days

✓ Use semantic tokens

✓ Responsive layout

✓ Accessible

✓ Support Dynamic Type

Must Not

✗ Calculate statistics

✗ Fetch data

✗ Hardcode colors

✗ Animate continuously

---

# Acceptance Criteria

✓ 30-day window only

✓ Correct legend

✓ Token driven

✓ Accessible

✓ Dark mode verified

✓ Responsive

✓ Reusable