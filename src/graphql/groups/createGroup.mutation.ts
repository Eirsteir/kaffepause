import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const CREATE_GROUP_MUTATION = gql`
  ${GROUP_FIELDS}

  mutation createGroup($name: String!, $members: [UUID]) {
    createGroup(name: $name, members: $members) {
      success
      errors
      group {
        ...GroupFields
      }
    }
  }
`;

export default CREATE_GROUP_MUTATION;
