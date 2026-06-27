---
title: Settings
type: Screen Specification
status: Frozen
version: 1.0

depends_on:

- foundation/DESIGN_SYSTEM.md
- foundation/THEME_TOKENS.md
- foundation/MOTION.md
- foundation/ACCESSIBILITY.md

used_components:

- components/EMPTY_STATE.md

react_screen:

SettingsScreen.tsx
---

# Purpose

The Settings screen allows users to configure application preferences, manage permissions, access support resources, and view application information.

The screen is organized into logical groups to make settings easy to discover and maintain.

Business logic belongs to SettingsViewModel.

---

# Responsibilities

The screen SHALL:

- Display application preferences.
- Manage notification settings.
- Manage appearance settings.
- Provide access to support resources.
- Display application information.
- Provide legal and privacy links.

The screen SHALL NOT:

- Schedule notifications.
- Manage permissions directly.
- Perform backup operations.
- Implement business logic.

---

# Entry Points

Bottom Navigation

↓

Settings Tab

---

# Exit Points

Today

Insights

External Browser

System Settings

---

# Screen Composition

```
SafeArea

└── ScrollView

    ├── Header

    ├── Preferences Section

    ├── Notifications Section

    ├── Appearance Section

    ├── Support Section

    ├── About Section

    ├── Legal Section

    └── Bottom Spacer
```

---

# Layout Rules

Safe Area

Required

Scrollable

Vertical

Horizontal Padding

theme.spacing.screenHorizontal

Vertical Section Gap

theme.spacing.section

Bottom Padding

Must clear Bottom Navigation.

---

# Header

Contains

Screen Title

Optional App Logo

Title

Settings

Subtitle

Optional

Customize your experience

---

# Preferences Section

Displays

Week Start Day

Default Habit Reminder

Time Format

Future preferences may be added without changing screen structure.

---

# Notifications Section

Displays

Notifications Enabled

Reminder Notifications

Milestone Notifications

Each preference uses a standard switch control.

When notifications are disabled at the system level, display a helper message with an action to open system settings.

---

# Appearance Section

Displays

Theme

Options

System

Light

Dark

Changes apply immediately.

---

# Support Section

Displays

Help Center

Contact Support

Send Feedback

Rate Strivo

Each item opens the appropriate destination.

---

# About Section

Displays

App Version

Build Number

Open Source Licenses

Acknowledgements (optional)

All information is read-only.

---

# Legal Section

Displays

Privacy Policy

Terms of Service

Licenses

Each item opens an external browser.

---

# Screen States

## Loading

Display skeleton rows.

---

## Ready

Display all available settings.

---

## Empty

Not applicable.

---

## Error

Display generic error message.

Retry optional.

---

# Navigation

| Interaction | Destination |
|------------|----------------|
| Theme | Apply Theme |
| Notification Settings | System Settings |
| Help Center | External Browser |
| Contact Support | Email / Support |
| Privacy Policy | External Browser |
| Terms of Service | External Browser |
| Licenses | License Screen / External |

---

# Data Dependencies

Provided by

SettingsViewModel

Includes

- Theme Preference
- Notification Status
- App Version
- Build Number
- External Links
- Loading State

The screen performs no calculations.

---

# Motion

Uses

foundation/MOTION.md

Screen Transition

Standard

Switches

Platform default

Navigation

Standard push transition

No custom animations.

---

# Accessibility

Uses

foundation/ACCESSIBILITY.md

Additional Rules

Every setting row

Accessible

Every switch

Announces current state

External links

Announce

"Opens external browser"

---

# Dark Mode

Uses semantic theme tokens only.

Theme switching updates immediately.

---

# Performance

Must

✓ Lazy render long sections

✓ Memoize setting rows

✓ Avoid unnecessary re-renders

✓ Preserve scroll position

---

# Acceptance Criteria

✓ Matches approved Settings UI

✓ Responsive

✓ Accessible

✓ Token driven

✓ Dark mode verified

✓ Uses semantic theme tokens

✓ Business logic isolated in ViewModel

✓ No hardcoded visual values