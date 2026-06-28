// ─────────────────────────────────────────────
// NotificationService
// Orchestrates scheduling, cancellation, rescheduling,
// and deep-link routing for all notification types.
// ─────────────────────────────────────────────

import { notificationRepository } from "@/repositories/NotificationRepository";
import { activityRepository } from "@/repositories/ActivityRepository";
import { habitRepository } from "@/repositories/HabitRepository";
import { settingsRepository } from "@/repositories/SettingsRepository";
import {
  scheduleHabitReminders,
  cancelNotifications,
  sendTestNotification as _sendTest,
} from "@/lib/notifications/schedule";

import type { FrequencyData } from "@/types/habit";
import type { ScheduledNotification } from "@/types/notification";

function uuid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isInQuietHours(): boolean {
  const settings = settingsRepository.load();
  const quietHours = settings.quietHours;

  if (!quietHours.enabled) {
    return false;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [fromHour, fromMinute] = quietHours.from.split(":").map(Number);
  const [toHour, toMinute] = quietHours.to.split(":").map(Number);

  const fromMinutes = fromHour * 60 + fromMinute;
  const toMinutes = toHour * 60 + toMinute;

  // Handle overnight quiet hours (e.g. 22:00 → 07:00)
  if (fromMinutes > toMinutes) {
    return currentMinutes >= fromMinutes || currentMinutes <= toMinutes;
  }

  return currentMinutes >= fromMinutes && currentMinutes <= toMinutes;
}

export class NotificationService {
  /**
   * Schedules reminders for a newly created habit.
   * Persists Expo notification IDs for later cancellation.
   */
  async scheduleForHabit(
    habitId: string,
    frequencyData: FrequencyData,
  ): Promise<void> {
    const habit = habitRepository.findById(habitId);

    if (!habit) {
      return;
    }

    const results = await scheduleHabitReminders(
      habitId,
      habit.name,
      habit.emoji,
      frequencyData,
    );

    const now = new Date().toISOString();

    const records: ScheduledNotification[] = results.map((result) => ({
      id: uuid(),
      habit_id: habitId,
      notification_id: result.notificationId,
      type: "REMINDER",
      created_at: now,
    }));

    notificationRepository.saveMany(records);

    for (const result of results) {
      activityRepository.log({
        id: uuid(),
        type: "reminder_sent",
        title: `${habit.emoji} Reminder Scheduled`,
        subtitle: `${habit.name} • ${result.time}`,
        metadata: JSON.stringify({
          habitId,
          notificationId: result.notificationId,
        }),
        created_at: now,
      });
    }
  }

  /**
   * Cancels existing notifications and recreates them.
   * Used when a habit is edited.
   */
  async rescheduleForHabit(
    habitId: string,
    frequencyData: FrequencyData,
  ): Promise<void> {
    await this.cancelForHabit(habitId);
    await this.scheduleForHabit(habitId, frequencyData);
  }

  /**
   * Cancels only notifications belonging to this habit.
   */
  async cancelForHabit(habitId: string): Promise<void> {
    const records = notificationRepository.findByHabitId(habitId);

    const ids = records.map((record) => record.notification_id);

    await cancelNotifications(ids);

    notificationRepository.deleteByHabitId(habitId);
  }

  /**
   * Logs receipt of a push notification.
   */
  logPushReceived(title: string, habitId?: string): void {
    activityRepository.log({
      id: uuid(),
      type: "push_received",
      title: "📱 Push Received",
      subtitle: title,
      metadata: habitId ? JSON.stringify({ habitId }) : undefined,
      created_at: new Date().toISOString(),
    });
  }

  /**
   * Sends a local test notification.
   */
  async sendTestNotification(): Promise<void> {
    await _sendTest();

    activityRepository.log({
      id: uuid(),
      type: "reminder_sent",
      title: "🔔 Test Notification Sent",
      subtitle: "Check your notification tray",
      created_at: new Date().toISOString(),
    });
  }

  /**
   * Returns whether the current time falls within
   * the user's configured quiet hours.
   */
  isInQuietHours(): boolean {
    return isInQuietHours();
  }
}

export const notificationService = new NotificationService();
