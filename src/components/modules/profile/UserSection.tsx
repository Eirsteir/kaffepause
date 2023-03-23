import Link from '@/components/navigation/Link';
import { IUser } from '@/types/User';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface UserSectionProps {
  user: IUser;
}

export default function UserSection({ user }: UserSectionProps) {
  return (
    <div>
      <div>
        <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
          {user.name}
        </Typography>
        <Typography sx={{ marginBottom: '0.5rem' }} variant='body2'>
          Kaffedrikker siden 2023
        </Typography>
        <Link href='#'>
          <Typography sx={{ fontWeight: 500, marginTop: '1rem' }} variant='body2'>
            Rediger profil
          </Typography>
        </Link>
      </div>

      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant='h5'>Foretrukket sted</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <LocationOnOutlinedIcon fontSize='small' />
          <Typography variant='body1'>{user.preferredLocation?.title}</Typography>
        </Box>
      </Box>
    </div>
  );
}
