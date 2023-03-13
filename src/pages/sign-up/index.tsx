import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from '@apollo/client';


import SIGNUP_MUTATION from '../../graphql/signup.mutation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import URLS from '@/URLS';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
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
      setSignUpError(router.query.error) // Shown below the input field in my example
      setEmail(router.query.email) // To prefill the email after redirect
      setFirstName(router.query.firstName)
      setLastName(router.query.lastName)
    }
  }, [router])

  const [register, { loading, error, reset }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: firstName + ' ' + lastName, 
      email: email,
      username: firstName + ' ' + lastName,  // TODO 
      preferredLocationUuid: null, //"1fe910a8-5574-435a-8378-24885d1c0bbe", 
      password1: password,
      password2: password // workaround
    },
    onCompleted: ({ register }) => handleSignUpCompleted(register),
    onError: err => {
      console.log(err)
      setSignUpError("Noe gikk galt, prøv igjen senere"); 
    }   
  });
  
  const handleSignUpCompleted = (register: any) => {
    console.log(register)
    if (register.success) {
        signIn("email-login", {
          isNewUser: true,
          token: register.token,
          refreshToken: register.refreshToken,
          redirect: false 
          }).then(res => {    
            if (res && res.ok && res.status === 200)
              router.push(URLS.LANDING);
            else {
              const error = JSON.parse(res.error);
              console.log(error)
              setEmail(error.email);
    
              if (error.errors.nonFieldErrors) {
                setSignUpError(error.errors.nonFieldErrors[0].message);
              } else {
                setSignUpError("Something went wrong");
              }
            }
          }) 
      } else {
        // TODO: handle errors
        // setSignUpError(register.errors)
        alert("Noe gikk galt", register.errors);
      }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register()
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <span 
            // className={styles.error}
            >{error?.message}</span>
            <span 
            // className={styles.error}
            >{signUpError}</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !email || !firstName || !lastName || !password}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={URLS.SIGNIN} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}