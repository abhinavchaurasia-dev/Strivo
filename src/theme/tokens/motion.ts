/**
 * ------------------------------------------------------------------
 * Strivo Design Tokens
 * Motion
 * ------------------------------------------------------------------
 * All durations are in milliseconds.
 */

export const motion = {
  duration: {
    instant: 100,

    fast: 180,

    normal: 220,

    medium: 280,

    slow: 320,
  },

  easing: {
    easeOut: "easeOut",

    easeIn: "easeIn",

    easeInOut: "easeInOut",

    spring: "spring",
  },

  screen: {
    push: 300,

    modal: 280,

    bottomSheet: 320,
  },

  component: {
    snackbar: 220,

    fab: 180,

    card: 200,

    button: 180,
  },
} as const;
