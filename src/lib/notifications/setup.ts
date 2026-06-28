// ─────────────────────────────────────────────
// Notification Setup
// Must be called once at app startup, before any
// notification is scheduled or received.
// ─────────────────────────────────────────────

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { NOTIFICATIONS } from "@/constants/notifications";

/**
 * Configures the foreground notification handler so that
 * notifications are visible even while the app is in the foreground.
 *
 * Must be called outside any React component (module level or in _layout).
 */
export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

/**
 * Creates the Android notification channel for habit reminders.
 * Must be called BEFORE requesting permissions on Android.
 */
export async function createAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync(
    NOTIFICATIONS.HABIT_REMINDERS,
    {
      name: "Habit Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF7A00",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: false,
      sound: "default",
    },
  );
}
