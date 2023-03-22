import Head from 'next/head';

import styles from '@/styles/Layout.module.css';

import Navigation from './navigation/Navigation';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>kaffepause</title>
        <meta content='kaffekaffekaffe' name='description' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className={styles.main}>
        <Navigation />

        <div className={styles.mainContainer}>{children}</div>
      </main>
    </>
  );
}
