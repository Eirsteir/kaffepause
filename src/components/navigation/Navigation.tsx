import { useMe } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

import AuthenticatedNav from './AuthenticatedNav';
import BaseNavigation from './BaseNavigation';
import UnauthedAccountMenu from './UnauthedAccountMenu';

export default function Navigation() {
  const { isAuthenticated, loading, error, me } = useMe();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  if (isAuthenticated && me) {
    return <AuthenticatedNav user={me} />;
  }

  return (
    <BaseNavigation>
      <UnauthedAccountMenu />
    </BaseNavigation>
  );
}
