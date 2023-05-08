import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface InviteGroupCheckBoxListProps {
  initialSelection: Group;
  groups: Group[];
  onSelect: (group: Group) => void;
  onDeselect: (group: Group) => void;
}

export default function InviteGroupCheckBoxList({
  groups,
  onSelect,
  onDeselect,
  initialSelection,
}: InviteGroupCheckBoxListProps) {
  const [checked, setChecked] = React.useState<Group | null>(initialSelection);

  const handleToggle = (group: Group) => () => {
    if (group === checked) {
      onDeselect(group);
      setChecked(null);
    } else {
      onSelect(group);
      setChecked(group);
    }
  };

  React.useEffect(
    () => setChecked(initialSelection),
    [setChecked, initialSelection],
  );

  return (
    <List
      dense={false}
      sx={{
        width: '100%',
        marginTop: '.5rem',
        overflow: 'auto',
        maxHeight: 200,
      }}>
      {groups.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.uuid}`;
        return (
          <ListItem
            disablePadding
            key={`item-${value.uuid}`}
            secondaryAction={
              <Checkbox
                checked={value === checked}
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
              {/* <ListItemAvatar sx={{ height: 0.1, width: 0.1 }}>
                <Avatar user={value} />
              </ListItemAvatar> */}
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
