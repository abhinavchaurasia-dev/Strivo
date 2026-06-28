// ─────────────────────────────────────────────
// Strivo — Notification Types
// Shared contract for local AND push notifications.
// ─────────────────────────────────────────────

/** Canonical payload embedded in every notification (local + push). */
export interface NotificationPayload {
  screen: "/habit";
  habitId: string;
}

export type ScheduledNotificationType = "REMINDER" | "SNOOZE";

export interface ScheduledNotification {
  id: string;
  habit_id: string;
  notification_id: string; // Expo notification identifier
  type: ScheduledNotificationType;
  created_at: string; // ISO 8601
}

export interface NotificationPermissionState {
  granted: boolean;
  canAskAgain: boolean;
  checked: boolean;
}
