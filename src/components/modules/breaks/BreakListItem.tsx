import * as React from 'react';

import { getInitialsFromName } from '@/utils';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface BreakListItemProps {
  break_: any;
}

export default function BreakListItem({ break_ }: BreakListItemProps) {
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      </ListItemAvatar>
      <ListItemText
        primary='Brunch this weekend?'
        secondary={
          <React.Fragment>
            <Typography color='text.primary' component='span' sx={{ display: 'inline' }} variant='body2'>
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />{' '}
    </ListItem>
  );
}
