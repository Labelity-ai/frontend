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
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Atlassian({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL_LOCAL,
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      //console.log(user);
      //const accessToken = jwt.sign(user, process.env.JWT_SECRET);
      //token.labelityToken = accessToken;
      return token;
    },
  },
  pages: {
    signIn: '/login'
  }
});
