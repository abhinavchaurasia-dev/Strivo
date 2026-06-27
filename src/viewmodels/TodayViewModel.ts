import { useMemo } from "react";

export interface TodayHabitItem {
  id: string;

  emoji: string;

  title: string;

  reminderTime?: string;

  completed: boolean;
}

export interface TodayScreenState {
  greeting: string;

  formattedDate: string;

  currentStreak: number;

  completionPercentage: number;

  completedHabits: number;

  bestStreak: number;

  totalHabits: number;

  longestHabit: string;

  habits: TodayHabitItem[];

  isLoading: boolean;

  isEmpty: boolean;
}

export function useTodayViewModel(): TodayScreenState {
  return useMemo(
    () => ({
      greeting: "Good Morning",

      formattedDate: "Thursday, 26 June",

      currentStreak: 14,
      bestStreak: 27,
      completionPercentage: 60,
      completedHabits: 3,
      totalHabits: 5,
      longestHabit: "Drink Water",

      habits: [
        {
          id: "1",
          emoji: "💧",
          title: "Drink Water",
          reminder: "09:00 AM",
          completed: true,
        },
        {
          id: "2",
          emoji: "🏃",
          title: "Morning Run",
          reminder: "06:30 AM",
          completed: false,
        },
        {
          id: "3",
          emoji: "📚",
          title: "Read 20 min",
          reminder: "08:00 PM",
          completed: false,
        },
      ],

      isLoading: false,

      isEmpty: false,
    }),
    [],
  );
}
