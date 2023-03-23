import { getProviders, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';

import URLS from '@/URLS';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Copyright(props: any) {
  return (
    <Typography align='center' color='text.secondary' variant='body2' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      setLoginError(router.query.error); // Shown below the input field in my example
      setEmail(router.query.email); // To prefill the email after redirect
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    signIn('email-login', {
      email: email,
      password: password,
      // callbackUrl: `${window.location.origin}/`
      redirect: false,
    }).then((res) => {
      if (res && res.ok && res.status === 200) router.push(URLS.LANDING);
      else {
        setIsLoading(false);
        const error = JSON.parse(res.error);
        setEmail(error.email);

        if (error.errors.nonFieldErrors) {
          setLoginError(error.errors.nonFieldErrors[0].message);
        } else {
          setLoginError('Something went wrong');
        }
      }
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
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
          Sign in
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            autoComplete='email'
            autoFocus
            fullWidth
            id='email'
            label='Email Address'
            margin='normal'
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // className={loginError ? styles.errorInput : ''}
          />
          <TextField
            autoComplete='current-password'
            fullWidth
            id='password'
            label='Password'
            margin='normal'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            required
            type='password'
            value={password}
          />
          <FormControlLabel control={<Checkbox color='primary' value='remember' />} label='Remember me' />
          <span
          // className={styles.error}
          >
            {loginError}
          </span>
          <Button disabled={isLoading} fullWidth sx={{ mt: 3, mb: 2 }} type='submit' variant='contained'>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={URLS.SIGNUP} variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
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
