import { useEffect, useState } from 'react';

import BreakPlannerCreateForm from '@/components/modules/planning/BreakPlannerCreateForm';
import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import { IBreak } from '@/types/Break';
import { IUser } from '@/types/User';
import { NetworkStatus } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  const [nextBreak, setNextBreak] = useState<IBreak | null>(null);

  const { data, loading, error, refetch, networkStatus } = useNextBreak({
    onCompleted: ({ nextBreak }: IBreak | null) => {
      if (nextBreak) {
        setNextBreak(nextBreak);
      }
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const breakTime = dayjs(nextBreak?.startingAt);
    const now = dayjs();
    if (breakTime.isBefore(now)) {
      refetch();
    }
  }, [nextBreak, refetch]);

  const isInitiated = nextBreak;

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
        Håper pausen gikk bra! Klargjør for en ny en...
      </Typography>
    );

  if (error)
    return (
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h6'>
        {error.message}
      </Typography>
    );

  return (
    <Box>
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        {isInitiated
          ? `Neste pause ${dayjs(nextBreak?.startingAt).fromNow()}`
          : 'Planlegg neste pause'}
      </Typography>

      {!isInitiated && (
        <BreakPlannerCreateForm onSubmit={setNextBreak} user={user} />
      )}
    </Box>
  );
}
