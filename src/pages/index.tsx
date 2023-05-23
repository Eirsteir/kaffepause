import Home from '@/components/home/Home';
import Landing from '@/components/landing/Landing';
import { useIsAuthenticated } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  const { isAuthenticated, loading } = useIsAuthenticated();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  if (loading) {
    return null;
  }

  return isAuthenticated ? <Home /> : <Landing />;
}
