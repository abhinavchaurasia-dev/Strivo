// ─────────────────────────────────────────────
// AnalyticsService
// Streak calculation, heatmap, completion rate,
// consistency score, milestone status.
// ─────────────────────────────────────────────

import { format, subDays, eachDayOfInterval, parseISO } from "date-fns";

import { completionRepository } from "@/repositories/CompletionRepository";
import { habitRepository } from "@/repositories/HabitRepository";
import { calculateCurrentStreak } from "./HabitService";
import { MILESTONES } from "@/constants/milestones";

import type {
  InsightsData,
  HeatmapCell,
  MilestoneStatus,
} from "@/types/analytics";

// ── Helpers ───────────────────────────────────────────

function todayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

function daysAgoISO(days: number) {
  return format(subDays(new Date(), days), "yyyy-MM-dd");
}

function levelFromCount(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (max === 0) return 0;

  const pct = count / max;

  if (pct <= 0.25) return 1;
  if (pct <= 0.5) return 2;
  if (pct <= 0.75) return 3;

  return 4;
}

// ── Service ───────────────────────────────────────────

export class AnalyticsService {
  /**
   * Builds the full InsightsData object consumed by InsightsViewModel.
   * All calculations happen here — the ViewModel is a pure pass-through.
   */
  buildInsightsData(): InsightsData {
    const habits = habitRepository.findAll();

    // ── Streaks ───────────────────────────────────────
    let bestStreak = 0;
    let bestStreakDate: string | null = null;
    let highestCurrentStreak = 0;

    for (const habit of habits) {
      const dates = completionRepository.findAllDates(habit.id);
      const current = calculateCurrentStreak(dates);

      if (current > highestCurrentStreak) {
        highestCurrentStreak = current;
      }

      if (habit.best_streak > bestStreak) {
        bestStreak = habit.best_streak;
        bestStreakDate = dates[0] ?? null;
      }
    }

    // ── Completion Rate ───────────────────────────────
    const today = todayISO();
    const thirtyDaysAgo = daysAgoISO(30);

    const scheduledDays = 30 * habits.length;

    const totalInPeriod = completionRepository
      .getDailyCountsForHeatmap(thirtyDaysAgo, today)
      .reduce((sum, row) => sum + row.count, 0);

    const completionRate =
      scheduledDays > 0 ? Math.round((totalInPeriod / scheduledDays) * 100) : 0;

    // ── Completion Rate Delta ─────────────────────────
    const sixtyDaysAgo = daysAgoISO(60);

    const priorTotal = completionRepository
      .getDailyCountsForHeatmap(sixtyDaysAgo, daysAgoISO(31))
      .reduce((sum, row) => sum + row.count, 0);

    const priorRate =
      scheduledDays > 0 ? Math.round((priorTotal / scheduledDays) * 100) : 0;

    const completionRateDelta = completionRate - priorRate;

    // ── Consistency Score ─────────────────────────────
    const daysWithActivity = completionRepository
      .getDailyCountsForHeatmap(thirtyDaysAgo, today)
      .filter((row) => row.count > 0).length;

    const consistencyScore = Math.round((daysWithActivity / 30) * 100);

    // ── Heatmap ───────────────────────────────────────
    const dailyCounts = completionRepository.getDailyCountsForHeatmap(
      thirtyDaysAgo,
      today,
    );

    const countMap = new Map(dailyCounts.map((row) => [row.date, row.count]));

    const maxCount = Math.max(...dailyCounts.map((row) => row.count), 0);

    const allDays = eachDayOfInterval({
      start: parseISO(thirtyDaysAgo),
      end: parseISO(today),
    });

    const heatmapData: HeatmapCell[] = allDays.map((day) => {
      const date = format(day, "yyyy-MM-dd");
      const count = countMap.get(date) ?? 0;

      return {
        date,
        count,
        level: levelFromCount(count, maxCount),
      };
    });

    // ── Milestones ────────────────────────────────────
    const milestones: MilestoneStatus[] = MILESTONES.map((days) => ({
      days,
      achieved: bestStreak >= days,
      achievedAt:
        bestStreak >= days ? (bestStreakDate ?? undefined) : undefined,
    }));

    return {
      currentStreak: highestCurrentStreak,
      bestStreak,
      bestStreakDate,
      completionRate: Math.min(completionRate, 100),
      completionRateDelta,
      consistencyScore: Math.min(consistencyScore, 100),
      totalCompletions: completionRepository.getTotalCount(),
      heatmapData,
      milestones,
    };
  }

  /** Per-habit stats (used by HabitDetailViewModel). */
  getHabitStats(habitId: string) {
    const dates = completionRepository.findAllDates(habitId);
    const habit = habitRepository.findById(habitId);

    if (!habit) return null;

    const currentStreak = calculateCurrentStreak(dates);

    const from = daysAgoISO(30);
    const to = todayISO();

    const inPeriod = completionRepository.findByHabitAndDateRange(
      habitId,
      from,
      to,
    ).length;

    const completionRate = Math.round((inPeriod / 30) * 100);
    const consistencyScore = completionRate;

    return {
      habitId,
      currentStreak,
      bestStreak: habit.best_streak,
      completionRate: Math.min(completionRate, 100),
      consistencyScore: Math.min(consistencyScore, 100),
      totalCompletions: dates.length,
    };
  }

  /**
   * Returns the completion status for the last N days.
   * Used for the recent-activity calendar on Habit Detail.
   */
  getRecentActivity(
    habitId: string,
    days = 7,
  ): {
    date: string;
    label: string;
    completed: boolean;
  }[] {
    const today = new Date();

    return Array.from({ length: days }, (_, index) => {
      const day = subDays(today, index);
      const date = format(day, "yyyy-MM-dd");
      const label = index === 0 ? "Today" : format(day, "EEE");

      return {
        date,
        label,
        completed: completionRepository.isCompletedOnDate(habitId, date),
      };
    });
  }
}

export const analyticsService = new AnalyticsService();
