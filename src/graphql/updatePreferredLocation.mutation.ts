import { USER_FIELDS } from '@/graphql/user.query';
import { gql } from '@apollo/client';

const UPDATE_PREFERRED_LOCATION_MUTATION = gql`
  ${USER_FIELDS}
  mutation updatePreferredLocation($locationUuid: UUID!) {
    updatePreferredLocation(locationUuid: $locationUuid) {
      success
      errors
      user {
        ...UserFields
      }
    }
  }
`;

export default UPDATE_PREFERRED_LOCATION_MUTATION;
