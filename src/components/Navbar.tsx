"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
          📚 BookTrack
        </Link>
        <div className="space-x-4">
          <Link href="/books/new" className="hover:underline">
            ➕ 本を追加
          </Link>
          <Link href="/about" className="hover:underline">
            ℹ️ アプリについて
          </Link>
        </div>
      </div>
    </nav>
  );
}