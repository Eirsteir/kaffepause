import { useRouter } from 'next/router';

import Avatar from '@/components/elements/Avatar';
import { User } from '@/types/User';
import URLS from '@/URLS';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface FriendListItemProps {
  friend: User;
}

export default function FriendListItem({ friend }: FriendListItemProps) {
  const router = useRouter();
  const onClick = () => router.push(`${URLS.USERS}/${friend.uuid}`);

  const secondaryText = () => {
    const locationText = friend.preferredLocation?.title;
    const socialText = friend.socialContext;
    if (locationText) {
      return locationText + ' | ' + socialText;
    }
    return socialText;
  };

  return (
    <ListItemButton onClick={onClick} sx={{ borderRadius: '8px' }}>
      <ListItemAvatar>
        <Avatar user={friend} />
      </ListItemAvatar>
      <ListItemText primary={friend.name} secondary={secondaryText()} />
    </ListItemButton>
  );
}
