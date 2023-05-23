import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import apolloClient from '@/apollo-client-setup';
import ME_QUERY from '@/graphql/me.query';
import SIGNIN_MUTATION from '@/graphql/signin.mutation';
import URLS from '@/URLS';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'email-login',
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@test.pl' },
        password: { label: 'Password', type: 'password' },
      },
      session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
      },
      secret: process.env.NEXTAUTH_SECRET,
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const { data } = await apolloClient
          .mutate({
            mutation: SIGNIN_MUTATION,
            variables: {
              email: email,
              password: password,
            },
          })
          .catch((error) => {
            console.error('Something went wrong during login mutation', error);
            throw new Error(
              'Noe gikk galt da vi prøvde å logge deg inn. Prøv igjen senere.',
            );
          });

        console.log('data', data);
        const { tokenAuth } = data;

        if (tokenAuth.success) {
          return {
            access_token: tokenAuth.token,
            refresh_token: tokenAuth.refreshToken,
            user: tokenAuth.user,
          };
        } else {
          console.log('tokenAuth', tokenAuth.errors.nonFieldErrors);
          throw new Error('Feil epost eller passord. Prøv igjen.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.account = user;
      }
      return token;
    },
    async session({
      session,
      token: {
        account: { user },
      },
    }) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: URLS.SIGNIN,
    // error: URLS.SIGNIN
  },
};

export default NextAuth(authOptions);
