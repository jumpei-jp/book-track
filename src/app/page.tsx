"use client"; // クライアントコンポーネントとして指定

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, author")
        .order("read_date", { ascending: false });

      if (error) {
        console.error("Supabase エラー:", error);
      } else {
        console.log("取得したデータ:", data);
        setBooks(data || []);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">📚 あなたの読書リスト</h1>
      <Link href="/books/new">
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          ➕ 新しい本を追加
        </button>
      </Link>
      <ul className="space-y-2 mt-4">
        {books.map((book) => (
          <li key={book.id} className="p-2 border rounded hover:bg-gray-100 transition">
            <Link href={`/books/${book.id}`} className="text-blue-600">
              {book.title} - {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}