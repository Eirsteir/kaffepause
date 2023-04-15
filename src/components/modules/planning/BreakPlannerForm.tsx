import { Dayjs } from 'dayjs';
import { useState } from 'react';

import BreakPlannerFriendsSelector from '@/components/modules/planning/friends/BreakPlannerFriendsSelector';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { ILocation } from '@/types/Location';
import { IUser } from '@/types/User';
import { ApolloError } from '@apollo/client';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StartBreakButton from './StartBreakButton';

interface BreakPlannerFormProps {
  user: IUser;
  initialTimeSlot: Dayjs | undefined;
  initialLocation: ILocation | undefined;
  initialInvitees: IUser[] | undefined;
  onSubmit: (location: ILocation, startTime: Dayjs, invitees: IUser[]) => void;
  error: ApolloError;
  loading: boolean;
}

export default function BreakPlannerForm({
  user,
  initialTimeSlot,
  initialLocation,
  initialInvitees,
  onSubmit,
  error,
  loading,
}: BreakPlannerFormProps) {
  const [timeSlot, setTimeSlot] = useState<Dayjs | null>(
    initialTimeSlot ?? null,
  );
  const [location, setLocation] = useState<ILocation | null>(
    initialLocation ?? null,
  );
  const [invitees, setInvitees] = useState<IUser[]>(initialInvitees ?? []);

  return (
    <Box>
      <Grid container justifyContent='center' spacing={0}>
        <Grid item md={4} sm={6} xs={12}>
          <BreakPlannerTimeSelector
            initialTimeSlot={initialTimeSlot}
            onSelect={setTimeSlot}
          />
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <BreakPlannerLocationSelector onSelect={setLocation} user={user} />
        </Grid>

        <Grid item md={4} xs={12}>
          <BreakPlannerFriendsSelector onSelect={setInvitees} user={user} />
        </Grid>
      </Grid>

      <StartBreakButton
        loading={loading}
        onClick={() => onSubmit(location, timeSlot, invitees)}
        title={invitees.length ? 'Send invitasjon' : 'Planlegg pausen'}
      />

      {error && <Typography color='error.main'>{error.message}</Typography>}
    </Box>
  );
}
