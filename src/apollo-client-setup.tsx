import { getToken } from 'next-auth/jwt';
import { getCsrfToken } from 'next-auth/react';
import { PropsWithChildren, useMemo } from 'react';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const { token } = await fetch('api/auth/token').then((res) => res.json());
  // const csrftoken = await getCsrfToken();

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      // 'x-csrftoken': csrftoken ? csrftoken : '',
      ...headers,
    },
  };
});

const logLink = new ApolloLink((operation, forward) => {
  // console.debug('request', operation.getContext());
  return forward(operation).map((result) => {
    // console.debug('response', operation.getContext());
    return result;
  });
});

const link = authLink.concat(logLink).concat(httpLink);
const cache = new InMemoryCache({
  dataIdFromObject: (o) => {
    o.id ? `${o.__typename}-${o.id}` : `${o.__typename}-${o.cursor}`;
  },
});

const apolloClient = new ApolloClient({
  link: link,
  cache: cache,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => apolloClient, [getToken, getCsrfToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default apolloClient;
