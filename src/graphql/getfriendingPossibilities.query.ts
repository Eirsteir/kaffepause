import { gql } from '@apollo/client';

const GET_FRIENDING_POSSIBILITIES_QUERY = gql`
  query friendingPossibilities {
    friendingPossibilities {
      count
      edges {
        node {
          id
          uuid
          name
          shortName
          username
          friendshipStatus
          socialContext
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      __typename
    }
  }
`;

export default GET_FRIENDING_POSSIBILITIES_QUERY;
