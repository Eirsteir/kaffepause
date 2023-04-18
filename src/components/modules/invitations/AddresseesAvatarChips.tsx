import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import Link from '@/components/navigation/Link';
import { Invitation } from '@/types/Break';
import URLS from '@/URLS';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

type AvatarChipsProps = {
  addressees: Invitation['addressees']['edges']['node'];
};

export default function AddresseesAvatarChips({
  addressees,
}: AvatarChipsProps) {
  const resolveColor = (rsvp: string): 'success' | 'error' | 'default' => {
    if (rsvp === 'ACCEPTED') {
      return 'success';
    } else if (rsvp === 'DECLINED') {
      return 'error';
    } else {
      return 'default';
    }
  };
  return (
    <Stack direction='row' spacing={1}>
      {addressees.map((addressee, i) => (
        <Tooltip key={i} placement='top' title={addressee.rsvpTitle}>
          <Link href={`${URLS.USERS}/${addressee.user.uuid}`} noLinkStyle>
            <Chip
              avatar={<Avatar user={addressee.user} />}
              clickable
              color={resolveColor(addressee.rsvp)}
              label={addressee.user.name}
              variant='outlined'
            />
          </Link>
        </Tooltip>
      ))}
    </Stack>
  );
}
