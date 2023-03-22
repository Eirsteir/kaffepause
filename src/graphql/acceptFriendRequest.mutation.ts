import { gql } from "@/__generated__";

export const ACCEPT_FRIEND_REQUEST_MUTATION = gql(`
mutation acceptFriendRequest($requester: String!) {
    acceptFriendRequest(requester: $requester) {
      friend {
        id
        uuid
        name
        username
        isViewerFriend
        currentStatus {
          statusType
          verb
          created
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
      }
      success
      errors
    }
  }
`);


