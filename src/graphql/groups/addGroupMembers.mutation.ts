import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const ADD_GROUP_MEMBERS_MUTATION = gql`
  ${GROUP_FIELDS}
  mutation addGroupMembers($groupUuid: UUID!, $userUuids: [UUID]!) {
    addGroupMembers(groupUuid: $groupUuid, userUuids: $userUuids) {
      success
      errors
      group {
        ...GroupFields
      }
    }
  }
`;

export default ADD_GROUP_MEMBERS_MUTATION;
