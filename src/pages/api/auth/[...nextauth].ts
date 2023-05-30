import jsonwebtoken from 'jsonwebtoken';
import neo4j from 'neo4j-driver';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

import apolloClient from '@/apollo-client-setup';
import SOCIAL_AUTH_MUTATION from '@/graphql/authentication/socialAuth.mutation';
import { Neo4jAdapter } from '@next-auth/neo4j-adapter';

const driver = neo4j.driver(
  // neo4j://neo4j:kaffepauseadmin@neo4j:7687
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'kaffepauseadmin'),
);

const neo4jSession = driver.session();

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-options
export default NextAuth({
  // https://authjs.dev/reference/providers/oauth-builtin
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: Neo4jAdapter(neo4jSession),
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
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
      if (account.provider == 'github') {
        const { access_token, refresh_token, provider } = account;

        console.log('ACCOUNT', account);

        const { data } = await apolloClient.mutate({
          mutation: SOCIAL_AUTH_MUTATION,
          variables: {
            provider: provider,
            accessToken: access_token,
          },
        });

        console.log(data);

        user.accessToken = data?.access_token;
        // user.refreshToken = refresh_token;

        return true;
      }

      return false;
    },
    async jwt({ token, user }) {
      console.log('TOKEN ', token);
      // if (user) {
      //   token = { accessToken: user.accessToken };
      // }

      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
