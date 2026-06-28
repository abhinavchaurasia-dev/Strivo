// ─────────────────────────────────────────────
// Strivo — Analytics Types
// ─────────────────────────────────────────────

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  bestStreak: number;
  /** Completed / scheduled * 100, rounded to nearest integer */
  completionRate: number;
  /** Completed / expected * 100, accounts for missed days */
  consistencyScore: number;
  totalCompletions: number;
}

export interface InsightsData {
  currentStreak: number;
  bestStreak: number;
  bestStreakDate: string | null;
  completionRate: number; // overall across all habits
  completionRateDelta: number; // vs last month (positive = improvement)
  consistencyScore: number;
  totalCompletions: number;
  heatmapData: HeatmapCell[];
  milestones: MilestoneStatus[];
}

export interface HeatmapCell {
  date: string; // "YYYY-MM-DD"
  /** 0 = none, 1 = low, 2 = medium, 3 = high, 4 = very high */
  level: 0 | 1 | 2 | 3 | 4;
  count: number;
}

export interface MilestoneStatus {
  days: number;
  achieved: boolean;
  achievedAt?: string; // ISO date when first unlocked
}
