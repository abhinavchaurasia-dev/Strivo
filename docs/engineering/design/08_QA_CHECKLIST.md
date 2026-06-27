# Strivo Product Design Specification
# 08_QA_CHECKLIST.md

Version: 1.0.0
Status: Production Frozen

> Master quality gate for every Strivo feature before merge or release.

---

# 1. Visual QA

## Layout
- [ ] Matches approved screen specification
- [ ] Uses design tokens only
- [ ] No hardcoded spacing
- [ ] No hardcoded colors
- [ ] No hardcoded typography

## Typography
- [ ] Correct font family
- [ ] Correct weight
- [ ] Correct line height
- [ ] No clipping

## Colors
- [ ] Semantic tokens only
- [ ] Dark theme verified
- [ ] Contrast meets WCAG AA

---

# 2. Component QA

For every reusable component:

- [ ] Default state
- [ ] Pressed state
- [ ] Loading state
- [ ] Disabled state
- [ ] Error state (if applicable)
- [ ] Empty state (if applicable)

---

# 3. Motion QA

- [ ] Uses motion tokens
- [ ] 60 FPS on target devices
- [ ] Reduced-motion respected
- [ ] No repeated entrance animations

---

# 4. Haptic QA

- [ ] Correct feedback mapping
- [ ] Fires exactly once
- [ ] Disabled when OS haptics are disabled

---

# 5. Accessibility QA

- [ ] Touch targets ≥ 48×48 dp
- [ ] Screen reader labels
- [ ] Focus order correct
- [ ] Dynamic text up to 200%
- [ ] Decorative icons hidden

---

# 6. Performance QA

- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] SVGs used where specified
- [ ] Smooth scrolling

---

# 7. Device QA

Verify on:
- Small phone
- Large phone
- Tablet (layout check)
- Light theme
- Dark theme

---

# 8. Release Gate

A screen is considered Production Ready only when every checklist item passes.

---

# Next Phase

Begin deep component specifications followed by SDS_001_TODAY.md.
