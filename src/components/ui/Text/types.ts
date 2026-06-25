import type { ReactNode } from "react";
import type { AccessibilityRole, StyleProp, TextStyle } from "react-native";

import type { TypographyTokens } from "@/theme";

export type TextVariant = keyof TypographyTokens;

export type TextColor =
  | "primary"
  | "secondary"
  | "disabled"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type FontWeightOverride = "regular" | "medium" | "semibold" | "bold";

export interface AppTextProps {
  children: ReactNode;

  variant?: TextVariant;

  color?: TextColor;

  weight?: FontWeightOverride;

  align?: "left" | "center" | "right" | "auto";

  selectable?: boolean;

  allowFontScaling?: boolean;

  maxFontSizeMultiplier?: number;

  numberOfLines?: number;

  style?: StyleProp<TextStyle>;

  testID?: string;

  accessibilityLabel?: string;

  accessibilityRole?: AccessibilityRole;
}
