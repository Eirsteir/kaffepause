import { gql } from '@apollo/client';

const FRIENDS_QUERY = gql`
  query friends {
    friends {
      edges {
        node {
          id
          uuid
          name
          image
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

export default FRIENDS_QUERY;
