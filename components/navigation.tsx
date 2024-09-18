"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "@/features/auth/components/user-button";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      <Link
        href="/"
        className={`${
          "/" === pathname && "text-accent border-b-2 border-accent"
        } capitalize font-medium hover:text-accent transition-all`}
      >
        Home
      </Link>
      <Link
        href="/create-game"
        className={`${
          "/create-game" === pathname && "text-accent border-b-2 border-accent"
        } capitalize font-medium hover:text-accent transition-all`}
      >
        Create Game
      </Link>
      <Link
        href="/games"
        className={`${
          "/games" === pathname && "text-accent border-b-2 border-accent"
        } capitalize font-medium hover:text-accent transition-all`}
      >
        Find Games
      </Link>
      <UserButton />
    </nav>
  );
}
