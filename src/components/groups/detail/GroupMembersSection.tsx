import GroupMembersList from '@/components/groups/GroupMembersList';
import { Group } from '@/types/Group';
import { Box, Typography } from '@mui/material';

export default function GroupMembersSection({ group }: { group: Group }) {
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
    </Box>
  );
}
