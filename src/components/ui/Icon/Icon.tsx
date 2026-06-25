import { Feather } from "@expo/vector-icons";

import { useTheme } from "@/providers";

import type { IconProps } from "./types";

export default function Icon({ name, size = 24, color }: IconProps) {
  const theme = useTheme();

  return (
    <Feather
      name={name}
      size={size}
      color={color ?? theme.semantic.text.primary}
    />
  );
}
