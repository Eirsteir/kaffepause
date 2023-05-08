import { useState } from 'react';

import EditGroupMembersForm from '@/components/groups/detail/EditGroupMembersForm';
import GroupMembersList from '@/components/groups/GroupMembersList';
import { Group } from '@/types/Group';
import { Box, Button, Typography } from '@mui/material';

export default function GroupMembersSection({ group }: { group: Group }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography sx={{ paddingBottom: '.5rem' }} variant='h2'>
        Gruppemedlemmer
      </Typography>
      {group.members.length !== 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '0.5rem',
          }}>
          <GroupMembersList detail group={group} />
        </Box>
      )}

      {isEditing ? (
        <EditGroupMembersForm
          group={group}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          sx={{ marginTop: 2 }}
          variant='outlined'>
          Legg til venner
        </Button>
      )}
    </Box>
  );
}
