import * as React from 'react';

import { IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

interface FriendListItemProps {
  friend: IUser;
}

export default function FriendListItem({ friend }: FriendListItemProps) {
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt={friend.name} src={friend.profilePic || ''}>
          {getInitialsFromName(friend.name)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={friend.name} secondary={friend.preferredLocation?.title} />
    </ListItem>
  );
}
