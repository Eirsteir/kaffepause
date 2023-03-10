
import URLS from "@/URLS";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
 
import apolloClient from "@/apollo-client-setup";
import SIGNIN_MUTATION from '../../../graphql/signin.mutation';
import ME_QUERY from '../../../graphql/me.query';


export default NextAuth({
    providers: [
      CredentialsProvider({
        id: "email-login", 
        name: "Email",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@test.pl" },
          password: { label: "Password", type: "password" },
        },
        session: {
            jwt: true,
            maxAge: 30 * 24 * 60 * 60
        },
        secret: process.env.NEXTAUTH_SECRET,
        async authorize(credentials, req) {
            const { data: { tokenAuth } } = await apolloClient.mutate({
                mutation: SIGNIN_MUTATION,
                variables: {
                    email: credentials?.email,
                    password: credentials?.password
                }
            });

            if (!tokenAuth.success || !tokenAuth.user)
                throw new Error(JSON.stringify({errors: tokenAuth.errors, email: credentials?.email, ok: false}));

          return {
            success: true,
            accessToken: tokenAuth.token, 
            refresToken: tokenAuth.refresh_token
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, account }) {
        if (account) {
          token.account = { 
            ...account, 
            accessToken: user?.accessToken,
            refreshToken: user?.refreshToken            
          };
          token.accessToken = user?.accessToken;
        }

        return token;
      },
      async session({ session, token }) {
        if (token && token.account.accessToken) {
            
            const context = {
                headers: {
                    authorization: `JWT ${token.account.accessToken}`
                }
            }

            const { data: { me } } = await apolloClient.query({
                query: ME_QUERY,
                context: context
            });

            session.user = me;
        }

        return { ...session };
      },
    },
    pages: {
        signIn: URLS.SIGNIN,
        error: URLS.SIGNIN
    }
});