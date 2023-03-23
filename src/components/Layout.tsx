import Head from 'next/head';

import Navigation from '@/components/navigation/Navigation';
import styles from '@/styles/Layout.module.css';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
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
