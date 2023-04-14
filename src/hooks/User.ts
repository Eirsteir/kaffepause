import { getToken } from 'next-auth/jwt';
import { signOut, useSession } from 'next-auth/react';

import apolloClient from '@/apollo-client-setup';
import ME_QUERY from '@/graphql/me.query';
import SEARCH_USERS from '@/graphql/searchUsers.query';
import USER_QUERY from '@/graphql/user.query';
import { IUser } from '@/types/User';
import {
  ApolloError,
  LazyQueryHookOptions,
  OperationVariables,
  useLazyQuery,
  useQuery,
} from '@apollo/client';

type Me = {
  isAuthenticated: boolean;
  loading: boolean;
  error: ApolloError | undefined;
  me: IUser;
};

export const useMe = (): Me => {
  const { isAuthenticated, loading: isAuthLoading } = useIsAuthenticated();
  const { loading, error, data } = useQuery(ME_QUERY, {
    skip: !isAuthenticated || isAuthLoading,
    onError: (error) => {
      console.error('me query error: ', error);
      signOut();
    },
  });

  return {
    isAuthenticated,
    loading: loading || isAuthLoading,
    error,
    me: data?.me,
  };
};

export const useIsAuthenticated = () => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const loading = status === 'loading';
  return { isAuthenticated, loading };
};

export const getUser = async (userId: string, req, options) => {
  const token = await getToken({ req });
  const context = {
    headers: {
      authorization: `JWT ${token.account.access_token}`,
    },
  };
  return await apolloClient.query({
    query: USER_QUERY,
    variables: { userId },
    context,
    ...options,
  });
};

export const useSearchUsers = (
  options: LazyQueryHookOptions<any, OperationVariables> | undefined = {},
) => useLazyQuery(SEARCH_USERS, options);
