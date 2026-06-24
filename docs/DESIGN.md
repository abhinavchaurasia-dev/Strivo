# Phase 1 — Final Design System Specification

## Project

**Streaks — Habit Tracker**

Version: 2.0 (Final)

Status: Frozen

Platform: Android First

Framework: React Native + Expo

Design Direction: Apple-Inspired Minimalism + Habit Motivation Layer

Theme Strategy: Light First, Dark Ready

---

# 1. Design Philosophy

The application is built around a single core idea:

```text
Consistency creates progress.
```

Every design decision should reinforce:

- Momentum
- Progress
- Consistency
- Reliability

The product should feel:

```text
Calm
Focused
Premium
Motivating
Fast
```

The product should NOT feel:

```text
Gamified
Cartoonish
Noisy
Experimental
Overwhelming
```

---

# 2. Product Personality

## Core Attributes

```text
Modern
Minimal
Reliable
Encouraging
Focused
```

---

## Emotional Attributes

```text
Motivating
Comforting
Rewarding
Trustworthy
```

---

## Brand Keywords

```text
Streaks

Momentum

Consistency

Progress

Growth
```

---

# 3. UX Principles

## Principle 1

Action Over Navigation

Users should spend time:

```text
Completing Habits
```

not navigating screens.

---

## Principle 2

Progress Is Always Visible

Within 5 seconds users should understand:

```text
Current Streak

Today's Progress

Next Reminder
```

---

## Principle 3

Notifications Are First-Class

Notifications are not a supporting feature.

Notifications are a core product pillar.

Their health and status should remain visible throughout the experience.

---

## Principle 4

Comfortable Information Density

Avoid:

```text
Empty Screens
```

Avoid:

```text
Crowded Dashboards
```

Target:

```text
Premium Mobile Application
```

---

## Principle 5

Reward Consistency

Visual hierarchy should prioritize:

```text
Current Streak

Progress

Completion
```

over secondary analytics.

---

# 4. Visual Design Language

The visual language is inspired by:

```text
40% Apple Health

25% Headspace

20% Habitify

10% Linear

5% Duolingo
```

---

The application should use:

- Large spacing
- Strong typography
- Soft surfaces
- Minimal shadows
- Clear hierarchy
- Meaningful color accents

---

# 5. Color System

## Brand Color

### Streak Orange

```css
#FF7A00
```

Represents:

```text
Momentum
Progress
Habit Streaks
```

---

### Streak Orange Pressed

```css
#E66E00
```

---

### Streak Orange Soft

```css
#FFF1E5
```

Used for:

```text
Highlights
Badges
Informational Surfaces
```

---

# 6. Semantic Colors

## Success

```css
#22C55E
```

Usage:

```text
Completed Habits

Success States

Milestone Completion
```

---

## Warning

```css
#F59E0B
```

Usage:

```text
Permission Issues

Quiet Hours

Warnings
```

---

## Error

```css
#EF4444
```

Usage:

```text
Deletion

Scheduling Failure

Critical Errors
```

---

## Information

```css
#3B82F6
```

Usage:

```text
Push Related Events

Unread Activity Indicators
```

---

# 7. Neutral Palette

## Background

```css
#F8F9FB
```

---

## Surface

```css
#FFFFFF
```

---

## Surface Secondary

```css
#F3F4F6
```

---

## Border

```css
#E5E7EB
```

---

## Divider

```css
#ECEEF2
```

---

# 8. Text Colors

## Primary

```css
#111827
```

---

## Secondary

```css
#6B7280
```

---

## Tertiary

```css
#9CA3AF
```

---

## Inverse

```css
#FFFFFF
```

---

# 9. Color Usage Rules

## Orange

Reserved for:

```text
Primary Actions

Progress

Streaks

Key Highlights
```

---

## Green

Reserved for:

```text
Completion

Success States
```

---

## Amber

Reserved for:

```text
Warnings

Permission Recovery
```

---

## Blue

Reserved for:

```text
Push Activity

Unread Indicators
```

---

Never mix semantic colors unnecessarily.

---

# 10. Typography System

## Font Family

Primary:

```text
Inter
```

Fallback:

```text
System
```

Reason:

- Excellent readability
- Modern appearance
- Production proven

---

# 11. Type Scale

## Display Large

Usage:

```text
Hero Streak Number
```

Properties:

```text
Size: 40

Weight: 700

Line Height: 48
```

---

## Display Medium

Usage:

```text
Large Statistics

Progress Percentage
```

Properties:

```text
Size: 32

Weight: 700

Line Height: 40
```

---

## Heading Large

Usage:

```text
Screen Titles
```

Properties:

```text
Size: 24

Weight: 700

Line Height: 32
```

---

## Heading Medium

Usage:

```text
Card Titles
```

Properties:

```text
Size: 20

Weight: 600

Line Height: 28
```

---

## Body Large

Usage:

```text
Primary Content
```

Properties:

```text
Size: 16

Weight: 500

Line Height: 24
```

---

## Body Medium

Usage:

```text
Descriptions
```

Properties:

```text
Size: 14

Weight: 400

Line Height: 20
```

---

## Caption

Usage:

```text
Metadata

Timestamps

Secondary Labels
```

Properties:

```text
Size: 12

Weight: 400

Line Height: 16
```

---

# 12. Spacing System

Only tokenized spacing values may be used.

## Scale

```text
4
8
12
16
24
32
48
64
```

---

## Rules

Never use:

```text
5
7
13
19
27
```

or arbitrary spacing.

---

# 13. Radius System

## Small

```text
12
```

Usage:

```text
Inputs

Badges
```

---

## Medium

```text
16
```

Usage:

```text
Cards

Banners
```

---

## Large

```text
24
```

Usage:

```text
Hero Components

Bottom Sheets
```

---

## Pill

```text
999
```

Usage:

```text
Buttons

Chips
```

---

# 14. Elevation System

Modern Android design should prioritize:

```text
Borders

Subtle Elevation
```

over heavy shadows.

---

## Surface

```text
Border Only
```

---

## Elevated

Used for:

```text
Cards
```

Properties:

```text
1px Border

Very Subtle Shadow
```

---

## Floating

Used for:

```text
FAB

Dropdowns
```

Properties:

```text
Medium Elevation
```

---

## Modal

Used for:

```text
Bottom Sheets

Dialogs
```

Properties:

```text
Highest Elevation
```

---

# 15. Iconography

Library:

```text
Lucide Icons
```

Used only for:

```text
System UI

Navigation

Actions
```

---

Habit identification remains:

```text
Emoji Only
```

---

# 16. Habit Visual Identity

Every habit uses:

```text
Emoji
```

as its primary identifier.

Examples:

```text
💧
📖
🏃
💻
🧘
```

