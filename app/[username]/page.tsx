"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThemeWrapper from "../_components/ThemeWrapper";
import Loading from "../loading";
import { useAppDispatch } from "@/lib/store";
import { setFontState, setThemeState } from "@/lib/themeSlice";
import Link from "../_components/Link";

interface Link {
  title: string;
  url: string;
  order: number;
}

interface UserPageData {
  username: string;
  email: string;
  image?: string;
  description?: string;
  links: Link[];
  theme?: string;
  font?: string;
}

const UserPage = () => {
  const { username } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [userPage, setUserPage] = useState<UserPageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      fetchUserPage();
    }

    return () => {
      dispatch(setThemeState("soft-neutral"));
      dispatch(setFontState("Manrope"));
    };
  }, [username, dispatch]);

  const fetchUserPage = async () => {
    try {
      const res = await fetch(`/api/user-page/${username}`);

      if (!res.ok) {
        if (res.status === 404) {
          setError("User page not found");
        } else {
          setError("Failed to load page");
        }
        return;
      }

      const data = await res.json();
      setUserPage(data.userPage);

      if (data.userPage.theme) {
        dispatch(setThemeState(data.userPage.theme));
      }
      if (data.userPage.font) {
        dispatch(setFontState(data.userPage.font));
      }
    } catch (error) {
      console.error("Error fetching user page:", error);
      setError("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !userPage) {
    return (
      <ThemeWrapper>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">{error || "Page not found"}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold">
            Go Home
          </button>
        </div>
      </ThemeWrapper>
    );
  }

  return (
    <ThemeWrapper>
      <div className="mx-auto max-w-xl px-4 flex flex-col items-center gap-4 py-32">
        {userPage.image ? (
          <img
            src={userPage.image}
            alt={userPage.username}
            className="bg-white rounded-full w-32 h-32 object-cover flex items-center justify-center"
          />
        ) : (
          <p className="bg-white rounded-full w-32 h-32 text-black flex items-center justify-center">
            img
          </p>
        )}

        <p className="font-bold text-lg">{userPage.username}</p>

        {userPage.description && (
          <p className="text-center max-w-md w-full">{userPage.description}</p>
        )}

        {userPage.links && userPage.links.length > 0 && (
          <>
            {userPage.links
              .sort((a, b) => a.order - b.order)
              .map((link, index) => (
                <Link
                  key={index}
                  theme={userPage.theme || "soft-neutral"}
                  text={link.title}
                  url={link.url}
                />
              ))}
          </>
        )}

        {userPage.links && userPage.links.length === 0 && (
          <div className="text-center text-slate-500 py-8">No links yet.</div>
        )}
      </div>
    </ThemeWrapper>
  );
};

export default UserPage;
