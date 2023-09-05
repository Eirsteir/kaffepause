import BREAK_FIELDS from '@/graphql/breaks/break.fragment';
import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

const UPCOMING_BREAKS_QUERY = gql`
  ${LOCATION_CHILD_FIELDS}
  ${BREAK_FIELDS}
  query upcomingBreaks($after: String, $first: Int) {
    upcomingBreaks(after: $after, first: $first) {
      totalCount
      count
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

export default UPCOMING_BREAKS_QUERY;
