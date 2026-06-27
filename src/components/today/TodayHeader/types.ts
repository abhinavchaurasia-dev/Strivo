export interface TodayHeaderProps {
  greeting: string;

  date: string;

  onNotificationPress?: () => void;

  notificationCount?: number;

  testID?: string;
}
