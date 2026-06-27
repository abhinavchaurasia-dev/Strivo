import React from "react";

import { Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Text from "@/components/ui/Text";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";

import type { HabitCardProps } from "./types";

export default function HabitCard({
  emoji,
  title,
  reminder,
  completed,
  onPress,
  onComplete,
}: HabitCardProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.emojiContainer}>
        <Text variant="headlineMedium">{emoji}</Text>
      </View>

      <View style={styles.content}>
        <Text variant="titleMedium" weight="semibold">
          {title}
        </Text>

        {reminder && (
          <View style={styles.footer}>
            <Ionicons
              name="time-outline"
              size={14}
              color={theme.semantic.text.secondary}
            />

            <Text variant="caption" color="secondary" style={{ marginLeft: 6 }}>
              {reminder}
            </Text>
          </View>
        )}
      </View>

      <Pressable
        onPress={onComplete}
        style={[
          styles.completeButton,
          !completed && styles.completeButtonInactive,
        ]}
      >
        {completed && <Ionicons name="checkmark" size={20} color="white" />}
      </Pressable>
    </Pressable>
  );
}
