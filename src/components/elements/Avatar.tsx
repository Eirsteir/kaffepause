import { IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

interface AvatarProps extends MuiAvatarProps {
  user: IUser;
}

export default function Avatar({ user, ...props }: AvatarProps) {
  return (
    <MuiAvatar
      alt={user.name}
      key={`avatar-${user.name}`}
      src={user.profilePic || ''}
      {...props}>
      {getInitialsFromName(user.name)}
    </MuiAvatar>
  );
}
