import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const REJECT_FRIEND_REQUEST_MUTATION = gql`
  ${USER_FIELDS}

  mutation rejectFriendRequest($requester: String!) {
    rejectFriendRequest(requester: $requester) {
      rejectedFriendRequestee {
        ...UserFields
      }
      success
      errors
    }
  }
`;

export default REJECT_FRIEND_REQUEST_MUTATION;
