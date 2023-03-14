import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import { Box, Typography, Grid, Button } from '@mui/material'
import Navigation from '@/components/navigation/Navigation'
import { useHasMounted } from '@/hooks/utils'
import { useIsAuthenticated } from '@/hooks/User'
import Home from '@/components/Home'
import Link from '@/components/navigation/Link'
import URLS from '@/URLS'


export default function Landing() {
  const { session, status, user, isAuthenticated } = useIsAuthenticated();
    
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>kaffe</title>
        <meta name="description" content="kaffekaffekaffe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <Navigation />
      
        {isAuthenticated ? (
          <Home user={user!} />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            sx={{ justifyContent: 'space-evenly' }}
          >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              
            <Box sx={{paddingLeft: '5rem'}}>
              <Typography variant="h1" color='secondary' component="div" align="left">
                  kaffe
              </Typography>            
              <Typography variant="subtitle1" color='secondary' component='div' align='left'>
                Whether you need a quick caffeine boost or want to catch up with friends over a cup of coffee, our tool makes it easy to plan the perfect coffee break.
              </Typography>

              {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                // minHeight="80vh"
                // sx={{ justifyContent: 'space-between' }}
              > */}
                <Link href={URLS.SIGNIN}>
                      <Button color="secondary" variant="contained" disableElevation sx={{ marginTop: '1rem'}}>
                          Take a break
                      </Button>
                  </Link>
                  <Link href={URLS.SIGNUP}>
                      <Button color="secondary" variant="contained" disableElevation sx={{ marginTop: '1rem', marginLeft: '1rem'}}>
                        Register
                      </Button>
                  </Link> 
                {/* </Box> */}
            </Box>

            </Grid>
            <Grid item xs={6}>
              
            <Box>
              <Typography variant="h1" color='secondary' component="div" align="center">
                  {/* IMAGE */}
              </Typography>            

            </Box>

            </Grid>
          </Grid>          
          </Box> 
        )}
      </main>
    </>
  )
}
