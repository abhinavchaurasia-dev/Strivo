/**
 * ------------------------------------------------------------------
 * Strivo Design Tokens
 * Opacity
 * ------------------------------------------------------------------
 */

export const opacity = {
  disabled: 0.38,

  medium: 0.6,

  high: 0.87,

  overlay: 0.5,

  pressed: 0.12,

  hover: 0.08,
} as const;

export type OpacityTokens = typeof opacity;
