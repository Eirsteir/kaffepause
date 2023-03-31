import BREAK_FIELDS from '@/graphql/break.fragment';
import { gql } from '@apollo/client';

const NEXT_BREAK_QUERY = gql`
  ${BREAK_FIELDS}
  query nextBreak {
    nextBreak {
      ...BreakFields
    }
  }
`;

export default NEXT_BREAK_QUERY;
