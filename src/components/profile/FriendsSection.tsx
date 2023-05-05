import { useMemo } from 'react';

import FriendsList from '@/components/modules/friends/FriendsList';
import { User } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface FriendsSectionProps {
  user: User;
}

export default function FriendsSection({ user }: FriendsSectionProps) {
  const friends = useMemo(
    () =>
      user !== undefined ? user.friends.edges.map((edge) => edge.node) : [],
    [user],
  );

  return (
    <Box>
      <Typography sx={{ paddingBottom: '1.5rem' }} variant='h2'>
        Venner
      </Typography>
      <FriendsList friends={friends} />
    </Box>
  );
}
