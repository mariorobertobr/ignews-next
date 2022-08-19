import NextAuth from "next-auth";
import { query as q } from "faunadb";

import GitHubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const searchUserByEmail = await q.Match(
          q.Index("user_by_email"),
          q.Casefold(user.email)
        );

        await fauna.query(
          q.If(
            q.Not(q.Exists(searchUserByEmail)),
            q.Create(q.Collection("USERS"), { data: { email: user.email } }),
            q.Get(searchUserByEmail)
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
