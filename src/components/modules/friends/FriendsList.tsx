import * as React from 'react';

import { IUser } from '@/types/User';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import FriendListItem from './FriendListItem';

interface FriendsListProps {
  friends: IUser[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {friends.map((friend, i) => (
        <>
          <FriendListItem friend={friend} />
          {i !== friends.length - 1 && <Divider component='li' variant='inset' />}
        </>
      ))}
    </List>
  );
}
