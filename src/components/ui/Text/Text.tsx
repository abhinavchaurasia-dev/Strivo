import React from "react";
import { Text as RNText } from "react-native";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import { resolveFontWeight, resolveTextColor } from "./helpers";
import type { AppTextProps } from "./types";

export default function Text({
  children,

  variant = "bodyMedium",

  color = "primary",

  weight,

  align = "auto",

  selectable = false,

  allowFontScaling = true,

  maxFontSizeMultiplier = 2,

  numberOfLines,

  style,

  testID,

  accessibilityLabel,

  accessibilityRole,
}: AppTextProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  const typography = theme.typography[variant] ?? theme.typography.bodyMedium;
  
  return (
    <RNText
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      selectable={selectable}
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        typography,
        {
          color: resolveTextColor(theme, color),
          textAlign: align,
          fontWeight: resolveFontWeight(weight, typography.fontWeight),
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}
