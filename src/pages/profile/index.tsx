import { getProviders, getSession, signIn } from 'next-auth/react';

import Link from '@/components/navigation/Link';
import { useIsAuthenticated } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';
import { IUser } from '@/types/User';
import URLS from '@/URLS';
import { getInitialsFromName } from '@/utils';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Profile({ user }: IUser) {
  // profile pic
  // mine steder
  // pauser - Nylig aktivitet
  // venner

  return (
    <Box sx={{ padding: '2.5rem 6rem' }}>
      <Grid container spacing={0}>
        <Grid item md={4} xs={12}>
          <Paper sx={{ padding: '1.5rem' }} variant='outlined'>
            <Box align='center' alignItems='center' justify='center'>
              <Avatar src={user.profilePic} sx={{ width: 128, height: 128 }}>
                <Typography variant='h3'>{getInitialsFromName(user.name)}</Typography>
              </Avatar>
              <Link href='#'>
                <Typography sx={{ fontWeight: 700 }} variant='body2'>
                  Oppdater bilde
                </Typography>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={8} xs={12}>
          <Box>
            <Typography variant='h4'>{user.name}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: URLS.SIGNIN },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
