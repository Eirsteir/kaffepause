import { useSession } from 'next-auth/react';

import Home from '@/components/home/Home';
import Landing from '@/components/landing/Landing';
import { useIsAuthenticated } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  // const { isAuthenticated, loading } = useIsAuthenticated();
  const { data: session, status } = useSession();
  console.log(session, status);
  const isAuthenticated = status === 'authenticated';
  const loading = status === 'loading';

  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  if (loading) {
    return null;
  }

  return isAuthenticated ? <Home /> : <Landing />;
}
