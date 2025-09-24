export const DESIGN = {
  colors: {
    primary: {
      50: "rgb(238 242 255)",
      100: "rgb(224 231 255)",
      200: "rgb(199 210 254)",
      300: "rgb(165 180 252)",
      400: "rgb(129 140 248)",
      500: "rgb(99 102 241)",
      600: "rgb(79 70 229)",
      700: "rgb(67 56 202)",
      800: "rgb(55 48 163)",
      900: "rgb(49 46 129)",
      950: "rgb(30 27 75)",
    },
    gray: {
      50: "rgb(249 250 251)",
      100: "rgb(243 244 246)",
      200: "rgb(229 231 235)",
      300: "rgb(209 213 219)",
      400: "rgb(156 163 175)",
      500: "rgb(107 114 128)",
      600: "rgb(75 85 99)",
      700: "rgb(55 65 81)",
      800: "rgb(31 41 55)",
      900: "rgb(17 24 39)",
      950: "rgb(3 7 18)",
    },
  },
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
  },
  borderRadius: {
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
} as const;

export const PREMIUM_CLASSES = {
  card: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
  cardHover: "hover:shadow-md transition-shadow duration-200 cursor-pointer",
  input:
    "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200",
  button: {
    primary:
      "inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200",
    secondary:
      "inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors duration-200",
    ghost:
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200",
  },
  label: "block text-sm font-medium text-gray-700 mb-1",
  helper: "text-sm text-gray-500",
  section: "space-y-6",
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  divider: "border-t border-gray-200",
  badge: {
    gray: "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10",
    indigo:
      "inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10",
    green:
      "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10",
  },
} as const;
