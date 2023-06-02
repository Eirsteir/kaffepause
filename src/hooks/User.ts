import { getToken } from 'next-auth/jwt';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import apolloClient from '@/apollo-client-setup';
import ME_QUERY from '@/graphql/me.query';
import SEARCH_USERS from '@/graphql/searchUsers.query';
import UPDATE_PREFERRED_LOCATION_MUTATION from '@/graphql/updatePreferredLocation.mutation';
import USER_QUERY from '@/graphql/user.query';
import { User } from '@/types/User';
import {
  LazyQueryHookOptions,
  OperationVariables,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';

export const useAuthenticatedUser = () => {
  const { isAuthenticated } = useIsAuthenticated();
  const { data, loading, error } = useQuery(ME_QUERY, {
    skip: !isAuthenticated,
    onError: (error) => {
      console.error('me query error: ', error);
      signOut();
    },
  });
  return { isAuthenticated, user: data?.me, loading, error };
};

export const useMe = () => {
  const { isAuthenticated } = useIsAuthenticated();
  return useQuery(ME_QUERY, {
    skip: !isAuthenticated,
    onError: (error) => {
      console.error('me query error: ', error);
      signOut();
    },
  });
};

export const useIsAuthenticated = () => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const loading = status === 'loading';
  return { isAuthenticated, loading };
};

export const useUser = (userId?: User['uuid']) => {
  // const { isAuthenticated, loading: authLoading } = useIsAuthenticated();
  const logout = useLogout();
  const [getUser, { data, loading, error }] = useLazyQuery(USER_QUERY, {
    variables: { userId },
    onError: () => {
      if (!userId) {
        logout();
        window.location.reload();
      }
    },
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    getUser();
  }, [userId, getUser]);

  return { data, loading, error };
};

export const useLogout = () => signOut;

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

export const useUpdatePreferredLocation = (options?) =>
  useMutation(UPDATE_PREFERRED_LOCATION_MUTATION, {
    ...options,
    update(
      cache,
      {
        data: {
          updatePreferredLocation: { user },
        },
      },
    ) {
      cache.modify({
        fields: {
          user(existingUser = {}) {
            return {
              ...existingUser,
              ...user,
            };
          },
        },
      });
    },
  });
