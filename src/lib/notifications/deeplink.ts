// ─────────────────────────────────────────────
// Deep Link Router
// Shared handler for BOTH local and push notification taps.
// The same payload contract feeds the same router.
// ─────────────────────────────────────────────

import type * as Notifications from "expo-notifications";
import type { Router } from "expo-router";
import type { NotificationPayload } from "@/types/notification";

/**
 * Extracts a typed NotificationPayload from an Expo notification response.
 * Returns null for malformed or missing payloads.
 */
export function extractPayload(
  response: Notifications.NotificationResponse,
): NotificationPayload | null {
  const data = response.notification.request.content.data as
    | Partial<NotificationPayload>
    | undefined;

  if (!data?.screen || !data?.habitId) return null;
  if (data.screen !== "/habit") return null;
  if (typeof data.habitId !== "string" || data.habitId.length === 0)
    return null;

  return {
    screen: "/habit",
    habitId: data.habitId,
  };
}

/**
 * Routes a notification tap to the correct destination.
 *
 * Both local reminders and push notifications call this function —
 * demonstrating the shared notification pipeline.
 */
export function handleNotificationResponse(
  response: Notifications.NotificationResponse,
  router: Router,
): void {
  const payload = extractPayload(response);

  if (!payload) {
    // Malformed or unknown notification — go home safely.
    router.replace("/");
    return;
  }

  // Navigate to Habit Detail with the deep-linked habitId.
  router.push(`/habit/${payload.habitId}`);
}
