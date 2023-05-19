import Head from 'next/head';
import type { PropsWithChildren } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/navigation/Navigation';
import styles from '@/styles/Layout.module.css';

export default function Layout({ children }: PropsWithChildren) {
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
        <div>{children}</div>
        {/* <Footer /> */}
      </main>
    </>
  );
}