---

No category-based icon system.

No icon fallback system.

---

Reason:

```text
Simpler

Cleaner

Assignment Aligned
```

---

# 17. Input System

Height:

```text
56
```

---

Radius:

```text
16
```

---

Border:

```css
#E5E7EB
```

---

Focused Border:

```css
#FF7A00
```

---

Focus Border Width:

```text
2
```

---

# 18. Button System

## Primary Button

Height:

```text
52
```

Radius:

```text
16
```

Background:

```css
#FF7A00
```

Text:

```css
#FFFFFF
```

---

## Secondary Button

Background:

```css
#F3F4F6
```

Text:

```css
#111827
```

---

## Danger Button

Background:

```css
#FEE2E2
```

Text:

```css
#EF4444
```

---

# 19. Motion Tokens

## Fast

Duration:

```text
150ms
```

Used for:

```text
Button Press

Chip Selection

Badge Updates
```

---

## Medium

Duration:

```text
250ms
```

Used for:

```text
Progress Updates

Card State Changes
```

---

## Slow

Duration:

```text
350ms
```

Used for:

```text
Screen Transitions

Modal Presentation
```

---

# 20. Haptic Tokens

## Light

Used for:

```text
Button Presses
```

---

## Medium

Used for:

```text
Habit Completion
```

---

## Success

Used for:

```text
Habit Creation

Milestones

Successful Actions
```

---

## Warning

Used for:

```text
Delete Confirmation
```

---

## Error

Used for:

```text
Failures

Critical Errors
```

---

# 21. Accessibility Standards

Minimum touch target:

```text
48 × 48
```

---

Contrast:

```text
WCAG AA
```

minimum.

---

Support:

```text
Dynamic Font Scaling

Screen Readers

Keyboard Navigation
```

where applicable.

---

Every interactive component must provide:

```text
Label

Role

Hint
```

---

# 22. Loading State Philosophy

Never use:

```text
Loading...
```

text.

Avoid spinners for content loading.

Use:

```text
Skeleton Cards

Skeleton Statistics

Skeleton Habit Rows
```

instead.

---

# 23. Empty State Philosophy

Every empty state requires:

```text
Illustration

Title

Description

CTA
```

---

Illustrations should be:

```text
Minimal

Monochrome

Non-Cartoon
```

---

# 24. Theme Architecture

Current Launch Theme:

```text
Light
```

---

Architecture:

```text
Dark Ready
```

---

Rules:

Never hardcode:

```css
#FFFFFF

#000000
```

inside components.

Always consume:

```text
Theme Tokens
```

---

# 25. Design Quality Benchmark

The final application should feel comparable to:

- Apple Health
- Headspace
- Habitify

while remaining:

```text
Focused

Minimal

Notification-Centric

Production Ready
```

---

# Phase 1 Status

```text
FROZEN
```

No further design system changes should be introduced unless they solve a significant usability, accessibility, or implementation issue.

# Phase 2 — Final Component Specification

## Project

**Streaks — Habit Tracker**

Version: 2.0 (Final)

Status: Frozen

Dependencies:

- Phase 1 Design System
- Final Architecture Audit
- Final UX Audit
- Final Addendum

This document defines all reusable UI components and their behavior.

---

# 1. Component Architecture Principles

All components must be:

```text
Reusable

Composable

Accessible

Stateless When Possible

Theme Driven
```

---

Components must NOT:

```text
Access SQLite

Calculate Analytics

Schedule Notifications

Contain Business Logic
```

---

All display data must come from:

```text
HabitViewModel
```

or equivalent UI-ready models.

---

# 2. Streak Hero Card

## Purpose

Primary motivational component.

Highest visual priority on Today Screen.

---

## Height

Responsive:

```text
140–160
```

---

## Radius

```text
24
```

---

## Padding

```text
24
```

---

## Layout

```text
🔥

14

Current Streak

Keep it alive today.
```

---

## Typography

### Streak Number

```text
40 / 700
```

---

### Label

```text
16 / 600
```

---

### Helper Text

```text
14 / 400
```

---

## Background

Subtle gradient:

```text
#FF7A00

↓

#FF9F43
```

---

## States

### Active

Displays streak.

---

### Empty

```text
0

Start your first streak today.
```

---

## Interaction

Tap:

```text
Navigate → Insights
```

---

## Accessibility

Example Label:

```text
Current streak 14 days.
Double tap to view insights.
```

---

# 3. Progress Card

## Purpose

Display today's completion progress.

---

## Height

```text
120
```

---

## Layout

```text
Today's Progress

3 / 5 Completed

Progress Bar

60%
```

---

## Progress Bar

Height:

```text
8
```

---

Radius:

```text
999
```

---

## Colors

Track:

```text
Surface Secondary
```

---

Fill:

```text
Primary Orange
```

---

## Animation

Progress fills on load.

Duration:

```text
500ms
```

---

# 4. Next Reminder Card

## Purpose

Show the most imminent reminder.

---

## Height

```text
88
```

---

## Layout

```text
Next Reminder

💧 Drink Water

In 43 Minutes
```

---

## Badge

Optional:

```text
Today
```

---

## Empty State

```text
No upcoming reminders
```

---

## Interaction

Tap:

```text
Open Habit Detail
```

---

# 5. Permission Banner

## Purpose

Permission recovery.

---

## Visibility

Only when:

```text
Permission Denied
```

---

## Layout

```text
⚠️

Notifications Disabled

Habit reminders won't work until notifications are enabled.

[Open Settings]
```

---

## Background

Warning Soft

---

## CTA

Secondary Button

---

# 6. Habit Card

## Purpose

Primary content component.

Most frequently used component in the app.

---

## Height

```text
96
```

Optimized from previous audit.

---

## Layout

```text
💧 Drink Water

🔥 14 Day Streak

Next: 7:00 PM

           [Done ✓]
```

---

## Structure

### Row 1

```text
Emoji

Habit Name
```

---

### Row 2

```text
Current Streak
```

---

### Row 3

```text
Next Reminder

Done Button
```

---

## Data Source

Must receive:

```ts
HabitViewModel;
```

---

Required fields:

```ts
completedToday;

currentStreak;

nextDueAt;
```

---

## States

### Active

```text
Done
```

Button visible.

---

### Completed Today

```text
Completed ✓
```

Green state.

---

### No Reminder

```text
No Reminder Scheduled
```

secondary text.

---

## Interactions

### Card Tap

Open Habit Detail.

---

### Done Tap

Complete Habit.

---

## Completion Animation

```text
Medium Haptic

↓

Button Morph

↓

Green State

↓

Progress Update
```

---

# 7. Section Header

## Purpose

Reusable section heading.

---

## Layout

```text
Today's Habits

View All
```

---

## Height

