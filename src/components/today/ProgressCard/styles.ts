import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 20,

      borderRadius: 20,

      backgroundColor: theme.semantic.background.card,

      rowGap: 16,

      ...theme.shadows.sm,
    },

    header: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",
    },

    progressTrack: {
      height: 10,

      borderRadius: 999,

      overflow: "hidden",

      backgroundColor: theme.semantic.divider.default,
    },

    progressFill: {
      height: "100%",

      borderRadius: 999,
    },

    footer: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",
    },
  });
