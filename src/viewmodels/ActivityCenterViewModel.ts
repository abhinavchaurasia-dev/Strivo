// ─────────────────────────────────────────────
// ActivityCenterViewModel
// ─────────────────────────────────────────────

import { useMemo } from "react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { activityRepository } from "@/repositories/ActivityRepository";
import type { ActivityGroup, ActivityItem } from "@/types/activity";

export interface ActivityCenterState {
  groups: ActivityGroup[];
  totalToday: number;
  isEmpty: boolean;
  isLoading: boolean;
}

export function useActivityCenterViewModel(): ActivityCenterState {
  return useMemo<ActivityCenterState>(() => {
    const raw = activityRepository.findRecent(100);

    if (raw.length === 0) {
      return {
        groups: [],
        totalToday: 0,
        isEmpty: true,
        isLoading: false,
      };
    }

    const items: ActivityItem[] = raw.map((log) => ({
      id: log.id,
      type: log.type,
      title: log.title,
      subtitle: log.subtitle,
      timestamp: parseISO(log.created_at),
      metadata: log.metadata ? JSON.parse(log.metadata) : undefined,
    }));

    const today: ActivityItem[] = [];
    const yesterday: ActivityItem[] = [];
    const earlier: ActivityItem[] = [];

    for (const item of items) {
      if (isToday(item.timestamp)) {
        today.push(item);
      } else if (isYesterday(item.timestamp)) {
        yesterday.push(item);
      } else {
        earlier.push(item);
      }
    }

    const groups: ActivityGroup[] = [];

    if (today.length > 0) {
      groups.push({
        label: "Today",
        items: today,
      });
    }

    if (yesterday.length > 0) {
      groups.push({
        label: "Yesterday",
        items: yesterday,
      });
    }

    if (earlier.length > 0) {
      const earliest = earlier[earlier.length - 1].timestamp;
      const latest = earlier[0].timestamp;

      groups.push({
        label: "Earlier",
        dateRange: `${format(earliest, "MMM d")} – ${format(latest, "MMM d")}`,
        items: earlier,
        collapsed: true,
      });
    }

    return {
      groups,
      totalToday: today.length,
      isEmpty: false,
      isLoading: false,
    };
  }, []);
}
