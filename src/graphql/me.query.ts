import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const ME_QUERY = gql`
  ${USER_FIELDS}

  query me {
    me {
      id
      uuid
      name
      shortName
      profilePic
      username
      locale
      friends {
        totalCount
        edges {
          node {
            ...UserFields
          }
        }
      }
      preferredLocation {
        id
        uuid
        title
      }
      currentLocation {
        id
        uuid
        title
      }
      currentStatus {
        id
        statusType
        verb
        created
      }
    }
  }
`;

export default ME_QUERY;
