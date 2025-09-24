"use client";

import { useState } from "react";

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "success" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const ActionButton = ({
  onClick,
  disabled = false,
  variant = "secondary",
  size = "medium",
  children,
  className = "",
  loading = false,
  fullWidth = false,
  icon,
}: ActionButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
  `;

  const sizeClasses = {
    small: "px-3 py-1.5 text-xs gap-1.5",
    medium: "px-4 py-2 text-sm gap-2",
    large: "px-6 py-3 text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-indigo-500
      text-white shadow-lg shadow-indigo-500/25
      hover:from-indigo-700 hover:to-indigo-600
      hover:shadow-xl hover:shadow-indigo-500/30
      focus-visible:ring-indigo-500
      ${isPressed ? "scale-[0.98]" : "hover:scale-[1.02]"}
    `,
    secondary: `
      bg-white text-gray-700
      border border-gray-300 shadow-sm
      hover:bg-gray-50 hover:border-gray-400
      hover:shadow-md
      focus-visible:ring-gray-500
      ${isPressed ? "scale-[0.98]" : ""}
    `,
    ghost: `
      text-gray-600
      hover:bg-gray-100 hover:text-gray-900
      focus-visible:ring-gray-500
      ${isPressed ? "bg-gray-100" : ""}
    `,
    success: `
      bg-gradient-to-r from-emerald-600 to-green-600
      text-white shadow-lg shadow-emerald-500/25
      hover:from-emerald-700 hover:to-green-700
      hover:shadow-xl hover:shadow-emerald-500/30
      focus-visible:ring-emerald-500
      ${isPressed ? "scale-[0.98]" : "hover:scale-[1.02]"}
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-rose-600
      text-white shadow-lg shadow-red-500/25
      hover:from-red-700 hover:to-rose-700
      hover:shadow-xl hover:shadow-red-500/30
      focus-visible:ring-red-500
      ${isPressed ? "scale-[0.98]" : "hover:scale-[1.02]"}
    `,
  }[variant];

  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        ${baseClasses}
        ${sizeClasses}
        ${variantClasses}
        ${className}
      `}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
          <svg
            className="animate-spin h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Button Content */}
      <span className={`flex items-center ${loading ? "opacity-0" : ""}`}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>

      {/* Premium Ripple Effect */}
      {variant === "primary" && !disabled && (
        <span
          className={`
            absolute inset-0 rounded-lg overflow-hidden
            ${isPressed ? "animate-ping" : ""}
          `}
        >
          <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200" />
        </span>
      )}
    </button>
  );
};
