import { useEffect, useState } from "react";

const useThemes = () => {
  const [themes, setThemes] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/theme-preview");
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

  return { themes, loading, error };
};

export default useThemes;
