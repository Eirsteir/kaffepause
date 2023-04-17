import Search from '@/components/modules/Search';
import AccountMenu from '@/components/navigation/AccountMenu';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import NotificationsMenu from '@/components/navigation/NotificationsMenu';
import { User } from '@/types/User';

interface IProps {
  user: User;
}

export default function AuthenticatedNav({ user }: IProps) {
  return (
    <BaseNavigation>
      <Search />
      <NotificationsMenu user={user} />
      <AccountMenu user={user} />
    </BaseNavigation>
  );
}