```text
32
```

---

## Typography

Title:

```text
20 / 600
```

Action:

```text
14 / 500
```

---

# 8. Statistics Card

## Purpose

Reusable analytics component.

---

## Height

```text
96
```

---

## Layout

```text
82%

Consistency
```

---

Supported Metrics

```text
Current Streak

Best Streak

Completion Rate

Consistency
```

---

# 9. Heatmap Component

## Purpose

Visual consistency tracker.

---

## Scope

```text
Last 30 Days
```

Only.

---

## Layout

Mobile-first.

Recommended:

```text
5 Rows

6 Weeks
```

---

## Cell Size

```text
12
```

---

## Cell Gap

```text
4
```

---

## Intensity Levels

### Level 0

```text
#F3F4F6
```

---

### Level 1

```text
#FFE2C2
```

---

### Level 2

```text
#FFC17A
```

---

### Level 3

```text
#FF9F43
```

---

### Level 4

```text
#FF7A00
```

---

## Interaction

Tap Day

Show tooltip.

Example:

```text
3 Habits Completed

June 18
```

---

# 10. Milestone Card

## Purpose

Visualize streak achievements.

---

## Height

```text
80
```

---

## Layout

```text
🔥

14 Day Streak

Unlocked
```

---

## States

### Unlocked

Orange Accent

---

### Locked

Muted

---

## Milestones

```text
3 Days

7 Days

14 Days

30 Days

50 Days

100 Days
```

Frozen.

---

# 11. Activity Item

## Purpose

Activity Center feed entry.

---

## Height

```text
72
```

minimum.

---

## Layout

```text
[Reminder]

Drink Water Reminder Fired

2 Minutes Ago
```

---

## Activity Types

### Reminder

Orange

---

### Completion

Green

---

### Milestone

Purple

---

### Push

Blue

---

# 12. Notification Health Card

## Purpose

Assignment showcase component.

---

## Placement

Settings Screen

---

## Layout

```text
Notification Health

✓ Permission Granted

✓ Android Channel Created

✓ Local Notifications Active

✓ Push Token Registered
```

---

## States

### Healthy

All green.

---

### Issue Found

Display warning state.

---

# 13. Today's Agenda Component

## Purpose

Display upcoming reminders.

---

## Source

Derived from:

```text
Habit Frequency

Reminder Times

Current Date
```

---

Never use:

```text
scheduled_notifications
```

as agenda source.

---

## Initial State

Collapsed.

---

## Layout

```text
Today's Agenda (3)

▼
```

---

Expanded:

```text
8:00 AM

💧 Drink Water

1:00 PM

📖 Read

7:00 PM

💻 Code
```

---

## Reason

Reduces Today screen density.

---

# 14. Empty State Component

## Purpose

Reusable empty state.

---

## Layout

```text
Illustration

Title

Description

CTA
```

---

## Illustration

```text
120 × 120
```

---

## Example

```text
No Habits Yet

Start your first streak today.

[Create Habit]
```

---

# 15. Extended FAB

## Purpose

Primary create action.

---

## Layout

```text
+ New Habit
```

---

## Height

```text
56
```

---

## Radius

```text
28
```

---

## Position

```text
Bottom Right

24px from edges
```

---

## Behavior

Persistent.

Never auto-hide.

---

# 16. Emoji Picker

## Purpose

Habit identity selection.

---

## Layout

```text
6 Columns
```

---

## Cell Size

```text
48 × 48
```

---

## Selected State

Orange Border

Subtle Scale Animation

---

# 17. Weekday Selector

## Layout

```text
M T W T F S S
```

---

## Chip Size

```text
40 × 40
```

---

## State

Selected:

```text
Orange Fill
```

---

# 18. Time Chip

## Example

```text
08:00 AM
```

---

## Behavior

Removable.

---

## Radius

```text
999
```

---

# 19. Skeleton Components

The application must use skeletons.

Never use generic loading text.

---

## Hero Skeleton

```text
140–160 height
```

---

## Progress Skeleton

```text
120 height
```

---

## Habit Card Skeleton

```text
96 height
```

---

## Statistics Skeleton

```text
96 height
```

---

# 20. Accessibility Requirements

Every component must support:

### Screen Reader Labels

### Dynamic Font Scaling

### WCAG AA Contrast

### 48 × 48 Touch Targets

---

Example:

```text
Drink Water habit.

Current streak 14 days.

Next reminder 7 PM.

Double tap to open.
```

---

# 21. Component Quality Benchmark

Components should feel comparable to:

- Apple Health
- Headspace
- Habitify

while remaining:

```text
Minimal

Fast

Notification-Centric

Production Ready
```

---

# Phase 2 Status

```text
FROZEN
```

No further component additions should be introduced unless they directly improve assignment requirements or accessibility.

# Phase 3 — Final Screen Specifications

## Project

**Streaks — Habit Tracker**

Version: 2.0 (Final)

Status: Frozen

Dependencies:

- Phase 1 Design System
- Phase 2 Component System
- Final Architecture Audit
- Final UX Audit

This document defines every screen, layout hierarchy, spacing structure, states, and user flow.

---

# Global Screen Rules

## Horizontal Padding

```text id="y7vkh8"
20
```

---

## Section Spacing

```text id="7xlxai"
16
```

between major cards.

---

## Screen Background

```text id="tebl4m"
Background Token
```

---

## Scroll Behavior

All primary screens:

```text id="58xhzc"
Vertical Scroll
```

---

## Safe Areas

Must respect:

```text id="qycx2l"
Top Safe Area

Bottom Safe Area
```

---

# Screen 1 — Today

## Purpose

Primary dashboard.

Users should understand:

```text id="6w8f5q"
Progress

Streak

Habits

Notifications
```

within seconds.

---

# Layout Order

```text id="qrmj8z"
Header

Streak Hero Card

Progress Card

Next Reminder Card

Permission Banner (Conditional)

Today's Habits

Habit List

Today's Agenda (Collapsed)

Extended FAB
```

---

# Header

## Height

```text id="j9p9ae"
72
```

---

## Layout

```text id="7t18eu"
Good Morning 👋

3 of 5 habits completed today

                    🔔
```

---

## Left Side

### Greeting

```text id="z9tp17"
24 / 700
```

---

### Subtitle

```text id="m0o5qb"
14 / 400
```

---

## Right Side

Notification Bell

---

### Icon Size

```text id="gv91do"
24
```

---

### Badge

```text id="kr7nq4"
8
```

---

### States

#### Hidden

No unread activity.

---

#### Blue

Unread activity exists.

---

#### Red

Notification issue.

---

## Interaction

Tap:

```text id="x4znkg"
Open Activity Center
```

---

# Streak Hero Card

## Position

Below Header.

---

