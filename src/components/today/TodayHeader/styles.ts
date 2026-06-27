import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      marginBottom: theme.spacing.xl,
    },

    left: {
      flex: 1,
    },

    greeting: {
      marginBottom: theme.spacing.xs,
    },

    notificationButton: {
      width: 48,

      height: 48,

      borderRadius: 24,

      justifyContent: "center",

      alignItems: "center",

      backgroundColor: theme.semantic.background.card,

      ...theme.shadows.sm,
    },

    badge: {
      position: "absolute",

      right: 12,

      top: 12,

      width: 8,

      height: 8,

      borderRadius: 4,

      backgroundColor: theme.semantic.feedback.error,
    },
  });
