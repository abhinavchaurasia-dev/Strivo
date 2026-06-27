# Strivo Product Design Specification
# 03_COMPONENT_LIBRARY.md

Version: 1.0.0
Status: Production Frozen

> Defines every reusable UI component. Screen specifications must reference these components rather than redefining them.

---

# Component Architecture

Primitive Components
→ Product Components
→ Screen Layouts

---

# Primitive Components

## CMP-001 Surface

Purpose:
Reusable background container.

Tokens:
- colors.surface.default
- radius.lg
- elevation.sm

States:
- Default
- Elevated
- Disabled

---

## CMP-002 Button

Variants:
- Primary
- Secondary
- Ghost
- Danger

States:
- Default
- Pressed
- Focused
- Disabled
- Loading

Minimum Height:
48 dp

---

## CMP-003 IconButton

Size:
48 × 48 dp

Icon:
24 dp Lucide

Press Scale:
0.96

---

## CMP-004 Chip

Height:
32 dp

Radius:
pill

Variants:
- Filled
- Outlined

---

## CMP-005 Badge

Sizes:
Small
Medium

Used for:
Notification counts
Milestones

---

## CMP-006 Progress Ring

Stroke:
6 dp

Animation:
520 ms

---

# Product Components

## PRD-001 HeroMomentumCard

Purpose:
Primary motivational component.

Used On:
Today Screen

Dependencies:
- Surface
- Progress Ring
- Badge

Tokens:
- gradient.hero
- radius.2xl
- elevation.lg

States:
- Default
- Loading
- Milestone
- Empty

---

## PRD-002 HabitCard

Purpose:
Represents one habit.

Sections:
- Emoji
- Title
- Reminder
- Completion Action

States:
- Upcoming
- Completed
- Missed
- Disabled
- Loading

Interactions:
- Tap
- Long Press
- Swipe

---

## PRD-003 ProgressCard

Displays:
Completion %
Current Streak
Best Streak

---

## PRD-004 ReminderChip

Displays reminder time.

States:
Default
Active
Expired
Disabled

---

## PRD-005 HeatmapCard

Displays 30-day consistency.

---

## PRD-006 InsightCard

Reusable analytics summary.

---

## PRD-007 MilestoneCard

Celebration component.

Triggers:
3
7
14
30
50
100 days

---

## PRD-008 ActivityTimelineItem

Displays:
Reminder
Completion
Milestone
Notification

---

## PRD-009 NotificationHealthCard

Displays notification status.

---

## PRD-010 EmptyStateView

Dependencies:
Illustration
Title
Description
CTA

Variants:
No Habits
No Insights
No Activity
No Reminders

---

# Component Rules

- Components must use theme tokens only.
- Components must support dark mode.
- Components require accessibility labels.
- Components must define loading, empty and error states.

---

# Naming Convention

Primitive:
CMP-XXX

Product:
PRD-XXX

---

# Next Document

04_MOTION_AND_HAPTICS.md
