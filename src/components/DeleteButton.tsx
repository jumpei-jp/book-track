"use client";

import React from "react";
import { FaTrash } from "react-icons/fa"; // ゴミ箱アイコンをインポート

type DeleteButtonProps = {
  onDelete: () => void;
  disabled?: boolean;
};

export default function DeleteButton({ onDelete, disabled = false }: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      disabled={disabled}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition active:scale-95 disabled:bg-gray-400 shadow-md"
      aria-label="本を削除"
    >
      <FaTrash className="text-gray-100 text-lg" />
    </button>
  );
}