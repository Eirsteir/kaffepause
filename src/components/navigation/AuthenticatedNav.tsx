import { User } from 'next-auth';

import Search from '@/components/modules/Search';
import AccountMenu from '@/components/navigation/AccountMenu';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import NextBreakActionCard from '@/components/navigation/NextBreakActionCard';
import NotificationsMenu from '@/components/navigation/NotificationsMenu';
import Box from '@mui/material/Box';

interface IProps {
  user: User;
}

export default function AuthenticatedNav({ user }: IProps) {
  return (
    <BaseNavigation>
      <Box sx={{ flex: '1 1 0px' }}>
        <NextBreakActionCard />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          flex: '1 1 0px',
          justifyContent: 'end',
        }}>
        <Search />
        <NotificationsMenu />
        <AccountMenu user={user} />
      </Box>
    </BaseNavigation>
  );
}
