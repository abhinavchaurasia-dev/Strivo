import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,

      paddingTop: 16,

      paddingBottom: 140,
    },

    largeGap: {
      height: 20,
    },
  });
