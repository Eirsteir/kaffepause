import { gql } from '@apollo/client';

const MARK_ALL_AS_READ_MUTATION = gql`
  mutation markAllAsSeen {
    markAllAsSeen {
      notificationBadgeCount {
        id
        count
        __typename
      }
    }
  }
`;

export default MARK_ALL_AS_READ_MUTATION;
