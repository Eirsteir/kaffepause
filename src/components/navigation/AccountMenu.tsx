import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';

import URLS from '@/URLS';
import { getInitialsFromName } from '@/utils';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface IProps {
  name: string;
}

export default function AccountMenu({ name }: IProps) {
  const router = useRouter();
  const initials = getInitialsFromName(name); // TODO: user image
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    signOut();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            size='small'
            sx={{ ml: 2, padding: '5px 5px 5px 12px', border: '1px solid #DDD', borderRadius: '21px' }}>
            <MenuIcon sx={{ marginRight: '.1rem', width: 20, height: 20 }} />
            <Avatar sx={{ width: 30, height: 30 }}>{initials}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        id='account-menu'
        onClick={handleClose}
        onClose={handleClose}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 200,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
            Pausepreferanser
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>
            Leseplaner
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => router.push(URLS.PROFILE)}>
          <Typography variant='subtitle2'>Profil</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant='subtitle2'>Konto</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography variant='subtitle2'>Hjelp</Typography>
        </MenuItem>
        <MenuItem onClick={onSignOut}>
          <Typography variant='subtitle2'>Logg ut</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
