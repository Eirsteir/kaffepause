import Head from 'next/head'
import { signOut, useSession } from "next-auth/react"

import styles from '@/styles/Home.module.css'
import Link from '@/components/navigation/Link'
import URLS from '@/URLS'
import { Box, Button, Typography } from '@mui/material'
import Navigation from '@/components/navigation/Navigation'
import { useHasMounted } from '@/hooks/utils'
import { useIsAuthenticated } from '@/hooks/User'
import Home from '@/components/Home'


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
          <Box>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                KAFFE
            </Typography>
          </Box>
        )}
      </main>
    </>
  )
}
