import BREAK_INVITATION_FIELDS from '@/graphql/breaks/breakInvitation.fragment';
import { gql } from '@apollo/client';

const PENDING_BREAK_INVITATIONS_QUERY = gql`
  ${BREAK_INVITATION_FIELDS}

  query pendingBreakInvitations(
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    pendingBreakInvitations(
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      count
      totalCount
      edges {
        node {
          ...BreakInvitationFields
        }
        __typename
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      __typename
    }
  }
`;

export default PENDING_BREAK_INVITATIONS_QUERY;
