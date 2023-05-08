import React from 'react';

import BreakPlannerFriendsSelector from '@/components/modules/planning/invitees/friends/BreakPlannerFriendsSelector';
import BreakPlannerGroupSelector from '@/components/modules/planning/invitees/groups/BreakPlannerGroupSelector';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import { FormControlLabel, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface BreakPlannerInviteesSectionProps {
  user: User;
  onSelectAddressees: (selectedInvitees: User[]) => void;
  onSelectGroup: (group: Group | null) => void;
}

export default function BreakPlannerInviteesSection({
  user,
  onSelectGroup,
  onSelectAddressees,
}: BreakPlannerInviteesSectionProps) {
  const [isGroupView, setIsGroupView] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGroupView(event.target.checked);
    onSelectAddressees([]);
    onSelectGroup(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}>
        <Tooltip
          placement='top'
          title='Planlegger du en pause med venner vil de få en invitasjon.'>
          <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
            Med hvem?
          </Typography>
        </Tooltip>

        <FormControlLabel
          control={
            <Switch
              checked={isGroupView}
              inputProps={{ 'aria-label': 'inviter-gruppe' }}
              onChange={handleChange}
              size='small'
            />
          }
          label='Grupper'
        />
      </Box>
      {isGroupView ? (
        <BreakPlannerGroupSelector onSelect={onSelectGroup} user={user} />
      ) : (
        <BreakPlannerFriendsSelector
          onSelect={onSelectAddressees}
          user={user}
        />
      )}
    </>
  );
}
