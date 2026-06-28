import React, { memo } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Text from "@/components/ui/Text";
import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { TodayHeaderProps } from "./types";

function TodayHeader({
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
      <View style={styles.content}>
        <Text
          variant="headlineLarge"
          weight="bold"
          numberOfLines={1}
          style={styles.greeting}
        >
          {greeting}
        </Text>

        <Text variant="bodyLarge" color="secondary" numberOfLines={1}>
          {date}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open activity center"
        accessibilityHint="Shows notifications, completions and milestones."
        hitSlop={8}
        onPress={onNotificationPress}
        style={({ pressed }) => [
          styles.notificationButton,
          pressed && styles.notificationButtonPressed,
        ]}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={theme.semantic.text.primary}
        />

        {notificationCount > 0 && (
          <View style={styles.badge}>
            {notificationCount < 10 && (
              <Text
                variant="caption"
                color="inverse"
                weight="bold"
                allowFontScaling={false}
              >
                {notificationCount}
              </Text>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default memo(TodayHeader);
