import type { ComponentProps } from "react";

import { Feather } from "@expo/vector-icons";

export type IconName = ComponentProps<typeof Feather>["name"];

export interface IconProps {
  name: IconName;

  size?: number;

  color?: string;
}
