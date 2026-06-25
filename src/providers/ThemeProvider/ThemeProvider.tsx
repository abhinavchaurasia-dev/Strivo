import { createContext, ReactNode, useContext, useMemo } from "react";

import { colors } from "@/theme/tokens/colors";
import { spacing } from "@/theme/tokens/spacing";
import { radius } from "@/theme/tokens/radius";
import { typography } from "@/theme/tokens/typography";
import { shadows } from "@/theme/tokens/shadows";
import { motion } from "@/theme/tokens/motion";
import { opacity } from "@/theme/tokens/opacity";
import { zIndex } from "@/theme/tokens/zIndex";

import { lightTheme } from "@/theme/semantic/light";
import { darkTheme } from "@/theme/semantic/dark";

import type { Theme } from "@/theme/types";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  dark?: boolean;
}

export function ThemeProvider({ children, dark = false }: ThemeProviderProps) {
  const theme = useMemo<Theme>(
    () => ({
      colors,
      spacing,
      radius,
      typography,
      shadows,
      motion,
      opacity,
      zIndex,

      semantic: dark ? darkTheme : lightTheme,

      dark,
    }),
    [dark],
  );

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext };
