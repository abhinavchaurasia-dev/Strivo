export const Assets = {
  logos: {
    default: require("../../assets/logos/Logo.png"),
    dark: require("../../assets/logos/logo-dark.png"),
    horizontal: require("../../assets/logos/logo-horizontal.png"),
    light: require("../../assets/logos/logo-light.png"),
    mark: require("../../assets/logos/logo-mark.png"),
  },

  hero: {
    wave: require("../../assets/hero/hero-wave.png"),
    glow: require("../../assets/hero/hero-glow.png"),
    flame: require("../../assets/hero/hero-flame.png"),
    gradient: require("../../assets/hero/hero-gradient.png"),
  },

  emptyStates: {
    noHabits: require("../../assets/empty-states/empty-no-habits.png"),
    noActivity: require("../../assets/empty-states/empty-no-activity.png"),
    noInsights: require("../../assets/empty-states/empty-no-insights.png"),
  },

  illustrations: {
    achievement: require("../../assets/illustrations/achievement.png"),
    heatmapLegend: require("../../assets/illustrations/heatmap-legend.png"),
    trendUp: require("../../assets/illustrations/trend-up.png"),
    trendDown: require("../../assets/illustrations/trend-down.png"),
  },

  milestones: {
    base: require("../../assets/milestones/base-illustration.png"),
    day3: require("../../assets/milestones/milestone-3.png"),
    day7: require("../../assets/milestones/milestone-7.png"),
    day14: require("../../assets/milestones/milestone-14.png"),
    day30: require("../../assets/milestones/milestone-30.png"),
    day50: require("../../assets/milestones/milestone-50.png"),
    day100: require("../../assets/milestones/milestone-100.png"),
  },
} as const;
