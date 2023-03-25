import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';

import apolloClient from '@/apollo-client-setup';
import SEARCH_USERS from '@/graphql/searchUsers.query';
import USER_QUERY from '@/graphql/user.query';
import { IUser } from '@/types/User';
import {
  LazyQueryHookOptions,
  OperationVariables,
  useLazyQuery,
} from '@apollo/client';

type Authentication = {
  session: any;
  status: string;
  user?: IUser;
  isAuthenticated: boolean;
  loading: boolean;
};

export const useIsAuthenticated = (): Authentication => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const loading = status === 'loading';
  const user = session?.user as IUser;

  return { session, status, user, isAuthenticated, loading };
};

export const getUser = async (userId: string, req) => {
  const token = await getToken({ req });
  const context = {
    headers: {
      authorization: `JWT ${token.account.accessToken}`,
    },
  };
  return await apolloClient.query({
    query: USER_QUERY,
    variables: { userId: userId },
    context,
  });
};

export const useSearchUsers = (
  options: LazyQueryHookOptions<any, OperationVariables> | undefined = {},
) => useLazyQuery(SEARCH_USERS, options);
