import { LOCATION_CHILD_FIELDS } from '@/graphql/locations.query';
import { gql } from '@apollo/client';

const BREAK_FIELDS = gql`
  ${LOCATION_CHILD_FIELDS}

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
    isViewerInitiator
    canViewerEditBreak
    kicker
    location {
      ...LocationChildFields
    }
    invitation {
      id
      uuid
      context
      sender {
        ...BreakUserFields
      }
      confirmed {
        count
        edges {
          node {
            ...BreakUserFields
          }
        }
      }
      addressees {
        edges {
          node {
            ...BreakUserFields
          }
        }
      }
      addresseeCount
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
`;

export default BREAK_FIELDS;
