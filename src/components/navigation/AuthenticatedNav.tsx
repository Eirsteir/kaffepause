import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { IUser } from '../../types/User';
import AccountMenu from './AccountMenu';

interface IProps {
    user: IUser;
}

export default function AuthenticatedNav({ user }: IProps) {

    return (
        <Box sx={{ flexGrow: 1, borderBottom: '1px solid #DDD', marginBottom: '1rem' }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              </Typography>
                <AccountMenu name={user.name}/>
            </Toolbar>
          </AppBar>
        </Box>
    );
  };