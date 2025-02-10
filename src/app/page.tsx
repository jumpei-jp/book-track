"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [books, setBooks] = useState<{ id: number; title: string; author: string }[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from("books").select("*");

      if (error) {
        console.error("Supabase エラー:", error);
      } else {
        console.log("取得したデータ:", data);
        setBooks(data);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>📚 あなたの読書リスト</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}