## Height

```text id="v1z1dq"
140–160
```

responsive.

---

## Content

```text id="mfp1kq"
🔥

14

Current Streak

Keep it alive today.
```

---

## Tap

```text id="d2z6xf"
Navigate → Insights
```

---

# Progress Card

## Content

```text id="3m8w2t"
Today's Progress

3 / 5 Completed

Progress Bar

60%
```

---

## Behavior

Progress animates from:

```text id="rmgo9i"
0%

↓

Actual Value
```

on load.

---

# Next Reminder Card

## Content

```text id="0xzc7i"
Next Reminder

💧 Drink Water

In 43 Minutes
```

---

## Tap

Open corresponding habit.

---

## Empty State

```text id="jlwmul"
No upcoming reminders
```

---

# Permission Banner

## Visibility

Only when:

```text id="fcdzj3"
Notifications Denied
```

---

## Content

```text id="l1n5oe"
⚠️ Notifications Disabled

Habit reminders won't work until notifications are enabled.

[Open Settings]
```

---

# Today's Habits

## Header

```text id="5jntg2"
Today's Habits
```

---

## List Type

```text id="qvl2fa"
FlatList
```

---

## Sort Order

Primary:

```text id="4bjlwm"
Due Soonest First
```

---

Secondary:

```text id="0jij9t"
Highest Streak
```

---

## Habit Card States

### Pending

Shows:

```text id="6pqvww"
Done
```

button.

---

### Completed

Shows:

```text id="mldd5j"
Completed ✓
```

state.

---

# Today's Agenda

## Placement

Below Habit List.

---

## Default State

Collapsed.

---

## Header

```text id="l7fjqe"
Today's Agenda (3)

▼
```

---

## Expanded State

```text id="s6qtxg"
8:00 AM

💧 Drink Water

1:00 PM

📖 Read

7:00 PM

💻 Code
```

---

## Source

Derived from:

```text id="3v1lsf"
Frequency Data

Reminder Times

Current Date
```

---

Not derived from:

```text id="xw5qpc"
scheduled_notifications
```

---

# Empty State

```text id="jlwmrb"
No Habits Yet

Start your first streak today.

[Create Habit]
```

---

# FAB

## Label

```text id="j2nvr5"
+ New Habit
```

---

## Position

Bottom Right.

---

## Behavior

Always visible.

---

# Screen 2 — Habit Detail

## Purpose

Deep-link destination.

Shared destination for:

```text id="7s7m52"
Local Notifications

Push Notifications
```

---

# Layout Order

```text id="2eqp0s"
Header

Overview Card

Reminder Schedule

Completion History

Milestones

Actions
```

---

# Header

## Layout

```text id="0up9nk"
←

💧 Drink Water

⋮
```

---

# Overview Card

## Height

```text id="75g7i8"
180
```

---

## Content

```text id="3q94v4"
🔥 14

Current Streak

Best Streak: 28

Completion Rate: 82%

Consistency: 78%
```

---

## Priority

Highest visual weight on screen.

---

# Reminder Schedule

## Title

```text id="4n6jvv"
Reminder Schedule
```

---

## Example

```text id="ckiqw0"
08:00 AM

01:00 PM

07:00 PM
```

---

## Item Structure

```text id="4mk5o5"
Clock Icon

Time
```

---

# Completion History

## Scope

Last 7 days only.

---

## Example

```text id="dhkqks"
✓ Today

✓ Yesterday

✓ Monday

✗ Sunday
```

---

## Action

```text id="g2tw5x"
View All
```

optional.

---

# Milestones

## Type

Horizontal Scroll

---

## Milestones

```text id="ee38lk"
3

7

14

30

50

100
```

days.

---

## States

### Unlocked

Orange

---

### Locked

Muted

---

# Actions

## Button 1

```text id="f1tbrj"
Edit Habit
```

---

## Button 2

```text id="jqo9f6"
Delete Habit
```

Danger.

---

## Delete Flow

Requires confirmation sheet.

---

# Screen 3 — Habit Form

## Purpose

Create and Edit Habits.

Shared screen.

---

# Layout Order

```text id="xb5qdi"
Header

Habit Name

Emoji

Frequency

Weekdays

Reminder Times

Preview

Sticky Save Button
```

---

# Header

### Create Mode

```text id="9lcjlwm"
Create Habit
```

---

### Edit Mode

```text id="mg5nwy"
Edit Habit
```

---

# Habit Name

## Input Height

```text id="ddvs8l"
56
```

---

## Placeholder

```text id="jlwm5v"
Enter habit name
```

---

# Emoji Picker

## Grid

```text id="lfg0ch"
6 Columns
```

---

## Cell

```text id="c0lmxg"
48 × 48
```

---

# Frequency

## Type

Segmented Control.

---

Options:

```text id="s0qhr7"
Daily

Weekdays
```

---

# Weekday Selector

Visible only for:

```text id="s5my2v"
Weekdays
```

mode.

---

Layout:

```text id="slp5ah"
M T W T F S S
```

---

# Reminder Times

## Example

```text id="u9cxda"
08:00 AM

01:00 PM

07:00 PM
```

---

## Add Action

```text id="jlwm1g"
+ Add Reminder
```

---

# Schedule Preview

## Content

```text id="jlwm3r"
Preview

💧 Drink Water

Every Day

08:00 AM

01:00 PM

07:00 PM
```

---

## Behavior

Updates live.

---

# Save Button

## Height

```text id="jlwm3s"
56
```

---

## Label

```text id="jlwm3t"
Save Habit
```

---

## Position

Sticky Bottom.

---

# Success Flow

```text id="jlwm3u"
Save

↓

Schedule Notifications

↓

Snackbar

✓ Habit Created

3 reminders scheduled
```

---

# Screen 4 — Insights

## Purpose

Analytics and motivation.

Portfolio differentiator.

---

# Layout Order

```text id="jlwm3v"
30-Day Heatmap

Statistics Grid

Completion Rate

Consistency Rate

Milestones
```

---

# Heatmap Hero

## Height

```text id="jlwm3w"
220
```

---

## Title

```text id="jlwm3x"
Last 30 Days
```

---

## Content

Heatmap visualization.

---

# Statistics Grid

## Layout

```text id="jlwm3y"
2 × 2
```

---

## Cards

```text id="jlwm3z"
Current Streak

Best Streak

Completion Rate

Consistency
```

---

# Metric Hierarchy

Primary:

```text id="jlwm40"
Current Streak

Best Streak
```

---

Secondary:

```text id="jlwm41"
Completion Rate

Consistency
```

---

# Milestones

Horizontal scroll.

Unlocked first.

---

# Empty State

```text id="jlwm42"
No Insights Yet

Complete habits to generate insights.
```

---

