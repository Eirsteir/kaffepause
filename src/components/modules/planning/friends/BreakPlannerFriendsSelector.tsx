import { useMemo, useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import InviteFriendsCheckBoxList from '@/components/modules/planning/friends/InviteFriendsCheckBoxList';
import { IUser } from '@/types/User';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface BreakPlannerFriendsSelectorProps {
  user: IUser;
  onSelect: (selectedInvitees: IUser[]) => void;
}

export default function BreakPlannerFriendsSelector({
  user,
  onSelect,
}: BreakPlannerFriendsSelectorProps) {
  const friends = useMemo(
    () =>
      user !== undefined ? user.friends.edges.map((edge) => edge.node) : [],
    [user],
  );
  const [selection, setSelection] = useState<IUser[]>([]);

  const handleSelect = (selectedUser: IUser) => {
    const newSelection = [...selection, selectedUser];
    setSelection(newSelection);
    onSelect(newSelection);
  };

  const handleDeselect = (deselected: IUser) => {
    const newSelection = selection.filter((u) => u.uuid !== deselected.uuid);
    setSelection((current) =>
      current.filter((u) => u.uuid !== deselected.uuid),
    );
    onSelect(newSelection);
  };

  return (
    <CenteredBox>
      <Typography sx={{ marginBottom: '1rem', marginTop: '2rem' }} variant='h6'>
        Med hvem?
      </Typography>

      <Autocomplete
        getOptionLabel={(option) => option.name}
        id='friends-selector'
        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
        limitTags={2}
        multiple
        onChange={(event, values) => {
          setSelection(values);
          onSelect(values);
        }}
        options={friends}
        renderInput={(params) => (
          <TextField {...params} placeholder='Søk kaffedrikkere' size='small' />
        )}
        sx={{ width: '100%', maxWidth: 250, margin: 'auto' }}
        value={selection}
      />

      <InviteFriendsCheckBoxList
        initialSelection={selection}
        onDeselect={handleDeselect}
        onSelect={handleSelect}
        users={friends}
      />
    </CenteredBox>
  );
}
