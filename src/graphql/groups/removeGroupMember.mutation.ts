import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const REMOVE_GROUP_MEMBER_MUTATION = gql`
  ${GROUP_FIELDS}
  mutation removeGroupMember($groupUuid: UUID!, $memberUuid: UUID!) {
    removeGroupMember(groupUuid: $groupUuid, memberUuid: $memberUuid) {
      success
      errors
      group {
        ...GroupFields
      }
    }
  }
`;

export default REMOVE_GROUP_MEMBER_MUTATION;
