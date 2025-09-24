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
