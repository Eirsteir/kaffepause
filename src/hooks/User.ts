import { useSession } from 'next-auth/react';

import { IUser } from '@/types/User';

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
