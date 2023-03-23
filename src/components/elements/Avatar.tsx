import { IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import MuiAvatar from '@mui/material/Avatar';

interface AvatarProps {
  user: IUser;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <MuiAvatar alt={user.name} key={`avatar-${user.name}`} src={user.profilePic || ''}>
      {getInitialsFromName(user.name)}
    </MuiAvatar>
  );
}
