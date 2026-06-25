import type { ReactNode } from "react";

import type { StyleProp, ViewStyle } from "react-native";

export interface ScreenProps {
  children: ReactNode;

  /**
   * Wrap content inside a ScrollView.
   * @default false
   */
  scrollable?: boolean;

  /**
   * Respect device safe areas.
   * @default true
   */
  safeArea?: boolean;

  /**
   * Apply default horizontal & vertical padding.
   * @default true
   */
  padded?: boolean;

  /**
   * Override the page background.
   * Uses semantic theme colors.
   */
  backgroundColor?: string;

  style?: StyleProp<ViewStyle>;

  contentContainerStyle?: StyleProp<ViewStyle>;

  testID?: string;

  accessibilityLabel?: string;
}
