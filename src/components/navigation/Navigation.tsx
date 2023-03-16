import Button from '@mui/material/Button'

import { useIsAuthenticated } from "@/hooks/User";
import { useHasMounted } from "@/hooks/utils";
import AuthenticatedNav from "./AuthenticatedNav";
import Link from './Link';
import URLS from '@/URLS';
import BaseNavigation from './BaseNavigation';

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
      <BaseNavigation>
        <Link href={URLS.SIGNIN}>
            <Button disableElevation>
                Login
            </Button>
        </Link>
        <Link href={URLS.SIGNUP}>
            <Button disableElevation>
            Sign up
            </Button>
        </Link> 
      </BaseNavigation>
    );
  };