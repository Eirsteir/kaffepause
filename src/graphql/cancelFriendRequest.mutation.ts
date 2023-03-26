import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  ${USER_FIELDS}
  mutation cancelFriendRequest($toFriend: String!) {
    cancelFriendRequest(toFriend: $toFriend) {
      cancelledFriendRequestee {
        ...UserFields
      }
      success
      errors
    }
  }
`;

export default CANCEL_FRIEND_REQUEST_MUTATION;
