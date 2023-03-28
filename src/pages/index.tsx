import Landing from '@/components/landing/Landing';
import Home from '@/components/layouts/Home';
import { useMe } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  const { isAuthenticated, loading, error, me } = useMe();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (error) {
    console.log(error);
  }

  return <>{isAuthenticated ? <Home user={me} /> : <Landing />}</>;
}
