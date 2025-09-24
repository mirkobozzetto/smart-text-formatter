"use client";

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
  const heightClass = {
    small: "h-40",
    medium: "h-80",
    large: "h-96",
  }[height];

  const baseClasses = `w-full p-2 border border-gray-300 rounded resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm ${heightClass}`;

  return (
    <textarea
      className={`${baseClasses} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readonly}
    />
  );
};