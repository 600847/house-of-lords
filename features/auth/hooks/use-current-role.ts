import { useSession } from "next-auth/react";

// gets the user role on "use client"

export const useCurrentRole = () => {
  const session = useSession();
  return session.data?.user.role;
};
