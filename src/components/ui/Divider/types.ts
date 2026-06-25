import type { StyleProp, ViewStyle } from "react-native";

export interface DividerProps {
  inset?: number;

  vertical?: boolean;

  style?: StyleProp<ViewStyle>;

  testID?: string;
}
