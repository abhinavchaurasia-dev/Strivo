import { colors } from "../tokens/colors";
import type { SemanticColors } from "../types";

export const lightTheme: SemanticColors = {
  background: {
    page: colors.background,
    card: colors.surface,
    surface: colors.surfaceVariant,
  },

  text: {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    disabled: colors.textDisabled,
  },

  button: {
    primary: {
      background: colors.primary,
      text: colors.white,
    },

    secondary: {
      background: colors.surfaceVariant,
      text: colors.textPrimary,
    },
  },

  input: {
    background: colors.surface,
    border: colors.border,
    placeholder: colors.textDisabled,
  },

  divider: {
    default: colors.divider,
  },

  navigation: {
    background: colors.surface,
    active: colors.primary,
    inactive: colors.textSecondary,
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
