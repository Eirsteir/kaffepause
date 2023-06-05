import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { ApolloProviderWrapper } from '@/apollo-client-setup';
import Layout from '@/components/layouts/Layout';
import { ProtectedLayout } from '@/components/layouts/protectedLayouts';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';

// add requireAuth to AppProps
type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  return (
    <>
      <ApolloProviderWrapper>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            <Layout>
              {Component.requireAuth ? (
                <ProtectedLayout>
                  <Component {...pageProps} />
                </ProtectedLayout>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </ThemeProvider>
        </SessionProvider>
      </ApolloProviderWrapper>
      <Analytics />
    </>
  );
}
