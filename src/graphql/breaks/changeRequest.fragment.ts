import { LOCATION_CHILD_FIELDS } from '@/graphql/locations/locations.query';
import { gql } from '@apollo/client';

const CHANGE_REQUEST_FIELDS = gql`
  ${LOCATION_CHILD_FIELDS}

  fragment ChangeRequestFields on ChangeRequest {
    id
    uuid
    created
    requestedTime
    requestedLocation {
      ...LocationChildFields
    }
    requestedBy {
      id
      uuid
      shortName
      __typename
    }
    __typename
  }
`;

export default CHANGE_REQUEST_FIELDS;
