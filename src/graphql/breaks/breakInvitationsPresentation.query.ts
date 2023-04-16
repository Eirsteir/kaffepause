import BREAK_INVITATION_FIELDS from '@/graphql/breaks/breakInvitation.fragment';
import { gql } from '@apollo/client';

const BREAKS_INVITATION_PRESENTATION_QUERY = gql`
  ${BREAK_INVITATION_FIELDS}

  query BreakInvitationsPresentation {
    breakInvitationsPresentation {
      id
      sections {
        id
        sectionId
        heading
        isEmpty
        emptyStateText
        emptyStateActionText
        items {
          edges {
            node {
              ...BreakInvitationFields
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

export default BREAKS_INVITATION_PRESENTATION_QUERY;
