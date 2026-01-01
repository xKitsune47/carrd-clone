"use client";

import React, { useEffect, useState } from "react";
import useThemes from "../_hooks/useThemes";
import Link from "../_components/Link";

const page = () => {
  const { themes, loading, error } = useThemes();
  const [theme, setTheme] = useState<string>("");

  if (themes) {
    console.log(themes);
  }

  useEffect(() => {
    if (themes) {
      setTheme(Object.keys(themes)[0]);
    }
  }, [themes]);

  return (
    <div className="flex flex-col items-center py-16 gap-4">
      {themes && !loading && !error && (
        <select className="text-black">
          {Object.keys(themes).map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>
      )}

      <p className="bg-white rounded-full w-8 h-8 text-black flex items-center justify-center">
        img
      </p>
      <p>loremipsum</p>

      {themes && Object.keys(themes).length > 0 && (
        <>
          <Link accent={themes[theme].accent} />
          <Link accent={themes[theme].accent} />
          <Link accent={themes[theme].accent} />
        </>
      )}
    </div>
  );
};

export default page;
