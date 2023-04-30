import MARK_ALL_AS_READ_MUTATION from '@/graphql/notifications/markAllAsSeen.mutation';
import NOTIFICATIONS_QUERY from '@/graphql/notifications/notifications.query';
import NOTIFICATIONS_BADGE_COUNT_QUERY from '@/graphql/notifications/notificationsBadgeCount.query';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export const useNotificationsBagdeCount = () =>
  useQuery(NOTIFICATIONS_BADGE_COUNT_QUERY);

export const useNotifications = () => useLazyQuery(NOTIFICATIONS_QUERY);

export const useMarkAllNotificationsAsSeen = () =>
  useMutation(MARK_ALL_AS_READ_MUTATION, {
    update(
      cache,
      {
        data: {
          markAllAsSeen: { notificationBadgeCount },
        },
      },
    ) {
      cache.modify({
        fields: {
          notificationBadgeCount(existingNotificationBadgeCount = {}) {
            return {
              ...existingNotificationBadgeCount,
              ...notificationBadgeCount,
            };
          },
        },
      });
    },
  });
