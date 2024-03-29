import AvatarChips from '@/components/modules/breaks/ParticipantsAvatarChips';
import AddresseesAvatarChips from '@/components/modules/invitations/AddresseesAvatarChips';
import GroupAvatarChip from '@/components/modules/invitations/GroupAvatarChip';
import { Invitation } from '@/types/Break';
import { User } from '@/types/User';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const BreakDetailInviteesSection = ({
  recipientGroup,
  addressees,
  canViewerEditBreak,
}: {
  recipientGroup: Invitation['recipientGroup'];
  addressees: Invitation['addressees']['edges']['node'][];
  canViewerEditBreak: boolean;
}) => {
  const resolveButton = () => {
    if (!canViewerEditBreak) {
      return;
    }

    if (addressees.length) {
      return (
        <Button sx={{ marginTop: 2 }} variant='outlined'>
          Inviter flere
        </Button>
      );
    } else {
      return (
        <Button sx={{ marginTop: 2 }} variant='outlined'>
          Inviter venner
        </Button>
      );
    }
  };

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography sx={{ paddingBottom: '.5rem' }} variant='h2'>
        Inviterte
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: '0.5rem',
        }}>
        {addressees.length !== 0 && (
          <AddresseesAvatarChips addressees={addressees} />
        )}

        {recipientGroup && <GroupAvatarChip group={recipientGroup} />}
      </Box>

      {resolveButton()}
    </Box>
  );
};
