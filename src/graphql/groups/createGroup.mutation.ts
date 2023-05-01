import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const CREATE_GROUP_MUTATION = gql`
  ${GROUP_FIELDS}

  mutation createGroup($name: String!) {
    createGroup(name: $name) {
      success
      errors
      group {
        ...Groupfields
      }
    }
  }
`;

export default CREATE_GROUP_MUTATION;
