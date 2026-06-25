/**
 * ------------------------------------------------------------------
 * Strivo Design Tokens
 * Spacing
 * ------------------------------------------------------------------
 * Only values defined here may be used throughout the application.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
} as const;

export type SpacingTokens = typeof spacing;
