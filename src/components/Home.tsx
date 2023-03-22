import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { IUser } from '../types/User';
import BreakPlanner from './planning/BreakPlanner';
import UpcomingBreaks from './planning/UpcomingBreaks';

interface IProps {
  user: IUser;
}

export default function Home({ user }: IProps) {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: '0 2rem' }}>
        <Grid container spacing={2}>
          <Grid md={4} xs={12}>
            <BreakPlanner user={user} />
          </Grid>
          <Grid md={8} xs={12}>
            <UpcomingBreaks user={user} />
          </Grid>
          <Grid xs={4}>
            <p>Oppdater leseplan/status</p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
