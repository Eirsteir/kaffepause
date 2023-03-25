import SearchField from '@/components/elements/SearchField';
import AccountMenu from '@/components/navigation/AccountMenu';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import { IUser } from '@/types/User';

interface IProps {
  user: IUser;
}

export default function AuthenticatedNav({ user }: IProps) {
  return (
    <BaseNavigation>
      <SearchField />
      <AccountMenu user={user} />
    </BaseNavigation>
  );
}
