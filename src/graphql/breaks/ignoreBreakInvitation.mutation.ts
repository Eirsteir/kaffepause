import { gql } from '@apollo/client';

const IGNORE_BREAK_INVITATION = gql`
  mutation ignoreBreakInvitation($invitation: UUID) {
    ignoreBreakInvitation(invitation: $invitation) {
      invitation {
        id
        uuid
        subject {
          id
          uuid
          startingAt
          participants {
            count
            edges {
              node {
                id
                uuid
                name
                username
                __typename
              }
            }
          }
        }
      }
      success
      errors
    }
  }
`;

export default IGNORE_BREAK_INVITATION;
