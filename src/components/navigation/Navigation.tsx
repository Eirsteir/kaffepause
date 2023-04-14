import AuthenticatedNav from '@/components/navigation/AuthenticatedNav';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';
import { useMe } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

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
