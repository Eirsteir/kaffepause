import { useMemo } from 'react';

import FriendsList from '@/components/modules/friends/FriendsList';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface FriendsSectionProps {
  user: IUser;
}

export default function FriendsSection({ user }: FriendsSectionProps) {
  const friends = useMemo(
    () =>
      user !== undefined ? user.friends.edges.map((edge) => edge.node) : [],
    [user],
  );

  return (
    <Box>
      <Typography variant='h2'>Dine venner</Typography>
      <FriendsList friends={friends} />
    </Box>
  );
}
