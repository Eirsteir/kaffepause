import { User } from '@/types/User';
import { getInitialsFromName } from '@/utils';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';

interface AvatarProps extends MuiAvatarProps {
  user: User | undefined;
  children?: React.ReactElement;
}

export default function Avatar({ user, children, ...props }: AvatarProps) {
  const { sx: styles, ...rest } = props;
  return (
    <MuiAvatar
      alt={`profile-picture-${user?.name}`}
      key={`avatar-${user?.name}`}
      src={user?.image ?? undefined}
      sx={{
        bgColor: grey[500],
        ...styles,
      }}
      {...rest}>
      {/* {children && children} TODO: Prevents default image render (unauthed)*/}
      {!children && user && getInitialsFromName(user.name)}
    </MuiAvatar>
  );
}
