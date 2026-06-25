import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.semantic.background.card,
    },

    padded: {
      padding: theme.spacing.lg,
    },

    bordered: {
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });
