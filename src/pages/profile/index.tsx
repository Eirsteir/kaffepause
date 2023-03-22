import { getProviders, getSession, signIn } from 'next-auth/react';

import { useIsAuthenticated } from '@/hooks/User';
import { useHasMounted } from '@/hooks/utils';
import { IUser } from '@/types/User';
import URLS from '@/URLS';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Profile() {
  // profile pic
  // mine steder
  // pauser - Nylig aktivitet
  // venner
  const { user, loading } = useIsAuthenticated();

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  console.log(user);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item md={4} xs={12}>
          <Box>xs=6 md=8</Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Box>xs=6 md=4</Box>
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
