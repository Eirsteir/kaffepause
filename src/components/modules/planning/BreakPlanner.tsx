import { useState } from 'react';

import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import { IBreak } from '@/types/Break';
import { IUser } from '@/types/User';
import { NetworkStatus } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BreakPlannerForm from './BreakPlannerForm';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  const [nextBreak, setNextBreak] = useState<IBreak | null>(null);

  const { data, loading, error, refetch, networkStatus } = useNextBreak({
    onCompleted: ({ nextBreak }) => {
      setNextBreak(nextBreak);
    },
    notifyOnNetworkStatusChange: true,
  });
  const isInitiated = data && data.nextBreak;

  if (loading && data === undefined) {
    return (
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        Sjekker om du har planlagt pauser...
      </Typography>
    );
  }
  if (networkStatus === NetworkStatus.refetch)
    return (
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        Henter pausen din...
      </Typography>
    );

  // TODO: this smells
  const nextBreakTimeSlot = dayjs(nextBreak?.startingAt);
  const nextBreakInvitees = nextBreak?.invitation.addressees.edges.map(
    (edge) => edge.node,
  );
  const nextBreakLocation = nextBreak?.location;

  console.log(nextBreak);

  return (
    <Box>
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        {isInitiated
          ? `Neste pause ${nextBreakTimeSlot?.fromNow()}`
          : 'Planlegg neste pause'}
      </Typography>

      <BreakPlannerForm
        initialInvitees={nextBreakInvitees}
        initialLocation={nextBreakLocation}
        initialTimeSlot={nextBreakTimeSlot}
        user={user}
      />
    </Box>
  );
}
