import Landing from '@/components/landing/Landing';
import Home from '@/components/layouts/Home';
import { useMe } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  // const { status, user, isAuthenticated } = useIsAuthenticated();
  const { isAuthenticated, loading, error, me } = useMe();
  console.log(isAuthenticated);
  console.log(me);
  console.log(typeof me);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <>
      {isAuthenticated && me !== undefined ? <Home user={me} /> : <Landing />}
    </>
  );
}
