// ─────────────────────────────────────────────
// NotificationRepository
// Tracks Expo notification IDs per habit.
// ─────────────────────────────────────────────

import { getDatabase } from "@/database";
import type { ScheduledNotification } from "@/types/notification";

export class NotificationRepository {
  private get db() {
    return getDatabase();
  }

  /** Save one or many notification records for a habit. */
  saveMany(records: ScheduledNotification[]): void {
    this.db.withTransactionSync(() => {
      for (const r of records) {
        this.db.runSync(
          `INSERT OR REPLACE INTO scheduled_notifications
             (id, habit_id, notification_id, type, created_at)
           VALUES (?, ?, ?, ?, ?)`,
          [r.id, r.habit_id, r.notification_id, r.type, r.created_at],
        );
      }
    });
  }

  /** Returns all Expo notification IDs for a given habit. */
  findByHabitId(habitId: string): ScheduledNotification[] {
    return this.db.getAllSync<ScheduledNotification>(
      "SELECT * FROM scheduled_notifications WHERE habit_id = ?",
      [habitId],
    );
  }

  /** Delete all notification records for a habit (call before rescheduling). */
  deleteByHabitId(habitId: string): void {
    this.db.runSync("DELETE FROM scheduled_notifications WHERE habit_id = ?", [
      habitId,
    ]);
  }

  /** Delete a single record by Expo notification identifier. */
  deleteByNotificationId(notificationId: string): void {
    this.db.runSync(
      "DELETE FROM scheduled_notifications WHERE notification_id = ?",
      [notificationId],
    );
  }
}

export const notificationRepository = new NotificationRepository();
