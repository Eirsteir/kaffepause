import GROUP_FIELDS from '@/graphql/groups/group.fragment';
import { gql } from '@apollo/client';

const GROUP_QUERY = gql`
  ${GROUP_FIELDS}

  query group($uuid: UUID!) {
    group(uuid: $uuid) {
      ...GroupFields
    }
  }
`;

export default GROUP_QUERY;
