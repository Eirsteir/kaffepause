import BreakPlannerFriendsSelector from '@/components/modules/planning/friends/BreakPlannerFriendsSelector';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { TimeSlot } from '@/types/Time';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import StartBreakButton from './StartBreakButton';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  const onTimeSlotSelect = (timeSlot: TimeSlot) => {};
  const onLocationSelect = (location: ILocation) => {};
  const onFriendSelect = (invitees: IUser[]) => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        margin: 'auto',
        paddingRight: '2rem',
        paddingLeft: '2rem',
        maxWidth: '90vw',
        width: 'fit-content',
      }}>
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        Planlegg neste pause
      </Typography>

      <Grid container spacing={10}>
        <Grid item md={4} xs={12}>
          <BreakPlannerTimeSelector onSelect={onTimeSlotSelect} />
        </Grid>

        <Grid item md={4} xs={12}>
          <BreakPlannerLocationSelector
            onSelect={onLocationSelect}
            user={user}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <BreakPlannerFriendsSelector onSelect={onFriendSelect} user={user} />
        </Grid>
      </Grid>

      <StartBreakButton loading={false} />
    </Box>
  );
}
