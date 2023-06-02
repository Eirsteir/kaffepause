import { gql } from '@apollo/client';

const ME_QUERY = gql`
  query me {
    me {
      id
      uuid
      name
      shortName
      image
      friends {
        totalCount
        edges {
          node {
            id
            uuid
            name
            shortName
            image
          }
        }
      }
      preferredLocation {
        id
        uuid
        title
      }
      groups {
        id
        uuid
        name
      }
    }
  }
`;

export default ME_QUERY;
