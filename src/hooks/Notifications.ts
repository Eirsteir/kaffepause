import NOTIFICATIONS_QUERY from '@/graphql/notifications/notifications.query';
import NOTIFICATIONS_BADGE_COUNT_QUERY from '@/graphql/notifications/notificationsBadgeCount.query';
import { useQuery } from '@apollo/client';

export const useNotificationsBagdeCount = () =>
  useQuery(NOTIFICATIONS_BADGE_COUNT_QUERY);

export const useNotifications = (options) =>
  useQuery(NOTIFICATIONS_QUERY, options);
