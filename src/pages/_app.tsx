import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { ApolloProviderWrapper } from '@/apollo-client-setup';
import Layout from '@/components/Layout';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <ApolloProviderWrapper>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </SessionProvider>
      </ApolloProviderWrapper>
      <Analytics />
    </>
  );
}
