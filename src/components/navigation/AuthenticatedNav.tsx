import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { IUser } from '../../types/User';
import AccountMenu from './AccountMenu';
import BaseNavigation from './BaseNavigation';

interface IProps {
    user: IUser;
}

export default function AuthenticatedNav({ user }: IProps) {

    return (
      <BaseNavigation>
        <AccountMenu name={user.name}/>
      </BaseNavigation>
    );
  };