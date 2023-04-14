import AvatarChips from '@/components/elements/AvatarChips';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const BreakDetailUsersSection = ({
  users,
  canViewerEdit,
}: {
  users: IUser[];
  canViewerEdit: boolean;
}) => (
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
      <AvatarChips users={users} />
    </Box>

    {(canViewerEdit && !users.length) ?? (
      <Button variant='outlined'>Inviter venner</Button>
    )}
  </Box>
);
