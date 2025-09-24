import { FormatterConfig } from "../types";

export const FORMATTER_CONFIG: FormatterConfig = {
  mobile: {
    minCharsPerLine: 45,
    maxCharsPerLine: 60,
    fontSize: "16px",
    lineHeight: "1.6",
  },
  conventional: {
    minCharsPerLine: 50,
    maxCharsPerLine: 75,
    targetCharsPerLine: 66,
    lineHeight: "1.5",
  },
  speedReading: {
    minWPM: 300,
    maxWPM: 800,
    defaultWPM: 400,
    bionicBoldPercentage: 40,
  },
};

export const DEBOUNCE_DELAY = 300;

export const READING_SPEED_AVERAGE = 200; // WPM for reading time estimation

export const SENTENCE_ENDINGS = /[.!?]+/g;
export const PHRASE_BREAKS = /[,;:]+/g;
export const WORD_BOUNDARY = /\s+/g;

export const UI_CONSTANTS = {
  COPY_FEEDBACK_DURATION: 2000,
  TRANSITION_DURATION: "transition-all duration-200",
  RSVP_DISPLAY_DURATION: (wpm: number) => 60000 / wpm, // milliseconds per word
} as const;

export const THEME_COLORS = {
  primary: {
    50: "bg-blue-50",
    500: "bg-blue-500",
    600: "bg-blue-600",
    text: "text-blue-600",
  },
  success: {
    500: "bg-green-500",
    text: "text-green-600",
  },
  gray: {
    100: "bg-gray-100",
    200: "bg-gray-200",
    300: "bg-gray-300",
    500: "bg-gray-500",
    700: "bg-gray-700",
    900: "bg-gray-900",
  },
  dark: {
    bg: "dark:bg-gray-900",
    text: "dark:text-gray-100",
    border: "dark:border-gray-700",
    card: "dark:bg-gray-800",
  },
} as const;
