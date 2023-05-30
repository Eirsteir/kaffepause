import { gql } from '@apollo/client';

const SOCIAL_AUTH_MUTATION = gql`
  mutation socialAuth($provider: String!, $accessToken: String!) {
    socialAuth(provider: $provider, accessToken: $accessToken) {
      accessToken
      user {
        id
        uuid
        email
        name
      }
    }
  }
`;

export default SOCIAL_AUTH_MUTATION;
