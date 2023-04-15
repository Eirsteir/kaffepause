import AvatarChips from '@/components/elements/AvatarChips';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const BreakDetailUsersSection = ({
  users,
  canViewerEditBreak,
}: {
  users: IUser[];
  canViewerEditBreak: boolean;
}) => {
  const resolveButton = () => {
    if (!canViewerEditBreak) {
      return;
    }

    if (users.length) {
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

      {users.length !== 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '0.5rem',
          }}>
          <AvatarChips users={users} />
        </Box>
      )}

      {resolveButton()}
    </Box>
  );
};
