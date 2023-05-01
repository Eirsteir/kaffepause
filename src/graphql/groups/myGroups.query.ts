import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const MY_GROUPS_QUERY = gql`
  ${GROUP_FIELDS}
  query myGroups {
    myGroups {
      ...Groupfields
    }
  }
`;

export default MY_GROUPS_QUERY;
