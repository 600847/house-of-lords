"use client";
import React from "react";
import Link from "next/link";
import Navigation from "@/components/navigation";

export default function Header() {
  return (
    <header className="py-6 bg-red-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-semibold">House Of Lords</h1>
        </Link>

        <Navigation />
      </div>
    </header>
  );
}
