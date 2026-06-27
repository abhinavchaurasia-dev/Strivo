# Strivo Product Design Specification (SPDS)

**Document ID:** SPDS-00
**File:** `docs/design/00_OVERVIEW.md`
**Version:** 1.0.0
**Status:** Production Frozen
**Owner:** Product Design Team
**Last Updated:** Initial Freeze

---

# 1. Purpose

The Strivo Product Design Specification (SPDS) is the single source of truth for the visual, interaction, accessibility, and implementation behavior of the Strivo application.

This specification eliminates ambiguity between Product Design, Engineering, QA, and AI Coding Agents.

No implementation should require interpretation beyond what is documented here.

---

# 2. Scope

This specification governs:

* Brand Identity
* Design System
* Theme Tokens
* Components
* Motion
* Haptics
* Accessibility
* Assets
* Export Rules
* Screen Specifications
* QA Standards

Anything not documented is considered undefined.

---

# 3. Project Information

## Product Name

Strivo

---

## Tagline

Consistency compounds.

---

## Product Category

Habit Tracking

Productivity

Self Improvement

---

## Platform

Android (Primary)

iOS (Secondary)

---

## Technology

React Native

Expo

TypeScript

NativeWind

Expo Router

SQLite

---

# 4. Design Philosophy

Strivo is built around one central idea:

Consistency compounds.

The interface should never compete with the user's habits.

Instead, it should quietly support them.

Every screen should communicate:

* Clarity
* Calm
* Momentum
* Progress

---

# 5. Core Design Principles

## Principle 1

Consistency over complexity.

---

## Principle 2

Every interaction should have purpose.

---

## Principle 3

Visual hierarchy should reduce cognitive load.

---

## Principle 4

Motion communicates state.

Motion is never decorative.

---

## Principle 5

Accessibility is a feature.

Never an afterthought.

---

## Principle 6

Every visual value comes from Design Tokens.

No hardcoded implementation values.

---

## Principle 7

Reusable components over duplicated layouts.

---

# 6. Design Goals

The application should feel:

* Premium
* Modern
* Calm
* Reliable
* Fast
* Lightweight

Never:

* Playful
* Cartoonish
* Corporate
* Noisy
* Over-gamified

---

# 7. Product Pillars

## Pillar 1

Momentum

---

## Pillar 2

Consistency

---

## Pillar 3

Progress

---

## Pillar 4

Simplicity

---

# 8. Target User Experience

Opening the app should immediately answer:

"What should I do today?"

Completing a habit should reinforce:

"I'm making progress."

Viewing insights should reinforce:

"My consistency is visible."

---

# 9. Documentation Structure

```
docs/design/

00_OVERVIEW.md

01_DESIGN_SYSTEM.md

02_THEME_TOKENS.md

03_COMPONENT_LIBRARY.md

04_MOTION_AND_HAPTICS.md

05_ACCESSIBILITY.md

06_ASSET_LIBRARY.md

07_EXPORT_GUIDELINES.md

08_QA_CHECKLIST.md

screens/

SDS_001_TODAY.md

SDS_002_HABIT_DETAIL.md

SDS_003_HABIT_FORM.md

SDS_004_INSIGHTS.md

SDS_005_ACTIVITY_CENTER.md

SDS_006_SETTINGS.md
```

---

# 10. Design Freeze Policy

Once a screen reaches **Production Frozen** status:

* Visual layout cannot change.
* Component dimensions cannot change.
* Tokens cannot change without versioning.
* Motion cannot change without review.

---

# 11. Versioning

Major

Breaking visual changes.

Example:

New navigation structure.

---

Minor

New components.

Additional screen.

---

Patch

Documentation corrections.

Token description improvements.

No visual changes.

---

# 12. Change Approval

Every visual modification requires:

* Updated version
* Updated changelog
* QA review
* Component review

---

# 13. Single Source of Truth

Visual values must originate from:

Theme Tokens

Never from implementation.

Examples:

Correct

```
theme.colors.primary
```

Incorrect

```
"#FF7A00"
```

---

Correct

```
theme.spacing.lg
```

Incorrect

```
padding: 18
```

---

# 14. Design Authority

If implementation conflicts with the specification:

The specification wins.

---

# 15. Success Criteria

The product is considered correctly implemented when:

* UI matches specification within ±1 dp
* Typography matches specification
* Colors originate from tokens
* Motion follows specification
* Accessibility requirements are satisfied
* QA checklist passes without exception

---

# 16. Intended Audience

This specification is written for:

* Product Designers
* React Native Developers
* QA Engineers
* AI Coding Agents
* Future Contributors

---

# 17. Changelog

## Version 1.0.0

Initial production freeze.

Defines the documentation architecture for the Strivo Product Design Specification.

---

# 18. Next Document

01_DESIGN_SYSTEM.md

This document defines the complete visual language used throughout Strivo.
