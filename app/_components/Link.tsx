import React from "react";

type Props = {
  theme: string;
  text?: string;
  url?: string;
  icon?: string;
};

const baseStyles =
  "px-8 py-3 rounded-full border border-2 font-medium hover:scale-102 transition-transform transition-colors duration-300 cursor-pointer lg:w-md flex flex-row gap-4 justify-center";

const Link = ({ theme, text, url }: Props) => {
  return (
    <a
      href={url ? url : "https://github.com/xkitsune47"}
      target="_blank"
      className={`${baseStyles} transition-transform
        ${theme === "soft-neutral" ? "bg-slate-100 border-slate-200" : ""}
        ${theme === "sage" ? "bg-stone-100 border-slate-200" : ""}
        ${theme === "dark" ? "bg-slate-800 border-slate-700" : ""}
        ${theme === "pastel-blue" ? "bg-sky-100 border-indigo-200" : ""}
        ${theme === "soft-pink" ? "bg-rose-100 border-rose-200" : ""}
        ${theme === "warm-mono" ? "bg-amber-100 border-amber-200" : ""}
        `}>
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

      {text ? text : "Lorem ipsum dolor sit amet"}
    </a>
  );
};

export default Link;
