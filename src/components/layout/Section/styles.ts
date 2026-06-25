import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      marginBottom: theme.spacing.md,
    },

    titles: {
      flex: 1,
    },
  });
