import { gql } from "@/__generated__";
import { LOCATION_CHILD_FIELDS } from './locations.query';

const INITIATE_BREAK_MUTATION = gql`
${LOCATION_CHILD_FIELDS}
mutation initiateBreak($addressees: [UUID], $startTime: DateTime, $location: UUID) {
  initiateBreak(addressees: $addressees, startTime: $startTime, location: $location) {
    break_ {
      id
      uuid
      invitation {
        id
        uuid
        created
        sender {
          id
          uuid
          name
        }
        addresseeCount
      }
      participants {
        count
        edges {
          node {
            id
            uuid
            username
          }
        }
      }
      startingAt
      location {
        ...LocationChildFields
      }
    }
  success
  errors
  }
}
`;

export default INITIATE_BREAK_MUTATION;