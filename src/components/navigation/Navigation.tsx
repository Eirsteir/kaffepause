import { useSession } from 'next-auth/react';

import AuthenticatedNav from '@/components/navigation/AuthenticatedNav';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';
import { useAuthenticatedUser } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function Navigation() {
  const { data: session, status } = useSession();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  // if (loading) {
  // return <LoadingNavBar />;
  // }

  if (status === 'authenticated' && session.user) {
    return <AuthenticatedNav user={session.user} />;
  }

  return (
    <BaseNavigation>
      <UnauthedAccountMenu />
    </BaseNavigation>
  );
}
