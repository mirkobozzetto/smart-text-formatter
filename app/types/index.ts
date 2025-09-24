export type FormattingMode = "mobile" | "conventional" | "speed-reading";

export type SpeedReadingSubMode = "rsvp" | "bionic" | "chunking";

export interface FormattingOptions {
  mode: FormattingMode;
  speedReadingSubMode?: SpeedReadingSubMode;
  wpm?: number;
  targetLineLength?: number;
  fontSize?: number;
  lineHeight?: number;
}

export interface TextStats {
  characterCount: number;
  wordCount: number;
  estimatedReadingTime: number; // in minutes
}

export interface RSVPState {
  currentWordIndex: number;
  isPlaying: boolean;
  wpm: number;
  words: string[];
  intervalId?: NodeJS.Timeout;
}

export interface BionicWord {
  original: string;
  bold: string;
  normal: string;
}

export interface TextChunk {
  text: string;
  isPhrase: boolean;
  index: number;
}

export interface UndoRedoState<T> {
  history: T[];
  currentIndex: number;
}

export interface FormatterConfig {
  mobile: {
    minCharsPerLine: number;
    maxCharsPerLine: number;
    fontSize: string;
    lineHeight: string;
  };
  conventional: {
    minCharsPerLine: number;
    maxCharsPerLine: number;
    targetCharsPerLine: number;
    lineHeight: string;
  };
  speedReading: {
    minWPM: number;
    maxWPM: number;
    defaultWPM: number;
    bionicBoldPercentage: number;
  };
}
