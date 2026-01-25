"use client";

import React from "react";
import Link from "next/link";
import ThemeWrapper from "./ThemeWrapper";
import { useSession, signOut } from "next-auth/react";
import { useAppSelector } from "@/lib/store";

const baseStyles =
  "w-full fixed h-16 flex items-center justify-around backdrop-blur-sm font-semibold";

const Header = () => {
  const { data: session, status } = useSession();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ThemeWrapper style={baseStyles}>
      <Link href="/" className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
        <span>Kitsune&apos;s Links</span>
      </Link>

      <div className="flex flex-row gap-8 items-center">
        <Link href="/theme-preview">Check themes</Link>
        <Link href="/create">Create page</Link>

        {status === "authenticated" && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold cursor-pointer ${
              theme === "dark"
                ? "bg-slate-100 text-slate-900 hover:bg-white"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}>
            Logout
          </button>
        )}
      </div>
    </ThemeWrapper>
  );
};

export default Header;
