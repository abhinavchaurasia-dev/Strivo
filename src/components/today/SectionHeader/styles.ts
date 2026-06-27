import { StyleSheet } from "react-native";
import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    action: {
      color: theme.colors.primary[500],
    },
  });
