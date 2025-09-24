export const getButtonClasses = (
  variant: "primary" | "secondary" | "success" | "ghost" = "primary",
  size: "sm" | "md" | "lg" = "md",
  disabled: boolean = false
): string => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200
  `
    .trim()
    .replace(/\s+/g, " ");

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`.trim();
};
