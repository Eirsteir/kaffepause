import { gql } from '@apollo/client';

const NOTIFICATIONS_QUERY = gql`
  query notifications($first: Int) {
    notifications(first: $first) {
      edges {
        node {
          id
          uuid
          seenState
          text
          created
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
