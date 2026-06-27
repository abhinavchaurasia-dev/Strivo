# Strivo Product Design Specification
# components/PRD_001_HERO_MOMENTUM_CARD.md

Version: 1.0.0
Status: Production Frozen

> Signature component of Strivo. Displays the user's current momentum and is the primary visual anchor of the Today screen.

---

# Component ID

PRD-001

React Native:
HeroMomentumCard.tsx

---

# Purpose

Reinforce progress before task execution.

The Hero Momentum Card should immediately answer:

"How am I doing today?"

---

# Composition

1. Streak Badge
2. Headline
3. Current Streak Number
4. Supporting Text
5. Progress Indicator
6. Milestone Chip (optional)

---

# Layout

Width:
100% of content width

Height:
196 dp

Internal Padding:
Top: spacing.2xl (24)
Bottom: spacing.xl (20)
Horizontal: spacing.2xl (24)

Gap Between Sections:
spacing.lg (16)

Radius:
radius.2xl (24)

---

# Background

Gradient:
gradient.hero

Angle:
135°

Stops:
0%   #FF7A00
54%  #FF8A1C
100% #FFB347

Overlay:
hero_wave.svg

Opacity:
6%

Blend:
Soft Light

---

# Elevation

Token:
elevation.lg

Android:
12

iOS:
Y:12
Blur:32
Opacity:0.14

---

# Typography

Headline:
headline.medium

Streak Number:
display.large

Supporting Text:
body.medium

Milestone:
caption

---

# States

- Loading
- Default
- Empty
- Milestone
- Offline

---

# Motion

Entrance:
Fade + TranslateY(12→0)
300 ms

Completion:
Refresh metric
520 ms

Milestone:
Glow + Badge Scale + Success Haptic

---

# Haptics

Completion:
Medium

Milestone:
Success

---

# Accessibility

Role:
Summary

Label:
Current streak

Touch Target:
Not interactive unless explicitly tappable.

---

# Assets

hero_wave.svg
hero_glow.svg
flame.svg

---

# React Native Contract

Component:
HeroMomentumCard.tsx

Props:

- streak:number
- completionRate:number
- nextMilestone:number
- loading:boolean
- onPress?:()=>void

Dependencies:

- expo-linear-gradient
- react-native-reanimated
- expo-haptics

Theme Tokens:

- gradient.hero
- spacing.2xl
- radius.2xl
- elevation.lg

---

# QA Acceptance Criteria

- Height exactly 196 dp
- Radius 24 dp
- Gradient angle 135°
- Wave opacity 6%
- Shadow matches elevation.lg
- Display number baseline aligned
- Supports Dynamic Type
- Reduced-motion respected
- No hardcoded values

---

# Developer Checklist

- [ ] Uses semantic theme tokens
- [ ] No inline colors
- [ ] Accessibility labels present
- [ ] Animation uses motion tokens
- [ ] Haptics use token mapping
- [ ] Snapshot matches design spec
