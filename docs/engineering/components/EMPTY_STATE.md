---
title: Empty State
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - foundation/DESIGN_SYSTEM.md
  - foundation/THEME_TOKENS.md
  - foundation/MOTION.md
  - foundation/ACCESSIBILITY.md
  - foundation/ASSETS.md

used_by:
  - screens/TODAY.md
  - screens/INSIGHTS.md
  - screens/ACTIVITY_CENTER.md
  - screens/HABIT_DETAIL.md

react_component:
  EmptyState.tsx
---

# Purpose

Provides meaningful guidance when a screen has no data to display.

The Empty State should reduce confusion, communicate the current situation, and encourage the user to take the next meaningful action.

Business logic belongs to the ViewModel.

---

# Responsibilities

The component SHALL:

- Display an illustration.
- Display a concise title.
- Display a supporting description.
- Display an optional primary CTA.
- Display an optional secondary CTA.

The component SHALL NOT:

- Decide when to appear.
- Fetch data.
- Navigate automatically.

---

# Dependencies

Uses

- theme.colors.*
- theme.spacing.*
- theme.radius.*
- theme.typography.*
- motion.emptyState.*
- accessibility defaults

Illustrations

See

foundation/ASSETS.md

---

# Variants

The component supports the following predefined variants.

| Variant | Used By |
|----------|----------|
| No Habits | Today |
| No Insights | Insights |
| No Activity | Activity Center |
| Notifications Disabled | Settings |
| Offline | Global |
| Error | Global |

---

# Composition

EmptyState

├── Illustration
├── Title
├── Description
├── Primary Button (Optional)
└── Secondary Button (Optional)

---

# Layout Rules

Container

Width

Parent Width

Minimum Height

280dp

Content Alignment

Center

Horizontal Padding

spacing.2xl

Vertical Padding

spacing.3xl

Internal Gap

spacing.lg

Illustration Size

120dp × 120dp

Buttons

Maximum Width

280dp

Button Gap

spacing.md

---

# Content Rules

Title

Maximum

2 lines

Description

Maximum

3 lines

Centered

CTA

Maximum

2 actions

Primary action always displayed above secondary.

Examples

Create Habit

Enable Notifications

Retry

Go Back

---

# Illustration Rules

Illustrations

SVG only.

Use approved assets from

foundation/ASSETS.md

No raster graphics.

No animations inside illustrations.

---

# States

## Default

Display illustration, text and CTA.

---

## Loading

Not applicable.

Loading uses Skeleton components instead.

---

## Offline

Displays offline illustration.

Retry CTA optional.

---

## Error

Displays generic error illustration.

Retry CTA optional.

---

# Interaction

Primary CTA

↓

Executes supplied action.

Secondary CTA

↓

Executes supplied action.

Illustration

No interaction.

---

# Motion

Entrance

Uses

motion.emptyState.enter

Buttons

Use standard button motion.

Illustration

Static.

No looping animations.

---

# Accessibility

Role

Group

Announce

Title

Description

Primary CTA

Secondary CTA

Illustration

Decorative

Hidden from screen readers unless specifically informative.

---

# Dark Mode

Uses semantic tokens only.

Illustrations must support both themes.

---

# Public API

```tsx
interface EmptyStateProps {

  illustration: React.ReactNode;

  title: string;

  description: string;

  primaryAction?: {

    label: string;

    onPress: () => void;

  };

  secondaryAction?: {

    label: string;

    onPress: () => void;

  };

}
```

---

# Implementation Rules

Must

✓ Use semantic tokens

✓ Use SVG illustrations

✓ Support Dynamic Type

✓ Support dark mode

✓ Be reusable

✓ Keep content vertically centered

Must Not

✗ Use PNG illustrations

✗ Hardcode spacing

✗ Hardcode colors

✗ Embed business logic

---

# Acceptance Criteria

✓ Matches approved design

✓ Responsive

✓ Accessible

✓ Token driven

✓ Dark mode verified

✓ Illustration scales correctly

✓ CTA alignment consistent

✓ Reusable across all screens