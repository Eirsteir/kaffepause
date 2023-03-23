import { useMemo } from 'react';

import Avatar from '@/components/elements/Avatar';
import AvatarGroup from '@/components/elements/AvatarGroup';
import dayjs from '@/dayjs';
import { IBreak } from '@/types/Break';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface BreakListItemProps {
  break_: IBreak;
}

export default function BreakListItem({ break_ }: BreakListItemProps) {
  const participants = useMemo(
    () => (break_ !== undefined ? break_.participants.edges.map((edge) => edge.node).filter((user) => user.uuid !== break_.invitation.sender.uuid) : []),
    [break_],
  );

  const sender = useMemo(() => break_.invitation.sender, [break_]);
  const breakTime = useMemo(() => dayjs(break_.startingAt), [break_]);

  const participantsCount = participants.length;
  const pluralSuffix = participantsCount > 2 ? 'andre' : 'annen';
  const suffix = participantsCount < 2 ? '' : ` og ${participantsCount - 1} ${pluralSuffix}`;
  const secondaryText = 'Med ' + break_.invitation.sender.name.split(' ')[0] + suffix;

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar sx={{ paddingRight: '.5rem' }}>{participantsCount > 1 ? <AvatarGroup users={participants} /> : <Avatar user={sender} />}</ListItemAvatar>
      <ListItemText
        primary={breakTime.format('LLL')}
        secondary={
          <>
            <Typography color='text.primary' component='span' sx={{ display: 'inline' }} variant='body2'>
              {participantsCount > 1 && secondaryText}
            </Typography>
            {break_.location && ' — ' + break_.location.title}
          </>
        }
      />{' '}
    </ListItem>
  );
}
