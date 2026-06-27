export type ProgressTrend = "up" | "down" | "neutral";

export interface ProgressCardProps {
  completionPercentage: number;

  completedHabits: number;

  totalHabits: number;

  currentStreak: number;

  bestStreak?: number;

  trend?: ProgressTrend;

  loading?: boolean;

  onPress?: () => void;

  testID?: string;
}
