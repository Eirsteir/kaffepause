import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  ${USER_FIELDS}
  mutation acceptFriendRequest($requester: String!) {
    acceptFriendRequest(requester: $requester) {
      friend {
        ...UserFields
      }
      success
      errors
    }
  }
`;

export default ACCEPT_FRIEND_REQUEST_MUTATION;
