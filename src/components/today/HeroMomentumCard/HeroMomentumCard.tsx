import React from "react";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Text from "@/components/ui/Text";
import { Assets } from "@/constants/assets";
import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { HeroCardProps } from "./types";

export default function HeroCard({
  streak,
  longestHabit,
  completionRate,
  userName,
  testID,
}: HeroCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <LinearGradient
      testID={testID}
      colors={["#FF9838", "#FF6B00"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* TODO(UI-ASSET)
          Replace with:
          assets/hero/hero-wave.svg
      */}
      <Image source={Assets.hero.wave} style={styles.wave} resizeMode="cover" />

      {/* TODO(UI-ASSET)
          Replace with:
          assets/hero/hero-glow.png
      */}
      <Image
        source={Assets.hero.glow}
        style={styles.glow}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <View style={styles.left}>
          <View style={styles.badge}>
            <Text variant="headlineMedium" color="inverse">
              🔥
            </Text>
          </View>

          <View style={styles.info}>
            <Text variant="displayMedium" color="inverse" weight="bold">
              {streak} Days
            </Text>

            <Text variant="bodyLarge" color="inverse">
              Current Streak
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text variant="headlineMedium" color="inverse" weight="semibold">
          💧 {longestHabit}
        </Text>

        <Text variant="bodyMedium" color="inverse">
          {completionRate}% completed today
        </Text>

        <Text variant="caption" color="inverse">
          Keep going, {userName} 🚀
        </Text>
      </View>

      {/* TODO(UI-ASSET)
          Replace with:
          assets/hero/hero-flame.png
      */}
      <Image
        source={Assets.hero.flame}
        style={styles.flame}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}
