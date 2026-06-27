---
title: AI Implementation Guide
type: Engineering Guide
status: Frozen
version: 1.0

depends_on:
  - README.md
  - foundation/*
  - components/*
  - screens/*

used_by:
  - Human Developers
  - AI Coding Agents

last_updated:
  2026-06-26
---

# Purpose

This document defines the implementation workflow for Strivo.

It explains how developers and AI coding agents should interpret the Engineering Handbook to produce production-quality code.

This guide defines **how to implement**, not **what to implement**.

Product requirements belong to the Foundation, Component, and Screen specifications.

---

# Implementation Philosophy

The Engineering Handbook is the **Single Source of Truth (SSOT)**.

Every implementation must follow the handbook.

Never invent behavior.

Never infer missing requirements.

Never contradict a frozen specification.

If documentation is incomplete,

STOP.

Request clarification.

Never guess.

---

# Source of Truth Hierarchy

When documentation conflicts, resolve it using the following priority.

| Priority | Source | Owner |
|-----------|--------|-------|
| 1 | CONSTRAINTS.md | Product |
| 2 | DESIGN_SYSTEM.md | Design |
| 3 | THEME_TOKENS.md | Design |
| 4 | MOTION.md | Design |
| 5 | ACCESSIBILITY.md | Design |
| 6 | Component Specification | Product Engineering |
| 7 | Screen Specification | Product Engineering |
| 8 | Code | Engineering |

Never modify code to contradict higher-priority documentation.

---

# Required Reading Order

Before implementing any feature, read documents in this order.

```
README

↓

CONSTRAINTS

↓

DESIGN_SYSTEM

↓

THEME_TOKENS

↓

MOTION

↓

ACCESSIBILITY

↓

Component Specification

↓

Screen Specification
```

Never begin implementation from the Screen Specification alone.

---

# Build Order

Implement the application in the following sequence.

```
Foundation

↓

Theme

↓

Primitive Components

↓

Product Components

↓

Navigation

↓

Screens

↓

Animations

↓

Testing

↓

Release
```

Do not skip layers.

---

# Engineering Principles

Every implementation SHALL follow these principles.

## Single Source of Truth

A fact must exist in one location only.

Never duplicate information.

---

## Composition over Duplication

Screens compose components.

Components compose primitives.

Never duplicate component implementations inside screens.

---

## Semantic Tokens Only

All visual values MUST come from theme tokens.

Never hardcode:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Elevation
- Motion durations

---

## Separation of Concerns

Business logic

↓

ViewModel

Presentation

↓

Components

Composition

↓

Screens

Persistence

↓

Services

Never mix responsibilities.

---

# Component Rules

Every reusable UI element SHALL:

- Be reusable.
- Be memoized where appropriate.
- Receive data via props.
- Never access storage.
- Never query databases.
- Never calculate business logic.

Components must remain presentation-only whenever practical.

---

# Screen Rules

Every screen SHALL:

Compose components.

Receive state from its ViewModel.

Handle navigation.

Coordinate screen-level layout.

A screen SHALL NOT:

- Query the database.
- Calculate statistics.
- Store business state.
- Duplicate component logic.

---

# State Management

Use ViewModels as the source of UI state.

UI components should be deterministic.

Given identical input,

identical UI should always be produced.

---

# Navigation Rules

Navigation belongs to screens.

Components emit events.

Components never navigate directly.

Example

Good

```
onPress()

↓

Screen

↓

Navigation
```

Bad

```
Component

↓

navigate()
```

---

# Performance Rules

Always

✓ Memoize reusable components

✓ Virtualize long lists

✓ Lazy load expensive modules

✓ Avoid unnecessary re-renders

✓ Prefer derived values

Never

✗ Premature optimization

✗ Duplicate state

✗ Inline object creation inside render

---

# Accessibility

Follow

ACCESSIBILITY.md

without exception.

Additional requirements

✓ Meaningful labels

✓ Minimum touch target

✓ Dynamic Type support

✓ Screen reader compatibility

✓ Reduced motion support

---

# Dark Mode

Every screen and component must support both themes.

Never implement light mode only.

Never branch on literal colors.

Always use semantic tokens.

---

# Error Handling

When implementation information is missing

STOP.

Do not invent

- colors
- spacing
- animation
- typography
- behavior
- business rules

Request clarification instead.

---

# Definition of Done

Implementation is complete only when ALL of the following are true.

## Design

✓ Matches approved specification

✓ Uses semantic tokens

✓ Responsive

✓ Dark mode verified

---

## Accessibility

✓ WCAG compliant

✓ Screen reader tested

✓ Dynamic Type supported

✓ Touch targets verified

---

## Performance

✓ No unnecessary re-renders

✓ Smooth scrolling

✓ Optimized lists

✓ Memoized reusable components

---

## Engineering

✓ TypeScript strict mode

✓ No `any`

✓ No dead code

✓ No duplicated logic

✓ No hardcoded visual values

---

## Product

✓ Matches business requirements

✓ Correct navigation

✓ Correct state handling

✓ ViewModel separation maintained

---

# Implementation Checklist

Before opening a Pull Request, verify:

- [ ] Matches Engineering Handbook
- [ ] Matches Component Specification
- [ ] Matches Screen Specification
- [ ] Uses semantic tokens
- [ ] Supports dark mode
- [ ] Accessible
- [ ] Responsive
- [ ] No hardcoded visual values
- [ ] Business logic isolated
- [ ] All tests passing

---

# Guiding Principle

When in doubt:

**Prefer correctness over assumptions.**

If the specification does not define something,

do not invent it.

Stop.

Ask for clarification.

Consistency is more valuable than speed.