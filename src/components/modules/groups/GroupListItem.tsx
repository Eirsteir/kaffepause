import { useRouter } from 'next/router';

import Avatar from '@/components/elements/Avatar';
import { User } from '@/types/User';
import URLS from '@/URLS';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface GroupListItemProps {
  group: User;
}

export default function GroupListItem({ group }: GroupListItemProps) {
  const router = useRouter();
  const onClick = () => router.push(`${URLS.GROUPS}/${group.uuid}`);

  const secondaryText = () => {
    const locationText = group.preferredLocation?.title;
    const socialText = group.socialContext;
    if (locationText) {
      return locationText + ' | ' + socialText;
    }
    return socialText;
  };

  return (
    <ListItemButton onClick={onClick} sx={{ borderRadius: '8px' }}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={group.name} secondary={secondaryText()} />
    </ListItemButton>
  );
}
