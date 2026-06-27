export interface HabitCardProps {
  id: string;

  emoji: string;

  title: string;

  reminder?: string;

  completed: boolean;

  streak?: number;

  onPress?: () => void;

  onComplete?: () => void;

  testID?: string;
}
