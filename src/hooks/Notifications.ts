import NOTIFICATIONS_QUERY from '@/graphql/notifications/notifications.query';
import NOTIFICATIONS_BADGE_COUNT_QUERY from '@/graphql/notifications/notificationsBadgeCount.query';
import { useLazyQuery, useQuery } from '@apollo/client';

export const useNotificationsBagdeCount = () =>
  useQuery(NOTIFICATIONS_BADGE_COUNT_QUERY);

export const useNotifications = () => useLazyQuery(NOTIFICATIONS_QUERY);
