// ─────────────────────────────────────────────
// Settings Store (Zustand 5)
// ─────────────────────────────────────────────

import { create } from "zustand";

import { settingsRepository } from "@/repositories/SettingsRepository";
import { pushService } from "@/services/PushService";
import {
  checkPermissions,
  requestPermissions,
} from "@/lib/notifications/permissions";

import type { AppSettings, QuietHours } from "@/types/settings";
import type { NotificationPermissionState } from "@/types/notification";

interface SettingsState {
  settings: AppSettings;
  permission: NotificationPermissionState;
  loading: boolean;

  // Actions
  loadSettings: () => void;
  patchSettings: (patch: Partial<AppSettings>) => void;
  checkNotificationPermission: () => Promise<void>;
  requestNotificationPermission: () => Promise<boolean>;
  registerPushToken: () => Promise<void>;
  setQuietHours: (quietHours: QuietHours) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: settingsRepository.load(),

  permission: {
    granted: false,
    canAskAgain: true,
    checked: false,
  },

  loading: false,

  loadSettings: () => {
    set({
      settings: settingsRepository.load(),
    });
  },

  patchSettings: (patch) => {
    const settings = settingsRepository.patch(patch);

    set({
      settings,
    });
  },

  checkNotificationPermission: async () => {
    const permission = await checkPermissions();

    const settings = settingsRepository.patch({
      permissionGranted: permission.granted,
      lastPermissionCheck: new Date().toISOString(),
    });

    set({
      permission,
      settings,
    });
  },

  requestNotificationPermission: async () => {
    const permission = await requestPermissions();

    const settings = settingsRepository.patch({
      permissionGranted: permission.granted,
      lastPermissionCheck: new Date().toISOString(),
    });

    set({
      permission,
      settings,
    });

    return permission.granted;
  },

  registerPushToken: async () => {
    set({
      loading: true,
    });

    try {
      await pushService.registerForPushNotifications();

      set({
        settings: settingsRepository.load(),
        loading: false,
      });
    } catch {
      set({
        loading: false,
      });
    }
  },

  setQuietHours: (quietHours) => {
    get().patchSettings({
      quietHours,
    });
  },
}));
