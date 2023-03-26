import { IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

interface AvatarProps extends MuiAvatarProps {
  user: IUser;
  children?: React.ReactElement;
}

export default function Avatar({ user, children, ...props }: AvatarProps) {
  return (
    <MuiAvatar
      alt={user.name}
      key={`avatar-${user.name}`}
      src={user.profilePic || ''}
      {...props}>
      {children && { ...children }}
      {!children && getInitialsFromName(user.name)}
    </MuiAvatar>
  );
}
