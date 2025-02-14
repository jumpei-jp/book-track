"use client";

import Link from "next/link";
import { FaPlus, FaInfoCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-blue-900/80 backdrop-blur-md text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* 📚 ロゴ */}
        <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
          📚 BookTrack
        </Link>

        {/* 🏠 ナビゲーションメニュー */}
        <div className="flex space-x-4">
          <Link
            href="/books/new"
            className="px-4 py-2 rounded-lg bg-white/40 text-gray-100 hover:bg-white/50 hover:text-gray-200 transition flex items-center gap-2"
          >
            <FaPlus className="text-lg" />
            <span>本を追加</span>
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg bg-white/40 text-gray-100 hover:bg-white/50 hover:text-gray-200 transition flex items-center gap-2"
          >
            <FaInfoCircle className="text-lg" />
            <span>アプリについて</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}