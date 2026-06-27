import { colors } from "../tokens/colors";
import type { SemanticColors } from "../types";

export const darkTheme: SemanticColors = {
  background: {
    page: "#0F172A",
    card: "#1E293B",
    surface: "#334155",
  },

  text: {
    primary: "#F8FAFC",
    secondary: "#CBD5E1",
    disabled: "#94A3B8",
    inverse: "#FFFFFF",
  },

  button: {
    primary: {
      background: colors.primary,
      text: colors.white,
    },

    secondary: {
      background: "#334155",
      text: "#F8FAFC",
    },
  },

  input: {
    background: "#1E293B",
    border: "#334155",
    placeholder: "#94A3B8",
  },

  divider: {
    default: "#334155",
  },

  navigation: {
    background: "#1E293B",
    active: colors.primary,
    inactive: "#CBD5E1",
  },

  feedback: {
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  },

  overlay: {
    default: colors.overlay,
  },

  hero: {
    gradient: [colors.primary, colors.primaryLight],
  },
};
