import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Text from "@/components/ui/Text";
import { useTheme } from "@/providers";

import type { Theme } from "@/theme";
import type { HabitCardProps } from "./types";

function HabitCard({
  id,
  emoji,
  title,
  reminder,
  completed,
  streak,
  onPress,
  onComplete,
  testID,
}: HabitCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${completed ? "Completed" : "Mark as done"}.`}
    >
      {/* Emoji circle */}
      <View style={styles.emojiContainer}>
        <Text variant="headlineMedium" allowFontScaling={false}>
          {emoji}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text variant="titleMedium" weight="semibold" numberOfLines={1}>
          {title}
        </Text>

        {streak !== undefined && streak > 0 && (
          <Text
            variant="caption"
            style={{ color: theme.colors.primary, marginTop: 2 }}
          >
            🔥 {streak} {streak === 1 ? "Day" : "Days"}
          </Text>
        )}

        {reminder ? (
          <View style={styles.timeRow}>
            <Ionicons
              name="time-outline"
              size={12}
              color={theme.semantic.text.secondary}
            />
            <Text variant="caption" color="secondary" style={{ marginLeft: 4 }}>
              {reminder}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Done pill button */}
      <Pressable
        onPress={(e) => {
          e.stopPropagation?.();
          onComplete?.();
        }}
        hitSlop={8}
        style={[
          styles.doneButton,
          completed ? styles.doneButtonCompleted : styles.doneButtonPending,
        ]}
        accessibilityRole="button"
        accessibilityLabel={completed ? "Completed" : "Mark as done"}
      >
        {completed ? (
          <>
            <Ionicons name="checkmark" size={14} color="#fff" />
            <Text
              variant="label"
              style={{ color: "#fff", marginLeft: 4, fontSize: 12 }}
            >
              Done
            </Text>
          </>
        ) : (
          <Text variant="label" style={{ color: "#fff", fontSize: 12 }}>
            Done
          </Text>
        )}
      </Pressable>
    </Pressable>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.semantic.background.card,
      borderRadius: theme.radius["2xl"],
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      ...theme.shadows.sm,
    },
    pressed: {
      opacity: 0.85,
    },
    emojiContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.semantic.background.surface,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    content: {
      flex: 1,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 3,
    },
    doneButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: theme.radius.pill,
      minWidth: 64,
      justifyContent: "center",
    },
    doneButtonPending: {
      backgroundColor: theme.colors.primary,
    },
    doneButtonCompleted: {
      backgroundColor: theme.colors.success,
    },
  });

export default memo(HabitCard);
