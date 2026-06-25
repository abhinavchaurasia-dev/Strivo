import type { Theme } from "@/theme";

import type { ButtonVariant } from "./types";

export function getButtonColors(theme: Theme, variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return {
        background: theme.semantic.button.secondary.background,
        text: theme.semantic.button.secondary.text,
      };

    case "ghost":
      return {
        background: "transparent",
        text: theme.semantic.text.primary,
      };

    case "danger":
      return {
        background: theme.semantic.feedback.error,
        text: "#FFFFFF",
      };

    default:
      return {
        background: theme.semantic.button.primary.background,
        text: theme.semantic.button.primary.text,
      };
  }
}
