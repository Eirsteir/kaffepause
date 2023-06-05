import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { ApolloProviderWrapper } from '@/apollo-client-setup';
import Layout from '@/components/layouts/Layout';
import { ProtectedLayout } from '@/components/layouts/protectedLayouts';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';

import '@fontsource/raleway';
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/800.css';
import '@fontsource/raleway/900.css';

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
