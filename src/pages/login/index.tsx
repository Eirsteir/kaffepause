import { getProviders, getSession, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

export default function Login() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isRedirecting && router.isReady) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      setTimeout(() => {
        // redirect to the return url or home page
        router.push((router.query.returnUrl as string) || '/');
      }, 2000);
    }
  }, [session, isRedirecting, router]);

  const handleSignIn = () => {
    signIn('github');
  };

  return (
    <Container component='main' maxWidth='xs'>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Logg inn
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button onClick={handleSignIn} variant='outlined'>
            Logg inn
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req }); // TODO: server side session
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  return {
    props: {
      providers,
    },
  };
}
