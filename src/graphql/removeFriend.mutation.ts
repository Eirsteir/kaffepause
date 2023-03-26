import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const REMOVE_FRIEND_MUTATION = gql`
  ${USER_FIELDS}

  mutation unfriendUser($friend: String!) {
    unfriendUser(friend: $friend) {
      unfriendedPerson {
        ...UserFields
      }
      success
      errors
    }
  }
`;

export default REMOVE_FRIEND_MUTATION;
