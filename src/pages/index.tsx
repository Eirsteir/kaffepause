import Head from 'next/head'
import { useSession } from "next-auth/react"

import styles from '@/styles/Home.module.css'
import Link from '@/components/navigation/Link'
import URLS from '@/URLS'


export default function Home() {
  const { data: session, status } = useSession()
  console.log(session);
  console.log(status);

  if (status === "authenticated") {
    return <p>Signed in as {session?.user?.name}</p>
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

        <div className={styles.center}>
          KAFFE
        </div>

        <div className={styles.grid}>
          <Link href={URLS.SIGNIN}>Login</Link>
          <Link href={URLS.SIGNUP}>Sign up</Link>
        </div>
      </main>
    </>
  )
}
