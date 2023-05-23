import AuthenticatedNav from '@/components/navigation/AuthenticatedNav';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';
import { useAuthenticatedUser } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';

export default function Navigation() {
  const { isAuthenticated, user, loading } = useAuthenticatedUser();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  // if (loading) {
  // return <LoadingNavBar />;
  // }

  if (isAuthenticated) {
    return <AuthenticatedNav user={user} />;
  }

  return (
    <BaseNavigation>
      <UnauthedAccountMenu />
    </BaseNavigation>
  );
}
