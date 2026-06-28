// ─────────────────────────────────────────────
// SettingsViewModel
// Transforms store state into UI-ready props
// for SettingsScreen. Zero business logic here.
// ─────────────────────────────────────────────

import { useMemo } from "react";
import { format } from "date-fns";

import { useSettingsStore } from "@/store/settingsStore";
import type { AppSettings, QuietHours } from "@/types/settings";
import type { NotificationPermissionState } from "@/types/notification";

export interface NotificationStatus {
  enabled: boolean;
  remindersOn: boolean;
  pushOn: boolean;
  quietHoursLabel: string;
}

export interface PermissionStatus {
  granted: boolean;
  limited: boolean;
  denied: boolean;
  lastCheckedLabel: string;
}

export interface PushTokenStatus {
  active: boolean;
  tokenPreview: string | null;
  lastSyncedLabel: string | null;
}

export interface SettingsScreenState {
  settings: AppSettings;
  permission: NotificationPermissionState;
  notificationStatus: NotificationStatus;
  permissionStatus: PermissionStatus;
  pushTokenStatus: PushTokenStatus;
  cacheSize: string;
  appVersion: string;
  buildNumber: string;
  isLoading: boolean;

  // Actions forwarded from store
  patchSettings: (patch: Partial<AppSettings>) => void;
  setQuietHours: (qh: QuietHours) => void;
  checkPermission: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
  registerPush: () => Promise<void>;
}

function formatQuietHours(qh: QuietHours): string {
  if (!qh.enabled) return "Off";
  return `${qh.from} – ${qh.to}`;
}

function formatLastChecked(iso: string | null): string {
  if (!iso) return "Never";
  return format(new Date(iso), "MMM d, h:mm a");
}

export function useSettingsViewModel(): SettingsScreenState {
  const {
    settings,
    permission,
    loading,
    patchSettings,
    setQuietHours,
    checkNotificationPermission,
    requestNotificationPermission,
    registerPushToken,
  } = useSettingsStore();

  return useMemo<SettingsScreenState>(() => {
    const notificationStatus: NotificationStatus = {
      enabled: settings.permissionGranted,
      remindersOn: settings.permissionGranted,
      pushOn: settings.pushToken !== null,
      quietHoursLabel: formatQuietHours(settings.quietHours),
    };

    const permissionStatus: PermissionStatus = {
      granted: permission.granted,
      limited: !permission.granted && !permission.canAskAgain,
      denied: !permission.granted && !permission.canAskAgain,
      lastCheckedLabel: formatLastChecked(settings.lastPermissionCheck),
    };

    const pushTokenStatus: PushTokenStatus = {
      active: settings.pushToken !== null,
      tokenPreview: settings.pushToken
        ? `${settings.pushToken.slice(0, 20)}…`
        : null,
      lastSyncedLabel: settings.pushToken
        ? formatLastChecked(settings.lastPermissionCheck)
        : null,
    };

    return {
      settings,
      permission,
      notificationStatus,
      permissionStatus,
      pushTokenStatus,
      cacheSize: "24.3 MB",
      appVersion: "1.0.0",
      buildNumber: "100",
      isLoading: loading,

      patchSettings,
      setQuietHours,
      checkPermission: checkNotificationPermission,
      requestPermission: requestNotificationPermission,
      registerPush: registerPushToken,
    };
  }, [
    settings,
    permission,
    loading,
    patchSettings,
    setQuietHours,
    checkNotificationPermission,
    requestNotificationPermission,
    registerPushToken,
  ]);
}
