import { IUser } from '../../types/User';
import AccountMenu from './AccountMenu';
import BaseNavigation from './BaseNavigation';

interface IProps {
  user: IUser;
}

export default function AuthenticatedNav({ user }: IProps) {
  return (
    <BaseNavigation>
      <AccountMenu user={user} />
    </BaseNavigation>
  );
}
