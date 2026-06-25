export interface ColorTokens {
  primary: string;
  primaryLight: string;
  primaryContainer: string;

  secondary: string;

  success: string;
  warning: string;
  error: string;
  info: string;

  background: string;
  surface: string;
  surfaceVariant: string;

  border: string;
  divider: string;

  textPrimary: string;
  textSecondary: string;
  textDisabled: string;

  overlay: string;
}

export interface SemanticColors {
  pageBackground: string;

  cardBackground: string;

  buttonPrimary: string;
  buttonSecondary: string;

  inputBackground: string;

  navigationBar: string;

  divider: string;

  successSurface: string;
  warningSurface: string;
  errorSurface: string;

  heroGradient: readonly [string, string];
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
  "6xl": number;
}

export interface RadiusTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;

  pill: number;
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
  quick: number;
  normal: number;
  slow: number;

  spring: object;
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

export interface ZIndexTokens {
  base: number;

  card: number;

  fab: number;

  snackbar: number;

  modal: number;

  tooltip: number;
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
