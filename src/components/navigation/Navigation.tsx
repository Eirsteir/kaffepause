import { useSession } from 'next-auth/react';

import AuthenticatedNav from '@/components/navigation/AuthenticatedNav';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';
import { useAuthenticatedUser } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function Navigation() {
  const { isAuthenticated, user, loading } = useAuthenticatedUser();
  const { data: session, status } = useSession();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  // if (loading) {
  // return <LoadingNavBar />;
  // }

  if (isAuthenticated && session && session.user) {
    return <AuthenticatedNav user={session.user} />;
  }

  return (
    <BaseNavigation>
      <UnauthedAccountMenu />
    </BaseNavigation>
  );
}
