"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-900/80 backdrop-blur-md text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
          📚 BookTrack
        </Link>
        <div className="space-x-6">
          <Link
            href="/books/new"
            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 hover:text-gray-200 transition"
          >
            ➕ 本を追加
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 hover:text-gray-200 transition"
          >
            ℹ️ アプリについて
          </Link>
        </div>
      </div>
    </nav>
  );
}