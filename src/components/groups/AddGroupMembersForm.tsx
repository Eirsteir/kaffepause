import { useMemo } from 'react';

import Avatar from '@/components/elements/Avatar';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import {
  Autocomplete,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';

interface AddGroupMembersFormProps {
  size?: 'small' | 'medium';
  onChange: (event, value) => void;
  user: User;
  members: Group['members'];
  handleRemove: (value: User) => void;
}

export default function AddGroupMembersForm({
  size = 'medium',
  onChange,
  user,
  members,
  handleRemove,
}: AddGroupMembersFormProps) {
  const friends = useMemo(
    () =>
      user !== undefined ? user.friends.edges.map((edge) => edge.node) : [],
    [user],
  );

  return (
    <>
      <Autocomplete
        freeSolo
        getOptionLabel={(option) => option.name}
        noOptionsText='Legg til venner for å legge dem til i gruppen'
        onChange={onChange}
        options={friends}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Søk etter venner'
            size={size}
            variant='outlined'
          />
        )}
      />
      {members.length > 0 && (
        <List dense={size === 'small'}>
          {members.map((member, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Button
                  onClick={() => handleRemove(member)}
                  size='small'
                  variant='outlined'>
                  Fjern
                </Button>
              }>
              <ListItemAvatar>
                <Avatar user={member} />
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                // secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
