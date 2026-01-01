import React from "react";

type Props = {
  theme: string;
  text?: string;
  url?: string;
};

const baseStyles = "px-8 py-3 rounded-full border border-2 font-medium";

const Link = ({ theme }: Props) => {
  return (
    <div
      className={`${baseStyles}
        ${theme === "soft-neutral" && "bg-slate-100 border-slate-200"}
        ${theme === "sage" && "bg-stone-100 border-slate-200"}
        ${theme === "dark" && "bg-slate-800 border-slate-700"}
        ${theme === "pastel-blue" && "bg-sky-100 border-indigo-200"}
        ${theme === "soft-pink" && "bg-rose-100 border-rose-200"}
        ${theme === "warm-mono" && "bg-amber-100 border-amber-200"}
        `}>
      Lorem ipsum dolor sit amet
    </div>
  );
};

export default Link;
