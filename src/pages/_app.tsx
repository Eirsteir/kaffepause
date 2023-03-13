import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@mui/material/styles";

import { ApolloProviderWrapper } from '../apollo-client-setup';
import { theme } from '@/theme';


export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <ApolloProviderWrapper>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </ApolloProviderWrapper>
  )
}
