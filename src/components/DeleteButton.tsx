"use client";

import React from "react";

type DeleteButtonProps = {
  onDelete: () => void;
  disabled?: boolean;
};

export default function DeleteButton({ onDelete, disabled = false }: DeleteButtonProps) {
  return (
    <button
      onClick={onDelete}
      disabled={disabled}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-gray-200 hover:bg-red-700 transition active:scale-95 disabled:bg-gray-400 shadow-md"
      aria-label="本を削除"
    >
      <span className="text-xl font-bold">🗑️</span>
    </button>
  );
}