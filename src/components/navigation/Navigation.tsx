import { useSession } from 'next-auth/react';

import AuthenticatedNav from '@/components/navigation/AuthenticatedNav';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';

export default function Navigation() {
  const { data: session } = useSession();

  if (session && session.user) {
    return <AuthenticatedNav user={session.user} />;
  }

  return (
    <BaseNavigation noBorder>
      <UnauthedAccountMenu />
    </BaseNavigation>
  );
}
