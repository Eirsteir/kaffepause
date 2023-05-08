import { gql } from '@apollo/client';

const SEARCH_USERS = gql`
  query search($query: String!, $first: Int) {
    searchUsers(query: $query, first: $first) {
      count
      totalCount
      edges {
        cursor
        node {
          id
          uuid
          name
          friendshipStatus
        }
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

export default SEARCH_USERS;
