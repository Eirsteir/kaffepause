import { IUser } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

interface AvatarProps extends MuiAvatarProps {
  user: IUser | undefined;
  children?: React.ReactElement;
}

export default function Avatar({ user, children, ...props }: AvatarProps) {
  return (
    <MuiAvatar
      alt={`profile-picture-${user?.name}`}
      key={`avatar-${user?.name}`}
      src={user?.profilePic || ''}
      {...props}>
      {children && { ...children }}
      {!children && user && getInitialsFromName(user.name)}
    </MuiAvatar>
  );
}
