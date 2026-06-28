import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProvider } from "@/providers/AppProvider";
import { handleNotificationResponse } from "@/lib/notifications/deeplink";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
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
