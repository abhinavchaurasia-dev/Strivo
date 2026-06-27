import React from "react";
import { Pressable, View } from "react-native";

import Text from "@/components/ui/Text";
import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { SectionHeaderProps } from "./types";

export default function SectionHeader({
  title,
  actionLabel,
  onActionPress,
}: SectionHeaderProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" weight="bold">
        {title}
      </Text>

      {actionLabel && (
        <Pressable onPress={onActionPress}>
          <Text variant="bodyMedium" style={styles.action} weight="semibold">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
