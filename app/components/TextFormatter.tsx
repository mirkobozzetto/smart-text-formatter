"use client";

import { useState } from "react";
import { formatText } from "../utils/textFormat";

export const TextFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setFormattedText(formatText(inputText));
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h1 className="font-bold text-2xl">Text Formatter</h1>

      <textarea
        className="p-4 border rounded w-full min-h-[160px] resize-y"
        placeholder="Paste your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleFormat}
        className="bg-blue-500 hover:bg-blue-600 py-2 rounded w-full text-white"
      >
        Format Text
      </button>

      <div className="relative">
        <textarea
          className="p-4 border rounded w-full min-h-[160px] font-sans resize-y"
          value={formattedText}
          onChange={(e) => setFormattedText(e.target.value)}
          placeholder="Formatted text will appear here..."
        />
        {formattedText && (
          <button
            onClick={copyToClipboard}
            className={`absolute top-2 right-2 px-3 py-1 rounded text-sm
              ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
};
