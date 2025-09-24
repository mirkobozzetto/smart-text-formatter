"use client";

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success";
  size?: "small" | "medium";
  children: React.ReactNode;
  className?: string;
}

export const ActionButton = ({
  onClick,
  disabled = false,
  variant = "secondary",
  size = "small",
  children,
  className = "",
}: ActionButtonProps) => {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "text-gray-500 hover:text-gray-700",
    success: "bg-green-500 text-white",
  }[variant];

  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-3 py-1 text-sm",
  }[size];

  const disabledClasses = disabled
    ? "disabled:text-gray-300 disabled:cursor-not-allowed"
    : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses} ${variantClasses} ${disabledClasses} rounded transition-colors ${className}`}
    >
      {children}
    </button>
  );
};
