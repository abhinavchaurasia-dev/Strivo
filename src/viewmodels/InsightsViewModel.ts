// ─────────────────────────────────────────────
// InsightsViewModel
// ─────────────────────────────────────────────

import { useMemo } from "react";

import { useHabitStore } from "@/store/habitStore";
import { analyticsService } from "@/services/AnalyticsService";
import { habitRepository } from "@/repositories/HabitRepository";

import type { InsightsData } from "@/types/analytics";

export interface InsightsScreenState {
  data: InsightsData | null;
  isEmpty: boolean;
  isLoading: boolean;
}

export function useInsightsViewModel(): InsightsScreenState {
  const { habits, loading } = useHabitStore();

  return useMemo(() => {
    if (loading) {
      return {
        data: null,
        isEmpty: false,
        isLoading: true,
      };
    }

    const totalHabits = habitRepository.findAll().length;

    if (totalHabits === 0) {
      return {
        data: null,
        isEmpty: true,
        isLoading: false,
      };
    }

    return {
      data: analyticsService.buildInsightsData(),
      isEmpty: false,
      isLoading: false,
    };
  }, [habits, loading]);
}
