import { useRouter } from 'next/router';
import * as React from 'react';

import { IUser } from '@/types/User';
import URLS from '@/URLS';
import { getInitialsFromName } from '@/utils';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface FriendListItemProps {
  friend: IUser;
}

export default function FriendListItem({ friend }: FriendListItemProps) {
  const router = useRouter();
  const onClick = () => router.push(`${URLS.USERS}/${friend.uuid}`);

  return (
    <ListItemButton alignItems='flex-start' onClick={onClick}>
      <ListItemAvatar>
        <Avatar alt={friend.name} src={friend.profilePic || ''}>
          {getInitialsFromName(friend.name)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={friend.name} secondary={friend.preferredLocation?.title} />
    </ListItemButton>
  );
}
