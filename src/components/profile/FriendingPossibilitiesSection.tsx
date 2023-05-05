import { useMemo } from 'react';

import FriendsList from '@/components/modules/friends/FriendsList';
import { QueryResult } from '@/components/QueryResult';
import { useFriendingPossibilities } from '@/hooks/Friends';
import { User } from '@/types/User';
import { Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FriendingPossibilitiesSection({}) {
  const { data, loading, error } = useFriendingPossibilities();
  const friendingPossibilities = useMemo(
    () =>
      data !== undefined
        ? data.friendingPossibilities.edges.map((edge) => edge.node)
        : [],
    [data],
  );
  const loadingComponent = () => (
    <Stack mt={2} spacing={2}>
      <Skeleton height={80} variant='rounded' width={420} />
      <Skeleton height={80} variant='rounded' width={420} />
    </Stack>
  );

  return (
    <Box>
      <Typography variant='h2'>Foreslåtte venner</Typography>
      <QueryResult
        data={data}
        error={error}
        loading={loading}
        loadingComponent={loadingComponent()}>
        <FriendsList friends={friendingPossibilities} />
      </QueryResult>
    </Box>
  );
}
