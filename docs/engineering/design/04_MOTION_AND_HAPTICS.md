# Strivo Product Design Specification
# 04_MOTION_AND_HAPTICS.md

Version: 1.0.0
Status: Production Frozen

> Defines every animation, transition and haptic interaction used throughout Strivo.

---

# Motion Principles

- Motion communicates state.
- Motion must never distract.
- Keep interactions responsive.
- Respect reduced-motion settings.

---

# Global Timing Tokens

| Token | Duration |
|---|---:|
| motion.instant | 0 ms |
| motion.fast | 120 ms |
| motion.normal | 200 ms |
| motion.medium | 280 ms |
| motion.slow | 320 ms |
| motion.celebration | 520 ms |

---

# Navigation

## Screen Push
Duration: 300 ms
Curve: easeOut

## Screen Pop
Duration: 260 ms
Curve: easeInOut

## Modal
Duration: 280 ms
Curve: easeInOut

## Bottom Sheet
Duration: 320 ms
Curve: Spring
Damping: 18
Stiffness: 180

---

# Component Motion

## Button

Pressed:
Scale 1.0 → 0.96
120 ms

Release:
0.96 → 1.0
120 ms

---

## FAB

Scale on press.
No rotation.

---

## Hero Momentum Card

Animate only:
- First appearance
- Habit completion
- Milestone unlocked

Never animate while scrolling.

Entrance:
Fade + TranslateY 12dp → 0dp
300 ms

---

## Habit Completion Timeline

0 ms  Press

80 ms Scale

160 ms Checkmark

240 ms Progress update

320 ms Hero card refresh

420 ms Haptic

520 ms Complete

---

## Milestone

Hero glow

Badge scale

Confetti (subtle)

Success haptic

---

# Haptics

| Event | Feedback |
|---|---|
| Button | Light |
| Habit Completed | Medium |
| Milestone | Success |
| Delete Habit | Heavy |
| Save | Light |
| Error | Error |
| Pull To Refresh | Light |

---

# Reduced Motion

Replace transforms with fades.

Disable celebration particles.

Keep timing consistent.

---

# QA

- Animations maintain 60 FPS.
- No animation on repeated renders.
- Reduced-motion mode verified.
- Haptics triggered exactly once.

---

# Next Document

05_ACCESSIBILITY.md
