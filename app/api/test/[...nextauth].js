import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      authorize: async (credentials) => {
        const user = { id: 1, name: 'Satish', email: 'satish2021choudhary.com' };
        if (user) {
          return user;
        } else { 
          return null;
        }
      }
    })
  ],
  jwt: {
    secret: process.env.JWT_SECRET
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
});
