// ─────────────────────────────────────────────
// AppProvider
// Single bootstrap layer that:
//   1. Initialises the SQLite database
//   2. Configures the foreground notification handler (module-level)
//   3. Creates the Android notification channel
//   4. Hydrates the Zustand habit store
//   5. Checks notification permissions
//   6. Manages SplashScreen lifecycle
// The deep-link response listener is wired in app/_layout.tsx
// because it requires the expo-router navigation context.
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

// ── Module-level bootstrap ─────────────────────────────────────────────
// Must be called before any React tree renders so local notifications
// display banners while the app is in the foreground.
configureNotificationHandler();

// ── SplashScreen ───────────────────────────────────────────────────────
// Keep the splash visible until we finish bootstrapping.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden — safe to ignore.
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
      // 1. Initialise SQLite — synchronous; creates tables & runs migrations.
      getDatabase();

      // 2. Android notification channel (no-op on iOS).
      await createAndroidChannel();

      // 3. Hydrate the habit store from the DB so every screen starts with data.
      loadHabits();

      // 4. Sync permission status into the settings store.
      await checkPermission();
    } catch (error) {
      // Non-fatal — the app can still run; surfaces gracefully in Settings.
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
