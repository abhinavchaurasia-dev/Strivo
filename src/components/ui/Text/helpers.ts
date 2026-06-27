import type { FontWeightOverride, TextColor } from "./types";
import type { TextStyle } from "react-native";

import type { Theme } from "@/theme";

export function resolveTextColor(theme: Theme, color: TextColor) {
  switch (color) {
    case "secondary":
      return theme.semantic.text.secondary;

    case "disabled":
      return theme.semantic.text.disabled;

    case "success":
      return theme.semantic.feedback.success;

    case "warning":
      return theme.semantic.feedback.warning;

    case "error":
      return theme.semantic.feedback.error;

    case "inverse":
      return "#FFFFFF";

    case "inherit":
      return undefined;

    default:
      return theme.semantic.text.primary;
  }
}

export function resolveFontWeight(
  weight: FontWeightOverride | undefined,
  fallback: TextStyle["fontWeight"],
): TextStyle["fontWeight"] {
  switch (weight) {
    case "regular":
      return "400";

    case "medium":
      return "500";

    case "semibold":
      return "600";

    case "bold":
      return "700";

    default:
      return fallback;
  }
}
