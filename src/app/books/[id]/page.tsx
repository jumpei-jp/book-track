"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import AddNoteForm from "@/components/AddNoteForm";
import DeleteButton from "@/components/DeleteButton"; // 削除ボタンをインポート

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
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 本とメモのデータを取得する関数
  const fetchBookAndNotes = async () => {
    if (!id) return;

    // 📚 本のデータを取得
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (bookError) {
      console.error("本の取得エラー:", bookError);
    } else {
      setBook(bookData);
    }

    // 📝 メモのデータを取得
    const { data: notesData, error: notesError } = await supabase
      .from("notes")
      .select("*")
      .eq("book_id", id);

    if (notesError) {
      console.error("メモの取得エラー:", notesError);
    } else {
      setNotes(notesData);
    }
  };

  // 初回レンダリング時にデータを取得
  useEffect(() => {
    fetchBookAndNotes();
  }, [id]);

  // 🔹 本を削除する処理
  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm("本を削除しますか？ この操作は元に戻せません。");
    if (!confirmDelete) return;

    setLoading(true);
    const { error } = await supabase.from("books").delete().eq("id", id);
    setLoading(false);

    if (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。");
    } else {
      alert("本を削除しました。");
      router.push("/"); // 削除後はトップページへリダイレクト
    }
  };

  if (!book) return <div>📖 読み込み中...</div>;

  return (
    <div className="relative max-w-xl mx-auto mt-8 p-4 border rounded-md shadow-lg">
      {/* 削除ボタンを右上に配置 */}
      <div className="absolute top-4 right-4">
        <DeleteButton onDelete={handleDelete} disabled={loading} />
      </div>

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
      <AddNoteForm bookId={book.id} refreshNotes={fetchBookAndNotes} />
    </div>
  );
}