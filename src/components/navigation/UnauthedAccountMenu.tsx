import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { IUser } from '@/types/User';
import URLS from '@/URLS';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import NavigationMenu from './NavigationMenu';

export default function UnauthedAccountMenu() {
  const router = useRouter();

  const dummyAction = () => undefined;

  const renderMenuItems = () => (
    <>
      <MenuItem onClick={() => router.push(URLS.SIGNUP)}>
        <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
          Register deg
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => router.push(URLS.SIGNIN)}>
        <Typography variant='subtitle2'>Logg inn</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={dummyAction}>
        <Typography variant='subtitle2'>Hjelp</Typography>
      </MenuItem>
    </>
  );

  return <NavigationMenu>{renderMenuItems()}</NavigationMenu>;
}
