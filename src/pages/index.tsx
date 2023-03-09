import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from '@/components/navigation/Link'
import URLS from '@/URLS'


export default function Home() {
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
