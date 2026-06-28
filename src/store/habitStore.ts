// ─────────────────────────────────────────────
// Habit Store (Zustand 5)
// Client-side cache for habits and completions.
// All mutations go through HabitService; the store
// is then refreshed so the UI stays reactive.
// ─────────────────────────────────────────────

import { create } from "zustand";

import { habitService } from "@/services/HabitService";
import { notificationService } from "@/services/NotificationService";

import type { Habit, HabitFormData, FrequencyData } from "@/types/habit";

interface HabitState {
  habits: Habit[];
  loading: boolean;
  error: string | null;

  // Actions
  loadHabits: () => void;
  createHabit: (form: HabitFormData) => Promise<string>;
  updateHabit: (id: string, form: HabitFormData) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  completeHabit: (id: string) => Promise<boolean>;
  refreshHabits: () => void;
  clearError: () => void;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  loading: false,
  error: null,

  loadHabits: () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const habits = habitService.getAllHabits();

      set({
        habits,
        loading: false,
      });
    } catch (error) {
      set({
        error: String(error),
        loading: false,
      });
    }
  },

  createHabit: async (form) => {
    try {
      const id = habitService.createHabit(form);

      // Schedule notifications.
      const frequencyData: FrequencyData = {
        frequency: form.frequencyType,
        weekdays: form.weekdays,
        times: form.reminderTimes,
      };

      await notificationService.scheduleForHabit(id, frequencyData);

      get().refreshHabits();

      return id;
    } catch (error) {
      set({
        error: String(error),
      });

      throw error;
    }
  },

  updateHabit: async (id, form) => {
    try {
      habitService.updateHabit(id, form);

      const frequencyData: FrequencyData = {
        frequency: form.frequencyType,
        weekdays: form.weekdays,
        times: form.reminderTimes,
      };

      await notificationService.rescheduleForHabit(id, frequencyData);

      get().refreshHabits();
    } catch (error) {
      set({
        error: String(error),
      });

      throw error;
    }
  },

  deleteHabit: async (id) => {
    try {
      // Cancel notifications before deleting.
      await notificationService.cancelForHabit(id);

      habitService.deleteHabit(id);

      get().refreshHabits();
    } catch (error) {
      set({
        error: String(error),
      });

      throw error;
    }
  },

  completeHabit: async (id) => {
    try {
      const inserted = habitService.completeHabit(id);

      if (inserted) {
        get().refreshHabits();
      }

      return inserted;
    } catch (error) {
      set({
        error: String(error),
      });

      return false;
    }
  },

  refreshHabits: () => {
    try {
      const habits = habitService.getAllHabits();

      set({
        habits,
      });
    } catch (error) {
      set({
        error: String(error),
      });
    }
  },

  clearError: () =>
    set({
      error: null,
    }),
}));
