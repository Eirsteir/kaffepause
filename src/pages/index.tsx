import Head from 'next/head'

import styles from '@/styles/Home.module.css'

import Navigation from '@/components/navigation/Navigation'
import { useHasMounted } from '@/hooks/utils'
import { useIsAuthenticated } from '@/hooks/User'
import Home from '@/components/Home'
import Landing from '@/components/landing/Landing'

export default function LandingPage() {
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
          <Landing />
        )}
      </main>
    </>
  )
}
