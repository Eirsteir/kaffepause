import { gql } from '@apollo/client';

const GROUP_FIELDS = gql`
  fragment Groupfields on Group {
    id
    uuid
    name
    created
    creator {
      id
      uuid
      name
      shortName
      profilePic
      __typename
    }
    members {
      id
      uuid
      name
      shortName
      profilePic
      __typename
    }
    __typename
  }
`;

export default GROUP_FIELDS;
