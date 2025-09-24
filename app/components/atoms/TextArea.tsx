"use client";

import { useRef, useState } from "react";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
  height?: "small" | "medium" | "large";
}

export const TextArea = ({
  value,
  onChange,
  placeholder = "",
  readonly = false,
  className = "",
  height = "medium",
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const heightClass = {
    small: "min-h-[10rem] h-[10rem]",
    medium: "min-h-[20rem] h-[20rem]",
    large: "min-h-[24rem] h-[24rem]",
  }[height];

  const baseClasses = `
    w-full px-4 py-3
    border
    rounded-2xl
    resize-none
    transition-all duration-200
    placeholder:text-gray-400
    text-black text-sm leading-relaxed
    bg-white
    outline-none
    ${heightClass}
    ${isFocused ? "border-gray-400" : "border-gray-300"}
    ${readonly ? "cursor-default bg-gray-50" : ""}
    ${className}
  `;

  return (
    <div className="relative">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(e) => !readonly && onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        readOnly={readonly}
        className={baseClasses}
      />
    </div>
  );
};
