import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 196,

      borderRadius: 24,

      overflow: "hidden",

      position: "relative",
    },

    content: {
      flex: 1,

      justifyContent: "center",

      paddingHorizontal: 24,

      paddingVertical: 22,

      zIndex: 5,
    },

    left: {
      flexDirection: "row",

      alignItems: "center",

      marginBottom: 18,
    },

    badge: {
      width: 56,

      height: 56,

      borderRadius: 28,

      backgroundColor: "rgba(255,255,255,0.15)",

      alignItems: "center",

      justifyContent: "center",

      marginRight: 16,
    },

    info: {
      flex: 1,
    },

    divider: {
      height: 1,

      backgroundColor: "rgba(255,255,255,0.22)",

      marginBottom: 18,
    },

    flame: {
      position: "absolute",

      width: 170,

      height: 170,

      right: -22,

      bottom: -18,

      opacity: 0.12,
    },

    wave: {
      position: "absolute",

      width: "100%",

      height: "100%",

      opacity: 0.08,
    },

    glow: {
      position: "absolute",

      width: 250,

      height: 250,

      right: -70,

      top: -70,

      opacity: 0.18,
    },
  });
