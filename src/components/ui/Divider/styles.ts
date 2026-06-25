import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    horizontal: {
      height: 1,
      backgroundColor: theme.semantic.divider.default,
      width: "100%",
    },

    vertical: {
      width: 1,
      backgroundColor: theme.semantic.divider.default,
      height: "100%",
    },
  });
