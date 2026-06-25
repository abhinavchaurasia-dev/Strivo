import type { ColorTokens } from "./tokens/colors";
import type { SpacingTokens } from "./tokens/spacing";
import type { RadiusTokens } from "./tokens/radius";
import type { OpacityTokens } from "./tokens/opacity";
import type { ZIndexTokens } from "./tokens/zIndex";

export interface SemanticColors {
  background: {
    page: string;
    card: string;
    surface: string;
  };

  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };

  button: {
    primary: {
      background: string;
      text: string;
    };

    secondary: {
      background: string;
      text: string;
    };
  };

  input: {
    background: string;
    border: string;
    placeholder: string;
  };

  divider: {
    default: string;
  };

  navigation: {
    background: string;
    active: string;
    inactive: string;
  };

  feedback: {
    success: string;
    warning: string;
    error: string;
  };

  overlay: {
    default: string;
  };

  hero: {
    gradient: readonly [string, string];
  };
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;

  shadowOffset: {
    width: number;
    height: number;
  };

  elevation: number;
}

export interface ShadowTokens {
  none: ShadowStyle;

  xs: ShadowStyle;
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
  xl: ShadowStyle;
}

export interface MotionTokens {
  duration: {
    instant: number;

    fast: number;

    normal: number;

    medium: number;

    slow: number;
  };

  easing: {
    easeOut: string;

    easeIn: string;

    easeInOut: string;

    spring: string;
  };

  screen: {
    push: number;

    modal: number;

    bottomSheet: number;
  };

  component: {
    snackbar: number;

    fab: number;

    card: number;

    button: number;
  };
}

export interface TextStyleToken {
  fontSize: number;

  lineHeight: number;

  fontWeight: "400" | "500" | "600" | "700";

  letterSpacing: number;
}

export interface TypographyTokens {
  displayLarge: TextStyleToken;
  displayMedium: TextStyleToken;

  headlineLarge: TextStyleToken;
  headlineMedium: TextStyleToken;

  titleLarge: TextStyleToken;
  titleMedium: TextStyleToken;

  bodyLarge: TextStyleToken;
  bodyMedium: TextStyleToken;

  caption: TextStyleToken;

  label: TextStyleToken;
}

export interface Theme {
  colors: ColorTokens;

  semantic: SemanticColors;

  spacing: SpacingTokens;

  radius: RadiusTokens;

  typography: TypographyTokens;

  shadows: ShadowTokens;

  motion: MotionTokens;

  zIndex: ZIndexTokens;

  dark: boolean;
}
