// ─────────────────────────────────────────────
// Strivo — Habit Types
// Source of truth for all habit-related models.
// ─────────────────────────────────────────────

export type FrequencyType = "daily" | "weekly";

export interface FrequencyData {
  frequency: FrequencyType;
  /** ISO weekday numbers: 1=Mon … 7=Sun. Empty means every day. */
  weekdays: number[];
  /** "HH:mm" 24-hour strings, e.g. ["08:00", "13:00", "19:00"] */
  times: string[];
}

/** Raw DB model — matches the SQLite habits row exactly. */
export interface Habit {
  id: string;
  name: string;
  emoji: string;
  frequency_type: FrequencyType;
  frequency_data: string; // JSON-serialised FrequencyData
  best_streak: number;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
}

/** Parsed, UI-ready model produced by the ViewModel layer. */
export interface HabitViewModel {
  id: string;
  name: string;
  emoji: string;
  frequencyData: FrequencyData;
  currentStreak: number;
  bestStreak: number;
  completionRate: number; // 0–100
  consistencyScore: number; // 0–100
  completedToday: boolean;
  nextDueAt: Date | null;
  /** Formatted next-due string, e.g. "7:00 PM" or "Tomorrow 8:00 AM" */
  nextDueLabel: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitFormData {
  name: string;
  emoji: string;
  frequencyType: FrequencyType;
  weekdays: number[]; // relevant only for "weekly"
  reminderTimes: string[]; // "HH:mm" strings
}

/** Completion record stored in habit_completions. */
export interface HabitCompletion {
  id: string;
  habit_id: string;
  completed_at: string; // ISO 8601
  completion_date: string; // "YYYY-MM-DD"
}
