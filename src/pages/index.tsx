import Landing from '@/components/landing/Landing';
import Home from '@/components/layouts/Home';
import { useIsAuthenticated } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  const { status, user, isAuthenticated } = useIsAuthenticated();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {status !== 'loading' &&
        // TODO: find better solution
        (isAuthenticated ? <Home user={user} /> : <Landing />)}
    </>
  );
}
