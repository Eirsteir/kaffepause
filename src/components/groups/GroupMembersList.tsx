import { useRouter } from 'next/router';
import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import { useRemoveGroupMember } from '@/hooks/Groups';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import URLS from '@/URLS';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, IconButton, Stack, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function GroupMemberMenu({
  user,
  onRemoveMember,
}: {
  user: User;
  onRemoveMember: () => void;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        aria-label='more'
        id='long-button'
        onClick={handleClick}
        size='small'>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='basic-menu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        onClose={handleClose}
        open={open}>
        <MenuItem
          onClick={() =>
            router.push(`${URLS.LANDING}?prefillUsers=${user.uuid}`)
          }>
          <Typography variant='subtitle2'>Inviter til pause</Typography>
        </MenuItem>
        <MenuItem onClick={() => router.push(`${URLS.USERS}/${user.uuid}`)}>
          <Typography variant='subtitle2'>Vis profil</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onRemoveMember();
            handleClose();
          }}>
          <Typography variant='subtitle2'>Fjern medlem</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default function GroupMembersList({
  group,
  detail,
}: {
  group: Group;
  detail?: boolean;
}) {
  const [removeGroupMember, { loading, error }] = useRemoveGroupMember();

  const onRemoveGroupMember = (member: User) => {
    removeGroupMember({
      variables: { groupUuid: group.uuid, memberUuid: member.uuid },
      onCompleted: () => alert('Brukeren ble fjernet fra gruppen.'),
    });
  };

  const resolveChipProps = (member: User) => {
    if (detail) {
      return {
        deleteIcon: (
          <GroupMemberMenu
            onRemoveMember={() => onRemoveGroupMember(member)}
            user={member}
          />
        ),
        onDelete: () => undefined,
      };
    } else {
      return {
        clickable: true,
        component: 'a',
        href: URLS.USERS + '/' + member.uuid,
      };
    }
  };

  return (
    <Stack direction='row' spacing={1}>
      {group.members.map((user, i) => (
        <Chip
          avatar={<Avatar user={user} />}
          key={i}
          label={user.name}
          variant='outlined'
          {...resolveChipProps(user)}
        />
      ))}
    </Stack>
  );
}
