// ─────────────────────────────────────────────
// HabitDetailViewModel
// ─────────────────────────────────────────────

import { useMemo } from "react";

import { habitService } from "@/services/HabitService";
import { analyticsService } from "@/services/AnalyticsService";
import { notificationRepository } from "@/repositories/NotificationRepository";
import { MILESTONES } from "@/constants/milestones";

import type { FrequencyData } from "@/types/habit";

export interface RecentActivityDay {
  label: string;
  date: string;
  completed: boolean;
}

export interface MilestoneItem {
  days: number;
  achieved: boolean;
  isCurrent: boolean;
  locked: boolean;
}

export interface ReminderItem {
  time: string;
  active: boolean;
}

export interface HabitDetailState {
  id: string;
  name: string;
  emoji: string;

  currentStreak: number;
  bestStreak: number;

  completionRate: number;
  consistencyScore: number;

  completedToday: boolean;

  recentActivity: RecentActivityDay[];
  completedInWeek: number;

  milestones: MilestoneItem[];

  nextMilestoneDays: number;
  nextMilestoneGap: number;

  reminders: ReminderItem[];

  frequencyLabel: string;

  loading: boolean;
  notFound: boolean;
}

function formatTime12Hour(time: string): string {
  const [hour, minute] = time.split(":").map(Number);

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function useHabitDetailViewModel(habitId: string): HabitDetailState {
  return useMemo(() => {
    const habit = habitService.getHabit(habitId);

    if (!habit) {
      return {
        id: habitId,
        name: "",
        emoji: "",

        currentStreak: 0,
        bestStreak: 0,

        completionRate: 0,
        consistencyScore: 0,

        completedToday: false,

        recentActivity: [],
        completedInWeek: 0,

        milestones: [],

        nextMilestoneDays: 3,
        nextMilestoneGap: 0,

        reminders: [],

        frequencyLabel: "",

        loading: false,
        notFound: true,
      };
    }

    const stats = analyticsService.getHabitStats(habitId);

    const recentActivity = analyticsService.getRecentActivity(habitId, 7);

    const frequencyData: FrequencyData = JSON.parse(habit.frequency_data);

    const currentStreak = stats?.currentStreak ?? 0;

    const bestStreak = habit.best_streak;

    const completedToday = habitService.isCompletedToday(habitId);

    const milestones: MilestoneItem[] = MILESTONES.map((days, index) => {
      const achieved = bestStreak >= days;

      const isCurrent =
        !achieved && (index === 0 || bestStreak >= MILESTONES[index - 1]);

      return {
        days,
        achieved,
        isCurrent,
        locked: !achieved && !isCurrent,
      };
    });

    const nextMilestone = MILESTONES.find((days) => bestStreak < days) ?? 100;

    const nextMilestoneGap = nextMilestone - currentStreak;

    const scheduledNotifications =
      notificationRepository.findByHabitId(habitId);

    const reminders: ReminderItem[] = frequencyData.times.map((time) => ({
      time: formatTime12Hour(time),
      active: scheduledNotifications.length > 0,
    }));

    const frequencyLabel =
      frequencyData.frequency === "daily"
        ? "Every day"
        : frequencyData.weekdays.length > 0
          ? `${frequencyData.weekdays.length} days per week`
          : "Selected days";

    return {
      id: habit.id,
      name: habit.name,
      emoji: habit.emoji,

      currentStreak,
      bestStreak,

      completionRate: stats?.completionRate ?? 0,
      consistencyScore: stats?.consistencyScore ?? 0,

      completedToday,

      recentActivity,

      completedInWeek: recentActivity.filter((day) => day.completed).length,

      milestones,

      nextMilestoneDays: nextMilestone,
      nextMilestoneGap,

      reminders,

      frequencyLabel,

      loading: false,
      notFound: false,
    };
  }, [habitId]);
}
