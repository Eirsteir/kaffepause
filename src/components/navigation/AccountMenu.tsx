import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import URLS from '@/URLS';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import NavigationMenu from './NavigationMenu';

interface IProps {
  user: User;
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
      <MenuItem onClick={() => router.push(URLS.INVITATIONS)}>
        <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
          Invitasjoner
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => router.push(URLS.GROUPS)}>
        <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
          Grupper
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => router.push(`${URLS.USERS}/${user.id}`)}>
        <Typography variant='subtitle2'>Profil</Typography>
      </MenuItem>
      <MenuItem onClick={() => router.push(URLS.ACCOUNT)}>
        <Typography variant='subtitle2'>Konto</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={dummyAction}>
        <Typography variant='subtitle2'>Hjelp</Typography>
      </MenuItem>
      <MenuItem onClick={() => signOut({ callbackUrl: URLS.LANDING })}>
        <Typography variant='subtitle2'>Logg ut</Typography>
      </MenuItem>
    </NavigationMenu>
  );
}
