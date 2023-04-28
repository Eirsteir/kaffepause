import BREAK_FIELDS from '@/graphql/breaks/break.fragment';
import { gql } from '@apollo/client';

const REQUEST_CHANGE_MUTATION = gql`
  ${BREAK_FIELDS}

  mutation requestChange(
    $breakUuid: UUID!
    $requestedLocationUuid: UUID
    $requestedTime: DateTime
  ) {
    requestChange(
      breakUuid: $breakUuid
      requestedLocationUuid: $requestedLocationUuid
      requestedTime: $requestedTime
    ) {
      success
      errors
      break_ {
        ...BreakFields
      }
      __typename
    }
  }
`;

export default REQUEST_CHANGE_MUTATION;
