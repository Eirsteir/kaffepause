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
        const {
          data: { tokenAuth },
        } = await apolloClient.mutate({
          mutation: SIGNIN_MUTATION,
          variables: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });

        if (tokenAuth.success) {
          const context = {
            headers: {
              authorization: `JWT ${tokenAuth.token}`,
            },
          };

          const {
            data: { me },
          } = await apolloClient.query({
            query: ME_QUERY,
            context: context,
          });

          if (me) {
            return {
              success: true,
              access_token: tokenAuth.token,
              refresh_token: tokenAuth.refreshToken,
              user: { ...me },
            };
          }
        }

        return null;
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
