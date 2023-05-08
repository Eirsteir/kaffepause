import { useMemo, useState } from 'react';

import Avatar from '@/components/elements/Avatar';
import CenteredBox from '@/components/elements/CenteredBox';
import SearchUsers from '@/components/groups/SearchUsers';
import UserCheckBoxList from '@/components/modules/users/UserCheckBoxList';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

interface AddGroupMembersFormProps {
  size?: 'small' | 'medium';
  onChange: (value: User) => void;
  members: Group['members'];
  handleRemove: (value: User) => void;
}

export default function AddGroupMembersForm({
  size = 'medium',
  onChange,
  members,
  handleRemove,
}: AddGroupMembersFormProps) {
  const [options, setOptions] = useState<User[]>([]);

  return (
    <>
      <SearchUsers onSearchCompletedCallback={setOptions} onSelect={onChange} />
      {members.length > 0 ? (
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
              <ListItemText primary={member.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <CenteredBox m={4}>
          <Typography variant='body2'>Ingen brukere er valgt enda</Typography>
        </CenteredBox>
      )}
      {options.length > 0 && (
        <UserCheckBoxList
          onDeselect={handleRemove}
          onSelect={onChange}
          users={options}
        />
      )}
    </>
  );
}
