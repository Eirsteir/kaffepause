
export default NextAuth({
    providers: [
      CredentialsProvider({
        name: "Custom",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@test.pl" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const u = await login(req.body.email, req.body.password); // login and get user data
          const user = {
            name: u.current_user?.name,
            access_token: u.access_token, // <-- retrive JWT token from Drupal response
          };
          if (user) {
            return user;
          } else {
            return null;
          }
        },
      }),
      
  // ...
  // other settings
  // ...
  
      
  // Callbacks configuration - we create a new JWT Next token with `access_token` (from Drupal). 
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account) {
          token.account = { 
            ...account, 
            access_token: user.access_token  // <-- add token to JWT (Next's) object
          };
        }
        return token;
      },
      async session({ session, token }) {
        return { ...session };
      },
    },
  ];