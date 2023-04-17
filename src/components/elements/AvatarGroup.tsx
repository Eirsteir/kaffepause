import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import { User } from '@/types/User';
import MuiAvatarGroup from '@mui/material/AvatarGroup';

interface AvatarGroupProps {
  users: readonly User[];
}

export default function AvatarGroup({ users }: AvatarGroupProps) {
  return (
    <MuiAvatarGroup total={2}>
      {users.map((user) => (
        <Avatar key={`avatar-user-${user.name}`} user={user} />
      ))}
    </MuiAvatarGroup>
  );
}
