// ─────────────────────────────────────────────
// Notification Permissions
// ─────────────────────────────────────────────

import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import type { NotificationPermissionState } from "@/types/notification";

/**
 * Checks the current notification permission status.
 * Does NOT prompt the user.
 */
export async function checkPermissions(): Promise<NotificationPermissionState> {
  const { status, canAskAgain } = await Notifications.getPermissionsAsync();

  return {
    granted: status === "granted",
    canAskAgain,
    checked: true,
  };
}

/**
 * Requests notification permissions from the user.
 * On Android 13+ this triggers the system dialog.
 */
export async function requestPermissions(): Promise<NotificationPermissionState> {
  const { status, canAskAgain } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });

  return {
    granted: status === "granted",
    canAskAgain,
    checked: true,
  };
}

/**
 * Opens the device Settings app so the user can manually enable
 * notifications after they have been permanently denied.
 */
export function openNotificationSettings(): void {
  Linking.openSettings();
}
