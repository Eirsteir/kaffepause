import { useMemo, PropsWithChildren } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from 'next-auth/jwt';


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL
});

const authLink = setContext(async (_, { headers }) => {
  const { token } = await fetch('http://localhost:3000/api/auth/token').then(res => res.json())
  const accessToken = token?.accessToken;
  console.log(token)
  console.log(accessToken)
    
  return {
    headers: {
      authorization: accessToken ? `JWT ${accessToken}`: null,
      ...headers,
    }
  }
});

const logLink = new ApolloLink((operation, forward) => {
  // console.debug('request', operation.getContext());
  return forward(operation).map((result) => {
      // console.debug('response', operation.getContext());
      return result;
  });
});

const link = authLink.concat(logLink).concat(httpLink);
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: link,
  cache: cache,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => apolloClient, [getToken])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default apolloClient;