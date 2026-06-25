/**
 * ------------------------------------------------------------------
 * Strivo Design Tokens
 * Border Radius
 * ------------------------------------------------------------------
 */

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,

  pill: 9999,
} as const;

export type RadiusTokens = typeof radius;
