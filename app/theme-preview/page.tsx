"use client";

import React, { useEffect, useState } from "react";
import useThemes from "../_hooks/useThemes";
import Link from "../_components/Link";

const page = () => {
  const { themes, loading, error } = useThemes();
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    if (themes) {
      setTheme(Object.keys(themes)[0]);
    }
  }, [themes]);

  return (
    <div
      className={`flex flex-col items-center py-16 gap-4
        ${theme === "soft-neutral" && "bg-slate-50 text-slate-900"}
        ${theme === "sage" && "bg-stone-50 text-stone-900"}
        ${theme === "dark" && "bg-slate-900 text-slate-50"}
        ${theme === "pastel-blue" && "bg-sky-50 text-slate-900"}
        ${theme === "soft-pink" && "bg-rose-50 text-zinc-900"}
        ${theme === "warm-mono" && "bg-amber-50 text-stone-900"}
    `}>
      {themes && !loading && !error && (
        <select
          className={`text-black border-2 border-slate-400 rounded-full px-2 capitalize bg-white`}
          onChange={(e) => {
            setTheme(e.target.value);
          }}>
          {Object.keys(themes).map((el) => (
            <option value={el} key={el}>
              {el.replace("-", " ")}
            </option>
          ))}
        </select>
      )}

      <p className="bg-white rounded-full w-32 h-32 text-black flex items-center justify-center">
        img
      </p>

      <p className="font-bold">Lorem User Ipsum</p>

      {themes && Object.keys(themes).length > 0 && (
        <>
          <Link theme={theme} />
        </>
      )}
    </div>
  );
};

export default page;
