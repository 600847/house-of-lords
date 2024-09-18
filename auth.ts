import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/features/auth/data/user";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "@/features/auth/data/account";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    // users that use providers will set verified email
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const exsistingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!exsistingUser?.emailVerified) return false;

      return true;
    },

    // sets the user id and role to the session object
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // updating name and email on the session object if user have updated its settintgs
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    // sets the role of the user to the token if the user exsist
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const exsistingAccount = await getAccountByUserId(existingUser.id);

      // update user name and email when users update its settings
      token.isOAuth = !!exsistingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
