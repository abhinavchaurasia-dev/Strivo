import React, { memo } from "react";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Text from "@/components/ui/Text";
import { Assets } from "@/constants/assets";
import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { HeroMomentumCardProps } from "./types";

function HeroMomentumCard({
  userName,
  currentStreak,
  longestHabit,
  completionPercentage,
  testID,
}: HeroMomentumCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const progress = Math.max(0, Math.min(100, completionPercentage));

  return (
    <LinearGradient
      testID={testID}
      colors={theme.semantic.hero.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${currentStreak} day streak. ${completionPercentage}% completed today. Longest habit ${longestHabit}.`}
    >
      <Image source={Assets.hero.wave} style={styles.wave} resizeMode="cover" />

      <Image
        source={Assets.hero.glow}
        style={styles.glow}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <View style={styles.leftColumn}>
          <View style={styles.streakRow}>
            <View style={styles.streakBlock}>
              <Text
                variant="displayLarge"
                weight="bold"
                color="inverse"
                allowFontScaling={false}
              >
                {currentStreak}
              </Text>

              <View style={styles.streakMeta}>
                <Text variant="titleMedium" weight="bold" color="inverse">
                  day streak
                </Text>

                <Text
                  variant="bodyMedium"
                  color="inverse"
                  style={styles.streakCaption}
                >
                  Consistency compounds.
                </Text>
              </View>
            </View>

            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />

              <Text variant="caption" weight="bold" color="inverse">
                LIVE
              </Text>
            </View>
          </View>

          <View style={styles.spacingLarge} />

          <Text
            variant="caption"
            weight="bold"
            color="inverse"
            style={styles.sectionTitle}
          >
            LONGEST HABIT
          </Text>

          <Text
            variant="headlineMedium"
            weight="bold"
            color="inverse"
            numberOfLines={1}
          >
            💧 {longestHabit}
          </Text>

          <View style={styles.spacingMedium} />

          <View style={styles.progressHeader}>
            <Text variant="bodyMedium" color="inverse">
              Today's Progress
            </Text>

            <Text variant="bodyMedium" weight="bold" color="inverse">
              {progress}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <View style={styles.spacingMedium} />
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Text
                variant="bodyMedium"
                color="inverse"
                weight="medium"
                numberOfLines={1}
              >
                Keep going, {userName} 🚀
              </Text>

              <Text
                variant="caption"
                color="inverse"
                style={styles.footerCaption}
                numberOfLines={1}
              >
                Every completed habit strengthens your momentum.
              </Text>
            </View>

            <View style={styles.todayBadge}>
              <Text
                variant="caption"
                color="inverse"
                weight="bold"
                allowFontScaling={false}
              >
                TODAY
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.illustrationWrapper}>
            <Image
              source={Assets.hero.flame}
              style={styles.flame}
              resizeMode="contain"
            />

            <View style={styles.streakChip}>
              <Text
                variant="label"
                color="inverse"
                weight="bold"
                allowFontScaling={false}
              >
                🔥 {currentStreak} DAYS
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Decorative depth layers */}
      <View pointerEvents="none" style={styles.topHighlight} />

      <View pointerEvents="none" style={styles.bottomShadow} />

      <Image
        source={Assets.hero.glow}
        style={styles.secondaryGlow}
        resizeMode="contain"
      />

      <View pointerEvents="none" style={styles.noiseOverlay} />
    </LinearGradient>
  );
}
export default memo(HeroMomentumCard);