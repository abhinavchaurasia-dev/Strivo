import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type SurfaceElevation = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface SurfaceProps {
  children: ReactNode;

  elevation?: SurfaceElevation;

  padded?: boolean;

  border?: boolean;

  radius?: keyof import("@/theme").RadiusTokens;

  style?: StyleProp<ViewStyle>;

  testID?: string;
}
