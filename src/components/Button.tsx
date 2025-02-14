"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({ children, onClick, type = "button", disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="px-5 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-400 flex items-center gap-2"
    >
      {children}
    </button>
  );
}