import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.GitLab({
      clientId: process.env.GITLAB_ID,
      clientSecret: process.env.GITLAB_SECRET,
    }),
    Providers.Atlassian({
      clientId: process.env.ATLASSIAN_ID,
      clientSecret: process.env.ATLASSIAN_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, token) {
      // This attachs the token to the object returned by useSession
      if (token?.labelityToken) session.labelityToken = token.labelityToken;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      const { sub, name, email } = token;
      const labelityToken = jwt.sign(
        { sub, name, email },
        process.env.JWT_SECRET
      );
      token.labelityToken = labelityToken;
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
