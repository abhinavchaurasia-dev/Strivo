import React from "react";

import { Pressable, View } from "react-native";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { CardProps } from "./types";

export default function Card({
  children,

  elevated = true,

  outlined = false,

  pressable = false,

  disabled = false,

  padding = true,

  onPress,

  style,

  testID,
}: CardProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  const cardStyle = [
    styles.card,

    elevated && styles.elevated,

    outlined && styles.outlined,

    disabled && styles.disabled,

    padding && styles.padded,

    style,
  ];

  if (pressable) {
    return (
      <Pressable
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        android_ripple={{
          color: "rgba(0,0,0,0.06)",
        }}
        style={({ pressed }) => [
          cardStyle,
          pressed && {
            opacity: 0.92,
          },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={cardStyle}>
      {children}
    </View>
  );
}
