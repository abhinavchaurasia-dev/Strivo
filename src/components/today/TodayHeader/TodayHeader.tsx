import React from "react";

import { Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Text from "@/components/ui/Text";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { TodayHeaderProps } from "./types";

export default function TodayHeader({
  greeting,
  date,
  notificationCount = 0,
  onNotificationPress,
  testID,
}: TodayHeaderProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.left}>
        <Text variant="headlineLarge" style={styles.greeting}>
          {greeting}
        </Text>

        <Text variant="bodyLarge" color="secondary">
          {date}
        </Text>
      </View>

      <Pressable
        onPress={onNotificationPress}
        style={styles.notificationButton}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={theme.semantic.text.primary}
        />

        {notificationCount > 0 && <View style={styles.badge} />}
      </Pressable>
    </View>
  );
}
