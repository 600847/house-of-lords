import { useSession } from "next-auth/react";

// gets the user on "use client"

export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
