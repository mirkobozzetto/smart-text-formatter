import { BionicWord, TextChunk } from "../../types";
import { FORMATTER_CONFIG } from "../../constants";

// RSVP (Rapid Serial Visual Presentation) formatter
export const prepareForRSVP = (text: string): string[] => {
  if (!text.trim()) return [];

  // Clean and normalize text
  const cleaned = text.replace(/\s+/g, " ").trim();

  // Split into words, preserving punctuation
  return cleaned.split(/\s+/).filter((word) => word.length > 0);
};

// Bionic Reading formatter - bold the first part of important words
export const formatForBionic = (text: string): BionicWord[] => {
  if (!text.trim()) return [];

  const { bionicBoldPercentage } = FORMATTER_CONFIG.speedReading;
  // Process text line by line to preserve formatting
  const lines = text.split("\n");
  const allWords: BionicWord[] = [];

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      // Add line break marker
      allWords.push({
        original: "\n",
        bold: "",
        normal: "\n",
      });
    }

    const words = line.split(/\s+/).filter((word) => word.length > 0);

    words.forEach((word) => {
      // Skip words that are only punctuation
      if (/^[^\w]*$/.test(word)) {
        allWords.push({
          original: word,
          bold: "",
          normal: word,
        });
        return;
      }

      // For very short words (1-2 letters), bold the first letter
      if (word.length <= 2) {
        allWords.push({
          original: word,
          bold: word.slice(0, 1),
          normal: word.slice(1),
        });
        return;
      }

      // Extract letters only for calculating bold portion
      const letters = word.replace(/[^\w]/g, "");
      const boldLength = Math.max(
        1,
        Math.ceil(letters.length * (bionicBoldPercentage / 100))
      );

      // Find the position after the bold letters in the original word
      let letterCount = 0;
      let splitIndex = 0;

      for (let i = 0; i < word.length; i++) {
        if (/\w/.test(word[i])) {
          letterCount++;
          if (letterCount === boldLength) {
            splitIndex = i + 1;
            break;
          }
        }
      }

      allWords.push({
        original: word,
        bold: word.slice(0, splitIndex),
        normal: word.slice(splitIndex),
      });
    });
  });

  return allWords;
};

// Text chunking formatter - break text into meaningful sentences/lines
export const formatForChunking = (text: string): TextChunk[] => {
  if (!text.trim()) return [];

  const allChunks: TextChunk[] = [];
  let globalIndex = 0;

  // Split by lines first to preserve paragraph structure
  const lines = text.split("\n");

  lines.forEach((line) => {
    if (!line.trim()) {
      // Skip empty lines - they're just spacing
      return;
    }

    // Split each line into sentences (keep punctuation with the sentence)
    // Match sentences ending with punctuation, or phrases ending with comma/semicolon
    const sentences = line.match(/[^.!?;]+[.!?;]?/g) || [line];

    sentences.forEach((sentence) => {
      const trimmed = sentence.trim();
      if (trimmed) {
        allChunks.push({
          text: trimmed,
          isPhrase: true, // All chunks are meaningful phrases now
          index: globalIndex++,
        });
      }
    });
  });

  return allChunks;
};

export const getSpeedReadingStyleConfig = () => ({
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "1.125rem", // 18px
  lineHeight: "1.5",
});
