import BREAK_FIELDS from '@/graphql/breaks/break.fragment';
import { gql } from '@apollo/client';

const BREAK_QUERY = gql`
  ${BREAK_FIELDS}
  query Break($breakUuid: UUID!) {
    break_(uuid: $breakUuid) {
      ...BreakFields
    }
  }
`;

export default BREAK_QUERY;
