import { gql } from '@apollo/client';

const NOTIFICATIONS_QUERY = gql`
  query notifications($first: Int, $after: Int) {
    notifications(first: $first, after: $after) {
      edges {
        node {
          id
          uuid
          seenState
          text
          url
          actor {
            id
            uuid
            name
            shortName
            profilePic
            __typename
          }
          __typename
        }
      }
      pageInfo {
        hasNextPage
        __typename
      }
    }
  }
`;

export default NOTIFICATIONS_QUERY;
