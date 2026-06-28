import React, { memo } from "react";

import { Pressable, View } from "react-native";

import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";

import type { ProgressCardProps } from "./types";

function ProgressCard({
  completionPercentage,
  completedHabits,
  totalHabits,
  currentStreak,
  bestStreak,
  onPress,
  testID,
}: ProgressCardProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <Pressable disabled={!onPress} onPress={onPress}>
      <Card testID={testID} style={styles.container}>
        <View style={styles.header}>
          <Text variant="titleMedium" weight="semibold">
            Today's Progress
          </Text>

          <Text variant="headlineMedium" color="primary" weight="bold">
            {completionPercentage}%
          </Text>
        </View>

        <Text variant="bodyMedium" color="secondary">
          {completedHabits} of {totalHabits} habits completed
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${completionPercentage}%`,
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
        </View>

        <View style={styles.footer}>
          <Text variant="caption" color="secondary">
            🔥 {currentStreak} day streak
          </Text>

          {bestStreak && (
            <Text variant="caption" color="secondary">
              Best {bestStreak}
            </Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

export default memo(ProgressCard);
