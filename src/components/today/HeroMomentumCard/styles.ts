import { StyleSheet } from "react-native";

import type { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 220,

      borderRadius: theme.radius["2xl"],

      overflow: "hidden",

      position: "relative",

      ...theme.shadows.lg,
    },

    wave: {
      position: "absolute",

      left: 0,

      top: 0,

      right: 0,

      bottom: 0,

      opacity: 0.08,
    },

    glow: {
      position: "absolute",

      top: -72,

      right: -82,

      opacity: 0.22,
    },

    secondaryGlow: {
      position: "absolute",

      left: -70,

      bottom: -120,

      opacity: 0.1,
    },

    content: {
      flex: 1,

      flexDirection: "row",

      paddingHorizontal: theme.spacing["2xl"],

      paddingVertical: theme.spacing.xl,

      zIndex: 10,
    },

    leftColumn: {
      flex: 1,

      justifyContent: "space-between",

      paddingRight: theme.spacing.lg,
    },

    rightColumn: {
      width: 150,

      justifyContent: "center",

      alignItems: "center",
    },

    streakRow: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "flex-start",
    },

    streakBlock: {
      flexDirection: "row",

      alignItems: "center",
    },

    streakMeta: {
      marginLeft: theme.spacing.md,

      marginTop: theme.spacing.sm,
    },

    streakCaption: {
      opacity: 0.82,

      marginTop: 2,
    },

    liveBadge: {
      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: theme.spacing.sm,

      paddingVertical: 6,

      borderRadius: theme.radius.pill,

      backgroundColor: "rgba(255,255,255,0.18)",
    },

    liveDot: {
      width: 6,

      height: 6,

      borderRadius: 3,

      backgroundColor: "#FFFFFF",

      marginRight: theme.spacing.xs,
    },

    spacingLarge: {
      height: theme.spacing.lg,
    },

    spacingMedium: {
      height: theme.spacing.md,
    },

    sectionTitle: {
      opacity: 0.8,

      marginBottom: theme.spacing.xs,

      letterSpacing: 1,
    },
    progressHeader: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginBottom: theme.spacing.sm,
    },

    progressTrack: {
      height: 8,

      borderRadius: theme.radius.pill,

      overflow: "hidden",

      backgroundColor: "rgba(255,255,255,0.18)",
    },

    progressFill: {
      height: "100%",

      borderRadius: theme.radius.pill,

      backgroundColor: "#FFFFFF",
    },

    footer: {
      flexDirection: "row",

      alignItems: "flex-end",

      justifyContent: "space-between",
    },

    footerLeft: {
      flex: 1,

      paddingRight: theme.spacing.md,
    },

    footerCaption: {
      opacity: 0.78,

      marginTop: theme.spacing.xs,
    },

    todayBadge: {
      justifyContent: "center",

      alignItems: "center",

      borderRadius: theme.radius.pill,

      paddingHorizontal: theme.spacing.md,

      paddingVertical: theme.spacing.sm,

      backgroundColor: "rgba(255,255,255,0.16)",
    },

    illustrationWrapper: {
      width: "100%",

      height: "100%",

      alignItems: "center",

      justifyContent: "center",

      position: "relative",
    },

    flame: {
      opacity: 0.95,

      transform: [
        {
          rotate: "-8deg",
        },
      ],
    },

    streakChip: {
      position: "absolute",

      bottom: 10,

      alignSelf: "center",

      borderRadius: theme.radius.pill,

      paddingHorizontal: theme.spacing.md,

      paddingVertical: theme.spacing.sm,

      backgroundColor: "rgba(255,255,255,0.18)",
    },
    topHighlight: {
      position: "absolute",

      top: 0,

      left: 0,

      right: 0,

      height: 72,

      backgroundColor: "rgba(255,255,255,0.08)",
    },

    bottomShadow: {
      position: "absolute",

      left: 0,

      right: 0,

      bottom: 0,

      height: 70,

      backgroundColor: "rgba(0,0,0,0.08)",
    },

    noiseOverlay: {
      ...StyleSheet.absoluteFillObject,

      opacity: 0.03,

      backgroundColor: "#FFFFFF",
    },
  });
