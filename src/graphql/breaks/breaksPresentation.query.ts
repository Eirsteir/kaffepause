import BREAK_FIELDS from '@/graphql/breaks/break.fragment';
import { gql } from '@apollo/client';

const BREAKS_PRESENTATION_QUERY = gql`
  ${BREAK_FIELDS}
  query BreaksPresentation {
    breaksPresentation {
      sections {
        sectionId
        heading
        isEmpty
        emptyStateText
        emptyStateActionText
        items {
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
      __typename
    }
  }
`;

export default BREAKS_PRESENTATION_QUERY;
