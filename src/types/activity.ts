// ─────────────────────────────────────────────
// Strivo — Activity Types
// ─────────────────────────────────────────────

export type ActivityType =
  | "reminder_sent"
  | "push_received"
  | "habit_completed"
  | "milestone_unlocked";

export interface ActivityLog {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  metadata?: string; // JSON blob for extra context
  created_at: string; // ISO 8601
}

/** Parsed, UI-ready activity model. */
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
  /** "opened_from_reminder" badge label */
  badge?: string;
}

export type ActivityGroup = {
  label: "Today" | "Yesterday" | "Earlier";
  dateRange?: string; // e.g. "May 12 – May 15"
  items: ActivityItem[];
  collapsed?: boolean;
};
