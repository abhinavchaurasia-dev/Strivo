import React from "react";

import { ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { ScreenProps } from "./types";

export default function Screen({
  children,

  scrollable = false,

  safeArea = true,

  padded = true,

  backgroundColor,

  style,

  contentContainerStyle,

  testID,

  accessibilityLabel,
}: ScreenProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  const containerStyle = [
    styles.container,

    backgroundColor ? { backgroundColor } : null,

    padded ? styles.padded : null,

    style,
  ];

  const content = scrollable ? (
    <ScrollView
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={containerStyle}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={[containerStyle, contentContainerStyle]}
    >
      {children}
    </View>
  );

  if (!safeArea) {
    return content;
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {content}
    </SafeAreaView>
  );
}