# Screen 5 — Settings

## Purpose

Notification and system control center.

---

# Layout Order

```text id="jlwm43"
Notification Status

Notification Health

Push Token

Quiet Hours

Notification Testing

App Information
```

---

# Notification Status

Displays:

```text id="jlwm44"
Granted
```

or

```text id="jlwm45"
Denied
```

---

## Action

```text id="jlwm46"
Open Settings
```

---

# Notification Health

## Checklist

```text id="jlwm47"
✓ Permission Granted

✓ Android Channel Created

✓ Local Notifications Active

✓ Push Token Registered
```

---

# Push Token

## Content

Token

Copy Button

---

Supports multi-line token display.

---

# Quiet Hours

## Example

```text id="jlwm48"
10 PM → 7 AM
```

---

## Control

Toggle + Edit.

---

# Notification Testing

## Action

```text id="jlwm49"
Send Test Local Notification
```

---

# App Information

Displays:

```text id="jlwm50"
Version

Build

Framework
```

---

# Screen 6 — Activity Center

## Purpose

Application activity feed.

Not a notification history screen.

---

# Layout Order

```text id="jlwm51"
Header

Today

Yesterday

Earlier

Empty State
```

---

# Header

## Title

```text id="jlwm52"
Activity Center
```

---

## Action

```text id="jlwm53"
Mark All Read
```

---

# Activity Groups

```text id="jlwm54"
Today

Yesterday

Earlier
```

---

# Activity Types

### Reminder

```text id="jlwm55"
Drink Water Reminder Fired
```

---

### Completion

```text id="jlwm56"
Workout Completed
```

---

### Milestone

```text id="jlwm57"
14 Day Streak Unlocked
```

---

### Push

```text id="jlwm58"
Push Notification Received
```

---

# Retention

Display:

```text id="jlwm59"
Last 30 Days
```

only.

---

# Empty State

```text id="jlwm60"
No Recent Activity
```

---

# Evaluator First Impression Goal

Within 30 seconds, the evaluator should naturally discover:

```text id="jlwm61"
🔥 Streaks

📈 Progress

🔔 Notifications

💧 Habits

📅 Heatmap

📣 Push Token

✅ Notification Health
```

without needing explanations.

---

# Phase 3 Status

```text id="jlwm62"
FROZEN
```

No further screen additions or navigation changes should be introduced unless they solve a critical UX issue.

# Phase 4 — Final Interaction & Motion Specification

## Project

**Streaks — Habit Tracker**

Version: 2.0 (Final)

Status: Frozen

Dependencies:

- Phase 1 Design System
- Phase 2 Components
- Phase 3 Screens

This document defines motion, interactions, feedback systems, transitions, haptics, loading behavior, notification UX, and micro-interactions.

The objective is to make the application feel:

```text id="p41y0m"
Fast

Responsive

Reliable

Premium
```

without introducing unnecessary complexity.

---

# 1. Motion Philosophy

Motion exists to:

```text id="xv5wh8"
Guide

Confirm

Reward
```

Motion does NOT exist to:

```text id="bhr13m"
Decorate

Distract

Show Off
```

---

# 2. Motion Personality

The application should feel:

```text id="s9z6lb"
Calm

Fast

Natural

Predictable
```

---

Inspired by:

- Apple Health
- Apple Fitness
- Headspace

Not inspired by:

- Gaming Apps
- Social Media Apps
- Highly Animated Dashboards

---

# 3. Timing System

## Fast

Used for:

```text id="lsp3f5"
Button Press

Chip Selection

Badge Updates
```

Duration:

```text id="b4b73z"
150ms
```

---

## Medium

Used for:

```text id="8l41vb"
Card State Changes

Progress Updates

List Insertions
```

Duration:

```text id="67bmtx"
250ms
```

---

## Slow

Used for:

```text id="u3i8tf"
Screen Navigation

Modal Presentation

Bottom Sheets
```

Duration:

```text id="z3o6ry"
350ms
```

---

# 4. Screen Navigation

## Push Navigation

Examples:

```text id="slh7oa"
Today

↓

Habit Detail
```

---

Animation:

```text id="sh9n6u"
Slide From Right
```

---

## Back Navigation

Animation:

```text id="0w8hwp"
Slide To Right
```

---

## Modal Presentation

Examples:

```text id="8m6ew8"
Delete Confirmation

Time Picker

Bottom Sheets
```

---

Animation:

```text id="ygwbzj"
Slide Up
```

---

# 5. Launch Experience

## Goal

Application should feel:

```text id="r5tgnn"
Instant
```

---

## Sequence

```text id="6kvn1e"
Splash

↓

Skeleton State

↓

Loaded Dashboard
```

---

Avoid:

```text id="4s5fpo"
Loading...
```

screens.

---

# 6. Skeleton Loading System

## Today Screen

Display:

```text id="5tvn34"
Hero Skeleton

Progress Skeleton

Habit Card Skeletons
```

---

## Habit Detail

Display:

```text id="6zjzju"
Overview Skeleton

Schedule Skeleton

Milestone Skeleton
```

---

## Insights

Display:

```text id="mkhjlwm"
Heatmap Skeleton

Statistics Skeleton
```

---

## Settings

Display:

```text id="jlwm01"
Settings Row Skeletons
```

---

# 7. Button Interaction Model

## Press Down

Scale:

```text id="jlwm02"
1.0

↓

0.97
```

Duration:

```text id="jlwm03"
100ms
```

---

## Release

Scale:

```text id="jlwm04"
0.97

↓

1.0
```

Duration:

```text id="jlwm05"
150ms
```

---

## Haptic

Light Impact

---

# 8. Habit Completion Experience

Most important interaction in the application.

---

## Flow

User taps:

```text id="jlwm06"
Done
```

---

Step 1

Medium Haptic

---

Step 2

Button Morph

```text id="jlwm07"
Done

↓

Completed ✓
```

---

Step 3

Color Transition

```text id="jlwm08"
Orange

↓

Green
```

---

Step 4

Progress Card Updates

---

Step 5

Streak Updates

Only if streak changes.

---

Total Duration

```text id="jlwm09"
250ms
```

---

# 9. Streak Updates

## Rule

Do NOT animate streak values every screen visit.

---

Animate only when:

```text id="jlwm10"
Current Streak Changes
```

---

## Animation

```text id="jlwm11"
Scale

Fade

Count Up
```

---

Duration:

```text id="jlwm12"
350ms
```

---

# 10. Milestone Celebration

Triggered at:

```text id="jlwm13"
3

7

14

30

50

100
```

days.

---

## Animation

Milestone Card:

```text id="jlwm14"
0.95

↓

1.05

↓

1.0
```

---

## Haptic

Success

---

## Toast

