"use client";

import { useState } from "react";

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "inverted";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const ActionButton = ({
  onClick,
  disabled = false,
  variant = "default",
  size = "medium",
  children,
  className = "",
  fullWidth = false,
}: ActionButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-full
    transition-all duration-200
    border-2
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"}
  `;

  const sizeClasses = {
    small: "px-3 py-1 text-xs",
    medium: "px-4 py-1.5 text-sm",
    large: "px-6 py-2 text-base",
  }[size];

  const variantClasses = {
    default: `
      bg-white text-black border-black
      ${!disabled && "hover:bg-black hover:text-white"}
      ${isPressed && !disabled ? "scale-95" : ""}
    `,
    inverted: `
      bg-black text-white border-black
      ${!disabled && "hover:bg-white hover:text-black"}
      ${isPressed && !disabled ? "scale-95" : ""}
    `,
  }[variant];

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
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
      {children}
    </button>
  );
};
