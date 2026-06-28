// ─────────────────────────────────────────────
// HabitRepository
// All CRUD for the habits table.
// ─────────────────────────────────────────────

import { getDatabase } from "@/database";
import type { Habit } from "@/types/habit";

export class HabitRepository {
  private get db() {
    return getDatabase();
  }

  /** Insert a new habit row. */
  create(habit: Habit): void {
    this.db.runSync(
      `INSERT INTO habits
        (id, name, emoji, frequency_type, frequency_data, best_streak, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        habit.id,
        habit.name,
        habit.emoji,
        habit.frequency_type,
        habit.frequency_data,
        habit.best_streak,
        habit.created_at,
        habit.updated_at,
      ],
    );
  }

  /** Fetch a single habit by id. Returns null if not found. */
  findById(id: string): Habit | null {
    return (
      this.db.getFirstSync<Habit>("SELECT * FROM habits WHERE id = ?", [id]) ??
      null
    );
  }

  /** Fetch all habits, ordered by created_at DESC. */
  findAll(): Habit[] {
    return this.db.getAllSync<Habit>(
      "SELECT * FROM habits ORDER BY created_at DESC",
    );
  }

  /** Update mutable fields of a habit. */
  update(
    id: string,
    patch: Partial<
      Pick<
        Habit,
        | "name"
        | "emoji"
        | "frequency_type"
        | "frequency_data"
        | "best_streak"
        | "updated_at"
      >
    >,
  ): void {
    const sets: string[] = [];
    const values: unknown[] = [];

    if (patch.name !== undefined) {
      sets.push("name = ?");
      values.push(patch.name);
    }
    if (patch.emoji !== undefined) {
      sets.push("emoji = ?");
      values.push(patch.emoji);
    }
    if (patch.frequency_type !== undefined) {
      sets.push("frequency_type = ?");
      values.push(patch.frequency_type);
    }
    if (patch.frequency_data !== undefined) {
      sets.push("frequency_data = ?");
      values.push(patch.frequency_data);
    }
    if (patch.best_streak !== undefined) {
      sets.push("best_streak = ?");
      values.push(patch.best_streak);
    }
    if (patch.updated_at !== undefined) {
      sets.push("updated_at = ?");
      values.push(patch.updated_at);
    }

    if (sets.length === 0) return;

    values.push(id);

    this.db.runSync(
      `UPDATE habits SET ${sets.join(", ")} WHERE id = ?`,
      values,
    );
  }

  /** Hard delete a habit (cascades to completions + notifications via FK). */
  delete(id: string): void {
    this.db.runSync("DELETE FROM habits WHERE id = ?", [id]);
  }
}

export const habitRepository = new HabitRepository();
