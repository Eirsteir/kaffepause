import { useMemo, useState } from 'react';

import InviteFriendsCheckBoxList from '@/components/modules/planning/friends/InviteFriendsCheckBoxList';
import { IUser } from '@/types/User';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface BreakPlannerFriendsSelectorProps {
  user: IUser;
  onSelect: (invitees: IUser[]) => void;
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
    setSelection([...selectedUser]);
    onSelect(selection);
  };

  return (
    <>
      <Typography
        sx={{ marginBottom: '0.5rem', marginTop: '2rem' }}
        variant='h6'>
        Med hvem?
      </Typography>

      <Autocomplete
        getOptionLabel={(option) => option.name}
        id='friends-selector'
        limitTags={2}
        multiple
        onChange={(event, newValue) => {
          handleSelect(newValue);
        }}
        options={friends}
        renderInput={(params) => (
          <TextField {...params} placeholder='Søk kaffedrikkere' size='small' />
        )}
        sx={{ width: 300, margin: 'auto' }}
        value={selection}
      />

      <InviteFriendsCheckBoxList onChange={handleSelect} users={friends} />
    </>
  );
}
