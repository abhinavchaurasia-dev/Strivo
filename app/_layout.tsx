import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="create" />
      <Stack.Screen name="habit/[id]" />
    </Stack>
  );
}
