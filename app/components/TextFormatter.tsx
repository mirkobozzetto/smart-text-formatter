"use client";

import { useState } from "react";
import { formatText } from "../utils/textFormat";

export const TextFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState("");

  const handleFormat = () => {
    setFormattedText(formatText(inputText));
  };

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <h1 className="font-bold text-2xl">Formateur de texte</h1>

      <textarea
        className="p-4 border rounded w-full h-40"
        placeholder="Collez votre texte ici..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleFormat}
        className="bg-blue-500 hover:bg-blue-600 py-2 rounded w-full text-white"
      >
        Formater le texte
      </button>

      <pre className="p-4 border rounded w-full h-40 font-sans whitespace-pre-wrap">
        {formattedText}
      </pre>
    </div>
  );
};
