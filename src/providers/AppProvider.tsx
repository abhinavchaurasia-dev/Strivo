// ─────────────────────────────────────────────
// AppProvider
// Single bootstrap layer that:
//   1. Configures the foreground notification handler
//   2. Initialises the SQLite database
//   3. Creates the Android notification channel
//   4. Hydrates the Zustand habit store
//   5. Checks notification permissions
//   6. Manages SplashScreen lifecycle
//
// The deep-link response listener is wired in app/_layout.tsx
// because it requires the expo-router navigation context.
//
// IMPORTANT: configureNotificationHandler() is called inside bootstrap()
// rather than at module level. This prevents the expo-notifications
// module-load error (Expo Go / Android SDK 53+) from crashing the entire
// import chain and making all routes appear to have no default export.
// ─────────────────────────────────────────────

import React, { type ReactNode, useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "@/providers/ThemeProvider/ThemeProvider";
import { getDatabase } from "@/database";
import {
  configureNotificationHandler,
  createAndroidChannel,
} from "@/lib/notifications/setup";
import { useHabitStore } from "@/store/habitStore";
import { useSettingsStore } from "@/store/settingsStore";

// ── SplashScreen ───────────────────────────────────────────────────────
// Keep the splash visible until we finish bootstrapping.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden or not supported — safe to ignore.
});

interface AppProviderProps {
  children: ReactNode;
}

function BootstrapGate({ children }: AppProviderProps) {
  const [ready, setReady] = useState(false);

  const loadHabits = useHabitStore((s) => s.loadHabits);
  const checkPermission = useSettingsStore(
    (s) => s.checkNotificationPermission,
  );

  const bootstrap = useCallback(async () => {
    try {
      // 1. Configure the foreground notification handler.
      //    Wrapped inside try-catch so an Expo Go limitation
      //    (expo-notifications throws on Android SDK 53+) can never
      //    crash the bootstrap sequence.
      configureNotificationHandler();

      // 2. Initialise SQLite — synchronous; creates tables & runs migrations.
      getDatabase();

      // 3. Android notification channel (no-op on iOS / Expo Go).
      await createAndroidChannel();

      // 4. Hydrate the habit store from the DB so every screen starts with data.
      loadHabits();

      // 5. Sync permission status into the settings store.
      await checkPermission();
    } catch (error) {
      // Non-fatal — the app renders without full notification support.
      // Users will see the permission banner in Settings to recover.
      console.warn("[AppProvider] Bootstrap error:", error);
    } finally {
      setReady(true);
    }
  }, [loadHabits, checkPermission]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const onLayout = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      {children}
    </View>
  );
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <BootstrapGate>{children}</BootstrapGate>
    </ThemeProvider>
  );
}
