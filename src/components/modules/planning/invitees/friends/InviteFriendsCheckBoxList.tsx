import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import { User } from '@/types/User';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface InviteFriendsCheckBoxListProps {
  initialSelection: User[];
  users: User[];
  onSelect: (user: User) => void;
  onDeselect: (user: User) => void;
}

export default function InviteFriendsCheckBoxList({
  users,
  onSelect,
  onDeselect,
  initialSelection,
}: InviteFriendsCheckBoxListProps) {
  const [checked, setChecked] = React.useState<User[]>([]);

  const handleToggle = (user: User) => () => {
    const currentIndex = checked.indexOf(user);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(user);
      onSelect(user);
    } else {
      newChecked.splice(currentIndex, 1);
      onDeselect(user);
    }
    setChecked(newChecked);
  };

  React.useEffect(
    () => setChecked(initialSelection),
    [setChecked, initialSelection],
  );

  return (
    <List
      dense={true}
      sx={{
        width: '100%',
        marginTop: '.5rem',
        overflow: 'auto',
        maxHeight: 200,
      }}>
      {users.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.uuid}`;
        return (
          <ListItem
            disablePadding
            key={`item-${value.uuid}`}
            secondaryAction={
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                checkedIcon={<CheckCircleIcon />}
                edge='end'
                icon={<AddCircleOutlineRoundedIcon />}
                inputProps={{ 'aria-labelledby': labelId }}
                onChange={handleToggle(value)}
              />
            }>
            <ListItemButton
              dense
              onClick={handleToggle(value)}
              role={undefined}
              sx={{ borderRadius: '8px' }}>
              <ListItemAvatar sx={{ height: 0.1, width: 0.1 }}>
                <Avatar user={value} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
