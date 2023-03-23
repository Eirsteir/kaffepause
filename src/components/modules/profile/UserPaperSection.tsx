import Link from '@/components/navigation/Link';
import { IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface UserPaperSectionProps {
  user: IUser;
}

export default function UserPaperSection({ user }: UserPaperSectionProps) {
  return (
    <Paper sx={{ padding: '1.5rem' }} variant='outlined'>
      <Box alignItems='center' display='flex' flexDirection='column' justifyContent='center'>
        <Avatar src={user.profilePic} sx={{ width: 128, height: 128 }}>
          <Typography variant='h3'>{getInitialsFromName(user.name)}</Typography>
        </Avatar>
        <Link href='#'>
          <Typography sx={{ fontWeight: 500 }} variant='body2'>
            Oppdater bilde
          </Typography>
        </Link>
      </Box>
    </Paper>
  );
}
