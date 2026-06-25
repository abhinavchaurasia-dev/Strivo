import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      paddingVertical: theme.spacing.md,
    },

    side: {
      width: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    center: {
      flex: 1,
      alignItems: "center",
    },
  });
