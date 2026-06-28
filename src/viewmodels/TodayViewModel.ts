// ─────────────────────────────────────────────
// TodayViewModel
// Transforms store state into UI-ready props
// for TodayScreen. Zero business logic here.
// ─────────────────────────────────────────────

import { useMemo } from "react";
import { format } from "date-fns";

import { useHabitStore } from "@/store/habitStore";
import { habitService, calculateCurrentStreak } from "@/services/HabitService";
import { completionRepository } from "@/repositories/CompletionRepository";

import type { FrequencyData } from "@/types/habit";

export interface TodayHabitItem {
  id: string;
  emoji: string;
  title: string;
  reminderTime?: string;
  nextDueLabel: string;
  completed: boolean;
  streak: number;
}

export interface AgendaItem {
  time: string;
  emoji: string;
  habitId: string;
  habitName: string;
}

export interface TodayScreenState {
  greeting: string;
  greetingEmoji: string;
  formattedDate: string;
  currentStreak: number;
  bestStreak: number;
  completionPercentage: number;
  completedHabits: number;
  totalHabits: number;
  longestHabit: string;
  habits: TodayHabitItem[];
  agendaItems: AgendaItem[];
  activeReminder: AgendaItem | null;
  isLoading: boolean;
  isEmpty: boolean;
  hasPermissionIssue: boolean;
}

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      text: "Good Morning",
      emoji: "👋",
    };
  }

  if (hour < 17) {
    return {
      text: "Good Afternoon",
      emoji: "☀️",
    };
  }

  return {
    text: "Good Evening",
    emoji: "🌙",
  };
}

function formatTime12Hour(time: string): string {
  const [hour, minute] = time.split(":").map(Number);

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function useTodayViewModel(): TodayScreenState {
  const { habits, loading } = useHabitStore();

  return useMemo(() => {
    const greeting = getGreeting();
    const formattedDate = format(new Date(), "EEEE, d MMMM");

    const todaysHabits = habitService.getTodaysHabits();

    let highestCurrentStreak = 0;
    let bestStreak = 0;
    let longestHabit = "";

    const habitItems: TodayHabitItem[] = todaysHabits.map((habit) => {
      const frequencyData: FrequencyData = JSON.parse(habit.frequency_data);

      const completed = habitService.isCompletedToday(habit.id);

      const completionDates = completionRepository.findAllDates(habit.id);

      const streak = calculateCurrentStreak(completionDates);

      if (streak > highestCurrentStreak) {
        highestCurrentStreak = streak;
        longestHabit = habit.name;
      }

      if (habit.best_streak > bestStreak) {
        bestStreak = habit.best_streak;
      }

      const nextDue = habitService.calculateNextDueAt(frequencyData);

      let nextDueLabel = "";

      if (nextDue) {
        const today = new Date();

        nextDueLabel =
          nextDue.toDateString() === today.toDateString()
            ? `Next: ${format(nextDue, "h:mm aa")}`
            : `Tomorrow ${format(nextDue, "h:mm aa")}`;
      }

      return {
        id: habit.id,
        emoji: habit.emoji,
        title: habit.name,
        reminderTime: frequencyData.times[0]
          ? formatTime12Hour(frequencyData.times[0])
          : undefined,
        nextDueLabel,
        completed,
        streak,
      };
    });

    const pending = habitItems
      .filter((item) => !item.completed)
      .sort((a, b) =>
        (a.reminderTime ?? "").localeCompare(b.reminderTime ?? ""),
      );

    const completed = habitItems.filter((item) => item.completed);

    const sortedHabits = [...pending, ...completed];

    const completedHabits = completed.length;
    const totalHabits = sortedHabits.length;

    const completionPercentage =
      totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

    const agendaItems: AgendaItem[] = [];

    const now = new Date();

    todaysHabits.forEach((habit) => {
      const frequencyData: FrequencyData = JSON.parse(habit.frequency_data);

      frequencyData.times.forEach((time) => {
        agendaItems.push({
          time: formatTime12Hour(time),
          emoji: habit.emoji,
          habitId: habit.id,
          habitName: habit.name,
        });
      });
    });

    agendaItems.sort((a, b) => a.time.localeCompare(b.time));

    const activeReminder =
      agendaItems.find((item) => {
        const [hour, minute, meridian] = item.time.split(/:| /);

        let h = Number(hour);

        if (meridian === "PM" && h !== 12) {
          h += 12;
        }

        if (meridian === "AM" && h === 12) {
          h = 0;
        }

        const reminderDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          h,
          Number(minute),
        );

        const diffMinutes = (reminderDate.getTime() - now.getTime()) / 60000;

        return diffMinutes >= 0 && diffMinutes <= 60;
      }) ?? null;

    return {
      greeting: greeting.text,
      greetingEmoji: greeting.emoji,
      formattedDate,

      currentStreak: highestCurrentStreak,
      bestStreak,

      completionPercentage,
      completedHabits,
      totalHabits,

      longestHabit: longestHabit || "Start your first habit!",

      habits: sortedHabits,

      agendaItems,
      activeReminder,

      isLoading: loading,
      isEmpty: !loading && totalHabits === 0,

      hasPermissionIssue: false,
    };
  }, [habits, loading]);
}
