import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import DefaultLayout from '@/components/layouts/defaultLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CssBaseline, Divider, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Login({ session, providers }) {
  const [isRedirecting, setIsRedirecting] = useState(false);
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

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Logg inn eller registrer deg
        </Typography>
        <Box sx={{ mt: 1 }}>
        <form onSubmit={(e) => {
                e.preventDefault();
                const email =  e.target.email.value as string;
                signIn('email', { email, redirect: false });
                e.target.reset();

            }}>
          <TextField
            autoComplete='email'
            autoFocus
            fullWidth
            id='email'
            label='E-post'
            margin='normal'
            name='email'
          />
          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            Fortsett
          </Button>
        </form>
          <Divider>
            <Typography variant='subtitle2'>eller</Typography>
          </Divider>
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              onClick={() => signIn('google')}
              startIcon={<GoogleIcon />}
              sx={{ mb: 1 }}
              type='submit'
              variant='outlined'>
              Fortsett med Google
            </Button>
            <Button
              fullWidth
              onClick={() => signIn('github')}
              startIcon={<GitHubIcon />}
              sx={{ mb: 1 }}
              type='submit'
              variant='outlined'>
              Fortsett med Github
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession({ req }); // TODO: server side session
  const session = await getServerSession(context.req, context.res, authOptions);
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  return {
    props: {
      session,
      providers,
    },
  };
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
