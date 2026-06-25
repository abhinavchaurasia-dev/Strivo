import { View } from "react-native";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { DividerProps } from "./types";

export default function Divider({
  inset = 0,
  vertical = false,
  style,
  testID,
}: DividerProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View
      testID={testID}
      style={[
        vertical ? styles.vertical : styles.horizontal,

        vertical
          ? {
              marginVertical: inset,
            }
          : {
              marginHorizontal: inset,
            },

        style,
      ]}
    />
  );
}
