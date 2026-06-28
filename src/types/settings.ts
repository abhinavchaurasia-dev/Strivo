// ─────────────────────────────────────────────
// Strivo — Settings Types
// ─────────────────────────────────────────────

export interface QuietHours {
  enabled: boolean;
  /** "HH:mm" 24-hour, e.g. "22:00" */
  from: string;
  /** "HH:mm" 24-hour, e.g. "07:00" */
  to: string;
  /** ISO weekday numbers — empty means every day */
  days: number[];
}

export interface AppSettings {
  pushToken: string | null;
  quietHours: QuietHours;
  theme: "light" | "dark" | "system";
  language: string;
  hapticFeedback: boolean;
  badgeCount: boolean;
  onboardingComplete: boolean;
  permissionGranted: boolean;
  lastPermissionCheck: string | null;
}

export const DEFAULT_QUIET_HOURS: QuietHours = {
  enabled: true,
  from: "22:00",
  to: "07:00",
  days: [],
};

export const DEFAULT_SETTINGS: AppSettings = {
  pushToken: null,
  quietHours: DEFAULT_QUIET_HOURS,
  theme: "system",
  language: "en",
  hapticFeedback: true,
  badgeCount: true,
  onboardingComplete: false,
  permissionGranted: false,
  lastPermissionCheck: null,
};
