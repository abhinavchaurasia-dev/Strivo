import type { ReactNode } from "react";

import type { IconName } from "../Icon";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  title: string;

  onPress?: () => void;

  variant?: ButtonVariant;

  size?: ButtonSize;

  loading?: boolean;

  disabled?: boolean;

  leftIcon?: IconName;

  rightIcon?: IconName;

  fullWidth?: boolean;

  children?: ReactNode;

  testID?: string;
}
