import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

import * as bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getToken } from "next-auth/jwt";

//
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Please enter your username",
        },

        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        //auth logic
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("User name or password is not correct");
        if (!credentials?.password)
          throw new Error("Please Provide Your Password");
        const isPasswordCorrect = bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Password is not correct");

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user as User;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
