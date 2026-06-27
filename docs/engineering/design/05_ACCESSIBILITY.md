# Strivo Product Design Specification
# 05_ACCESSIBILITY.md

Version: 1.0.0
Status: Production Frozen

> Accessibility requirements are mandatory for every Strivo screen and component.

---

# Principles

- Accessibility is a core product requirement.
- No interaction should depend on color alone.
- Every interactive element must be reachable and understandable.

---

# Touch Targets

Minimum interactive size: **48 × 48 dp**

Applies to:
- Buttons
- Icon buttons
- FAB
- Navigation items
- Check actions
- Chips

---

# Typography

- Dynamic Type supported up to 200%
- Never truncate critical actions
- Prefer wrapping over clipping

---

# Color Contrast

Minimum:
- WCAG AA

Never place low-contrast text on gradients.

---

# Screen Readers

Every interactive component requires:

- accessibilityLabel
- accessibilityHint (where needed)
- accessibilityRole

Examples:

Hero Card:
Label: "Current streak"

Habit Card:
Label: Habit title

Completion Button:
Role: Button

---

# Focus Order

Today Screen:

1. Greeting
2. Notification
3. Hero Card
4. Progress
5. Today's Agenda
6. Habit Cards
7. FAB
8. Bottom Navigation

---

# Reduced Motion

Replace:
- Scale
- Translation
- Confetti

With:
- Fade

Maintain timing consistency.

---

# Haptics

Respect system settings.

Never require haptics to communicate important information.

---

# Icons

Icons must always have accessible labels when interactive.

Decorative icons should be hidden from screen readers.

---

# QA Checklist

- Minimum touch target verified
- Screen reader labels verified
- Dynamic text verified
- Color contrast verified
- Reduced motion verified
- Focus order verified

---

# Next Document

06_ASSET_LIBRARY.md
