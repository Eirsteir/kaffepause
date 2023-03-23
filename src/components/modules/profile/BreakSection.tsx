import { useMemo } from 'react';

import BreakList from '@/components/modules/breaks/BreakList';
import { useBreakHistory } from '@/hooks/Breaks';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// TODO: pagination
export default function BreakSection() {
  const { data, loading, error } = useBreakHistory();
  const breakHistory = useMemo(() => (data !== undefined ? data.breakHistory.edges.map((edge) => edge.node) : []), [data]);

  return (
    <Box>
      <Typography variant='h5'>Dine pauser</Typography>
      {loading ? (
        <Stack mt={2} spacing={2}>
          <Skeleton height={80} variant='rounded' width={420} />
          <Skeleton height={80} variant='rounded' width={420} />
        </Stack>
      ) : (
        <BreakList breaks={breakHistory} />
      )}
      {error && 'Upsi! Det har skjedd en feil. Prøv å laste inn senere.'}
    </Box>
  );
}
