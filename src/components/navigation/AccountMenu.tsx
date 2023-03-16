import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';

import { signOut } from 'next-auth/react';
import { getInitialsFromName } from '@/utils';

interface IProps {
    name: string;
}

export default function AccountMenu({ name }: IProps) {
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
        signOut()
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
                <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, padding: '5px 5px 5px 12px', border: '1px solid #DDD', borderRadius: '21px' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                >
                    <MenuIcon sx={{ marginRight: '.1rem', width: 20, height: 20 }}/>
                    <Avatar sx={{ width: 30, height: 30 }}>{initials}</Avatar>
                </IconButton>
            </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <MenuItem onClick={handleClose}>
                <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                   Break Preferences    
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                   Schedules    
                </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <Typography variant='subtitle2'>
                   Profile    
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Typography variant='subtitle2'>
                   Account    
                </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <Typography variant='subtitle2'>
                    Help    
                </Typography>
            </MenuItem>
            <MenuItem onClick={onSignOut}>
                <Typography variant='subtitle2'>
                    Log Out
                </Typography>
            </MenuItem>
            </Menu>
        </React.Fragment>
    );  
}