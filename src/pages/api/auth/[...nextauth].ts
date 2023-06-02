import jsonwebtoken from 'jsonwebtoken';
import neo4j from 'neo4j-driver';
import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

import { Neo4jAdapter } from '@next-auth/neo4j-adapter';

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
    }),
  ],
  adapter: Neo4jAdapter(neo4jSession),
  session: {
    strategy: 'jwt',
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
    async session({ session, token, user }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
