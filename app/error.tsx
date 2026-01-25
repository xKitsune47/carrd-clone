"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full w-full text-center flex flex-col justify-center gap-4 items-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <span>{error.message}</span>
      <button
        onClick={() => reset()}
        className="border-2 border-slate-900 hover:border-slate-600 hover:cursor-pointer w-fit px-4 rounded-lg hover:scale-103 transition-all duration-300">
        Try again
      </button>
    </div>
  );
}
