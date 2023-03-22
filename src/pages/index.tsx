import Home from '@/components/Home';
import Landing from '@/components/landing/Landing';
import { useIsAuthenticated } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  const { session, status, user, isAuthenticated } = useIsAuthenticated();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {status !== 'loading' && // TODO: find better solution
        (isAuthenticated ? <Home user={user!} /> : <Landing />)}
    </>
  );
}
