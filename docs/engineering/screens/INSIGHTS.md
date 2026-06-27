---
title: Insights
type: Screen Specification
status: Frozen
version: 1.0

depends_on:

- foundation/DESIGN_SYSTEM.md
- foundation/THEME_TOKENS.md
- foundation/MOTION.md
- foundation/ACCESSIBILITY.md

used_components:

- components/HEATMAP_CARD.md
- components/INSIGHT_CARD.md
- components/EMPTY_STATE.md

react_screen:

InsightsScreen.tsx
---

# Purpose

The Insights screen provides users with a high-level overview of their habit performance and consistency.

It transforms historical habit data into meaningful, actionable insights that motivate long-term consistency.

The screen is informational only.

---

# Responsibilities

The screen SHALL:

- Display consistency analytics.
- Display a 30-day heatmap.
- Display key performance metrics.
- Display trend insights.
- Display achievement summaries.
- Support pull-to-refresh.

The screen SHALL NOT:

- Edit habits.
- Calculate statistics.
- Query persistence.
- Manage business logic.

Business logic belongs to InsightsViewModel.

---

# Entry Points

Bottom Navigation

Today Screen (optional)

Milestone Card (optional)

---

# Exit Points

Today

Settings

Back Navigation (future)

---

# Screen Composition

```
SafeArea

└── ScrollView

    ├── Header

    ├── Overview Metrics

    ├── Heatmap

    ├── Insight Cards

    ├── Achievement Summary

    ├── Empty State (conditional)

    └── Bottom Spacer
```

---

# Component Mapping

| UI Section | Specification | React Component |
|------------|---------------|-----------------|
| Heatmap | components/HEATMAP_CARD.md | HeatmapCard.tsx |
| Insight Metric | components/INSIGHT_CARD.md | InsightCard.tsx |
| Empty State | components/EMPTY_STATE.md | EmptyState.tsx |

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

Optional Date Range

Current Version

Last 30 Days

No user-editable filters in V1.

---

# Overview Metrics

Displays

Current Streak

Best Streak

Completion Rate

Completed Habits

Total Habits

Displayed using InsightCard components.

---

# Heatmap

Uses

HeatmapCard.tsx

Displays

Last 30 Days only.

Color intensity determined by completion percentage.

Heatmap window is fixed.

No custom date range.

---

# Insight Cards

Displays

Most Consistent Habit

Least Consistent Habit

Weekly Average

Longest Active Habit

Average Daily Completion

Cards displayed vertically.

Order determined by product design.

---

# Achievement Summary

Displays

Latest Milestone

Current Level

Next Milestone

Uses existing milestone data.

Read only.

---

# Empty State

Uses

EmptyState.tsx

Shown when

User has insufficient historical data.

Primary CTA

Return to Today

Secondary CTA

Hidden

---

# Pull To Refresh

Supported

Yes

Refreshes analytics only.

Existing content remains visible.

---

# Screen States

## Loading

Display

Heatmap Skeleton

Insight Skeletons

Overview Skeleton

---

## Ready

Normal analytics.

---

## Empty

Display

EmptyState

Hide analytics.

---

## Refreshing

Show refresh indicator.

Preserve existing data.

---

## Error

Display generic error state.

Retry optional.

---

# Navigation

| Interaction | Destination |
|------------|----------------|
| Bottom Navigation | Selected Screen |
| Insight Card | None (V1) |
| Heatmap Day | Optional Detail (Future) |
| Empty CTA | Today |

---

# Data Dependencies

Provided by

InsightsViewModel

Includes

- Heatmap Data
- Current Streak
- Best Streak
- Completion Rate
- Achievement Summary
- Insight Metrics
- Loading State

The screen performs no calculations.

---

# Motion

Uses

foundation/MOTION.md

Screen Transition

Standard

Cards

Standard Card Entrance

Refresh

Platform Default

No custom looping animations.

---

# Accessibility

Uses

foundation/ACCESSIBILITY.md

Additional Rules

Heatmap

Every day announced individually.

Insight Cards

Announce title and value.

Pull-to-refresh

Accessible action.

---

# Dark Mode

All visual elements use semantic theme tokens.

No screen-specific colors.

---

# Performance

Must

✓ Memoize all Insight Cards

✓ Memoize Heatmap

✓ Preserve scroll position

✓ Avoid unnecessary re-renders

✓ Refresh incrementally

---

# Acceptance Criteria

✓ Matches approved UI

✓ Uses approved reusable components

✓ Fixed 30-day heatmap

✓ Responsive

✓ Accessible

✓ Token driven

✓ Dark mode verified

✓ Business logic isolated in ViewModel

✓ No hardcoded visual values