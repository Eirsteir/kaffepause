import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { IUser } from '../../types/User';

interface IProps {
    user: IUser;
}

export default function AuthenticatedNav({ user }: IProps) {

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              </Typography>
              <Button color="inherit">{user.name}</Button>
            </Toolbar>
          </AppBar>
        </Box>
    );
  };