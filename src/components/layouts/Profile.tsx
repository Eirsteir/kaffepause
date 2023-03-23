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
}

const Divider = () => <MUIDivider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />;

export default function Profile({ user }: ProfileProps) {
  // profile pic
  // mine steder
  // pauser - Nylig aktivitet
  // venner

  return (
    <Box sx={{ padding: '2rem 7rem' }}>
      <Grid container spacing={10}>
        <Grid item md={4} xs={12}>
          <UserPaperSection user={user} />
        </Grid>
        <Grid item md={8} xs={12}>
          <UserSection user={user} />
          <Divider />
          <FriendsSection user={user} />
          <Divider />
          <BreakSection user={user} />
        </Grid>
      </Grid>
    </Box>
  );
}
