// ─────────────────────────────────────────────
// HabitService
// Core habit lifecycle: CRUD, completion, streaks,
// next-due calculation, milestone evaluation.
// ─────────────────────────────────────────────

import { format, parseISO, subDays } from "date-fns";
import * as Crypto from "expo-crypto";

import { habitRepository } from "@/repositories/HabitRepository";
import { completionRepository } from "@/repositories/CompletionRepository";
import { activityRepository } from "@/repositories/ActivityRepository";
import { MILESTONES } from "@/constants/milestones";

import type {
  Habit,
  HabitCompletion,
  HabitFormData,
  FrequencyData,
} from "@/types/habit";

// ── Helpers ───────────────────────────────────────────────────────────

function uuid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function todayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

function serializeFrequency(form: HabitFormData): FrequencyData {
  return {
    frequency: form.frequencyType,
    weekdays: form.frequencyType === "weekly" ? form.weekdays : [],
    times: form.reminderTimes,
  };
}

// ── Streak Calculation ────────────────────────────────────────────────

/**
 * Computes the current streak from a sorted DESC list of completion dates.
 * A streak is broken when there's a gap of more than one day.
 */
export function calculateCurrentStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const today = todayISO();
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

  // Streak must include today or yesterday to be "current"
  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = parseISO(dates[i - 1]);
    const curr = parseISO(dates[i]);

    const diffDays = Math.round(
      (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// ── Public API ────────────────────────────────────────────────────────

export class HabitService {
  /** Create a new habit and persist it. Returns the new habit id. */
  createHabit(form: HabitFormData): string {
    const id = uuid();
    const now = new Date().toISOString();

    const habit: Habit = {
      id,
      name: form.name.trim(),
      emoji: form.emoji,
      frequency_type: form.frequencyType,
      frequency_data: JSON.stringify(serializeFrequency(form)),
      best_streak: 0,
      created_at: now,
      updated_at: now,
    };

    habitRepository.create(habit);

    activityRepository.log({
      id: uuid(),
      type: "habit_completed",
      title: `${form.emoji} Habit created: ${form.name}`,
      subtitle: `${form.reminderTimes.length} reminder${
        form.reminderTimes.length !== 1 ? "s" : ""
      } scheduled`,
      created_at: now,
    });

    return id;
  }

  /** Update an existing habit. */
  updateHabit(id: string, form: HabitFormData): void {
    const now = new Date().toISOString();

    habitRepository.update(id, {
      name: form.name.trim(),
      emoji: form.emoji,
      frequency_type: form.frequencyType,
      frequency_data: JSON.stringify(serializeFrequency(form)),
      updated_at: now,
    });
  }

  /** Delete a habit and all its related data. */
  deleteHabit(id: string): void {
    // ON DELETE CASCADE handles completions + notifications in DB.
    habitRepository.delete(id);
  }

  /** Fetch raw habit by id. */
  getHabit(id: string): Habit | null {
    return habitRepository.findById(id);
  }

  /** Fetch all habits. */
  getAllHabits(): Habit[] {
    return habitRepository.findAll();
  }

  /**
   * Mark a habit as done for today.
   * Idempotent — safe to call multiple times.
   * Returns true if this was a new completion.
   */
  completeHabit(habitId: string): boolean {
    const habit = habitRepository.findById(habitId);

    if (!habit) return false;

    const today = todayISO();
    const now = new Date().toISOString();

    const completion: HabitCompletion = {
      id: uuid(),
      habit_id: habitId,
      completed_at: now,
      completion_date: today,
    };

    const inserted = completionRepository.recordCompletion(completion);

    if (!inserted) return false;

    const dates = completionRepository.findAllDates(habitId);
    const currentStreak = calculateCurrentStreak(dates);

    if (currentStreak > habit.best_streak) {
      habitRepository.update(habitId, {
        best_streak: currentStreak,
        updated_at: now,
      });
    }

    activityRepository.log({
      id: uuid(),
      type: "habit_completed",
      title: `${habit.emoji} ${habit.name} completed`,
      subtitle: `${currentStreak} day streak`,
      created_at: now,
    });

    this._checkMilestone(habit, currentStreak, now);

    return true;
  }

  /** Returns true if the habit has been completed today. */
  isCompletedToday(habitId: string): boolean {
    return completionRepository.isCompletedOnDate(habitId, todayISO());
  }

  /**
   * Calculates the next reminder time for a habit relative to now.
   * Returns null if no times are configured.
   */
  calculateNextDueAt(frequencyData: FrequencyData): Date | null {
    if (frequencyData.times.length === 0) return null;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const sortedTimes = [...frequencyData.times].sort();

    for (const t of sortedTimes) {
      const [h, m] = t.split(":").map(Number);

      const candidate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        h,
        m,
      );

      if (candidate > now) {
        return candidate;
      }
    }

    const [h, m] = sortedTimes[0].split(":").map(Number);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(h, m, 0, 0);

    return tomorrow;
  }

  /** Returns habits that are scheduled for today, sorted by next reminder. */
  getTodaysHabits(): Habit[] {
    const all = habitRepository.findAll();
    const todayWeekday = new Date().getDay() === 0 ? 7 : new Date().getDay();

    return all.filter((habit) => {
      const frequencyData: FrequencyData = JSON.parse(habit.frequency_data);

      if (frequencyData.frequency === "daily") {
        return true;
      }

      return (
        frequencyData.weekdays.length === 0 ||
        frequencyData.weekdays.includes(todayWeekday)
      );
    });
  }

  // ── Private ────────────────────────────────────────────────────────

  private _checkMilestone(habit: Habit, streak: number, now: string): void {
    if (!MILESTONES.includes(streak as (typeof MILESTONES)[number])) {
      return;
    }

    activityRepository.log({
      id: uuid(),
      type: "milestone_unlocked",
      title: `🏆 ${streak} Day Streak Unlocked!`,
      subtitle: `${habit.emoji} ${habit.name} • Next: ${
        MILESTONES.find((m) => m > streak) ?? "∞"
      } Days`,
      metadata: JSON.stringify({
        habitId: habit.id,
        days: streak,
      }),
      created_at: now,
    });
  }
}

export const habitService = new HabitService();
