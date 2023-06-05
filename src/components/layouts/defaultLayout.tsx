import Head from 'next/head';
import type { PropsWithChildren } from 'react';

import Footer from '@/components/Footer';
import BaseNavigation from '@/components/navigation/BaseNavigation';
import UnauthedAccountMenu from '@/components/navigation/UnauthedAccountMenu';
import styles from '@/styles/Layout.module.css';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>kaffepause</title>
        <meta content='kaffekaffekaffe' name='description' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main>
        <div className={styles.main}>
          <BaseNavigation>
            <UnauthedAccountMenu />
          </BaseNavigation>
          <div>{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
}
