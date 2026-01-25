import { useAppDispatch, useAppSelector } from "@/lib/store";
import React, { ReactNode, useEffect } from "react";
import useThemes from "../_hooks/useThemes";
import useFonts from "../_hooks/useFonts";
import usePredeclaredFonts from "../_hooks/usePredeclaredFonts";
import { setFontState, setThemeState } from "@/lib/themeSlice";
import Loading from "../loading";
import { usePathname } from "next/navigation";

type Props = { style?: string; children: ReactNode };

const ThemeWrapper = ({ children, style }: Props) => {
  const dispatch = useAppDispatch();
  const { themes, loadingThemes, errorThemes } = useThemes();
  const { fonts, loadingFonts, errorFonts } = useFonts();
  const theme = useAppSelector((state) => state.theme.theme);
  const font = useAppSelector((state) => state.theme.font);
  const { declaredFonts } = usePredeclaredFonts();
  const pathname = usePathname();
  const isThemePreview = pathname === "/theme-preview";
  const isUserPage =
    pathname?.startsWith("/") &&
    pathname !== "/" &&
    pathname !== "/create" &&
    pathname !== "/register" &&
    pathname !== "/theme-preview";

  useEffect(() => {
    if (isUserPage) {
      return;
    }

    if (!isThemePreview) {
      if (themes && !theme) {
        dispatch(setThemeState("soft-neutral"));
      }

      if (fonts && !font) {
        dispatch(setFontState("Manrope"));
      }
    } else {
      if (themes && !theme) {
        dispatch(setThemeState(Object.keys(themes)[0]));
      }

      if (fonts && !font) {
        dispatch(setFontState(fonts[0]));
      }
    }
  }, [themes, fonts, dispatch, isThemePreview, isUserPage]);

  if (loadingThemes || loadingFonts) {
    return <Loading />;
  }

  if (errorThemes || errorFonts) {
    throw new Error(
      `Could not load theme preview:
      Themes error: ${errorThemes && errorThemes},
      Fonts error: ${errorFonts && errorFonts}.`,
    );
  }

  if (!isThemePreview) {
    if (style) {
      return (
        <div
          className={`${style} 
            ${font === "Inter" && declaredFonts.inter.className}
            ${font === "Source Sans 3" && declaredFonts.sourceSans3.className}
            ${font === "Manrope" && declaredFonts.manrope.className}
            ${font === "DM Sans" && declaredFonts.dmSans.className}
            ${font === "Poppins" && declaredFonts.poppins.className}
            ${font === "IBM Plex Sans" && declaredFonts.ibmPlexSans.className}
            ${theme === "soft-neutral" ? "text-slate-900" : ""}
            ${theme === "sage" ? "text-stone-900" : ""}
            ${theme === "dark" ? "text-slate-50" : ""}
            ${theme === "pastel-blue" ? "text-slate-900" : ""}
            ${theme === "soft-pink" ? "text-zinc-900" : ""}
            ${theme === "warm-mono" ? "text-stone-900" : ""}
          `}>
          {children}
        </div>
      );
    }

    return (
      <div
        className={`flex-1 transition-all duration-300
          ${theme === "soft-neutral" && "bg-slate-50 text-slate-900"}
          ${theme === "sage" && "bg-stone-50 text-stone-900"}
          ${theme === "dark" && "bg-slate-900 text-slate-50"}
          ${theme === "pastel-blue" && "bg-sky-50 text-slate-900"}
          ${theme === "soft-pink" && "bg-rose-50 text-zinc-900"}
          ${theme === "warm-mono" && "bg-amber-50 text-stone-900"}
          ${font === "Inter" && declaredFonts.inter.className}
          ${font === "Source Sans 3" && declaredFonts.sourceSans3.className}
          ${font === "Manrope" && declaredFonts.manrope.className}
          ${font === "DM Sans" && declaredFonts.dmSans.className}
          ${font === "Poppins" && declaredFonts.poppins.className}
          ${font === "IBM Plex Sans" && declaredFonts.ibmPlexSans.className}
        `}>
        {children}
      </div>
    );
  }

  if (style) {
    return (
      <div
        className={`${style} 
          ${font === "Inter" && declaredFonts.inter.className}
          ${font === "Source Sans 3" && declaredFonts.sourceSans3.className}
          ${font === "Manrope" && declaredFonts.manrope.className}
          ${font === "DM Sans" && declaredFonts.dmSans.className}
          ${font === "Poppins" && declaredFonts.poppins.className}
          ${font === "IBM Plex Sans" && declaredFonts.ibmPlexSans.className}
          ${theme === "soft-neutral" ? "text-slate-900" : ""}
          ${theme === "sage" ? "text-stone-900" : ""}
          ${theme === "dark" ? "text-slate-50" : ""}
          ${theme === "pastel-blue" ? "text-slate-900" : ""}
          ${theme === "soft-pink" ? "text-zinc-900" : ""}
          ${theme === "warm-mono" ? "text-stone-900" : ""}
          `}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`py-24 gap-4 h-full transition-all duration-300
        ${theme === "soft-neutral" && "bg-slate-50 text-slate-900"}
        ${theme === "sage" && "bg-stone-50 text-stone-900"}
        ${theme === "dark" && "bg-slate-900 text-slate-50"}
        ${theme === "pastel-blue" && "bg-sky-50 text-slate-900"}
        ${theme === "soft-pink" && "bg-rose-50 text-zinc-900"}
        ${theme === "warm-mono" && "bg-amber-50 text-stone-900"}
        ${font === "Inter" && declaredFonts.inter.className}
        ${font === "Source Sans 3" && declaredFonts.sourceSans3.className}
        ${font === "Manrope" && declaredFonts.manrope.className}
        ${font === "DM Sans" && declaredFonts.dmSans.className}
        ${font === "Poppins" && declaredFonts.poppins.className}
        ${font === "IBM Plex Sans" && declaredFonts.ibmPlexSans.className}
    `}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
