"use client"; // クライアントコンポーネントとして指定

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const questionOptions = [
  "この本で一番印象に残ったことは？",
  "この本を3行で要約すると？",
  "この知識をどう活かせる？",
  "1ヶ月後に振り返るなら何を覚えておきたい？",
];

export default function AddNoteForm({ bookId, refreshNotes }: { bookId: string; refreshNotes: () => void }) {
  const [question, setQuestion] = useState(questionOptions[0]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!content) {
      alert("メモを入力してください");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("notes").insert([
      { book_id: bookId, question_type: question, content },
    ]);
    setLoading(false);

    if (error) {
      console.error("メモ保存エラー:", error);
    } else {
      setContent(""); // 入力欄をリセット
      refreshNotes(); // 🔹 メモを再取得して更新
      alert("メモを保存しました！");
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      <label className="block text-sm font-medium">❓ 質問を選択</label>
      <select
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded mt-1"
      >
        {questionOptions.map((q) => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="メモを入力"
      />
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "保存中..." : "💾 保存"}
      </button>
    </div>
  );
}