import { gql } from '@apollo/client';

const MY_ACCOUNT_QUERY = gql`
  query myAccount {
    myAccount {
      id
      uuid
      email
      archived
      verified
      secondaryEmail
      __typename
    }
  }
`;

export default MY_ACCOUNT_QUERY;
