"use server";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmailOrName } from "@/features/auth/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const exsistingUser = await getUserByEmailOrName(email, name);

  if (exsistingUser) {
    if (exsistingUser.email === email) {
      return { error: "Email already in use!" };
    }
    if (exsistingUser.name === name) {
      return { error: "Username already in use!" };
    }
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
