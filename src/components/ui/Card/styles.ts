import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.semantic.background.card,

      borderRadius: theme.radius.xl,

      overflow: "hidden",
    },

    elevated: {
      ...theme.shadows.md,
    },

    outlined: {
      borderWidth: 1,

      borderColor: theme.semantic.divider.default,
    },

    disabled: {
      opacity: 0.5,
    },

    padded: {
      padding: theme.spacing.lg,
    },
  });
