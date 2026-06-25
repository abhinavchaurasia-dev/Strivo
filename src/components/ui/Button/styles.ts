import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",

      justifyContent: "center",

      alignItems: "center",

      borderRadius: theme.radius.lg,

      paddingHorizontal: theme.spacing.lg,

      paddingVertical: theme.spacing.md,

      gap: theme.spacing.sm,
    },

    text: {},

    fullWidth: {
      width: "100%",
    },

    disabled: {
      opacity: 0.5,
    },
  });
