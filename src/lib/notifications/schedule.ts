// ─────────────────────────────────────────────
// Notification Scheduling Engine
// Schedules and cancels per-habit notifications.
// Never calls cancelAllScheduledNotificationsAsync().
// ─────────────────────────────────────────────

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { NOTIFICATIONS } from "@/constants/notifications";
import type { FrequencyData } from "@/types/habit";
import type { NotificationPayload } from "@/types/notification";

export interface ScheduleResult {
  notificationId: string;
  /** "HH:mm" reminder time this ID corresponds to */
  time: string;
}

/**
 * Schedules weekly (or daily) repeating notifications for a habit.
 *
 * For daily frequency: schedules one repeating trigger per reminder time.
 * For weekly frequency: schedules one trigger per (time × weekday) pair.
 *
 * Returns an array of { notificationId, time } pairs to persist.
 */
export async function scheduleHabitReminders(
  habitId: string,
  habitName: string,
  habitEmoji: string,
  frequencyData: FrequencyData,
): Promise<ScheduleResult[]> {
  const results: ScheduleResult[] = [];
  const payload: NotificationPayload = { screen: "/habit", habitId };

  for (const timeStr of frequencyData.times) {
    const [hour, minute] = timeStr.split(":").map(Number);

    if (frequencyData.frequency === "daily") {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${habitEmoji} Time for ${habitName}`,
          body: "Tap to mark it as done.",
          data: payload,
          sound: "default",
          ...(Platform.OS === "android" && {
            channelId: NOTIFICATIONS.HABIT_REMINDERS,
          }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
        },
      });

      results.push({
        notificationId: id,
        time: timeStr,
      });
    } else {
      // weekly — one notification per (weekday × time) pair
      const weekdays =
        frequencyData.weekdays.length > 0
          ? frequencyData.weekdays
          : [1, 2, 3, 4, 5, 6, 7];

      for (const weekday of weekdays) {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: `${habitEmoji} Time for ${habitName}`,
            body: "Tap to mark it as done.",
            data: payload,
            sound: "default",
            ...(Platform.OS === "android" && {
              channelId: NOTIFICATIONS.HABIT_REMINDERS,
            }),
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
            weekday,
            hour,
            minute,
          },
        });

        results.push({
          notificationId: id,
          time: timeStr,
        });
      }
    }
  }

  return results;
}

/**
 * Cancels a list of Expo notification IDs.
 * Never cancels IDs that belong to other habits.
 */
export async function cancelNotifications(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id) => Notifications.cancelScheduledNotificationAsync(id)),
  );
}

/**
 * Sends an immediate local notification — used for test notifications
 * from the Settings screen.
 */
export async function sendTestNotification(
  habitName = "Drink Water",
): Promise<string> {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: `💧 Test: Time for ${habitName}`,
      body: "This is a test notification from Strivo.",
      data: {
        screen: "/habit",
        habitId: "test",
      } satisfies NotificationPayload,
      sound: "default",
      ...(Platform.OS === "android" && {
        channelId: NOTIFICATIONS.HABIT_REMINDERS,
      }),
    },
    trigger: {
      seconds: 3,
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    },
  });
}
