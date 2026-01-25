"use client";

import { useEffect, useState } from "react";
import { simulateLoading } from "../_helpers/simulateLoading";

const useThemes = () => {
  const [themes, setThemes] = useState(null);
  const [loadingThemes, setLoading] = useState<boolean>(true);
  const [errorThemes, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/theme-preview?query=colors");

        if (!res.ok) {
          throw new Error("Could not load themes");
        }

        const data = await res.json();

        setThemes(data.themes);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, loadingThemes, errorThemes };
};

export default useThemes;
