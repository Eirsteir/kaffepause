import ParticipantsAvatarChips from '@/components/modules/breaks/ParticipantsAvatarChips';
import { Break } from '@/types/Break';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const BreakDetailParticipantsSection = ({
  participants,
}: {
  participants: Break['participants']['edges']['node'][];
}) => {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography sx={{ paddingBottom: '.5rem' }} variant='h2'>
        Deltakere
      </Typography>

      {participants.length !== 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '0.5rem',
          }}>
          <ParticipantsAvatarChips users={participants} />
        </Box>
      )}
    </Box>
  );
};
