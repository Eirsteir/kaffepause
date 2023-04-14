import AvatarChips from '@/components/elements/AvatarChips';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const BreakDetailUsersSection = ({ users }: { users: IUser[] }) => (
  <Box sx={{ marginTop: '2rem' }}>
    <Typography variant='h5'>Inviterte</Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '0.5rem',
      }}>
      <AvatarChips users={users} />
    </Box>
  </Box>
);
