import { Dayjs } from 'dayjs';
import { useState } from 'react';

import BreakPlannerInviteesSection from '@/components/modules/planning/invitees/BreakPlannerInviteesSection';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import StartBreakButton from '@/components/modules/planning/StartBreakButton';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { Group } from '@/types/Group';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import { ApolloError } from '@apollo/client';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface BreakPlannerFormProps {
  user: User;
  initialTimeSlot: Dayjs | undefined;
  initialLocation: Location | undefined;
  initialInvitees: User[] | undefined;
  onSubmit: (
    location: Location,
    startTime: Dayjs,
    invitees: User[],
    recipientGroup: Group,
  ) => void;
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
  const [location, setLocation] = useState<Location | null>(
    initialLocation ?? null,
  );
  const [invitees, setInvitees] = useState<User[]>(initialInvitees ?? []);
  const [recipientGroup, setRecipientGroup] = useState<Group | null>(null);

  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item md={4} sm={6} xs={12}>
          <BreakPlannerTimeSelector
            initialTimeSlot={initialTimeSlot}
            onSelect={setTimeSlot}
          />
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          <BreakPlannerLocationSelector
            initialLocation={user.preferredLocation}
            onSelect={setLocation}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <BreakPlannerInviteesSection
            onSelectAddressees={setInvitees}
            onSelectGroup={setRecipientGroup}
            user={user}
          />
        </Grid>
      </Grid>

      <StartBreakButton
        loading={loading}
        onClick={() => onSubmit(location, timeSlot, invitees, recipientGroup)}
        title='Planlegg pausen'
      />

      {error && <Typography color='error.main'>{error.message}</Typography>}
    </Box>
  );
}
