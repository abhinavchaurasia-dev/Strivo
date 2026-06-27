import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.semantic.background.card,

      borderRadius: 20,

      padding: 18,

      flexDirection: "row",

      alignItems: "center",

      marginBottom: 14,

      ...theme.shadows.sm,
    },

    emojiContainer: {
      width: 52,

      height: 52,

      borderRadius: 26,

      backgroundColor: theme.semantic.background.surface,

      justifyContent: "center",

      alignItems: "center",

      marginRight: 16,
    },

    content: {
      flex: 1,
    },

    footer: {
      flexDirection: "row",

      alignItems: "center",

      marginTop: 4,
    },

    completeButton: {
      width: 34,

      height: 34,

      borderRadius: 17,

      justifyContent: "center",

      alignItems: "center",

      backgroundColor: theme.semantic.button.primary.background,
    },

    completeButtonInactive: {
      backgroundColor: theme.semantic.background.surface,
    },
  });
