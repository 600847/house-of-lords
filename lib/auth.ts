import { auth } from "@/auth";

// gets the user on "use server"

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

// gets the user role on "use server"

export const currentUserRole = async () => {
  const session = await auth();
  return session?.user.role;
};
