"use client"; // Next.js でイベントハンドラを使うために必要

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [readDate, setReadDate] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !author || !readDate) {
      alert("すべての項目を入力してください");
      return;
    }

    const { error } = await supabase.from("books").insert([
      { title, author, read_date: readDate },
    ]);

    if (error) console.error(error);
    else router.push("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📚 新しい本を登録</h2>
      <input className="w-full p-2 border rounded mb-2" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="w-full p-2 border rounded mb-2" placeholder="著者" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="date" className="w-full p-2 border rounded mb-2" value={readDate} onChange={(e) => setReadDate(e.target.value)} />
      <button onClick={handleSave} className="w-full px-4 py-2 bg-blue-500 text-white rounded">
        💾 登録する
      </button>
    </div>
  );
}