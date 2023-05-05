import { gql } from '@apollo/client';

const FRIEND_RECOMMENDATIONS_QUERY = gql`
  query friendRecommendations {
    friendRecommendations {
      edges {
        node {
          id
          uuid
          name
          shortName
          isViewerFriend
          socialContext
          preferredLocation {
            id
            uuid
            title
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export default FRIEND_RECOMMENDATIONS_QUERY;
