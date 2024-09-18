"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcryptjs from "bcryptjs";

// Helper to check and update email
const updateEmail = async (user, newEmail) => {
  if (newEmail && newEmail !== user.email) {
    const existingUser = await getUserByEmail(newEmail);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(newEmail);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "Verification email sent. Please verify your email before updating other details.",
    };
  }
  return null;
};

// Helper to check and update username
const updateName = async (user, newName) => {
  if (newName && newName !== user.name) {
    const existingUserWithName = await db.user.findUnique({
      where: { name: newName },
    });

    if (existingUserWithName && existingUserWithName.id !== user.id) {
      return { error: "Username already in use" };
    }

    return { updatedField: "name", value: newName };
  }
  return null;
};

// Helper to check and update password
const updatePassword = async (user, currentPassword, newPassword) => {
  const dbUser = await getUserById(user.id);

  if (currentPassword && newPassword && dbUser.password) {
    const passwordMatch = await bcryptjs.compare(
      currentPassword,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    return { updatedField: "password", value: hashedPassword };
  }
  return null;
};

// Main settings update function
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // If user is OAuth, skip email and password updates
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  // Update email (with verification)
  const emailResult = await updateEmail(user, values.email);
  if (emailResult && emailResult.error) {
    return { error: emailResult.error };
  } else if (emailResult && emailResult.success) {
    return { success: emailResult.success };
  }

  // Update name
  const nameResult = await updateName(user, values.name);
  if (nameResult && nameResult.error) {
    return { error: nameResult.error };
  }

  // Update password
  const passwordResult = await updatePassword(
    user,
    values.password,
    values.newPassword
  );
  if (passwordResult && passwordResult.error) {
    return { error: passwordResult.error };
  }

  // Update user data in the database
  const updates = {
    ...(nameResult && { name: nameResult.value }),
    ...(passwordResult && { password: passwordResult.value }),
  };

  if (Object.keys(updates).length > 0) {
    await db.user.update({
      where: { id: user.id },
      data: updates,
    });
  }

  // Return success message based on the updates
  if (nameResult && passwordResult) {
    return { success: "Name and password updated" };
  } else if (nameResult) {
    return { success: "Name updated" };
  } else if (passwordResult) {
    return { success: "Password updated" };
  }

  return { success: "No changes made" };
};
