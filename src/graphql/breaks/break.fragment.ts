import CHANGE_REQUEST_FIELDS from '@/graphql/breaks/changeRequest.fragment';
import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

const BREAK_FIELDS = gql`
  ${LOCATION_CHILD_FIELDS}
  ${CHANGE_REQUEST_FIELDS}

  fragment BreakUserFields on User {
    id
    uuid
    profilePic
    shortName
    name
    __typename
  }

  fragment BreakFields on Break {
    id
    uuid
    title
    startingAt
    hasPassed
    isExpired
    isViewerInitiator
    canViewerEditBreak
    kicker
    location {
      ...LocationChildFields
    }
    initiator {
      ...BreakUserFields
    }
    invitation {
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
      recipientGroup {
        id
        uuid
        name
      }
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
    changeRequests {
      ...ChangeRequestFields
    }
    __typename
  }
`;

export default BREAK_FIELDS;
