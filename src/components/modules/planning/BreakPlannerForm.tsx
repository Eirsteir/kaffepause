import { Dayjs } from 'dayjs';
import { useState } from 'react';

import BreakPlannerFriendsSelector from '@/components/modules/planning/friends/BreakPlannerFriendsSelector';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { useIniateBreak } from '@/hooks/Breaks';
import { ILocation } from '@/types/Location';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StartBreakButton from './StartBreakButton';

interface BreakPlannerFormProps {
  user: IUser;
  initialTimeSlot?: Dayjs | null;
  initialLocation?: ILocation | null;
  initialInvitees?: IUser[];
}

export default function BreakPlannerForm({
  user,
  initialTimeSlot = null,
  initialLocation = null,
  initialInvitees = [],
}: BreakPlannerFormProps) {
  const [timeSlot, setTimeSlot] = useState<Dayjs | null>(initialTimeSlot);
  const [location, setLocation] = useState<ILocation | null>(initialLocation);
  const [invitees, setInvitees] = useState<IUser[]>(initialInvitees);

  const [initiateBreak, { data, loading, error }] = useIniateBreak({
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
