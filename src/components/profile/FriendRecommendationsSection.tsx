import { useMemo } from 'react';

import ShowMoreButton from '@/components/elements/ShowMoreButton';
import FriendsList from '@/components/modules/friends/FriendsList';
import { QueryResult } from '@/components/QueryResult';
import { useFriendRecommendations } from '@/hooks/Friends';
import { Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FriendRecommendationsSection() {
  const { data, loading, error } = useFriendRecommendations();
  const friendingPossibilities = useMemo(
    () =>
      data !== undefined
        ? data.friendRecommendations.edges.map((edge) => edge.node)
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
      <Typography sx={{ paddingBottom: '1.5rem' }} variant='h2'>
        Foreslåtte venner
      </Typography>
      <QueryResult
        data={data}
        error={error}
        loading={loading}
        loadingComponent={loadingComponent()}>
        <FriendsList friends={friendingPossibilities} />
        <ShowMoreButton />
      </QueryResult>
    </Box>
  );
}
