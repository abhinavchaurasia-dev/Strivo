import { View } from "react-native";

import { useTheme } from "@/providers";

import { createStyles } from "./styles";
import type { SurfaceProps } from "./types";

export default function Surface({
  children,

  elevation = "sm",

  padded = true,

  border = false,

  radius = "xl",

  style,

  testID,
}: SurfaceProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View
      testID={testID}
      style={[
        styles.base,

        {
          borderRadius: theme.radius[radius],

          ...theme.shadows[elevation],
        },

        padded && styles.padded,

        border && styles.bordered,

        style,
      ]}
    >
      {children}
    </View>
  );
}
