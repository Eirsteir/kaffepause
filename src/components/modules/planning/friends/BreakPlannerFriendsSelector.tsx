import { useMemo, useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import InviteFriendsCheckBoxList from '@/components/modules/planning/friends/InviteFriendsCheckBoxList';
import { User } from '@/types/User';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface BreakPlannerFriendsSelectorProps {
  user: User;
  onSelect: (selectedInvitees: User[]) => void;
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
  const [selection, setSelection] = useState<User[]>([]);

  const handleSelect = (selectedUser: User) => {
    const newSelection = [...selection, selectedUser];
    setSelection(newSelection);
    onSelect(newSelection);
  };

  const handleDeselect = (deselected: User) => {
    const newSelection = selection.filter((u) => u.uuid !== deselected.uuid);
    setSelection((current) =>
      current.filter((u) => u.uuid !== deselected.uuid),
    );
    onSelect(newSelection);
  };

  return (
    <CenteredBox>
      <Tooltip
        placement='top'
        title='Planlegger du en pause med venner vil de få en invitasjon.'>
        <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
          Med hvem?
        </Typography>
      </Tooltip>

      <Autocomplete
        getOptionLabel={(option) => option.name}
        id='friends-selector'
        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
        limitTags={2}
        multiple
        noOptionsText='Legg til venner for å invitere'
        onChange={(event, values) => {
          setSelection(values);
          onSelect(values);
        }}
        options={friends}
        renderInput={(params) => (
          <TextField {...params} placeholder='Søk venner' size='small' />
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
