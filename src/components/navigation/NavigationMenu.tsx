import * as React from 'react';

import Avatar from '@/components/elements/Avatar';
import { User } from '@/types/User';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';

export default function NavigationMenu({
  user,
  children,
}: {
  user?: User;
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Profilmeny'>
          <IconButton
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            size='small'
            sx={{
              ml: 2,
              padding: '5px 5px 5px 12px',
              border: '1px solid #DDD',
              borderRadius: '21px',
            }}>
            <MenuIcon sx={{ marginRight: '.1rem', width: 20, height: 20 }} />
            <Avatar sx={{ width: 30, height: 30 }} user={user} />
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
            minWidth: 200,
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
        {children}
      </Menu>
    </React.Fragment>
  );
}
