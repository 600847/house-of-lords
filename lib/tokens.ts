import { getVerificationTokenByEmail } from "@/features/auth/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/features/auth/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exsistingToken = await getPasswordResetTokenByEmail(email);

  if (exsistingToken) {
    await db.passwordResetToken.delete({
      where: { id: exsistingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const exsistingToken = await getVerificationTokenByEmail(email);

  if (exsistingToken) {
    await db.verificationToken.delete({
      where: {
        id: exsistingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
