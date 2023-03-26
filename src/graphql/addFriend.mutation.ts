import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const ADD_FRIEND_MUTATION = gql`
  ${USER_FIELDS}
  mutation friend_request($toFriend: String!) {
    sendFriendRequest(toFriend: $toFriend) {
      sentFriendRequestee {
        ...UserFields
      }
      success
      errors
    }
  }
`;

export default ADD_FRIEND_MUTATION;
