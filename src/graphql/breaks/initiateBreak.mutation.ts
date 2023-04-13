import BREAK_FIELDS from '@/graphql/breaks/break.fragment';
import { gql } from '@apollo/client';

const INITIATE_BREAK_MUTATION = gql`
  ${BREAK_FIELDS}
  mutation initiateBreak(
    $addressees: [UUID]
    $startTime: DateTime
    $location: UUID
  ) {
    initiateBreak(
      addressees: $addressees
      startTime: $startTime
      location: $location
    ) {
      break_ {
        ...BreakFields
      }
      success
      errors
    }
  }
`;

export default INITIATE_BREAK_MUTATION;
