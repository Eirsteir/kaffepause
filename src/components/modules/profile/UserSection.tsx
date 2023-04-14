import Link from '@/components/navigation/Link';
import { IUser } from '@/types/User';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface UserSectionProps {
  user: IUser;
  actorIsUser: boolean;
}

export default function UserSection({ user, actorIsUser }: UserSectionProps) {
  return (
    <div>
      <div>
        <Typography sx={{ marginBottom: '0.5rem' }} variant='h1'>
          {user.name}
        </Typography>
        <Typography sx={{ marginBottom: '0.5rem' }} variant='body2'>
          Kaffedrikker siden 2023
        </Typography>

        {actorIsUser && <Button variant='outlined'>Rediger profil</Button>}
      </div>

      <Box sx={{ marginTop: '1rem' }}>
        <Typography
          sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
          variant='h2'>
          Foretrukket sted
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingBottom: '.5rem',
          }}>
          <LocationOnOutlinedIcon color='primary' fontSize='small' />
          <Typography variant='body1'>
            {user.preferredLocation?.title || 'Sted ikke oppgitt'}
          </Typography>
        </Box>
        {actorIsUser && !user.preferredLocation && (
          <Button variant='outlined'>Legg til et sted</Button>
        )}
      </Box>
    </div>
  );
}