```text id="jlwm15"
🔥 14 Day Streak!

Amazing consistency.
```

---

Duration:

```text id="jlwm16"
2 seconds
```

---

# 11. Progress Card Animation

## Initial Load

```text id="jlwm17"
0%

↓

Actual Value
```

---

Duration:

```text id="jlwm18"
500ms
```

---

## Completion Update

```text id="jlwm19"
Current

↓

New Value
```

---

Duration:

```text id="jlwm20"
250ms
```

---

# 12. Notification Bell Behavior

## Unread Activity

Badge:

```text id="jlwm21"
Scale In
```

---

Duration:

```text id="jlwm22"
150ms
```

---

## Read Activity

Badge:

```text id="jlwm23"
Fade Out
```

---

Duration:

```text id="jlwm24"
150ms
```

---

# 13. FAB Behavior

## Idle

Floating elevation.

---

## Press

```text id="jlwm25"
Scale 0.96
```

---

## Release

```text id="jlwm26"
Scale 1.0
```

---

## Visibility

Always visible.

Never auto-hide.

---

# 14. Habit Card Interactions

## Card Tap

Animation:

```text id="jlwm27"
Slight Elevation Increase
```

---

Duration:

```text id="jlwm28"
150ms
```

---

## Open

```text id="jlwm29"
Habit Detail
```

---

## Swipe Gestures

Not required.

Optional only if implementation quality remains high.

---

# 15. Activity Feed Interactions

## New Activity

Animation:

```text id="jlwm30"
Fade

+

Slide Down
```

---

Duration:

```text id="jlwm31"
250ms
```

---

## Group Expansion

Animated Height

---

Duration:

```text id="jlwm32"
200ms
```

---

# 16. Heatmap Interactions

## Tap Day

Display tooltip.

Example:

```text id="jlwm33"
3 Habits Completed

June 18
```

---

Animation:

```text id="jlwm34"
Fade

+

Scale
```

---

Duration:

```text id="jlwm35"
150ms
```

---

# 17. Emoji Picker Interaction

## Select Emoji

Animation:

```text id="jlwm36"
Scale 1.1
```

---

Duration:

```text id="jlwm37"
150ms
```

---

## Selected State

Orange Border

---

# 18. Weekday Selection

## Interaction

Tap Day

---

Animation:

```text id="jlwm38"
Fill Transition
```

---

Duration:

```text id="jlwm39"
150ms
```

---

# 19. Reminder Time Addition

## Flow

Tap:

```text id="jlwm40"
+ Add Reminder
```

---

New Chip:

```text id="jlwm41"
Fade + Slide Up
```

---

Duration:

```text id="jlwm42"
200ms
```

---

# 20. Save Habit Flow

## Sequence

```text id="jlwm43"
Save

↓

Validate

↓

Schedule Notifications

↓

Persist

↓

Success
```

---

## Button State

```text id="jlwm44"
Saving...
```

---

## Haptic

Success

---

## Snackbar

```text id="jlwm45"
✓ Habit Created

3 reminders scheduled
```

---

## Navigation

Return to Today Screen.

---

# 21. Delete Habit Flow

## Action

Tap:

```text id="jlwm46"
Delete Habit
```

---

Display:

Bottom Sheet

---

Content:

```text id="jlwm47"
Delete Habit?

This will remove all reminders.

[Cancel]

[Delete]
```

---

Delete Button:

Danger Style

---

Confirmation required.

Always.

---

# 22. Permission Flow UX

## First Launch

Banner:

```text id="jlwm48"
Enable notifications to keep your streak alive.
```

---

CTA:

```text id="jlwm49"
Enable Notifications
```

---

## Granted

Banner disappears.

---

## Denied

Banner changes to:

```text id="jlwm50"
Notifications Disabled

Open Settings
```

---

Never repeatedly trigger system permission dialogs.

---

# 23. Notification Arrival Experience

## Foreground

Show:

```text id="jlwm51"
Banner

Sound

Vibration
```

---

Tap:

```text id="jlwm52"
Habit Detail
```

---

## Background

Notification tray.

---

Tap:

```text id="jlwm53"
Habit Detail
```

---

Behavior must be identical.

---

# 24. Deep Link Experience

Notification source:

```text id="jlwm54"
Local

Push
```

must produce:

```text id="jlwm55"
Same Navigation

Same Destination

Same UX
```

---

Flow:

```text id="jlwm56"
Tap Notification

↓

Open App

↓

Open Habit Detail
```

---

No intermediate screens.

---

# 25. Toast System

Used for:

```text id="jlwm57"
Habit Created

Habit Updated

Habit Deleted

Milestone Unlocked

Reminder Scheduled
```

---

Position:

```text id="jlwm58"
Bottom
```

---

Duration:

```text id="jlwm59"
2 Seconds
```

---

Maximum:

```text id="jlwm60"
1 Toast At A Time
```

---

# 26. Empty State Experience

Every empty state must include:

```text id="jlwm61"
Illustration

Title

Description

CTA
```

---

Illustrations should be:

```text id="jlwm62"
Minimal

Monochrome

Professional
```

---

# 27. Haptic Map

| Action              | Haptic  |
| ------------------- | ------- |
| Button Press        | Light   |
| Complete Habit      | Medium  |
| Save Habit          | Success |
| Milestone Unlock    | Success |
| Delete Confirmation | Warning |
| Error State         | Error   |

---

# 28. Accessibility Motion Rules

If:

```text id="jlwm63"
Reduce Motion Enabled
```

---

Replace:

```text id="jlwm64"
Scale

Bounce

Slide
```

with:

```text id="jlwm65"
Fade
```

only.

---

# 29. Premium Quality Details

The following interactions are mandatory because they create strong evaluator perception:

```text id="jlwm66"
Progress Bar Animation

Done Button Morph

Snackbar Confirmations

Skeleton Loading

Milestone Celebration

Notification Health Status

Unread Bell Badge
```

---

# 30. Motion Anti-Patterns

Do NOT implement:

```text id="jlwm67"
Continuous Floating Animations

Parallax Effects

Lottie Everywhere

Excessive Bounce Effects

Confetti Animations
```

---

Reason:

They reduce professionalism and distract from assignment goals.

---

# Phase 4 Status

```text id="jlwm68"
FROZEN
```

The interaction system is finalized. Future changes should only occur if they improve accessibility, performance, or usability.

# Phase 5 — Final Developer Handoff Specification

## Project

**Streaks — Habit Tracker**

Version: 2.0 (Final)

Status: Frozen

Platform:

```text id="p5a001"
Android First
```

Stack:

```text id="p5a002"
React Native

Expo

Expo Router

SQLite

Zustand

Expo Notifications
```

This document is the final implementation authority.

If any future implementation decision conflicts with this document, this document takes precedence.

