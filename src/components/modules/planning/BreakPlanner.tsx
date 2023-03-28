import { useState } from 'react';

import BreakPlannerFriendsSelector from '@/components/modules/planning/friends/BreakPlannerFriendsSelector';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { useIniateBreak } from '@/hooks/Breaks';
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

  const [initiateBreak, { loading, error }] = useIniateBreak({
    variables: {
      addressees: [...invitees].map((user) => user.uuid),
      startTime: timeSlot?.time,
      location: location?.uuid,
    },
    skip: !timeSlot || !location || !invitees.length,
    onCompleted: () => {
      alert('Vent på svar og gjør deg klar til pause!');
    },
  });

  return (
    <Box>
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        Planlegg neste pause
      </Typography>

      <Grid container justifyContent='center' spacing={0}>
        <Grid item md={4} sm={6} xs={12}>
          <BreakPlannerTimeSelector onSelect={setTimeSlot} />
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <BreakPlannerLocationSelector onSelect={setLocation} user={user} />
        </Grid>

        <Grid item md={4} xs={12}>
          <BreakPlannerFriendsSelector onSelect={setInvitees} user={user} />
        </Grid>
      </Grid>

      <StartBreakButton loading={loading} onClick={initiateBreak} />

      {error && <p>error.message</p>}
    </Box>
  );
}
