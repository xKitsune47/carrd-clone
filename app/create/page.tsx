"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeWrapper from "../_components/ThemeWrapper";
import Loading from "../loading";
import useThemes from "../_hooks/useThemes";
import useFonts from "../_hooks/useFonts";

interface Link {
  title: string;
  url: string;
  order: number;
}

interface UserPageData {
  username: string;
  description: string;
  image?: string;
  links: Link[];
  theme?: string;
  font?: string;
}

const CreatePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { themes, loadingThemes, errorThemes } = useThemes();
  const { fonts, loadingFonts, errorFonts } = useFonts();
  const [formData, setFormData] = useState<UserPageData>({
    username: "",
    description: "",
    image: "",
    links: [],
    theme: "soft-neutral",
    font: "Manrope",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchUserPage();
    }
  }, [status, session]);

  const fetchUserPage = async () => {
    try {
      const res = await fetch("/api/user-page");
      const data = await res.json();

      if (data.userPage) {
        setFormData({
          username: data.userPage.username,
          description: data.userPage.description || "",
          image: data.userPage.image || session?.user?.image || "",
          links: data.userPage.links || [],
          theme: data.userPage.theme || "soft-neutral",
          font: data.userPage.font || "Manrope",
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          image: session?.user?.image || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching user page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = () => {
    setFormData({
      ...formData,
      links: [
        ...formData.links,
        { title: "", url: "", order: formData.links.length },
      ],
    });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    newLinks.forEach((link, i) => {
      link.order = i;
    });
    setFormData({ ...formData, links: newLinks });
  };

  const handleLinkChange = (
    index: number,
    field: "title" | "url",
    value: string,
  ) => {
    const newLinks = [...formData.links];
    newLinks[index][field] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newLinks = [...formData.links];
    const draggedItem = newLinks[draggedIndex];
    newLinks.splice(draggedIndex, 1);
    newLinks.splice(index, 0, draggedItem);

    newLinks.forEach((link, i) => {
      link.order = i;
    });

    setFormData({ ...formData, links: newLinks });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/user-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Page saved successfully!");
        router.push(`/${formData.username}`);
      } else {
        alert(data.error || "Failed to save page");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <ThemeWrapper>
      <div className="max-w-3xl mx-auto py-24 px-4 overflow-y-auto h-full">
        <h1 className="text-3xl font-bold mb-8">Create Your Page</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Username *
            </label>
            <input
              type="text"
              required
              pattern="^[a-z0-9-]+$"
              value={formData.username}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, "");
                setFormData({
                  ...formData,
                  username: value,
                });
              }}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none"
              placeholder="your-username"
            />
            <p className="text-xs text-slate-600 mt-1">
              Your page will be available at:{" "}
              {
                window.location.href
                  .replace("https://", "")
                  .replace("http://", "")
                  .split("/")[0]
              }
              /{formData.username}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              onBlur={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value.trim(),
                })
              }
              maxLength={512}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none"
              placeholder="Tell people about yourself..."
              rows={3}
            />
            <p className="text-xs text-slate-500 mt-1 text-right">
              {formData.description.length}/512 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Profile Image
            </label>
            <div className="space-y-3 flex flex-col md:flex-row md:gap-16">
              {formData.image && (
                <div className="flex flex-col justify-center items-center gap-3 md:w-1/5">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="text-sm bg-red-600 hover:bg-red-700 font-semibold p-2 text-white rounded-xl cursor-pointer transition-all duration-300">
                    Remove
                  </button>
                </div>
              )}

              <div className="w-full">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({
                            ...formData,
                            image: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-slate-300"></div>
                  <span className="text-xs text-slate-500">OR</span>
                  <div className="flex-1 h-px bg-slate-300"></div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={
                      formData.image?.startsWith("data:") ? "" : formData.image
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Appearance
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              {themes && !loadingThemes && !errorThemes && (
                <div className="flex-1">
                  <label className="block text-xs text-slate-600 mb-1">
                    Theme
                  </label>
                  <select
                    value={formData.theme}
                    onChange={(e) =>
                      setFormData({ ...formData, theme: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none capitalize">
                    {Object.keys(themes).map((el: string) => (
                      <option value={el} key={el}>
                        {el.replace("-", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {fonts &&
                !loadingFonts &&
                !errorFonts &&
                Array.isArray(fonts) && (
                  <div className="flex-1">
                    <label className="block text-xs text-slate-600 mb-1">
                      Font
                    </label>
                    <select
                      value={formData.font}
                      onChange={(e) =>
                        setFormData({ ...formData, font: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none">
                      {fonts.map((el: string) => (
                        <option value={el} key={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold">Links</label>
              <button
                type="button"
                onClick={handleAddLink}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 text-sm font-semibold cursor-pointer">
                + Add Link
              </button>
            </div>

            <div className="space-y-3">
              {formData.links.map((link, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex gap-2 p-4 border-2 border-slate-200 rounded-lg cursor-move transition-opacity ${
                    draggedIndex === index ? "opacity-50" : ""
                  }`}>
                  <div className="flex items-center text-slate-400 cursor-grab active:cursor-grabbing">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9h16.5m-16.5 6.75h16.5"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      required
                      value={link.title}
                      onChange={(e) =>
                        handleLinkChange(index, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none"
                      placeholder="Link Title"
                    />
                    <input
                      type="url"
                      required
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, "url", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="px-3 text-red-600 hover:text-red-700 font-semibold cursor-pointer transition-all duration-300">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {formData.links.length === 0 && (
              <p className="text-center text-slate-500 py-8">
                No links yet. Click &quot;Add Link&quot; to get started.
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              {saving ? "Saving..." : "Save Page"}
            </button>

            {formData.username && (
              <button
                type="button"
                onClick={() => router.push(`/${formData.username}`)}
                className="px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-200 transition-all duration-300 font-semibold cursor-pointer">
                Preview
              </button>
            )}
          </div>
        </form>
      </div>
    </ThemeWrapper>
  );
};

export default CreatePage;
