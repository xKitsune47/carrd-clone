"use client";

import Link from "next/link";
import ThemeWrapper from "./_components/ThemeWrapper";

export default function Home() {
  return (
    <ThemeWrapper>
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-32">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Create your personal page in minutes
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
            A simple and fast way to share your links, portfolio, or bio with
            the world
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all duration-200 hover:scale-105 shadow-lg">
              Get Started
            </Link>

            <Link
              href="/theme-preview"
              className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold hover:bg-slate-50 transition-all duration-200">
              Browse Themes
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Customizable Themes</h3>
            <p className="text-slate-600">
              Choose from pre-designed themes and fonts
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Lightning Fast</h3>
            <p className="text-slate-600">
              Built with Next.js for optimal performance
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Simple Sharing</h3>
            <p className="text-slate-600">
              Get your personal link and share it anywhere
            </p>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
