import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

const BREAK_INVITATION_FIELDS = gql`
  ${LOCATION_CHILD_FIELDS}

  fragment BreakUserFields on User {
    id
    uuid
    profilePic
    shortName
    name
    __typename
  }

  fragment BreakInvitationFields on BreakInvitation {
    id
    uuid
    context
    sender {
      ...BreakUserFields
    }
    addressees {
      edges {
        node {
          user {
            ...BreakUserFields
          }
          rsvp
          rsvpTitle
        }
      }
    }
    addresseeCount
    subject {
      id
      uuid
      title
      startingAt
      kicker
      isViewerInitiator
      location {
        ...LocationChildFields
      }
      participants {
        count
        edges {
          node {
            ...BreakUserFields
          }
        }
        __typename
      }
      __typename
    }
  }
`;

export default BREAK_INVITATION_FIELDS;
