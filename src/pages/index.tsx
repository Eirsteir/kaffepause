import { useSession } from 'next-auth/react';

import Home from '@/components/home/Home';
import Landing from '@/components/landing/Landing';
import { useHasMounted } from '@/hooks/utils';

export default function LandingPage() {
  const { status } = useSession();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  if (status === 'loading') {
    return null;
  }

  return status === 'authenticated' ? <Home /> : <Landing />;
}
