import { useRouter } from 'next/router';

import NavigationMenu from '@/components/navigation/NavigationMenu';
import URLS from '@/URLS';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function UnauthedAccountMenu() {
  const router = useRouter();

  const dummyAction = () => undefined;

  return (
    <NavigationMenu>
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
        <Typography variant='subtitle2'>
          Trenger jeg en nettside for å ta pauser?
        </Typography>
      </MenuItem>
      <MenuItem onClick={dummyAction}>
        <Typography variant='subtitle2'>Hjelp</Typography>
      </MenuItem>
    </NavigationMenu>
  );
}
