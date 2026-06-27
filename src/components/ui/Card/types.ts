import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface CardProps {
  children: ReactNode;

  elevated?: boolean;

  outlined?: boolean;

  pressable?: boolean;

  disabled?: boolean;

  padding?: boolean;

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;

  testID?: string;
}
