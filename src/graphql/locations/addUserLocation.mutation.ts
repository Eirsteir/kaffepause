import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

const ADD_USER_LOCATION_MUTATION = gql`
  ${LOCATION_CHILD_FIELDS}
  mutation addUserLocation($title: String!) {
    addUserLocation(title: $title) {
      success
      errors
      location {
        ...LocationChildFields
      }
    }
  }
`;

export default ADD_USER_LOCATION_MUTATION;
