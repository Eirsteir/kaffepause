import Head from 'next/head';

import BreakSection from '@/components/modules/profile/BreakSection';
import FriendsSection from '@/components/modules/profile/FriendsSection';
import UserPaperSection from '@/components/modules/profile/UserPaperSection';
import UserSection from '@/components/modules/profile/UserSection';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import MUIDivider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

interface ProfileProps {
  user: IUser;
  actorIsUser: boolean;
}

const Divider = () => <MUIDivider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />;

// TODO: mine steder
export default function Profile({ user, actorIsUser }: ProfileProps) {
  return (
    <>
      <Head>
        <title>{`${user.name.split(' ')[0]} sin profil`}</title>
      </Head>
      <Box sx={{ padding: '2rem 7rem' }}>
        <Grid container spacing={10}>
          <Grid item md={4} xs={12}>
            <UserPaperSection actorIsUser={actorIsUser} user={user} />
          </Grid>
          <Grid item md={8} xs={12}>
            <UserSection actorIsUser={actorIsUser} user={user} />
            <Divider />
            {actorIsUser && (
              <>
                <FriendsSection user={user} />
                <Divider />
                <BreakSection />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
