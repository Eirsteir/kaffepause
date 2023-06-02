import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import { useRemoveGroupMember } from '@/hooks/Groups';
import { Group } from '@/types/Group';
import { User } from '@/types/User';
import URLS from '@/URLS';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import {
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function GroupMemberMenu({
  isMemberActor,
  user,
  onRemoveMember,
}: {
  isMemberActor: boolean;
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id='basic-menu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        {!isMemberActor && (
          <MenuItem
            onClick={() =>
              router.push(`${URLS.LANDING}?prefillUsers=${user.uuid}`)
            }>
            <ListItemIcon>
              <ScheduleSendIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='subtitle2'>Inviter til pause</Typography>
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => router.push(`${URLS.USERS}/${user.uuid}`)}>
          <ListItemIcon>
            <PersonIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='subtitle2'>Vis profil</Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            onRemoveMember();
            handleClose();
          }}>
          <ListItemIcon>
            <PersonRemoveIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='subtitle2'>
              {isMemberActor ? 'Forlat gruppe' : 'Fjern medlem'}
            </Typography>
          </ListItemText>
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
  const { data: session } = useSession();

  const [removeGroupMember, { loading }] = useRemoveGroupMember();

  const onRemoveGroupMember = (member: User) => {
    removeGroupMember({
      variables: { groupUuid: group.uuid, memberUuid: member.uuid },
      onCompleted: () => alert('Brukeren ble fjernet fra gruppen.'),
      onError: (error) => alert(error.message),
    });
  };

  const resolveChipProps = (member: User) => {
    if (detail) {
      return {
        deleteIcon: (
          <GroupMemberMenu
            isMemberActor={session?.user?.uuid == member.uuid}
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
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      {group.members.map((member, i) => (
        <Chip
          avatar={<Avatar user={member} />}
          key={i}
          label={member.name}
          sx={{ textAlign: 'start' }}
          variant='outlined'
          {...resolveChipProps(member)}
        />
      ))}
    </Stack>
  );
}
