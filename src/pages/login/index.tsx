import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DefaultLayout from '@/components/layouts/defaultLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import GitHubIcon from '@mui/icons-material/GitHub';
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

  const handleSignIn = () => {
    signIn('github');
  };

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
            onClick={handleSignIn}
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            Fortsett
          </Button>
          <Divider>
            <Typography variant='subtitle2'>eller</Typography>
          </Divider>
          <Button
            fullWidth
            onClick={handleSignIn}
            startIcon={<GitHubIcon />}
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='outlined'>
            Fortsett med Github
          </Button>
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

Login.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
