// ─────────────────────────────────────────────
// ActivityRepository
// Stores and retrieves activity_log entries.
// ─────────────────────────────────────────────

import { getDatabase } from "@/database";
import type { ActivityLog, ActivityType } from "@/types/activity";

export class ActivityRepository {
  private get db() {
    return getDatabase();
  }

  /** Insert an activity log entry. */
  log(entry: ActivityLog): void {
    this.db.runSync(
      `INSERT INTO activity_log(id, type, title, subtitle, metadata, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        entry.id,
        entry.type,
        entry.title,
        entry.subtitle ?? null,
        entry.metadata ?? null,
        entry.created_at,
      ],
    );
  }

  /**
   * Returns the most recent N entries, ordered newest first.
   * Optionally filter by activity type.
   */
  findRecent(limit = 50, type?: ActivityType): ActivityLog[] {
    if (type) {
      return this.db.getAllSync<ActivityLog>(
        `SELECT * FROM activity_log
         WHERE type = ?
         ORDER BY created_at DESC
         LIMIT ?`,
        [type, limit],
      );
    }

    return this.db.getAllSync<ActivityLog>(
      `SELECT *
       FROM activity_log
       ORDER BY created_at DESC
       LIMIT ?`,
      [limit],
    );
  }

  /** Entries on a specific calendar date "YYYY-MM-DD". */
  findByDate(date: string): ActivityLog[] {
    return this.db.getAllSync<ActivityLog>(
      `SELECT *
       FROM activity_log
       WHERE DATE(created_at) = ?
       ORDER BY created_at DESC`,
      [date],
    );
  }

  /** Purge entries older than N days to prevent unbounded growth. */
  pruneOlderThan(days: number): void {
    this.db.runSync(
      `DELETE FROM activity_log
       WHERE created_at < datetime('now', ? || ' days')`,
      [`-${days}`],
    );
  }
}

export const activityRepository = new ActivityRepository();
