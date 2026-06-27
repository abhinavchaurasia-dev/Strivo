# Strivo Product Design Specification
# 02_THEME_TOKENS.md

Version: 1.0.0
Status: Production Frozen

> Defines every design token available to engineering. UI code MUST consume these tokens instead of hardcoded values.

---

# 1. Token Philosophy

Goals:
- Single source of truth
- Semantic over raw values
- Themeable
- Accessible
- Cross-platform consistent

Never reference raw values (e.g. `#FF7A00`, `16`, `24`) directly inside components.

---

# 2. Color Tokens

## Brand

| Token | Value | Usage |
|---|---|---|
| colors.brand.primary | #FF7A00 | Primary actions |
| colors.brand.primaryLight | #FF9F43 | Gradients |
| colors.brand.primaryContainer | #FFF1E5 | Soft backgrounds |

## Surface

| Token | Value |
|---|---|
| colors.surface.page | #F8F9FB |
| colors.surface.default | #FFFFFF |
| colors.surface.elevated | #FFFFFF |
| colors.surface.overlay | rgba(17,24,39,0.50) |

## Text

| Token | Value |
|---|---|
| colors.text.primary | #111827 |
| colors.text.secondary | #6B7280 |
| colors.text.inverse | #FFFFFF |
| colors.text.disabled | #9CA3AF |

## Feedback

| Token | Value |
|---|---|
| colors.success | #22C55E |
| colors.warning | #F59E0B |
| colors.error | #EF4444 |
| colors.info | #3B82F6 |

---

# 3. Semantic Tokens

| Semantic Token | Maps To |
|---|---|
| hero.background | gradient.hero |
| page.background | colors.surface.page |
| card.background | colors.surface.default |
| button.primary.bg | colors.brand.primary |
| button.primary.text | colors.text.inverse |
| divider.default | #E5E7EB |

---

# 4. Gradient Tokens

## gradient.hero

Angle: 135°

Stops:
- 0%  #FF7A00
- 54% #FF8A1C
- 100% #FFB347

Overlay:
- hero_wave.svg
- Opacity: 6%
- Blend: Soft Light

---

# 5. Spacing Tokens

xs=4
sm=8
md=12
lg=16
xl=20
2xl=24
3xl=32
4xl=40
5xl=48
6xl=64

---

# 6. Radius Tokens

xs=4
sm=8
md=12
lg=16
xl=20
2xl=24
pill=999

---

# 7. Typography Tokens

display.large
display.medium
headline.large
headline.medium
title.large
body.large
body.medium
caption

Font Family: Inter

---

# 8. Elevation Tokens

elevation.sm
- y:2
- blur:8
- opacity:.08

elevation.md
- y:6
- blur:16
- opacity:.10

elevation.lg
- y:12
- blur:32
- opacity:.14

elevation.xl
- y:16
- blur:40
- opacity:.18

---

# 9. Motion Tokens

motion.screen.push = 300ms
motion.modal = 280ms
motion.bottomSheet = 320ms
motion.button.press = 120ms
motion.habit.complete = 520ms

---

# 10. Haptic Tokens

haptics.light
haptics.medium
haptics.heavy
haptics.success
haptics.error

---

# 11. Implementation Rules

- Components consume semantic tokens only.
- No hardcoded colors.
- No hardcoded spacing.
- No hardcoded radius.
- No hardcoded typography.

---

# Next Document

03_COMPONENT_LIBRARY.md
