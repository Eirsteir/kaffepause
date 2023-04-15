import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { IUser } from '@/types/User';
import URLS from '@/URLS';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import NavigationMenu from './NavigationMenu';

interface IProps {
  user: IUser;
}

export default function AccountMenu({ user }: IProps) {
  const router = useRouter();
  const dummyAction = () => undefined;

  return (
    <NavigationMenu user={user}>
      <MenuItem onClick={() => router.push(URLS.BREAKS)}>
        <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
          Pauser
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => router.push(`${URLS.USERS}/${user.uuid}`)}>
        <Typography variant='subtitle2'>Profil</Typography>
      </MenuItem>
      <MenuItem onClick={dummyAction}>
        <Typography variant='subtitle2'>Konto</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={dummyAction}>
        <Typography variant='subtitle2'>Hjelp</Typography>
      </MenuItem>
      <MenuItem onClick={() => signOut()}>
        <Typography variant='subtitle2'>Logg ut</Typography>
      </MenuItem>
    </NavigationMenu>
  );
}