---

# 1. Architectural Principles

The application is built using:

```text id="p5a003"
Offline First

Service-Oriented

Notification-Centric

ViewModel Driven
```

architecture.

---

## Goals

```text id="p5a004"
Maintainability

Predictability

Scalability

Assignment Alignment
```

---

## Avoid

```text id="p5a005"
Business Logic In Screens

Analytics In Components

SQLite Access From UI

Duplicated Notification Logic
```

---

# 2. Application Architecture

## Layer Structure

```text id="p5a006"
UI

↓

ViewModels

↓

Services

↓

Repositories

↓

SQLite
```

---

## Responsibilities

### UI

Responsible for:

```text id="p5a007"
Rendering

User Interaction

Navigation
```

---

### ViewModels

Responsible for:

```text id="p5a008"
UI Ready Data

Formatting

Presentation State
```

---

### Services

Responsible for:

```text id="p5a009"
Business Rules

Analytics

Scheduling

Notifications
```

---

### Repositories

Responsible for:

```text id="p5a010"
Database Access
```

---

### SQLite

Responsible for:

```text id="p5a011"
Persistence Only
```

---

# 3. Navigation Contract

## Bottom Tabs

```text id="p5a012"
Today

Insights

Settings
```

---

## Stack Screens

```text id="p5a013"
Habit Detail

Habit Form

Activity Center
```

---

## Total Screens

```text id="p5a014"
6
```

---

# 4. Route Structure

```text id="p5a015"
/(tabs)

/(tabs)/index

/(tabs)/insights

/(tabs)/settings

/habit/[id]

/habit-form

/activity-center
```

---

# 5. Navigation Rules

## Habit Card

```ts id="p5a016"
router.push(`/habit/${habitId}`);
```

---

## FAB

```ts id="p5a017"
router.push("/habit-form");
```

---

## Bell Icon

```ts id="p5a018"
router.push("/activity-center");
```

---

## Notification Tap

```ts id="p5a019"
router.push(`/habit/${habitId}`);
```

---

# 6. Database Responsibility Matrix

## habits

Stores:

```text id="p5a020"
Habit Definitions

Habit Metadata

Frequency Configuration

Best Streak
```

---

Must NOT Store:

```text id="p5a021"
Current Streak

Completion Rate

Consistency Score

Next Due At
```

---

## habit_completions

Stores:

```text id="p5a022"
Completion History
```

---

## scheduled_notifications

Stores:

```text id="p5a023"
Expo Notification IDs

Notification Type
```

---

## activity_log

Stores:

```text id="p5a024"
Activity Center Events
```

---

## app_settings

Stores:

```text id="p5a025"
Permission State

Quiet Hours

Application Configuration
```

---

# 7. Database Schema Requirements

## habits

Required Fields:

```sql id="p5a026"
id TEXT PRIMARY KEY

name TEXT NOT NULL

emoji TEXT NOT NULL

frequency_data TEXT NOT NULL

best_streak INTEGER DEFAULT 0

created_at TEXT NOT NULL

updated_at TEXT NOT NULL
```

---

## habit_completions

Required Fields:

```sql id="p5a027"
id TEXT PRIMARY KEY

habit_id TEXT NOT NULL

completion_date TEXT NOT NULL

created_at TEXT NOT NULL
```

---

Constraint:

```sql id="p5a028"
UNIQUE(habit_id, completion_date)
```

---

Purpose:

```text id="p5a029"
One Completion

Per Habit

Per Day
```

---

## scheduled_notifications

Required Fields:

```sql id="p5a030"
id TEXT PRIMARY KEY

habit_id TEXT NOT NULL

notification_identifier TEXT NOT NULL

type TEXT NOT NULL
```

---

Allowed Types:

```text id="p5a031"
REMINDER

SNOOZE

TEST
```

---

## activity_log

Required Fields:

```sql id="p5a032"
id TEXT PRIMARY KEY

type TEXT NOT NULL

title TEXT NOT NULL

description TEXT

created_at TEXT NOT NULL
```

---

## app_settings

Required Fields:

```sql id="p5a033"
id TEXT PRIMARY KEY

quiet_hours_enabled INTEGER

quiet_hours_start TEXT

quiet_hours_end TEXT
```

---

# 8. Frequency Configuration Contract

Canonical Structure:

```json id="p5a034"
{
  "frequency": "weekly",
  "weekdays": [1, 3, 5],
  "times": ["08:00", "19:00"]
}
```

---

Supports:

```text id="p5a035"
Daily

Weekly

Multiple Reminder Times
```

---

Single source of truth.

---

# 9. Derived Data Rules

The following values MUST NEVER be persisted.

---

Do Not Store:

```text id="p5a036"
Current Streak

Completion Rate

Consistency Score

Next Due At

Today's Agenda

Upcoming Habits
```

---

Always derive from:

```text id="p5a037"
Habit Definitions

Completion History

Current Date

Current Time
```

---

# 10. ViewModel Layer

## Purpose

Keep UI independent from database structure.

---

Flow:

```text id="p5a038"
Repository

↓

Service

↓

ViewModel Mapper

↓

UI
```

---

# 11. HabitViewModel Contract

```ts id="p5a039"
type HabitViewModel = {
  id: string;

  name: string;

  emoji: string;

  currentStreak: number;

  bestStreak: number;

  completionRate: number;

  consistencyScore: number;

  nextDueAt: Date | null;

  completedToday: boolean;

  upcomingReminderCount: number;
};
```

---

## UI Rule

Screens consume:

```text id="p5a040"
HabitViewModel
```

only.

---

Never consume raw database entities.

---

# 12. Service Responsibilities

## HabitService

Owns:

```text id="p5a041"
Habit CRUD

Completion Logic

Current Streak

Best Streak Updates

Next Due Calculation

Upcoming Habits

Milestone Evaluation
```

---

Required Methods:

```ts id="p5a042"
createHabit();

updateHabit();

deleteHabit();

completeHabit();

calculateCurrentStreak();

calculateNextDueAt();

getUpcomingHabits();
```

---

## AnalyticsService

Owns:

```text id="p5a043"
Completion Rate

Consistency Score

Heatmap Data

Statistics
```

---

Required Methods:

```ts id="p5a044"
calculateCompletionRate();

calculateConsistency();

generateHeatmap();

generateStatistics();
```

---

## NotificationService

Owns:

```text id="p5a045"
Schedule

Reschedule

Cancel

Notification Routing

Deep Linking
```

---

Required Methods:

```ts id="p5a046"
scheduleHabitNotifications();

cancelHabitNotifications();

rescheduleHabitNotifications();

handleNotificationResponse();
```

---

## PushService

Owns:

```text id="p5a047"
Push Registration

Push Token Management

Push Helpers
```

