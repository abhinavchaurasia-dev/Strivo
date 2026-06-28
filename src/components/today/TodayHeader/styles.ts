import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing["2xl"],
    },

    content: {
      flex: 1,
      paddingRight: theme.spacing.lg,
    },

    greeting: {
      marginBottom: theme.spacing.xs,
    },

    notificationButton: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.pill,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: theme.semantic.background.card,

      ...theme.shadows.sm,
    },

    notificationButtonPressed: {
      opacity: 0.8,
    },

    badge: {
      position: "absolute",

      top: 8,
      right: 8,

      minWidth: 16,
      height: 16,

      borderRadius: theme.radius.pill,

      paddingHorizontal: 4,

      alignItems: "center",
      justifyContent: "center",

      backgroundColor: theme.semantic.feedback.error,
    },
  });
