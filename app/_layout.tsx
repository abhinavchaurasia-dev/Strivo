import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProvider } from "@/providers/AppProvider";
import { handleNotificationResponse } from "@/lib/notifications/deeplink";

// Safe runtime load of expo-notifications for the response listener.
// Degrades gracefully in Expo Go (Android SDK 53+).
type ExpoNotifications = typeof import("expo-notifications");
let Notifications: ExpoNotifications | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Notifications = require("expo-notifications") as ExpoNotifications;
} catch {
  // Expo Go on Android SDK 53+ — local notification response listening
  // is unavailable. A development build is required for this feature.
  console.warn(
    "[Layout] expo-notifications unavailable. " +
      "Notification tap handling requires a development build.",
  );
}

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    if (!Notifications) return;

    // Handle taps on notifications (both local reminders and push).
    // Shared pipeline: both route through handleNotificationResponse → /habit/:id.
    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        handleNotificationResponse(response, router);
      },
    );

    return () => sub.remove();
  }, [router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="habit/[id]"
            options={{
              presentation: "card",
              animation: "slide_from_right",
            }}
          />

          <Stack.Screen
            name="create/index"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />

          <Stack.Screen
            name="activity/index"
            options={{
              presentation: "card",
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
