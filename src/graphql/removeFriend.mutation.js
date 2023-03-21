import { gql } from "@/__generated__";

const REMOVE_FRIEND_MUTATION = gql`
mutation unfriendUser($friend: String!) {
  unfriendUser(friend: $friend) {
    unfriendedPerson {
      id
      uuid
      name
      username
    }
    success
    errors
  }
}
`;

export default REMOVE_FRIEND_MUTATION;