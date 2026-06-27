---
title: Milestone Card
type: Product Component
status: Frozen
version: 1.0

depends_on:
  - foundation/DESIGN_SYSTEM.md
  - foundation/THEME_TOKENS.md
  - foundation/MOTION.md
  - foundation/ACCESSIBILITY.md

used_by:
  - screens/TODAY.md
  - screens/ACTIVITY_CENTER.md

react_component:
  MilestoneCard.tsx
---

# Purpose

Celebrates meaningful consistency milestones and reinforces long-term habit formation.

This component exists to reward consistency without becoming distracting or gamified.

Business logic belongs to the ViewModel.

---

# Responsibilities

The component SHALL:

- Display milestone achievement.
- Display milestone icon or badge.
- Display congratulatory message.
- Display optional next milestone.
- Support optional CTA.

The component SHALL NOT:

- Calculate streaks.
- Determine milestone eligibility.
- Trigger navigation automatically.

---

# Dependencies

Uses

- theme.colors.*
- theme.spacing.*
- theme.radius.*
- theme.typography.*
- theme.elevation.*
- motion.milestone.*
- accessibility defaults

---

# Composition

MilestoneCard

├── Celebration Badge
├── Title
├── Achievement Message
├── Current Milestone
├── Next Milestone (Optional)
└── CTA Button (Optional)

---

# Layout Rules

Container

Width

Parent Width

Minimum Height

148dp

Padding

Horizontal

spacing.xl

Vertical

spacing.xl

Corner Radius

radius.xl

Elevation

elevation.md

Internal Gap

spacing.md

Content Alignment

Center

---

# Content Rules

Title

Examples

Congratulations!

Amazing Progress!

Achievement Message

Examples

You completed a 30-day streak.

You've stayed consistent for 100 days.

Milestone Badge

Supported Values

3

7

14

30

50

100

Next Milestone

Optional

Hidden after the highest milestone.

CTA

Optional

Examples

Continue

View Progress

---

# States

## Celebration

Displayed immediately after unlocking.

Uses celebration motion.

---

## History

Displayed inside Activity Center.

Motion disabled.

---

## Loading

Skeleton placeholder.

---

## Hidden

Component not rendered when no milestone exists.

---

# Interaction

Optional

CTA

↓

Navigate to Insights

Card

↓

No action by default

---

# Motion

Uses

motion.milestone.enter

Celebration

Glow

Scale

Fade

Confetti (subtle)

Motion duration

Defined in MOTION.md

---

# Haptics

Uses

Success haptic

Exactly once

No repeated feedback

---

# Accessibility

Role

Summary

Announce

Milestone achieved

Milestone value

Achievement message

CTA (if present)

Badge is decorative.

---

# Dark Mode

Uses semantic milestone tokens only.

---

# Public API

```tsx
interface MilestoneCardProps {

  milestone:

    | 3
    | 7
    | 14
    | 30
    | 50
    | 100;

  title: string;

  message: string;

  nextMilestone?: number;

  loading?: boolean;

  onPress?: () => void;

}
```

---

# Implementation Rules

Must

✓ Use semantic tokens

✓ Trigger success haptic once

✓ Support Dynamic Type

✓ Support dark mode

✓ Be reusable

Must Not

✗ Calculate milestones

✗ Trigger navigation automatically

✗ Hardcode milestone values

✗ Hardcode colors

---

# Acceptance Criteria

✓ Matches approved UI

✓ Celebration animation follows MOTION.md

✓ Success haptic fires once

✓ Accessible

✓ Responsive

✓ Dark mode verified

✓ Token driven

✓ Reusable