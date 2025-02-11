"use client"; // クライアントコンポーネントとして指定

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import AddNoteForm from "@/components/AddNoteForm";

type Book = {
  id: string;
  title: string;
  author: string;
  read_date: string;
};

type Note = {
  id: string;
  question_type: string;
  content: string;
};

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchBook() {
      const { data, error } = await supabase.from("books").select("*").eq("id", id).single();
      if (error) console.error("本の取得エラー:", error);
      else setBook(data);
    }

    async function fetchNotes() {
      const { data, error } = await supabase.from("notes").select("*").eq("book_id", id);
      if (error) console.error("メモの取得エラー:", error);
      else setNotes(data);
    }

    if (id) {
      fetchBook();
      fetchNotes();
    }
  }, [id]);

  if (!book) return <div>📖 読み込み中...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">👨‍💼 {book.author}</p>
      <p className="text-gray-500">📅 読了日: {book.read_date}</p>

      <h2 className="text-xl font-bold mt-6">📝 メモ</h2>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="p-2 border rounded">
            <strong>❓ {note.question_type}</strong>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6">📝 新しいメモを追加</h2>
      <AddNoteForm bookId={book.id} />
    </div>
  );
}