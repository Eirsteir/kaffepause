import { LOCATION_CHILD_FIELDS } from '@/graphql/locations.query';
import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const BREAK_FIELDS = gql`
  ${USER_FIELDS}
  ${LOCATION_CHILD_FIELDS}
  fragment BreakFields on Break {
    id
    uuid
    startingAt
    location {
      ...LocationChildFields
    }
    invitation {
      id
      uuid
      sender {
        id
        uuid
        name
      }
      acceptees {
        count
        edges {
          node {
            ...UserFields
          }
        }
      }
      addressees {
        edges {
          node {
            ...UserFields
          }
        }
      }
      addresseeCount
    }
    participants {
      count
      edges {
        node {
          id
          uuid
          username
          name
          __typename
        }
      }
      __typename
    }
    __typename
  }
`;

export default BREAK_FIELDS;
