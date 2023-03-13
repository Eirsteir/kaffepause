import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { useIsAuthenticated } from "@/hooks/User";
import { useHasMounted } from "@/hooks/utils";
import AuthenticatedNav from "./AuthenticatedNav";
import Link from './Link';
import URLS from '@/URLS';

export default function Navigation() {
    const { session, status, user, isAuthenticated } = useIsAuthenticated();
    
    const hasMounted = useHasMounted();
    if (!hasMounted) {
      return null;
    }


    if (isAuthenticated) {
      return (
        <AuthenticatedNav user={user!} />
      );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              </Typography>
                <Link href={URLS.SIGNIN}>
                    <Button color="secondary" disableElevation>
                    Login
                    </Button>
                </Link>
                <Link href={URLS.SIGNUP}>
                    <Button color="secondary" disableElevation>
                    Sign up
                    </Button>
                </Link> 
            </Toolbar>
          </AppBar>
        </Box>
    );
  };