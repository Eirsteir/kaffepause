import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { ApolloProviderWrapper } from '../apollo-client-setup';


export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <ApolloProviderWrapper>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProviderWrapper>
  )
}
