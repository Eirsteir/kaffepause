import { useState } from 'react';

import BreakPlannerFriendsSelector from '@/components/modules/planning/friends/BreakPlannerFriendsSelector';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { ILocation } from '@/types/Location';
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
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [invitees, setInvitees] = useState<IUser[]>([]);

  const onTimeSlotSelect = (selectedTimeSlot: TimeSlot) => {
    setTimeSlot(selectedTimeSlot);
  };
  const onLocationSelect = (selectedLocation: ILocation) => {
    setLocation(selectedLocation);
  };
  const onFriendSelect = (selectedInvitees: IUser[]) => {
    console.log('onFriendSelect(): ', selectedInvitees);
    setInvitees(selectedInvitees);
  };

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
