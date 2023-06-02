import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

export const USER_FIELDS = gql`
  ${LOCATION_CHILD_FIELDS}
  fragment UserFields on User {
    id
    uuid
    name
    shortName
    image
    isViewerFriend
    socialContext
    friends {
      totalCount
      edges {
        node {
          id
          uuid
          name
          shortName
          image
          socialContext
          isViewerFriend
          __typename
        }
      }
      __typename
    }
    friendshipStatus
    preferredLocation {
      ...LocationChildFields
    }
    __typename
  }
`;

const USER_QUERY = gql`
  ${USER_FIELDS}
  query user($userId: UUID) {
    user(id: $userId) {
      ...UserFields
    }
  }
`;

export default USER_QUERY;
