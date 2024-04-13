import prisma from "@/app/lib/prisma";
import { error } from "console";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
