// ─────────────────────────────────────────────
// HabitFormViewModel
// ─────────────────────────────────────────────

import { useMemo } from "react";
import { habitService } from "@/services/HabitService";
import type { HabitFormData, FrequencyData } from "@/types/habit";

export interface HabitFormState {
  initialValues: HabitFormData;
  isEditMode: boolean;
  frequencyLabel: string;
}

const DEFAULT_FORM: HabitFormData = {
  name: "",
  emoji: "✅",
  frequencyType: "daily",
  weekdays: [],
  reminderTimes: [],
};

function computeFrequencyLabel(data: HabitFormData): string {
  if (data.frequencyType === "daily") return "Every day";
  if (data.weekdays.length === 0) return "Select days";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return data.weekdays.map((d) => days[d % 7]).join(", ");
}

export function useHabitFormViewModel(editHabitId?: string): HabitFormState {
  return useMemo<HabitFormState>(() => {
    if (!editHabitId) {
      return {
        initialValues: DEFAULT_FORM,
        isEditMode: false,
        frequencyLabel: "Every day",
      };
    }

    const habit = habitService.getHabit(editHabitId);
    if (!habit) {
      return {
        initialValues: DEFAULT_FORM,
        isEditMode: false,
        frequencyLabel: "Every day",
      };
    }

    const fd: FrequencyData = JSON.parse(habit.frequency_data);
    const initialValues: HabitFormData = {
      name: habit.name,
      emoji: habit.emoji,
      frequencyType: fd.frequency,
      weekdays: fd.weekdays,
      reminderTimes: fd.times,
    };

    return {
      initialValues,
      isEditMode: true,
      frequencyLabel: computeFrequencyLabel(initialValues),
    };
  }, [editHabitId]);
}
