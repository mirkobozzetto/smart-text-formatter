"use client";

import { useRef, useState } from "react";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
  height?: "small" | "medium" | "large";
  label?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const TextArea = ({
  value,
  onChange,
  placeholder = "",
  readonly = false,
  className = "",
  height = "medium",
  label,
  showCharCount = false,
  maxLength,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const charCount = value.length;
  const charPercentage = maxLength ? (charCount / maxLength) * 100 : 0;

  const heightClass = {
    small: "min-h-[10rem] h-[10rem]",
    medium: "min-h-[20rem] h-[20rem]",
    large: "min-h-[24rem] h-[24rem]",
  }[height];

  const baseClasses = `
    w-full px-4 py-3
    border-2 border-gray-200
    rounded-xl
    resize-none
    transition-all duration-200 ease-in-out
    placeholder:text-gray-400
    text-gray-900 text-sm leading-relaxed
    ${heightClass}
    ${
      isFocused
        ? "border-indigo-500 ring-4 ring-indigo-500/10 shadow-lg shadow-indigo-500/5"
        : "hover:border-gray-300 shadow-sm"
    }
    ${readonly ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
  `;

  return (
    <div className="relative group">
      {label && (
        <label
          htmlFor={label}
          className={`
            block text-sm font-medium mb-2 transition-colors duration-200
            ${isFocused ? "text-indigo-600" : "text-gray-700"}
          `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={textAreaRef}
          id={label}
          className={`${baseClasses} ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          readOnly={readonly}
          maxLength={maxLength}
        />

        {/* Premium Focus Indicator */}
        <div
          className={`
            absolute inset-0 rounded-xl pointer-events-none
            transition-opacity duration-300
            ${isFocused ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-indigo-500/5" />
        </div>
      </div>

      {/* Character Count */}
      {showCharCount && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1">
            {maxLength && (
              <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`
                    absolute inset-y-0 left-0 transition-all duration-300 rounded-full
                    ${
                      charPercentage > 90
                        ? "bg-red-500"
                        : charPercentage > 75
                        ? "bg-yellow-500"
                        : "bg-indigo-500"
                    }
                  `}
                  style={{ width: `${Math.min(charPercentage, 100)}%` }}
                />
              </div>
            )}
          </div>
          <div className="ml-4 text-xs font-medium text-gray-500">
            <span className={charPercentage > 90 ? "text-red-500" : ""}>
              {charCount}
            </span>
            {maxLength && <span className="text-gray-400"> / {maxLength}</span>}
          </div>
        </div>
      )}
    </div>
  );
};
