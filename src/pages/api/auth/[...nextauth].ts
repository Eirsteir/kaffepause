import jsonwebtoken from 'jsonwebtoken';

import { sendVerificationRequest } from '@/utils';
import neo4j from 'neo4j-driver';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import URLS from '@/URLS';
import { Neo4jAdapter } from '@next-auth/neo4j-adapter';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      image: string;
      email: string;
      // ...other properties
      // role: UserRole;
    }; // & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost',
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || 'neo4j',
    process.env.NEO4J_PASSWORD || 'kaffepauseadmin',
  ),
);

const neo4jSession = driver.session();

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      name: 'email',
      server: '',
      from:  process.env.FROM_EMAIL!,
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        // For re-issuing refresh tokens
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: Neo4jAdapter(neo4jSession),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: process.env.ISSUER_URL,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: URLS.SIGNIN,
  },
};

export default NextAuth(authOptions);
