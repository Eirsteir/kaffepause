import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const EDIT_GROUP_NAME_MUTATION = gql`
  ${GROUP_FIELDS}
  mutation editGroupName($groupUuid: UUID!, $name: String!) {
    editGroupName(groupUuid: $groupUuid, name: $name) {
      success
      errors
      group {
        ...GroupFields
      }
    }
  }
`;

export default EDIT_GROUP_NAME_MUTATION;
