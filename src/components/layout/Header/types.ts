import type { ReactNode } from "react";

import type { IconName } from "@/components/ui/Icon/types";

export interface HeaderProps {
  title: string;

  subtitle?: string;

  leftIcon?: IconName;

  rightIcon?: IconName;

  onLeftPress?: () => void;

  onRightPress?: () => void;

  rightComponent?: ReactNode;

  testID?: string;
}
