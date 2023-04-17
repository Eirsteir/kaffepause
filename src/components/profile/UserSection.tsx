import { User } from '@/types/User';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface UserSectionProps {
  user: User;
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
    </div>
  );
}
