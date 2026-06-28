// ─────────────────────────────────────────────
// PushService
// Push token registration and management.
// Requires a development build (not Expo Go).
// ─────────────────────────────────────────────

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import { Platform } from "react-native";

import { settingsRepository } from "@/repositories/SettingsRepository";

export class PushService {
  /**
   * Registers the device for push notifications and stores the token.
   * Returns null if push is unavailable (simulator, Expo Go, no permission).
   */
  async registerForPushNotifications(): Promise<string | null> {
    if (!Device.isDevice) {
      console.warn(
        "[PushService] Push notifications require a physical device.",
      );
      return null;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.warn(
        "[PushService] Permission not granted for push notifications.",
      );
      return null;
    }

    // Android channel must exist before token registration.
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("habit-reminders", {
        name: "Habit Reminders",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    try {
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;

      const token = projectId
        ? (
            await Notifications.getExpoPushTokenAsync({
              projectId,
            })
          ).data
        : (await Notifications.getExpoPushTokenAsync()).data;

      settingsRepository.patch({
        pushToken: token,
      });

      return token;
    } catch (error) {
      console.error("[PushService] Failed to get push token:", error);
      return null;
    }
  }

  /** Returns the stored push token, or null. */
  getStoredToken(): string | null {
    return settingsRepository.load().pushToken;
  }

  /** Copies the push token to the clipboard. */
  async copyTokenToClipboard(): Promise<boolean> {
    const token = this.getStoredToken();

    if (!token) {
      return false;
    }

    await Clipboard.setStringAsync(token);

    return true;
  }

  /** Clears the stored push token (e.g. on sign-out or reset). */
  clearToken(): void {
    settingsRepository.patch({
      pushToken: null,
    });
  }
}

export const pushService = new PushService();
