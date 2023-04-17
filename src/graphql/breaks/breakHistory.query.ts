import BREAK_FIELDS from '@/graphql/breaks/break.fragment';
import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

const BREAK_HISTORY_QUERY = gql`
  ${LOCATION_CHILD_FIELDS}
  ${BREAK_FIELDS}
  query breakHistory {
    breakHistory {
      edges {
        node {
          ...BreakFields
        }
        __typename
      }
      pageInfo {
        hasNextPage
        __typename
      }
      __typename
    }
    __typename
  }
`;

export default BREAK_HISTORY_QUERY;
