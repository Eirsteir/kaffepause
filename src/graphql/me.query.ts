import { gql } from '@apollo/client';

const ME_QUERY = gql`
  query me {
    me {
      id
      uuid
      name
      shortName
      profilePic
      locale
      friends {
        totalCount
        edges {
          node {
            id
            uuid
            name
            shortName
            profilePic
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
