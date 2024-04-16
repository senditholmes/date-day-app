"use server";
import { User } from "@prisma/client";
import prisma from "../prisma";

export async function registerUser(
  user: Omit<User, "id" | "image" | "emailVerified">
) {
  const newUser = await prisma.user.create({ data: user });
}
