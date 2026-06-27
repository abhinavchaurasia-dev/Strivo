# Strivo Product Design Specification
# 06_ASSET_LIBRARY.md

Version: 1.0.0
Status: Production Frozen

> Master registry of all visual assets used by Strivo. Every asset has a unique ID, source format, export rules and usage scope.

---

# Asset Principles

- SVG is the source of truth.
- Never edit exported PNGs.
- Never duplicate assets.
- Every asset has one owner and one filename.

---

# Directory Structure

assets/
├── icons/
├── illustrations/
├── logos/
├── app-icon/
├── gradients/
├── badges/
├── screenshots/
├── marketing/
└── animations/

---

# Logos

## LOGO-001
Name: Primary Logo
Master: logo_primary.svg
Usage:
- Splash
- Marketing
- README

## LOGO-002
Name: Monochrome White
Master: logo_white.svg

## LOGO-003
Name: Monochrome Dark
Master: logo_dark.svg

---

# App Icons

## ICON-APP-001
Name: Adaptive Foreground
File: adaptive_foreground.svg

## ICON-APP-002
Name: Adaptive Background
File: adaptive_background.svg

## ICON-APP-003
Name: Play Store Icon
File: playstore_512.png

---

# Hero Assets

## HERO-001
hero_wave.svg

Opacity:
6%

Blend:
Soft Light

Used by:
HeroMomentumCard

## HERO-002
hero_glow.svg

Used during:
Milestone state

---

# Illustrations

ILL-001
empty_habits.svg

ILL-002
empty_insights.svg

ILL-003
empty_activity.svg

ILL-004
notifications_disabled.svg

ILL-005
no_reminders.svg

Style:
Rounded
2 px stroke
SVG only

---

# Badges

BADGE-003
3 Days

BADGE-007
7 Days

BADGE-014
14 Days

BADGE-030
30 Days

BADGE-050
50 Days

BADGE-100
100 Days

---

# Icons

Library:
Lucide

Default:
24 dp

Stroke:
2 px

---

# Marketing

FG-001
Feature Graphic

GH-001
GitHub Banner

LN-001
LinkedIn Banner

IG-001
Instagram Launch

---

# Naming Rules

kebab-case

Examples:
hero-wave.svg
habit-card-bg.svg
empty-habits.svg

---

# QA

- SVG validates
- PNG exports generated
- Naming matches specification
- No duplicate assets

---

# Next Document

07_EXPORT_GUIDELINES.md
