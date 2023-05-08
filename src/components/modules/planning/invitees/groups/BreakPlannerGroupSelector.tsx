import { useMemo, useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import UserCheckBoxList from '@/components/modules/users/UserCheckBoxList';
import InviteGroupCheckBoxList from '@/components/modules/planning/invitees/groups/InviteGroupCheckBoxList';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface BreakPlannerGroupSelectorProps {
  user: User;
  onSelect: (selectedGroup: Group) => void;
}

export default function BreakPlannerGroupSelector({
  user,
  onSelect,
}: BreakPlannerGroupSelectorProps) {
  const groups = useMemo(() => user?.groups ?? [], [user]);

  const [selected, setSelected] = useState<Group | null>();

  const handleSelect = (group: Group) => {
    setSelected(group);
    onSelect(group);
  };

  const handleDeselect = () => {
    setSelected(null);
    onSelect(null);
  };

  return (
    <CenteredBox>
      <Autocomplete
        getOptionLabel={(option) => option.name}
        id='friends-selector'
        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
        noOptionsText='Lag en gruppe for å invitere'
        onChange={(event, value) => {
          setSelected(value);
          onSelect(value);
        }}
        options={groups}
        renderInput={(params) => (
          <TextField {...params} placeholder='Søk grupper' size='small' />
        )}
        sx={{ width: '100%', margin: 'auto' }}
        value={selected}
      />

      <InviteGroupCheckBoxList
        groups={groups}
        initialSelection={selected}
        onDeselect={handleDeselect}
        onSelect={handleSelect}
      />
    </CenteredBox>
  );
}
