// ─────────────────────────────────────────────
// CompletionRepository
// ─────────────────────────────────────────────

import { getDatabase } from "@/database";
import type { HabitCompletion } from "@/types/habit";

export class CompletionRepository {
  private get db() {
    return getDatabase();
  }

  /**
   * Records a completion for today.
   * Silently ignores duplicates (UNIQUE constraint on habit_id + date).
   * Returns true if a new row was inserted.
   */
  recordCompletion(completion: HabitCompletion): boolean {
    const result = this.db.runSync(
      `INSERT OR IGNORE INTO habit_completions
         (id, habit_id, completed_at, completion_date)
       VALUES (?, ?, ?, ?)`,
      [
        completion.id,
        completion.habit_id,
        completion.completed_at,
        completion.completion_date,
      ],
    );

    return result.changes > 0;
  }

  /** Check if a habit was completed on a specific date ("YYYY-MM-DD"). */
  isCompletedOnDate(habitId: string, date: string): boolean {
    const row = this.db.getFirstSync<{ count: number }>(
      `SELECT COUNT(*) AS count
       FROM habit_completions
       WHERE habit_id = ? AND completion_date = ?`,
      [habitId, date],
    );

    return (row?.count ?? 0) > 0;
  }

  /**
   * Returns completions for a habit within a date range.
   * Both dates are inclusive "YYYY-MM-DD" strings.
   */
  findByHabitAndDateRange(
    habitId: string,
    from: string,
    to: string,
  ): HabitCompletion[] {
    return this.db.getAllSync<HabitCompletion>(
      `SELECT *
       FROM habit_completions
       WHERE habit_id = ?
         AND completion_date BETWEEN ? AND ?
       ORDER BY completion_date DESC`,
      [habitId, from, to],
    );
  }

  /** Returns the most recent N completions for a habit. */
  findRecent(habitId: string, limit: number): HabitCompletion[] {
    return this.db.getAllSync<HabitCompletion>(
      `SELECT *
       FROM habit_completions
       WHERE habit_id = ?
       ORDER BY completion_date DESC
       LIMIT ?`,
      [habitId, limit],
    );
  }

  /** All distinct completion dates for a habit (for streak calculation). */
  findAllDates(habitId: string): string[] {
    const rows = this.db.getAllSync<{ completion_date: string }>(
      `SELECT completion_date
       FROM habit_completions
       WHERE habit_id = ?
       ORDER BY completion_date DESC`,
      [habitId],
    );

    return rows.map((r) => r.completion_date);
  }

  /**
   * Returns daily completion counts aggregated across all habits
   * for the heatmap. Date range is inclusive.
   */
  getDailyCountsForHeatmap(
    from: string,
    to: string,
  ): { date: string; count: number }[] {
    return this.db.getAllSync<{ date: string; count: number }>(
      `SELECT completion_date AS date, COUNT(*) AS count
       FROM habit_completions
       WHERE completion_date BETWEEN ? AND ?
       GROUP BY completion_date`,
      [from, to],
    );
  }

  /** Total completions across all habits. */
  getTotalCount(): number {
    const row = this.db.getFirstSync<{ count: number }>(
      "SELECT COUNT(*) AS count FROM habit_completions",
    );

    return row?.count ?? 0;
  }
}

export const completionRepository = new CompletionRepository();
