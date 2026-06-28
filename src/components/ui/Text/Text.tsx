// src/components/ui/Text/Text.tsx

import React, { memo } from "react";
import { Text as RNText } from "react-native";

import { useTheme } from "@/providers";

import { resolveFontWeight, resolveTextColor } from "./helpers";
import { createStyles } from "./styles";
import type { AppTextProps } from "./types";

function Text({
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

export default memo(Text);