---

Required Methods:

```ts id="p5a048"
registerForPush();

copyPushToken();

sendTestPush();
```

---

# 13. Repository Responsibilities

Repositories are the only layer allowed to interact with SQLite.

---

Allowed:

```text id="p5a049"
Read

Write

Delete
```

---

Not Allowed:

```text id="p5a050"
Business Logic

Analytics

Scheduling
```

---

# 14. Notification Architecture

## Core Principle

Local and Push notifications must share:

```text id="p5a051"
Payload

Deep Link Logic

Routing Logic

Destination Screens
```

---

This is the primary architectural differentiator.

---

# 15. Notification Payload Contract

Required Payload:

```json id="p5a052"
{
  "screen": "/habit",
  "habitId": "abc123"
}
```

---

Must be identical for:

```text id="p5a053"
Local Notifications

Push Notifications
```

---

# 16. Shared Notification Router

Single Source Of Truth:

```ts id="p5a054"
handleNotificationNavigation();
```

---

Responsibilities:

```text id="p5a055"
Validate Payload

Extract Habit ID

Verify Habit Exists

Navigate

Fallback Safely
```

---

Invalid Payload:

```json id="p5a056"
{
  "random": true
}
```

---

Fallback:

```text id="p5a057"
Today Screen
```

---

Never crash.

---

# 17. Today's Agenda Contract

Agenda derives from:

```text id="p5a058"
Frequency Data

Reminder Times

Current Date
```

---

Never derive from:

```text id="p5a059"
scheduled_notifications
```

---

Reason:

Notification table is not a scheduling source of truth.

---

# 18. Notification Scheduling Contract

## Create Habit

```text id="p5a060"
Save

↓

Schedule Notifications

↓

Store Notification IDs

↓

Success
```

---

## Edit Habit

```text id="p5a061"
Fetch IDs

↓

Cancel Existing

↓

Schedule New

↓

Store New IDs
```

---

## Delete Habit

```text id="p5a062"
Fetch IDs

↓

Cancel IDs

↓

Delete Habit
```

---

Never use:

```ts id="p5a063"
cancelAllScheduledNotificationsAsync();
```

---

# 19. Quiet Hours Contract

If enabled:

```text id="p5a064"
22:00

↓

07:00
```

---

Behavior:

```text id="p5a065"
Do Not Create Notifications
```

during blocked periods.

---

Do not:

```text id="p5a066"
Schedule Then Suppress
```

---

# 20. Activity Logging Contract

Events:

```text id="p5a067"
Reminder Fired

Habit Completed

Milestone Unlocked

Push Received
```

---

Stored In:

```text id="p5a068"
activity_log
```

---

Displayed In:

```text id="p5a069"
Activity Center
```

---

Retention:

```text id="p5a070"
30 Days
```

---

# 21. State Management

Library:

```text id="p5a071"
Zustand
```

---

## habitStore

State:

```ts id="p5a072"
habits;

selectedHabit;

loading;

error;
```

---

Actions:

```ts id="p5a073"
loadHabits();

createHabit();

updateHabit();

deleteHabit();

completeHabit();
```

---

## settingsStore

State:

```ts id="p5a074"
permissionStatus;

pushToken;

quietHours;
```

---

# 22. Component Contract

Components must:

```text id="p5a075"
Receive Data

Render Data

Emit Events
```

---

Components must NOT:

```text id="p5a076"
Query SQLite

Calculate Streaks

Calculate Analytics
```

---

# 23. Performance Rules

Lists:

```text id="p5a077"
FlatList
```

always.

---

Never use:

```text id="p5a078"
ScrollView
```

for habit collections.

---

Avoid:

```text id="p5a079"
Premature Memoization
```

---

Optimize only after measurement.

---

# 24. Accessibility Contract

Every interactive element must provide:

```text id="p5a080"
Accessibility Label

Accessibility Role

Accessibility Hint
```

---

Minimum Target:

```text id="p5a081"
48 × 48
```

---

Support:

```text id="p5a082"
Dynamic Font Scaling
```

---

# 25. Error Handling Contract

## Scheduling Failure

```text id="p5a083"
Failed to schedule reminder.

Try again.
```

---

## Push Registration Failure

```text id="p5a084"
Unable to register push notifications.
```

---

## Database Failure

Show retry UI.

---

## Deep Link Failure

Navigate:

```text id="p5a085"
Today Screen
```

---

Never crash.

---

# 26. Evidence Capture Checklist

Required before submission.

---

```text id="p5a086"
✓ Create Habit

✓ Reminder Scheduled

✓ Local Notification Fired

✓ Tap Local Notification

✓ Deep Link Works

✓ Push Sent

✓ Push Received

✓ Tap Push

✓ Same Deep Link Destination

✓ Foreground Notification

✓ Background Notification
```

---

# 27. AI Coding Agent Rules

Always:

```text id="p5a087"
Build Services First
```

---

Always:

```text id="p5a088"
Build Reusable Components Before Screens
```

---

Always:

```text id="p5a089"
Use Shared Notification Router
```

---

Never:

```text id="p5a090"
Duplicate Notification Logic
```

---

Never:

```text id="p5a091"
Mix UI With Business Logic
```

---

Never:

```text id="p5a092"
Call Expo APIs Directly From Screens
```

---

# 28. Definition Of Done

Project is complete only when:

```text id="p5a093"
✓ Habit CRUD Works

✓ SQLite Persists Data

✓ Local Notifications Work

✓ Push Notifications Work

✓ Shared Notification Pipeline Works

✓ Deep Linking Works

✓ Permission Recovery Works

✓ Activity Center Works

✓ Insights Work

✓ Notification Health Works

✓ No Auto-Fail Conditions

✓ Evidence Recorded
```

---

# 29. Final Implementation Priority

## P0

```text id="p5a094"
Habit CRUD

SQLite

Notifications

Deep Linking

Permissions
```

---

## P1

```text id="p5a095"
Hero Card

Progress

Activity Center

Heatmap

Milestones
```

---

## P2

```text id="p5a096"
Snooze

Badge Count

Tiny Push Server

Image Push
```

---

# 30. Final Architectural Statement

The application is an **offline-first habit tracking platform** built using SQLite, Zustand, Expo Notifications, and Expo Router.

Local notifications and push notifications share:

```text id="p5a097"
Payload Contract

Notification Routing

Deep-Link Handling

Destination Screens
```

through a single notification pipeline.

This shared notification architecture is the primary technical differentiator of the project and serves as the core demonstration of notification lifecycle mastery.

---

# Phase 5 Status

```text id="p5a098"
FROZEN
```

The product architecture, UX architecture, design system, interaction model, and implementation blueprint are now finalized and ready for development.
