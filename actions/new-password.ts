"use server";

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/features/auth/data/user";
import { getPasswordResetTokenByToken } from "@/features/auth/data/password-reset-token";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invaild fields" };
  }

  const { password } = validatedFields.data;

  const exsistingToken = await getPasswordResetTokenByToken(token);

  if (!exsistingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(exsistingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(exsistingToken.email);

  if (!existingUser) {
    return { error: "Email does noe exist" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: exsistingToken.id },
  });

  return { success: "Password updated" };
};
