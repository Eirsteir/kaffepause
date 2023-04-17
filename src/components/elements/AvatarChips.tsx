import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import Link from '@/components/navigation/Link';
import { User } from '@/types/User';
import URLS from '@/URLS';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

type AvatarChipsProps = {
  users: User[];
};

export default function AvatarChips({ users }: AvatarChipsProps) {
  return (
    <Stack direction='row' spacing={1}>
      {users.map((user, i) => (
        <Link href={`${URLS.USERS}/${user.uuid}`} key={i} noLinkStyle>
          <Chip
            avatar={<Avatar user={user} />}
            clickable
            label={user.name}
            variant='outlined'
          />
        </Link>
      ))}
    </Stack>
  );
}
