# Strivo Product Design Specification
# components/PRD_002_HABIT_CARD.md

Version: 1.0.0
Status: Production Frozen

> Canonical specification for the Habit Card used throughout Strivo.

---

# Component ID

PRD-002

React Native:
HabitCard.tsx

---

# Purpose

Represents a single habit scheduled for today and provides the fastest path to completion.

Primary objective:
Reduce friction between intention and completion.

---

# Composition

1. Emoji/Icon
2. Habit Title
3. Schedule / Reminder
4. Optional Streak Indicator
5. Complete Action
6. Overflow Menu (optional)

---

# Layout

Width:
100% of parent

Minimum Height:
88 dp

Horizontal Padding:
spacing.xl (20)

Vertical Padding:
spacing.lg (16)

Corner Radius:
radius.xl (20)

Gap:
spacing.md (12)

---

# Visual Tokens

Background:
card.background

Border:
border.default (1 dp)

Elevation:
elevation.sm

---

# Typography

Title:
title.large

Subtitle:
body.medium

Metadata:
caption

---

# States

- Loading
- Upcoming
- Completed
- Missed
- Disabled
- Archived

Completed State:
- Completion icon filled
- Reduced emphasis on subtitle
- Success color accent

---

# Interaction

Tap:
Open Habit Detail

Completion Button:
Mark complete

Long Press:
Selection / future bulk actions

Swipe (optional):
Reveal contextual actions

---

# Motion

Card Press:
Scale 1.0 → 0.98
120 ms

Completion:
Check animation
Progress update
Hero refresh
520 ms total

---

# Haptics

Completion:
Medium

Delete:
Heavy

---

# Accessibility

Role:
Button

Label:
"<Habit Name>, due <Time>"

Hint:
"Double tap to view details. Activate completion button to mark complete."

Minimum Touch Targets:
48 × 48 dp

---

# React Native Contract

Component:
HabitCard.tsx

Props:

- id: string
- title: string
- emoji: string
- reminderTime?: string
- completed: boolean
- disabled?: boolean
- streak?: number
- onPress(): void
- onComplete(): void

Dependencies:

- Lucide icons
- expo-haptics
- react-native-reanimated

Theme Tokens:

- spacing
- typography
- semantic colors
- elevation

---

# QA Acceptance Criteria

- Card height ≥ 88 dp
- Horizontal padding 20 dp
- Completion target ≥ 48 dp
- No hardcoded values
- Dark mode verified
- Dynamic Type verified
- Screen reader labels verified
- Animation follows motion tokens

---

# Developer Checklist

- [ ] Uses semantic tokens
- [ ] Memoized where appropriate
- [ ] Accessibility complete
- [ ] Motion token driven
- [ ] Haptics token driven
