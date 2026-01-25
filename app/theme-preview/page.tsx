"use client";

import React, { useEffect } from "react";
import useThemes from "../_hooks/useThemes";
import Link from "../_components/Link";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setFontState, setThemeState } from "@/lib/themeSlice";
import useFonts from "../_hooks/useFonts";
import ThemeWrapper from "../_components/ThemeWrapper";

const selectStyles =
  "text-black border-2 border-slate-400 rounded-full px-2 capitalize bg-white w-40";

const Themes = () => {
  const dispatch = useAppDispatch();
  const { themes, loadingThemes, errorThemes } = useThemes();
  const { fonts, loadingFonts, errorFonts } = useFonts();
  const theme = useAppSelector((state) => state.theme.theme);
  const font = useAppSelector((state) => state.theme.font);

  useEffect(() => {
    return () => {
      dispatch(setThemeState("soft-neutral"));
      dispatch(setFontState("Manrope"));
    };
  }, [dispatch]);

  return (
    <ThemeWrapper>
      <div className="mx-auto max-w-xl px-4 flex flex-col items-center gap-4">
        <div className="flex flex-row gap-4">
          {themes && !loadingThemes && !errorThemes && (
            <select
              className={selectStyles}
              value={theme}
              onChange={(e) => {
                dispatch(setThemeState(e.target.value));
              }}>
              {Object.keys(themes).map((el: string) => (
                <option value={el} key={el}>
                  {el.replace("-", " ")}
                </option>
              ))}
            </select>
          )}

          {fonts && !loadingFonts && !errorFonts && Array.isArray(fonts) && (
            <select
              className={selectStyles}
              value={font}
              onChange={(e) => {
                dispatch(setFontState(e.target.value));
              }}>
              {fonts.map((el: string) => (
                <option value={el} key={el}>
                  {el.replace("-", " ")}
                </option>
              ))}
            </select>
          )}
        </div>

        <p className="bg-white rounded-full w-32 h-32 text-black flex items-center justify-center">
          img
        </p>

        <p className="font-bold text-lg">Lorem User Ipsum</p>

        <p className="text-center max-w-md w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sem
          ipsum, fringilla sit amet eros ut, lobortis accumsan magna.
        </p>

        {themes && Object.keys(themes).length > 0 && (
          <>
            <Link theme={theme} />
            <Link theme={theme} />
            <Link theme={theme} />
            <Link theme={theme} />
          </>
        )}
      </div>
    </ThemeWrapper>
  );
};

export default Themes;
