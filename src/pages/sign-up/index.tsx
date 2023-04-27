import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Divider from '@/components/elements/Divider';
import SIGNUP_MUTATION from '@/graphql/signup.mutation';
import URLS from '@/URLS';
import { useMutation } from '@apollo/client';
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
    <Typography
      align='center'
      color='text.secondary'
      variant='body2'
      {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://kaffepause.com/'>
        kaffepause
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      setSignUpError(router.query.error); // Shown below the input field in my example
      setEmail(router.query.email); // To prefill the email after redirect
      setFirstName(router.query.firstName);
      setLastName(router.query.lastName);
    }
  }, [router]);

  const [register, { loading, error, reset }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: firstName + ' ' + lastName,
      email: email,
      username: firstName + ' ' + lastName, // TODO
      preferredLocationUuid: null, //"1fe910a8-5574-435a-8378-24885d1c0bbe",
      password1: password,
      password2: password, // workaround
    },
    onCompleted: ({ register }) => handleSignUpCompleted(register),
    onError: (err) => {
      console.log(err);
      setSignUpError('Noe gikk galt, prøv igjen senere');
    },
  });

  const handleSignUpCompleted = (register: any) => {
    console.log(register);
    if (register.success) {
      signIn('email-login', {
        email: email,
        password: password,
        redirect: false,
      }).then((res) => {
        if (res && res.ok && res.status === 200) router.push(URLS.LANDING);
        else {
          const error = JSON.parse(res.error);
          console.log(error);
          setEmail(error.email);

          if (error.errors.nonFieldErrors) {
            setSignUpError(error.errors.nonFieldErrors[0].message);
          } else {
            setSignUpError('Noe gikk galt');
          }
        }
      });
    } else {
      // TODO: handle errors
      // setSignUpError(register.errors)
      alert('Noe gikk galt', register.errors);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register();
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
          Registrer deg
        </Typography>
        <Box component='form' noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete='given-name'
                autoFocus
                fullWidth
                id='firstName'
                label='Fornavn'
                name='firstName'
                onChange={(e) => setFirstName(e.target.value)}
                required
                value={firstName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete='family-name'
                fullWidth
                id='lastName'
                label='Etternavn'
                name='lastName'
                onChange={(e) => setLastName(e.target.value)}
                required
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='email'
                fullWidth
                id='email'
                label='E-post'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='new-password'
                fullWidth
                id='password'
                label='Passord'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                type='password'
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ lineHeight: 1 }} variant='caption'>
                Ved å velge <b>Godta og fortsett</b>, godtar jeg Kaffepauses{' '}
                <b>Bruksvilkår</b> og bekrefter{' '}
                <b>Retningslinjer for personvern</b>.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  loading || !email || !firstName || !lastName || !password
                }
                fullWidth
                sx={{ mb: 2 }}
                type='submit'
                variant='contained'>
                Godta og fortsett
              </Button>
            </Grid>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href={URLS.SIGNIN} variant='body2'>
                  Har du allerede en bruker? Logg inn
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Typography sx={{ lineHeight: 1 }} variant='caption'>
                Kaffepause sender deg medlemstilbud, inspirasjon,
                markedsføringsmeldinger og push-varslinger. Du kan når som helst
                velge å ikke motta disse i kontoinnstillingene dine eller
                direkte fra markedsføringsvarselet.
              </Typography>
              <FormControlLabel
                control={<Checkbox color='primary' value='allowExtraEmails' />}
                label={
                  <Typography variant='caption'>
                    Jeg ønsker ikke å motta markedsføringsmeldinger fra
                    Kaffepause.
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <span
          // className={styles.error}
          >
            {error?.message}
          </span>
          <span
          // className={styles.error}
          >
            {signUpError}
          </span>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
