import { gql } from '@apollo/client';

const NOTIFICATIONS_BADGE_COUNT_QUERY = gql`
  query notificationsBadgeCount {
    notificationBadgeCount {
      id
      count
      __typename
    }
  }
`;

export default NOTIFICATIONS_BADGE_COUNT_QUERY;
