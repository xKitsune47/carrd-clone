"use client";

import { useEffect, useState } from "react";
import { simulateLoading } from "../_helpers/simulateLoading";

const useFonts = () => {
  const [fonts, setFonts] = useState<string[] | null>(null);
  const [loadingFonts, setLoading] = useState<boolean>(true);
  const [errorFonts, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/theme-preview?query=fonts");

        if (!res.ok) {
          throw new Error("Could not load fonts");
        }

        const data = await res.json();

        setFonts(data.fonts);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, []);

  return { fonts, loadingFonts, errorFonts };
};

export default useFonts;
